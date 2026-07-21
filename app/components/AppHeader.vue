<script setup lang="ts">
import mark from '~/assets/images/droidex-mark.svg'

const localePath = useLocalePath()
const store = useCollectionStore()
const { locale } = useI18n()
const route = useRoute()

/** L'icône n'apparaît que sur l'onglet actif, comme sur la maquette. */
const links = [
  { to: '/', key: 'droidex', icon: 'navigation/droidex' },
  { to: '/rebirths', key: 'rebirths', icon: 'navigation/rebirth' },
  { to: '/missions', key: 'missions', icon: 'navigation/missions' },
  { to: '/shop', key: 'shop', icon: 'navigation/shop' },
  { to: '/updates', key: 'updates', icon: 'navigation/news' },
  { to: '/guide', key: 'guide', icon: 'navigation/guide' },
] as const

/**
 * `NuxtLink` n'expose pas son état actif au contenu du slot ; on le recalcule donc
 * ici. L'accueil demande une comparaison exacte, sinon toutes les routes en
 * découleraient comme actives.
 */
function isActive(to: string) {
  const target = localePath(to)
  return to === '/' ? route.path === target : route.path.startsWith(target)
}

const completion = computed(() =>
  store.totalCount ? Math.round((store.ownedCount / store.totalCount) * 100) : 0,
)
</script>

<template>
  <header class="sticky top-0 z-50 border-b border-edge bg-void/85 backdrop-blur">
    <div class="flex h-[68px] items-center gap-3 px-4">
      <!-- Le logo n'apparaît ici que si la colonne de gauche est masquée. -->
      <NuxtLink :to="localePath('/')" class="flex items-center gap-2 font-bold tracking-tight xl:hidden">
        <img :src="mark" alt="" class="size-8">
        <span class="hidden sm:inline">DROIDEX</span>
      </NuxtLink>

      <nav class="hidden h-full min-w-0 items-stretch gap-1 overflow-x-auto md:flex">
        <NuxtLink
          v-for="link in links"
          :key="link.to"
          :to="localePath(link.to)"
          class="nav-link"
          active-class="nav-link--active"
        >
          <span class="nav-link__pill">
            <!-- Petit médaillon cyan, présent seulement sur l'onglet actif. -->
            <span v-if="isActive(link.to)" class="nav-link__badge">
              <DxIcon :name="link.icon" :size="14" />
            </span>
            {{ $t(`nav.${link.key}`) }}
          </span>
        </NuxtLink>
      </nav>

      <div class="ml-auto flex shrink-0 items-center gap-2">
        <!-- Solde de cristaux : monnaie du Nova Shop, donc raccourci vers la boutique. -->
        <NuxtLink
          :to="localePath('/shop')"
          class="hidden items-center gap-2.5 rounded-nav border border-edge bg-panel px-3.5 py-2.5 transition-colors hover:border-nova/50 sm:flex"
          :title="$t('shop.balance')"
        >
          <DxIcon name="resources/nova-crystal" :size="18" class="text-nova" />
          <span class="font-mono tabular-nums">{{ formatExact(store.novaCrystals, locale) }}</span>
        </NuxtLink>

        <div
          class="hidden items-center gap-2.5 rounded-nav border border-edge bg-panel px-3.5 py-2.5 sm:flex"
          :title="$t('stats.completion', { percent: completion })"
        >
          <span class="font-mono tabular-nums">{{ store.ownedCount }} / {{ store.totalCount }}</span>
          <!-- Jauge du design system : 10 px de haut, dégradé bleu vers cyan, halo léger. -->
          <span
            class="dx-progress w-16"
            role="progressbar"
            :aria-valuenow="completion"
            aria-valuemin="0"
            aria-valuemax="100"
          >
            <span :style="{ '--value': `${completion}%` }" />
          </span>
        </div>

        <span v-if="store.syncing" class="text-xs text-ink-muted">{{ $t('common.syncing') }}</span>

        <LocaleSwitcher />
        <AuthMenu />
      </div>
    </div>
  </header>
</template>
