import { z } from 'zod'
import droidData from '~~/app/data/droids.json'
import { TIERS } from '~~/shared/types/droid'

/** Slugs connus — empêche d'écrire des entrées arbitraires dans la collection. */
const KNOWN_SLUGS = new Set(droidData.droids.map((d) => d.slug))

const entrySchema = z.object({
  tier: z.enum(TIERS).nullable(),
  flawless: z.boolean(),
})

const bodySchema = z
  .object({
    collection: z.record(z.string(), entrySchema).optional(),
    // 28 rebirths par cycle (cf. exigences 27→28 documentées).
    rebirth: z.number().int().min(0).max(28).optional(),
    superRebirth: z.number().int().min(0).optional(),
    cycle: z.number().int().min(1).max(4).optional(),
    novaCrystals: z.number().int().min(0).optional(),
    shopLevels: z.record(z.string(), z.number().int().min(0)).optional(),
  })
  .refine((b) => Object.keys(b).length > 0, { message: 'Corps de requête vide' })

/**
 * Mise à jour partielle de la progression. Les champs absents sont laissés intacts,
 * et les entrées de collection sont fusionnées clé par clé plutôt que remplacées en bloc —
 * ça évite qu'un onglet resté ouvert avec un état périmé écrase les cases cochées ailleurs.
 */
export default defineEventHandler(async (event) => {
  const session = await requireSession(event)
  const body = await readValidatedBody(event, bodySchema.parse)

  const unknown = Object.keys(body.collection ?? {}).filter((slug) => !KNOWN_SLUGS.has(slug))
  if (unknown.length) {
    throw createError({
      statusCode: 400,
      statusMessage: `Droid(s) inconnu(s) : ${unknown.join(', ')}`,
    })
  }

  const set: Record<string, unknown> = { updatedAt: new Date() }
  for (const [slug, entry] of Object.entries(body.collection ?? {})) {
    set[`collection.${slug}`] = entry
  }
  for (const [itemId, level] of Object.entries(body.shopLevels ?? {})) {
    set[`shopLevels.${itemId}`] = level
  }
  for (const key of ['rebirth', 'superRebirth', 'cycle', 'novaCrystals'] as const) {
    if (body[key] !== undefined) set[key] = body[key]
  }

  const progress = await progressCollection()
  const result = await progress.findOneAndUpdate(
    { userId: session.user.id },
    { $set: set, $setOnInsert: { userId: session.user.id } },
    { upsert: true, returnDocument: 'after', projection: { _id: 0 } },
  )

  return result
})
