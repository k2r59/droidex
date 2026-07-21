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
const { locale } = useI18n()
const { isAuthenticated } = useAuthSession()

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
</script>

<template>
  <PageBanner name="droidex" min-height="15rem">
    <div class="flex flex-col gap-5 lg:flex-row lg:items-center">
      <div class="flex-1">
        <h1 class="text-4xl font-bold tracking-tight lg:text-5xl">DROIDEX</h1>
        <!-- Sous-titre traité comme un titre : Rajdhani, pas Inter. -->
        <p class="mt-1 font-display text-lg font-semibold">{{ $t('home.subtitle') }}</p>
        <p class="mt-2 max-w-sm text-sm text-ink-muted">{{ $t('home.tagline') }}</p>
      </div>

      <!-- Anneau de complétion : la métrique que le joueur vient chercher en premier. -->
      <div class="flex shrink-0 flex-col items-center gap-1">
        <div class="relative grid size-32 place-items-center">
          <svg class="absolute inset-0 -rotate-90" viewBox="0 0 100 100">
            <circle cx="50" cy="50" :r="RADIUS" fill="none" stroke="currentColor" stroke-width="7" class="text-edge" />
            <circle
              cx="50"
              cy="50"
              :r="RADIUS"
              fill="none"
              stroke="currentColor"
              stroke-width="7"
              stroke-linecap="round"
              class="text-accent transition-[stroke-dashoffset] duration-700"
              :stroke-dasharray="CIRCUMFERENCE"
              :stroke-dashoffset="CIRCUMFERENCE * (1 - completion / 100)"
            />
          </svg>
          <span class="text-3xl font-bold">{{ completion }}%</span>
        </div>
        <p class="text-xs text-ink-muted">{{ $t('stats.totalIncome') }}</p>
        <p class="font-mono text-lg tabular-nums text-accent">{{ formatIncome(store.totalIncome, locale) }}</p>
      </div>
    </div>

    <div class="flex flex-wrap gap-2">
      <div
        v-for="r in store.dataset.rarities"
        :key="r"
        class="flex items-center gap-2 rounded-lg border border-edge bg-void/50 px-3 py-2 backdrop-blur"
      >
        <span class="text-xs font-semibold" :class="RARITY_TEXT[r]">{{ $t(`rarity.${r}`) }}</span>
        <span class="font-mono text-xs tabular-nums text-ink-muted">
          {{ store.countByRarity[r].owned }} / {{ store.countByRarity[r].total }}
        </span>
      </div>
    </div>

    <p
      v-if="!isAuthenticated"
      class="flex items-center gap-2 rounded-card border border-edge bg-void/60 px-4 py-3 text-sm text-ink-muted backdrop-blur"
    >
      <span aria-hidden="true">🔒</span>
      {{ $t('auth.signInPrompt') }}
    </p>
  </PageBanner>
</template>
