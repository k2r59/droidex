<script setup lang="ts">
import type { Droid, Tier } from '~~/shared/types/droid'

/**
 * Répond à « j'ai N crédits, qu'est-ce que j'achète ? ».
 *
 * On classe par rentabilité — revenu par seconde obtenu pour un crédit dépensé — et non
 * par revenu brut : le droid le plus cher est presque toujours celui qui rapporte le plus,
 * ce qui ne dit rien d'utile. Le ratio, lui, désigne le meilleur achat à budget donné.
 *
 * ---
 *
 * **Pourquoi seulement le palier de base.**
 *
 * Le jeu a trois monnaies non convertibles (voir `mechanics.json` → `currencies`) :
 * les **crédits** achètent des droids et des renaissances, les **Upgrade Chips** paient
 * les montées de palier, les **Nova** le Nova Shop.
 *
 * Une version précédente classait tous les paliers ensemble en les chiffrant en crédits,
 * et affichait un amortissement en crédits pour un Beskar. C'était faux à trois titres :
 *
 *  1. un palier ne s'achète pas en crédits, il se monte en chips (`chipCosts`) ;
 *  2. le même droid concourait contre lui-même à cinq paliers, alors que ces achats sont
 *     mutuellement exclusifs — le top 8 ne couvrait en réalité que six droids ;
 *  3. le ratio mélangeait un gain incrémental (revenu − revenu déjà possédé) avec un coût
 *     absolu, donc deux référentiels différents.
 *
 * L'advisor ne propose donc que ce que des crédits achètent réellement : le droid de base
 * d'une espèce non encore possédée. Le gain est alors le revenu complet du droid, et le
 * ratio comme l'amortissement sont exprimés dans une seule et même monnaie.
 *
 * Élaguer les paliers règle aussi le cas des paliers dominés : MOUSE Arc-en-ciel coûte
 * 15 200 pour 16/s quand son Beskar coûte le même prix pour 24/s.
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

/**
 * Budget par défaut : 10 000 crédits. Sans plafond, le classement est dominé par des
 * paliers hors de portée en début de partie ; un budget d'entrée donne d'emblée une liste
 * réellement achetable. `null` reste possible et signifie « illimité ».
 */
const DEFAULT_BUDGET = 10_000

const budget = useHydratedStorage<number | null>('droidex:budget', DEFAULT_BUDGET)

/**
 * Saisie du budget en texte plutôt qu'en `<input type="number">`.
 *
 * Les montants du jeu se comptent en centaines de millions : taper « 300000000 » au
 * clavier est pénible et illisible une fois saisi. On accepte donc les suffixes du jeu
 * (« 15k », « 1,2M », « 3.5b »), les espaces et la virgule décimale française, et on
 * réaffiche la valeur formatée dès que le champ perd le focus.
 */
const budgetText = ref('')
const budgetFocused = ref(false)

const SUFFIXES: Record<string, number> = { k: 1e3, m: 1e6, b: 1e9, t: 1e12 }

/** « 1,2M » → 1200000 · « 15k » → 15000 · « 950 » → 950 · vide ou invalide → null */
function parseBudget(raw: string): number | null {
  const s = raw.trim().toLowerCase().replace(/[\s\u00A0\u202F]/g, '').replace(',', '.')
  if (!s) return null
  const m = s.match(/^([\d.]+)([kmbt])?$/)
  if (!m) return null
  const n = Number.parseFloat(m[1]!)
  if (!Number.isFinite(n) || n < 0) return null
  return n * (m[2] ? SUFFIXES[m[2]]! : 1)
}

/** Paliers usuels : un clic vaut mieux qu'une saisie à huit chiffres. */
const PRESETS = [10e3, 100e3, 1e6, 10e6, 100e6]

function applyBudget(value: number | null) {
  budget.value = value
  budgetText.value = value === null ? '' : formatNumber(value, locale.value)
}

function commitBudget() {
  budgetFocused.value = false
  applyBudget(parseBudget(budgetText.value))
}

/** Au focus on repasse en chiffres bruts : plus simple à corriger qu'un texte formaté. */
function focusBudget() {
  budgetFocused.value = true
  budgetText.value = budget.value === null ? '' : String(budget.value)
}

// `budget` est hydraté depuis localStorage après le montage : on resynchronise l'affichage.
watch(budget, (v) => {
  if (!budgetFocused.value) budgetText.value = v === null ? '' : formatNumber(v, locale.value)
}, { immediate: true })

