import { generateSyncCode, normalizeSyncCode, snapshotSchema } from '../utils/sync-snapshot'

/**
 * Dépose un instantané de progression et renvoie un **code de partage** anonyme.
 *
 * Aucun compte, aucune donnée personnelle : seulement la progression de jeu, rangée sous
 * un code aléatoire. Le second appareil récupère l'instantané avec ce code (`GET
 * /api/sync/:code`). L'entrée expire au bout de 30 jours, pour ne pas accumuler des
 * instantanés oubliés.
 */
const TTL_MS = 30 * 24 * 60 * 60 * 1000

export default defineEventHandler(async (event) => {
  const snapshot = await readValidatedBody(event, snapshotSchema.parse)

  const store = useStorage('sync')

  // Boucle de sûreté : une collision de code est quasi impossible (32⁸), mais si le tirage
  // tombe sur un code déjà pris, on retente plutôt que d'écraser l'instantané d'autrui.
  let code = normalizeSyncCode(generateSyncCode())
  for (let essais = 0; essais < 5 && (await store.hasItem(code)); essais++) {
    code = normalizeSyncCode(generateSyncCode())
  }

  await store.setItem(code, {
    snapshot,
    createdAt: Date.now(),
    expiresAt: Date.now() + TTL_MS,
  })

  return { code: `${code.slice(0, 4)}-${code.slice(4)}`, expiresInDays: 30 }
})
