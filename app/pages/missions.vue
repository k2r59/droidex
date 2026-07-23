<script setup lang="ts">
import missions from '~/data/missions.json'
import type { Tier } from '~~/shared/types/droid'

import padBeskar from '~/assets/images/mission-pads/beskar.webp'
import padDefault from '~/assets/images/mission-pads/default.webp'
import padDiamond from '~/assets/images/mission-pads/diamond.webp'
import padGalactic from '~/assets/images/mission-pads/galactic.webp'
import padGold from '~/assets/images/mission-pads/gold.webp'
import padRainbow from '~/assets/images/mission-pads/rainbow.webp'

/** Illustration du terminal, une par palier — découpée par `scripts/build-mission-pads.mjs`. */
const PAD_IMAGE: Record<Tier, string> = {
  DEFAULT: padDefault,
  GOLD: padGold,
  DIAMOND: padDiamond,
  RAINBOW: padRainbow,
  BESKAR: padBeskar,
  GALACTIC: padGalactic,
}

const store = useCollectionStore()
const { t, locale } = useI18n()
const { gameText, gameTextList } = useGameText()

useSeoMeta({
  title: () => t('missions.title'),
  description: () => t('missions.subtitle'),
})

type Reward = { kind: 'credits' | 'tier', tier?: Tier, chance: number }

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

