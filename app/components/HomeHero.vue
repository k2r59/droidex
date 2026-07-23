<script setup lang="ts">
/**
 * Bannière d'accueil : titre, anneau de complétion et répartition par rareté.
 *
 * L'illustration et le voile de lecture sont pris en charge par `PageBanner`, qui gère
 * les trois cadrages du pack. On avait d'abord la scène cinématique de Tatooine, mais
 * elle est si lumineuse qu'il fallait la masquer à 97 % pour lire le titre — autant
 * utiliser la bannière prévue pour cette page, sombre et sans texte.
 */

const store = useCollectionStore()

const completion = computed(() =>
  store.totalCount ? Math.round((store.ownedCount / store.totalCount) * 100) : 0,
)

/** Périmètre du cercle de progression, pour piloter le trait en dasharray. */
const RADIUS = 42
const CIRCUMFERENCE = 2 * Math.PI * RADIUS

const RARITY_TEXT: Record<string, string> = {
  common: 'text-common',
  rare: 'text-rare',
  epic: 'text-epic',
  legendary: 'text-legendary',
  mythic: 'text-mythic',
  iconic: 'text-iconic',
}

/**
 * Pastille de rareté : contour teinté et lavis dégradé qui s'éteint vers la droite, pour
 * que le compteur reste lisible par-dessus l'illustration. Les classes sont écrites en
 * toutes lettres — Tailwind ne génère que ce qu'il trouve littéralement dans les sources.
 */
const RARITY_CHIP: Record<string, string> = {
  common: 'border-common/45 from-common/12',
  rare: 'border-rare/45 from-rare/20',
  epic: 'border-epic/45 from-epic/20',
  legendary: 'border-legendary/45 from-legendary/22',
  mythic: 'border-mythic/45 from-mythic/22',
  iconic: 'border-iconic/45 from-iconic/20',
}
</script>

<template>
  <PageBanner
    name="droidex"
    min-height="15rem"
  >
    <div class="flex flex-col gap-5 lg:flex-row lg:items-center">
      <div class="flex-1">
        <h1 class="text-4xl font-bold tracking-tight lg:text-5xl">
          DROIDEX
        </h1>
        <!-- Sous-titre traité comme un titre : Rajdhani, pas Inter. -->
        <p class="mt-1 font-display text-lg font-semibold">
          {{ $t('home.subtitle') }}
        </p>
        <p class="mt-2 max-w-sm text-sm text-ink-muted">
          {{ $t('home.tagline') }}
        </p>
      </div>

      <!-- Anneau de complétion : la métrique que le joueur vient chercher en premier. -->
      <div class="flex shrink-0 flex-col items-center gap-1">
        <div class="relative grid size-32 place-items-center">
          <svg
            class="absolute inset-0 -rotate-90"
            viewBox="0 0 100 100"
          >
            <!-- Disque plein : il détache le chiffre de l'illustration, qui est claire. -->
            <circle
              cx="50"
              cy="50"
              :r="RADIUS - 4"
              class="fill-void/70"
            />
            <circle
              cx="50"
              cy="50"
              :r="RADIUS"
              fill="none"
              stroke="currentColor"
              stroke-width="9"
              class="text-edge/70"
            />
            <circle
              cx="50"
              cy="50"
              :r="RADIUS"
              fill="none"
              stroke="currentColor"
              stroke-width="9"
              stroke-linecap="round"
              class="text-accent drop-shadow-[0_0_6px_rgba(37,215,255,0.55)] transition-[stroke-dashoffset] duration-700"
              :stroke-dasharray="CIRCUMFERENCE"
              :stroke-dashoffset="CIRCUMFERENCE * (1 - completion / 100)"
            />
          </svg>
          <!-- `relative` obligatoire : le SVG est positionné, il passerait sinon par-dessus. -->
          <span
            class="relative font-mono text-3xl font-bold tabular-nums text-ink-strong transition-opacity"
            :class="!store.hydrated && 'opacity-30'"
          >{{ completion }}%</span>
        </div>
      </div>
    </div>

    <div class="flex flex-wrap justify-center gap-2 lg:justify-start">
      <div
        v-for="r in store.dataset.rarities"
        :key="r"
        class="flex min-w-[9rem] items-center justify-between gap-4 rounded-md border bg-gradient-to-r to-transparent bg-void/55 px-3.5 py-1.5 backdrop-blur"
        :class="RARITY_CHIP[r]"
      >
        <span
          class="text-[0.8125rem] font-semibold"
          :class="RARITY_TEXT[r]"
        >{{ $t(`rarity.${r}`) }}</span>
        <!-- Compteur dans la couleur de la rareté, comme le libellé. -->
        <span
          class="font-mono text-[0.8125rem] font-bold tabular-nums"
          :class="RARITY_TEXT[r]"
        >
          {{ store.countByRarity[r].owned }}/{{ store.countByRarity[r].total }}
        </span>
      </div>
    </div>
  </PageBanner>
</template>
