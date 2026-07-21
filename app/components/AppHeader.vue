<script setup lang="ts">
const localePath = useLocalePath()
const store = useCollectionStore()

const links = [
  { to: '/', key: 'droidex' },
  { to: '/rebirths', key: 'rebirths' },
  { to: '/shop', key: 'shop' },
  { to: '/updates', key: 'updates' },
  { to: '/guide', key: 'guide' },
] as const

const completion = computed(() =>
  store.totalCount ? Math.round((store.ownedCount / store.totalCount) * 100) : 0,
)
</script>

<template>
  <header class="sticky top-0 z-50 border-b border-edge bg-void/85 backdrop-blur">
    <div class="mx-auto flex max-w-7xl items-center gap-4 px-4 py-3">
      <NuxtLink :to="localePath('/')" class="flex items-center gap-2 font-bold tracking-tight">
        <span class="grid size-8 place-items-center rounded-lg bg-iconic/15 text-iconic">◈</span>
        <span class="hidden sm:inline">{{ $t('app.name') }}</span>
      </NuxtLink>

      <nav class="hidden flex-1 items-center gap-1 md:flex">
        <NuxtLink
          v-for="link in links"
          :key="link.to"
          :to="localePath(link.to)"
          class="rounded-lg px-3 py-1.5 text-sm text-ink-muted transition-colors hover:bg-panel hover:text-ink"
          active-class="!bg-panel-raised !text-ink"
        >
          {{ $t(`nav.${link.key}`) }}
        </NuxtLink>
      </nav>

      <div class="ml-auto flex items-center gap-2">
        <!-- Complétion toujours visible : c'est la métrique que le joueur vient chercher. -->
        <NuxtLink
          :to="localePath('/')"
          class="hidden items-center gap-2 rounded-lg bg-panel px-2.5 py-1.5 text-sm sm:flex"
          :title="$t('stats.completion', { percent: completion })"
        >
          <span class="font-mono tabular-nums">{{ store.ownedCount }}/{{ store.totalCount }}</span>
          <span class="h-1.5 w-14 overflow-hidden rounded-full bg-edge">
            <span class="block h-full rounded-full bg-iconic transition-[width] duration-500" :style="{ width: `${completion}%` }" />
          </span>
        </NuxtLink>

        <span v-if="store.syncing" class="text-xs text-ink-muted">{{ $t('common.syncing') }}</span>

        <LocaleSwitcher />
        <AuthMenu />
      </div>
    </div>
  </header>
</template>
