import { betterAuth } from 'better-auth'
import { mongodbAdapter } from 'better-auth/adapters/mongodb'

let instance: ReturnType<typeof betterAuth> | null = null

/**
 * Instance BetterAuth, créée à la première requête (elle a besoin du runtimeConfig,
 * indisponible au moment de l'évaluation du module).
 */
export async function useAuth() {
  if (instance) return instance

  const config = useRuntimeConfig()
  const db = await useDb()

  instance = betterAuth({
    database: mongodbAdapter(db),
    secret: config.betterAuthSecret,
    baseURL: config.public.baseUrl,
    // Pas de mot de passe : l'app est communautaire, on s'appuie uniquement sur l'OAuth.
    emailAndPassword: { enabled: false },
    socialProviders: {
      discord: {
        clientId: config.discordClientId,
        clientSecret: config.discordClientSecret,
      },
      google: {
        clientId: config.googleClientId,
        clientSecret: config.googleClientSecret,
      },
      twitch: {
        clientId: config.twitchClientId,
        clientSecret: config.twitchClientSecret,
      },
    },
    // Un même joueur peut arriver par Discord puis par Google : on rattache les comptes
    // partageant une adresse vérifiée plutôt que de créer un doublon de progression.
    account: {
      accountLinking: {
        enabled: true,
        trustedProviders: ['discord', 'google', 'twitch'],
      },
    },
  })

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
