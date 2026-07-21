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

const emptyEntry = (): CollectionEntry => ({ tier: null, flawless: false })

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
    entries.value = s.collection ?? {}
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
   * Paliers réellement décrits pour un droid. Les Emblématiques n'en ont qu'un ; les
   * autres en ont six, Galactique compris.
   */
  const tiersOf = (d: Droid) => TIER_ORDER.filter((t) => d.tiers[t])

  /**
   * Nombre de variantes possédées pour un droid.
   *
   * On collectionne une entrée **par palier**, pas par droid : un MOUSE Beskar vaut cinq
   * variantes — Typique, Or, Diamant, Arc-en-ciel, Beskar — puisqu'un palier supérieur
   * satisfait toujours les inférieurs, règle déjà portée par `satisfies()`.
   */
  function ownedTiersOf(d: Droid): number {
    const owned = entry(d.slug).tier
    if (!owned) return 0
    return tiersOf(d).filter((t) => TIER_RANK[t] <= TIER_RANK[owned]).length
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
      if (e.tier) acc[e.tier] = (acc[e.tier] ?? 0) + 1
    }
    return acc
  })

  /**
   * Revenu total des droids possédés, au palier possédé. Les Emblématiques sont exclus :
   * ils rapportent un pourcentage du revenu global, les additionner n'aurait pas de sens.
   */
  const totalIncome = computed(() =>
    droids.value.reduce((sum, d) => {
      const tier = entry(d.slug).tier
      if (!tier || d.percentIncome) return sum
      return sum + (d.tiers[tier]?.income ?? 0)
    }, 0),
  )

  /** Un palier possédé satisfait toute exigence d'un palier inférieur ou égal. */
  function satisfies(slug: string, required: Tier): boolean {
    const owned = entry(slug).tier
    return owned !== null && TIER_RANK[owned] >= TIER_RANK[required]
  }

  const isEmpty = computed(
    () =>
      !Object.values(entries.value).some((e) => e.tier !== null) &&
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
        !Object.values(remote.collection ?? {}).some((e) => e.tier !== null) && !remote.rebirth

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

  async function setTier(slug: string, tier: Tier | null) {
    const next: CollectionEntry = { ...entry(slug), tier }
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
    setTier,
    toggleFlawless,
    setShopLevel,
    setNovaCrystals,
    setRebirth,
    setSuperRebirth,
    clear,
  }
})
