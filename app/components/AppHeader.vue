<script setup lang="ts">
import mark from '~/assets/images/droidex-mark.svg'

const localePath = useLocalePath()
const store = useCollectionStore()
const { locale } = useI18n()
const route = useRoute()

const links = [
  { to: '/', key: 'droidex' },
  { to: '/rebirths', key: 'rebirths' },
  { to: '/missions', key: 'missions' },
  { to: '/shop', key: 'shop' },
  { to: '/updates', key: 'updates' },
  { to: '/guide', key: 'guide' },
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
      <NuxtLink
        :to="localePath('/')"
        class="flex items-center gap-2 font-bold tracking-tight xl:hidden"
      >
        <img
          :src="mark"
          alt=""
          class="size-8"
        >
        <span>DROIDEX</span>
      </NuxtLink>

      <!--
        Bascule à `lg` et non `md` : à 768 px, la navigation partageait la barre avec les
        compteurs, la langue et le bouton de connexion, si bien que « Renaissances » était
        coupé en deux et que les onglets suivants sortaient de l'écran. Le rail défilait
        bien, mais rien ne l'indiquait — une tablette en portrait n'avait donc plus de
        navigation visible. En dessous de `lg`, c'est `MobileNav` qui prend le relais.
      -->
      <nav class="hidden h-full min-w-0 items-stretch gap-1 overflow-x-auto lg:flex">
        <NuxtLink
          v-for="link in links"
          :key="link.to"
          :to="localePath(link.to)"
          class="nav-link"
          active-class="nav-link--active"
        >
          <span class="nav-link__pill">
            <!-- Petit médaillon cyan, présent seulement sur l'onglet actif. -->
            <span
              v-if="isActive(link.to)"
              class="nav-link__badge"
            >
              <DxIcon
                name="brands/droidex-mark"
                :size="14"
              />
            </span>
            {{ $t(`nav.${link.key}`) }}
          </span>
        </NuxtLink>
      </nav>

      <div class="ml-auto flex shrink-0 items-center gap-2">
        <!-- Solde de cristaux : monnaie du Nova Shop, donc raccourci vers la boutique. -->
        <NuxtLink
          :title="$t('shop.balance')"
          :to="localePath('/shop')"
          class="hidden items-center gap-2.5 rounded-nav border border-edge bg-panel px-3.5 py-2.5 transition-colors hover:border-nova/50 sm:flex"
        >
          <DxIcon
            name="resources/nova-crystal"
            :size="18"
            class="text-nova"
          />
          <span class="font-mono tabular-nums">{{ formatExact(store.novaCrystals, locale) }}</span>
        </NuxtLink>

        <div
          :title="$t('stats.completion', { percent: completion })"
          class="hidden items-center gap-2.5 rounded-nav border border-edge bg-panel px-3.5 py-2.5 sm:flex"
        >
          <span class="font-mono tabular-nums">
            <span v-if="store.hydrated">{{ store.ownedCount }}</span>
            <span
              v-else
              class="inline-block w-6 animate-pulse rounded bg-panel-high align-middle"
            >&nbsp;</span>
            / {{ store.totalCount }}
          </span>
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

        <span
          v-if="store.syncing"
          class="text-xs text-ink-muted"
        >{{ $t('common.syncing') }}</span>

        <!--
          Accès au Profil (export/import, synchronisation, effacement). Séparé de la
          navigation principale — c'est un espace de réglages, pas une section de contenu —
          mais il lui faut un point d'entrée visible, sans quoi la page reste orpheline.
        -->
        <NuxtLink
          :to="localePath('/profile')"
          class="dx-icon-button size-9"
          :aria-label="$t('nav.profile')"
        >
          <DxIcon
            name="navigation/profile"
            :size="16"
          />
        </NuxtLink>

        <LocaleSwitcher />
      </div>
    </div>
  </header>
</template>
