<script setup lang="ts">
import type { Rarity } from '~~/shared/types/droid'

defineProps<{ rarity: Rarity }>()

const CLASS: Record<Rarity, string> = {
  common: 'bg-common/15 text-common',
  rare: 'bg-rare/15 text-rare',
  epic: 'bg-epic/15 text-epic',
  legendary: 'bg-legendary/15 text-legendary',
  mythic: 'bg-mythic/15 text-mythic',
  iconic: 'bg-iconic/15 text-iconic',
}
</script>

<template>
  <span
    class="rounded px-1.5 py-0.5 text-xs font-medium uppercase tracking-wide"
    :class="CLASS[rarity]"
  >
    {{ $t(`rarity.${rarity}`) }}
  </span>
</template>
