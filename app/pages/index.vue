<script setup lang="ts">
import type { Droid, DroidType, Rarity } from '~~/shared/types/droid'

const store = useCollectionStore()
const { t, locale } = useI18n()

useSeoMeta({
  title: () => t('droidex.title'),
  description: () => t('app.tagline'),
})

const search = ref('')
// Les filtres survivent au rechargement : on revient souvent sur la même vue en jouant.
const rarity = useHydratedStorage<Rarity | 'all'>('droidex:rarity', 'all')
const type = useHydratedStorage<DroidType | 'all'>('droidex:type', 'all')
const ownership = useHydratedStorage<'all' | 'owned' | 'missing' | 'flawless'>('droidex:ownership', 'all')
const sort = useHydratedStorage<'rarity' | 'income' | 'cost' | 'name'>('droidex:sort', 'rarity')

const RARITY_ORDER = store.dataset.rarities

/**
 * Un filtre passé en URL (`/?rarity=iconic`) l'emporte au chargement sur le filtre
 * mémorisé. Sans ça, les liens « voir tous les Emblématiques » du rail n'avaient aucun
 * effet : la page se rouvrait sur le dernier filtre stocké, quel qu'il soit.
 *
 * Appliqué après le montage, pour ne pas entrer en conflit avec `useHydratedStorage`,
 * qui adopte la valeur du stockage à ce moment-là.
 */
const route = useRoute()
onMounted(() => {
  const demande = route.query.rarity
  if (typeof demande === 'string' && (RARITY_ORDER as readonly string[]).includes(demande)) {
    rarity.value = demande as Rarity
  }
})

const filtered = computed(() => {
  const q = search.value.trim().toLowerCase()

  const list = store.droids.filter((d) => {
    if (q && !d.name.toLowerCase().includes(q)) return false
    if (rarity.value !== 'all' && d.rarity !== rarity.value) return false
    if (type.value !== 'all' && d.type !== type.value) return false

    const entry = store.entry(d.slug)
    if (ownership.value === 'owned' && !entry.tiers.length) return false
    if (ownership.value === 'missing' && entry.tiers.length) return false
    if (ownership.value === 'flawless' && !entry.flawless) return false
    return true
  })

  // Le revenu de base sert de départage : à rareté égale, le classement du jeu suit le CPS.
  // On le lit sur le droid déjà en main : le chercher par slug relançait un parcours
  // linéaire deux fois par comparaison, soit un tri en O(n² log n) pour rien.
  const income = (d: Droid) => d.tiers.DEFAULT?.income ?? 0

  return [...list].sort((a, b) => {
    switch (sort.value) {
      case 'income':
        return (b.tiers.DEFAULT?.income ?? 0) - (a.tiers.DEFAULT?.income ?? 0)
      case 'cost':
        return (b.tiers.DEFAULT?.cost ?? 0) - (a.tiers.DEFAULT?.cost ?? 0)
      case 'name':
        return a.name.localeCompare(b.name, locale.value)
      default:
        return (
          RARITY_ORDER.indexOf(a.rarity) - RARITY_ORDER.indexOf(b.rarity)
          || income(a) - income(b)
        )
    }
  })
})

const hasFilters = computed(
  () =>
    Boolean(search.value)
    || rarity.value !== 'all'
    || type.value !== 'all'
    || ownership.value !== 'all',
)

function resetFilters() {
  search.value = ''
  rarity.value = 'all'
  type.value = 'all'
  ownership.value = 'all'
}

// « / » pour chercher, « Échap » pour effacer : raccourcis attendus sur ce type d'outil.
const searchInput = useTemplateRef<HTMLInputElement>('searchInput')
onKeyStroke('/', (e) => {
  if (document.activeElement?.tagName === 'INPUT') return
  e.preventDefault()
  searchInput.value?.focus()
})
onKeyStroke('Escape', () => {
  if (document.activeElement === searchInput.value) search.value = ''
})
</script>

