<script setup lang="ts">
import type { Droid, Tier } from '~~/shared/types/droid'

const props = defineProps<{
  droid: Droid
  /** Palier possédé, ou `null`. */
  modelValue: Tier | null
  size?: 'sm' | 'md'
}>()

const emit = defineEmits<{
  'update:modelValue': [Tier | null]
  /** Survol d'un palier — permet à la carte de prévisualiser l'illustration correspondante. */
  preview: [Tier | null]
}>()

/** Un droid Emblématique n'a qu'un palier : on affiche une simple bascule possédé/non. */
const tiers = computed(() => Object.keys(props.droid.tiers) as Tier[])

const TIER_CLASS: Record<Tier, string> = {
  DEFAULT: 'bg-tier-default',
  GOLD: 'bg-tier-gold',
  DIAMOND: 'bg-tier-diamond',
  RAINBOW: 'tier-rainbow-bg',
  BESKAR: 'tier-beskar-bg',
  GALACTIC: 'tier-galactic-bg',
}

/**
 * Cliquer sur le palier déjà possédé le retire — c'est le geste attendu pour
 * corriger une erreur, et ça évite un second contrôle « décocher ».
 */
function select(tier: Tier) {
  emit('update:modelValue', props.modelValue === tier ? null : tier)
}

const dotSize = computed(() => (props.size === 'sm' ? 'size-4' : 'size-6'))
</script>

<template>
  <div
    class="flex items-center gap-1"
    role="radiogroup"
    :aria-label="$t('droidex.filterTier')"
    @mouseleave="emit('preview', null)"
  >
    <button
      v-for="tier in tiers"
      :key="tier"
      type="button"
      role="radio"
      :aria-checked="modelValue === tier"
      :title="`${$t(`tier.${tier}`)}${droid.tiers[tier]?.income ? ` — ${formatIncome(droid.tiers[tier]!.income)}` : ''}`"
      class="rounded-full ring-offset-2 ring-offset-panel transition-all hover:scale-125 focus:outline-none focus-visible:ring-2 focus-visible:ring-ink"
      :class="[
        dotSize,
        TIER_CLASS[tier],
        modelValue === tier
          ? 'ring-2 ring-ink scale-110'
          : 'opacity-40 hover:opacity-100',
      ]"
      @click="select(tier)"
      @mouseenter="emit('preview', tier)"
      @focus="emit('preview', tier)"
    >
      <span class="sr-only">{{ $t(`tier.${tier}`) }}</span>
    </button>
  </div>
</template>
