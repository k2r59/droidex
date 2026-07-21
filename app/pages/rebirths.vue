<script setup lang="ts">
import rebirthData from '~/data/rebirths.json'
import type { Tier } from '~~/shared/types/droid'

const store = useCollectionStore()
const { t, locale } = useI18n()

useSeoMeta({
  title: () => t('rebirth.title'),
  description: () => t('rebirth.cycleHint'),
})

type Requirement = { slug: string; tier: Tier | null }
type Level = { level: number; credits: number; droids: Requirement[]; documented?: boolean }

const cycles = rebirthData.cycles as Record<string, Level[]>
const levels = computed<Level[]>(() => cycles[String(store.cycle)] ?? cycles['1']!)

const droidBySlug = computed(() =>
  Object.fromEntries(store.droids.map((d) => [d.slug, d])),
)

/** Une exigence sans palier précisé est satisfaite dès que le droid est possédé. */
function met(req: Requirement): boolean {
  return req.tier ? store.satisfies(req.slug, req.tier) : store.entry(req.slug).tier !== null
}

const nextLevel = computed(() => levels.value.find((l) => l.level === store.rebirth + 1) ?? null)

const missingCount = computed(() =>
  nextLevel.value ? nextLevel.value.droids.filter((r) => !met(r)).length : 0,
)

const isReady = computed(
  () => Boolean(nextLevel.value?.droids.length) && missingCount.value === 0,
)

const superUnlocked = computed(() => store.rebirth >= rebirthData.superRebirthUnlock.rebirth)

/** Cristaux qui seraient gagnés en faisant un Super Rebirth maintenant. */
const crystalsNow = computed(
  () => (rebirthData.novaByRebirth as Record<string, number>)[String(store.rebirth)] ?? null,
)

const creditMultiplier = computed(() =>
  Math.round(store.rebirth * rebirthData.creditMultiplierPerLevel * 100),
)

/** Le palier courant est déplié par défaut, les autres repliés. */
const expanded = ref<number | null>(null)
watchEffect(() => { expanded.value = store.rebirth + 1 })
</script>

