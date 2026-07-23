<script setup lang="ts">
/**
 * Repère d'information, révélé **au clic** — pas au survol.
 *
 * Remplace les info-bulles précédentes pour les repères qui expliquent une donnée (⚠ non
 * vérifié, source unique, cycles identiques…). Deux raisons de préférer le clic : au doigt,
 * il n'y a pas de survol, et une bibliothèque de tooltips instanciée sur chaque repère
 * alourdissait la page (des centaines d'instances sur la grille Droidex). Ici, chaque repère
 * est un simple composant local, monté seulement là où il sert.
 *
 * La bulle est **téléportée dans `body`** et positionnée en `fixed` : les cartes de droid
 * ont un `overflow-hidden` (coins arrondis) qui rognait une bulle rendue en absolu à
 * l'intérieur. En sortant du flux et en calant la position sur le rectangle du déclencheur,
 * la bulle échappe à tout conteneur et se borne d'elle-même au viewport.
 *
 * Le contenu vient toujours d'une chaîne i18n passée en `content` : rien à traduire de plus.
 */
const props = withDefaults(
  defineProps<{
    /** Texte affiché dans la bulle. */
    content: string
    /** Teinte du repère : alerte (⚠) ou information neutre (ℹ). */
    variant?: 'warn' | 'info'
    /** Symbole du déclencheur ; par défaut ⚠ en alerte, ℹ en information. */
    symbol?: string
  }>(),
  { variant: 'warn' },
)

const open = ref(false)
const trigger = useTemplateRef<HTMLElement>('trigger')
const bubble = useTemplateRef<HTMLElement>('bubble')

/** Position calculée de la bulle, en coordonnées viewport (`position: fixed`). */
const pos = ref({ top: 0, left: 0, below: false })

/** Largeur maximale de la bulle, aussi utilisée pour la borner horizontalement. */
const MAX_W = 240
const MARGIN = 8

/**
 * Cale la bulle au-dessus du repère, centrée, puis la ramène dans le viewport si elle en
 * sort. Si le repère est trop haut pour loger la bulle au-dessus, on bascule dessous.
 */
function place() {
  const el = trigger.value
  if (!el) return
  const r = el.getBoundingClientRect()
  const demi = MAX_W / 2
  const cx = r.left + r.width / 2
  const left = Math.min(Math.max(cx, MARGIN + demi), window.innerWidth - MARGIN - demi)
  const below = r.top < 96
  pos.value = { top: below ? r.bottom + 6 : r.top - 6, left, below }
}

async function toggle() {
  open.value = !open.value
  if (open.value) {
    await nextTick()
    place()
  }
}

/** Un clic hors du repère et de la bulle referme — le réflexe attendu d'un pop-info. */
onClickOutside(trigger, () => { open.value = false }, { ignore: [bubble] })
onKeyStroke('Escape', () => { if (open.value) open.value = false })

/**
 * La bulle est `fixed` : un défilement déplacerait le repère sans elle. Plutôt que de la
 * suivre image par image, on referme — le geste de lecture d'un pop-info est bref.
 */
function onScroll() {
  if (open.value) open.value = false
}
onMounted(() => window.addEventListener('scroll', onScroll, true))
onUnmounted(() => window.removeEventListener('scroll', onScroll, true))

const glyph = computed(() => props.symbol ?? (props.variant === 'info' ? 'ℹ' : '⚠'))
</script>

<template>
  <span class="relative inline-flex">
    <!--
      Déclencheur en `span[role=button]` et non `<button>` : ce repère se place aussi à
      l'intérieur d'éléments cliquables (une tuile de palier est elle-même un bouton), or
      imbriquer deux `<button>` est du HTML invalide. `@click.stop` empêche le clic
      d'atteindre le parent : ouvrir la bulle ne déclenche pas l'action de la tuile.
    -->
    <span
      ref="trigger"
      role="button"
      tabindex="0"
      class="cursor-help text-xs leading-none transition-transform hover:scale-125 focus:outline-none focus-visible:ring-2 focus-visible:ring-ink"
      :class="variant === 'info' ? 'text-accent' : 'text-warn'"
      :aria-expanded="open"
      :aria-label="content"
      @click.stop="toggle"
      @keydown.enter.prevent.stop="toggle"
      @keydown.space.prevent.stop="toggle"
    >
      <slot>{{ glyph }}</slot>
    </span>

    <Teleport to="body">
      <span
        v-if="open"
        ref="bubble"
        role="tooltip"
        class="panel dx-modal-in fixed z-[120] -translate-x-1/2 whitespace-normal p-2.5 text-left text-xs leading-snug text-ink shadow-xl"
        :class="pos.below ? '' : '-translate-y-full'"
        :style="{ top: `${pos.top}px`, left: `${pos.left}px`, maxWidth: `${MAX_W}px` }"
      >
        {{ content }}
      </span>
    </Teleport>
  </span>
</template>
