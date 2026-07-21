<script setup lang="ts">
/**
 * Interrupteur à bascule.
 *
 * Un `<button role="switch">` plutôt qu'une `<input type="checkbox">` habillée : le rôle
 * `switch` annonce « activé / désactivé » aux lecteurs d'écran, là où une case à cocher
 * annonce « coché », ce qui ne veut pas dire la même chose pour un état persistant.
 *
 * Le bouton porte lui-même le libellé : pas de `<label for>` à synchroniser, et toute la
 * surface — texte compris — devient cliquable, ce qui compte au doigt.
 */
defineProps<{ modelValue: boolean, label?: string }>()
defineEmits<{ 'update:modelValue': [boolean] }>()
</script>

<template>
  <button
    type="button"
    role="switch"
    :aria-checked="modelValue"
    class="group flex cursor-pointer items-center gap-2.5 text-sm"
    @click="$emit('update:modelValue', !modelValue)"
  >
    <span
      class="relative h-6 w-11 shrink-0 rounded-full border transition-colors"
      :class="modelValue
        ? 'border-accent bg-accent/25'
        : 'border-edge-soft bg-panel-raised group-hover:border-edge-strong'"
    >
      <span
        class="absolute top-1/2 size-4 -translate-y-1/2 rounded-full transition-all"
        :class="modelValue
          ? 'left-[calc(100%-1.25rem)] bg-accent shadow-[0_0_8px_rgba(37,215,255,0.7)]'
          : 'left-1 bg-ink-muted'"
      />
    </span>

    <span
      v-if="label"
      :class="modelValue ? 'text-ink-strong' : 'text-ink-muted'"
    >{{ label }}</span>
    <slot />
  </button>
</template>
