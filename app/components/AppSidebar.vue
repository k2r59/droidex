<script setup lang="ts">
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
  { to: '/rebirths', key: 'rebirths', icon: 'navigation/renaissances' },
  { to: '/missions', key: 'missions', icon: 'navigation/missions' },
  { to: '/shop', key: 'shop', icon: 'navigation/nova-shop' },
  { to: '/updates', key: 'updates', icon: 'ui/notification' },
  { to: '/guide', key: 'guide', icon: 'navigation/guide' },
] as const

const nextRebirth = computed(() => Math.min(store.rebirth + 1, rebirthData.maxRebirth))

/** Gain de crédits accordé par le prochain palier, en pourcentage. */
const nextBonus = computed(() => Math.round(rebirthData.creditMultiplierPerLevel * 100))

const socials = [
  { id: 'discord', label: 'Discord — Droid Tycoon', icon: 'brands/discord', href: 'https://discord.gg/droidtycoon', tint: 'text-[#5865F2]' },
  { id: 'foad', label: 'X — FOAD', icon: 'brands/x', href: 'https://x.com/FoadZone', tint: 'text-[#1d9bf0]' },
  { id: 'blzn', label: 'X — Blzn Studios', icon: 'brands/x', href: 'https://x.com/BlznDev', tint: 'text-[#e0245e]' },
  { id: 'island', label: 'Île Fortnite', icon: 'actions/external-link', href: 'https://www.fortnite.com/@foad/7865-8305-9184', tint: 'text-accent' },
] as const
</script>

<template>
  <aside class="sidebar-shell sticky top-0 hidden h-dvh w-60 shrink-0 flex-col gap-5 overflow-hidden border-r border-edge px-4 py-5 xl:flex">
    <NuxtLink
      :to="localePath('/')"
      class="flex items-center gap-2.5"
    >
      <DxIcon
        name="brands/droidex-mark"
        :size="30"
        class="text-accent"
      />
      <span class="text-xl font-bold tracking-[0.06em]">DROIDEX</span>
    </NuxtLink>

    <!-- Filet de séparation, terminé par une flèche : il marque le passage de
         l'identité à la navigation. -->
    <span
      class="-mt-2 flex items-center gap-1"
      aria-hidden="true"
    >
      <span class="h-px flex-1 bg-gradient-to-r from-transparent via-edge to-edge-strong" />
      <DxIcon
        name="actions/arrow-right"
        :size="11"
        class="text-edge-strong"
      />
    </span>

    <div class="sidebar-nav flex flex-col gap-3">
      <p class="flex items-center gap-1.5 px-2 pb-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-ink-muted">
        <DxIcon
          name="actions/plus"
          :size="9"
        />
        {{ $t('nav.collection') }}
      </p>

      <NuxtLink
        v-for="link in links"
        :key="link.to"
        :to="localePath(link.to)"
        class="side-nav-item"
        active-class="nav-active"
      >
        <DxIcon
          :name="link.icon"
          :size="20"
        />
        <span class="flex-1">{{ $t(`nav.${link.key}`) }}</span>
        <span
          v-if="link.key === 'droidex'"
          class="side-nav-item__count font-mono text-xs tabular-nums"
        >
          <span v-if="store.hydrated">{{ store.ownedCount }}</span>
          <span
            v-else
            class="inline-block w-5 animate-pulse rounded bg-panel-high align-middle"
          >&nbsp;</span>
          / {{ store.totalCount }}
        </span>
      </NuxtLink>
    </div>

    <!-- Prochaine renaissance : le palier suivant est l'objectif qui structure une session. -->
    <NuxtLink
      :to="localePath('/rebirths')"
      class="sidebar-rebirth dx-side-panel relative mt-auto flex shrink-0 flex-col items-center overflow-hidden !p-0 text-center"
    >
      <!-- Fond de carte : l'illustration occupe toute la surface, le contenu se pose dessus. -->
      <span
        class="pointer-events-none absolute inset-0 bg-cover bg-center bg-no-repeat"
        :style="{ backgroundImage: `url(${planet})` }"
        aria-hidden="true"
      />
      <span
        class="pointer-events-none absolute inset-0"
        style="background: linear-gradient(180deg, rgb(7 16 31 / 0.92) 0%, rgb(7 16 31 / 0.30) 30%, rgb(7 16 31 / 0.34) 60%, rgb(7 16 31 / 0.93) 88%)"
        aria-hidden="true"
      />

      <span class="relative mt-[8.5%] whitespace-nowrap text-[0.58rem] font-semibold uppercase tracking-[0.1em] text-ink-muted">
        {{ $t('rebirth.next') }}
      </span>

      <span class="relative mt-[5.4%] text-[1.05rem] font-bold leading-tight">
        {{ $t('rebirth.levelShort', { level: nextRebirth }) }}
      </span>

      <!-- Espace laissé à la planète : c'est lui qui absorbe la hauteur variable. -->
      <span
        class="sidebar-planet flex-1"
        aria-hidden="true"
      />

      <span class="relative text-[0.8rem] font-semibold text-accent">
        +{{ nextBonus }} % {{ $t('stats.income') }}
      </span>

      <span class="dx-button dx-button--secondary relative mx-[6%] mb-[4.5%] mt-[3.5%] w-[88%] !min-h-0 py-[0.45rem] text-[0.8rem]">
        {{ $t('common.discover') }}
      </span>
    </NuxtLink>

    <div class="sidebar-social flex shrink-0 flex-col items-center gap-2">
      <p class="text-xs text-ink-muted">
        {{ $t('common.joinCommunity') }}
      </p>
      <div class="flex gap-2">
        <a
          v-for="s in socials"
          :key="s.id"
          :href="s.href"
          target="_blank"
          rel="noopener noreferrer"
          class="grid size-8 place-items-center rounded-md opacity-80 transition hover:scale-110 hover:opacity-100"
          :class="s.tint"
          :title="s.label"
          :aria-label="s.label"
        >
          <DxIcon
            :name="s.icon"
            :size="16"
          />
        </a>
      </div>
    </div>
  </aside>
</template>
