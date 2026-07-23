<script setup lang="ts">
/**
 * Les droids Emblématiques, sous deux formes selon la place disponible :
 *
 * - `sidebar` : colonne de droite, à partir de `2xl`.
 * - `strip` : bande horizontale défilante, utilisée en dessous de `2xl` pour que le
 *   contenu ne disparaisse pas purement et simplement sur les écrans plus étroits.
 *
 * Ils méritent un emplacement à part parce qu'ils ne se comparent pas au reste : revenu
 * exprimé en pourcentage du total, palier unique, obtention par événement.
 */
import background from '~/assets/images/backgrounds/sidebar-right.webp'

const props = withDefaults(defineProps<{ variant?: 'sidebar' | 'strip' }>(), {
  variant: 'sidebar',
})

const store = useCollectionStore()
const localePath = useLocalePath()

const iconics = computed(() => store.droids.filter((d) => d.rarity === 'iconic'))

/** Les plus rentables d'abord. La colonne en montre 4, la bande les montre tous. */
const sorted = computed(() =>
  [...iconics.value].sort((a, b) => (b.percentValue ?? 0) - (a.percentValue ?? 0)),
)

const shown = computed(() => (props.variant === 'sidebar' ? sorted.value.slice(0, 4) : sorted.value))

/**
 * Carrousel de la bande horizontale.
 *
 * Le défilement natif fait tout le travail — accroche CSS, inertie tactile, molette —
 * et l'index n'en est qu'une lecture. Piloter la position en JavaScript à la place
 * casserait le geste tactile, qui est précisément l'usage visé ici.
 */
const rail = useTemplateRef<HTMLUListElement>('rail')
const index = ref(0)

/**
 * Le rail déborde-t-il assez pour mériter des commandes ?
 *
 * En dessous d'une carte de débordement, les flèches et les pastilles ne servent à rien
 * et forment du bruit : tout est déjà visible. On les masque alors.
 */
const debordement = ref(0)
const defilable = computed(() => debordement.value > 40)

function mesurer() {
  const el = rail.value
  if (el) debordement.value = el.scrollWidth - el.clientWidth
}

onMounted(() => {
  mesurer()
  useEventListener(window, 'resize', mesurer)
})

function majIndex() {
  const el = rail.value
  if (!el) return
  const carte = el.firstElementChild as HTMLElement | null
  if (!carte) return
  // Largeur d'une carte plus la gouttière : c'est le pas d'une position à l'autre.
  const pas = carte.offsetWidth + 12
  index.value = Math.round(el.scrollLeft / pas)
}

/**
 * On pilote `scrollLeft` plutôt que d'appeler `scrollIntoView` : celui-ci ne fait rien
 * quand la carte visée est déjà partiellement visible — ce qui est le cas dès que le
 * débordement est faible — et il peut au passage faire défiler la page entière.
 */
function versCarte(i: number) {
  const el = rail.value
  const carte = el?.children[i] as HTMLElement | undefined
  if (!el || !carte) return
  el.scrollTo({ left: carte.offsetLeft - el.offsetLeft, behavior: 'smooth' })
}

const peutReculer = computed(() => index.value > 0)
const peutAvancer = computed(() => index.value < shown.value.length - 1)
</script>

