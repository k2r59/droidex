<script setup lang="ts">
import shopData from '~/data/nova-shop.json'

const store = useCollectionStore()
const { t, locale } = useI18n()
const { gameText } = useGameText()
const localePath = useLocalePath()

useSeoMeta({
  title: () => t('shop.title'),
  description: () => t('shop.subtitle'),
})

type RawItem = {
  id: string
  costs: number[]
  oneTime?: boolean
  confidence: string
  droidSlug?: string
}
type RawSection = { id: string, items: RawItem[] }

/**
 * Les libellés d'article vivent maintenant dans `app/data/i18n/*.json`. On calcule une
 * fois le chemin de traduction de chaque article — `novaShop.sections.1.items.4` — et on
 * l'attache à l'objet : les gabarits n'ont plus à jongler avec deux index imbriqués.
 */
type Item = RawItem & { path: string }
type Section = { id: string, items: Item[] }

const sections: Section[] = (shopData.sections as RawSection[]).map((section, s) => ({
  ...section,
  items: section.items.map((item, i) => ({ ...item, path: `novaShop.sections.${s}.items.${i}` })),
}))
const allItems = computed(() => sections.flatMap((s) => s.items))

/** Raccourcis de lecture : le nom et l'effet d'un article sont demandés à plusieurs endroits. */
const itemName = (item: Item) => gameText(`${item.path}.name`)
const itemEffect = (item: Item) => gameText(`${item.path}.effect`)
const itemNote = (item: Item) => gameText(`${item.path}.note`)

const level = (id: string) => store.shopLevels[id] ?? 0

/** Coût du prochain niveau. `null` si l'article est au maximum ou non chiffré. */
function nextCost(item: Item): number | null {
  const l = level(item.id)
  return l < item.costs.length ? (item.costs[l] ?? null) : null
}

/** Somme des niveaux restant à acheter. */
const remainingCost = (item: Item) => item.costs.slice(level(item.id)).reduce((a, b) => a + b, 0)

const totalRemaining = computed(() => allItems.value.reduce((s, i) => s + remainingCost(i), 0))
const grandTotal = computed(() =>
  allItems.value.reduce((s, i) => s + i.costs.reduce((a, b) => a + b, 0), 0),
)

/**
 * Une icône par article. Le pack n'en fournit pas de dédiées, on réutilise celles de
 * ressource dont le sens est le plus proche — le repère visuel compte plus que
 * l'exactitude du pictogramme.
 */
const ICONS: Record<string, string> = {
  'critical-chance': 'game/radar',
  'critical-amount': 'resources/star',
  'companion-slot': 'game/droid',
  'max-health': 'status/success',
  'damage': 'resources/energy',
  'credits': 'resources/credits',
  'movement-speed': 'game/rocket',
  'pickaxe-mastery': 'game/factory',
  'jawa-bartering': 'game/crate',
  'super-crates': 'game/crate',
  'flawless-charm': 'resources/diamond',
  'double-daily-quests': 'resources/timer',
  'lounge-slot': 'game/factory',
  'upgrade-chip-scrap': 'resources/gold',
  'scrap-value': 'resources/credits',
  'blueprint-scrap': 'game/crate',
  'crafting-speed': 'resources/timer',
  'blueprint-storage': 'game/crate',
  'collect-all': 'actions/download',
  'rebirth-droid-alert': 'status/warning',
  'blueprint-vendor': 'game/portal',
  'nova-crystal-base-paint': 'resources/nova-crystal',
}
const iconOf = (id: string) => ICONS[id] ?? 'resources/nova-crystal'

const recommended = computed(() =>
  shopData.recommendedOrder.map((id) => allItems.value.find((i) => i.id === id)).filter(Boolean) as Item[],
)

const iconics = computed(() => sections.find((s) => s.id === 'iconic')?.items ?? [])
const upgradeSections = computed(() => sections.filter((s) => s.id !== 'iconic'))
const droidBySlug = computed(() => Object.fromEntries(store.droids.map((d) => [d.slug, d])))

const balanceInput = ref<number | null>(null)
watchEffect(() => { balanceInput.value = store.novaCrystals })

/** Notes de lecture du catalogue, groupées en pied de page. */
const notes = [
  { icon: 'status/info', tone: 'text-glow', key: 'shop.noteLevels' },
  { icon: 'resources/nova-crystal', tone: 'text-nova', key: 'shop.noteOneTime' },
  { icon: 'status/warning', tone: 'text-warn', key: 'shop.noteUnverified' },
] as const
</script>

