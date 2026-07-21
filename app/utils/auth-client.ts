import { createAuthClient } from 'better-auth/vue'

export const authClient = createAuthClient({
  // Même origine que l'app : les routes serveur sont montées sur /api/auth/**.
  baseURL: import.meta.client ? window.location.origin : undefined,
})

export const { signIn, signOut, useSession } = authClient

export type SocialProvider = 'discord' | 'google' | 'twitch'
