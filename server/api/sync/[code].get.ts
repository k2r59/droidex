import { normalizeSyncCode } from '../../utils/sync-snapshot'

/**
 * Récupère l'instantané de progression associé à un code de synchronisation.
 *
 * Renvoie 404 si le code est inconnu ou expiré — sans distinguer les deux, pour ne rien
 * révéler sur l'existence d'un code à qui en essaierait au hasard. Un code expiré est
 * purgé au passage : la lecture fait aussi le ménage, faute de TTL natif côté stockage.
 */
type StoredSnapshot = { snapshot: unknown, createdAt: number, expiresAt: number }

export default defineEventHandler(async (event) => {
  const code = normalizeSyncCode(getRouterParam(event, 'code') ?? '')
  if (code.length !== 8) {
    throw createError({ statusCode: 404, statusMessage: 'Code introuvable' })
  }

  const store = useStorage('sync')
  const entry = await store.getItem<StoredSnapshot>(code)

  if (!entry) {
    throw createError({ statusCode: 404, statusMessage: 'Code introuvable' })
  }

  if (entry.expiresAt < Date.now()) {
    await store.removeItem(code)
    throw createError({ statusCode: 404, statusMessage: 'Code expiré' })
  }

  return { snapshot: entry.snapshot }
})
