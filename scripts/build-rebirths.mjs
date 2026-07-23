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
 * Les quatre cycles, sur 30 paliers, viennent de srbcontrol.com (« SRB Tracker »), un
 * outil communautaire. Ils ont été recoupés avec deux autres sources : nos données
 * antérieures (tycoon-tools, qui s'arrêtait à 28 paliers) et des captures d'un tableau
 * communautaire — les trois concordent sur 111 des 112 premiers paliers, ce qui a établi
 * la confiance et fait passer le plafond de 28 à 30. Restent deux réserves, portées dans
 * la donnée elle-même plutôt que tues :
 *
 *   - `sourceUnique: true` sur chaque exigence. Ces sources ne sont pas indépendantes :
 *     elles dérivent vraisemblablement d'un même relevé communautaire. Montrer la donnée,
 *     dire d'où elle vient — le même principe que `unverified` sur les droids.
 *   - `identiqueAuxCycles` sur les paliers qu'un cycle partage à l'identique avec un autre.
 *     Le fait est calculé, pas asséné : des cycles censés exiger des droids différents en
 *     partagent des blocs entiers. Les trois sources l'affichent, donc c'est soit un trait
 *     réel du jeu, soit une erreur commune à leur ancêtre. On le signale sans trancher.
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
 * La conversion est mécanique (minuscules, espaces en tirets) sauf « Util-Tech », que la
 * source orthographie avec un h final absent de notre catalogue (`util-tec`).
 */
const ALIAS = { 'UTIL-TECH': 'util-tec' }

const versSlug = (nom) => ALIAS[nom] ?? nom.toLowerCase().replace(/\s+/g, '-')

/** `'G BU-4D'` → `{ slug: 'bu-4d', tier: 'GOLD' }`. */
function req(entree) {
  const [code, ...reste] = entree.split(' ')
  const tier = TIER[code]
  if (!tier) throw new Error(`Code de palier inconnu : "${code}" dans "${entree}"`)
  return { slug: versSlug(reste.join(' ')), tier }
}

/**
 * Coûts en crédits, paliers 1 à 30. Identiques sur les quatre cycles — c'est la source qui
 * l'énonce, et la courbe le corrobore : ×2,5 par palier du 8 au 20, puis ×1,5 jusqu'au 30,
 * une régularité qui décrit une propriété du palier, pas du cycle.
 */
const CREDITS = [
  10e3, 150e3, 975e3, 2.95e6, 5.35e6, 9.85e6, 14.5e6, 36e6, 89e6, 220e6,
  550e6, 1.36e9, 3.4e9, 8.45e9, 21e9, 52e9, 130e9, 325e9, 810e9, 2e12,
  3e12, 4.5e12, 6e12, 9e12, 13.5e12, 21e12, 32e12, 45e12, 68e12, 100e12,
]

/** Exigences par cycle, paliers 1 à 30, trois droids chacun. */
const CYCLES = {
  1: [
    ['B PIT', 'B CB', 'B DRK-1 PROBE'],
    ['B BDX EXPLORER', 'B BAL-CORE', 'B 2BB'],
    ['B A-LT', 'B BU-4D', 'G R9'],
    ['G ARG', 'G B1 SECURITY', 'B GROUNDMECH'],
    ['G BU-4D', 'G HOV-R', 'D R9'],
    ['G GROUNDMECH', 'D ARG', 'D A-LT'],
    ['G BB', 'D B1 SECURITY', 'D BU-4D'],
    ['G UTIL-TECH', 'G LO', 'D HOV-R'],
    ['R GROUNDMECH', 'G R6', 'G TRAK-R'],
    ['R LO', 'R HAUL-R', 'G STRIKE-ORB'],
    ['R AMP WALKER', 'R B1 HEAVY', 'B BB9'],
    ['G PROTO-ROLLER', 'B MONO-WALKER', 'B MECHA-DROID'],
    ['B R7', 'B CYCLO-GRAV', 'B B2-RP'],
    ['B OPTI-STRIKE', 'G MONO-WALKER', 'G MECHA-DROID'],
    ['G B2-RP', 'G BB9', 'G R7'],
    ['G OPTI-STRIKE', 'D MONO-WALKER', 'D PROTO-ROLLER'],
    ['D B2-RP', 'D MECHA-DROID', 'D CYCLO-GRAV'],
    ['D BB9', 'D R7', 'R MONO-WALKER'],
    ['R B2-RP', 'R CYCLO-GRAV', 'R PROTO-ROLLER'],
    ['R R7', 'R OPTI-STRIKE', 'R MECHA-DROID'],
    ['K BB', 'K ORB-WALKER', 'K GROUNDMECH'],
    ['K AMP WALKER', 'K B1 HEAVY', 'K PROTO-ROLLER'],
    ['K OPTI-STRIKE', 'K MONO-WALKER', 'K R7'],
    ['K BB9', 'K CYCLO-GRAV', 'B MO-TRAK'],
    ['K B2-RP', 'B IG', 'G DRFT-R'],
    ['G CYCLENS', 'D LOADLIFTER', 'R RIC-1200'],
    ['D KX', 'R TRI-TEK', 'K SNOW MOUSE'],
    ['R MO-TRAK', 'K DRFT-R', 'X PROTO-ROLLER'],
    ['K IG', 'X MONO-WALKER', 'X MECHA-DROID'],
    ['X B2-RP', 'K CYCLENS', 'X LOADLIFTER'],
  ],
  2: [
    ['B MOUSE', 'B GONK', 'B ID10'],
    ['B ROLL-R', 'B NAV-EX', 'B SENATE HOVERCAM'],
    ['B R4', 'B VECT-ARM', 'G BDX EXPLORER'],
    ['G 2BB', 'G BAL-CORE', 'B ORB-WALKER'],
    ['G R4', 'G VECT-ARM', 'G NAV-EX'],
    ['B GUNRUNNER', 'D 2BB', 'D BAL-CORE'],
    ['D ROLL-R', 'D BDX EXPLORER', 'G R2'],
    ['D R4', 'G B2 SUPER', 'G GUNRUNNER'],
    ['R NAV-EX', 'G AMP WALKER', 'G STRIKE-ORB'],
    ['R VECT-ARM', 'D R2', 'D B2 SUPER'],
    ['D STRIKE-ORB', 'D B2 HEAVY', 'R BAL-CORE'],
    ['R ORB-WALKER', 'R R2', 'B BB9'],
    ['R B2 SUPER', 'B MECHA-DROID', 'B PROTO-ROLLER'],
    ['R B2 HEAVY', 'G B2-RP', 'G R7'],
    ['R STRIKE-ORB', 'G BB9', 'G PROTO-ROLLER'],
    ['D B2-RP', 'R AMP WALKER', 'G MECHA-DROID'],
    ['R OPTI-POD', 'D R7', 'G MONO-WALKER'],
    ['R UTIL-TECH', 'D BB9', 'D PROTO-ROLLER'],
    ['D MECHA-DROID', 'R R7', 'R B2-RP'],
    ['R MONO-WALKER', 'R OPTI-STRIKE', 'R CYCLO-GRAV'],
    ['K LO', 'K R6', 'K HAUL-R'],
    ['K SEN-TRI', 'K STRIKE-ORB', 'K PROTO-ROLLER'],
    ['K BB9', 'K CYCLO-GRAV', 'K B2-RP'],
    ['K OPTI-STRIKE', 'K B2-RP', 'B SNOW MOUSE'],
    ['K MONO-WALKER', 'G TRI-TEK', 'B RIC-1200'],
    ['G KX', 'D DRFT-R', 'R IG'],
    ['D LEP', 'R LOADLIFTER', 'K MO-TRAK'],
    ['R SNOW MOUSE', 'K TRI-TEK', 'X MECHA-DROID'],
    ['K RIC', 'X CYCLO-GRAV', 'X R7'],
    ['X OPTI-STRIKE', 'K KX', 'X DRFT-R'],
  ],
  3: [
    ['B MOUSE', 'B PIT', 'B GONK'],
    ['B 2BB', 'B R3', 'B SENATE HOVERCAM'],
    ['B R4', 'B R5', 'B R8'],
    ['G R9', 'G B1 BATTLE', 'G B1 SECURITY'],
    ['G 2BB', 'G R3', 'G SENATE HOVERCAM'],
    ['D BDX EXPLORER', 'D R4', 'D R5'],
    ['D R8', 'D R9', 'D B1 BATTLE'],
    ['R B1 SECURITY', 'R R3', 'R 2BB'],
    ['R BDX EXPLORER', 'R R4', 'R R5'],
    ['B TRAK-R', 'B GROUNDMECH', 'R SENATE HOVERCAM'],
    ['B B2 HEAVY', 'B B2 SUPER', 'B UTIL-TECH'],
    ['G TRAK-R', 'G GROUNDMECH', 'R BAL-CORE'],
    ['R B2 SUPER', 'B MECHA-DROID', 'B PROTO-ROLLER'],
    ['R B2 HEAVY', 'B B2-RP', 'G R7'],
    ['R STRIKE-ORB', 'G BB9', 'G PROTO-ROLLER'],
    ['D B2-RP', 'R AMP WALKER', 'G MECHA-DROID'],
    ['R OPTI-POD', 'D R7', 'G MONO-WALKER'],
    ['R UTIL-TECH', 'D BB9', 'D PROTO-ROLLER'],
    ['D MECHA-DROID', 'R R7', 'R B2-RP'],
    ['R MONO-WALKER', 'R OPTI-STRIKE', 'R CYCLO-GRAV'],
    ['K B2 SUPER', 'K OPTI-POD', 'K R2'],
    ['K GUNRUNNER', 'K LNG-SHOT', 'K B2-RP'],
    ['K MONO-WALKER', 'K MECHA-DROID', 'K CYCLO-GRAV'],
    ['K BB9', 'K B2-RP', 'B RIC'],
    ['K PROTO-ROLLER', 'B LOADLIFTER', 'G MO-TRAK'],
    ['G LEP', 'D TRI-TEK', 'R SNOW MOUSE'],
    ['D RIC-1200', 'R IG', 'K DRFT-R'],
    ['R RIC', 'K MO-TRAK', 'X BB9'],
    ['K IG', 'X MECHA-DROID', 'X OPTI-STRIKE'],
    ['X R7', 'K LEP', 'X DRFT-R'],
  ],
  4: [
    ['B ID10', 'B PIT', 'B DRK-1 PROBE'],
    ['B 2BB', 'B R3', 'B SENATE HOVERCAM'],
    ['B R4', 'G R5', 'G R8'],
    ['G R9', 'G B1 BATTLE', 'G B1 SECURITY'],
    ['G 2BB', 'G R3', 'G SENATE HOVERCAM'],
    ['D BDX EXPLORER', 'D R4', 'D R5'],
    ['D R8', 'D R9', 'D B1 BATTLE'],
    ['R B1 SECURITY', 'R R3', 'R 2BB'],
    ['R BDX EXPLORER', 'R R4', 'R R5'],
    ['B TRAK-R', 'B GROUNDMECH', 'R SENATE HOVERCAM'],
    ['B B2 HEAVY', 'B B2 SUPER', 'B UTIL-TECH'],
    ['G TRAK-R', 'G GROUNDMECH', 'R BAL-CORE'],
    ['R B2 SUPER', 'B MECHA-DROID', 'B PROTO-ROLLER'],
    ['D BAL-CORE', 'D GROUNDMECH', 'R TRAK-R'],
    ['D B2 HEAVY', 'R B2 SUPER', 'B B2-RP'],
    ['R UTIL-TECH', 'B BB9', 'G R7'],
    ['B OPTI-STRIKE', 'G CYCLO-GRAV', 'G MECHA-DROID'],
    ['G B2-RP', 'G BB9', 'D R7'],
    ['R R7', 'D MECHA-DROID', 'R B2-RP'],
    ['R MONO-WALKER', 'R OPTI-STRIKE', 'R CYCLO-GRAV'],
    ['K AMP WALKER', 'K GROUNDMECH', 'K HAUL-R'],
    ['K GUNRUNNER', 'K STRIKE-ORB', 'K B2 SUPER'],
    ['K MONO-WALKER', 'K B2-RP', 'K CYCLO-GRAV'],
    ['K MECHA-DROID', 'K PROTO-ROLLER', 'B MO-TRAK'],
    ['K OPTI-STRIKE', 'B TRI-TEK', 'G DRFT-R'],
    ['G CYCLENS', 'D LEP', 'R MO-TRAK'],
    ['D RIC-1200', 'R SNOW MOUSE', 'K LOADLIFTER'],
    ['R IG', 'K KX', 'X OPTI-STRIKE'],
    ['K TRI-TEK', 'X R7', 'X BB9'],
    ['X MONO-WALKER', 'K CYCLENS', 'X IG'],
  ],
}

/**
 * Repère les paliers rigoureusement identiques entre deux cycles.
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

/**
 * Nova Crystals gagnés au Super Rebirth, selon le niveau de rebirth atteint.
 *
 * Les paliers 12→23 et 27 sont documentés (srbcontrol, droidtycoonguide.com) : 11, 16, 22,
 * 29, 37, 46, 56, 67, 79, 92, 106, 121 … puis 191 au palier 27. Les guides décrivent en outre
 * la courbe explicitement — « chaque niveau vaut plus que le précédent : +5 au 13, croissant
 * jusqu'à +15 au 23 » : l'écart entre deux paliers augmente de +1 à chaque niveau, ce qui
 * donne la forme close `cristaux(n) = 1 + (n − 8)(n − 7) / 2`.
 *
 * Cette formule reproduit **exactement** les treize valeurs documentées — dont le 27 = 191,
 * isolé après le trou 24-26, ce qui la valide de deux côtés (données + source). On comble donc
 * les paliers manquants 24-26 et 28-30 par la même loi : 137, 154, 172, (191), 211, 232, 254.
 */
const NOVA_BY_REBIRTH = Object.fromEntries(
  Array.from({ length: 30 - 12 + 1 }, (_, k) => {
    const n = k + 12
    return [n, 1 + ((n - 8) * (n - 7)) / 2]
  }),
)

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
   * 30 paliers par cycle. Passé de 28 à 30 après recoupement de trois sources
   * communautaires concordantes (srbcontrol, tycoon-tools, captures). Aucune note de patch
   * officielle ne le confirme, mais les trois relevés s'accordent.
   */
  maxRebirth: 30,
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
console.log('   ⚠ source unique (srbcontrol) : toutes les exigences portent sourceUnique')
