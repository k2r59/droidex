<script setup lang="ts">
const { locale, locales } = useI18n()
const switchLocalePath = useSwitchLocalePath()

const open = ref(false)
const root = useTemplateRef('root')

onClickOutside(root, () => { open.value = false })

const current = computed(() => locales.value.find((l) => l.code === locale.value))
</script>

<template>
  <div
    ref="root"
    class="relative"
  >
    <button
      type="button"
      class="rounded-nav border border-edge bg-panel px-3.5 py-2.5 font-display font-semibold text-ink transition-colors hover:border-accent/40"
      :aria-label="$t('common.language')"
      :aria-expanded="open"
      @click="open = !open"
    >
      {{ current?.code.toUpperCase() }}
    </button>

    <ul
      v-if="open"
      class="absolute right-0 z-50 mt-1 min-w-36 overflow-hidden rounded-lg border border-edge bg-panel-raised py-1 shadow-xl"
    >
      <li
        v-for="l in locales"
        :key="l.code"
      >
        <NuxtLink
          :to="switchLocalePath(l.code)"
          class="block px-3 py-1.5 text-sm transition-colors hover:bg-panel"
          :class="l.code === locale && 'text-iconic'"
          @click="open = false"
        >
          {{ l.name }}
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>
