/**
 * Génère `app/data/rebirths.json`.
 *
 * Chaque palier exige un seuil de crédits + 3 droids placés dans la base à un palier donné.
 * Un palier supérieur satisfait toujours une exigence inférieure (règle du jeu), ce qui est
 * appliqué côté app par `satisfies()` — ici on ne stocke que l'exigence minimale.
 *
 * `tier: null` = « n'importe quel palier » (les guides notent « any Legendary tier »).
 *
 * Depuis la MAJ du 9 juin 2026, les exigences cyclent sur 4 parcours après chaque
 * Super Rebirth. Les coûts en crédits sont identiques sur les 4 cycles ; seuls les droids
 * exigés changent. Seuls les paliers 21→28 des cycles 2-4 sont publiés à ce jour.
 *
 * Usage : pnpm run build:rebirths
 */
import { readFileSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const dataset = JSON.parse(readFileSync(resolve(root, 'app/data/droids.json'), 'utf8'))
const KNOWN = new Set(dataset.droids.map((d) => d.slug))

/** `['mouse', 'GOLD']` → exigence. `['mouse']` → n'importe quel palier. */
const req = (slug, tier = null) => ({ slug, tier })

/** Cycle 1, paliers 1 → 28. Source : tycoon-tools + Insider Gaming + Tech Nerdiness. */
const CYCLE_1 = [
  { level: 1, credits: 10_000, droids: [req('cb', 'DEFAULT'), req('pit', 'DEFAULT'), req('drk-1-probe', 'DEFAULT')] },
  { level: 2, credits: 150_000, droids: [req('bdx-explorer', 'DEFAULT'), req('2bb', 'DEFAULT'), req('bal-core', 'DEFAULT')] },
  { level: 3, credits: 975_000, droids: [req('a-lt', 'DEFAULT'), req('bu-4d', 'DEFAULT'), req('r9', 'GOLD')] },
  { level: 4, credits: 2_950_000, droids: [req('arg', 'GOLD'), req('b1-security', 'GOLD'), req('groundmech', 'DEFAULT')] },
  { level: 5, credits: 5_350_000, droids: [req('bu-4d', 'GOLD'), req('hov-r', 'GOLD'), req('r9', 'DIAMOND')] },
  { level: 6, credits: 9_850_000, droids: [req('groundmech', 'GOLD'), req('arg', 'DIAMOND'), req('a-lt', 'DIAMOND')] },
  { level: 7, credits: 14_500_000, droids: [req('bb', 'GOLD'), req('b1-security', 'DIAMOND'), req('bu-4d', 'DIAMOND')] },
  { level: 8, credits: 36_000_000, droids: [req('util-tec', 'GOLD'), req('lo', 'GOLD'), req('hov-r', 'DIAMOND')] },
  { level: 9, credits: 89_000_000, droids: [req('groundmech', 'RAINBOW'), req('r6', 'GOLD'), req('trak-r', 'GOLD')] },
  { level: 10, credits: 220_000_000, droids: [req('lo', 'RAINBOW'), req('haul-r', 'RAINBOW'), req('strike-orb', 'GOLD')] },
  { level: 11, credits: 550_000_000, droids: [req('amp-walker'), req('b1-heavy'), req('bb9', 'DEFAULT')] },
  { level: 12, credits: 1_360_000_000, droids: [req('proto-roller'), req('mecha-droid', 'DEFAULT'), req('mono-walker', 'DEFAULT')] },
  { level: 13, credits: 3_400_000_000, droids: [req('r7'), req('cyclo-grav'), req('b2-rp')] },
  { level: 14, credits: 8_450_000_000, droids: [req('opti-strike'), req('mono-walker'), req('mecha-droid')] },
  { level: 15, credits: 21_000_000_000, droids: [req('b2-rp'), req('bb9'), req('r7')] },
  { level: 16, credits: 52_000_000_000, droids: [req('opti-strike', 'GOLD'), req('mono-walker', 'DIAMOND'), req('proto-roller', 'DIAMOND')] },
  { level: 17, credits: 130_000_000_000, droids: [req('b2-rp', 'DIAMOND'), req('cyclo-grav', 'DIAMOND'), req('mecha-droid', 'DIAMOND')] },
  { level: 18, credits: 325_000_000_000, droids: [req('opti-strike'), req('r7'), req('mono-walker')] },
  { level: 19, credits: 810_000_000_000, droids: [req('b2-rp', 'RAINBOW'), req('cyclo-grav', 'RAINBOW'), req('proto-roller', 'RAINBOW')] },
  { level: 20, credits: 2e12, droids: [req('r7', 'RAINBOW'), req('opti-strike', 'RAINBOW'), req('mecha-droid', 'RAINBOW')] },
  { level: 21, credits: 3e12, droids: [] },
  { level: 22, credits: 4.5e12, droids: [req('amp-walker', 'BESKAR'), req('b1-heavy', 'BESKAR'), req('proto-roller', 'BESKAR')] },
  { level: 23, credits: 6e12, droids: [req('opti-strike', 'BESKAR'), req('mono-walker', 'BESKAR'), req('r7', 'BESKAR')] },
  { level: 24, credits: 9e12, droids: [req('bb9', 'BESKAR'), req('cyclo-grav', 'BESKAR'), req('mo-trak', 'DEFAULT')] },
  { level: 25, credits: 13.5e12, droids: [req('b2-rp', 'BESKAR'), req('ig', 'DEFAULT'), req('drft-r', 'GOLD')] },
  { level: 26, credits: 21e12, droids: [req('cyclens', 'GOLD'), req('loadlifter', 'DIAMOND'), req('ric-1200', 'RAINBOW')] },
  { level: 27, credits: 32e12, droids: [req('kx', 'DIAMOND'), req('tri-tek', 'RAINBOW'), req('snow-mouse', 'BESKAR')] },
  { level: 28, credits: 45e12, droids: [req('proto-roller', 'GALACTIC'), req('mo-trak', 'RAINBOW'), req('drft-r', 'BESKAR')] },
]

/**
 * Cycles 2-4 : seuls les paliers 21→28 sont documentés. Les paliers 1→20 sont décrits
 * qualitativement (« davantage de Rares en early game ») mais jamais tabulés — on les
 * laisse vides plutôt que d'inventer, et l'UI affiche « exigences non documentées ».
 */
const CYCLE_4_TAIL = [
  { level: 22, droids: [req('gunrunner', 'BESKAR'), req('strike-orb', 'BESKAR'), req('b2-super', 'BESKAR')] },
  { level: 28, droids: [req('opti-strike', 'GALACTIC'), req('ig', 'RAINBOW'), req('kx', 'BESKAR')] },
]

/** Droid exigé en palier Galactic au dernier rebirth, selon le cycle. */
const GALACTIC_FINAL = { 1: 'proto-roller', 2: 'mecha-droid', 3: 'bb9', 4: 'opti-strike' }

const errors = []
const checkAll = (levels, label) => {
  for (const lvl of levels) {
    for (const d of lvl.droids ?? []) {
      if (!KNOWN.has(d.slug)) errors.push(`${label} niveau ${lvl.level} : slug inconnu "${d.slug}"`)
    }
  }
}

checkAll(CYCLE_1, 'cycle 1')
checkAll(CYCLE_4_TAIL, 'cycle 4')
for (const [cycle, slug] of Object.entries(GALACTIC_FINAL)) {
  if (!KNOWN.has(slug)) errors.push(`cycle ${cycle} : slug Galactic inconnu "${slug}"`)
}

if (errors.length) {
  console.error('❌ Slugs invalides :\n  ' + errors.join('\n  '))
  process.exit(1)
}

/** Nova Crystals gagnés au Super Rebirth, selon le niveau de rebirth atteint. */
const NOVA_BY_REBIRTH = {
  12: 11, 13: 16, 14: 22, 15: 29, 16: 37, 17: 46, 18: 56,
  19: 67, 20: 79, 21: 92, 22: 106, 23: 121, 27: 191,
}

const out = {
  version: 1,
  maxRebirth: 28,
  /** Rebirth minimum + Legendary Rainbow requis pour débloquer le Super Rebirth. */
  superRebirthUnlock: { rebirth: 12, requires: 'legendaryRainbow' },
  /** Multiplicateur de crédits accordé par niveau de rebirth (relevé de 10 % à 20 %). */
  creditMultiplierPerLevel: 0.2,
  novaByRebirth: NOVA_BY_REBIRTH,
  galacticFinal: GALACTIC_FINAL,
  cycles: {
    1: CYCLE_1,
    // Coûts repris du cycle 1 (identiques), exigences inconnues sauf exceptions publiées.
    2: CYCLE_1.map(({ level, credits }) => ({ level, credits, droids: [], documented: false })),
    3: CYCLE_1.map(({ level, credits }) => ({ level, credits, droids: [], documented: false })),
    4: CYCLE_1.map(({ level, credits }) => {
      const known = CYCLE_4_TAIL.find((t) => t.level === level)
      return { level, credits, droids: known?.droids ?? [], documented: Boolean(known) }
    }),
  },
}

writeFileSync(resolve(root, 'app/data/rebirths.json'), `${JSON.stringify(out, null, 2)}\n`)

const documented = CYCLE_1.filter((l) => l.droids.length).length
console.log(`✅ ${CYCLE_1.length} paliers de rebirth → app/data/rebirths.json`)
console.log(`   cycle 1 : ${documented}/${CYCLE_1.length} paliers avec exigences documentées`)
console.log(`   cycles 2-3 : exigences non publiées · cycle 4 : ${CYCLE_4_TAIL.length} paliers connus`)
