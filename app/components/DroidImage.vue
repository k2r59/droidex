<script setup lang="ts">
import type { Droid, Tier } from '~~/shared/types/droid'

const props = withDefaults(
  defineProps<{
    droid: Droid
    tier: Tier
    size?: 'sm' | 'md' | 'lg'
    /** Grise l'illustration quand le droid n'est pas possédé. */
    dimmed?: boolean
    /**
     * Retire le champ d'étoiles. Formulé en opt-out et non en `starfield?: boolean` :
     * Vue caste un prop booléen absent à `false` et non à `undefined`, ce qui rendrait
     * tout défaut « activé sauf mention contraire » silencieusement inopérant.
     */
    noStarfield?: boolean
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

/**
 * Le ciel est masqué en `sm` : sous 48 px, les étoiles se lisent comme du bruit et
 * brouillent la silhouette du droid.
 */
const showStarfield = computed(() => !props.noStarfield && props.size !== 'sm')

/** Classes littérales : une classe construite à la volée ne serait pas générée. */
const NEBULA: Record<Tier, string> = {
  DEFAULT: 'nebula-default',
  GOLD: 'nebula-gold',
  DIAMOND: 'nebula-diamond',
  RAINBOW: 'nebula-rainbow',
  BESKAR: 'nebula-beskar',
  GALACTIC: 'nebula-galactic',
}

const failed = ref(false)
// Repartir de zéro quand on change de palier : l'échec portait sur l'ancienne image.
watch(src, () => { failed.value = false })

/** Le ciel n'apparaît que derrière une illustration réellement chargée. */
const containerClass = computed(() => {
  const classes: string[] = [sizeClass.value]
  if (props.dimmed) classes.push('opacity-35', 'grayscale')
  if (showStarfield.value && src.value && !failed.value) {
    classes.push('droid-starfield', NEBULA[props.tier])
  }
  return classes
})
</script>

<template>
  <div
    class="relative shrink-0 grid place-items-center overflow-hidden rounded-lg transition-opacity"
    :class="containerClass"
  >
    <img
      v-if="src && !failed"
      :src="src"
      :alt="`${droid.name} — ${$t(`tier.${tier}`)}`"
      class="relative size-full object-contain"
      loading="lazy"
      decoding="async"
      @error="failed = true"
    >
    <!-- Sans asset local, on affiche l'initiale plutôt qu'une icône cassée. -->
    <div
      v-else
      v-tippy="{ content: $t('droid.noData') }"
      class="size-full grid place-items-center rounded-lg bg-panel-raised border border-edge text-ink-muted font-bold"
      :class="size === 'sm' ? 'text-sm' : 'text-xl'"
    >
      {{ droid.name.slice(0, 2) }}
    </div>

    <span
      v-if="isFallback && !failed && src"
      v-tippy="{ content: $t('droid.imageFallback') }"
      class="absolute bottom-0.5 right-0.5 size-2 rounded-full bg-tier-galactic ring-1 ring-void"
    />
  </div>
</template>