const candidates = computed<Candidate[]>(() => {
  const out: Candidate[] = []

  for (const droid of store.droids) {
    // Les Emblématiques rapportent un pourcentage du total et s'achètent en Nova : leur
    // rentabilité ne se compare pas à celle d'un revenu fixe payé en crédits.
    if (droid.percentIncome) continue

    // Possédé à un palier quelconque : le droid de base n'est plus un achat, la suite
    // relève de la montée de palier, qui se paie en chips.
    if (store.owns(droid.slug)) continue

    const base = droid.tiers.DEFAULT
    if (!base?.cost || !base.income) continue

    out.push({
      droid,
      tier: 'DEFAULT',
      cost: base.cost,
      income: base.income,
      // Rien n'est possédé, donc le gain est le revenu complet du droid.
      gain: base.income,
      ratio: base.income / base.cost,
    })
  }

  return out.sort((a, b) => b.ratio - a.ratio)
})

/**
 * Ce que le joueur peut réellement s'offrir, s'il a saisi un budget.
 *
 * Le test porte sur `null` et non sur la véracité : un budget de 0 est une saisie
 * légitime (« je n'ai plus rien »), qui doit vider la liste et non la laisser entière
 * comme le ferait un `budget.value ? …`.
 */
const affordable = computed(() =>
  budget.value === null ? candidates.value : candidates.value.filter((c) => c.cost <= budget.value!),
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
        <h2 class="font-semibold">
          {{ $t('advisor.title') }}
        </h2>
        <p class="text-xs text-ink-muted">
          {{ $t('advisor.hint') }}
        </p>
      </div>

      <div class="flex flex-col items-end gap-1.5">
        <label class="flex items-center gap-2 text-sm">
          <span class="text-xs text-ink-muted">{{ $t('advisor.budget') }}</span>
          <span
            class="flex items-center gap-2 rounded-lg border border-edge bg-panel-raised px-3 py-1.5 transition-colors focus-within:border-accent"
          >
            <DxIcon
              name="resources/credits"
              :size="15"
              class="shrink-0 text-ink-muted"
            />
            <input
              v-model="budgetText"
              type="text"
              inputmode="decimal"
              :placeholder="$t('advisor.noBudget')"
              class="w-24 bg-transparent text-right font-mono tabular-nums placeholder:text-ink-muted focus:outline-none"
              @focus="focusBudget"
              @blur="commitBudget"
              @keydown.enter="($event.target as HTMLInputElement).blur()"
            >
            <button
              v-if="budget !== null"
              type="button"
              class="shrink-0 text-ink-muted transition-colors hover:text-ink"
              :aria-label="$t('advisor.noBudget')"
              @click="applyBudget(null)"
            >
              <DxIcon
                name="actions/close"
                :size="13"
              />
            </button>
          </span>
        </label>

        <!-- Raccourcis : les montants du jeu sont trop longs pour être tapés à la main. -->
        <div class="flex flex-wrap justify-end gap-1">
          <button
            v-for="p in PRESETS"
            :key="p"
            type="button"
            class="rounded-md border px-2 py-0.5 font-mono text-[0.7rem] tabular-nums transition-colors"
            :class="budget === p
              ? 'border-accent bg-accent/10 text-accent'
              : 'border-edge text-ink-muted hover:border-edge-strong hover:text-ink'"
            @click="applyBudget(p)"
          >
            {{ formatNumber(p, locale) }}
          </button>
        </div>
      </div>
    </div>

    <p class="mb-3 flex items-start gap-2 text-xs text-ink-muted">
      <DxIcon
        name="status/info"
        :size="14"
        class="mt-px shrink-0 text-rare"
      />
      {{ $t('advisor.creditsOnly') }}
    </p>

    <p
      v-if="!shown.length"
      class="py-4 text-center text-sm text-ink-muted"
    >
      {{ budget !== null ? $t('advisor.nothingAffordable') : $t('advisor.allOwned') }}
    </p>

    <ol
      v-else
      class="flex flex-col gap-1.5"
    >
      <li
        v-for="(c, i) in shown"
        :key="`${c.droid.slug}-${c.tier}`"
        class="flex items-center gap-3 rounded-lg bg-panel-raised p-2"
      >
        <span class="w-4 shrink-0 text-center text-xs text-ink-muted">{{ i + 1 }}</span>

        <DroidImage
          :droid="c.droid"
          :tier="c.tier"
          size="sm"
        />

        <div class="min-w-0 flex-1">
          <NuxtLink
            :to="localePath(`/droids/${c.droid.slug}`)"
            class="block truncate text-sm font-medium hover:underline"
          >
            {{ c.droid.name }}
          </NuxtLink>
          <!-- La rareté, et non le palier : celui-ci vaut « Typique » sur toutes les lignes. -->
          <p class="text-xs text-ink-muted">
            {{ $t(`rarity.${c.droid.rarity}`) }}
          </p>
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
          <p class="text-xs text-ink-muted">
            {{ $t('advisor.payback') }}
          </p>
          <p class="font-mono text-xs tabular-nums">
            {{ formatPayback(payback(c)) }}
          </p>
        </div>
      </li>
    </ol>
  </section>
</template>
