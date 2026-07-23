<script setup lang="ts">
import type { Tier } from '~~/shared/types/droid'

/**
 * Badge de palier, teinté à la couleur du palier — pendant de `RarityBadge` pour les
 * paliers. Utilisé là où l'on affiche un palier requis (exigences de renaissance) plutôt
 * qu'un simple libellé gris, pour qu'un Beskar se lise comme du Beskar et un Galactique
 * comme du Galactique.
 */
defineProps<{ tier: Tier }>()

const MODIFIER: Record<Tier, string> = {
  DEFAULT: 'dx-badge--tier-default',
  GOLD: 'dx-badge--tier-gold',
  DIAMOND: 'dx-badge--tier-diamond',
  RAINBOW: 'dx-badge--tier-rainbow',
  BESKAR: 'dx-badge--tier-beskar',
  GALACTIC: 'dx-badge--tier-galactic',
}
</script>

<template>
  <span
    class="dx-badge"
    :class="MODIFIER[tier]"
  >
    {{ $t(`tier.${tier}`) }}
  </span>
</template>
