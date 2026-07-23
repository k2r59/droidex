/**
 * Rouvre toujours une page en haut au rechargement.
 *
 * Par défaut, le navigateur restaure la position de défilement quand on actualise (F5) ou
 * qu'on rouvre l'onglet — on se retrouve alors au milieu de la page. En passant la
 * restauration en « manuel », c'est notre `scrollBehavior` (voir `app/router.options.ts`)
 * qui décide, et le rechargement repart du haut.
 */
export default defineNuxtPlugin(() => {
  if (import.meta.client && 'scrollRestoration' in history) {
    history.scrollRestoration = 'manual'
  }
})
