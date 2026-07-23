import { z } from 'zod'
import { TIERS } from '~~/shared/types/droid'

/**
 * Schéma d'un instantané de progression échangé par code de synchronisation.
 *
 * Reprend les mêmes bornes que `PATCH /api/progress` : le code de sync accepte l'inconnu
 * (n'importe qui peut poster), donc on valide strictement plutôt que d'écrire tel quel un
 * corps qui pourrait être énorme ou mal formé. À la différence du PATCH partiel, un
 * instantané est complet — d'où des champs requis.
 */
const MAX_NOVA = 1_000_000
const MAX_SUPER_REBIRTH = 10_000
const MAX_SHOP_LEVEL = 50
const MAX_REBIRTH = 30

const entrySchema = z.object({
  tiers: z.array(z.enum(TIERS)).max(TIERS.length),
  flawless: z.boolean(),
})

export const snapshotSchema = z.object({
  collection: z.record(z.string().max(64), entrySchema),
  rebirth: z.number().int().min(0).max(MAX_REBIRTH),
  superRebirth: z.number().int().min(0).max(MAX_SUPER_REBIRTH),
  cycle: z.number().int().min(1).max(4),
  novaCrystals: z.number().int().min(0).max(MAX_NOVA),
  shopLevels: z.record(z.string().max(64), z.number().int().min(0).max(MAX_SHOP_LEVEL)),
})

export type SyncSnapshot = z.infer<typeof snapshotSchema>

/**
 * Alphabet des codes de synchronisation : sans les caractères ambigus (0/O, 1/I/L) pour
 * qu'un code recopié à la main ne se lise pas de travers. 8 caractères sur 32 possibilités
 * font 32⁸ ≈ 10¹² combinaisons — assez pour qu'un code ne se devine pas au hasard.
 */
const ALPHABET = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789'

/** Groupé en deux blocs de quatre (`AB3K-9FMQ`), plus lisible à dicter ou recopier. */
export function generateSyncCode(): string {
  let raw = ''
  for (let i = 0; i < 8; i++) {
    raw += ALPHABET[Math.floor(Math.random() * ALPHABET.length)]
  }
  return `${raw.slice(0, 4)}-${raw.slice(4)}`
}

/** Ramène un code saisi (tirets, espaces, casse) à sa forme canonique de stockage. */
export function normalizeSyncCode(input: string): string {
  return input.toUpperCase().replace(/[^A-Z0-9]/g, '')
}
