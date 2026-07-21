<script setup lang="ts">
import rebirthData from '~/data/rebirths.json'

/**
 * Colonne de gauche : identité, navigation principale, prochaine renaissance et liens
 * communautaires. Masquée sous `xl` — la barre d'onglets du bas prend le relais.
 */
const store = useCollectionStore()
const localePath = useLocalePath()

const links = [
  { to: '/', key: 'droidex', icon: '◈' },
  { to: '/rebirths', key: 'rebirths', icon: '↻' },
  { to: '/missions', key: 'missions', icon: '➤' },
  { to: '/shop', key: 'shop', icon: '✦' },
  { to: '/updates', key: 'updates', icon: '⚡' },
  { to: '/guide', key: 'guide', icon: '☰' },
] as const

const nextRebirth = computed(() => Math.min(store.rebirth + 1, rebirthData.maxRebirth))

/** Gain de crédits accordé par le prochain palier, en pourcentage. */
const nextBonus = computed(() => Math.round(rebirthData.creditMultiplierPerLevel * 100))

const socials = [
  { id: 'discord', label: 'Discord', icon: '◉' },
  { id: 'bluesky', label: 'Bluesky', icon: '❋' },
  { id: 'youtube', label: 'YouTube', icon: '▶' },
  { id: 'twitter', label: 'X', icon: '✕' },
] as const
</script>

<template>
  <aside class="sticky top-0 hidden h-dvh w-60 shrink-0 flex-col gap-5 overflow-hidden border-r border-edge bg-panel px-4 py-5 xl:flex">
    <NuxtLink :to="localePath('/')" class="flex items-center gap-2.5">
      <span class="grid size-9 place-items-center rounded-xl bg-accent/15 text-lg text-accent">◈</span>
      <span class="text-xl font-extrabold tracking-tight">DROIDEX</span>
    </NuxtLink>

    <div class="flex flex-col gap-1">
      <p class="px-2 pb-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-ink-muted">
        {{ $t('nav.collection') }}
      </p>

      <NuxtLink
        v-for="link in links"
        :key="link.to"
        :to="localePath(link.to)"
        class="flex items-center gap-3 rounded-xl border border-transparent px-3 py-2.5 text-sm text-ink-muted transition-colors hover:bg-panel-raised hover:text-ink"
        active-class="nav-active"
      >
        <span class="w-4 text-center" aria-hidden="true">{{ link.icon }}</span>
        <span class="flex-1">{{ $t(`nav.${link.key}`) }}</span>
        <span v-if="link.key === 'droidex'" class="font-mono text-xs tabular-nums">
          {{ store.ownedCount }} / {{ store.totalCount }}
        </span>
      </NuxtLink>
    </div>

    <!-- Prochaine renaissance : le palier suivant est l'objectif qui structure une session. -->
    <NuxtLink
      :to="localePath('/rebirths')"
      class="sidebar-rebirth panel mt-auto flex shrink-0 flex-col items-center gap-2 overflow-hidden p-4 text-center transition-colors hover:border-accent/40"
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
      <span class="btn-ghost mt-1 w-full rounded-lg px-3 py-2 text-sm transition-colors">
        {{ $t('common.discover') }}
      </span>
    </NuxtLink>

    <div class="sidebar-social flex shrink-0 flex-col items-center gap-2">
      <p class="text-xs text-ink-muted">{{ $t('common.joinCommunity') }}</p>
      <div class="flex gap-2">
        <span
          v-for="s in socials"
          :key="s.id"
          class="grid size-8 cursor-default place-items-center rounded-lg bg-panel-raised text-sm text-ink-muted"
          :title="s.label"
        >{{ s.icon }}</span>
      </div>
    </div>
  </aside>
</template>
