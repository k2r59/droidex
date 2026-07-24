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

/** Cliquer une pastille remonte le palier au parent, qui filtre la liste et y défile. */
const emit = defineEmits<{ select: [tier: string] }>()

const completion = computed(() =>
  store.totalCount ? Math.round((store.ownedCount / store.totalCount) * 100) : 0,
)

/** Périmètre du cercle de progression, pour piloter le trait en dasharray. */
const RADIUS = 42
const CIRCUMFERENCE = 2 * Math.PI * RADIUS

const TIER_TEXT: Record<string, string> = {
  DEFAULT: 'text-tier-default',
  GOLD: 'text-tier-gold',
  DIAMOND: 'text-tier-diamond',
  RAINBOW: 'text-tier-rainbow',
  BESKAR: 'text-tier-beskar',
  GALACTIC: 'text-tier-galactic',
}

/**
 * Pastille de palier : contour teinté et lavis dégradé qui s'éteint vers la droite, pour
 * que le compteur reste lisible par-dessus l'illustration. Les classes sont écrites en
 * toutes lettres — Tailwind ne génère que ce qu'il trouve littéralement dans les sources.
 */
const TIER_CHIP: Record<string, string> = {
  DEFAULT: 'border-tier-default/45 from-tier-default/15',
  GOLD: 'border-tier-gold/45 from-tier-gold/20',
  DIAMOND: 'border-tier-diamond/45 from-tier-diamond/20',
  RAINBOW: 'border-tier-rainbow/45 from-tier-rainbow/22',
  BESKAR: 'border-tier-beskar/45 from-tier-beskar/20',
  GALACTIC: 'border-tier-galactic/45 from-tier-galactic/22',
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
      <button
        v-for="tr in store.dataset.tiers"
        :key="tr"
        type="button"
        class="flex min-w-[9rem] items-center justify-between gap-4 rounded-md border bg-gradient-to-r to-transparent bg-void/55 px-3.5 py-1.5 text-left backdrop-blur transition-transform hover:-translate-y-px hover:brightness-125"
        :class="TIER_CHIP[tr]"
        @click="emit('select', tr)"
      >
        <span
          class="text-[0.8125rem] font-semibold"
          :class="TIER_TEXT[tr]"
        >{{ $t(`tier.${tr}`) }}</span>
        <!-- Compteur dans la couleur du palier ; une coche quand le palier est complet. -->
        <span
          class="flex items-center gap-1 font-mono text-[0.8125rem] font-bold tabular-nums"
          :class="TIER_TEXT[tr]"
        >
          <DxIcon
            v-if="store.tierProgress[tr].total && store.tierProgress[tr].owned >= store.tierProgress[tr].total"
            name="actions/check"
            :size="13"
          />
          {{ store.tierProgress[tr].owned }}/{{ store.tierProgress[tr].total }}
        </span>
      </button>
    </div>
  </PageBanner>
</template>
