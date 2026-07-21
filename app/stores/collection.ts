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

const emptyEntry = (): CollectionEntry => ({ tiers: [], flawless: false })

/** Forme héritée : un seul palier, le plus haut, les inférieurs étant sous-entendus. */
type LegacyEntry = { tier?: Tier | null; tiers?: Tier[]; flawless?: boolean }

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
>

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
    }
  }

  function apply(s: Partial<Snapshot>) {
    entries.value = migrateCollection(s.collection as never)
    rebirth.value = s.rebirth ?? 0
    superRebirth.value = s.superRebirth ?? 0
    cycle.value = s.cycle ?? 1
    novaCrystals.value = s.novaCrystals ?? 0
    shopLevels.value = s.shopLevels ?? {}
  }

  function readLocal(): Snapshot | null {
    if (import.meta.server) return null
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      return raw ? (JSON.parse(raw) as Snapshot) : null
    } catch {
      return null
    }
  }

  function writeLocal() {
    if (import.meta.server) return
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(snapshot()))
    } catch {
      // Stockage indisponible : la session reste utilisable, sans persistance.
    }
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
    const acc = {} as Record<Rarity, { owned: number; total: number }>
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
   * Une exigence de renaissance porte sur un palier **précis**.
   *
   * Le modèle précédent déduisait les paliers inférieurs du plus haut, si bien qu'un
   * Beskar satisfaisait mécaniquement une exigence d'Or. Les paliers étant désormais
   * consignés un à un, cette déduction n'a plus lieu d'être : un joueur qui a obtenu le
   * Beskar sans jamais avoir eu l'Or n'a pas d'Or à placer dans sa base.
   */
  function satisfies(slug: string, required: Tier): boolean {
    return entry(slug).tiers.includes(required)
  }

  const isEmpty = computed(
    () =>
      !Object.values(entries.value).some((e) => e.tiers.length) &&
      rebirth.value === 0 &&
      superRebirth.value === 0 &&
      novaCrystals.value === 0 &&
      !Object.keys(shopLevels.value).length,
  )

  /** Charge le local. Appelé au montage, avant même de savoir si une session existe. */
  function loadLocal() {
    const local = readLocal()
    if (local) apply(local)
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
      const remoteEmpty =
        !Object.values(remote.collection ?? {}).some((e) => e.tiers?.length) && !remote.rebirth

      if (remoteEmpty && !isEmpty.value) {
        remoteEnabled.value = true
        await push(snapshot())
      } else {
        apply(remote)
        writeLocal()
        remoteEnabled.value = true
      }
    } catch (err) {
      syncError.value = err instanceof Error ? err.message : String(err)
    } finally {
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
    } catch (err) {
      syncError.value = err instanceof Error ? err.message : String(err)
    } finally {
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
    const tiers = previous.tiers.includes(tier)
      ? previous.tiers.filter((t) => t !== tier)
      : [...previous.tiers, tier].sort((a, b) => TIER_RANK[a] - TIER_RANK[b])

    const next: CollectionEntry = { ...previous, tiers }
    entries.value = { ...entries.value, [slug]: next }
    writeLocal()
    await push({ collection: { [slug]: next } })
  }

  /** Consigne ou retire un droid en bloc — utilisé par les Iconiques, qui n'ont qu'un palier. */
  async function setOwned(slug: string, owned: boolean, tier: Tier = 'DEFAULT') {
    const next: CollectionEntry = { ...entry(slug), tiers: owned ? [tier] : [] }
    entries.value = { ...entries.value, [slug]: next }
    writeLocal()
    await push({ collection: { [slug]: next } })
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
   * Remet tout à zéro, local **et** serveur.
   *
   * L'effacement distant n'était pas fait : la progression revenait à la reconnexion
   * suivante, ce qui rendait le bouton trompeur. On vide le local d'abord — l'utilisateur
   * voit l'effet immédiatement — puis on supprime le document si une session est active.
   */
  async function clear() {
    apply({})
    writeLocal()
    if (!remoteEnabled.value) return

    syncing.value = true
    syncError.value = null
    try {
      await ofetch('/api/progress', { method: 'DELETE' })
    } catch (err) {
      syncError.value = err instanceof Error ? err.message : String(err)
    } finally {
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
    totalIncome,
    isEmpty,
    satisfies,
    loadLocal,
    enableRemote,
    disableRemote,
    toggleTier,
    setOwned,
    toggleFlawless,
    setShopLevel,
    setNovaCrystals,
    setRebirth,
    setSuperRebirth,
    clear,
  }
})
