/**
 * Génère `app/data/droids.json` à partir de deux sources :
 *  - `scripts/sources/droidStats.json` : chiffres bruts (coût / revenu / revente) par palier.
 *    Origine : github.com/erikpeik/droidex (données communautaires, dernier commit 2026-06-02).
 *  - `META` ci-dessous : rareté, type et droids absents du dataset (Mythic, Iconic récents),
 *    consolidés depuis tycoon-tools, Destructoid et NeonLightsMedia (juillet 2026).
 *
 * Les valeurs sources sont des chaînes lisibles ("15.20k", "2/s", "1.41m"). On les normalise
 * en nombres pour pouvoir trier et calculer côté app, tout en gardant le libellé d'origine.
 *
 * Usage : pnpm run build:droids
 */
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')

/** Paliers pour lesquels on dispose de chiffres. */
const TIERS = ['DEFAULT', 'GOLD', 'DIAMOND', 'RAINBOW', 'BESKAR']

/**
 * Palier introduit après Beskar, exigé au rebirth 27→28. Aucune source ne publie ses coûts
 * ni ses revenus (seule donnée : MONO-WALKER 36k/s → 90k/s, soit ×2.5 sur le Beskar).
 * On l'expose pour que l'UI puisse afficher la colonne, sans inventer de chiffres.
 */
const ALL_TIERS = [...TIERS, 'GALACTIC']

/** Rareté et type des 54 droids chiffrés, dans l'ordre du dataset source. */
const META = {
  // --- Common (11) ---
  'MOUSE': ['common', 'worker'],
  'PIT': ['common', 'worker'],
  'GONK': ['common', 'worker'],
  'CB': ['common', 'astromech'],
  'R3': ['common', 'astromech'],
  'R5': ['common', 'astromech'],
  'R8': ['common', 'astromech'],
  'IMPERIAL PROBE': ['common', 'battle'],
  'B1 BATTLE': ['common', 'battle'],
  'DRK-1 PROBE': ['common', 'battle'],
  'ID10': ['common', 'battle'],
  // --- Rare (14) ---
  'BDX EXPLORER': ['rare', 'worker'],
  'ARG': ['rare', 'worker'],
  'SENATE HOVERCAM': ['rare', 'worker'],
  'BU-4D': ['rare', 'worker'],
  'BAL-CORE': ['rare', 'worker'],
  'ROLL-R': ['rare', 'worker'],
  '2BB': ['rare', 'astromech'],
  'A-LT': ['rare', 'astromech'],
  'R4': ['rare', 'astromech'],
  'R9': ['rare', 'astromech'],
  'B1 SECURITY': ['rare', 'battle'],
  'NAV-EX': ['rare', 'battle'],
  'VECT-ARM': ['rare', 'battle'],
  'HOV-R': ['rare', 'battle'],
  // --- Epic (18) ---
  'GROUNDMECH': ['epic', 'worker'],
  'LO': ['epic', 'worker'],
  'AMP WALKER': ['epic', 'worker'],
  'SEN-TRI': ['epic', 'worker'],
  'OPTI-POD': ['epic', 'worker'],
  'GUNRUNNER': ['epic', 'worker'],
  'BB': ['epic', 'astromech'],
  'R2': ['epic', 'astromech'],
  'R6': ['epic', 'astromech'],
  'TRAK-R': ['epic', 'astromech'],
  'ORB-WALKER': ['epic', 'astromech'],
  'UTIL-TEC': ['epic', 'astromech'],
  'B1 HEAVY': ['epic', 'battle'],
  'B2 SUPER': ['epic', 'battle'],
  'B2 HEAVY': ['epic', 'battle'],
  'STRIKE-ORB': ['epic', 'battle'],
  'HAUL-R': ['epic', 'battle'],
  'LNG-SHOT': ['epic', 'battle'],
  // --- Legendary (8) ---
  'PROTO-ROLLER': ['legendary', 'worker'],
  'MECHA-DROID': ['legendary', 'worker'],
  'MONO-WALKER': ['legendary', 'worker'],
  'BB9': ['legendary', 'astromech'],
  'R7': ['legendary', 'astromech'],
  'B2-RP': ['legendary', 'battle'],
  'CYCLO-GRAV': ['legendary', 'battle'],
  'OPTI-STRIKE': ['legendary', 'battle'],
  // --- Iconic présents dans le dataset (3) ---
  'BB8': ['iconic', 'astromech'],
  'MISTER BONES': ['iconic', 'battle'],
  'IG-11 MARSHAL': ['iconic', 'battle'],
}

