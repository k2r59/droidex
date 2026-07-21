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

const emptyEntry = (): CollectionEntry => ({ tier: null, flawless: false })

export const useCollectionStore = defineStore('collection', () => {
  const droids = computed<Droid[]>(() => data.droids)

  const entries = ref<Record<string, CollectionEntry>>({})
  const rebirth = ref(0)
  const superRebirth = ref(0)
  const cycle = ref(1)
  const novaCrystals = ref(0)
  const shopLevels = ref<Record<string, number>>({})

  const loading = ref(false)
  const syncing = ref(false)
  /** Dernière erreur de synchronisation, affichée en bandeau plutôt qu'avalée. */
  const syncError = ref<string | null>(null)

  function entry(slug: string): CollectionEntry {
    return entries.value[slug] ?? emptyEntry()
  }

  const ownedCount = computed(() => Object.values(entries.value).filter((e) => e.tier !== null).length)
  const totalCount = computed(() => droids.value.length)

  const countByRarity = computed(() => {
    const acc = {} as Record<Rarity, { owned: number; total: number }>
    for (const r of data.rarities) acc[r] = { owned: 0, total: 0 }
    for (const d of droids.value) {
      acc[d.rarity].total += 1
      if (entry(d.slug).tier !== null) acc[d.rarity].owned += 1
    }
    return acc
  })

  /**
   * Revenu total des droids possédés, au palier possédé. Les Iconic sont exclus :
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

  /** Pinia ne fournit pas `$reset` sur les stores en syntaxe setup — on le fait à la main. */
  function reset() {
    entries.value = {}
    rebirth.value = 0
    superRebirth.value = 0
    cycle.value = 1
    novaCrystals.value = 0
    shopLevels.value = {}
    syncError.value = null
  }

  async function load() {
    loading.value = true
    syncError.value = null
    try {
      const p = await ofetch<UserProgress>('/api/progress')
      entries.value = p.collection ?? {}
      rebirth.value = p.rebirth ?? 0
      superRebirth.value = p.superRebirth ?? 0
      cycle.value = p.cycle ?? 1
      novaCrystals.value = p.novaCrystals ?? 0
      shopLevels.value = p.shopLevels ?? {}
    } catch (err) {
      syncError.value = err instanceof Error ? err.message : String(err)
    } finally {
      loading.value = false
    }
  }

  /**
   * Applique le changement localement d'abord (l'UI reste réactive), puis persiste.
   * En cas d'échec réseau on restaure l'état précédent : une case qui reste cochée
   * alors que rien n'a été enregistré est pire qu'un décochage visible.
   */
  async function patch(payload: Partial<UserProgress>) {
    syncing.value = true
    syncError.value = null
    try {
      await ofetch('/api/progress', { method: 'PATCH', body: payload })
    } catch (err) {
      syncError.value = err instanceof Error ? err.message : String(err)
      await load()
    } finally {
      syncing.value = false
    }
  }

  async function setTier(slug: string, tier: Tier | null) {
    const previous = entry(slug)
    const next: CollectionEntry = { ...previous, tier }
    entries.value = { ...entries.value, [slug]: next }
    await patch({ collection: { [slug]: next } })
  }

  async function toggleFlawless(slug: string) {
    const previous = entry(slug)
    const next: CollectionEntry = { ...previous, flawless: !previous.flawless }
    entries.value = { ...entries.value, [slug]: next }
    await patch({ collection: { [slug]: next } })
  }

  async function setShopLevel(itemId: string, level: number) {
    shopLevels.value = { ...shopLevels.value, [itemId]: level }
    await patch({ shopLevels: { [itemId]: level } })
  }

  async function setNovaCrystals(value: number) {
    novaCrystals.value = value
    await patch({ novaCrystals: value })
  }

  async function setRebirth(value: number) {
    rebirth.value = value
    await patch({ rebirth: value })
  }

  async function setSuperRebirth(value: number, nextCycle: number) {
    superRebirth.value = value
    cycle.value = nextCycle
    await patch({ superRebirth: value, cycle: nextCycle })
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
    loading,
    syncing,
    syncError,
    entry,
    ownedCount,
    totalCount,
    countByRarity,
    totalIncome,
    satisfies,
    reset,
    load,
    setTier,
    toggleFlawless,
    setRebirth,
    setShopLevel,
    setNovaCrystals,
    setSuperRebirth,
  }
})
