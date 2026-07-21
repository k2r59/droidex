<script setup lang="ts">
import type { Droid } from '~~/shared/types/droid'

/**
 * Carte d'un droid Emblématique. Partagée entre le panneau latéral (grands écrans) et
 * la bande horizontale qui le remplace en dessous — même rendu, deux emplacements.
 */
defineProps<{ droid: Droid }>()

const localePath = useLocalePath()
</script>

<template>
  <NuxtLink
    :to="localePath(`/droids/${droid.slug}`)"
    class="iconic-card flex shrink-0 flex-col items-center gap-1.5 rounded-xl p-4 text-center transition-transform hover:scale-[1.02]"
  >
    <DroidImage :droid="droid" tier="DEFAULT" size="md" />

    <p class="mt-1 font-bold">{{ droid.name }}</p>

    <span class="rounded bg-accent-soft/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-accent-soft">
      {{ $t('rarity.iconic') }}
    </span>

    <p class="text-xs text-ink-muted">{{ $t(`type.${droid.type}`) }}</p>

    <p class="mt-1 text-2xl font-bold text-accent-soft">{{ droid.percentValue ?? '?' }} %</p>
    <p class="-mt-1 text-xs text-ink-muted">{{ $t('iconic.ofTotalIncome') }}</p>
  </NuxtLink>
</template>
