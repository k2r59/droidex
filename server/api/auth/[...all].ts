/** Monte tous les endpoints BetterAuth (OAuth, callbacks, session) sur /api/auth/**. */
export default defineEventHandler(async (event) => {
  const auth = await useAuth()
  return auth.handler(toWebRequest(event))
})
