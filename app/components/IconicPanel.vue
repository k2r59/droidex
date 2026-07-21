<script setup lang="ts">
/**
 * Les droids Emblématiques, sous deux formes selon la place disponible :
 *
 * - `sidebar` : colonne de droite, à partir de `2xl`.
 * - `strip` : bande horizontale défilante, utilisée en dessous de `2xl` pour que le
 *   contenu ne disparaisse pas purement et simplement sur les écrans plus étroits.
 *
 * Ils méritent un emplacement à part parce qu'ils ne se comparent pas au reste : revenu
 * exprimé en pourcentage du total, palier unique, obtention par événement.
 */
const props = withDefaults(defineProps<{ variant?: 'sidebar' | 'strip' }>(), {
  variant: 'sidebar',
})

import background from '~/assets/images/backgrounds/sidebar-right.webp'

const store = useCollectionStore()
const localePath = useLocalePath()

const iconics = computed(() => store.droids.filter((d) => d.rarity === 'iconic'))

/** Les plus rentables d'abord. La colonne en montre 4, la bande les montre tous. */
const sorted = computed(() =>
  [...iconics.value].sort((a, b) => (b.percentValue ?? 0) - (a.percentValue ?? 0)),
)

const shown = computed(() => (props.variant === 'sidebar' ? sorted.value.slice(0, 4) : sorted.value))
</script>

<template>
  <!--
    Colonne de droite. `h-dvh` sans défilement interne : la barre latérale doit rester
    fixe. Les cartes en trop sont donc écartées par `shown`, pas masquées par un scroll.
  -->
  <aside
    v-if="variant === 'sidebar'"
    class="sticky top-0 hidden h-dvh w-72 shrink-0 flex-col gap-3 overflow-hidden border-l border-edge bg-panel bg-cover bg-center px-4 py-5 2xl:flex"
    :style="{ backgroundImage: `linear-gradient(rgb(7 16 31 / 0.86), rgb(7 16 31 / 0.94)), url(${background})` }"
  >
    <div>
      <h2 class="text-sm font-bold uppercase tracking-wide">{{ $t('iconic.title') }}</h2>
      <p class="text-xs text-ink-muted">{{ $t('iconic.subtitle') }}</p>
    </div>

    <!-- `min-h-0` autorise la liste à se comprimer plutôt qu'à déborder du cadre fixe. -->
    <div class="iconic-list flex min-h-0 flex-1 flex-col gap-3">
      <IconicCard v-for="droid in shown" :key="droid.slug" :droid="droid" class="sidebar-optional" />
    </div>

    <NuxtLink
      :to="localePath('/?rarity=iconic')"
      class="dx-button dx-button--secondary dx-button--block shrink-0"
    >
      {{ $t('iconic.seeAll') }}
    </NuxtLink>
  </aside>

  <!-- Bande horizontale : sous `2xl`, on défile latéralement plutôt que de tout perdre. -->
  <section v-else class="flex flex-col gap-2 2xl:hidden">
    <div class="flex items-baseline justify-between gap-3">
      <div>
        <h2 class="text-sm font-bold uppercase tracking-wide">{{ $t('iconic.title') }}</h2>
        <p class="text-xs text-ink-muted">{{ $t('iconic.subtitle') }}</p>
      </div>
      <NuxtLink :to="localePath('/?rarity=iconic')" class="shrink-0 text-sm text-accent hover:underline">
        {{ $t('iconic.seeAll') }}
      </NuxtLink>
    </div>

    <ul class="-mx-4 flex snap-x gap-3 overflow-x-auto px-4 pb-2">
      <li v-for="droid in shown" :key="droid.slug" class="w-44 snap-start">
        <IconicCard :droid="droid" class="w-full" />
      </li>
    </ul>
  </section>
</template>
