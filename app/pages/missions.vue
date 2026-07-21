<script setup lang="ts">
import missions from '~/data/missions.json'
import type { Tier } from '~~/shared/types/droid'

const { t, locale } = useI18n()

useSeoMeta({
  title: () => t('missions.title'),
  description: () => t('missions.subtitle'),
})

type Reward = { kind: 'credits' | 'tier'; tier?: Tier; chance: number }

const TIER_BAR: Record<Tier, string> = {
  DEFAULT: 'bg-tier-default',
  GOLD: 'bg-tier-gold',
  DIAMOND: 'bg-tier-diamond',
  RAINBOW: 'tier-rainbow-bg',
  BESKAR: 'tier-beskar-bg',
  GALACTIC: 'tier-galactic-bg',
}

const rewardLabel = (r: Reward) => (r.kind === 'credits' ? t('missions.credits') : t(`tier.${r.tier}`))
const rewardClass = (r: Reward) => (r.kind === 'credits' ? 'bg-emerald-600' : TIER_BAR[r.tier!])

function formatDuration(seconds: number | null) {
  if (seconds === null) return t('droid.noData')
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  return s ? `${m}:${String(s).padStart(2, '0')}` : `${m} min`
}
</script>

<template>
  <div class="flex flex-col gap-5">
    <header>
      <h1 class="text-xl font-bold">{{ $t('missions.title') }}</h1>
      <p class="text-sm text-ink-muted">{{ $t('missions.subtitle') }}</p>
    </header>

    <!-- Mission pads : la table de récompenses est l'information la plus consultée,
         donc rendue en barre proportionnelle plutôt qu'en liste de pourcentages. -->
    <section class="flex flex-col gap-2">
      <h2 class="text-lg font-semibold">{{ $t('missions.pads') }}</h2>
      <p class="text-sm text-ink-muted">{{ missions.pads.note }}</p>

      <ul class="flex flex-col gap-2">
        <li
          v-for="pad in missions.pads.entries"
          :key="pad.pad"
          class="rounded-xl border border-edge bg-panel p-3"
        >
          <div class="flex flex-wrap items-center gap-3">
            <span class="grid size-8 shrink-0 place-items-center rounded-lg bg-panel-raised font-bold">
              {{ pad.pad }}
            </span>

            <div>
              <p class="text-xs text-ink-muted">{{ $t('missions.missionTier') }}</p>
              <p class="text-sm">{{ $t(`tier.${pad.missionTier}`) }}</p>
            </div>

            <div>
              <p class="text-xs text-ink-muted">{{ $t('missions.unlockCost') }}</p>
              <p class="font-mono text-sm tabular-nums">
                <template v-if="pad.unlockCost">{{ formatNumber(pad.unlockCost, locale) }}</template>
                <span v-else class="text-ink-muted">{{ $t('droid.noData') }}</span>
              </p>
            </div>

            <div>
              <p class="text-xs text-ink-muted">{{ $t('missions.duration') }}</p>
              <p class="font-mono text-sm tabular-nums">{{ formatDuration(pad.baseDurationSeconds) }}</p>
            </div>
          </div>

          <div class="mt-3">
            <p class="mb-1 text-xs text-ink-muted">{{ $t('missions.rewards') }}</p>

            <div class="flex h-6 overflow-hidden rounded-lg">
              <span
                v-for="r in (pad.rewards as Reward[])"
                :key="`${r.kind}-${r.tier ?? ''}`"
                class="grid place-items-center text-[10px] font-medium text-void"
                :class="rewardClass(r)"
                :style="{ width: `${r.chance}%` }"
                :title="`${rewardLabel(r)} — ${r.chance} %`"
              >{{ r.chance >= 15 ? `${r.chance}%` : '' }}</span>
            </div>

            <ul class="mt-1.5 flex flex-wrap gap-x-3 gap-y-1 text-xs text-ink-muted">
              <li v-for="r in (pad.rewards as Reward[])" :key="`lbl-${r.kind}-${r.tier ?? ''}`" class="flex items-center gap-1.5">
                <span class="size-2 rounded-full" :class="rewardClass(r)" />
                {{ rewardLabel(r) }} {{ r.chance }} %
              </li>
            </ul>
          </div>

          <p v-if="pad.note" class="mt-2 text-xs text-amber-300">{{ pad.note }}</p>
        </li>
      </ul>

      <p class="rounded-lg bg-panel px-3 py-2 text-xs text-ink-muted">
        {{ missions.pads.durationNote }}
      </p>
      <p class="rounded-lg bg-panel px-3 py-2 text-xs text-ink-muted">
        {{ missions.pads.scalingNote }}
      </p>
      <p class="rounded-lg bg-panel px-3 py-2 text-xs text-amber-300">
        ⚠ {{ missions.pads.passiveIncomeDuringMission }}
      </p>
      <p class="rounded-lg bg-panel px-3 py-2 text-xs text-ink-muted">
        {{ missions.pads.rewardsUnaffectedByDroid }}
      </p>
      <p class="rounded-lg bg-panel-raised px-3 py-2 text-sm">💡 {{ missions.pads.bestCompanion }}</p>

      <!-- Temps relevés par les joueurs : c'est la réponse concrète à « quel droid
           envoyer pour aller plus vite », qu'aucune formule publiée ne donne. -->
      <div class="rounded-xl border border-edge bg-panel p-3">
        <h3 class="mb-2 text-sm font-medium">
          {{ $t('missions.measured', { tier: $t(`tier.${missions.pads.measured.missionTier}`) }) }}
        </h3>
        <ul class="flex flex-col gap-1">
          <li
            v-for="row in missions.pads.measured.rows"
            :key="row.droid"
            class="flex items-center justify-between gap-3 rounded-lg bg-panel-raised px-2.5 py-1.5 text-sm"
          >
            <span class="min-w-0 flex-1">{{ row.droid }}</span>
            <span
              class="font-mono tabular-nums"
              :class="row.seconds === missions.pads.measured.baseSeconds ? 'text-ink-muted' : 'text-emerald-400'"
            >
              {{ row.approximate ? '≈ ' : '' }}{{ formatDuration(row.seconds) }}
            </span>
          </li>
        </ul>
      </div>

      <div class="rounded-xl border border-edge bg-panel p-3">
        <h3 class="text-sm font-medium">{{ missions.secretMission.name }}</h3>
        <p class="mt-1 text-sm text-ink-muted">
          {{ formatDuration(missions.secretMission.durationSeconds) }} ·
          {{ formatDuration(missions.secretMission.withR2D2Seconds) }} avec R2-D2
        </p>
        <p class="mt-1 text-xs text-ink-muted">{{ missions.secretMission.note }}</p>
      </div>
    </section>

    <section class="rounded-xl border border-edge bg-panel p-4">
      <h2 class="mb-2 font-semibold">{{ $t('missions.world') }}</h2>
      <p class="text-sm text-ink-muted">{{ missions.worldMissions.note }}</p>

      <ul class="mt-3 flex flex-wrap gap-2">
        <li
          v-for="type in missions.worldMissions.types"
          :key="type"
          class="rounded-lg bg-panel-raised px-2.5 py-1 text-sm"
        >
          {{ $t(`type.${type}`) }}
        </li>
      </ul>

      <dl class="mt-3 flex flex-col gap-2 text-sm">
        <div>
          <dt class="text-xs text-ink-muted">{{ $t('missions.rewards') }}</dt>
          <dd>{{ missions.worldMissions.rewards }}</dd>
        </div>
        <div>
          <dt class="text-xs text-ink-muted">{{ $t('missions.scaling') }}</dt>
          <dd>{{ missions.worldMissions.scaling }}</dd>
        </div>
      </dl>

      <p class="mt-3 rounded-lg bg-panel-raised px-3 py-2 text-sm">💡 {{ missions.worldMissions.tip }}</p>

      <ul class="mt-3 flex flex-col gap-1 text-xs text-ink-muted">
        <li v-for="ex in missions.worldMissions.examples" :key="ex">• {{ ex }}</li>
      </ul>
    </section>

    <section class="rounded-xl border border-edge bg-panel p-4">
      <h2 class="mb-2 font-semibold">{{ $t('missions.cantina') }}</h2>
      <p class="text-sm">{{ missions.cantina.mechanic }}</p>

      <div class="mt-3 grid gap-2 sm:grid-cols-3">
        <div class="rounded-lg bg-panel-raised p-2.5">
          <p class="text-xs text-ink-muted">{{ $t('missions.traders') }}</p>
          <p class="font-mono text-lg">{{ missions.cantina.traders }}</p>
        </div>
        <div class="rounded-lg bg-panel-raised p-2.5">
          <p class="text-xs text-ink-muted">{{ $t('missions.cooldown') }}</p>
          <p class="text-lg text-emerald-400">{{ $t('missions.noCooldown') }}</p>
        </div>
        <div class="rounded-lg bg-panel-raised p-2.5">
          <p class="text-xs text-ink-muted">{{ $t('missions.rewards') }}</p>
          <p class="text-sm">{{ missions.cantina.rewards }}</p>
        </div>
      </div>

      <p class="mt-2 text-xs text-ink-muted">{{ missions.cantina.cooldownNote }}</p>
      <p class="mt-2 rounded-lg bg-panel-raised px-3 py-2 text-sm">💡 {{ missions.cantina.tip }}</p>
    </section>

    <section class="rounded-xl border border-edge bg-panel p-4">
      <h2 class="mb-2 font-semibold">{{ $t('missions.dailies') }}</h2>
      <p class="text-sm text-ink-muted">
        {{ $t('missions.dailyReset', { count: missions.dailies.perDay, hours: missions.dailies.resetHours }) }}
      </p>

      <ul class="mt-3 flex flex-col gap-2">
        <li
          v-for="tier in missions.dailies.tiers"
          :key="tier.difficulty"
          class="rounded-lg bg-panel-raised p-3"
        >
          <div class="flex items-center justify-between gap-2">
            <span class="text-sm font-medium">{{ $t(`missions.difficulty.${tier.difficulty}`) }}</span>
            <span
              class="text-xs"
              :class="tier.difficulty === 'hard' ? 'text-iconic' : 'text-ink-muted'"
            >{{ tier.reward }}</span>
          </div>
          <ul class="mt-1.5 flex flex-wrap gap-x-3 text-xs text-ink-muted">
            <li v-for="ex in tier.examples" :key="ex">• {{ ex }}</li>
          </ul>
        </li>
      </ul>

      <p class="mt-2 text-xs text-ink-muted">{{ missions.dailies.blueprintWeighting }}</p>

      <div class="mt-3 rounded-lg border border-edge p-3">
        <p class="flex items-center gap-2 text-sm font-medium">
          Double Daily Quests
          <span class="font-mono text-iconic">✦ {{ missions.dailies.doubleDaily.cost }}</span>
        </p>
        <p class="mt-1 text-sm text-ink-muted">{{ missions.dailies.doubleDaily.effect }}</p>
        <p class="mt-1 text-xs text-amber-300">⚠ {{ missions.dailies.doubleDaily.uncertainty }}</p>
      </div>
    </section>

    <section class="rounded-xl border border-edge bg-panel p-4">
      <h2 class="mb-3 font-semibold">{{ $t('missions.strategies') }}</h2>
      <ol class="flex flex-col gap-2 text-sm text-ink-muted">
        <li v-for="(s, i) in missions.strategies" :key="s" class="flex gap-2">
          <span class="shrink-0 font-mono text-xs text-ink">{{ i + 1 }}.</span>
          {{ s }}
        </li>
      </ol>
    </section>
  </div>
</template>