<template>
  <!--
    Colonne de droite. `h-dvh` sans défilement interne : la barre latérale doit rester
    fixe. Les cartes en trop sont donc écartées par `shown`, pas masquées par un scroll.
  -->
  <aside
    v-if="variant === 'sidebar'"
    class="sticky top-0 hidden h-dvh w-72 shrink-0 flex-col gap-3 overflow-hidden border-l border-edge bg-panel bg-cover bg-center px-4 py-5 2xl:flex"
    :style="{ backgroundImage: `linear-gradient(rgb(7 16 31 / 0.86), rgb(7 16 31 / 0.94)), url(${background})` }"
  >
    <div>
      <h2 class="text-sm font-bold uppercase tracking-wide">
        {{ $t('iconic.title') }}
      </h2>
      <p class="text-xs text-ink-muted">
        {{ $t('iconic.subtitle') }}
      </p>
    </div>

    <!-- `min-h-0` autorise la liste à se comprimer plutôt qu'à déborder du cadre fixe. -->
    <div class="iconic-list flex min-h-0 flex-1 flex-col gap-3">
      <IconicCard
        v-for="droid in shown"
        :key="droid.slug"
        :droid="droid"
      />
    </div>

    <NuxtLink
      :to="localePath('/?rarity=iconic')"
      class="dx-button dx-button--secondary dx-button--block shrink-0"
    >
      {{ $t('iconic.seeAll') }}
    </NuxtLink>
  </aside>

  <!-- Bande horizontale : sous `2xl`, on défile latéralement plutôt que de tout perdre. -->
  <section
    v-else
    class="flex flex-col gap-2 2xl:hidden"
  >
    <div class="flex items-baseline justify-between gap-3">
      <div>
        <h2 class="text-sm font-bold uppercase tracking-wide">
          {{ $t('iconic.title') }}
        </h2>
        <p class="text-xs text-ink-muted">
          {{ $t('iconic.subtitle') }}
        </p>
      </div>
      <div class="flex shrink-0 items-center gap-2">
        <!-- Flèches réservées au pointeur : au doigt, on fait glisser. -->
        <div
          v-if="defilable"
          class="hidden items-center gap-1 sm:flex"
        >
          <button
            type="button"
            class="dx-icon-button size-9 disabled:opacity-30"
            :disabled="!peutReculer"
            :aria-label="$t('common.previous')"
            @click="versCarte(index - 1)"
          >
            <DxIcon
              name="actions/chevron-left"
              :size="16"
            />
          </button>
          <button
            type="button"
            class="dx-icon-button size-9 disabled:opacity-30"
            :disabled="!peutAvancer"
            :aria-label="$t('common.next')"
            @click="versCarte(index + 1)"
          >
            <DxIcon
              name="actions/chevron-right"
              :size="16"
            />
          </button>
        </div>

        <NuxtLink
          :to="localePath('/?rarity=iconic')"
          class="inline-flex items-center text-sm text-accent hover:underline pointer-coarse:min-h-11"
        >
          {{ $t('iconic.seeAll') }}
        </NuxtLink>
      </div>
    </div>

    <!--
      La marge négative fait courir le rail sous le padding de la page, pour que la première
      carte affleure le bord. Deux pièges s'y cachent :

      — une marge négative n'agrandit pas la boîte : sans largeur explicite, l'élément gardait
        celle du parent et débordait, faisant défiler toute la page horizontalement ;
      — la valeur doit suivre le padding réel du conteneur, `px-3` puis `px-4` à partir de
        `sm` (voir `layouts/default.vue`). Calée sur 4 partout, elle mordait de 4 px hors de
        l'écran sur mobile — le même défilement horizontal, en plus discret.
    -->
    <ul
      ref="rail"
      class="dx-carousel -mx-3 flex w-[calc(100%_+_1.5rem)] snap-x snap-mandatory gap-3 overflow-x-auto scroll-smooth px-3 pb-2 sm:-mx-4 sm:w-[calc(100%_+_2rem)] sm:px-4"
      @scroll.passive="majIndex"
    >
      <li
        v-for="droid in shown"
        :key="droid.slug"
        class="w-40 shrink-0 snap-start sm:w-44"
      >
        <IconicCard
          :droid="droid"
          class="w-full"
        />
      </li>
    </ul>

    <!-- Repères de position : sans eux, rien n'indique qu'il reste des cartes à droite. -->
    <div
      v-if="defilable"
      class="flex justify-center gap-1.5"
    >
      <!--
        La puce mesure 6 px : bonne taille à l'œil, cible impossible au doigt. Le bouton porte
        donc une zone tactile de 44 px de **haut** sur écran tactile, mais volontairement
        étroite (28 px) : à 44 px de large, sept puces s'étalaient sur toute la largeur du
        téléphone au lieu de rester groupées et centrées. Les marges négatives absorbent la
        hauteur pour que la rangée reste fine.
      -->
      <button
        v-for="(droid, i) in shown"
        :key="`p-${droid.slug}`"
        type="button"
        class="grid place-items-center rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-ink pointer-coarse:-my-5 pointer-coarse:h-11 pointer-coarse:w-7"
        :aria-label="droid.name"
        :aria-current="i === index ? 'true' : undefined"
        @click="versCarte(i)"
      >
        <span
          class="h-1.5 rounded-full transition-all"
          :class="i === index ? 'w-5 bg-accent' : 'w-1.5 bg-edge-strong group-hover:bg-ink-muted'"
        />
      </button>
    </div>
  </section>
</template>
