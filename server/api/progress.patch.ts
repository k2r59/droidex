import { z } from 'zod'
import droidData from '~~/app/data/droids.json'
import shopData from '~~/app/data/nova-shop.json'
import { TIERS } from '~~/shared/types/droid'

/** Slugs connus — empêche d'écrire des entrées arbitraires dans la collection. */
const KNOWN_SLUGS = new Set(droidData.droids.map((d) => d.slug))

/**
 * Articles connus du Nova Shop.
 *
 * Sans cette liste, `shopLevels` acceptait n'importe quelle clé : le document grossissait
 * sans limite, et une clé contenant un point créait des sous-documents imbriqués via le
 * `$set` construit plus bas — une clé commençant par `$` faisait carrément échouer Mongo.
 */
const KNOWN_ITEMS = new Set(shopData.sections.flatMap((s) => s.items.map((i) => i.id)))

/**
 * Bornes hautes. Elles ne visent pas la triche — la progression est déclarative et
 * n'engage que son auteur — mais un client fautif qui enverrait `Number.MAX_SAFE_INTEGER`
 * ou une valeur absurde stockée telle quelle.
 */
const MAX_NOVA = 1_000_000
const MAX_SUPER_REBIRTH = 10_000
const MAX_SHOP_LEVEL = 50

/**
 * Une entrée du journal : la liste des paliers obtenus, chacun indépendant.
 *
 * `.nullable()` sur l'ancien champ `tier` n'est plus accepté : un client resté sur
 * l'ancienne version verra sa requête rejetée en 400 plutôt que d'écrire une forme
 * hétérogène en base. La migration se fait côté client, à l'hydratation.
 */
const entrySchema = z.object({
  tiers: z.array(z.enum(TIERS)).max(TIERS.length),
  flawless: z.boolean(),
})

const bodySchema = z
  .object({
    collection: z.record(z.string(), entrySchema).optional(),
    // 30 rebirths par cycle (cf. exigences 29→30 documentées depuis srbcontrol).
    rebirth: z.number().int().min(0).max(30).optional(),
    superRebirth: z.number().int().min(0).max(MAX_SUPER_REBIRTH).optional(),
    cycle: z.number().int().min(1).max(4).optional(),
    novaCrystals: z.number().int().min(0).max(MAX_NOVA).optional(),
    shopLevels: z.record(z.string(), z.number().int().min(0).max(MAX_SHOP_LEVEL)).optional(),
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

  const unknownSlugs = Object.keys(body.collection ?? {}).filter((slug) => !KNOWN_SLUGS.has(slug))
  if (unknownSlugs.length) {
    throw createError({ statusCode: 400, statusMessage: 'Droid inconnu dans la collection.' })
  }

  const unknownItems = Object.keys(body.shopLevels ?? {}).filter((id) => !KNOWN_ITEMS.has(id))
  if (unknownItems.length) {
    throw createError({ statusCode: 400, statusMessage: 'Article de boutique inconnu.' })
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
