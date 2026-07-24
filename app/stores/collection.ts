import { defineStore } from 'pinia'
import { ofetch } from 'ofetch'
import droidData from '~/data/droids.json'
import type { CollectionEntry, Droid, DroidDataset, Rarity, Tier, UserProgress } from '~~/shared/types/droid'

const data = droidData as unknown as DroidDataset

/** Ordre des paliers, pour comparer « qui est plus haut que qui ». */
const TIER_RANK: Record<Tier, number> = {
  DEFAULT: 0,
  GOLD: 1,
  DIAMOND: 2,
  RAINBOW: 3,
  BESKAR: 4,
  GALACTIC: 5,
}

/** Les paliers du plus bas au plus haut, dérivés du barème ci-dessus pour rester alignés. */
const TIER_ORDER = (Object.keys(TIER_RANK) as Tier[]).sort((a, b) => TIER_RANK[a] - TIER_RANK[b])

const STORAGE_KEY = 'droidex:progress'
/** Code de sauvegarde anonyme, auto-généré au premier passage. Stable, jamais régénéré. */
const SYNC_CODE_KEY = 'droidex:syncCode'

const emptyEntry = (): CollectionEntry => ({ tiers: [], flawless: false })

/** Forme héritée : un seul palier, le plus haut, les inférieurs étant sous-entendus. */
type LegacyEntry = { tier?: Tier | null, tiers?: Tier[], flawless?: boolean }

/**
 * Convertit une entrée de l'ancien modèle vers le nouveau.
 *
 * L'ancien `tier: "BESKAR"` signifiait « Beskar **et tout ce qui est en dessous** ». On
 * développe donc la liste jusqu'à ce palier, sans quoi la migration ferait perdre à chaque
 * joueur toutes ses variantes inférieures — et son compteur chuterait sans explication.
 */
function migrateEntry(raw: LegacyEntry): CollectionEntry {
  const flawless = Boolean(raw.flawless)

  if (Array.isArray(raw.tiers)) return { tiers: raw.tiers, flawless }
  if (!raw.tier) return { tiers: [], flawless }

  const plafond = TIER_RANK[raw.tier]
  return { tiers: TIER_ORDER.filter((t) => TIER_RANK[t] <= plafond), flawless }
}

/** Migre une collection entière, quelle que soit la forme d'origine. */
export function migrateCollection(
  raw: Record<string, LegacyEntry> | undefined,
): Record<string, CollectionEntry> {
  return Object.fromEntries(
    Object.entries(raw ?? {}).map(([slug, e]) => [slug, migrateEntry(e)]),
  )
}

type Snapshot = Pick<
  UserProgress,
  'collection' | 'rebirth' | 'superRebirth' | 'cycle' | 'novaCrystals' | 'shopLevels'
> & {
  /**
   * Exigences de renaissance cochées, **indépendantes de la collection**.
   *
   * Cocher une exigence ne signifie plus « je possède ce droid » (ce serait toucher au
   * Droidex) mais « pour cette renaissance, j'ai ce qu'il faut ». Chaque clé identifie une
   * exigence précise : `cycle:niveau:slug:palier`. Décorréler les deux évite qu'un suivi de
   * renaissance ne gonfle la complétion de la collection, et inversement.
   */
  rebirthChecks?: Record<string, true>
}

/**
 * Suivi de collection **local-first**.
 *
 * L'app se consulte largement sans compte : forcer la connexion pour cocher une case
 * ferait fuir la moitié des visiteurs. La progression vit donc toujours dans
 * `localStorage`, et n'est répliquée sur le serveur que si l'utilisateur est connecté.
 * À la première connexion, une progression locale non vide est poussée vers un compte
 * encore vierge — on ne perd pas ce qui a été coché avant de créer le compte.
 */