<template>
  <div class="layout-2-columns">
    <div class="flex min-w-0 flex-col gap-5">
      <PageBanner
        name="nova-shop"
        min-height="14rem"
      >
        <div class="flex flex-wrap items-end justify-between gap-6">
          <div class="flex items-start gap-3">
            <span class="grid size-11 shrink-0 place-items-center rounded-md bg-nova/15 text-nova">
              <DxIcon
                name="resources/nova-crystal"
                :size="24"
              />
            </span>
            <div>
              <h1 class="text-4xl lg:text-5xl">
                {{ $t('shop.title') }}
              </h1>
              <p class="text-sm text-ink-muted">
                {{ $t('shop.subtitle') }}
              </p>
            </div>
          </div>

          <label class="flex flex-col gap-1">
            <span class="text-[10px] font-semibold uppercase tracking-[0.14em] text-ink-muted">
              {{ $t('shop.balance') }}
            </span>
            <span class="dx-search">
              <DxIcon
                name="resources/nova-crystal"
                :size="18"
                class="text-nova"
              />
              <input
                v-model.number="balanceInput"
                type="number"
                min="0"
                class="w-24 border-0 bg-transparent text-lg outline-none"
                @change="store.setNovaCrystals(Math.max(0, balanceInput ?? 0))"
              >
              <span />
            </span>
          </label>

          <dl class="flex gap-6">
            <div>
              <dt class="text-[10px] font-semibold uppercase tracking-[0.14em] text-ink-muted">
                {{ $t('shop.remaining') }}
              </dt>
              <dd class="flex items-center gap-1.5 font-mono text-2xl">
                {{ formatExact(totalRemaining, locale) }}
                <DxIcon
                  name="resources/nova-crystal"
                  :size="18"
                  class="text-nova"
                />
              </dd>
            </div>
            <div>
              <dt class="text-[10px] font-semibold uppercase tracking-[0.14em] text-ink-muted">
                {{ $t('shop.grandTotal') }}
              </dt>
              <dd class="flex items-center gap-1.5 font-mono text-2xl text-ink-muted">
                {{ formatExact(grandTotal, locale) }}
                <DxIcon
                  name="resources/nova-crystal"
                  :size="18"
                  class="text-nova"
                />
              </dd>
            </div>
          </dl>
        </div>
      </PageBanner>

      <p class="dx-alert dx-alert--warning border-0 text-[0.8125rem]">
        <DxIcon
          name="status/warning"
          :size="17"
          class="mt-px shrink-0"
        />
        <span>{{ $t('shop.incomplete') }}</span>
      </p>

      <!-- L'ordre d'achat est la question n°1 des joueurs : on la traite avant le catalogue. -->
      <section class="panel p-4 sm:p-5">
        <h2 class="mb-3 text-sm font-semibold uppercase tracking-[0.14em] text-ink-muted">
          {{ $t('shop.recommendedOrder') }}
        </h2>
        <ol class="flex flex-wrap items-center gap-2 text-sm">
          <li
            v-for="(item, i) in recommended"
            :key="item.id"
            class="flex items-center gap-2"
          >
            <span class="flex items-center gap-2 rounded-md border border-edge-soft bg-panel-raised px-2.5 py-1.5">
              <DxIcon
                :name="iconOf(item.id)"
                :size="16"
                class="text-accent"
              />
              {{ itemName(item) }}
            </span>
            <DxIcon
              v-if="i < recommended.length - 1"
              name="actions/arrow-right"
              :size="14"
              class="text-ink-muted"
            />
          </li>
        </ol>
      </section>

      <section
        v-for="section in upgradeSections"
        :key="section.id"
        class="flex flex-col gap-3"
      >
        <h2 class="text-lg uppercase tracking-wide">
          {{ $t(`shop.category.${section.id}`) }}
        </h2>

        <ul class="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          <li
            v-for="item in section.items"
            :key="item.id"
            class="dx-shop-card"
          >
            <span class="dx-shop-card__icon">
              <DxIcon
                :name="iconOf(item.id)"
                :size="30"
              />
            </span>

            <div class="min-w-0">
              <div class="flex flex-wrap items-start justify-between gap-2">
                <h3 class="text-base">
                  {{ itemName(item) }}
                  <InfoPop
                    v-if="item.confidence !== 'confirmed'"
                    :content="itemNote(item) || $t(`shop.confidence.${item.confidence}`)"
                    class="align-super"
                  />
                </h3>
                <span
                  v-if="item.oneTime"
                  class="dx-badge dx-badge--epic"
                >{{ $t('shop.oneTime') }}</span>
              </div>

              <p class="text-xs text-ink-muted">
                {{ itemEffect(item) || $t('droid.noData') }}
              </p>

              <p
                v-if="!item.costs.length"
                class="mt-3 text-sm text-ink-muted"
              >
                {{ $t('shop.unknownCost') }}
              </p>

              <div
                v-else
                class="mt-3 flex flex-wrap items-center justify-between gap-3"
              >
                <div class="dx-stepper">
                  <button
                    type="button"
                    :disabled="level(item.id) === 0"
                    :aria-label="`−1 ${itemName(item)}`"
                    @click="store.setShopLevel(item.id, level(item.id) - 1)"
                  >
                    −
                  </button>
                  <output>{{ level(item.id) }} / {{ item.costs.length }}</output>
                  <button
                    type="button"
                    :disabled="level(item.id) >= item.costs.length"
                    :aria-label="`+1 ${itemName(item)}`"
                    @click="store.setShopLevel(item.id, level(item.id) + 1)"
                  >
                    +
                  </button>
                </div>

                <p class="text-right">
                  <template v-if="nextCost(item) !== null">
                    <span
                      class="flex items-center gap-1.5 font-mono"
                      :class="nextCost(item)! <= store.novaCrystals ? 'text-valid' : 'text-nova'"
                    >
                      <DxIcon
                        name="resources/nova-crystal"
                        :size="15"
                      />
                      {{ formatExact(nextCost(item), locale) }}
                    </span>
                    <span class="text-[11px] text-ink-muted">
                      {{ $t('shop.remaining') }} : {{ formatExact(remainingCost(item), locale) }}
                    </span>
                  </template>
                  <span
                    v-else
                    class="text-xs text-valid"
                  >{{ $t('shop.maxed') }}</span>
                </p>
              </div>
            </div>
          </li>
        </ul>
      </section>

      <ul class="grid gap-3 md:grid-cols-3">
        <li
          v-for="n in notes"
          :key="n.key"
          class="panel flex items-start gap-3 p-4 text-xs"
        >
          <DxIcon
            :name="n.icon"
            :size="20"
            class="mt-0.5 shrink-0"
            :class="n.tone"
          />
          <span class="text-ink-muted">{{ $t(n.key) }}</span>
        </li>
      </ul>

      <p class="text-xs text-ink-muted">
        {{ gameText('novaShop.note') }}
      </p>
    </div>

    <aside class="flex flex-col gap-4">
      <section class="panel p-4">
        <h2 class="mb-3 text-base uppercase tracking-wide">
          {{ $t('shop.category.iconic') }}
        </h2>

        <ul class="flex flex-col gap-1">
          <li
            v-for="item in iconics"
            :key="item.id"
            class="flex items-center gap-3 rounded-md p-2 transition-colors hover:bg-panel-raised"
          >
            <DroidImage
              v-if="item.droidSlug && droidBySlug[item.droidSlug]"
              :droid="droidBySlug[item.droidSlug]!"
              tier="DEFAULT"
              size="sm"
            />
            <div class="min-w-0 flex-1">
              <p class="truncate font-display font-semibold">
                {{ itemName(item) }}
              </p>
              <p class="truncate text-[11px] text-ink-muted">
                {{ $t('shop.redeemable') }}
              </p>
            </div>
            <span
              v-if="item.costs.length"
              class="flex shrink-0 items-center gap-1 font-mono text-sm text-nova"
            >
              <DxIcon
                name="resources/nova-crystal"
                :size="14"
              />
              {{ item.costs[0] }}
            </span>
            <span
              v-else
              class="shrink-0 text-[10px] text-ink-muted"
            >{{ $t('shop.unknownCost') }}</span>
          </li>
        </ul>

        <NuxtLink
          :to="localePath('/')"
          class="dx-button dx-button--secondary dx-button--block mt-3"
        >
          {{ $t('shop.seeAllDroids') }}
          <DxIcon
            name="actions/arrow-right"
            :size="16"
          />
        </NuxtLink>
      </section>
    </aside>
  </div>
</template>
