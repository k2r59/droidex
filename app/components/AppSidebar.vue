<script setup lang="ts">
import mark from '~/assets/images/droidex-mark.svg'
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
  { id: 'discord', label: 'Discord — Droid Tycoon', icon: 'brands/discord', href: 'https://discord.gg/droidtycoon' },
  { id: 'foad', label: 'X — FOAD', icon: 'brands/x', href: 'https://x.com/FoadZone' },
  { id: 'blzn', label: 'X — Blzn Studios', icon: 'brands/x', href: 'https://x.com/BlznDev' },
  { id: 'island', label: 'Île Fortnite', icon: 'actions/external', href: 'https://www.fortnite.com/@foad/7865-8305-9184' },
] as const
</script>

<template>
  <aside class="sticky top-0 hidden h-dvh w-60 shrink-0 flex-col gap-5 overflow-hidden border-r border-edge bg-panel px-4 py-5 xl:flex">
    <NuxtLink :to="localePath('/')" class="flex items-center gap-2.5">
      <img :src="mark" alt="" class="size-9">
      <span class="text-xl font-bold tracking-tight">DROIDEX</span>
    </NuxtLink>

    <div class="flex flex-col gap-1">
      <p class="px-2 pb-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-ink-muted">
        {{ $t('nav.collection') }}
      </p>

      <NuxtLink
        v-for="link in links"
        :key="link.to"
        :to="localePath(link.to)"
        class="flex items-center gap-3 rounded-nav border border-transparent px-3 py-2.5 text-sm text-ink-muted transition-colors hover:bg-panel-raised hover:text-ink"
        active-class="nav-active"
      >
        <DxIcon :name="link.icon" :size="18" />
        <span class="flex-1">{{ $t(`nav.${link.key}`) }}</span>
        <span v-if="link.key === 'droidex'" class="font-mono text-xs tabular-nums">
          {{ store.ownedCount }} / {{ store.totalCount }}
        </span>
      </NuxtLink>
    </div>

    <!-- Prochaine renaissance : le palier suivant est l'objectif qui structure une session. -->
    <NuxtLink
      :to="localePath('/rebirths')"
      class="sidebar-rebirth dx-side-panel mt-auto flex shrink-0 flex-col items-center gap-2 overflow-hidden p-4 text-center transition-colors hover:border-accent/40"
    >
      <p class="text-[10px] font-semibold uppercase tracking-[0.16em] text-ink-muted">
        {{ $t('rebirth.next') }}
      </p>
      <p class="text-lg font-bold">{{ $t('rebirth.levelShort', { level: nextRebirth }) }}</p>

      <!-- Illustration de substitution : une planète en dégradés, sans asset externe. -->
      <span class="sidebar-planet relative my-1 grid size-24 place-items-center">
        <span class="absolute inset-0 rounded-full bg-accent/20 blur-xl" />
        <span
          class="relative size-20 rounded-full"
          style="background: radial-gradient(circle at 32% 28%, #7dd3fc, #2563eb 45%, #10203c 100%)"
        />
      </span>

      <p class="text-sm font-semibold text-accent">+{{ nextBonus }} % {{ $t('stats.income') }}</p>
      <span class="dx-button dx-button--secondary dx-button--block mt-1">
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
          class="grid size-9 place-items-center rounded-full bg-panel-raised text-ink-muted transition-colors hover:bg-accent/15 hover:text-accent"
          :title="s.label"
          :aria-label="s.label"
        >
          <DxIcon :name="s.icon" :size="16" />
        </a>
      </div>
    </div>
  </aside>
</template>