/**
 * Droids absents de droidStats.json (ajoutés au jeu après le 2 juin 2026).
 * `baseIncome` et `baseCost` proviennent de Destructoid / NeonLightsMedia ; la progression
 * par palier suit ×2 jusqu'à Rainbow puis ×2 pour Beskar (règle confirmée sur les Mythic).
 * `unverified: true` → l'app affiche un badge « donnée non vérifiée ».
 */
const EXTRA = [
  // Mythic (11) — obtenus via blueprints au Sandcrawler
  { name: 'LOADLIFTER', rarity: 'mythic', type: 'worker', baseIncome: 7200, baseCost: 300e6 },
  { name: 'MO-TRAK', rarity: 'mythic', type: 'astromech', baseIncome: 7200, baseCost: 300e6 },
  { name: 'KX', rarity: 'mythic', type: 'battle', baseIncome: 7200, baseCost: 300e6 },
  { name: 'LEP', rarity: 'mythic', type: 'worker', baseIncome: 6500, baseCost: 252e6 },
  { name: 'TRI-TEK', rarity: 'mythic', type: 'astromech', baseIncome: 6500, baseCost: 252e6 },
  { name: 'RIC-1200', rarity: 'mythic', type: 'worker', baseIncome: 5800, baseCost: 228e6 },
  { name: 'DRFT-R', rarity: 'mythic', type: 'astromech', baseIncome: 5800, baseCost: 228e6 },
  { name: 'IG', rarity: 'mythic', type: 'battle', baseIncome: 5800, baseCost: 228e6 },
  { name: 'RIC', rarity: 'mythic', type: 'worker', baseIncome: 5100, baseCost: 204e6 },
  { name: 'SNOW MOUSE', rarity: 'mythic', type: 'worker', baseIncome: 4400, baseCost: 180e6 },
  { name: 'CYCLENS', rarity: 'mythic', type: 'astromech', baseIncome: 4400, baseCost: 180e6 },
  // Iconic event-locked absents du dataset (4) — revenu en % du total, palier unique
  { name: 'DJ-R3X', rarity: 'iconic', type: 'worker', percentIncome: true, perk: 'perk.djr3x' },
  { name: 'CB-23', rarity: 'iconic', type: 'astromech', percentIncome: true, perk: 'perk.cb23' },
  { name: 'R2-D2', rarity: 'iconic', type: 'astromech', percentIncome: true },
  { name: 'C-3P0', rarity: 'iconic', type: 'worker', percentIncome: true },
]

/** Perks des Iconic déjà présents dans le dataset. */
const ICONIC_PERKS = {
  'BB8': 'perk.bb8',
  'MISTER BONES': 'perk.misterBones',
  'IG-11 MARSHAL': 'perk.ig11',
}

/**
 * Revenu des Iconic, exprimé en % du revenu total (ils ne suivent pas la courbe normale).
 * R2-D2 et C-3P0 sont à 25 %, les cinq autres à 15 % — vérifié sur la base du tracker.
 */
const ICONIC_PERCENT = {
  'BB8': 15,
  'MISTER BONES': 15,
  'IG-11 MARSHAL': 15,
  'DJ-R3X': 15,
  'CB-23': 15,
  'R2-D2': 25,
  'C-3P0': 25,
}