export const useCollectionStore = defineStore('collection', () => {
  const droids = computed<Droid[]>(() => data.droids)

  const entries = ref<Record<string, CollectionEntry>>({})
  const rebirth = ref(0)
  const superRebirth = ref(0)
  const cycle = ref(1)
  const novaCrystals = ref(0)
  const shopLevels = ref<Record<string, number>>({})
  /** Exigences de renaissance cochées, séparées de la collection. Voir `Snapshot`. */
  const rebirthChecks = ref<Record<string, true>>({})

  /** Code de sauvegarde anonyme (`ABCD-EFGH`), auto-généré au 1ᵉʳ passage. `null` avant création. */
  const syncCode = ref<string | null>(null)

  /**
   * `true` une fois la progression locale lue.
   *
   * IndexedDB étant asynchrone, le premier rendu se fait sans données : sans ce drapeau,
   * les compteurs affichaient « 0 / 379 » pendant une image ou deux avant de sauter à la
   * vraie valeur. Un zéro faux est plus trompeur qu'une absence assumée.
   */
  const hydrated = ref(false)

  /** `true` dès qu'une session est active : conditionne la réplication serveur. */
  const remoteEnabled = ref(false)
  const loading = ref(false)
  const syncing = ref(false)
  /** Erreur de synchronisation serveur. Le local, lui, a déjà été écrit. */
  const syncError = ref<string | null>(null)

  function snapshot(): Snapshot {
    return {
      collection: entries.value,
      rebirth: rebirth.value,
      superRebirth: superRebirth.value,
      cycle: cycle.value,
      novaCrystals: novaCrystals.value,
      shopLevels: shopLevels.value,
      rebirthChecks: rebirthChecks.value,
    }
  }

  function apply(s: Partial<Snapshot>) {
    entries.value = migrateCollection(s.collection as never)
    rebirth.value = s.rebirth ?? 0
    superRebirth.value = s.superRebirth ?? 0
    cycle.value = s.cycle ?? 1
    novaCrystals.value = s.novaCrystals ?? 0
    shopLevels.value = s.shopLevels ?? {}
    rebirthChecks.value = s.rebirthChecks ?? {}
  }

  /**
   * Lit la progression locale, en reprenant au passage l'ancien emplacement.
   *
   * La progression vivait dans `localStorage`. Elle est désormais dans IndexedDB, mais
   * les joueurs existants ont encore la leur dans l'ancien magasin : on la récupère à la
   * première lecture, on la réécrit dans le nouveau, puis on retire la copie devenue
   * trompeuse — deux sources de vérité finiraient par diverger.
   */
  async function readLocal(): Promise<Snapshot | null> {
    if (import.meta.server) return null

    const depuisIdb = await idbGet<Snapshot>(STORAGE_KEY)
    if (depuisIdb) return depuisIdb

    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (!raw) return null

      const migre = JSON.parse(raw) as Snapshot
      await idbSet(STORAGE_KEY, migre)
      localStorage.removeItem(STORAGE_KEY)
      return migre
    }
    catch {
      return null
    }
  }

  /**
   * Écriture volontairement non attendue par les actions : cocher une case doit rester
   * instantané à l'écran. Un échec est silencieux — la session reste utilisable, sans
   * persistance — exactement comme avec l'ancien magasin.
   */
  function writeLocal() {
    if (import.meta.server) return
    void idbSet(STORAGE_KEY, snapshot())
    scheduleCodePush()
  }

  /*
   * Sauvegarde « transparente » anonyme.
   *
   * Tant qu'aucune session n'est active, la progression est répliquée sur le serveur sous un
   * code auto-généré (voir `ensureSyncCode`). Ce code EST la sauvegarde : le joueur n'a rien à
   * faire, et peut le saisir sur un autre appareil pour tout récupérer. Le compte connecté, s'il
   * existe, prime — le code n'est alors qu'un vestige inoffensif.
   */
  let codePushTimer: ReturnType<typeof setTimeout> | null = null

  /** Écrit l'instantané sous le code courant (upsert, échéance glissante). Silencieux si échec. */
  async function pushCode() {
    if (import.meta.server) return
    const code = syncCode.value
    if (!code || remoteEnabled.value) return
    try {
      await ofetch(`/api/sync/${encodeURIComponent(code)}`, { method: 'PUT', body: snapshot() })
    }
    catch { /* le local reste la vérité ; on réessaiera au prochain changement */ }
  }

  /** Regroupe les écritures rapprochées : cocher dix paliers d'affilée = une seule requête. */
  function scheduleCodePush() {
    if (import.meta.server || remoteEnabled.value || !syncCode.value) return
    if (codePushTimer) clearTimeout(codePushTimer)
    codePushTimer = setTimeout(() => { void pushCode() }, 1500)
  }

  /**
   * Génère le code au tout premier passage (visiteur anonyme, aucun code encore). On réutilise
   * `POST /api/sync`, qui garantit l'unicité côté serveur, puis on le conserve en local — il ne
   * changera plus jamais, y compris après un effacement de la progression.
   */
  async function ensureSyncCode() {
    if (import.meta.server || remoteEnabled.value || syncCode.value) return
    try {
      const res = await ofetch<{ code: string }>('/api/sync', { method: 'POST', body: snapshot() })
      syncCode.value = res.code
      await idbSet(SYNC_CODE_KEY, res.code)
    }
    catch { /* pas de code cette fois : on réessaiera au prochain chargement */ }
  }

  /**
   * Adopte un code existant (saisi par l'utilisateur) : la progression suivra désormais ce code.
   * L'appelant a déjà chargé l'instantané associé ; ici on ne fait que retenir le code.
   */
  async function setSyncCode(code: string) {
    syncCode.value = code
    await idbSet(SYNC_CODE_KEY, code)
  }

  function entry(slug: string): CollectionEntry {
    return entries.value[slug] ?? emptyEntry()
  }

  /**
   * Meilleure variante consignée, ou `null`. Sert partout où il faut représenter le droid
   * par une seule image ou un seul chiffre — vignette, revenu, illustration de carte.
   */
  function highestTier(slug: string): Tier | null {
    return entry(slug).tiers
      .reduce<Tier | null>((h, t) => (!h || TIER_RANK[t] > TIER_RANK[h] ? t : h), null)
  }

  /** `true` dès qu'au moins une variante du droid figure au journal. */
  const owns = (slug: string) => entry(slug).tiers.length > 0

  /**
   * Paliers réellement décrits pour un droid. Les Emblématiques n'en ont qu'un ; les
   * autres en ont six, Galactique compris.
   */
  const tiersOf = (d: Droid) => TIER_ORDER.filter((t) => d.tiers[t])

  /**
   * Nombre de variantes consignées pour un droid.
   *
   * Chaque palier est une entrée indépendante du journal : on compte donc les paliers
   * effectivement cochés, sans rien déduire. On restreint aux paliers que le droid possède
   * réellement, pour qu'une donnée périmée ne puisse pas gonfler le total.
   */
  function ownedTiersOf(d: Droid): number {
    const owned = entry(d.slug).tiers
    return tiersOf(d).filter((t) => owned.includes(t)).length
  }

  const ownedCount = computed(() =>
    droids.value.reduce((n, d) => n + ownedTiersOf(d), 0),
  )
  const totalCount = computed(() =>
    droids.value.reduce((n, d) => n + tiersOf(d).length, 0),
  )

  const countByRarity = computed(() => {
    const acc = {} as Record<Rarity, { owned: number, total: number }>
    for (const r of data.rarities) acc[r] = { owned: 0, total: 0 }
    for (const d of droids.value) {
      acc[d.rarity].total += tiersOf(d).length
      acc[d.rarity].owned += ownedTiersOf(d)
    }
    return acc
  })

  /**
   * Nombre de droids possédés à chaque palier, en comptage exact : un droid en Beskar
   * compte pour Beskar et nulle part ailleurs. C'est la lecture utile pour un
   * collectionneur — « combien de Beskar j'ai » — là où un comptage cumulatif
   * (« au moins Or ») ne ferait que répéter le total.
   */
  const countByTier = computed(() => {
    const acc = {} as Record<Tier, number>
    for (const t of data.tiers) acc[t] = 0
    for (const e of Object.values(entries.value)) {
      for (const t of e.tiers) acc[t] = (acc[t] ?? 0) + 1
    }
    return acc
  })

  /**
   * Progression par palier, en possédé/total — pendant de `countByRarity` côté paliers.
   * Le total d'un palier est le nombre de droids qui *décrivent* ce palier : tous l'ont en
   * Défaut, mais les Emblématiques s'arrêtent là, donc le dénominateur décroît vers le haut.
   * On restreint le comptage aux paliers réellement décrits (`tiersOf`), pour qu'une donnée
   * périmée au journal ne gonfle ni le possédé ni le total.
   */
  const tierProgress = computed(() => {
    const acc = {} as Record<Tier, { owned: number, total: number }>
    for (const t of data.tiers) acc[t] = { owned: 0, total: 0 }
    for (const d of droids.value) {
      const owned = entry(d.slug).tiers
      for (const t of tiersOf(d)) {
        acc[t].total++
        if (owned.includes(t)) acc[t].owned++
      }
    }
    return acc
  })

  /**
   * Revenu total des droids possédés, au palier possédé. Les Emblématiques sont exclus :
   * ils rapportent un pourcentage du revenu global, les additionner n'aurait pas de sens.
   */
  const totalIncome = computed(() =>
    droids.value.reduce((sum, d) => {
      if (d.percentIncome) return sum
      // Un droid ne rapporte qu'une fois : on retient sa meilleure variante consignée,
      // celle qu'on placerait effectivement dans la base.
      const meilleur = highestTier(d.slug)
      return meilleur ? sum + (d.tiers[meilleur]?.income ?? 0) : sum
    }, 0),
  )

  /**
   * Une exigence de renaissance est satisfaite dès qu'on détient **ce palier ou un plus
   * haut**, conformément à la règle du jeu.
   *
   * À ne pas confondre avec le journal lui-même, qui reste strict : consigner un Beskar
   * n'ajoute pas l'Or à la collection, et le compteur ne compte que les variantes
   * réellement obtenues. La souplesse ne vaut que pour le planificateur de renaissances.
   */
  function satisfies(slug: string, required: Tier): boolean {
    const requis = TIER_RANK[required]
    return entry(slug).tiers.some((t) => TIER_RANK[t] >= requis)
  }

  const isEmpty = computed(
    () =>
      !Object.values(entries.value).some((e) => e.tiers.length)
      && rebirth.value === 0
      && superRebirth.value === 0
      && novaCrystals.value === 0
      && !Object.keys(shopLevels.value).length
      && !Object.keys(rebirthChecks.value).length,
  )

  /**
   * Charge le local. Appelé au montage, avant même de savoir si une session existe.
   * Asynchrone depuis le passage à IndexedDB : l'appelant doit attendre, sinon un écran
   * peut se peindre avec une collection vide avant que la vraie n'arrive.
   */
  async function loadLocal() {
    try {
      const local = await readLocal()
      if (local) apply(local)
      syncCode.value = (await idbGet<string>(SYNC_CODE_KEY)) ?? null
    }
    finally {
      // Même si la lecture échoue, on est fixé : l'interface doit cesser d'attendre.
      hydrated.value = true
    }
    // Crée le code au premier passage, puis pousse à chaque visite : cela rafraîchit l'échéance
    // glissante, si bien qu'un code régulièrement ouvert ne périme jamais.
    await ensureSyncCode()
    void pushCode()
  }

  /**
   * Bascule en mode connecté. Si le compte est vierge et que du travail local existe,
   * on le pousse ; sinon le serveur fait autorité, c'est lui qui a vu les autres appareils.
   */
  async function enableRemote() {
    loading.value = true
    syncError.value = null
    try {
      const remote = await ofetch<UserProgress>('/api/progress')
      const remoteEmpty
        = !Object.values(remote.collection ?? {}).some((e) => e.tiers?.length) && !remote.rebirth

      if (remoteEmpty && !isEmpty.value) {
        remoteEnabled.value = true
        await push(snapshot())
      }
      else {
        apply(remote)
        writeLocal()
        remoteEnabled.value = true
      }
    }
    catch (err) {
      syncError.value = err instanceof Error ? err.message : String(err)
    }
    finally {
      loading.value = false
    }
  }

  /** Repasse en mode anonyme sans effacer le local : on redevient un simple visiteur. */
  function disableRemote() {
    remoteEnabled.value = false
    syncError.value = null
  }

  /** Envoie un delta au serveur. Sans session, c'est un no-op silencieux et voulu. */
  async function push(payload: Partial<UserProgress>) {
    if (!remoteEnabled.value) return
    syncing.value = true
    syncError.value = null
    try {
      await ofetch('/api/progress', { method: 'PATCH', body: payload })
    }
    catch (err) {
      syncError.value = err instanceof Error ? err.message : String(err)
    }
    finally {
      syncing.value = false
    }
  }

  /**
   * Ajoute ou retire un palier du journal, sans toucher aux autres.
   *
   * C'est tout l'objet du nouveau modèle : on peut consigner un Beskar sans avoir jamais
   * eu l'Or, et retirer l'Or sans perdre le Beskar. La liste est maintenue triée pour que
   * deux appareils produisent le même document et que la fusion serveur reste stable.
   */
  async function toggleTier(slug: string, tier: Tier) {
    const previous = entry(slug)
    let tiers: Tier[]
    if (previous.tiers.includes(tier)) {
      tiers = previous.tiers.filter((t) => t !== tier)
    }
    else {
      tiers = [...previous.tiers, tier]
      // Cascade : posséder une variante haute implique d'avoir eu le droid, donc son Défaut.
      // On ne coche jamais l'inverse — retirer l'Or ne retire pas le Défaut.
      if (tier !== 'DEFAULT' && !tiers.includes('DEFAULT')) tiers.push('DEFAULT')
      tiers.sort((a, b) => TIER_RANK[a] - TIER_RANK[b])
    }

    const next: CollectionEntry = { ...previous, tiers }
    entries.value = { ...entries.value, [slug]: next }
    writeLocal()
    await push({ collection: { [slug]: next } })
  }

  /**
   * Remplace toute la progression d'un coup — import de fichier. On passe par `apply`
   * pour bénéficier de la migration de forme, puis on pousse l'ensemble au serveur.
   */
  async function replaceAll(next: Snapshot) {
    apply(next)
    writeLocal()
    await push(next)
  }

  /** Consigne ou retire un droid en bloc — utilisé par les Iconiques, qui n'ont qu'un palier. */
  async function setOwned(slug: string, owned: boolean, tier: Tier = 'DEFAULT') {
    const next: CollectionEntry = { ...entry(slug), tiers: owned ? [tier] : [] }
    entries.value = { ...entries.value, [slug]: next }
    writeLocal()
    await push({ collection: { [slug]: next } })
  }

  /**
   * Marque en bloc une liste de droids comme **entièrement possédés** (tous leurs paliers) ou
   * remis à zéro. Cocher soixante Typiques un par un n'a aucun sens quand on les a déjà tous :
   * le « Tout posséder » du filtre passe par ici, en une écriture.
   */
  async function setOwnedBulk(slugs: string[], owned: boolean) {
    const bySlug = new Map(data.droids.map((d) => [d.slug, d]))
    const next = { ...entries.value }
    const delta: Record<string, CollectionEntry> = {}
    for (const slug of slugs) {
      const d = bySlug.get(slug)
      if (!d) continue
      const e: CollectionEntry = { ...(next[slug] ?? emptyEntry()), tiers: owned ? tiersOf(d) : [] }
      next[slug] = e
      delta[slug] = e
    }
    entries.value = next
    writeLocal()
    await push({ collection: delta })
  }

  /**
   * Coche ou retire **un palier précis pour tous les droids qui le possèdent** — le pendant
   * de `setOwnedBulk` côté palier, utilisé par le « tout posséder » du filtre de palier. On
   * ignore les droids qui ne décrivent pas ce palier (un Emblématique n'a pas de Beskar), et
   * les entrées déjà dans l'état voulu, pour n'envoyer qu'un delta minimal au serveur.
   */
  async function setTierOwnedBulk(tier: Tier, owned: boolean) {
    const next = { ...entries.value }
    const delta: Record<string, CollectionEntry> = {}
    for (const d of data.droids) {
      if (!d.tiers[tier]) continue
      const previous = next[d.slug] ?? emptyEntry()
      if (previous.tiers.includes(tier) === owned) continue
      let tiers: Tier[]
      if (owned) {
        tiers = [...previous.tiers, tier]
        // Même cascade que `toggleTier` : cocher un palier coche aussi le Défaut du droid.
        if (tier !== 'DEFAULT' && !tiers.includes('DEFAULT') && d.tiers.DEFAULT) tiers.push('DEFAULT')
        tiers.sort((a, b) => TIER_RANK[a] - TIER_RANK[b])
      }
      else {
        tiers = previous.tiers.filter((t) => t !== tier)
      }
      const e: CollectionEntry = { ...previous, tiers }
      next[d.slug] = e
      delta[d.slug] = e
    }
    entries.value = next
    writeLocal()
    await push({ collection: delta })
  }

  /** `true` si l'exigence de renaissance identifiée par `key` est cochée. */
  const isRebirthChecked = (key: string) => rebirthChecks.value[key] === true

  /**
   * Coche ou décoche une exigence de renaissance, **sans jamais toucher la collection**.
   *
   * C'est un suivi propre à la vue Renaissances : chaque exigence (`cycle:niveau:slug:palier`)
   * s'active ou se désactive pour elle-même. Purement local — la progression de renaissance
   * n'a pas à voyager par la réplication de compte ; le code de synchro, lui, l'emporte.
   */
  function toggleRebirthCheck(key: string) {
    if (rebirthChecks.value[key]) {
      // Retrait sans `delete` dynamique : on reconstruit l'objet sans la clé visée.
      const { [key]: _retire, ...reste } = rebirthChecks.value
      rebirthChecks.value = reste
    }
    else {
      rebirthChecks.value = { ...rebirthChecks.value, [key]: true }
    }
    writeLocal()
  }

  async function toggleFlawless(slug: string) {
    const previous = entry(slug)
    const next: CollectionEntry = { ...previous, flawless: !previous.flawless }
    entries.value = { ...entries.value, [slug]: next }
    writeLocal()
    await push({ collection: { [slug]: next } })
  }

  async function setShopLevel(itemId: string, level: number) {
    shopLevels.value = { ...shopLevels.value, [itemId]: level }
    writeLocal()
    await push({ shopLevels: { [itemId]: level } })
  }

  async function setNovaCrystals(value: number) {
    novaCrystals.value = value
    writeLocal()
    await push({ novaCrystals: value })
  }

  async function setRebirth(value: number) {
    rebirth.value = value
    writeLocal()
    await push({ rebirth: value })
  }

  async function setSuperRebirth(value: number, nextCycle: number) {
    superRebirth.value = value
    cycle.value = nextCycle
    writeLocal()
    await push({ superRebirth: value, cycle: nextCycle })
  }

  /**
   * Choisit directement le cycle d'exigences affiché, sans passer par un Super Rebirth.
   *
   * En jeu, le cycle se déduit du nombre de Super Rebirths (`(n % 4) + 1`) ; c'est ce que
   * fait `setSuperRebirth`. Mais un joueur veut aussi pouvoir consulter un autre cycle que
   * le sien — anticiper ce qu'exigera le prochain, comparer. Ce réglage sert cette
   * consultation : il fixe le cycle montré, indépendamment du compteur de Super Rebirths,
   * qu'il ne touche pas. Les deux peuvent donc diverger, et c'est voulu.
   */
  async function setCycle(value: number) {
    cycle.value = value
    writeLocal()
    await push({ cycle: value })
  }

  /**
   * Remet tout à zéro, local **et** serveur.
   *
   * L'effacement distant n'était pas fait : la progression revenait à la reconnexion
   * suivante, ce qui rendait le bouton trompeur. On vide le local d'abord — l'utilisateur
   * voit l'effet immédiatement — puis on supprime le document si une session est active.
   */
  async function clear() {
    apply({})
    await idbDel(STORAGE_KEY)
    // On vide TOUT le storage local — progression (IndexedDB) et préférences (`droidex:*` en
    // localStorage : filtres, budget, onboarding). Seul survit le code de sauvegarde, rangé à
    // part dans IndexedDB : il reste l'identité de l'appareil pour la synchronisation à venir.
    if (!import.meta.server) {
      for (const k of Object.keys(localStorage)) {
        if (k.startsWith('droidex:')) localStorage.removeItem(k)
      }
    }
    // La progression vidée est répliquée sous le même code pour que le serveur reflète l'effacement.
    if (!remoteEnabled.value) {
      void pushCode()
      return
    }

    syncing.value = true
    syncError.value = null
    try {
      await ofetch('/api/progress', { method: 'DELETE' })
    }
    catch (err) {
      syncError.value = err instanceof Error ? err.message : String(err)
    }
    finally {
      syncing.value = false
    }
  }

  return {
    droids,
    dataset: data,
    entries,
    rebirth,
    superRebirth,
    cycle,
    novaCrystals,
    shopLevels,
    rebirthChecks,
    syncCode,
    hydrated,
    remoteEnabled,
    loading,
    syncing,
    syncError,
    entry,
    highestTier,
    owns,
    ownedCount,
    totalCount,
    countByRarity,
    countByTier,
    tierProgress,
    totalIncome,
    isEmpty,
    satisfies,
    isRebirthChecked,
    toggleRebirthCheck,
    loadLocal,
    replaceAll,
    enableRemote,
    disableRemote,
    toggleTier,
    setOwned,
    setOwnedBulk,
    setTierOwnedBulk,
    setSyncCode,
    toggleFlawless,
    setShopLevel,
    setNovaCrystals,
    setRebirth,
    setSuperRebirth,
    setCycle,
    clear,
  }
})
