<script setup lang="ts">
import type { Droid, DroidType, Rarity, Tier } from '~~/shared/types/droid'

const store = useCollectionStore()
const { t, locale } = useI18n()

useSeoMeta({
  title: () => t('droidex.title'),
  description: () => t('app.tagline'),
})

const search = ref('')
// Les filtres survivent au rechargement : on revient souvent sur la même vue en jouant.
// Le filtre principal est désormais le **palier possédé** ; la rareté est passée en filtre
// avancé. On ouvre sur « tous les paliers », c'est-à-dire la collection entière.
const rarity = useHydratedStorage<Rarity | 'all'>('droidex:rarity', 'all')
const type = useHydratedStorage<DroidType | 'all'>('droidex:type', 'all')
// Palier : filtre principal, sur les droids qui possèdent cette variante (Or, Diamant…).
const tier = useHydratedStorage<Tier | 'all'>('droidex:tier', 'all')
const ownership = useHydratedStorage<'all' | 'owned' | 'missing' | 'flawless'>('droidex:ownership', 'all')
const sort = useHydratedStorage<'rarity' | 'income' | 'cost' | 'name'>('droidex:sort', 'rarity')

/** Un filtre avancé est actif : une pastille le signale sur le bouton « Filtres ». */
const advancedActive = computed(() =>
  type.value !== 'all' || rarity.value !== 'all' || ownership.value !== 'all',
)

/**
 * Filtres avancés (type, rareté, possession, tri) dans une modale. On y édite un **brouillon**
 * appliqué seulement à la validation : ouvrir recopie l'état courant, « Valider » le pousse,
 * fermer sans valider l'abandonne. C'est le comportement attendu d'un « popup + Valider ».
 */
const filterOpen = ref(false)
const draft = reactive({ type: type.value, rarity: rarity.value, ownership: ownership.value, sort: sort.value })

function openFilters() {
  draft.type = type.value
  draft.rarity = rarity.value
  draft.ownership = ownership.value
  draft.sort = sort.value
  filterOpen.value = true
}
function applyFilters() {
  type.value = draft.type
  rarity.value = draft.rarity
  ownership.value = draft.ownership
  sort.value = draft.sort
  filterOpen.value = false
}
function resetDraft() {
  draft.type = 'all'
  draft.rarity = 'all'
  draft.ownership = 'all'
}

const filterDialog = useTemplateRef<HTMLElement>('filterDialog')
useFocusTrap(filterDialog, filterOpen)
onKeyStroke('Escape', () => { if (filterOpen.value) filterOpen.value = false })

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

/**
 * La grille ne liste plus des droids mais des **variantes** : un couple (droid, palier), traité
 * comme un objet de collection à part entière. Un droid ordinaire donne donc six variantes, une
 * par palier ; un Emblématique une seule. Filtrer sur « Or » revient à ne garder que les
 * variantes Or. C'est ce qui donne son sens au filtre de palier et à la carte, qui affiche
 * l'illustration, les stats et la possession propres à CE palier.
 */
interface Variant { droid: Droid, tier: Tier }

/** Rang du palier pour le tri, dérivé de l'ordre du dataset (Défaut → Galactique). */
const TIER_RANK = (t: Tier) => store.dataset.tiers.indexOf(t)

const variants = computed<Variant[]>(() => {
  const q = search.value.trim().toLowerCase()

  const out: Variant[] = []
  for (const d of store.droids) {
    if (q && !d.name.toLowerCase().includes(q)) continue
    if (rarity.value !== 'all' && d.rarity !== rarity.value) continue
    if (type.value !== 'all' && d.type !== type.value) continue

    const entry = store.entry(d.slug)
    if (ownership.value === 'flawless' && !entry.flawless) continue

    for (const tr of Object.keys(d.tiers) as Tier[]) {
      if (tier.value !== 'all' && tr !== tier.value) continue
      const owned = entry.tiers.includes(tr)
      if (ownership.value === 'owned' && !owned) continue
      if (ownership.value === 'missing' && owned) continue
      out.push({ droid: d, tier: tr })
    }
  }

  const income = (v: Variant) => v.droid.tiers[v.tier]?.income ?? 0
  const cost = (v: Variant) => v.droid.tiers[v.tier]?.cost ?? 0

  return out.sort((a, b) => {
    switch (sort.value) {
      case 'income':
        return income(b) - income(a)
      case 'cost':
        return cost(b) - cost(a)
      case 'name':
        return a.droid.name.localeCompare(b.droid.name, locale.value) || TIER_RANK(a.tier) - TIER_RANK(b.tier)
      default:
        // Par rareté, puis par palier croissant, puis par revenu — le classement du jeu.
        return (
          RARITY_ORDER.indexOf(a.droid.rarity) - RARITY_ORDER.indexOf(b.droid.rarity)
          || TIER_RANK(a.tier) - TIER_RANK(b.tier)
          || income(a) - income(b)
        )
    }
  })
})

