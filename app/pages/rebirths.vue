<script setup lang="ts">
import rebirthData from '~/data/rebirths.json'
import type { Tier } from '~~/shared/types/droid'

const store = useCollectionStore()
const { t, locale } = useI18n()

useSeoMeta({
  title: () => t('rebirth.title'),
  description: () => t('rebirth.cycleHint'),
})

type Requirement = { slug: string, tier: Tier | null }
type Level = { level: number, credits: number, droids: Requirement[], sourceUnique?: boolean, identiqueAuxCycles?: number[] }

const cycles = rebirthData.cycles as Record<string, Level[]>
const levels = computed<Level[]>(() => cycles[String(store.cycle)] ?? cycles['1']!)

/** Cycle correspondant à la progression réelle, pour le distinguer d'un cycle simplement consulté. */
const realCycle = computed(() => (store.superRebirth % 4) + 1)

const droidBySlug = computed(() => Object.fromEntries(store.droids.map((d) => [d.slug, d])))

/**
 * Clé d'une exigence, propre à la vue Renaissances et **indépendante de la collection**.
 * On y met le cycle affiché, le niveau, le droid et le palier : chaque exigence se coche
 * pour elle-même, sans rien changer au Droidex.
 */
function reqKey(level: number, req: Requirement): string {
  return `${store.cycle}:${level}:${req.slug}:${req.tier ?? 'DEFAULT'}`
}

/** Une exigence est « faite » quand elle a été cochée dans le suivi de renaissance. */
function met(level: number, req: Requirement): boolean {
  return store.isRebirthChecked(reqKey(level, req))
}

