/**
 * Fournisseurs OAuth réellement configurés.
 *
 * Partagé entre la route qui les liste pour le client et le montage de BetterAuth : les
 * deux doivent répondre la même chose, sinon l'interface propose une connexion que le
 * serveur refuse.
 */
export function configuredProviders(): string[] {
  const config = useRuntimeConfig()

  const candidates = {
    discord: [config.discordClientId, config.discordClientSecret],
    google: [config.googleClientId, config.googleClientSecret],
    twitch: [config.twitchClientId, config.twitchClientSecret],
  } as const

  return Object.entries(candidates)
    .filter(([, [id, secret]]) => Boolean(id && secret))
    .map(([name]) => name)
}

/**
 * Les comptes sont-ils disponibles ?
 *
 * Sans fournisseur, l'app reste pleinement utilisable : la progression est stockée dans
 * le navigateur. On peut donc mettre l'authentification hors service proprement, plutôt
 * que de laisser BetterAuth tenter d'atteindre une base absente et échouer en 500.
 */
export function accountsEnabled(): boolean {
  return configuredProviders().length > 0
}