/**
 * Affichage par tranches : on révèle 20 variantes à la fois via « Voir plus » plutôt que de
 * peindre les 379 d'un coup — la grille reste légère sur mobile, et la liste ne « saute » plus.
 */
const PAGE_SIZE = 20
const visibleCount = ref(PAGE_SIZE)
const shownVariants = computed(() => variants.value.slice(0, visibleCount.value))
// Tout changement de filtre, de recherche ou de tri repart de la première tranche.
watch([search, rarity, type, tier, ownership, sort], () => { visibleCount.value = PAGE_SIZE })

/**
 * Nombre de variantes que donnerait le **brouillon** de filtres avancés — affiché sur le bouton
 * « Valider » pour qu'on sache, avant d'appliquer, combien de droids on va obtenir. On réutilise
 * la même logique que `variants`, mais avec les valeurs du brouillon (rareté, type, possession)
 * et le palier/recherche courants (qui, eux, s'appliquent en direct).
 */
const draftMatchCount = computed(() => {
  const q = search.value.trim().toLowerCase()
  let n = 0
  for (const d of store.droids) {
    if (q && !d.name.toLowerCase().includes(q)) continue
    if (draft.rarity !== 'all' && d.rarity !== draft.rarity) continue
    if (draft.type !== 'all' && d.type !== draft.type) continue
    const entry = store.entry(d.slug)
    if (draft.ownership === 'flawless' && !entry.flawless) continue
    for (const tr of Object.keys(d.tiers) as Tier[]) {
      if (tier.value !== 'all' && tr !== tier.value) continue
      const owned = entry.tiers.includes(tr)
      if (draft.ownership === 'owned' && !owned) continue
      if (draft.ownership === 'missing' && owned) continue
      n++
    }
  }
  return n
})

/**
 * Clic sur une pastille de palier du bandeau d'accueil : on applique le filtre puis on défile
 * jusqu'à la liste. On vise la section par son `id` (plus sûr qu'une ref de template ici), et
 * on attend un `requestAnimationFrame` après le `nextTick` pour que la liste re-filtrée soit
 * mise en page avant de mesurer la position. Le `scroll-mt` de l'ancre dégage l'en-tête.
 */
function focusTier(tr: string) {
  // Cliquer un palier du bandeau repart d'une vue propre : on réinitialise les autres filtres
  // (rareté, type, possession, recherche) pour n'appliquer que ce palier.
  rarity.value = 'all'
  type.value = 'all'
  ownership.value = 'all'
  search.value = ''
  tier.value = tr as Tier
  nextTick(() => requestAnimationFrame(() =>
    document.getElementById('all-droids')?.scrollIntoView({ behavior: 'smooth', block: 'start' }),
  ))
}

/**
 * Changement de palier depuis la barre de filtres : on remet la vue en haut, au niveau du
 * moteur de recherche — sinon, sur mobile, on reste perdu au milieu de la nouvelle liste.
 */
function selectTier(tr: Tier | 'all') {
  tier.value = tr
  nextTick(() => requestAnimationFrame(() =>
    document.getElementById('all-droids')?.scrollIntoView({ behavior: 'smooth', block: 'start' }),
  ))
}

/**
 * Couleurs par palier, en toutes lettres — Tailwind ne génère que ce qu'il trouve dans les
 * sources. `active` habille la puce de filtre sélectionnée ; `ring`/`bar` la barre d'action.
 */
