/**
 * Liste les fournisseurs OAuth réellement configurés.
 *
 * Le client s'en sert pour n'afficher que des boutons fonctionnels : proposer « Continuer
 * avec Twitch » alors que les identifiants sont absents mène à une page d'erreur, ce qui
 * ressemble à un bug de l'app plutôt qu'à une configuration incomplète.
 */
export default defineEventHandler(() => {
  const config = useRuntimeConfig()

  const candidates = {
    discord: [config.discordClientId, config.discordClientSecret],
    google: [config.googleClientId, config.googleClientSecret],
    twitch: [config.twitchClientId, config.twitchClientSecret],
  } as const

  return {
    providers: Object.entries(candidates)
      .filter(([, [id, secret]]) => Boolean(id && secret))
      .map(([name]) => name),
  }
})
