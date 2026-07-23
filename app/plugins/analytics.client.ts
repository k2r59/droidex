/**
 * Comptage de fréquentation, anonyme et économe.
 *
 * On accumule en mémoire les pages parcourues pendant la session, et on envoie **un seul**
 * beacon quand l'onglet passe en arrière-plan ou se ferme (`visibilitychange` / `pagehide`).
 * Un envoi par visite plutôt qu'un par page : le nombre d'appels de fonction — le vrai poste
 * de coût — reste minime. `sendBeacon` part de façon fiable même pendant la fermeture.
 *
 * Aucun cookie, aucun identifiant, aucune donnée personnelle : on n'envoie que des chemins
 * (sans requête ni fragment), aussitôt réduits côté serveur à des clés de page connues.
 * On respecte « Do Not Track », et on ne compte pas le développement ni les accès locaux.
 */
export default defineNuxtPlugin((nuxtApp) => {
  const router = useRouter()

  // Ne pas compter : dev, hôtes locaux (aperçu de build, tests), ou refus explicite du suivi.
  const host = location.hostname
  const local = host === 'localhost' || host === '127.0.0.1' || host.endsWith('.local')
  const dnt = navigator.doNotTrack === '1'
    || (window as unknown as { doNotTrack?: string }).doNotTrack === '1'
  if (import.meta.dev || local || dnt) return

  const pending: string[] = []
  let visitSent = false
  let lastPath = ''

  function record(path: string) {
    // Le chemin seul, jamais la requête ni le fragment (pas de données identifiantes).
    const clean = path.split('?')[0]!.split('#')[0]!
    // Évite de compter deux fois la même vue consécutive (redirections internes, hash).
    if (clean === lastPath) return
    lastPath = clean
    pending.push(clean)
  }

  function flush() {
    if (pending.length === 0 && visitSent) return
    const payload = JSON.stringify({ paths: pending.splice(0), newVisit: !visitSent })
    visitSent = true
    try {
      navigator.sendBeacon('/api/stats', new Blob([payload], { type: 'application/json' }))
    }
    catch {
      // Beacon indisponible : on abandonne silencieusement, une stat approximative suffit.
    }
  }

  // Première page (l'hydratation ne déclenche pas `afterEach`), puis chaque navigation.
  nuxtApp.hook('app:mounted', () => record(router.currentRoute.value.path))
  router.afterEach((to) => record(to.path))

  // Fin de visite : l'onglet se cache (bascule d'appli, fermeture) ou la page se décharge.
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') flush()
  })
  window.addEventListener('pagehide', flush)
})
