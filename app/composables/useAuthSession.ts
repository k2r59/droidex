/**
 * Normalise la session BetterAuth.
 *
 * Le client Vue expose `useSession()` sous la forme d'UN seul `Ref` contenant
 * `{ data, error, isPending }` — et non d'un objet de refs comme le client React.
 * Déstructurer directement donnerait `undefined`. On expose donc des computed
 * séparés, utilisables tels quels dans les composants.
 */
export function useAuthSession() {
  const session = authClient.useSession()

  const data = computed(() => unref(session)?.data ?? null)
  const user = computed(() => data.value?.user ?? null)
  const isPending = computed(() => unref(session)?.isPending ?? false)
  const isAuthenticated = computed(() => Boolean(user.value))

  return { data, user, isPending, isAuthenticated }
}
