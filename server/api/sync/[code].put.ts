import { normalizeSyncCode, snapshotSchema } from '../../utils/sync-snapshot'

/**
 * Écrit (ou réécrit) l'instantané de progression associé à un code de sauvegarde.
 *
 * C'est le pendant persistant de `POST /api/sync` : là où le POST **crée** un code neuf à
 * partir d'un instantané, ce PUT met à jour un code déjà connu du client. Il sert à la
 * sauvegarde « transparente » — l'appli pousse ici à chaque changement, sous le code
 * auto-généré au premier passage.
 *
 * **Expiration glissante** : chaque écriture repousse l'échéance de 30 jours. Un joueur
 * actif ne perd donc jamais sa sauvegarde ; seuls les codes réellement abandonnés finissent
 * par être purgés (à la lecture, faute de TTL natif côté stockage).
 *
 * Anonyme par construction : quiconque connaît le code peut y écrire. C'est le même compromis
 * que le reste du système de sync — pas de compte, donc pas de propriétaire ; la protection
 * tient au fait que le code reste privé et qu'il y a ~10¹² combinaisons.
 */
const TTL_MS = 30 * 24 * 60 * 60 * 1000

type StoredSnapshot = { snapshot: unknown, createdAt: number, expiresAt: number }

export default defineEventHandler(async (event) => {
  const code = normalizeSyncCode(getRouterParam(event, 'code') ?? '')
  if (code.length !== 8) {
    throw createError({ statusCode: 404, statusMessage: 'Code introuvable' })
  }

  const snapshot = await readValidatedBody(event, snapshotSchema.parse)

  const store = useStorage('sync')
  const existing = await store.getItem<StoredSnapshot>(code)
  const now = Date.now()

  await store.setItem(code, {
    snapshot,
    // On conserve la date de création d'origine ; seule l'échéance glisse.
    createdAt: existing?.createdAt ?? now,
    expiresAt: now + TTL_MS,
  })

  return { ok: true, expiresInDays: 30 }
})
