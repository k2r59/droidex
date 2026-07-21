<script setup lang="ts">
import type { Droid, Tier } from '~~/shared/types/droid'

/**
 * Répond à « j'ai N crédits, qu'est-ce que j'achète ? ».
 *
 * On classe par rentabilité — revenu par seconde obtenu pour un crédit dépensé — et non
 * par revenu brut : le droid le plus cher est presque toujours celui qui rapporte le plus,
 * ce qui ne dit rien d'utile. Le ratio, lui, désigne le meilleur achat à budget donné.
 *
 * Les paliers déjà satisfaits sont exclus : posséder un Diamant rend l'achat d'un Or inutile.
 */
const store = useCollectionStore()
const { locale } = useI18n()
const localePath = useLocalePath()

type Candidate = {
  droid: Droid
  tier: Tier
  cost: number
  income: number
  /** Revenu par seconde et par crédit dépensé. */
  ratio: number
  /** Revenu supplémentaire par rapport au palier déjà possédé. */
  gain: number
}

const budget = useHydratedStorage<number | null>('droidex:budget', null)

const candidates = computed<Candidate[]>(() => {
  const out: Candidate[] = []

  for (const droid of store.droids) {
    // Les Emblématiques rapportent un pourcentage du total : leur rentabilité ne se
    // compare pas à celle d'un revenu fixe.
    if (droid.percentIncome) continue

    const ownedIncome = (() => {
      const t = store.entry(droid.slug).tier
      return t ? (droid.tiers[t]?.income ?? 0) : 0
    })()

    for (const [tier, stats] of Object.entries(droid.tiers) as [Tier, typeof droid.tiers[Tier]][]) {
      if (!stats?.cost || !stats.income) continue
      if (store.satisfies(droid.slug, tier)) continue

      const gain = stats.income - ownedIncome
      if (gain <= 0) continue

      out.push({
        droid,
        tier,
        cost: stats.cost,
        income: stats.income,
        gain,
        ratio: gain / stats.cost,
      })
    }
  }

  return out.sort((a, b) => b.ratio - a.ratio)
})

/** Ce que le joueur peut réellement s'offrir, s'il a saisi un budget. */
const affordable = computed(() =>
  budget.value ? candidates.value.filter((c) => c.cost <= budget.value!) : candidates.value,
)

const shown = computed(() => affordable.value.slice(0, 8))

/** Temps d'amortissement : combien de secondes pour rembourser l'achat. */
const payback = (c: Candidate) => c.cost / c.gain

function formatPayback(seconds: number) {
  if (seconds < 60) return `${Math.round(seconds)} s`
  if (seconds < 3600) return `${Math.round(seconds / 60)} min`
  if (seconds < 86400) return `${Math.round(seconds / 3600)} h`
  return `${Math.round(seconds / 86400)} j`
}
</script>

<template>
  <section class="rounded-card border border-edge bg-panel p-6">
    <div class="mb-3 flex flex-wrap items-center justify-between gap-3">
      <div>
        <h2 class="font-semibold">{{ $t('advisor.title') }}</h2>
        <p class="text-xs text-ink-muted">{{ $t('advisor.hint') }}</p>
      </div>

      <label class="flex items-center gap-2 text-sm">
        <span class="text-xs text-ink-muted">{{ $t('advisor.budget') }}</span>
        <input
          v-model.number="budget"
          type="number"
          min="0"
          :placeholder="$t('advisor.noBudget')"
          class="w-32 rounded-lg border border-edge bg-panel-raised px-2 py-1.5 text-right font-mono tabular-nums focus:border-iconic focus:outline-none"
        >
      </label>
    </div>

    <p v-if="!shown.length" class="py-4 text-center text-sm text-ink-muted">
      {{ budget ? $t('advisor.nothingAffordable') : $t('advisor.allOwned') }}
    </p>

    <ol v-else class="flex flex-col gap-1.5">
      <li
        v-for="(c, i) in shown"
        :key="`${c.droid.slug}-${c.tier}`"
        class="flex items-center gap-3 rounded-lg bg-panel-raised p-2"
      >
        <span class="w-4 shrink-0 text-center text-xs text-ink-muted">{{ i + 1 }}</span>

        <DroidImage :droid="c.droid" :tier="c.tier" size="sm" />

        <div class="min-w-0 flex-1">
          <NuxtLink
            :to="localePath(`/droids/${c.droid.slug}`)"
            class="block truncate text-sm font-medium hover:underline"
          >
            {{ c.droid.name }}
          </NuxtLink>
          <p class="text-xs text-ink-muted">{{ $t(`tier.${c.tier}`) }}</p>
        </div>

        <div class="text-right text-xs">
          <p class="font-mono tabular-nums text-valid">
            +{{ formatIncome(c.gain, locale) }}
          </p>
          <p class="font-mono tabular-nums text-ink-muted">
            {{ formatNumber(c.cost, locale) }}
          </p>
        </div>

        <div class="hidden w-20 text-right sm:block">
          <p class="text-xs text-ink-muted">{{ $t('advisor.payback') }}</p>
          <p class="font-mono text-xs tabular-nums">{{ formatPayback(payback(c)) }}</p>
        </div>
      </li>
    </ol>
  </section>
</template>