/** Cercle du numéro de terminal, teinté lui aussi par le palier. */
const TIER_RING: Record<Tier, string> = {
  DEFAULT: 'border-tier-default text-tier-default',
  GOLD: 'border-tier-gold text-tier-gold',
  DIAMOND: 'border-tier-diamond text-tier-diamond',
  RAINBOW: 'border-tier-rainbow text-tier-rainbow',
  BESKAR: 'border-tier-beskar text-tier-beskar',
  GALACTIC: 'border-tier-galactic text-tier-galactic',
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

/**
 * Terminal ouvert dans la fenêtre de détail. Le chevron de chaque ligne promettait cette
 * vue depuis le départ mais n'avait aucun gestionnaire : cinq boutons inertes.
 */
const selectedIndex = ref<number | null>(null)
const selectedPad = computed(() =>
  selectedIndex.value === null ? null : missions.pads.entries[selectedIndex.value]!,
)

const closePad = () => { selectedIndex.value = null }

/** Même confinement que sur la page Renaissances. */
const padDialogRef = useTemplateRef<HTMLElement>('padDialogRef')
useFocusTrap(padDialogRef, computed(() => selectedPad.value !== null))
onKeyStroke('Escape', () => { if (selectedPad.value) closePad() })
</script>

<template>
  <div class="flex flex-col gap-5">
    <PageBanner
      name="missions"
      min-height="16rem"
    >
      <div class="flex items-start gap-3">
        <span class="grid size-11 shrink-0 place-items-center rounded-md bg-accent/15 text-accent">
          <DxIcon
            name="navigation/missions"
            :size="24"
          />
        </span>
        <div>
          <h1 class="text-4xl uppercase tracking-tight lg:text-5xl">
            {{ $t('missions.title') }}
          </h1>
          <p class="text-[11px] font-semibold uppercase tracking-[0.16em] text-ink-muted">
            {{ $t('missions.subtitle') }}
          </p>
        </div>
      </div>

      <div>
        <h2 class="text-lg uppercase tracking-wide">
          {{ $t('missions.padsTitle') }}
        </h2>
        <p class="mt-1 max-w-3xl text-sm text-ink-muted">
          {{ gameText('missions.pads.note') }}
        </p>
      </div>

      <!-- Repère de progression, commun aux pages : où j'en suis dans la collection. -->
      <div class="flex flex-wrap items-center gap-6 rounded-card border border-edge-soft bg-void/55 p-4 backdrop-blur">
        <div class="flex items-center gap-4">
          <div>
            <p class="text-[10px] font-semibold uppercase tracking-[0.14em] text-ink-muted">
              {{ $t('rebirth.yourProgress') }}
            </p>
            <p class="font-mono text-2xl">
              <span class="text-accent">{{ store.ownedCount }}</span>
              <span class="text-ink-muted"> / {{ store.totalCount }}</span>
            </p>
            <p class="text-xs text-ink-muted">
              {{ $t('stats.droidsCollected') }}
            </p>
          </div>

          <div class="relative grid size-16 shrink-0 place-items-center">
            <svg
              class="absolute inset-0 -rotate-90"
              viewBox="0 0 100 100"
            >
              <circle
                cx="50"
                cy="50"
                :r="RADIUS"
                fill="none"
                stroke="currentColor"
                stroke-width="9"
                class="text-edge"
              />
              <circle
                cx="50"
                cy="50"
                :r="RADIUS"
                fill="none"
                stroke="currentColor"
                stroke-width="9"
                stroke-linecap="round"
                class="text-accent transition-[stroke-dashoffset] duration-700"
                :stroke-dasharray="CIRCUMFERENCE"
                :stroke-dashoffset="CIRCUMFERENCE * (1 - collectionPercent / 100)"
              />
            </svg>
            <span class="font-mono text-sm">{{ collectionPercent }}%</span>
          </div>
        </div>

        <div>
          <p class="text-[10px] font-semibold uppercase tracking-[0.14em] text-ink-muted">
            {{ $t('missions.cantina') }}
          </p>
          <p class="font-mono text-2xl text-valid">
            {{ missions.cantina.traders }}
          </p>
          <p class="text-xs text-ink-muted">
            {{ $t('missions.traders') }}
          </p>
        </div>
      </div>
    </PageBanner>

    <!-- Les 5 paliers de mission, un par ligne : la table de butin est l'info la plus consultée. -->
    <ul class="flex flex-col gap-3">
      <li
        v-for="(pad, i) in missions.pads.entries"
        :key="pad.pad"
        class="panel p-3 sm:p-4"
      >
        <div class="flex items-center gap-3 sm:gap-4">
          <!-- Le numéro est cerclé de la couleur du palier, comme la maquette. -->
          <span
            class="grid size-9 shrink-0 place-items-center rounded-full border-2 bg-void/40 font-mono text-sm"
            :class="TIER_RING[pad.missionTier as Tier]"
          >
            {{ pad.pad }}
          </span>

          <!--
            L'illustration du terminal porte déjà la couleur du palier et son halo.
            Réduite sur mobile : à pleine taille elle laissait moins de 200 px au titre.
          -->
          <img
            :src="PAD_IMAGE[pad.missionTier as Tier]"
            alt=""
            class="size-16 shrink-0 object-contain sm:size-24"
            loading="lazy"
          >

          <!--
            Colonne de contenu : titre et récompenses sur une ligne, barre en dessous.
            La barre appartient à cette colonne et non à la carte entière — elle démarre
            après le terminal et s'arrête avant le chevron, comme sur la maquette.
          -->
          <div class="min-w-0 flex-1">
            <div class="flex flex-wrap items-center justify-between gap-x-6 gap-y-2">
              <div class="min-w-0">
                <h3 class="text-lg">
                  {{ $t(`tier.${pad.missionTier}`) }}
                  <span
                    v-if="pad.unlockCost"
                    class="text-ink-muted"
                  >{{ formatNumber(pad.unlockCost, locale) }}</span>
                </h3>
                <p class="text-xs text-ink-muted">
                  {{ pad.unlockCost ? formatNumber(pad.unlockCost, locale) : $t('droid.noData') }}
                  ·
                  {{ formatDuration(pad.baseDurationSeconds) }}
                </p>
              </div>

              <div class="flex flex-wrap items-center gap-3">
                <span class="text-[10px] font-semibold uppercase tracking-wide text-rare">
                  {{ $t('missions.rewards') }}
                </span>
                <span
                  v-for="r in (pad.rewards as Reward[])"
                  :key="`lbl-${r.kind}-${r.tier ?? ''}`"
                  class="flex items-center gap-1.5 text-sm font-semibold"
                >
                  <span
                    class="size-3 rounded-full"
                    :class="rewardClass(r)"
                  />
                  {{ r.chance }} %
                </span>
              </div>
            </div>

            <!-- Texte blanc ombré : lisible aussi bien sur l'or que sur le gris. -->
            <div class="mt-2.5 flex h-6 overflow-hidden rounded-md">
              <span
                v-for="r in (pad.rewards as Reward[])"
                :key="`${r.kind}-${r.tier ?? ''}`"
                :title="`${rewardLabel(r)} — ${r.chance} %`"
                class="grid place-items-center text-[11px] font-bold text-white [text-shadow:0_1px_2px_rgb(0_0_0/0.5)]"
                :class="rewardClass(r)"
                :style="{ width: `${r.chance}%` }"
              >{{ r.chance >= 15 ? `${r.chance}%` : '' }}</span>
            </div>
          </div>

          <button
            type="button"
            class="dx-icon-button shrink-0"
            :aria-label="$t('missions.seeDetail')"
            :aria-haspopup="'dialog'"
            @click="selectedIndex = i"
          >
            <DxIcon
              name="actions/chevron-right"
              :size="18"
            />
          </button>
        </div>

        <p
          v-if="gameText(`missions.pads.entries.${i}.note`)"
          class="dx-alert dx-alert--info mt-3 border-0 text-xs"
        >
          <DxIcon
            name="status/info"
            :size="16"
            class="mt-px shrink-0"
          />
          <span>{{ gameText(`missions.pads.entries.${i}.note`) }}</span>
        </p>
      </li>
    </ul>

    <ul class="grid gap-3 md:grid-cols-3">
      <li
        v-for="r in reperes"
        :key="r.key"
        class="panel flex items-start gap-3 p-4 text-sm"
      >
        <DxIcon
          :name="r.icon"
          :size="22"
          class="mt-0.5 shrink-0"
          :class="r.tone"
        />
        <span class="text-ink-muted">{{ $t(r.key) }}</span>
      </li>
    </ul>

    <p class="dx-alert dx-alert--warning border-0 text-[0.8125rem]">
      <DxIcon
        name="status/warning"
        :size="17"
        class="mt-px shrink-0"
      />
      <span>{{ gameText('missions.pads.passiveIncomeDuringMission') }}</span>
    </p>

    <div class="grid gap-3 lg:grid-cols-[minmax(0,1fr)_380px]">
      <!-- Temps relevés : la réponse concrète à « quel droid envoyer pour aller plus vite ». -->
      <section class="panel p-4 sm:p-5">
        <h2 class="mb-3 text-lg uppercase tracking-wide">
          {{ $t('missions.measured', { tier: $t(`tier.${missions.pads.measured.missionTier}`) }) }}
        </h2>
        <ul class="flex flex-col gap-1.5">
          <li
            v-for="(row, i) in missions.pads.measured.rows"
            :key="i"
            class="flex items-center gap-3 rounded-md bg-panel-raised px-3 py-2 text-sm"
          >
            <span class="w-4 shrink-0 text-center font-mono text-xs text-ink-muted">{{ i + 1 }}</span>
            <span class="min-w-0 flex-1">{{ gameText(`missions.pads.measured.rows.${i}.droid`) }}</span>
            <span
              class="font-mono"
              :class="row.seconds === missions.pads.measured.baseSeconds ? 'text-ink-muted' : 'text-valid'"
            >
              {{ row.approximate ? '≈ ' : '' }}{{ formatDuration(row.seconds) }}
            </span>
          </li>
        </ul>
      </section>

      <section class="panel relative overflow-hidden p-4 sm:p-5">
        <h2 class="text-lg uppercase tracking-wide">
          {{ gameText('missions.secretMission.name') }}
        </h2>
        <p class="mt-2 font-mono text-lg text-nova">
          {{ formatDuration(missions.secretMission.durationSeconds) }}
          <span class="text-sm text-ink-muted">
            · {{ formatDuration(missions.secretMission.withR2D2Seconds) }} {{ $t('missions.withR2') }}
          </span>
        </p>
        <p class="mt-3 max-w-56 text-sm text-ink-muted">
          {{ gameText('missions.secretMission.note') }}
        </p>

        <DxIcon
          name="game/droid"
          size="9rem"
          class="pointer-events-none absolute -bottom-6 -right-4 text-nova/25"
        />
      </section>
    </div>

    <div class="grid gap-3 lg:grid-cols-2">
      <section class="panel p-4 sm:p-5">
        <h2 class="mb-2 flex items-center gap-2 text-lg uppercase tracking-wide">
          <DxIcon
            name="game/planet"
            :size="22"
            class="text-accent"
          />
          {{ $t('missions.world') }}
        </h2>
        <p class="text-sm text-ink-muted">
          {{ gameText('missions.worldMissions.note') }}
        </p>

        <ul class="mt-3 flex flex-wrap gap-2">
          <li
            v-for="type in missions.worldMissions.types"
            :key="type"
          >
            <span class="dx-badge dx-badge--rare">{{ $t(`type.${type}`) }}</span>
          </li>
        </ul>

        <dl class="mt-4 grid gap-3 sm:grid-cols-3">
          <div class="rounded-md bg-panel-raised p-3">
            <dt class="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wide text-valid">
              <DxIcon
                name="resources/credits"
                :size="14"
              />{{ $t('missions.rewards') }}
            </dt>
            <dd class="mt-1 text-xs text-ink-muted">
              {{ gameText('missions.worldMissions.rewards') }}
            </dd>
          </div>
          <div class="rounded-md bg-panel-raised p-3">
            <dt class="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wide text-glow">
              <DxIcon
                name="resources/xp"
                :size="14"
              />{{ $t('missions.scaling') }}
            </dt>
            <dd class="mt-1 text-xs text-ink-muted">
              {{ gameText('missions.worldMissions.scaling') }}
            </dd>
          </div>
          <div class="rounded-md bg-panel-raised p-3">
            <dt class="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wide text-warn">
              <DxIcon
                name="resources/star"
                :size="14"
              />{{ $t('missions.bestCompanions') }}
            </dt>
            <dd class="mt-1 text-xs text-ink-muted">
              {{ gameText('missions.worldMissions.tip') }}
            </dd>
          </div>
        </dl>
      </section>

      <section class="panel p-4 sm:p-5">
        <h2 class="mb-1 flex items-center gap-2 text-lg uppercase tracking-wide">
          <DxIcon
            name="resources/timer"
            :size="22"
            class="text-nova"
          />
          {{ $t('missions.dailies') }}
        </h2>
        <p class="text-sm text-ink-muted">
          {{ $t('missions.dailyReset', { count: missions.dailies.perDay, hours: missions.dailies.resetHours }) }}
        </p>

        <ul class="mt-3 flex flex-col gap-2">
          <li
            v-for="(tier, i) in missions.dailies.tiers"
            :key="tier.difficulty"
            class="grid gap-2 rounded-md bg-panel-raised p-3 sm:grid-cols-[6rem_1fr_auto]"
          >
            <span class="font-display font-semibold">{{ $t(`missions.difficulty.${tier.difficulty}`) }}</span>
            <ul class="text-xs text-ink-muted">
              <li
                v-for="(ex, j) in gameTextList(`missions.dailies.tiers.${i}.examples`)"
                :key="j"
              >
                • {{ ex }}
              </li>
            </ul>
            <span
              class="text-right text-xs"
              :class="tier.difficulty === 'hard' ? 'text-accent' : 'text-ink-muted'"
            >{{ gameText(`missions.dailies.tiers.${i}.reward`) }}</span>
          </li>
        </ul>
      </section>
    </div>

    <div class="grid gap-3 lg:grid-cols-[minmax(0,1fr)_380px]">
      <section class="panel p-4 sm:p-5">
        <h2 class="mb-2 text-lg uppercase tracking-wide">
          {{ $t('missions.cantina') }}
        </h2>
        <p class="text-sm text-ink-muted">
          {{ gameText('missions.cantina.mechanic') }}
        </p>

        <div class="mt-3 grid gap-3 sm:grid-cols-3">
          <div class="rounded-md bg-panel-raised p-3">
            <p class="text-[10px] font-semibold uppercase tracking-wide text-ink-muted">
              {{ $t('missions.traders') }}
            </p>
            <p class="font-mono text-xl">
              {{ missions.cantina.traders }}
            </p>
          </div>
          <div class="rounded-md bg-panel-raised p-3">
            <p class="text-[10px] font-semibold uppercase tracking-wide text-ink-muted">
              {{ $t('missions.cooldown') }}
            </p>
            <p class="text-xl text-valid">
              {{ $t('missions.noCooldown') }}
            </p>
          </div>
          <div class="rounded-md bg-panel-raised p-3">
            <p class="text-[10px] font-semibold uppercase tracking-wide text-ink-muted">
              {{ $t('missions.rewards') }}
            </p>
            <p class="mt-1 text-xs text-ink-muted">
              {{ gameText('missions.cantina.rewards') }}
            </p>
          </div>
        </div>

        <p class="mt-3 text-xs text-ink-muted">
          {{ gameText('missions.cantina.cooldownNote') }}
        </p>
        <p class="dx-alert dx-alert--info mt-3 border-0 text-[0.8125rem]">
          <DxIcon
            name="status/info"
            :size="17"
            class="mt-px shrink-0"
          />
          <span>{{ gameText('missions.cantina.tip') }}</span>
        </p>
      </section>

      <section class="panel relative overflow-hidden p-4 sm:p-5">
        <h2 class="flex flex-wrap items-center gap-2 text-lg">
          <DxIcon
            name="resources/nova-crystal"
            :size="22"
            class="text-nova"
          />
          {{ $t('missions.doubleDailyTitle') }}
          <span class="font-mono text-accent">✦ {{ missions.dailies.doubleDaily.cost }}</span>
        </h2>
        <p class="mt-2 text-sm text-ink-muted">
          {{ gameText('missions.dailies.doubleDaily.effect') }}
        </p>
        <p class="dx-alert dx-alert--warning mt-3 border-0 text-xs">
          <DxIcon
            name="status/warning"
            :size="17"
            class="mt-px shrink-0"
          />
          <span>{{ gameText('missions.dailies.doubleDaily.uncertainty') }}</span>
        </p>
      </section>
    </div>

    <ul class="grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
      <li
        v-for="(s, i) in gameTextList('missions.strategies')"
        :key="i"
        class="panel p-4"
      >
        <p class="mb-1.5 flex items-center gap-2 font-display font-semibold">
          <DxIcon
            name="resources/star"
            :size="16"
            class="text-accent"
          />
          {{ i + 1 }}.
        </p>
        <p class="text-xs text-ink-muted">
          {{ s }}
        </p>
      </li>
    </ul>

    <!-- Détail d'un terminal. Même structure que la fenêtre des paliers de renaissance. -->
    <Teleport to="body">
      <div
        v-if="selectedPad"
        ref="padDialogRef"
        tabindex="-1"
        class="fixed inset-0 z-50 grid place-items-center overflow-y-auto p-4 focus:outline-none"
        role="dialog"
        aria-modal="true"
        :aria-label="`${$t(`tier.${selectedPad.missionTier}`)} — ${$t('missions.padNumber', { number: selectedPad.pad })}`"
        @click.self="closePad"
      >
        <div
          class="absolute inset-0 bg-void-deep/70 backdrop-blur-md"
          @click="closePad"
        />

        <section class="dx-modal-panel panel relative z-10 w-full max-w-lg p-4 sm:p-6">
          <div class="mb-5 flex items-start gap-4">
            <img
              :src="PAD_IMAGE[selectedPad.missionTier as Tier]"
              alt=""
              class="size-20 shrink-0 object-contain"
            >

            <div class="min-w-0 flex-1">
              <h2 class="text-xl">
                {{ $t(`tier.${selectedPad.missionTier}`) }}
                <span
                  v-if="selectedPad.unlockCost"
                  class="text-ink-muted"
                >
                  {{ formatNumber(selectedPad.unlockCost, locale) }}
                </span>
              </h2>
              <p class="mt-1 text-xs text-ink-muted">
                {{ $t('missions.padNumber', { number: selectedPad.pad }) }}
                · {{ formatDuration(selectedPad.baseDurationSeconds) }}
              </p>
            </div>

            <button
              type="button"
              class="dx-icon-button shrink-0"
              :aria-label="$t('common.close')"
              @click="closePad"
            >
              <DxIcon
                name="actions/close"
                :size="18"
              />
            </button>
          </div>

          <p class="mb-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-ink-muted">
            {{ $t('missions.rewards') }}
          </p>

          <!-- En liste plutôt qu'en barre : ici on lit chaque récompense, on ne compare pas. -->
          <ul class="flex flex-col gap-1.5">
            <li
              v-for="r in (selectedPad.rewards as Reward[])"
              :key="`d-${r.kind}-${r.tier ?? ''}`"
              class="flex items-center gap-3 rounded-md bg-void/40 px-3 py-2"
            >
              <span
                class="size-3.5 shrink-0 rounded-full"
                :class="rewardClass(r)"
              />
              <span class="flex-1 text-sm">{{ rewardLabel(r) }}</span>
              <span class="font-mono text-sm font-bold tabular-nums">{{ r.chance }} %</span>
            </li>
          </ul>

          <p
            v-if="gameText(`missions.pads.entries.${selectedIndex}.note`)"
            class="dx-alert dx-alert--info mt-4 border-0 text-xs"
          >
            <DxIcon
              name="status/info"
              :size="16"
              class="mt-px shrink-0"
            />
            <span>{{ gameText(`missions.pads.entries.${selectedIndex}.note`) }}</span>
          </p>
        </section>
      </div>
    </Teleport>
  </div>
</template>
