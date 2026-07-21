<script setup lang="ts">
import missions from '~/data/missions.json'
import type { Tier } from '~~/shared/types/droid'

const store = useCollectionStore()
const { t, locale } = useI18n()

useSeoMeta({
  title: () => t('missions.title'),
  description: () => t('missions.subtitle'),
})

type Reward = { kind: 'credits' | 'tier'; tier?: Tier; chance: number }

/**
 * Chaque palier de mission emprunte la couleur de la variante qu'il rapporte : la barre
 * de récompenses se lit alors sans légende, en reconnaissant les couleurs du jeu.
 */
const TIER_BG: Record<Tier, string> = {
  DEFAULT: 'bg-tier-default',
  GOLD: 'bg-tier-gold',
  DIAMOND: 'bg-tier-diamond',
  RAINBOW: 'tier-rainbow-bg',
  BESKAR: 'tier-beskar-bg',
  GALACTIC: 'tier-galactic-bg',
}

const rewardLabel = (r: Reward) => (r.kind === 'credits' ? t('missions.credits') : t(`tier.${r.tier}`))
const rewardClass = (r: Reward) => (r.kind === 'credits' ? 'bg-valid' : TIER_BG[r.tier!])

function formatDuration(seconds: number | null) {
  if (seconds === null) return t('droid.noData')
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  return s ? `${m}:${String(s).padStart(2, '0')}` : `${m} min`
}

/** Repères transverses, présentés avant le détail : ils conditionnent toute la lecture. */
const reperes = [
  { icon: 'game/droid', tone: 'text-accent', key: 'missions.infoAstromech' },
  { icon: 'resources/star', tone: 'text-warn', key: 'missions.infoScaling' },
  { icon: 'status/info', tone: 'text-glow', key: 'missions.infoTwoSystems' },
] as const

const collectionPercent = computed(() =>
  store.totalCount ? Math.round((store.ownedCount / store.totalCount) * 100) : 0,
)
const RADIUS = 42
const CIRCUMFERENCE = 2 * Math.PI * RADIUS
</script>

