<script setup lang="ts">
import mark from '~/assets/images/droidex-mark.svg'

import planet from '~/assets/images/planet-rebirth.webp'
import rebirthData from '~/data/rebirths.json'

/**
 * Colonne de gauche : identité, navigation principale, prochaine renaissance et liens
 * communautaires. Masquée sous `xl` — la barre d'onglets du bas prend le relais.
 */
const store = useCollectionStore()
const localePath = useLocalePath()

const links = [
  { to: '/', key: 'droidex', icon: 'navigation/droidex' },
  { to: '/rebirths', key: 'rebirths', icon: 'navigation/rebirth' },
  { to: '/missions', key: 'missions', icon: 'navigation/missions' },
  { to: '/shop', key: 'shop', icon: 'navigation/shop' },
  { to: '/updates', key: 'updates', icon: 'navigation/news' },
  { to: '/guide', key: 'guide', icon: 'navigation/guide' },
] as const

const nextRebirth = computed(() => Math.min(store.rebirth + 1, rebirthData.maxRebirth))

/** Gain de crédits accordé par le prochain palier, en pourcentage. */
const nextBonus = computed(() => Math.round(rebirthData.creditMultiplierPerLevel * 100))

const socials = [
  { id: 'discord', label: 'Discord — Droid Tycoon', icon: 'brands/discord', href: 'https://discord.gg/droidtycoon', tint: 'bg-[#5865F2]' },
  { id: 'foad', label: 'X — FOAD', icon: 'brands/x', href: 'https://x.com/FoadZone', tint: 'bg-[#1d9bf0]' },
  { id: 'blzn', label: 'X — Blzn Studios', icon: 'brands/x', href: 'https://x.com/BlznDev', tint: 'bg-[#e0245e]' },
  { id: 'island', label: 'Île Fortnite', icon: 'actions/external', href: 'https://www.fortnite.com/@foad/7865-8305-9184', tint: 'bg-accent' },
] as const
</script>

<template>
  <aside class="sticky top-0 hidden h-dvh w-60 shrink-0 flex-col gap-5 overflow-hidden border-r border-edge bg-panel px-4 py-5 xl:flex">
    <NuxtLink :to="localePath('/')" class="flex items-center gap-2.5">
      <img :src="mark" alt="" class="size-9">
      <span class="text-xl font-bold tracking-[0.06em]">DROIDEX</span>
    </NuxtLink>

    <!-- Filet de séparation, terminé par une flèche : il marque le passage de
         l'identité à la navigation. -->
    <span class="-mt-2 flex items-center gap-1" aria-hidden="true">
      <span class="h-px flex-1 bg-gradient-to-r from-transparent via-edge to-edge-strong" />
      <DxIcon name="actions/arrow-right" :size="11" class="text-edge-strong" />
    </span>

    <div class="flex flex-col gap-1">
      <p class="flex items-center gap-1.5 px-2 pb-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-ink-muted">
        <DxIcon name="actions/plus" :size="9" />
        {{ $t('nav.collection') }}
      </p>

      <NuxtLink
        v-for="link in links"
        :key="link.to"
        :to="localePath(link.to)"
        class="side-nav-item"
        active-class="nav-active"
      >
        <DxIcon :name="link.icon" :size="18" />
        <span class="flex-1">{{ $t(`nav.${link.key}`) }}</span>
        <span v-if="link.key === 'droidex'" class="side-nav-item__count font-mono text-xs tabular-nums">
          {{ store.ownedCount }} / {{ store.totalCount }}
        </span>
      </NuxtLink>
    </div>

    <!-- Prochaine renaissance : le palier suivant est l'objectif qui structure une session. -->
    <NuxtLink
      :to="localePath('/rebirths')"
      class="sidebar-rebirth dx-side-panel relative mt-auto flex shrink-0 flex-col items-center gap-2 overflow-hidden p-4 text-center transition-colors hover:border-accent/40"
    >
      <!-- Fond de carte : l'illustration occupe toute la surface, le contenu se pose dessus. -->
      <span
        class="pointer-events-none absolute inset-0 bg-cover bg-center"
        :style="{ backgroundImage: `url(${planet})` }"
        aria-hidden="true"
      />
      <span
        class="pointer-events-none absolute inset-0"
        style="background: linear-gradient(180deg, rgb(7 16 31 / 0.92) 0%, rgb(7 16 31 / 0.25) 34%, rgb(7 16 31 / 0.35) 62%, rgb(7 16 31 / 0.94) 100%)"
        aria-hidden="true"
      />

      <span class="relative text-[10px] font-semibold uppercase tracking-[0.16em] text-ink-muted">
        {{ $t('rebirth.next') }}
      </span>
      <span class="relative text-lg font-bold">{{ $t('rebirth.levelShort', { level: nextRebirth }) }}</span>

      <!-- Espace réservé à la planète : c'est lui qui donne sa hauteur à la carte. -->
      <span class="sidebar-planet block h-28" aria-hidden="true" />

      <span class="relative text-sm font-semibold text-accent">
        +{{ nextBonus }} % {{ $t('stats.income') }}
      </span>
      <span class="dx-button dx-button--secondary dx-button--block relative mt-1">
        {{ $t('common.discover') }}
      </span>
    </NuxtLink>

    <div class="sidebar-social flex shrink-0 flex-col items-center gap-2">
      <p class="text-xs text-ink-muted">{{ $t('common.joinCommunity') }}</p>
      <div class="flex gap-2">
        <a
          v-for="s in socials"
          :key="s.id"
          :href="s.href"
          target="_blank"
          rel="noopener noreferrer"
          class="grid size-8 place-items-center rounded-md text-white transition-transform hover:scale-110"
          :class="s.tint"
          :title="s.label"
          :aria-label="s.label"
        >
          <DxIcon :name="s.icon" :size="16" />
        </a>
      </div>
    </div>
  </aside>
</template>
