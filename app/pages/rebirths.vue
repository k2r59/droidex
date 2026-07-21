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

const droidBySlug = computed(() => Object.fromEntries(store.droids.map((d) => [d.slug, d])))

/** Une exigence sans palier précisé est satisfaite dès que le droid est possédé. */
function met(req: Requirement): boolean {
  return req.tier ? store.satisfies(req.slug, req.tier) : store.entry(req.slug).tier !== null
}

const nextLevel = computed(() => levels.value.find((l) => l.level === store.rebirth + 1) ?? null)
const missingCount = computed(() =>
  nextLevel.value ? nextLevel.value.droids.filter((r) => !met(r)).length : 0,
)
const isReady = computed(() => Boolean(nextLevel.value?.droids.length) && missingCount.value === 0)

const progress = computed(() => Math.round((store.rebirth / rebirthData.maxRebirth) * 100))
const creditMultiplier = computed(() =>
  Math.round(store.rebirth * rebirthData.creditMultiplierPerLevel * 100),
)

const superUnlocked = computed(() => store.rebirth >= rebirthData.superRebirthUnlock.rebirth)
const crystalsNow = computed(
  () => (rebirthData.novaByRebirth as Record<string, number>)[String(store.rebirth)] ?? null,
)

/** Périmètre du cercle de progression, pour piloter le trait en dasharray. */
const RADIUS = 42
const CIRCUMFERENCE = 2 * Math.PI * RADIUS

function setLevel(value: number) {
  store.setRebirth(Math.min(rebirthData.maxRebirth, Math.max(0, value)))
}

const search = ref('')

/**
 * Un palier est « verrouillé » quand ses exigences ne sont pas publiées — ce qui est le
 * cas de presque tout le cycle 2 et du cycle 3. Le cadenas dit donc « donnée manquante »
 * et non « progression insuffisante » : mentir sur ce point induirait le joueur en erreur.
 */
const shown = computed(() => {
  const q = search.value.trim()
  return levels.value
    .filter((l) => !q || String(l.level).includes(q) || formatNumber(l.credits, locale.value).includes(q))
    .map((l) => ({
      ...l,
      locked: l.droids.length === 0,
      done: l.level <= store.rebirth,
      current: l.level === store.rebirth + 1,
      superUnlock: l.level === rebirthData.superRebirthUnlock.rebirth,
    }))
})
</script>