/**
 * Perks des Mythic, déterminés par la classe du droid (confirmé par plusieurs guides) :
 * Worker = +30 % vitesse de craft · Astromech = +5 niveaux de pioche · Battle = +100 PV max.
 */
const MYTHIC_PERKS = {
  worker: 'perk.mythicWorker',
  astromech: 'perk.mythicAstromech',
  battle: 'perk.mythicBattle',
}

/**
 * Chaque palier a sa propre illustration : `{assetKey}_{TIER}.png`.
 * GALACTIC n'a aucun asset publié (palier trop récent) → on retombe sur le visuel Beskar
 * en marquant le fallback, pour que l'UI puisse afficher un liseré « visuel provisoire ».
 */
function imageFor(assetKey, tier) {
  if (tier === 'GALACTIC') {
    return { file: `${assetKey}_BESKAR.png`, isFallback: true }
  }
  return { file: `${assetKey}_${tier}.png`, isFallback: false }
}

/** "15.20k" → 15200 · "1.41m" → 1410000 · "2/s" → 2 · "24b" → 24e9 */
function toNumber(raw) {
  if (raw == null) return null
  const s = String(raw).trim().replace('/s', '')
  const m = s.match(/^([\d.]+)\s*([kmb])?$/i)
  if (!m) return null
  const n = Number.parseFloat(m[1])
  if (Number.isNaN(n)) return null
  const mult = { k: 1e3, m: 1e6, b: 1e9 }[(m[2] || '').toLowerCase()] ?? 1
  return n * mult
}

/**
 * Le pourcentage retenu contredit-il celui que porte la source ?
 *
 * `incomeLabel` conserve le libellé brut (« 5%/s ») ; on en extrait le nombre pour le
 * comparer à la table. Absence de libellé = aucune source à contredire.
 */
function percentContreditLaSource(name, tiers) {
  const label = tiers?.DEFAULT?.income
  const m = typeof label === 'string' ? label.match(/^([\d.]+)\s*%/) : null
  if (!m) return false
  return Number.parseFloat(m[1]) !== ICONIC_PERCENT[name]
}

/** "IMPERIAL PROBE" → "imperial-probe" (identifiant stable côté base et URL). */
const toSlug = (name) => name.toLowerCase().replace(/\s+/g, '-')

/** "IMPERIAL PROBE" → "IMPERIAL_PROBE" (convention de nommage des fichiers images). */
const toAssetKey = (name) => name.replace(/\s+/g, '_')

const stats = JSON.parse(readFileSync(resolve(root, 'scripts/sources/droidStats.json'), 'utf8'))
const droids = []

for (const [name, tiers] of Object.entries(stats)) {
  const meta = META[name]
  if (!meta) {
    console.warn(`⚠️  Aucune métadonnée pour "${name}" — droid ignoré.`)
    continue
  }
  const [rarity, type] = meta
  const isIconic = rarity === 'iconic'

  droids.push({
    slug: toSlug(name),
    name,
    assetKey: toAssetKey(name),
    rarity,
    type,
    // Les Iconic n'ont qu'un palier et un revenu exprimé en % du revenu total.
    percentIncome: isIconic,
    percentValue: isIconic ? (ICONIC_PERCENT[name] ?? null) : null,
    perk: ICONIC_PERKS[name] ?? null,
    /**
     * Marque le droid dès que `ICONIC_PERCENT` contredit le libellé de la source.
     *
     * Trois Iconiques sont dans ce cas : `droidStats.json` annonce « 5%/s » quand la table
     * ci-dessus impose 15 — deux trackers communautaires qui divergent d'un facteur 3. On
     * ne tranche pas ici lequel a raison, mais on cesse d'afficher la valeur retenue avec
     * l'assurance d'un fait établi : l'interface pose son ⚠ comme pour les autres données
     * extrapolées, et le libellé d'origine reste lisible dans `incomeLabel`.
     */
    unverified: isIconic && percentContreditLaSource(name, tiers),
    tiers: Object.fromEntries(
      // Les Iconic n'existent qu'en palier unique ; les autres ont les 5 paliers chiffrés
      // plus GALACTIC, connu mais non chiffré.
      (isIconic ? ['DEFAULT'] : ALL_TIERS).map((t) => {
        const src = tiers[t]
        const { file, isFallback } = imageFor(toAssetKey(name), t)
        return [
          t,
          {
            income: toNumber(src?.income),
            incomeLabel: src?.income ?? null,
            cost: toNumber(src?.cost),
            costLabel: src?.cost ?? null,
            value: toNumber(src?.value),
            valueLabel: src?.value ?? null,
            image: file,
            imageIsFallback: isFallback,
          },
        ]
      }),
    ),
  })
}

