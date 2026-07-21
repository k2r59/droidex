/**
 * Confine le focus dans un élément tant qu'il est ouvert, et le restitue à la fermeture.
 *
 * Les deux fenêtres du projet annonçaient `aria-modal="true"` sans rien confiner. C'est
 * pire qu'une absence d'attribut : les lecteurs d'écran masquent l'arrière-plan sur cette
 * seule foi, si bien que l'utilisateur tabulait vers des éléments qu'on lui affirmait
 * absents. Le focus restait par ailleurs sur le bouton déclencheur, derrière l'overlay,
 * et retombait sur `<body>` à la fermeture.
 *
 * On confine par gestion de `Tab` plutôt qu'avec `inert` sur le reste du document :
 * `inert` demanderait de connaître — et de restaurer — tous les ancêtres, alors que la
 * fenêtre est téléportée au `body`.
 */

/** Éléments atteignables au clavier, dans l'ordre du document. */
const FOCUSABLES = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(',')

export function useFocusTrap(
  container: Ref<HTMLElement | null>,
  active: Ref<boolean>,
) {
  /** Élément qui avait le focus avant l'ouverture — c'est à lui qu'on le rendra. */
  let origine: HTMLElement | null = null

  function focusables(): HTMLElement[] {
    const el = container.value
    if (!el) return []
    return [...el.querySelectorAll<HTMLElement>(FOCUSABLES)]
      /**
       * Un élément masqué reste dans le DOM mais ne doit pas recevoir le focus.
       *
       * On teste `getClientRects()` et non `offsetParent` : ce dernier vaut `null` dès
       * qu'un ancêtre est en `position: fixed` — ce qui est précisément le cas de nos
       * fenêtres. Le filtre écartait alors la totalité des éléments, et le piège ne
       * piégeait plus rien.
       */
      .filter((n) => n.getClientRects().length > 0)
  }

  function onKeydown(e: KeyboardEvent) {
    if (!active.value || e.key !== 'Tab') return

    const cibles = focusables()
    if (!cibles.length) return

    const premier = cibles[0]!
    const dernier = cibles[cibles.length - 1]!
    const courant = document.activeElement

    // Boucle explicite aux deux extrémités : sans ça, Tab sort vers la page du dessous.
    if (e.shiftKey && (courant === premier || !container.value?.contains(courant))) {
      e.preventDefault()
      dernier.focus()
    }
    else if (!e.shiftKey && courant === dernier) {
      e.preventDefault()
      premier.focus()
    }
  }

  watch(active, async (ouvert) => {
    if (ouvert) {
      origine = document.activeElement as HTMLElement | null
      // Le contenu n'est monté qu'au tick suivant : sans attendre, rien à cibler.
      await nextTick()
      const cibles = focusables()
      // À défaut d'élément atteignable, on porte le focus sur le conteneur lui-même,
      // rendu focalisable par son `tabindex="-1"`, pour que la lecture commence là.
      ;(cibles[0] ?? container.value)?.focus()
    }
    else if (origine) {
      origine.focus()
      origine = null
    }
  })

  onMounted(() => document.addEventListener('keydown', onKeydown))
  onUnmounted(() => document.removeEventListener('keydown', onKeydown))
}