const nextLevel = computed(() => levels.value.find((l) => l.level === store.rebirth + 1) ?? null)
const missingCount = computed(() =>
  nextLevel.value ? nextLevel.value.droids.filter((r) => !met(nextLevel.value!.level, r)).length : 0,
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

/** « BONUS ACTIF » → ['BONUS', 'ACTIF'], pour teinter les deux mots différemment. */
const bonusLabel = computed<[string, string]>(() => {
  const words = t('rebirth.activeBonus').split(' ')
  return [words[0] ?? '', words.slice(1).join(' ')]
})

/**
 * Coche ou décoche l'exigence depuis la carte — dans le suivi de renaissance uniquement.
 *
 * Volontairement séparé de la collection : marquer une exigence « faite » ne consigne pas le
 * droid au Droidex et n'affecte pas la complétion. Les deux suivis sont indépendants.
 */
function toggleRequirement(level: number, req: Requirement) {
  store.toggleRebirthCheck(reqKey(level, req))
}

function setLevel(value: number) {
  store.setRebirth(Math.min(rebirthData.maxRebirth, Math.max(0, value)))
}

/**
 * Palier ouvert dans la fenêtre de détail. Cliquer une tuile n'change plus directement la
 * progression : on montre d'abord ce que le palier demande, et le joueur décide ensuite —
 * un clic de survol ne doit pas réécrire sa progression sans qu'il ait rien vu.
 */
const selected = ref<Level | null>(null)

/** Cristaux Nova accordés à ce palier, ou `null` si la table ne le documente pas. */
const selectedCrystals = computed(() =>
  selected.value
    ? (rebirthData.novaByRebirth as Record<string, number>)[String(selected.value.level)] ?? null
    : null,
)

const selectedMissing = computed(() =>
  selected.value ? selected.value.droids.filter((r) => !met(r)).length : 0,
)

function closeLevel() {
  selected.value = null
}

/**
 * Confine le focus dans la fenêtre et le rend au déclencheur à la fermeture — sans quoi
 * `aria-modal` ci-dessous promettrait un isolement que rien ne fournit.
 */
const dialogRef = useTemplateRef<HTMLElement>('dialogRef')
useFocusTrap(dialogRef, computed(() => selected.value !== null))

/** Échap ferme la fenêtre : c'est le réflexe attendu, et le seul si la souris est loin. */
onKeyStroke('Escape', () => { if (selected.value) closeLevel() })

/**
 * Un palier est « verrouillé » quand ses exigences ne sont pas publiées — ce qui est le
 * cas de presque tout le cycle 2 et du cycle 3. Le cadenas dit donc « donnée manquante »
 * et non « progression insuffisante » : mentir sur ce point induirait le joueur en erreur.
 */
const shown = computed(() =>
  levels.value.map((l) => ({
    ...l,
    locked: l.droids.length === 0,
    done: l.level <= store.rebirth,
    current: l.level === store.rebirth + 1,
    superUnlock: l.level === rebirthData.superRebirthUnlock.rebirth,
    // Cristaux Nova accordés à ce palier (à partir du 12), ou `null` si aucun.
    crystals: (rebirthData.novaByRebirth as Record<string, number>)[String(l.level)] ?? null,
  })),
)
</script>

<template>
  <!-- § 6 de la spécification : contenu principal + rail de 340 px. -->
  <div class="layout-2-columns">
    <div class="flex min-w-0 flex-col gap-5">
      <PageBanner
        name="renaissances"
        min-height="17rem"
      >
        <div>
          <h1 class="text-2xl uppercase tracking-tight sm:text-4xl lg:text-5xl">
            {{ $t('rebirth.title') }}
          </h1>
          <p class="mt-1 max-w-md text-sm text-ink-muted">
            {{ $t('rebirth.tagline') }}
          </p>
        </div>

        <!-- Les trois chiffres qui décident d'une session : où j'en suis, où je me situe, ce que ça rapporte. -->
        <!--
          Trois colonnes séparées par un filet vertical, comme la maquette. La barre
          s'arrête avant les droids de l'illustration : au-delà, le texte passerait sur
          le corps clair de R2-D2.
        -->
        <!--
          Résumé compact sur mobile (<sm) : le tableau de bord du CYCLE en cours — palier,
          bonus, réglage et sélecteur de cycle réunis, sans l'anneau ni les longues étiquettes.
          Il remplace la grille empilée pour que les droïds requis remontent sans scroller.
          La grille détaillée reprend la main dès `sm`.
        -->
        <div class="rounded-card border border-edge-soft bg-void/55 p-3.5 backdrop-blur sm:hidden">
          <div class="flex items-start justify-between gap-3">
            <div class="min-w-0">
              <p class="text-[10px] font-semibold uppercase tracking-[0.14em] text-ink-muted">
                {{ $t('rebirth.yourProgress') }}
              </p>
              <p class="font-mono text-2xl font-bold leading-tight">
                <span class="text-accent">{{ store.rebirth }}</span><span class="text-ink-strong">/{{ rebirthData.maxRebirth }}</span>
                <span class="ml-1 align-middle text-xs text-ink-muted">· {{ progress }}%</span>
              </p>
            </div>
            <div class="shrink-0 text-right">
              <p class="text-[10px] font-semibold uppercase tracking-[0.14em]">
                <span class="text-ink-strong">{{ bonusLabel[0] }}</span>
                <span class="ml-1 text-ink-muted">{{ bonusLabel[1] }}</span>
              </p>
              <p class="font-mono text-xl font-bold text-accent">
                +{{ creditMultiplier }}%
              </p>
            </div>
          </div>
          <div class="mt-3 flex items-center justify-between gap-2">
            <div class="dx-stepper">
              <button
                type="button"
                :aria-label="`−1 ${$t('rebirth.title')}`"
                @click="setLevel(store.rebirth - 1)"
              >
                −
              </button>
              <output>{{ store.rebirth }}</output>
              <button
                type="button"
                :aria-label="`+1 ${$t('rebirth.title')}`"
                @click="setLevel(store.rebirth + 1)"
              >
                +
              </button>
            </div>
            <!--
              Sélecteur de cycle réduit à l'essentiel : « CYCLE 1 »… « CYCLE 4 », rien
              d'autre. Dimensionné à son contenu (`w-auto`) pour laisser toute la place au
              stepper. L'indicateur de cycle courant reste sur la grille desktop, plus large.
            -->
            <label class="relative inline-flex shrink-0 items-center">
              <span class="sr-only">{{ $t('rebirth.chooseCycle') }}</span>
              <select
                :value="store.cycle"
                class="h-10 w-auto cursor-pointer appearance-none rounded-md border border-edge-soft bg-void/60 pl-2.5 pr-6 text-xs font-semibold uppercase tracking-wide text-ink transition-colors focus:border-accent focus:outline-none"
                @change="store.setCycle(Number(($event.target as HTMLSelectElement).value))"
              >
                <option
                  v-for="n in 4"
                  :key="n"
                  :value="n"
                >
                  {{ $t('rebirth.cycle', { number: n }).toUpperCase() }}
                </option>
              </select>
              <DxIcon
                name="actions/chevron-down"
                :size="13"
                class="pointer-events-none absolute right-1.5 text-ink-muted"
              />
            </label>
          </div>
        </div>

        <div class="hidden max-w-4xl rounded-card border border-edge-soft bg-void/55 backdrop-blur sm:grid sm:grid-cols-3 sm:divide-x sm:divide-edge">
          <div class="flex items-center gap-5 p-4">
            <div class="min-w-0">
              <p class="whitespace-nowrap text-[10px] font-semibold uppercase tracking-[0.14em] text-ink-muted">
                {{ $t('rebirth.yourProgress') }}
              </p>
              <p class="mt-1 whitespace-nowrap font-mono text-3xl font-bold">
                <span class="text-accent">{{ store.rebirth }}</span>
                <span class="text-ink-strong">&#32;/&#32;{{ rebirthData.maxRebirth }}</span>
              </p>
              <p class="whitespace-nowrap text-xs text-ink-muted">
                {{ $t('rebirth.tiersCompleted') }}
              </p>
            </div>

            <div class="relative grid size-24 shrink-0 place-items-center">
              <svg
                class="absolute inset-0 -rotate-90"
                viewBox="0 0 100 100"
              >
                <!-- Disque plein : il détache le pourcentage de l'illustration. -->
                <circle
                  cx="50"
                  cy="50"
                  :r="RADIUS - 5"
                  class="fill-void/60"
                />
                <circle
                  cx="50"
                  cy="50"
                  :r="RADIUS"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="8"
                  class="text-edge/80"
                />
                <circle
                  cx="50"
                  cy="50"
                  :r="RADIUS"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="8"
                  stroke-linecap="round"
                  class="text-accent drop-shadow-[0_0_6px_rgba(37,215,255,0.6)] transition-[stroke-dashoffset] duration-700"
                  :stroke-dasharray="CIRCUMFERENCE"
                  :stroke-dashoffset="CIRCUMFERENCE * (1 - progress / 100)"
                />
              </svg>
              <span class="relative font-mono text-xl font-bold text-ink-strong">{{ progress }}%</span>
            </div>
          </div>

          <div class="p-4">
            <p class="text-[10px] font-semibold uppercase tracking-[0.14em] text-ink-muted">
              {{ $t('rebirth.setMyTier') }}
            </p>
            <div class="dx-stepper mt-2">
              <button
                type="button"
                :aria-label="`−1 ${$t('rebirth.title')}`"
                @click="setLevel(store.rebirth - 1)"
              >
                −
              </button>
              <output>{{ store.rebirth }}</output>
              <button
                type="button"
                :aria-label="`+1 ${$t('rebirth.title')}`"
                @click="setLevel(store.rebirth + 1)"
              >
                +
              </button>
            </div>
          </div>

          <div class="p-4">
            <!--
              Deux tons sur le libellé, comme la maquette. L'écart est porté par une marge
              et non par une espace : Vue condense les blancs de bord dans les templates,
              ce qui collait les deux mots.
            -->
            <p class="whitespace-nowrap text-[10px] font-semibold uppercase tracking-[0.14em]">
              <span class="text-ink-strong">{{ bonusLabel[0] }}</span>
              <span class="ml-1 text-ink-muted">{{ bonusLabel[1] }}</span>
            </p>
            <p class="mt-1 font-mono text-3xl font-bold text-accent">
              +{{ creditMultiplier }}%
            </p>
            <div class="mt-1 flex flex-wrap items-center gap-2">
              <span class="text-xs text-ink-muted">{{ $t('rebirth.creditsPerTier') }}</span>
              <!--
                Sélecteur de cycle. Il ne modifie que le cycle affiché, pas le nombre de
                Super Rebirths : consulter les exigences d'un autre cycle ne doit pas
                réécrire la progression. Le cycle correspondant à la progression réelle
                (`(superRebirth % 4) + 1`) est repéré d'une pastille dans la liste.
              -->
              <label class="relative inline-flex items-center">
                <span class="sr-only">{{ $t('rebirth.chooseCycle') }}</span>
                <select
                  :value="store.cycle"
                  class="cursor-pointer appearance-none rounded-md border border-edge-soft bg-void/60 py-0.5 pl-2 pr-7 text-xs text-ink transition-colors hover:border-accent/60 focus:border-accent focus:outline-none"
                  @change="store.setCycle(Number(($event.target as HTMLSelectElement).value))"
                >
                  <option
                    v-for="n in 4"
                    :key="n"
                    :value="n"
                  >
                    {{ $t('rebirth.cycle', { number: n }) }}{{ n === realCycle ? ` · ${$t('rebirth.currentCycle')}` : '' }}
                  </option>
                </select>
                <DxIcon
                  name="actions/chevron-down"
                  :size="13"
                  class="pointer-events-none absolute right-2 text-ink-muted"
                />
              </label>
            </div>
          </div>
        </div>
      </PageBanner>

      <!-- Prochaine renaissance : c'est l'écran qu'on ouvre en jouant. -->
      <section
        v-if="nextLevel"
        class="panel p-4 sm:p-5"
        :class="isReady && 'border-valid/60'"
      >
        <div class="mb-3 flex flex-wrap items-center justify-between gap-x-3 gap-y-0.5 sm:mb-4 sm:gap-y-3">
          <h2 class="flex items-center gap-2 text-lg uppercase tracking-wide">
            <DxIcon
              name="resources/star"
              :size="20"
              class="text-accent"
            />
            <span>{{ $t('rebirth.next') }}</span>
            <span class="grid size-7 shrink-0 place-items-center rounded-full border border-accent/50 bg-accent/10 font-mono text-sm text-accent">{{ nextLevel.level }}</span>
          </h2>
          <p class="text-xs uppercase text-nova sm:text-sm">
            <span class="font-mono text-base font-bold sm:text-lg">{{ formatNumber(nextLevel.credits, locale) }}</span>
            <span class="ml-1">{{ $t('rebirth.creditsRequired') }}</span>
          </p>
        </div>

        <p
          v-if="!nextLevel.droids.length"
          class="text-sm text-ink-muted"
        >
          {{ $t('rebirth.undocumented') }}
        </p>

        <template v-else>
          <ul class="grid gap-3 sm:grid-cols-3">
            <li
              v-for="req in nextLevel.droids"
              :key="`${req.slug}-${req.tier}`"
            >
              <button
                type="button"
                class="rebirth-req flex min-h-[4.5rem] w-full items-center gap-3 rounded-lg border px-4 py-3 text-left transition-colors hover:border-accent sm:min-h-[5.5rem] sm:gap-4 sm:px-5 sm:py-4"
                :class="met(nextLevel.level, req) ? 'border-valid/60' : 'border-edge-soft'"
                :aria-pressed="met(nextLevel.level, req)"
                @click="toggleRequirement(nextLevel.level, req)"
              >
                <!-- Illustration jamais désaturée : la maquette montre les droids en couleur,
                   qu'ils soient déjà possédés ou non. Le cercle vide porte l'information. -->
                <DroidImage
                  v-if="droidBySlug[req.slug]"
                  :droid="droidBySlug[req.slug]!"
                  :tier="req.tier ?? 'DEFAULT'"
                  size="sm"
                />
                <div class="min-w-0 flex-1">
                  <p class="truncate font-display text-base font-bold">
                    {{ droidBySlug[req.slug]?.name ?? req.slug }}
                  </p>
                  <!--
                    Rareté du droid ET palier requis, tous deux teintés. La rareté évite de
                    prendre un Mythique au palier de base pour un droid « Typique » (les deux
                    partageaient ce mot en français) ; le palier reste l'exigence réelle.
                  -->
                  <div class="mt-1.5 flex flex-wrap items-center gap-1.5 sm:flex-col sm:items-start sm:gap-1">
                    <RarityBadge
                      v-if="droidBySlug[req.slug]"
                      :rarity="droidBySlug[req.slug]!.rarity"
                    />
                    <TierBadge :tier="req.tier ?? 'DEFAULT'" />
                  </div>
                </div>
                <!--
                Exigence non satisfaite : un cercle vide, comme la maquette. Une coche
                grisée se lit trop facilement comme « déjà validé ».
              -->
                <DxIcon
                  v-if="met(nextLevel.level, req)"
                  name="status/success"
                  :size="20"
                  class="shrink-0 text-valid"
                />
                <span
                  v-else
                  class="size-5 shrink-0 rounded-full border-2 border-edge-strong"
                  aria-hidden="true"
                />
              </button>
            </li>
          </ul>

          <p
            class="dx-alert mt-4 border-0 text-[0.8125rem]"
            :class="isReady ? 'dx-alert--success' : 'dx-alert--info'"
          >
            <DxIcon
              :name="isReady ? 'status/success' : 'status/info'"
              :size="17"
              class="mt-px shrink-0"
            />
            <span>{{ isReady ? $t('rebirth.ready') : $t('rebirth.missing', missingCount, { named: { count: missingCount } }) }}</span>
          </p>
        </template>
      </section>

      <!--
        Rappel placé après les droïds requis : c'est en les cochant qu'on se demande si les
        posséder suffit. Sans contour et en petit corps — un rappel, pas une alerte bloquante.
      -->
      <p class="dx-alert dx-alert--warning border-0 text-[0.8125rem]">
        <DxIcon
          name="status/warning"
          :size="17"
          class="mt-px shrink-0"
        />
        <span>{{ $t('rebirth.placementWarning') }}</span>
      </p>

      <!-- Table complète : utile pour planifier plusieurs paliers à l'avance. -->
      <section class="panel p-4 sm:p-5">
        <h2 class="mb-4 text-lg uppercase tracking-wide">
          {{ $t('rebirth.allTiers') }}
        </h2>

        <ul class="grid grid-cols-2 gap-2 sm:grid-cols-4 xl:grid-cols-6 2xl:grid-cols-8">
          <li
            v-for="lvl in shown"
            :key="lvl.level"
          >
            <!-- Cliquer une tuile ouvre le détail du palier ; la progression se règle depuis là. -->
            <button
              type="button"
              class="flex h-full w-full flex-col gap-1.5 rounded-md border p-3 transition-colors hover:border-accent"
              :class="[
                lvl.current ? 'border-accent bg-accent/10' : 'rebirth-tile border-edge-soft',
                lvl.locked && 'opacity-45',
              ]"
              :aria-current="lvl.current ? 'step' : undefined"
              :aria-haspopup="'dialog'"
              @click="selected = lvl"
            >
              <div class="flex items-center justify-between gap-1">
                <!-- Numéro dans une pastille sombre, centré, comme la maquette. -->
                <span
                  class="mx-auto rounded-full bg-void/55 px-2.5 py-0.5 font-mono text-sm"
                  :class="lvl.level <= 11 ? 'text-accent' : 'text-valid'"
                >{{ lvl.level }}</span>
                <DxIcon
                  v-if="lvl.superUnlock"
                  :title="$t('superRebirth.title')"
                  name="resources/star"
                  :size="14"
                  class="text-warn"
                />
                <DxIcon
                  v-else-if="lvl.locked"
                  :title="$t('rebirth.tierLocked')"
                  name="status/locked"
                  :size="14"
                  class="text-ink-muted"
                />
              </div>

              <p class="flex items-center gap-1.5">
                <DxIcon
                  name="resources/credit-bar"
                  :size="14"
                  class="shrink-0"
                />
                <span class="font-mono text-sm">{{ formatNumber(lvl.credits, locale) }}</span>
                <InfoPop
                  v-if="lvl.identiqueAuxCycles"
                  :content="$t('rebirth.sameAsCycles', { cycles: lvl.identiqueAuxCycles.join(', ') })"
                />
              </p>

              <!--
                Cristaux Nova gagnés au palier (12+). La ligne est toujours présente, mais
                masquée (`invisible`, l'espace est conservé) quand le palier n'en donne pas :
                toutes les tuiles gardent la même hauteur, sans trous entre voisines.
              -->
              <p
                class="mt-1 flex items-center gap-1.5 text-nova"
                :class="{ invisible: !lvl.crystals }"
              >
                <DxIcon
                  name="resources/nova-crystal"
                  :size="14"
                  class="shrink-0"
                />
                <span class="font-mono text-sm">+{{ formatNumber(lvl.crystals ?? 0, locale) }}</span>
              </p>
            </button>
          </li>
        </ul>

        <!--
          Provenance dite une fois pour toute la grille, sous les tuiles : elle vaut pour
          l'ensemble des exigences des quatre cycles, et un avertissement répété cent douze
          fois cesse d'être lu.
        -->
        <p class="dx-alert dx-alert--warning mt-3 border-0 text-[0.8125rem]">
          <DxIcon
            name="status/info"
            :size="17"
            class="mt-px shrink-0"
          />
          <span>{{ $t('rebirth.singleSource') }}</span>
        </p>
      </section>
    </div>

    <SuperRebirthPanel
      :unlocked="superUnlocked"
      :crystals-now="crystalsNow"
      :nova-by-rebirth="rebirthData.novaByRebirth"
      :unlock-rebirth="rebirthData.superRebirthUnlock.rebirth"
    />

    <!--
      Détail d'un palier. Téléporté au `body` : la page est en grille à deux colonnes et
      un overlay laissé dans le flux hériterait de ses contraintes de largeur.
    -->
    <Teleport to="body">
      <div
        v-if="selected"
        ref="dialogRef"
        tabindex="-1"
        class="fixed inset-0 z-50 grid place-items-center overflow-y-auto p-4 focus:outline-none"
        role="dialog"
        aria-modal="true"
        :aria-label="$t('rebirth.levelShort', { level: selected.level })"
        @click.self="closeLevel"
      >
        <!-- Le flou porte sur tout ce qui est dessous, pas seulement un assombrissement. -->
        <div
          class="absolute inset-0 bg-void-deep/70 backdrop-blur-md"
          @click="closeLevel"
        />

        <section class="dx-modal-panel panel relative z-10 w-full max-w-xl p-4 sm:p-6">
          <div class="mb-5 flex items-start justify-between gap-4">
            <div>
              <h2 class="flex items-center gap-2 text-xl uppercase tracking-wide">
                <DxIcon
                  name="resources/star"
                  :size="20"
                  class="text-accent"
                />
                {{ $t('rebirth.levelShort', { level: selected.level }) }}
              </h2>
              <p class="mt-1 flex items-center gap-1.5">
                <DxIcon
                  name="resources/credit-bar"
                  :size="15"
                  class="shrink-0"
                />
                <span class="font-mono font-bold text-nova">{{ formatNumber(selected.credits, locale) }}</span>
                <span class="text-sm text-ink-muted">{{ $t('rebirth.creditsRequired') }}</span>
              </p>
            </div>

            <button
              type="button"
              class="dx-icon-button shrink-0"
              :aria-label="$t('common.close')"
              @click="closeLevel"
            >
              <DxIcon
                name="actions/close"
                :size="18"
              />
            </button>
          </div>

          <!-- Repères propres à ce palier : récompense Nova et déblocage du Super Rebirth. -->
          <ul class="mb-5 flex flex-wrap gap-2">
            <li
              v-if="selectedCrystals !== null"
              class="dx-badge dx-badge--emblematic"
            >
              ✦ {{ $t('superRebirth.crystals', selectedCrystals, { named: { count: selectedCrystals } }) }}
            </li>
            <li
              v-if="selected.level === rebirthData.superRebirthUnlock.rebirth"
              class="dx-badge dx-badge--legendary"
            >
              {{ $t('superRebirth.title') }}
            </li>
          </ul>

          <p
            v-if="!selected.droids.length"
            class="dx-alert dx-alert--warning border-0 text-[0.8125rem]"
          >
            <DxIcon
              name="status/locked"
              :size="17"
              class="mt-px shrink-0"
            />
            <span>{{ $t('rebirth.undocumented') }}</span>
          </p>

          <template v-else>
            <!--
              Deux réserves distinctes, et il faut les distinguer : la provenance vaut pour
              toutes les exigences, la duplication ne concerne que certains paliers.
            -->
            <p
              v-if="selected.identiqueAuxCycles"
              class="dx-alert dx-alert--warning mb-3 border-0 text-[0.8125rem]"
            >
              <DxIcon
                name="status/warning"
                :size="17"
                class="mt-px shrink-0"
              />
              <span>{{ $t('rebirth.sameAsCycles', { cycles: selected.identiqueAuxCycles.join(', ') }) }}</span>
            </p>

            <p class="mb-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-ink-muted">
              {{ $t('rebirth.droidsRequired') }}
            </p>

            <ul class="flex flex-col gap-2">
              <li
                v-for="req in selected.droids"
                :key="`${req.slug}-${req.tier}`"
              >
                <button
                  type="button"
                  class="rebirth-req flex w-full items-center gap-4 rounded-lg border px-4 py-3 text-left transition-colors hover:border-accent"
                  :class="met(selected.level, req) ? 'border-valid/60' : 'border-edge-soft'"
                  :aria-pressed="met(selected.level, req)"
                  @click="toggleRequirement(selected.level, req)"
                >
                  <DroidImage
                    v-if="droidBySlug[req.slug]"
                    :droid="droidBySlug[req.slug]!"
                    :tier="req.tier ?? 'DEFAULT'"
                    size="sm"
                  />
                  <div class="min-w-0 flex-1">
                    <p class="truncate font-display font-bold">
                      {{ droidBySlug[req.slug]?.name ?? req.slug }}
                    </p>
                    <div class="mt-1 flex flex-col items-start gap-1">
                      <RarityBadge
                        v-if="droidBySlug[req.slug]"
                        :rarity="droidBySlug[req.slug]!.rarity"
                      />
                      <TierBadge :tier="req.tier ?? 'DEFAULT'" />
                    </div>
                  </div>
                  <DxIcon
                    v-if="met(selected.level, req)"
                    name="status/success"
                    :size="20"
                    class="shrink-0 text-valid"
                  />
                  <span
                    v-else
                    class="size-5 shrink-0 rounded-full border-2 border-edge-strong"
                    aria-hidden="true"
                  />
                </button>
              </li>
            </ul>

            <p
              class="dx-alert mt-4 border-0 text-[0.8125rem]"
              :class="selectedMissing === 0 ? 'dx-alert--success' : 'dx-alert--info'"
            >
              <DxIcon
                :name="selectedMissing === 0 ? 'status/success' : 'status/info'"
                :size="17"
                class="mt-px shrink-0"
              />
              <span>
                {{ selectedMissing === 0
                  ? $t('rebirth.ready')
                  : $t('rebirth.missing', selectedMissing, { named: { count: selectedMissing } }) }}
              </span>
            </p>
          </template>

          <!-- L'action qu'occupait le clic sur la tuile, désormais explicite. -->
          <button
            type="button"
            class="dx-button dx-button--primary dx-button--block mt-5"
            :disabled="selected.level - 1 === store.rebirth"
            @click="setLevel(selected.level - 1); closeLevel()"
          >
            {{ $t('rebirth.setLevel') }}
          </button>
        </section>
      </div>
    </Teleport>
  </div>
</template>
