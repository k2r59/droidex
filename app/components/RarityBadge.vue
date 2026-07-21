<script setup lang="ts">
import type { Rarity } from '~~/shared/types/droid'

defineProps<{ rarity: Rarity }>()

/**
 * Le kit nomme la rareté Emblématique `emblematic` là où le dataset dit `iconic`.
 * La correspondance est explicite plutôt que calculée : elle est arbitraire et
 * doit rester visible.
 */
const MODIFIER: Record<Rarity, string> = {
  common: 'dx-badge--common',
  rare: 'dx-badge--rare',
  epic: 'dx-badge--epic',
  legendary: 'dx-badge--legendary',
  mythic: 'dx-badge--mythic',
  iconic: 'dx-badge--emblematic',
}
</script>

<template>
  <span class="dx-badge" :class="MODIFIER[rarity]">
    {{ $t(`rarity.${rarity}`) }}
  </span>
</template>
