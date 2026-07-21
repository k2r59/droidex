import { betterAuth } from 'better-auth'
import { mongodbAdapter } from 'better-auth/adapters/mongodb'

/**
 * Construit l'instance. Séparée de `useAuth` pour que son type de retour serve de
 * source de vérité : `betterAuth()` infère un générique à partir des options passées,
 * et l'annoter à la main (`ReturnType<typeof betterAuth>`) provoquerait une erreur de
 * variance sur `$context`.
 */
async function createAuth() {
  const config = useRuntimeConfig()
  const db = await useDb()

  /**
   * On n'enregistre que les fournisseurs réellement configurés. Déclarer un provider avec
   * des identifiants vides fait échouer l'initialisation, ce qui rendrait l'app entièrement
   * inaccessible en développement tant que les trois OAuth ne sont pas créés — alors que
   * tout le reste (Droidex, guide, missions) se consulte très bien sans être connecté.
   */
  const candidates = {
    discord: { clientId: config.discordClientId, clientSecret: config.discordClientSecret },
    google: { clientId: config.googleClientId, clientSecret: config.googleClientSecret },
    twitch: { clientId: config.twitchClientId, clientSecret: config.twitchClientSecret },
  }

  const socialProviders = Object.fromEntries(
    Object.entries(candidates).filter(([, c]) => c.clientId && c.clientSecret),
  )

  if (import.meta.dev && !Object.keys(socialProviders).length) {
    console.warn(
      '[auth] Aucun fournisseur OAuth configuré — la connexion est désactivée. Voir .env.example.',
    )
  }

  /**
   * Refus explicite de démarrer sans secret en production.
   *
   * BetterAuth ne lève rien si `secret` est vide : il retombe sur une constante publiée
   * dans son propre dépôt (`better-auth-secret-1234…`). Une variable d'environnement
   * oubliée — nouveau site, préversion de branche qui n'hérite pas du contexte production —
   * signerait donc les sessions avec une valeur que tout le monde connaît, et n'importe
   * qui pourrait forger un cookie valide pour n'importe quel compte. La panne serait
   * parfaitement silencieuse : rien, dans l'interface, ne la révélerait.
   *
   * Même raisonnement pour `baseUrl` : resté sur le défaut localhost, il produit des
   * redirections OAuth hors site et peut priver les cookies de leur attribut `Secure`.
   */
  if (!import.meta.dev) {
    if (!config.betterAuthSecret) {
      throw new Error('[auth] NUXT_BETTER_AUTH_SECRET est absente. Refus de démarrer avec le secret par défaut de BetterAuth.')
    }
    if (config.public.baseUrl.includes('localhost')) {
      throw new Error('[auth] NUXT_PUBLIC_BASE_URL pointe encore sur localhost en production.')
    }
  }

  return betterAuth({
    database: mongodbAdapter(db),
    secret: config.betterAuthSecret,
    baseURL: config.public.baseUrl,
    // Pas de mot de passe : l'app est communautaire, on s'appuie uniquement sur l'OAuth.
    emailAndPassword: { enabled: false },
    socialProviders,
    /**
     * Un même joueur peut arriver par Discord puis par Google : on rattache les comptes
     * partageant une adresse vérifiée plutôt que de créer un doublon de progression.
     *
     * `trustedProviders` est volontairement **vide**. Le nom laisse croire à une liste de
     * fournisseurs de confiance ; il désigne en réalité ceux pour lesquels BetterAuth
     * **saute** le contrôle `emailVerified` :
     *
     *   if (!isTrustedProvider && !userInfo.emailVerified || …) { refus }
     *
     * Les y déclarer ouvrait donc une prise de contrôle de compte : créer un compte
     * Discord portant l'adresse d'une victime inscrite via Google, sans jamais confirmer
     * cette adresse, suffisait à se voir rattaché à son compte — et à lire, modifier ou
     * supprimer sa progression. Liste vide : le rattachement ne vaut que pour les adresses
     * réellement vérifiées par le fournisseur, ce qui était l'intention depuis le début.
     */
    account: {
      accountLinking: {
        enabled: true,
        trustedProviders: [],
      },
    },
  })
}

type AuthInstance = Awaited<ReturnType<typeof createAuth>>

let instance: AuthInstance | null = null

/**
 * Instance BetterAuth, créée à la première requête (elle a besoin du runtimeConfig,
 * indisponible au moment de l'évaluation du module).
 */
export async function useAuth(): Promise<AuthInstance> {
  instance ??= await createAuth()
  return instance
}

/**
 * Renvoie la session courante, ou `null` si le visiteur n'est pas connecté.
 * Nommée `getAuthSession` et non `getSession` : h3 auto-importe déjà un `getSession`
 * (sessions chiffrées par cookie), et l'ombrer prêterait à confusion.
 */
export async function getAuthSession(event: Parameters<typeof getHeaders>[0]) {
  const auth = await useAuth()
  return auth.api.getSession({ headers: new Headers(getHeaders(event) as HeadersInit) })
}

/** Comme `getAuthSession`, mais lève un 401 au lieu de renvoyer `null`. */
export async function requireSession(event: Parameters<typeof getHeaders>[0]) {
  const session = await getAuthSession(event)
  if (!session?.user) {
    throw createError({ statusCode: 401, statusMessage: 'Authentification requise' })
  }
  return session
}
