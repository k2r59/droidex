/**
 * Types partagés entre le client et le serveur (Nuxt auto-importe le dossier `shared/`).
 */

export const TIERS = ['DEFAULT', 'GOLD', 'DIAMOND', 'RAINBOW', 'BESKAR', 'GALACTIC'] as const
export type Tier = (typeof TIERS)[number]

export const RARITIES = ['common', 'rare', 'epic', 'legendary', 'mythic', 'iconic'] as const
export type Rarity = (typeof RARITIES)[number]

export const DROID_TYPES = ['worker', 'astromech', 'battle'] as const
export type DroidType = (typeof DROID_TYPES)[number]

export interface TierStats {
  /** Crédits par seconde, normalisé en nombre. `null` si non publié. */
  income: number | null
  /** Libellé d'origine tel qu'affiché par la source ("1.41m"), pour traçabilité. */
  incomeLabel: string | null
  cost: number | null
  costLabel: string | null
  /** Valeur de revente. */
  value: number | null
  valueLabel: string | null
  /** Nom du fichier d'illustration propre à ce palier. */
  image: string
  /** `true` quand le visuel est emprunté à un autre palier (cas du Galactique). */
  imageIsFallback: boolean
}

export interface Droid {
  /** Identifiant stable, utilisé en base et dans les URLs. */
  slug: string
  name: string
  /** Nom de fichier des icônes : `{assetKey}_{TIER}.png`. */
  assetKey: string
  rarity: Rarity
  type: DroidType
  /** Les Iconic génèrent un % du revenu total au lieu d'un montant fixe. */
  percentIncome: boolean
  /** Pourcentage généré par un Iconic (15 ou 25). `null` pour les autres raretés. */
  percentValue: number | null
  /** Clé i18n du perk, ou `null` si le droid n'en a pas / non documenté. */
  perk: string | null
  /** Chiffres extrapolés ou issus de sources secondaires — à afficher avec réserve. */
  unverified: boolean
  tiers: Partial<Record<Tier, TierStats>>
}

export interface DroidDataset {
  version: number
  generatedFrom: string
  tiers: Tier[]
  quantifiedTiers: Tier[]
  rarities: Rarity[]
  types: DroidType[]
  droids: Droid[]
}

/**
 * Collection d'un utilisateur.
 *
 * Le Droidex est un **journal de collection**, à la manière d'un bestiaire : il consigne
 * les variantes qu'on a obtenues, pas l'inventaire du moment. Chaque palier est donc une
 * entrée indépendante — avoir obtenu un MOUSE Beskar n'implique nullement d'avoir eu son
 * Or un jour.
 *
 * Le modèle précédent ne gardait que le palier le plus haut et déduisait les inférieurs.
 * C'était plus compact, mais faux : il inventait des variantes jamais obtenues, et rendait
 * impossible de retirer un palier sans effacer tous ceux du dessous.
 */
export interface CollectionEntry {
  /** Paliers obtenus. Tableau vide = droid absent du Droidex. */
  tiers: Tier[]
  /** Version Flawless débloquée (permanente, survit au super-rebirth). */
  flawless: boolean
}

export interface UserProgress {
  userId: string
  /** slug du droid → entrée de collection */
  collection: Record<string, CollectionEntry>
  /** Niveau de rebirth actuel, 0 à 28. */
  rebirth: number
  /** Nombre de super-rebirths effectués. */
  superRebirth: number
  /** Cycle d'exigences actif, 1 à 4 (change à chaque super-rebirth). */
  cycle: number
  novaCrystals: number
  /** id d'article Nova Shop → niveau déjà acheté (0 = non acheté). */
  shopLevels: Record<string, number>
  updatedAt: Date
}
