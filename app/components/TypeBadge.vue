<script setup lang="ts">
import type { DroidType } from '~~/shared/types/droid'

/**
 * Badge de type de droid, coloré et pourvu d'une icône : ouvrier (vert, clé à molette),
 * soldat (rouge, fusil laser), astromécano (violet, planète cerclée). La couleur est posée
 * en variable CSS `--c` et mélangée au fond via `color-mix`, comme les puces de palier.
 */
const props = defineProps<{ type: DroidType }>()

const CONFIG: Record<DroidType, { color: string, icon: string }> = {
  worker: { color: '#34d399', icon: 'types/worker' },
  battle: { color: '#f87171', icon: 'types/battle' },
  astromech: { color: '#a78bfa', icon: 'types/astromech' },
}

const config = computed(() => CONFIG[props.type])
</script>

<template>
  <span
    class="tbadge"
    :style="{ '--c': config.color }"
  >
    <DxIcon
      :name="config.icon"
      :size="12"
    />
    {{ $t(`type.${type}`) }}
  </span>
</template>

<style scoped>
.tbadge {
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  padding: 0.1rem 0.5rem 0.1rem 0.4rem;
  border-radius: 999px;
  font-size: 0.7rem;
  font-weight: 600;
  line-height: 1.4;
  white-space: nowrap;
  color: color-mix(in srgb, var(--c) 72%, white);
  background: color-mix(in srgb, var(--c) 16%, var(--color-void));
  border: 1px solid color-mix(in srgb, var(--c) 40%, transparent);
}
</style>
