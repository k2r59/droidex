<script setup lang="ts">
import shopData from '~/data/nova-shop.json'

const store = useCollectionStore()
const { t, locale } = useI18n()

useSeoMeta({
  title: () => t('shop.title'),
  description: () => t('shop.subtitle'),
})

type Item = {
  id: string
  name: string
  costs: number[]
  oneTime?: boolean
  effect: string | null
  confidence: string
  note?: string
  droidSlug?: string
}

const level = (id: string) => store.shopLevels[id] ?? 0

/** Coût du prochain niveau. `null` si l'article est au maximum ou non chiffré. */
function nextCost(item: Item): number | null {
  const l = level(item.id)
  return l < item.costs.length ? (item.costs[l] ?? null) : null
}

/** Somme des niveaux restant à acheter. */
function remainingCost(item: Item): number {
  return item.costs.slice(level(item.id)).reduce((a, b) => a + b, 0)
}

const totalRemaining = computed(() =>
  (shopData.sections as { items: Item[] }[])
    .flatMap((s) => s.items)
    .reduce((sum, item) => sum + remainingCost(item), 0),
)

const grandTotal = computed(() =>
  (shopData.sections as { items: Item[] }[])
    .flatMap((s) => s.items)
    .reduce((sum, item) => sum + item.costs.reduce((a, b) => a + b, 0), 0),
)

const CONFIDENCE_CLASS: Record<string, string> = {
  confirmed: 'text-valid',
  conflicting: 'text-warn',
  'single-source': 'text-warn',
  unknown: 'text-ink-muted',
}

/** Ordre d'achat conseillé par la communauté, résolu en articles. */
const recommended = computed(() =>
  shopData.recommendedOrder
    .map((id) => (shopData.sections as { items: Item[] }[]).flatMap((s) => s.items).find((i) => i.id === id))
    .filter(Boolean) as Item[],
)

const balanceInput = ref<number | null>(null)
watchEffect(() => { balanceInput.value = store.novaCrystals })
</script>