<template>
  <div class="flex flex-col gap-5">
    <HomeHero />

    <div class="grid gap-3 @4xl:grid-cols-2">
      <!-- Horloge live : le serveur rendrait une heure différente de celle du client,
           ce qui casse l'hydratation. Aucun intérêt en SSR, donc client uniquement. -->
      <ClientOnly>
        <SandcrawlerTimers />
        <template #fallback>
          <div class="h-48 animate-pulse rounded-card border border-edge bg-panel" />
        </template>
      </ClientOnly>

      <NextPurchaseAdvisor />
    </div>

    <IconicPanel variant="strip" />

    <h2 class="text-sm font-bold uppercase tracking-wide">
      {{ $t('home.allDroids') }}
    </h2>

    <!-- Barre de filtres collante : sur une grille de 69 cartes, la perdre au scroll
         obligerait à remonter à chaque changement de filtre. -->
    <!--
      La marge négative étend le fond de la barre jusqu'aux bords de l'écran, sinon le
      contenu défilant apparaît dans les gouttières en la traversant. Elle doit suivre le
      padding réel de `main` — `px-3`, puis `px-4` à partir de `sm` — sans quoi elle
      dépasse de 4 px sur mobile et fait défiler toute la page horizontalement.
    -->
    <div class="sticky top-[68px] z-30 -mx-3 flex flex-col gap-3 bg-void/95 px-3 py-3 backdrop-blur sm:-mx-4 sm:px-4">
      <div class="flex flex-wrap items-center gap-2">
        <div class="relative min-w-48 flex-1">
          <input
            ref="searchInput"
            v-model="search"
            type="search"
            :placeholder="$t('droidex.search')"
            class="w-full rounded-card border border-edge bg-panel py-2.5 pl-9 pr-3 text-sm placeholder:text-ink-muted focus:border-accent focus:outline-none"
          >
          <span class="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-muted">⌕</span>
        </div>

        <select
          v-model="rarity"
          class="rounded-card border border-edge bg-panel px-3 py-2.5 text-sm"
        >
          <option value="all">
            {{ $t('droidex.filterRarity') }} — {{ $t('droidex.filterAll') }}
          </option>
          <option
            v-for="r in store.dataset.rarities"
            :key="r"
            :value="r"
          >
            {{ $t(`rarity.${r}`) }}
          </option>
        </select>

        <select
          v-model="type"
          class="rounded-card border border-edge bg-panel px-3 py-2.5 text-sm"
        >
          <option value="all">
            {{ $t('droidex.filterType') }} — {{ $t('droidex.filterAll') }}
          </option>
          <option
            v-for="ty in store.dataset.types"
            :key="ty"
            :value="ty"
          >
            {{ $t(`type.${ty}`) }}
          </option>
        </select>

        <select
          v-model="sort"
          class="rounded-card border border-edge bg-panel px-3 py-2.5 text-sm"
        >
          <option
            v-for="s in (['rarity', 'income', 'cost', 'name'] as const)"
            :key="s"
            :value="s"
          >
            {{ $t('droidex.sortBy') }} : {{ $t(`droidex.sort.${s}`) }}
          </option>
        </select>
      </div>

      <!--
        Le style des pastilles est écrit ici plutôt qu'emprunté à `dx-button` : celui-ci
        impose une hauteur minimale de 42 px, qui gonflait la pastille active en ovale à
        côté des autres, hautes de 26 px.
      -->
      <div class="flex flex-wrap items-center gap-2">
        <button
          v-for="o in (['all', 'owned', 'missing', 'flawless'] as const)"
          :key="o"
          type="button"
          class="rounded-full border px-3 py-1 text-xs font-medium transition-colors"
          :class="ownership === o
            ? 'border-[#69ecff] bg-gradient-to-b from-[#54e7ff] to-[#17badc] text-[#00131b]'
            : 'border-transparent bg-panel text-ink-muted hover:text-ink'"
          @click="ownership = o"
        >
          {{ $t(o === 'all' ? 'droidex.filterAll' : `droidex.filter${o.charAt(0).toUpperCase()}${o.slice(1)}`) }}
        </button>

        <button
          v-if="hasFilters"
          type="button"
          class="ml-auto text-xs text-ink-muted underline hover:text-ink"
          @click="resetFilters"
        >
          {{ $t('droidex.resetFilters') }}
        </button>
      </div>
    </div>

    <p
      v-if="!filtered.length"
      class="py-16 text-center text-ink-muted"
    >
      {{ $t('droidex.empty') }}
    </p>

    <div
      v-else
      class="grid grid-cols-1 gap-3 @lg:grid-cols-2 @3xl:grid-cols-3 @6xl:grid-cols-4"
    >
      <DroidCard
        v-for="droid in filtered"
        :key="droid.slug"
        :droid="droid"
      />
    </div>
  </div>
</template>
