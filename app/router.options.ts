import type { RouterConfig } from '@nuxt/schema'

/**
 * Comportement de défilement à chaque navigation.
 *
 * Par défaut, le contenu restait à la position où on l'avait laissé en changeant de vue :
 * en venant d'une page longue, on arrivait au milieu (voire dans le vide) d'une page plus
 * courte. On remet donc explicitement en haut à chaque changement de vue, tout en gardant
 * deux exceptions attendues : les ancres (on vise l'élément) et le retour/avance du
 * navigateur (on restaure la position mémorisée).
 */

/** Dégage la hauteur de l'en-tête collant quand on vise une ancre (ex. /install#ios). */
const HEADER_OFFSET = 80

export default <RouterConfig>{
  scrollBehavior(to, _from, savedPosition) {
    // Ancre explicite : on vise l'élément, en le dégageant de l'en-tête.
    if (to.hash) {
      return { el: to.hash, top: HEADER_OFFSET }
    }
    // Retour/avance du navigateur : on restaure la position d'où l'on vient.
    if (savedPosition) {
      return savedPosition
    }
    // Tout autre changement de vue : on remonte en haut.
    return { left: 0, top: 0 }
  },
}
