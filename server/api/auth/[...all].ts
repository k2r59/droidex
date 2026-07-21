/**
 * Monte tous les endpoints BetterAuth (OAuth, callbacks, session) sur /api/auth/**.
 *
 * Court-circuité tant qu'aucun fournisseur n'est configuré. Sans ce garde-fou, le client
 * BetterAuth interroge `get-session` à **chaque chargement de page**, `useAuth()` tente
 * d'ouvrir MongoDB, et la requête échoue en 500 : une erreur par visite, sur une app qui
 * fonctionne pourtant très bien sans compte.
 *
 * On renvoie donc une session vide — la réponse honnête à « qui est connecté ? » quand
 * personne ne peut l'être — et un 503 explicite sur les autres endpoints.
 */
export default defineEventHandler(async (event) => {
  if (!accountsEnabled()) {
    if (event.path.includes('/get-session')) return null

    throw createError({
      statusCode: 503,
      statusMessage: 'Les comptes ne sont pas encore ouverts.',
    })
  }

  const auth = await useAuth()
  return auth.handler(toWebRequest(event))
})
