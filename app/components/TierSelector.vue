<script setup lang="ts">
import type { Droid, Tier } from '~~/shared/types/droid'

const props = defineProps<{
  droid: Droid
  /** Paliers consignés dans le journal. */
  modelValue: Tier[]
  size?: 'sm' | 'md'
}>()

const emit = defineEmits<{
  /** Palier basculé — l'appelant ajoute ou retire, les autres ne bougent pas. */
  toggle: [Tier]
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
 * Chaque palier se coche et se décoche indépendamment : le Droidex est un journal de
 * variantes obtenues, pas une échelle. Retirer l'Or ne touche donc pas au Beskar.
 */
const owns = (tier: Tier) => props.modelValue.includes(tier)

const dotSize = computed(() => (props.size === 'sm' ? 'size-6' : 'size-8'))
</script>

<template>
  <div
    class="flex items-center gap-3 pointer-coarse:gap-0.5"
    role="group"
    :aria-label="$t('droidex.filterTier')"
    @mouseleave="emit('preview', null)"
  >
    <!--
      La cible tactile et le point visible sont deux choses distinctes. Une pastille de
      24 px est très en dessous des 44 px recommandés au doigt, mais l'agrandir élargirait
      la rangée sur desktop. Le bouton ne grandit donc que sur écran tactile, via
      `pointer-coarse` ; la pastille, elle, garde sa taille partout.
    -->
    <button
      v-for="tier in tiers"
      :key="tier"
      :title="[
        $t(`tier.${tier}`),
        droid.tiers[tier]?.income ? formatIncome(droid.tiers[tier]!.income) : null,
        owns(tier) ? $t('droidex.tierClickToRemove') : null,
      ].filter(Boolean).join(' — ')"
      type="button"
      role="checkbox"
      :aria-checked="owns(tier)"
      class="group grid shrink-0 place-items-center rounded-full transition-transform hover:scale-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-ink pointer-coarse:size-11"
      @click="emit('toggle', tier)"
      @mouseenter="emit('preview', tier)"
      @focus="emit('preview', tier)"
    >
      <span
        class="rounded-full border-2 transition-all"
        :class="[
          dotSize,
          owns(tier)
            ? [TIER_CLASS[tier], 'border-transparent ring-2 ring-ink']
            : 'border-edge-strong bg-transparent group-hover:border-ink-muted',
        ]"
      />
      <span class="sr-only">{{ $t(`tier.${tier}`) }}</span>
    </button>
  </div>
</template>