<template>
  <div class="flex flex-col gap-5">
    <PageBanner name="missions" min-height="16rem">
      <div class="flex items-start gap-3">
        <span class="grid size-11 shrink-0 place-items-center rounded-md bg-accent/15 text-accent">
          <DxIcon name="navigation/missions" :size="24" />
        </span>
        <div>
          <h1 class="text-4xl lg:text-5xl">{{ $t('missions.title') }}</h1>
          <p class="text-[11px] font-semibold uppercase tracking-[0.16em] text-ink-muted">
            {{ $t('missions.subtitle') }}
          </p>
        </div>
      </div>

      <div>
        <h2 class="text-lg uppercase tracking-wide">{{ $t('missions.padsTitle') }}</h2>
        <p class="mt-1 max-w-3xl text-sm text-ink-muted">{{ missions.pads.note }}</p>
      </div>

      <!-- Repère de progression, commun aux pages : où j'en suis dans la collection. -->
      <div class="flex flex-wrap items-center gap-6 rounded-card border border-edge bg-void/55 p-4 backdrop-blur">
        <div class="flex items-center gap-4">
          <div>
            <p class="text-[10px] font-semibold uppercase tracking-[0.14em] text-ink-muted">
              {{ $t('rebirth.yourProgress') }}
            </p>
            <p class="font-mono text-2xl">
              <span class="text-accent">{{ store.ownedCount }}</span>
              <span class="text-ink-muted"> / {{ store.totalCount }}</span>
            </p>
            <p class="text-xs text-ink-muted">{{ $t('stats.droidsCollected') }}</p>
          </div>

          <div class="relative grid size-16 shrink-0 place-items-center">
            <svg class="absolute inset-0 -rotate-90" viewBox="0 0 100 100">
              <circle cx="50" cy="50" :r="RADIUS" fill="none" stroke="currentColor" stroke-width="9" class="text-edge" />
              <circle
                cx="50" cy="50" :r="RADIUS" fill="none" stroke="currentColor" stroke-width="9"
                stroke-linecap="round" class="text-accent transition-[stroke-dashoffset] duration-700"
                :stroke-dasharray="CIRCUMFERENCE" :stroke-dashoffset="CIRCUMFERENCE * (1 - collectionPercent / 100)"
              />
            </svg>
            <span class="font-mono text-sm">{{ collectionPercent }}%</span>
          </div>
        </div>

        <div>
          <p class="text-[10px] font-semibold uppercase tracking-[0.14em] text-ink-muted">
            {{ $t('missions.cantina') }}
          </p>
          <p class="font-mono text-2xl text-valid">{{ missions.cantina.traders }}</p>
          <p class="text-xs text-ink-muted">{{ $t('missions.traders') }}</p>
        </div>
      </div>
    </PageBanner>

    <!-- Les 5 paliers de mission, un par ligne : la table de butin est l'info la plus consultée. -->
    <ul class="flex flex-col gap-3">
      <li v-for="pad in missions.pads.entries" :key="pad.pad" class="panel p-4">
        <div class="flex flex-wrap items-center gap-4">
          <span class="grid size-8 shrink-0 place-items-center rounded-full bg-panel-high font-mono text-sm">
            {{ pad.pad }}
          </span>

          <span
            class="grid size-16 shrink-0 place-items-center rounded-md border border-edge bg-panel-raised"
            :class="pad.missionTier === 'DEFAULT' ? 'text-ink-muted' : 'text-accent'"
          >
            <DxIcon name="game/mission-pad" :size="34" />
          </span>

          <div class="min-w-40 flex-1">
            <h3 class="text-lg">
              {{ $t(`tier.${pad.missionTier}`) }}
              <span v-if="pad.unlockCost" class="text-ink-muted">{{ formatNumber(pad.unlockCost, locale) }}</span>
            </h3>
            <p class="text-xs text-ink-muted">
              {{ pad.unlockCost ? formatNumber(pad.unlockCost, locale) : $t('droid.noData') }}
              ·
              {{ formatDuration(pad.baseDurationSeconds) }}
            </p>
          </div>

          <div class="flex flex-wrap items-center gap-2">
            <span class="text-[10px] font-semibold uppercase tracking-wide text-ink-muted">
              {{ $t('missions.rewards') }}
            </span>
            <span
              v-for="r in (pad.rewards as Reward[])"
              :key="`lbl-${r.kind}-${r.tier ?? ''}`"
              class="flex items-center gap-1.5 text-xs"
            >
              <span class="size-2.5 rounded-full" :class="rewardClass(r)" />
              {{ r.chance }} %
            </span>
          </div>

          <button type="button" class="dx-icon-button shrink-0" :aria-label="$t('missions.seeDetail')">
            <DxIcon name="actions/arrow-right" :size="18" />
          </button>
        </div>

        <div class="dx-segmented-progress mt-3 flex h-6 overflow-hidden rounded-md">
          <span
            v-for="r in (pad.rewards as Reward[])"
            :key="`${r.kind}-${r.tier ?? ''}`"
            class="grid place-items-center text-[10px] font-bold text-void"
            :class="rewardClass(r)"
            :style="{ width: `${r.chance}%` }"
            :title="`${rewardLabel(r)} — ${r.chance} %`"
          >{{ r.chance >= 15 ? `${r.chance}%` : '' }}</span>
        </div>

        <p v-if="pad.note" class="dx-alert dx-alert--info mt-3 text-xs">
          <DxIcon name="status/info" :size="16" class="mt-0.5 shrink-0" />
          <span>{{ pad.note }}</span>
        </p>
      </li>
    </ul>

    <ul class="grid gap-3 md:grid-cols-3">
      <li v-for="r in reperes" :key="r.key" class="panel flex items-start gap-3 p-4 text-sm">
        <DxIcon :name="r.icon" :size="22" class="mt-0.5 shrink-0" :class="r.tone" />
        <span class="text-ink-muted">{{ $t(r.key) }}</span>
      </li>
    </ul>

    <p class="dx-alert dx-alert--warning">
      <DxIcon name="status/warning" :size="20" class="mt-0.5 shrink-0" />
      <span>{{ missions.pads.passiveIncomeDuringMission }}</span>
    </p>

    <div class="grid gap-3 lg:grid-cols-[minmax(0,1fr)_380px]">
      <!-- Temps relevés : la réponse concrète à « quel droid envoyer pour aller plus vite ». -->
      <section class="panel p-5">
        <h2 class="mb-3 text-lg uppercase tracking-wide">
          {{ $t('missions.measured', { tier: $t(`tier.${missions.pads.measured.missionTier}`) }) }}
        </h2>
        <ul class="flex flex-col gap-1.5">
          <li
            v-for="(row, i) in missions.pads.measured.rows"
            :key="row.droid"
            class="flex items-center gap-3 rounded-md bg-panel-raised px-3 py-2 text-sm"
          >
            <span class="w-4 shrink-0 text-center font-mono text-xs text-ink-muted">{{ i + 1 }}</span>
            <span class="min-w-0 flex-1">{{ row.droid }}</span>
            <span
              class="font-mono"
              :class="row.seconds === missions.pads.measured.baseSeconds ? 'text-ink-muted' : 'text-valid'"
            >
              {{ row.approximate ? '≈ ' : '' }}{{ formatDuration(row.seconds) }}
            </span>
          </li>
        </ul>
      </section>

      <section class="panel relative overflow-hidden p-5">
        <h2 class="text-lg uppercase tracking-wide">{{ missions.secretMission.name }}</h2>
        <p class="mt-2 font-mono text-lg text-nova">
          {{ formatDuration(missions.secretMission.durationSeconds) }}
          <span class="text-sm text-ink-muted">
            · {{ formatDuration(missions.secretMission.withR2D2Seconds) }} {{ $t('missions.withR2') }}
          </span>
        </p>
        <p class="mt-3 max-w-56 text-sm text-ink-muted">{{ missions.secretMission.note }}</p>

        <DxIcon
          name="game/droid"
          size="9rem"
          class="pointer-events-none absolute -bottom-6 -right-4 text-nova/25"
        />
      </section>
    </div>

    <div class="grid gap-3 lg:grid-cols-2">
      <section class="panel p-5">
        <h2 class="mb-2 flex items-center gap-2 text-lg uppercase tracking-wide">
          <DxIcon name="game/planet" :size="22" class="text-accent" />
          {{ $t('missions.world') }}
        </h2>
        <p class="text-sm text-ink-muted">{{ missions.worldMissions.note }}</p>

        <ul class="mt-3 flex flex-wrap gap-2">
          <li v-for="type in missions.worldMissions.types" :key="type">
            <span class="dx-badge dx-badge--rare">{{ $t(`type.${type}`) }}</span>
          </li>
        </ul>

        <dl class="mt-4 grid gap-3 sm:grid-cols-3">
          <div class="rounded-md bg-panel-raised p-3">
            <dt class="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wide text-valid">
              <DxIcon name="resources/credits" :size="14" />{{ $t('missions.rewards') }}
            </dt>
            <dd class="mt-1 text-xs text-ink-muted">{{ missions.worldMissions.rewards }}</dd>
          </div>
          <div class="rounded-md bg-panel-raised p-3">
            <dt class="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wide text-glow">
              <DxIcon name="resources/xp" :size="14" />{{ $t('missions.scaling') }}
            </dt>
            <dd class="mt-1 text-xs text-ink-muted">{{ missions.worldMissions.scaling }}</dd>
          </div>
          <div class="rounded-md bg-panel-raised p-3">
            <dt class="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wide text-warn">
              <DxIcon name="resources/star" :size="14" />{{ $t('missions.bestCompanions') }}
            </dt>
            <dd class="mt-1 text-xs text-ink-muted">{{ missions.worldMissions.tip }}</dd>
          </div>
        </dl>
      </section>

      <section class="panel p-5">
        <h2 class="mb-1 flex items-center gap-2 text-lg uppercase tracking-wide">
          <DxIcon name="resources/timer" :size="22" class="text-nova" />
          {{ $t('missions.dailies') }}
        </h2>
        <p class="text-sm text-ink-muted">
          {{ $t('missions.dailyReset', { count: missions.dailies.perDay, hours: missions.dailies.resetHours }) }}
        </p>

        <ul class="mt-3 flex flex-col gap-2">
          <li
            v-for="tier in missions.dailies.tiers"
            :key="tier.difficulty"
            class="grid gap-2 rounded-md bg-panel-raised p-3 sm:grid-cols-[6rem_1fr_auto]"
          >
            <span class="font-display font-semibold">{{ $t(`missions.difficulty.${tier.difficulty}`) }}</span>
            <ul class="text-xs text-ink-muted">
              <li v-for="ex in tier.examples" :key="ex">• {{ ex }}</li>
            </ul>
            <span
              class="text-right text-xs"
              :class="tier.difficulty === 'hard' ? 'text-accent' : 'text-ink-muted'"
            >{{ tier.reward }}</span>
          </li>
        </ul>
      </section>
    </div>

    <div class="grid gap-3 lg:grid-cols-[minmax(0,1fr)_380px]">
      <section class="panel p-5">
        <h2 class="mb-2 text-lg uppercase tracking-wide">{{ $t('missions.cantina') }}</h2>
        <p class="text-sm text-ink-muted">{{ missions.cantina.mechanic }}</p>

        <div class="mt-3 grid gap-3 sm:grid-cols-3">
          <div class="rounded-md bg-panel-raised p-3">
            <p class="text-[10px] font-semibold uppercase tracking-wide text-ink-muted">{{ $t('missions.traders') }}</p>
            <p class="font-mono text-xl">{{ missions.cantina.traders }}</p>
          </div>
          <div class="rounded-md bg-panel-raised p-3">
            <p class="text-[10px] font-semibold uppercase tracking-wide text-ink-muted">{{ $t('missions.cooldown') }}</p>
            <p class="text-xl text-valid">{{ $t('missions.noCooldown') }}</p>
          </div>
          <div class="rounded-md bg-panel-raised p-3">
            <p class="text-[10px] font-semibold uppercase tracking-wide text-ink-muted">{{ $t('missions.rewards') }}</p>
            <p class="mt-1 text-xs text-ink-muted">{{ missions.cantina.rewards }}</p>
          </div>
        </div>

        <p class="mt-3 text-xs text-ink-muted">{{ missions.cantina.cooldownNote }}</p>
        <p class="dx-alert dx-alert--info mt-3 text-sm">
          <DxIcon name="status/info" :size="18" class="mt-0.5 shrink-0" />
          <span>{{ missions.cantina.tip }}</span>
        </p>
      </section>

      <section class="panel relative overflow-hidden p-5">
        <h2 class="flex flex-wrap items-center gap-2 text-lg">
          <DxIcon name="resources/nova-crystal" :size="22" class="text-nova" />
          Double Daily Quests
          <span class="font-mono text-accent">✦ {{ missions.dailies.doubleDaily.cost }}</span>
        </h2>
        <p class="mt-2 text-sm text-ink-muted">{{ missions.dailies.doubleDaily.effect }}</p>
        <p class="dx-alert dx-alert--warning mt-3 text-xs">
          <DxIcon name="status/warning" :size="16" class="mt-0.5 shrink-0" />
          <span>{{ missions.dailies.doubleDaily.uncertainty }}</span>
        </p>
      </section>
    </div>

    <ul class="grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
      <li v-for="(s, i) in missions.strategies" :key="s" class="panel p-4">
        <p class="mb-1.5 flex items-center gap-2 font-display font-semibold">
          <DxIcon name="resources/star" :size="16" class="text-accent" />
          {{ i + 1 }}.
        </p>
        <p class="text-xs text-ink-muted">{{ s }}</p>
      </li>
    </ul>
  </div>
</template>
