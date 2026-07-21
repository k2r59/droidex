<script setup lang="ts">
/**
 * Bannière d'accueil : titre, anneau de complétion et répartition par rareté.
 *
 * L'illustration vient du pack d'assets. Elle est servie en trois largeurs via `srcset` :
 * la scène est claire et détaillée, un seul fichier obligerait soit à sur-servir le
 * mobile, soit à dégrader le desktop.
 *
 * Le dégradé de lecture est presque opaque à gauche puis s'ouvre vers la droite — c'est
 * ce qui garde le texte lisible sur une image aussi lumineuse.
 */
import heroLarge from '~/assets/images/hero-tatooine-1686.webp'
import heroMedium from '~/assets/images/hero-tatooine-1280.webp'
import heroSmall from '~/assets/images/hero-tatooine-860.webp'
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
  <section class="hero-gradient relative overflow-hidden rounded-card border border-edge">
    <!-- Illustration de fond, purement décorative : `alt` vide et retirée de l'ordre de lecture. -->
    <div class="pointer-events-none absolute inset-0" aria-hidden="true">
      <img
        :src="heroLarge"
        :srcset="`${heroSmall} 860w, ${heroMedium} 1280w, ${heroLarge} 1686w`"
        sizes="(max-width: 900px) 100vw, 1440px"
        alt=""
        class="size-full object-cover object-center"
        loading="eager"
        fetchpriority="high"
      >
      <div
        class="absolute inset-0"
        style="background: linear-gradient(90deg, rgb(4 13 27 / 0.97) 0%, rgb(4 13 27 / 0.86) 42%, rgb(4 13 27 / 0.35) 100%)"
      />
    </div>

    <div class="relative flex flex-col gap-5 p-6 lg:flex-row lg:items-center lg:p-8">
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

    <div class="relative flex flex-wrap gap-2 px-6 pb-4 lg:px-8">
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
      class="relative mx-6 mb-6 flex items-center gap-2 rounded-card border border-edge bg-void/60 px-4 py-3 text-sm text-ink-muted backdrop-blur lg:mx-8"
    >
      <span aria-hidden="true">🔒</span>
      {{ $t('auth.signInPrompt') }}
    </p>
  </section>
</template>
