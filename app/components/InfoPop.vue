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
const root = useTemplateRef<HTMLElement>('root')

/** Un clic hors du repère referme la bulle — le réflexe attendu d'un pop-info. */
onClickOutside(root, () => { open.value = false })
onKeyStroke('Escape', () => { if (open.value) open.value = false })

const glyph = computed(() => props.symbol ?? (props.variant === 'info' ? 'ℹ' : '⚠'))
</script>

<template>
  <span
    ref="root"
    class="relative inline-flex"
  >
    <!--
      Déclencheur en `span[role=button]` et non `<button>` : ce repère se place aussi à
      l'intérieur d'éléments cliquables (une tuile de palier est elle-même un bouton), or
      imbriquer deux `<button>` est du HTML invalide. `@click.stop` empêche le clic
      d'atteindre le parent : ouvrir la bulle ne déclenche pas l'action de la tuile.
    -->
    <span
      role="button"
      tabindex="0"
      class="cursor-help text-xs leading-none transition-transform hover:scale-125 focus:outline-none focus-visible:ring-2 focus-visible:ring-ink"
      :class="variant === 'info' ? 'text-accent' : 'text-warn'"
      :aria-expanded="open"
      :aria-label="content"
      @click.stop="open = !open"
      @keydown.enter.prevent.stop="open = !open"
      @keydown.space.prevent.stop="open = !open"
    >
      <slot>{{ glyph }}</slot>
    </span>

    <!--
      Bulle positionnée en absolu au-dessus du repère, centrée sur lui. `w-max` avec un
      plafond la laisse s'adapter au texte court sans jamais déborder largement ; le
      décalage `bottom-full` la pose au-dessus, hors du flux, sans pousser la mise en page.
    -->
    <span
      v-if="open"
      role="tooltip"
      class="panel dx-modal-in absolute bottom-full left-1/2 z-50 mb-1.5 w-max max-w-[15rem] -translate-x-1/2 whitespace-normal p-2.5 text-left text-xs leading-snug text-ink shadow-xl"
    >
      {{ content }}
    </span>
  </span>
</template>