<template>
  <!-- § 6 de la spécification : contenu principal + rail de 340 px. -->
  <div class="layout-2-columns">
    <div class="flex min-w-0 flex-col gap-5">
      <PageBanner name="renaissances" min-height="17rem">
        <div>
          <h1 class="text-4xl lg:text-5xl">{{ $t('rebirth.title') }}</h1>
          <p class="mt-1 max-w-md text-sm text-ink-muted">{{ $t('rebirth.cycleHint') }}</p>
        </div>

        <!-- Les trois chiffres qui décident d'une session : où j'en suis, où je me situe, ce que ça rapporte. -->
        <div class="grid gap-4 rounded-card border border-edge bg-void/55 p-4 backdrop-blur sm:grid-cols-3">
          <div class="flex items-center gap-4">
            <div>
              <p class="text-[10px] font-semibold uppercase tracking-[0.14em] text-ink-muted">
                {{ $t('rebirth.yourProgress') }}
              </p>
              <p class="font-mono text-2xl">
                <span class="text-accent">{{ store.rebirth }}</span>
                <span class="text-ink-muted"> / {{ rebirthData.maxRebirth }}</span>
              </p>
              <p class="text-xs text-ink-muted">{{ $t('rebirth.tiersCompleted') }}</p>
            </div>

            <div class="relative grid size-16 shrink-0 place-items-center">
              <svg class="absolute inset-0 -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" :r="RADIUS" fill="none" stroke="currentColor" stroke-width="9" class="text-edge" />
                <circle
                  cx="50" cy="50" :r="RADIUS" fill="none" stroke="currentColor" stroke-width="9"
                  stroke-linecap="round" class="text-accent transition-[stroke-dashoffset] duration-700"
                  :stroke-dasharray="CIRCUMFERENCE" :stroke-dashoffset="CIRCUMFERENCE * (1 - progress / 100)"
                />
              </svg>
              <span class="font-mono text-sm">{{ progress }}%</span>
            </div>
          </div>

          <div>
            <p class="text-[10px] font-semibold uppercase tracking-[0.14em] text-ink-muted">
              {{ $t('rebirth.setMyTier') }}
            </p>
            <div class="dx-stepper mt-2">
              <button type="button" :aria-label="`−1 ${$t('rebirth.title')}`" @click="setLevel(store.rebirth - 1)">−</button>
              <output>{{ store.rebirth }}</output>
              <button type="button" :aria-label="`+1 ${$t('rebirth.title')}`" @click="setLevel(store.rebirth + 1)">+</button>
            </div>
          </div>

          <div>
            <p class="text-[10px] font-semibold uppercase tracking-[0.14em] text-ink-muted">
              {{ $t('rebirth.activeBonus') }}
            </p>
            <p class="font-mono text-2xl text-valid">+{{ creditMultiplier }}%</p>
            <div class="flex flex-wrap items-center gap-2">
              <span class="text-xs text-ink-muted">{{ $t('rebirth.creditsPerTier') }}</span>
              <span class="dx-badge dx-badge--rare">{{ $t('rebirth.cycle', { number: store.cycle }) }}</span>
            </div>
          </div>
        </div>
      </PageBanner>

      <p class="dx-alert dx-alert--warning">
        <DxIcon name="status/warning" :size="20" class="mt-0.5 shrink-0" />
        <span>{{ $t('rebirth.placementWarning') }}</span>
      </p>

      <!-- Prochaine renaissance : c'est l'écran qu'on ouvre en jouant. -->
      <section v-if="nextLevel" class="panel p-5" :class="isReady && 'border-valid/60'">
        <div class="mb-4 flex flex-wrap items-center justify-between gap-3">
          <h2 class="flex items-center gap-2 text-lg uppercase tracking-wide">
            <DxIcon name="resources/star" :size="20" class="text-accent" />
            {{ $t('rebirth.next') }} — {{ nextLevel.level }}
          </h2>
          <p class="text-sm">
            <span class="font-mono text-lg text-accent">{{ formatNumber(nextLevel.credits, locale) }}</span>
            <span class="ml-1 text-ink-muted">{{ $t('rebirth.creditsRequired') }}</span>
          </p>
        </div>

        <p v-if="!nextLevel.droids.length" class="text-sm text-ink-muted">
          {{ $t('rebirth.undocumented') }}
        </p>

        <template v-else>
          <ul class="grid gap-3 sm:grid-cols-3">
            <li
              v-for="req in nextLevel.droids"
              :key="`${req.slug}-${req.tier}`"
              class="dx-droid-card flex items-center gap-3"
              :class="met(req) && 'border-valid/60'"
            >
              <DroidImage
                v-if="droidBySlug[req.slug]"
                :droid="droidBySlug[req.slug]!"
                :tier="req.tier ?? 'DEFAULT'"
                size="sm"
                :dimmed="!met(req)"
              />
              <div class="min-w-0 flex-1">
                <p class="truncate font-display font-semibold">{{ droidBySlug[req.slug]?.name ?? req.slug }}</p>
                <span class="dx-badge dx-badge--common mt-1">
                  {{ req.tier ? $t(`tier.${req.tier}`) : $t('rebirth.anyTier') }}
                </span>
              </div>
              <DxIcon
                :name="met(req) ? 'status/success' : 'actions/check'"
                :size="20"
                class="shrink-0"
                :class="met(req) ? 'text-valid' : 'text-ink-muted opacity-40'"
              />
            </li>
          </ul>

          <p class="dx-alert mt-4" :class="isReady ? 'dx-alert--success' : 'dx-alert--info'">
            <DxIcon :name="isReady ? 'status/success' : 'status/info'" :size="20" class="mt-0.5 shrink-0" />
            <span>{{ isReady ? $t('rebirth.ready') : $t('rebirth.missing', missingCount, { named: { count: missingCount } }) }}</span>
          </p>
        </template>
      </section>

      <!-- Table complète : utile pour planifier plusieurs paliers à l'avance. -->
      <section class="panel p-5">
        <div class="mb-4 flex flex-wrap items-center justify-between gap-3">
          <h2 class="text-lg uppercase tracking-wide">{{ $t('rebirth.allTiers') }}</h2>
          <label class="dx-search w-full sm:w-72">
            <DxIcon name="actions/search" :size="16" class="text-ink-muted" />
            <input v-model="search" type="search" :placeholder="$t('rebirth.searchTier')" class="border-0 bg-transparent outline-none">
            <span />
          </label>
        </div>

        <ul class="grid grid-cols-2 gap-2 sm:grid-cols-4 xl:grid-cols-6 2xl:grid-cols-8">
          <li
            v-for="lvl in shown"
            :key="lvl.level"
            class="flex flex-col gap-1.5 rounded-md border p-3 transition-colors"
            :class="[
              lvl.current ? 'border-accent/70 bg-accent/10' : 'border-edge bg-panel-raised',
              lvl.locked && 'opacity-45',
            ]"
          >
            <div class="flex items-center justify-between gap-1">
              <span
                class="font-mono text-sm"
                :class="lvl.done ? 'text-valid' : lvl.current ? 'text-accent' : 'text-ink-muted'"
              >{{ lvl.level }}</span>
              <DxIcon v-if="lvl.superUnlock" name="resources/star" :size="14" class="text-warn" :title="$t('superRebirth.title')" />
              <DxIcon v-else-if="lvl.locked" name="actions/lock" :size="14" class="text-ink-muted" :title="$t('rebirth.tierLocked')" />
            </div>

            <p class="flex items-center gap-1.5">
              <DxIcon name="resources/credits" :size="14" class="shrink-0 text-nova" />
              <span class="font-mono text-sm">{{ formatNumber(lvl.credits, locale) }}</span>
            </p>
          </li>
        </ul>
      </section>
    </div>

    <SuperRebirthPanel
      :unlocked="superUnlocked"
      :crystals-now="crystalsNow"
      :nova-by-rebirth="rebirthData.novaByRebirth"
      :unlock-rebirth="rebirthData.superRebirthUnlock.rebirth"
    />
  </div>
</template>