for (const extra of EXTRA) {
  const { name, rarity, type, baseIncome, baseCost, percentIncome, perk } = extra
  const tiers = {}

  const assetKey = toAssetKey(name)
  const blank = (tier) => {
    const { file, isFallback } = imageFor(assetKey, tier)
    return {
      income: null,
      incomeLabel: null,
      cost: null,
      costLabel: null,
      value: null,
      valueLabel: null,
      image: file,
      imageIsFallback: isFallback,
    }
  }

  if (!percentIncome) {
    // Progression ×2 par palier jusqu'à Beskar. GALACTIC reste vide : le seul point
    // de comparaison public (MONO-WALKER ×2.5) ne suffit pas à généraliser une formule.
    ALL_TIERS.forEach((tier, i) => {
      tiers[tier] = blank(tier)
      if (tier === 'GALACTIC') return
      tiers[tier].income = baseIncome * 2 ** i
      if (i === 0) tiers[tier].cost = baseCost
    })
  }
  else {
    tiers.DEFAULT = blank('DEFAULT')
  }

  droids.push({
    slug: toSlug(name),
    name,
    assetKey,
    rarity,
    type,
    percentIncome: Boolean(percentIncome),
    percentValue: percentIncome ? (ICONIC_PERCENT[name] ?? null) : null,
    perk: perk ?? (rarity === 'mythic' ? MYTHIC_PERKS[type] : null),
    // Ces chiffres sont extrapolés ou issus de guides secondaires, pas du dataset de référence.
    unverified: true,
    tiers,
  })
}

const RARITY_ORDER = ['common', 'rare', 'epic', 'legendary', 'mythic', 'iconic']
droids.sort(
  (a, b) =>
    RARITY_ORDER.indexOf(a.rarity) - RARITY_ORDER.indexOf(b.rarity)
    || (a.tiers.DEFAULT?.income ?? 0) - (b.tiers.DEFAULT?.income ?? 0),
)

const out = {
  // Permet d'invalider les collections utilisateur si le schéma change.
  version: 1,
  generatedFrom: 'erikpeik/droidex@2026-06-02 + guides communautaires juillet 2026',
  tiers: ALL_TIERS,
  /** Paliers réellement chiffrés — GALACTIC est connu mais sans données publiées. */
  quantifiedTiers: TIERS,
  rarities: RARITY_ORDER,
  types: ['worker', 'astromech', 'battle'],
  droids,
}

mkdirSync(resolve(root, 'app/data'), { recursive: true })
writeFileSync(resolve(root, 'app/data/droids.json'), `${JSON.stringify(out, null, 2)}\n`)

const byRarity = RARITY_ORDER.map((r) => `${r}: ${droids.filter((d) => d.rarity === r).length}`).join(' · ')
console.log(`✅ ${droids.length} droids générés → app/data/droids.json`)
console.log(`   ${byRarity}`)
console.log(`   ${droids.filter((d) => d.unverified).length} marqués « non vérifié »`)
