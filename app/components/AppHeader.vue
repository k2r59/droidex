<script setup lang="ts">
const localePath = useLocalePath()
const store = useCollectionStore()
const { locale } = useI18n()

const links = [
  { to: '/', key: 'droidex' },
  { to: '/rebirths', key: 'rebirths' },
  { to: '/missions', key: 'missions' },
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
    <div class="flex items-center gap-3 px-4 py-3">
      <!-- Le logo n'apparaît ici que si la colonne de gauche est masquée. -->
      <NuxtLink :to="localePath('/')" class="flex items-center gap-2 font-extrabold tracking-tight xl:hidden">
        <span class="grid size-8 place-items-center rounded-lg bg-accent/15 text-accent">◈</span>
        <span class="hidden sm:inline">DROIDEX</span>
      </NuxtLink>

      <nav class="hidden items-center gap-1 md:flex">
        <NuxtLink
          v-for="link in links"
          :key="link.to"
          :to="localePath(link.to)"
          class="rounded-xl border border-transparent px-3.5 py-2 text-sm text-ink-muted transition-colors hover:bg-panel hover:text-ink"
          active-class="nav-active"
        >
          {{ $t(`nav.${link.key}`) }}
        </NuxtLink>
      </nav>

      <div class="ml-auto flex items-center gap-2">
        <!-- Solde de cristaux : monnaie du Nova Shop, donc raccourci vers la boutique. -->
        <NuxtLink
          :to="localePath('/shop')"
          class="hidden items-center gap-2 rounded-xl border border-edge bg-panel px-3 py-2 text-sm transition-colors hover:border-accent/40 sm:flex"
          :title="$t('shop.balance')"
        >
          <span class="text-tier-galactic">✦</span>
          <span class="font-mono tabular-nums">{{ formatExact(store.novaCrystals, locale) }}</span>
        </NuxtLink>

        <div
          class="hidden items-center gap-2 rounded-xl border border-edge bg-panel px-3 py-2 text-sm sm:flex"
          :title="$t('stats.completion', { percent: completion })"
        >
          <span class="font-mono tabular-nums">{{ store.ownedCount }} / {{ store.totalCount }}</span>
          <span class="h-1.5 w-14 overflow-hidden rounded-full bg-edge">
            <span
              class="block h-full rounded-full bg-accent transition-[width] duration-500"
              :style="{ width: `${completion}%` }"
            />
          </span>
        </div>

        <span v-if="store.syncing" class="text-xs text-ink-muted">{{ $t('common.syncing') }}</span>

        <LocaleSwitcher />
        <AuthMenu />
      </div>
    </div>
  </header>
</template>
