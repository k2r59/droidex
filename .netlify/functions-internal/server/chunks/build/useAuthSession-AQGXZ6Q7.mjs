import { computed, unref } from 'vue';
import { createAuthClient } from 'better-auth/vue';

//#region app/utils/auth-client.ts
var authClient = createAuthClient({ baseURL: void 0 });
var { signIn, signOut, useSession } = authClient;
//#endregion
//#region app/composables/useAuthSession.ts
/**
* Normalise la session BetterAuth.
*
* Le client Vue expose `useSession()` sous la forme d'UN seul `Ref` contenant
* `{ data, error, isPending }` — et non d'un objet de refs comme le client React.
* Déstructurer directement donnerait `undefined`. On expose donc des computed
* séparés, utilisables tels quels dans les composants.
*/
function useAuthSession() {
	const session = authClient.useSession();
	const data = computed(() => unref(session)?.data ?? null);
	const user = computed(() => data.value?.user ?? null);
	return {
		data,
		user,
		isPending: computed(() => unref(session)?.isPending ?? false),
		isAuthenticated: computed(() => Boolean(user.value))
	};
}

export { useAuthSession as u };
//# sourceMappingURL=useAuthSession-AQGXZ6Q7.mjs.map
