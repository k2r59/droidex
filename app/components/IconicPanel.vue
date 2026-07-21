<script setup lang="ts">
/**
 * Colonne de droite : les droids Emblématiques.
 *
 * Ils méritent leur propre panneau parce qu'ils ne se comparent pas au reste — revenu
 * exprimé en pourcentage du total, palier unique, obtention par événement. Les noyer dans
 * la grille générale les rendrait illisibles.
 */
const store = useCollectionStore()
const localePath = useLocalePath()

const iconics = computed(() => store.droids.filter((d) => d.rarity === 'iconic'))

/** Les plus rentables d'abord ; le panneau n'en montre que quelques-uns. */
const featured = computed(() =>
  [...iconics.value].sort((a, b) => (b.percentValue ?? 0) - (a.percentValue ?? 0)).slice(0, 4),
)
</script>

<template>
  <aside class="sticky top-0 hidden h-dvh w-72 shrink-0 flex-col gap-3 overflow-y-auto border-l border-edge bg-panel px-4 py-5 2xl:flex">
    <div>
      <h2 class="text-sm font-bold uppercase tracking-wide">{{ $t('iconic.title') }}</h2>
      <p class="text-xs text-ink-muted">{{ $t('iconic.subtitle') }}</p>
    </div>

    <NuxtLink
      v-for="droid in featured"
      :key="droid.slug"
      :to="localePath(`/droids/${droid.slug}`)"
      class="iconic-card flex flex-col items-center gap-1.5 rounded-xl p-4 text-center transition-transform hover:scale-[1.02]"
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

    <NuxtLink
      :to="localePath('/?rarity=iconic')"
      class="btn-ghost mt-1 rounded-lg px-3 py-2.5 text-center text-sm transition-colors"
    >
      {{ $t('iconic.seeAll') }}
    </NuxtLink>
  </aside>
</template>
