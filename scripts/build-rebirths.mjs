/**
 * Génère `app/data/rebirths.json`.
 *
 * Chaque palier exige un seuil de crédits et trois droids placés dans la base à un palier
 * donné. Un palier supérieur satisfait toujours une exigence inférieure (règle du jeu),
 * appliquée côté app par `satisfies()` : on ne stocke ici que l'exigence minimale.
 *
 * Depuis la mise à jour du 9 juin 2026, les exigences cyclent sur quatre parcours, un
 * nouveau s'enclenchant à chaque Super Rebirth. Les coûts en crédits sont identiques sur
 * les quatre cycles ; seuls les droids exigés changent.
 *
 * PROVENANCE — à lire avant de toucher aux tableaux.
 *
 * Les quatre cycles viennent d'une **source unique**, tycoon-tools.com/droid-tycoon/
 * rebirth-requirements/. Aucune corroboration indépendante n'a été trouvée : les autres
 * sites communautaires consultés semblent dériver du même tracker amont. Le cycle 1 y
 * correspond à 26 paliers sur 28 aux données que nous tenions d'ailleurs, ce qui a motivé
 * de lui faire confiance pour les trois autres — mais confirme aussi que nos données
 * d'origine venaient probablement de là, donc que le recoupement n'en est pas vraiment un.
 *
 * Chaque exigence porte donc `sourceUnique: true`, et l'app le signale. C'est le même
 * principe que `unverified` sur les droids : montrer la donnée, dire d'où elle vient.
 *
 * Usage : pnpm run build:rebirths
 */
import { readFileSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const dataset = JSON.parse(readFileSync(resolve(root, 'app/data/droids.json'), 'utf8'))
const KNOWN = new Set(dataset.droids.map((d) => d.slug))

/** Codes de palier employés dans les tableaux ci-dessous, pour qu'ils restent lisibles. */
const TIER = { B: 'DEFAULT', G: 'GOLD', D: 'DIAMOND', R: 'RAINBOW', K: 'BESKAR', X: 'GALACTIC' }

/**
 * La source nomme les droids comme le jeu les affiche ; nous les indexons par slug.
 * La conversion est mécanique (minuscules, espaces en tirets) sauf pour deux abréviations
 * de l'interface, que cette table rattrape.
 */
const ALIAS = { 'MONO-WLKR': 'mono-walker', 'OPTI-STRK': 'opti-strike' }

const versSlug = (nom) => ALIAS[nom] ?? nom.toLowerCase().replace(/\s+/g, '-')

/** `'G BU-4D'` → `{ slug: 'bu-4d', tier: 'GOLD' }`. */
function req(entree) {
  const [code, ...reste] = entree.split(' ')
  const tier = TIER[code]
  if (!tier) throw new Error(`Code de palier inconnu : "${code}" dans "${entree}"`)
  return { slug: versSlug(reste.join(' ')), tier }
}

/**
 * Coûts en crédits, paliers 1 à 28. Identiques sur les quatre cycles — c'est la source qui
 * l'énonce, et la courbe le corrobore : ×2,5 par palier du 8 au 20, puis ×1,5 jusqu'au 28,
 * une régularité qui décrit une propriété du palier, pas du cycle.
 */
const CREDITS = [
  10e3, 150e3, 975e3, 2.95e6, 5.35e6, 9.85e6, 14.5e6, 36e6, 89e6, 220e6,
  550e6, 1.36e9, 3.4e9, 8.45e9, 21e9, 52e9, 130e9, 325e9, 810e9, 2e12,
  3e12, 4.5e12, 6e12, 9e12, 13.5e12, 21e12, 32e12, 45e12,
]

/** Exigences par cycle, paliers 1 à 28, trois droids chacun. */
const CYCLES = {
  1: [
    ['B CB', 'B PIT', 'B DRK-1 PROBE'],
    ['B BDX EXPLORER', 'B 2BB', 'B BAL-CORE'],
    ['B A-LT', 'B BU-4D', 'G R9'],
    ['G ARG', 'G B1 SECURITY', 'B GROUNDMECH'],
    ['G BU-4D', 'G HOV-R', 'D R9'],
    ['D A-LT', 'D ARG', 'G GROUNDMECH'],
    ['D BU-4D', 'D B1 SECURITY', 'G BB'],
    ['D HOV-R', 'G LO', 'G UTIL-TEC'],
    ['G TRAK-R', 'G R6', 'R GROUNDMECH'],
    ['G STRIKE-ORB', 'R HAUL-R', 'R LO'],
    ['R AMP WALKER', 'R B1 HEAVY', 'B BB9'],
    ['G PROTO-ROLLER', 'B MECHA-DROID', 'B MONO-WLKR'],
    ['B R7', 'B CYCLO-GRAV', 'B B2-RP'],
    ['B OPTI-STRK', 'G MONO-WLKR', 'G MECHA-DROID'],
    ['G B2-RP', 'G BB9', 'G R7'],
    ['G OPTI-STRK', 'D MONO-WLKR', 'D PROTO-ROLLER'],
    ['D B2-RP', 'D CYCLO-GRAV', 'D MECHA-DROID'],
    ['D BB9', 'D R7', 'R MONO-WLKR'],
    ['R B2-RP', 'R CYCLO-GRAV', 'R PROTO-ROLLER'],
    ['R R7', 'R OPTI-STRK', 'R MECHA-DROID'],
    ['K BB', 'K ORB-WALKER', 'K GROUNDMECH'],
    ['K AMP WALKER', 'K B1 HEAVY', 'K PROTO-ROLLER'],
    ['K OPTI-STRK', 'K MONO-WLKR', 'K R7'],
    ['K BB9', 'K CYCLO-GRAV', 'B MO-TRAK'],
    ['K B2-RP', 'B IG', 'G DRFT-R'],
    ['G CYCLENS', 'D LOADLIFTER', 'R RIC-1200'],
    ['D KX', 'R TRI-TEK', 'K SNOW MOUSE'],
    ['X PROTO-ROLLER', 'R MO-TRAK', 'K DRFT-R'],
  ],
  2: [
    ['B ID10', 'B MOUSE', 'B GONK'],
    ['B ROLL-R', 'B SENATE HOVERCAM', 'B NAV-EX'],
    ['B R4', 'B VECT-ARM', 'G BDX EXPLORER'],
    ['G 2BB', 'G BAL-CORE', 'B ORB-WALKER'],
    ['G R4', 'G VECT-ARM', 'G NAV-EX'],
    ['B GUNRUNNER', 'D 2BB', 'D BAL-CORE'],
    ['D ROLL-R', 'D BDX EXPLORER', 'G R2'],
    ['D R4', 'G B2 SUPER', 'G GUNRUNNER'],
    ['R NAV-EX', 'G STRIKE-ORB', 'G AMP WALKER'],
    ['R VECT-ARM', 'D R2', 'D B2 SUPER'],
    ['R BAL-CORE', 'D STRIKE-ORB', 'D B2 HEAVY'],
    ['R ORB-WALKER', 'R R2', 'B BB9'],
    ['R B2 SUPER', 'B MECHA-DROID', 'B PROTO-ROLLER'],
    ['R B2 HEAVY', 'B B2-RP', 'G R7'],
    ['R STRIKE-ORB', 'G BB9', 'G PROTO-ROLLER'],
    ['R AMP WALKER', 'G MECHA-DROID', 'D B2-RP'],
    ['R OPTI-POD', 'G MONO-WLKR', 'D R7'],
    ['R UTIL-TEC', 'D BB9', 'D PROTO-ROLLER'],
    ['D MECHA-DROID', 'R R7', 'R B2-RP'],
    ['R MONO-WLKR', 'R OPTI-STRK', 'R CYCLO-GRAV'],
    ['K LO', 'K R6', 'K HAUL-R'],
    ['K SEN-TRI', 'K STRIKE-ORB', 'K PROTO-ROLLER'],
    ['K BB9', 'K CYCLO-GRAV', 'K B2-RP'],
    ['K OPTI-STRK', 'K B2-RP', 'B SNOW MOUSE'],
    ['K MONO-WLKR', 'G TRI-TEK', 'B RIC-1200'],
    ['G KX', 'D DRFT-R', 'R IG'],
    ['D LEP', 'R LOADLIFTER', 'K MO-TRAK'],
    ['X MECHA-DROID', 'R SNOW MOUSE', 'K TRI-TEK'],
  ],
  3: [
    ['B MOUSE', 'B PIT', 'B GONK'],
    ['B R3', 'B 2BB', 'B SENATE HOVERCAM'],
    ['B R8', 'B R5', 'B R4'],
    ['G B1 BATTLE', 'G R9', 'G B1 SECURITY'],
    ['G R3', 'G 2BB', 'G SENATE HOVERCAM'],
    ['D R5', 'D R4', 'D BDX EXPLORER'],
    ['D R8', 'D B1 BATTLE', 'D R9'],
    ['R R3', 'R 2BB', 'R B1 SECURITY'],
    ['R R5', 'R R4', 'R BDX EXPLORER'],
    ['R SENATE HOVERCAM', 'B GROUNDMECH', 'B TRAK-R'],
    ['B B2 HEAVY', 'B B2 SUPER', 'B UTIL-TEC'],
    ['R BAL-CORE', 'G GROUNDMECH', 'G TRAK-R'],
    ['R B2 SUPER', 'B MECHA-DROID', 'B PROTO-ROLLER'],
    ['R B2 HEAVY', 'B B2-RP', 'G R7'],
    ['R STRIKE-ORB', 'G BB9', 'G PROTO-ROLLER'],
    ['R AMP WALKER', 'G MECHA-DROID', 'D B2-RP'],
    ['R OPTI-POD', 'G MONO-WLKR', 'D R7'],
    ['R UTIL-TEC', 'D BB9', 'D PROTO-ROLLER'],
    ['D MECHA-DROID', 'R R7', 'R B2-RP'],
    ['R MONO-WLKR', 'R OPTI-STRK', 'R CYCLO-GRAV'],
    ['K B2 SUPER', 'K OPTI-POD', 'K R2'],
    ['K GUNRUNNER', 'K LNG-SHOT', 'K B2-RP'],
    ['K MONO-WLKR', 'K CYCLO-GRAV', 'K MECHA-DROID'],
    ['K BB9', 'K B2-RP', 'B RIC'],
    ['K PROTO-ROLLER', 'B LOADLIFTER', 'G MO-TRAK'],
    ['G LEP', 'D TRI-TEK', 'R SNOW MOUSE'],
    ['D RIC-1200', 'R IG', 'K DRFT-R'],
    ['X BB9', 'R RIC', 'K MO-TRAK'],
  ],
  4: [
    ['B ID10', 'B PIT', 'B DRK-1 PROBE'],
    ['B R3', 'B 2BB', 'B SENATE HOVERCAM'],
    ['G R5', 'G R8', 'B R4'],
    ['G B1 BATTLE', 'G R9', 'G B1 SECURITY'],
    ['G R3', 'G 2BB', 'G SENATE HOVERCAM'],
    ['D R5', 'D R4', 'D BDX EXPLORER'],
    ['D R8', 'D B1 BATTLE', 'D R9'],
    ['R R3', 'R B1 SECURITY', 'R 2BB'],
    ['R R5', 'R R4', 'R BDX EXPLORER'],
    ['R SENATE HOVERCAM', 'B GROUNDMECH', 'B TRAK-R'],
    ['B B2 HEAVY', 'B B2 SUPER', 'B UTIL-TEC'],
    ['R BAL-CORE', 'G GROUNDMECH', 'G TRAK-R'],
    ['R B2 SUPER', 'B MECHA-DROID', 'B PROTO-ROLLER'],
    ['D BAL-CORE', 'D GROUNDMECH', 'R TRAK-R'],
    ['D B2 HEAVY', 'R B2 SUPER', 'B B2-RP'],
    ['R UTIL-TEC', 'B BB9', 'G R7'],
    ['B OPTI-STRK', 'G CYCLO-GRAV', 'G MECHA-DROID'],
    ['G B2-RP', 'G BB9', 'D R7'],
    ['D MECHA-DROID', 'R R7', 'R B2-RP'],
    ['R MONO-WLKR', 'R OPTI-STRK', 'R CYCLO-GRAV'],
    ['K AMP WALKER', 'K GROUNDMECH', 'K HAUL-R'],
    ['K GUNRUNNER', 'K STRIKE-ORB', 'K B2 SUPER'],
    ['K MONO-WLKR', 'K CYCLO-GRAV', 'K B2-RP'],
    ['K MECHA-DROID', 'K PROTO-ROLLER', 'B MO-TRAK'],
    ['K OPTI-STRK', 'B TRI-TEK', 'G DRFT-R'],
    ['G CYCLENS', 'D LEP', 'R MO-TRAK'],
    ['D RIC-1200', 'R SNOW MOUSE', 'K LOADLIFTER'],
    ['X OPTI-STRK', 'R IG', 'K KX'],
  ],
}

/**
 * Repère les paliers rigoureusement identiques entre deux cycles.
 *
 * Des cycles dont la raison d'être est d'exiger des droids *différents* ne devraient pas
 * l'être. Or la source en présente deux blocs contigus — cycles 2 et 3 aux paliers 13-20,
 * cycles 3 et 4 aux paliers 4-13 — un motif contigu qui est la signature d'un copier-coller
 * côté source bien plus que d'un choix de conception.
 *
 * Le calcul est fait ici plutôt que codé en dur : si la source se corrige un jour, le
 * signalement disparaîtra de lui-même au lieu de mentir en sens inverse.
 */
function paliersDupliques() {
  const empreinte = (exigences) => exigences.map((e) => `${e.slug}:${e.tier}`).sort().join('|')
  const marque = {}
  const ids = Object.keys(CYCLES)

  for (let i = 0; i < ids.length; i++) {
    for (let j = i + 1; j < ids.length; j++) {
      const a = ids[i]
      const b = ids[j]
      for (let n = 0; n < CREDITS.length; n++) {
        if (empreinte(CYCLES[a][n].map(req)) !== empreinte(CYCLES[b][n].map(req))) continue
        marque[a] ??= {}
        marque[b] ??= {}
        marque[a][n + 1] = [...new Set([...(marque[a][n + 1] ?? []), Number(b)])]
        marque[b][n + 1] = [...new Set([...(marque[b][n + 1] ?? []), Number(a)])]
      }
    }
  }
  return marque
}

const dupes = paliersDupliques()

/** Nova Crystals gagnés au Super Rebirth, selon le niveau de rebirth atteint. */
const NOVA_BY_REBIRTH = {
  12: 11, 13: 16, 14: 22, 15: 29, 16: 37, 17: 46, 18: 56,
  19: 67, 20: 79, 21: 92, 22: 106, 23: 121, 27: 191,
}

const errors = []

const cycles = Object.fromEntries(
  Object.entries(CYCLES).map(([id, table]) => {
    if (table.length !== CREDITS.length) {
      errors.push(`cycle ${id} : ${table.length} paliers pour ${CREDITS.length} coûts`)
    }
    return [
      id,
      table.map((exigences, i) => {
        const droids = exigences.map(req)
        for (const d of droids) {
          if (!KNOWN.has(d.slug)) errors.push(`cycle ${id} palier ${i + 1} : slug inconnu "${d.slug}"`)
        }
        const identique = dupes[id]?.[i + 1]
        return {
          level: i + 1,
          credits: CREDITS[i],
          droids,
          sourceUnique: true,
          ...(identique ? { identiqueAuxCycles: identique } : {}),
        }
      }),
    ]
  }),
)

if (errors.length) {
  console.error('❌ Données invalides :\n  ' + errors.join('\n  '))
  process.exit(1)
}

const out = {
  /**
   * Plafond CONTESTÉ. La source annonce 28 paliers par cycle, mais sa propre table de
   * cristaux Nova s'arrête à 27, et d'autres pages communautaires parlent de 23. Aucune
   * note de patch officielle n'a été retrouvée. On retient 28, seule valeur cohérente avec
   * les tableaux d'exigences eux-mêmes, en sachant qu'elle n'est pas établie.
   */
  maxRebirth: 28,
  /** Rebirth minimum requis pour débloquer le Super Rebirth. */
  superRebirthUnlock: { rebirth: 12, requires: 'legendaryRainbow' },
  /** Multiplicateur de crédits accordé par niveau de rebirth (relevé de 10 % à 20 %). */
  creditMultiplierPerLevel: 0.2,
  novaByRebirth: NOVA_BY_REBIRTH,
  cycles,
}

writeFileSync(resolve(root, 'app/data/rebirths.json'), `${JSON.stringify(out, null, 2)}\n`)

const nbDupes = Object.values(dupes).reduce((n, m) => n + Object.keys(m).length, 0)
console.log(`✅ 4 cycles × ${CREDITS.length} paliers → app/data/rebirths.json`)
console.log('   coûts identiques sur les 4 cycles, tous les paliers renseignés')
console.log(`   ⚠ ${nbDupes} paliers identiques entre cycles, marqués identiqueAuxCycles`)
console.log('   ⚠ source unique (tycoon-tools) : toutes les exigences portent sourceUnique')