const TIER_STYLE: Record<string, { text: string, bar: string, ring: string, active: string }> = {
  DEFAULT: { text: 'text-tier-default', bar: 'bg-tier-default', ring: 'border-tier-default/40 bg-tier-default/10', active: 'border-tier-default bg-tier-default/15 text-tier-default' },
  GOLD: { text: 'text-tier-gold', bar: 'bg-tier-gold', ring: 'border-tier-gold/40 bg-tier-gold/10', active: 'border-tier-gold bg-tier-gold/15 text-tier-gold' },
  DIAMOND: { text: 'text-tier-diamond', bar: 'bg-tier-diamond', ring: 'border-tier-diamond/40 bg-tier-diamond/10', active: 'border-tier-diamond bg-tier-diamond/15 text-tier-diamond' },
  RAINBOW: { text: 'text-tier-rainbow', bar: 'bg-tier-rainbow', ring: 'border-tier-rainbow/40 bg-tier-rainbow/10', active: 'border-tier-rainbow bg-tier-rainbow/15 text-tier-rainbow' },
  BESKAR: { text: 'text-tier-beskar', bar: 'bg-tier-beskar', ring: 'border-tier-beskar/40 bg-tier-beskar/10', active: 'border-tier-beskar bg-tier-beskar/15 text-tier-beskar' },
  GALACTIC: { text: 'text-tier-galactic', bar: 'bg-tier-galactic', ring: 'border-tier-galactic/40 bg-tier-galactic/10', active: 'border-tier-galactic bg-tier-galactic/15 text-tier-galactic' },
}
const FILTER_CHIP = 'rounded-full border px-3 py-1 text-xs font-semibold transition-colors'

/**
 * Barre d'action contextuelle : quand un palier précis est filtré, on montre sa progression
 * et un « tout posséder / tout retirer » qui coche d'un coup ce palier sur tous les droids
 * qui le possèdent.
 */