<template>
  <div class="flex flex-col gap-5">
    <section class="flex flex-col gap-4 rounded-xl border border-edge bg-panel p-4">
      <div class="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 class="text-xl font-bold">{{ $t('rebirth.title') }}</h1>
          <p class="text-sm text-ink-muted">
            {{ $t('rebirth.subtitle', { current: store.rebirth, max: rebirthData.maxRebirth }) }}
          </p>
        </div>

        <label class="flex flex-col gap-1">
          <span class="text-xs text-ink-muted">{{ $t('rebirth.setLevel') }}</span>
          <input
            :value="store.rebirth"
            type="number"
            min="0"
            :max="rebirthData.maxRebirth"
            class="w-24 rounded-lg border border-edge bg-panel-raised px-2 py-1.5 text-right font-mono tabular-nums focus:border-iconic focus:outline-none"
            @change="store.setRebirth(Math.min(rebirthData.maxRebirth, Math.max(0, Number(($event.target as HTMLInputElement).value))))"
          >
        </label>

        <div class="text-right">
          <p class="text-xs text-ink-muted">{{ $t('rebirth.multiplier', { value: creditMultiplier }) }}</p>
          <p class="text-xs text-ink-muted">{{ $t('rebirth.cycle', { number: store.cycle }) }}</p>
        </div>
      </div>

      <div class="h-2 overflow-hidden rounded-full bg-edge">
        <div
          class="h-full rounded-full bg-iconic transition-[width] duration-500"
          :style="{ width: `${(store.rebirth / rebirthData.maxRebirth) * 100}%` }"
        />
      </div>

      <p class="rounded-lg bg-panel-raised px-3 py-2 text-sm text-amber-200">
        ⚠ {{ $t('rebirth.placementWarning') }}
      </p>
    </section>

    <!-- Prochaine renaissance mise en avant : c'est l'écran qu'on ouvre en jouant. -->
    <section
      v-if="nextLevel"
      class="rounded-xl border p-4"
      :class="isReady ? 'border-emerald-600 bg-emerald-950/20' : 'border-edge bg-panel'"
    >
      <div class="mb-3 flex flex-wrap items-baseline justify-between gap-2">
        <h2 class="font-semibold">
          {{ $t('rebirth.next') }} — {{ nextLevel.level }}
        </h2>
        <p class="font-mono text-sm tabular-nums">
          {{ formatNumber(nextLevel.credits, locale) }}
          <span class="text-xs text-ink-muted">{{ $t('rebirth.creditsRequired') }}</span>
        </p>
      </div>

      <p v-if="!nextLevel.droids.length" class="text-sm text-ink-muted">
        {{ $t('rebirth.undocumented') }}
      </p>

      <template v-else>
        <ul class="grid gap-2 sm:grid-cols-3">
          <li
            v-for="req in nextLevel.droids"
            :key="`${req.slug}-${req.tier}`"
            class="flex items-center gap-2 rounded-lg bg-panel-raised p-2"
            :class="met(req) ? 'ring-1 ring-emerald-600' : ''"
          >
            <DroidImage
              v-if="droidBySlug[req.slug]"
              :droid="droidBySlug[req.slug]!"
              :tier="req.tier ?? 'DEFAULT'"
              size="sm"
              :dimmed="!met(req)"
            />
            <div class="min-w-0 flex-1">
              <p class="truncate text-sm font-medium">{{ droidBySlug[req.slug]?.name ?? req.slug }}</p>
              <p class="text-xs text-ink-muted">
                {{ req.tier ? $t(`tier.${req.tier}`) : $t('rebirth.anyTier') }}
              </p>
            </div>
            <span :class="met(req) ? 'text-emerald-500' : 'text-ink-muted'">
              {{ met(req) ? '✓' : '○' }}
            </span>
          </li>
        </ul>

        <p class="mt-3 text-sm" :class="isReady ? 'text-emerald-400' : 'text-ink-muted'">
          {{ isReady ? $t('rebirth.ready') : $t('rebirth.missing', missingCount, { named: { count: missingCount } }) }}
        </p>
      </template>
    </section>

    <SuperRebirthPanel
      :unlocked="superUnlocked"
      :crystals-now="crystalsNow"
      :nova-by-rebirth="rebirthData.novaByRebirth"
      :unlock-rebirth="rebirthData.superRebirthUnlock.rebirth"
    />

    <!-- Table complète : utile pour planifier plusieurs paliers à l'avance. -->
    <section class="flex flex-col gap-2">
      <h2 class="text-lg font-semibold">{{ $t('rebirth.title') }}</h2>

      <ul class="flex flex-col gap-1">
        <li
          v-for="lvl in levels"
          :key="lvl.level"
          class="overflow-hidden rounded-lg border border-edge bg-panel"
        >
          <button
            type="button"
            class="flex w-full items-center gap-3 px-3 py-2 text-left transition-colors hover:bg-panel-raised"
            :aria-expanded="expanded === lvl.level"
            @click="expanded = expanded === lvl.level ? null : lvl.level"
          >
            <span
              class="grid size-7 shrink-0 place-items-center rounded-full text-xs font-bold"
              :class="lvl.level <= store.rebirth ? 'bg-emerald-600 text-void' : 'bg-panel-raised text-ink-muted'"
            >{{ lvl.level }}</span>

            <span class="flex-1 font-mono text-sm tabular-nums">{{ formatNumber(lvl.credits, locale) }}</span>

            <span v-if="!lvl.droids.length" class="text-xs italic text-ink-muted">
              {{ $t('rebirth.undocumented') }}
            </span>
            <span v-else class="flex -space-x-1">
              <span
                v-for="req in lvl.droids"
                :key="`${req.slug}-${req.tier}`"
                class="size-2 rounded-full"
                :class="met(req) ? 'bg-emerald-500' : 'bg-edge'"
              />
            </span>
          </button>

          <div v-if="expanded === lvl.level && lvl.droids.length" class="border-t border-edge px-3 py-2">
            <ul class="flex flex-wrap gap-2">
              <li
                v-for="req in lvl.droids"
                :key="`${req.slug}-${req.tier}`"
                class="flex items-center gap-1.5 rounded bg-panel-raised px-2 py-1 text-xs"
              >
                <span :class="met(req) ? 'text-emerald-500' : 'text-ink-muted'">{{ met(req) ? '✓' : '○' }}</span>
                {{ droidBySlug[req.slug]?.name ?? req.slug }}
                <span class="text-ink-muted">{{ req.tier ? $t(`tier.${req.tier}`) : $t('rebirth.anyTier') }}</span>
              </li>
            </ul>
          </div>
        </li>
      </ul>
    </section>
  </div>
</template>
