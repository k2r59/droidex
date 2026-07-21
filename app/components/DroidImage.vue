<script setup lang="ts">
import type { Droid, Tier } from '~~/shared/types/droid'

const props = withDefaults(
  defineProps<{
    droid: Droid
    tier: Tier
    size?: 'sm' | 'md' | 'lg'
    /** Grise l'illustration quand le droid n'est pas possédé. */
    dimmed?: boolean
  }>(),
  { size: 'md', dimmed: false },
)

const config = useRuntimeConfig()

const stats = computed(() => props.droid.tiers[props.tier])

const src = computed(() => {
  const file = stats.value?.image
  return file ? `${config.public.droidImageBase}/${file}` : null
})

/** Le palier Galactique réutilise le visuel Beskar faute d'asset publié. */
const isFallback = computed(() => stats.value?.imageIsFallback ?? false)

const sizeClass = computed(
  () => ({ sm: 'size-12', md: 'size-20', lg: 'size-36' })[props.size],
)

const failed = ref(false)
// Repartir de zéro quand on change de palier : l'échec portait sur l'ancienne image.
watch(src, () => { failed.value = false })
</script>

<template>
  <div
    class="relative shrink-0 grid place-items-center rounded-lg transition-opacity"
    :class="[sizeClass, dimmed && 'opacity-35 grayscale']"
  >
    <img
      v-if="src && !failed"
      :src="src"
      :alt="`${droid.name} — ${$t(`tier.${tier}`)}`"
      class="size-full object-contain"
      loading="lazy"
      decoding="async"
      @error="failed = true"
    >
    <!-- Sans asset local, on affiche l'initiale plutôt qu'une icône cassée. -->
    <div
      v-else
      class="size-full grid place-items-center rounded-lg bg-panel-raised border border-edge text-ink-muted font-bold"
      :class="size === 'sm' ? 'text-sm' : 'text-xl'"
      :title="$t('droid.noData')"
    >
      {{ droid.name.slice(0, 2) }}
    </div>

    <span
      v-if="isFallback && !failed && src"
      class="absolute -bottom-1 -right-1 size-3 rounded-full bg-tier-galactic ring-2 ring-void"
      :title="$t('droid.imageFallback')"
    />
  </div>
</template>
