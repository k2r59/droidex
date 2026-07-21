<script setup lang="ts">
const store = useCollectionStore()
const { locale } = useI18n()

const completion = computed(() =>
  store.totalCount ? Math.round((store.ownedCount / store.totalCount) * 100) : 0,
)

// Classes littérales : Tailwind scanne le source, une classe construite à la volée
// (`bg-${rarity}`) ne serait jamais générée.
const RARITY_BAR: Record<string, string> = {
  common: 'bg-common',
  rare: 'bg-rare',
  epic: 'bg-epic',
  legendary: 'bg-legendary',
  mythic: 'bg-mythic',
  iconic: 'bg-iconic',
}

const TIER_DOT: Record<string, string> = {
  DEFAULT: 'bg-tier-default',
  GOLD: 'bg-tier-gold',
  DIAMOND: 'bg-tier-diamond',
  RAINBOW: 'tier-rainbow-bg',
  BESKAR: 'tier-beskar-bg',
  GALACTIC: 'tier-galactic-bg',
}

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
  <section class="flex flex-col gap-4 rounded-card border border-edge bg-panel p-6">
    <div class="flex flex-wrap items-baseline justify-between gap-2">
      <div>
        <h1 class="text-xl font-bold">
          {{ $t('droidex.title') }}
        </h1>
        <p class="text-sm text-ink-muted">
          {{ $t('droidex.subtitle', { owned: store.ownedCount, total: store.totalCount }) }}
        </p>
      </div>

      <div class="text-right">
        <p class="font-mono text-2xl font-bold tabular-nums text-iconic">
          {{ completion }}%
        </p>
        <p class="text-xs text-ink-muted">
          {{ $t('stats.totalIncome') }} : {{ formatIncome(store.totalIncome, locale) }}
        </p>
      </div>
    </div>

    <!-- Une barre par rareté plutôt qu'un total unique : c'est là que se lit la
         vraie progression, un joueur peut être à 100 % en Common et 0 % en Mythic. -->
    <div class="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
      <div
        v-for="r in store.dataset.rarities"
        :key="r"
        class="flex flex-col gap-1"
      >
        <div class="flex items-baseline justify-between text-xs">
          <span :class="RARITY_TEXT[r]">{{ $t(`rarity.${r}`) }}</span>
          <span class="font-mono tabular-nums text-ink-muted">
            {{ store.countByRarity[r].owned }}/{{ store.countByRarity[r].total }}
          </span>
        </div>
        <div class="h-1.5 overflow-hidden rounded-full bg-edge">
          <div
            class="h-full rounded-full transition-[width] duration-500"
            :class="RARITY_BAR[r]"
            :style="{ width: `${(store.countByRarity[r].owned / store.countByRarity[r].total) * 100}%` }"
          />
        </div>
      </div>
    </div>

    <!-- Répartition par palier. Les raretés ci-dessus disent QUELS droids sont collectés,
         celle-ci dit à QUEL niveau ils sont montés — c'est là qu'apparaissent Beskar et
         Galactique, qui sont des paliers et non des raretés. -->
    <div>
      <p class="mb-1.5 text-xs uppercase tracking-wide text-ink-muted">
        {{ $t('stats.byTier') }}
      </p>
      <!-- 6 colonnes seulement à partir de `xl` : en dessous, « Arc-en-ciel » et
           « Galactique » se font tronquer. -->
      <ul class="grid grid-cols-2 gap-2 sm:grid-cols-3 xl:grid-cols-6">
        <li
          v-for="tier in store.dataset.tiers"
          :key="tier"
          class="flex items-center gap-2 rounded-lg bg-panel-raised px-2 py-1.5"
          :class="!store.countByTier[tier] && 'opacity-45'"
        >
          <span
            class="size-2.5 shrink-0 rounded-full"
            :class="TIER_DOT[tier]"
          />
          <span class="min-w-0 flex-1 truncate text-xs">{{ $t(`tier.${tier}`) }}</span>
          <span class="font-mono text-sm tabular-nums">{{ store.countByTier[tier] }}</span>
        </li>
      </ul>
    </div>
  </section>
</template>
