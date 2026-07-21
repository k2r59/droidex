<script setup lang="ts">
const localePath = useLocalePath()

/**
 * Barre d'onglets fixe en bas sur mobile. La disposition et les cibles tactiles (44 px)
 * sont calquées sur une navigation native — c'est le socle du futur portage mobile.
 */
const links = [
  { to: '/', key: 'droidex', icon: 'navigation/droidex' },
  { to: '/rebirths', key: 'rebirths', icon: 'navigation/rebirth' },
  { to: '/missions', key: 'missions', icon: 'navigation/missions' },
  { to: '/shop', key: 'shop', icon: 'navigation/shop' },
  { to: '/updates', key: 'updates', icon: 'navigation/news' },
  { to: '/guide', key: 'guide', icon: 'navigation/guide' },
] as const
</script>

<template>
  <nav
    class="fixed inset-x-0 bottom-0 z-50 border-t border-edge bg-void/95 pb-[env(safe-area-inset-bottom)] backdrop-blur md:hidden"
  >
    <ul class="flex">
      <li v-for="link in links" :key="link.to" class="flex-1">
        <NuxtLink
          :to="localePath(link.to)"
          class="flex min-h-11 flex-col items-center justify-center gap-0.5 py-2 text-ink-muted transition-colors"
          active-class="!text-iconic"
        >
          <DxIcon :name="link.icon" :size="20" />
          <span class="text-[10px] font-medium">{{ $t(`nav.${link.key}`) }}</span>
        </NuxtLink>
      </li>
    </ul>
  </nav>
</template>