const tierStat = computed(() =>
  tier.value !== 'all' ? store.tierProgress[tier.value] : null,
)
const tierPct = computed(() =>
  tierStat.value?.total ? Math.round((tierStat.value.owned / tierStat.value.total) * 100) : 0,
)
const tierComplete = computed(() =>
  Boolean(tierStat.value) && tierStat.value!.owned >= tierStat.value!.total,
)
function toggleTierOwned() {
  if (tier.value === 'all') return
  store.setTierOwnedBulk(tier.value, !tierComplete.value)
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
    <HomeHero @select="focusTier" />

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

    <h2
      id="all-droids"
      class="scroll-mt-24 text-sm font-bold uppercase tracking-wide"
    >
      {{ $t('home.allDroids') }}
    </h2>

    <!--
      Barre de filtres principale : recherche, bouton « Filtres » (ouvre la modale des filtres
      avancés), et la rareté en badges — le sélecteur qu'on utilise le plus. Collante sous
      l'en-tête pour rester à portée pendant qu'on parcourt la grille ; fond opaque + flou
      pour que le contenu ne transparaisse pas au travers.
    -->
    <div class="sticky top-14 z-30 flex flex-col gap-3 rounded-card border border-edge-soft bg-void/95 p-3 backdrop-blur sm:top-[68px] sm:p-4">
      <!-- Recherche + bouton d'ouverture des filtres avancés. -->
      <div class="flex items-center gap-2">
        <div class="relative flex-1">
          <input
            ref="searchInput"
            v-model="search"
            type="search"
            :placeholder="$t('droidex.search')"
            class="w-full rounded-card border border-edge bg-panel py-2.5 pl-9 pr-3 text-sm placeholder:text-ink-muted focus:border-accent focus:outline-none"
          >
          <span class="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-muted">⌕</span>
        </div>
        <button
          type="button"
          class="relative flex shrink-0 items-center gap-2 rounded-card border px-3 py-2.5 text-sm font-medium transition-colors"
          :class="filterOpen || advancedActive ? 'border-accent bg-accent/10 text-accent' : 'border-edge bg-panel text-ink-muted hover:text-ink'"
          aria-haspopup="dialog"
          @click="openFilters"
        >
          <DxIcon
            name="ui/filter"
            :size="16"
          />
          <span>{{ $t('droidex.filters') }}</span>
          <!-- Pastille : des filtres avancés sont actifs même panneau replié. -->
          <span
            v-if="advancedActive"
            class="absolute -right-1 -top-1 size-2 rounded-full bg-accent ring-2 ring-void"
          />
        </button>
      </div>

      <!-- Palier possédé en puces segmentées, chacune teintée de sa couleur. -->
      <div>
        <p class="filter-label">
          {{ $t('droidex.filterTier') }}
        </p>
        <div class="mt-1.5 flex flex-wrap items-center gap-2">
          <button
            type="button"
            :class="[FILTER_CHIP, tier === 'all' ? 'border-accent bg-accent/15 text-accent' : 'border-edge bg-panel text-ink-muted hover:text-ink']"
            @click="selectTier('all')"
          >
            {{ $t('droidex.filterAll') }}
          </button>
          <button
            v-for="tr in store.dataset.tiers"
            :key="tr"
            type="button"
            :class="[FILTER_CHIP, tier === tr ? TIER_STYLE[tr]!.active : 'border-edge bg-panel text-ink-muted hover:text-ink']"
            @click="selectTier(tr)"
          >
            {{ $t(`tier.${tr}`) }}
          </button>
        </div>
      </div>
    </div>

    <!--
      Barre d'action contextuelle : dès qu'un palier précis est filtré, on montre sa
      progression (barre teintée) et un bouton qui coche — ou retire — d'un coup ce palier
      sur tous les droids qui le possèdent. Cocher soixante Or un par un n'a aucun sens.
    -->
    <div
      v-if="tierStat"
      class="flex items-center gap-3 rounded-card border p-2.5"
      :class="TIER_STYLE[tier]!.ring"
    >
      <div class="min-w-0 flex-1">
        <p
          class="flex items-center gap-1.5 text-xs font-semibold"
          :class="TIER_STYLE[tier]!.text"
        >
          <span>{{ $t(`tier.${tier}`) }}</span>
          <span class="font-mono tabular-nums">{{ tierStat.owned }}/{{ tierStat.total }}</span>
          <DxIcon
            v-if="tierComplete"
            name="actions/check"
            :size="13"
          />
        </p>
        <span class="mt-1.5 block h-1 overflow-hidden rounded-full bg-void/60">
          <span
            class="block h-full rounded-full transition-[width] duration-500"
            :class="TIER_STYLE[tier]!.bar"
            :style="{ width: `${tierPct}%` }"
          />
        </span>
      </div>
      <button
        type="button"
        class="flex shrink-0 items-center gap-1.5 rounded-lg border border-edge bg-panel px-3 py-1.5 text-xs font-semibold text-ink transition-colors hover:border-accent"
        @click="toggleTierOwned"
      >
        <DxIcon
          :name="tierComplete ? 'actions/close' : 'actions/check'"
          :size="14"
        />
        {{ tierComplete ? $t('droidex.unmarkAll') : $t('droidex.markAll') }}
      </button>
    </div>

    <p
      v-if="!variants.length"
      class="py-16 text-center text-ink-muted"
    >
      {{ $t('droidex.empty') }}
    </p>

    <div
      v-else
      class="grid grid-cols-1 gap-3 @md:grid-cols-2 @2xl:grid-cols-3 @4xl:grid-cols-4 @6xl:grid-cols-5"
    >
      <DroidVariantCard
        v-for="(v, i) in shownVariants"
        :key="`${v.droid.slug}:${v.tier}`"
        :droid="v.droid"
        :tier="v.tier"
        class="droid-enter"
        :style="{ animationDelay: `${Math.min(i % PAGE_SIZE, 12) * 35}ms` }"
      />
    </div>

    <!-- Révèle la tranche suivante. Le compteur dit ce qu'il reste, pour situer l'ampleur. -->
    <button
      v-if="variants.length > visibleCount"
      type="button"
      class="mx-auto mt-1 flex items-center gap-2 rounded-card border border-edge bg-panel px-5 py-2.5 text-sm font-semibold text-ink-muted transition-colors hover:border-accent hover:text-ink"
      @click="visibleCount += PAGE_SIZE"
    >
      {{ $t('droidex.showMore') }}
      <span class="font-mono tabular-nums text-ink-muted">{{ shownVariants.length }}/{{ variants.length }}</span>
    </button>

    <!--
      Modale des filtres avancés (type, palier, possession, tri). On y édite un brouillon
      appliqué seulement au clic sur « Valider ». Sur mobile elle monte du bas comme une
      feuille, sur desktop elle se centre. Le fond et Échap la ferment sans appliquer.
    -->
    <Teleport to="body">
      <div
        v-if="filterOpen"
        class="fixed inset-0 z-[100] grid place-items-end lg:place-items-center"
      >
        <div
          class="filter-fade absolute inset-0 bg-black/60 backdrop-blur-sm"
          @click="filterOpen = false"
        />
        <div
          ref="filterDialog"
          class="filter-sheet panel relative z-10 flex max-h-[88dvh] w-full flex-col gap-4 overflow-y-auto rounded-b-none rounded-t-2xl p-5 lg:max-w-md lg:rounded-2xl"
          role="dialog"
          aria-modal="true"
          aria-labelledby="filters-title"
        >
          <div class="flex items-center justify-between">
            <h2
              id="filters-title"
              class="flex items-center gap-2 text-lg font-bold"
            >
              <DxIcon
                name="ui/filter"
                :size="18"
                class="text-accent"
              />
              {{ $t('droidex.filters') }}
            </h2>
            <button
              type="button"
              class="dx-icon-button size-8"
              :aria-label="$t('common.close')"
              @click="filterOpen = false"
            >
              <DxIcon
                name="actions/close"
                :size="15"
              />
            </button>
          </div>

          <!-- Type -->
          <div>
            <p class="filter-label">
              {{ $t('droidex.filterType') }}
            </p>
            <div class="mt-1.5 flex flex-wrap gap-2">
              <button
                type="button"
                :class="[FILTER_CHIP, draft.type === 'all' ? 'border-accent bg-accent/15 text-accent' : 'border-edge bg-panel text-ink-muted hover:text-ink']"
                @click="draft.type = 'all'"
              >
                {{ $t('droidex.filterAll') }}
              </button>
              <button
                v-for="ty in store.dataset.types"
                :key="ty"
                type="button"
                :class="[FILTER_CHIP, draft.type === ty ? 'border-accent bg-accent/15 text-accent' : 'border-edge bg-panel text-ink-muted hover:text-ink']"
                @click="draft.type = ty"
              >
                {{ $t(`type.${ty}`) }}
              </button>
            </div>
          </div>

          <!-- Rareté (Typique, Rare, Épique, Légendaire…). -->
          <div>
            <p class="filter-label">
              {{ $t('droidex.filterRarity') }}
            </p>
            <div class="mt-1.5 flex flex-wrap gap-2">
              <button
                type="button"
                :class="[FILTER_CHIP, draft.rarity === 'all' ? 'border-accent bg-accent/15 text-accent' : 'border-edge bg-panel text-ink-muted hover:text-ink']"
                @click="draft.rarity = 'all'"
              >
                {{ $t('droidex.filterAll') }}
              </button>
              <button
                v-for="r in store.dataset.rarities"
                :key="r"
                type="button"
                :class="[FILTER_CHIP, draft.rarity === r ? 'border-accent bg-accent/15 text-accent' : 'border-edge bg-panel text-ink-muted hover:text-ink']"
                @click="draft.rarity = r"
              >
                {{ $t(`rarity.${r}`) }}
              </button>
            </div>
          </div>

          <!-- Possession -->
          <div>
            <p class="filter-label">
              {{ $t('droidex.filterOwnership') }}
            </p>
            <div class="mt-1.5 flex flex-wrap gap-2">
              <button
                v-for="o in (['all', 'owned', 'missing', 'flawless'] as const)"
                :key="o"
                type="button"
                class="rounded-full border px-3 py-1 text-xs font-semibold transition-colors"
                :class="draft.ownership === o
                  ? 'border-[#69ecff] bg-gradient-to-b from-[#54e7ff] to-[#17badc] text-[#00131b]'
                  : 'border-edge bg-panel text-ink-muted hover:text-ink'"
                @click="draft.ownership = o"
              >
                {{ $t(o === 'all' ? 'droidex.filterAll' : `droidex.filter${o.charAt(0).toUpperCase()}${o.slice(1)}`) }}
              </button>
            </div>
          </div>

          <!-- Tri -->
          <div>
            <p class="filter-label">
              {{ $t('droidex.sortBy') }}
            </p>
            <select
              v-model="draft.sort"
              class="mt-1.5 block w-full rounded-card border border-edge bg-panel px-3 py-2 text-sm"
            >
              <option
                v-for="s in (['rarity', 'income', 'cost', 'name'] as const)"
                :key="s"
                :value="s"
              >
                {{ $t(`droidex.sort.${s}`) }}
              </option>
            </select>
          </div>

          <!-- Réinitialiser (le brouillon) + valider. -->
          <div class="mt-1 flex items-center justify-between gap-3 border-t border-edge-soft pt-4">
            <button
              type="button"
              class="text-sm text-ink-muted underline hover:text-ink"
              @click="resetDraft"
            >
              {{ $t('droidex.resetFilters') }}
            </button>
            <button
              type="button"
              class="dx-button dx-button--primary"
              @click="applyFilters"
            >
              <DxIcon
                name="actions/check"
                :size="15"
              />
              {{ $t('common.apply') }}
              <span class="font-mono tabular-nums opacity-80">{{ draftMatchCount }}</span>
            </button>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<style scoped>
/* Intitulé de groupe de filtres : minuscule, en capitales espacées, sobre. */
.filter-label {
  font-size: 10px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.14em;
  color: var(--color-ink-muted);
}

/*
 * Ouverture des filtres. Mobile et tablette : une feuille qui monte du bas (glissement franc,
 * sans rebond — l'animation modale à ressort donnait un à-coup). Desktop (`lg`+) : un simple
 * popup centré qui apparaît en fondu, sans glissement. Le fond se fond dans les deux cas, et
 * `prefers-reduced-motion` coupe tout.
 */
.filter-sheet {
  animation: filter-sheet-in 240ms cubic-bezier(0.22, 1, 0.36, 1) both;
}
.filter-fade {
  animation: filter-fade-in 240ms ease both;
}
@keyframes filter-sheet-in {
  from {
    opacity: 0;
    transform: translateY(28px);
  }
}
@keyframes filter-fade-in {
  from {
    opacity: 0;
  }
}
@media (min-width: 1024px) {
  .filter-sheet {
    animation: filter-pop-in 160ms ease both;
  }
  @keyframes filter-pop-in {
    from {
      opacity: 0;
      transform: scale(0.97);
    }
  }
}
@media (prefers-reduced-motion: reduce) {
  .filter-sheet,
  .filter-fade {
    animation: none;
  }
}

/*
 * Entrée en cascade des cartes de droids : un léger glissement alterné — les impaires
 * arrivent de la gauche, les paires de la droite — avec un décalage progressif plafonné.
 * Comme Vue réutilise le DOM par `key`, seules les cartes nouvellement affichées s'animent :
 * changer de rareté fait « couler » la nouvelle liste, sans rejouer les cartes conservées.
 */
.droid-enter {
  animation-duration: 380ms;
  animation-timing-function: cubic-bezier(0.22, 1, 0.36, 1);
  animation-fill-mode: both;
}
.droid-enter:nth-child(odd) {
  animation-name: droid-in-left;
}
.droid-enter:nth-child(even) {
  animation-name: droid-in-right;
}
@keyframes droid-in-left {
  from {
    opacity: 0;
    transform: translateX(-16px);
  }
}
@keyframes droid-in-right {
  from {
    opacity: 0;
    transform: translateX(16px);
  }
}
@media (prefers-reduced-motion: reduce) {
  .droid-enter {
    animation: none;
  }
}
</style>