<template>
  <div class="flex flex-col gap-5">
    <PageBanner name="nova-shop">
      <div class="flex flex-wrap items-end justify-between gap-4">
      <div>
        <h1 class="text-xl font-bold">{{ $t('shop.title') }}</h1>
        <p class="text-sm text-ink-muted">{{ $t('shop.subtitle') }}</p>
      </div>

      <label class="flex flex-col gap-1">
        <span class="text-xs text-ink-muted">{{ $t('shop.balance') }}</span>
        <span class="flex items-center gap-2">
          <span class="text-lg text-iconic" aria-hidden="true">✦</span>
          <input
            v-model.number="balanceInput"
            type="number"
            min="0"
            class="w-28 rounded-lg border border-edge bg-panel-raised px-2 py-1.5 text-right font-mono tabular-nums focus:border-iconic focus:outline-none"
            @change="store.setNovaCrystals(Math.max(0, balanceInput ?? 0))"
          >
        </span>
      </label>

      <dl class="flex gap-6 text-sm">
        <div>
          <dt class="text-xs text-ink-muted">{{ $t('shop.remaining') }}</dt>
          <dd class="font-mono text-lg tabular-nums">{{ formatExact(totalRemaining, locale) }}</dd>
        </div>
        <div>
          <dt class="text-xs text-ink-muted">{{ $t('shop.grandTotal') }}</dt>
          <dd class="font-mono text-lg tabular-nums text-ink-muted">{{ formatExact(grandTotal, locale) }}</dd>
        </div>
      </dl>
      </div>
    </PageBanner>

    <p class="rounded-lg border border-warn/30 bg-warn/10 px-3 py-2 text-sm text-warn">
      {{ $t('shop.incomplete') }}
    </p>

    <!-- L'ordre d'achat est la question n°1 des joueurs : on la traite avant le catalogue. -->
    <section class="rounded-card border border-edge bg-panel p-6">
      <h2 class="mb-3 font-semibold">{{ $t('shop.recommendedOrder') }}</h2>
      <ol class="flex flex-wrap items-center gap-2 text-sm">
        <li
          v-for="(item, i) in recommended"
          :key="item.id"
          class="flex items-center gap-2"
        >
          <span class="rounded-lg bg-panel-raised px-2.5 py-1">
            <span class="mr-1.5 text-xs text-ink-muted">{{ i + 1 }}</span>{{ item.name }}
          </span>
          <span v-if="i < recommended.length - 1" class="text-ink-muted" aria-hidden="true">→</span>
        </li>
      </ol>
    </section>

    <section
      v-for="section in (shopData.sections as { id: string; items: Item[] }[])"
      :key="section.id"
      class="flex flex-col gap-2"
    >
      <h2 class="text-lg font-semibold">{{ $t(`shop.category.${section.id}`) }}</h2>

      <ul class="grid gap-2 md:grid-cols-2">
        <li
          v-for="item in section.items"
          :key="item.id"
          class="flex flex-col gap-2 rounded-card border border-edge bg-panel p-5"
        >
          <div class="flex items-start justify-between gap-3">
            <div class="min-w-0">
              <p class="flex items-center gap-2 font-medium">
                {{ item.name }}
                <span
                  v-if="item.confidence !== 'confirmed'"
                  class="cursor-help text-xs"
                  :class="CONFIDENCE_CLASS[item.confidence]"
                  :title="item.note ?? $t(`shop.confidence.${item.confidence}`)"
                >⚠</span>
              </p>
              <p v-if="item.effect" class="text-xs text-ink-muted">{{ item.effect }}</p>
              <p v-else class="text-xs italic text-ink-muted">{{ $t('droid.noData') }}</p>
            </div>

            <span v-if="item.oneTime" class="shrink-0 rounded bg-panel-raised px-1.5 py-0.5 text-[10px] uppercase text-ink-muted">
              {{ $t('shop.oneTime') }}
            </span>
          </div>

          <!-- Article non chiffré : on l'affiche quand même, l'absence de donnée est une information. -->
          <p v-if="!item.costs.length" class="text-sm text-ink-muted">
            {{ $t('shop.unknownCost') }}
          </p>

          <div v-else class="flex items-center justify-between gap-3">
            <div class="flex items-center gap-2">
              <button
                type="button"
                class="grid size-7 place-items-center rounded-lg bg-panel-raised text-lg leading-none transition-colors hover:bg-edge disabled:opacity-30"
                :disabled="level(item.id) === 0"
                :aria-label="`−1 ${item.name}`"
                @click="store.setShopLevel(item.id, level(item.id) - 1)"
              >−</button>

              <span class="min-w-16 text-center font-mono text-sm tabular-nums">
                {{ level(item.id) }} / {{ item.costs.length }}
              </span>

              <button
                type="button"
                class="grid size-7 place-items-center rounded-lg bg-panel-raised text-lg leading-none transition-colors hover:bg-edge disabled:opacity-30"
                :disabled="level(item.id) >= item.costs.length"
                :aria-label="`+1 ${item.name}`"
                @click="store.setShopLevel(item.id, level(item.id) + 1)"
              >+</button>
            </div>

            <p class="text-right text-sm">
              <template v-if="nextCost(item) !== null">
                <span
                  class="font-mono tabular-nums"
                  :class="nextCost(item)! <= store.novaCrystals ? 'text-valid' : 'text-ink-muted'"
                >
                  ✦ {{ formatExact(nextCost(item), locale) }}
                </span>
                <span class="block text-xs text-ink-muted">
                  {{ $t('shop.remaining') }} : {{ formatExact(remainingCost(item), locale) }}
                </span>
              </template>
              <span v-else class="text-xs text-valid">{{ $t('shop.maxed') }}</span>
            </p>
          </div>
        </li>
      </ul>
    </section>

    <p class="text-xs text-ink-muted">{{ shopData.note }}</p>
  </div>
</template>
