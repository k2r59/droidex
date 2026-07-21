/**
 * Découpe la planche des terminaux de mission en un sprite par palier.
 *
 * La planche source est une grille 2 × 3 de cellules de 512 px, fournie sur fond noir avec
 * le halo de chaque terminal peint dedans. Un détourage par seuil ou par diffusion depuis
 * les bords — comme le fait `cutout-droid-images.mjs` pour les icônes de droids — mangerait
 * précisément ce halo, qui est l'essentiel de l'illustration.
 *
 * On dérive donc l'alpha de la **luminance** : le noir du fond devient transparent, le halo
 * garde une opacité proportionnelle à son intensité, et le terminal reste plein. C'est le
 * comportement d'un fondu « screen », adapté à des objets lumineux sur fond noir.
 *
 * Usage : pnpm run build:mission-pads -- <planche.png>
 */
import { mkdirSync, existsSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const outDir = resolve(root, 'app/assets/images/mission-pads')

const COLS = 2
const ROWS = 3
const CELL = 512

/**
 * Ordre de lecture de la planche, ligne par ligne. Les deux dômes violets sont visuellement
 * très proches : le plus sourd sert l'Arc-en-ciel, le plus saturé le Galactique.
 */
const TIERS = ['default', 'gold', 'diamond', 'rainbow', 'galactic', 'beskar']

/**
 * Rampe d'opacité. Les cellules ne sont pas sur un noir pur : chacune baigne dans une
 * lueur ambiante de sa couleur, qui laissait un carré visible autour du terminal une fois
 * posé sur le panneau. Tout ce qui est sous `PLANCHER` disparaît donc franchement, et
 * l'opacité ne monte qu'entre ce seuil et `PLAFOND` — le halo propre au terminal, lui,
 * est bien au-dessus.
 */
const PLANCHER = 34
const PLAFOND = 96

const source = process.argv[2]
if (!source || !existsSync(source)) {
  console.error('Usage : node scripts/build-mission-pads.mjs <planche.png>')
  process.exit(1)
}

const meta = await sharp(source).metadata()
if (meta.width !== COLS * CELL || meta.height !== ROWS * CELL) {
  console.error(`Planche attendue en ${COLS * CELL} × ${ROWS * CELL}, reçue en ${meta.width} × ${meta.height}.`)
  process.exit(1)
}

mkdirSync(outDir, { recursive: true })

for (const [index, tier] of TIERS.entries()) {
  const left = (index % COLS) * CELL
  const top = Math.floor(index / COLS) * CELL

  const { data, info } = await sharp(source)
    .extract({ left, top, width: CELL, height: CELL })
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true })

  for (let i = 0; i < data.length; i += info.channels) {
    // Le canal le plus intense porte mieux un halo coloré que la luminance pondérée,
    // qui écraserait le bleu — or trois des six terminaux sont bleus ou violets.
    const intensite = Math.max(data[i], data[i + 1], data[i + 2])
    const rampe = (intensite - PLANCHER) / (PLAFOND - PLANCHER)
    data[i + 3] = Math.max(0, Math.min(1, rampe)) * 255
  }

  const info2 = await sharp(data, { raw: info })
    .trim({ threshold: 1 })
    .resize({ width: 320, withoutEnlargement: true })
    .webp({ quality: 88 })
    .toFile(resolve(outDir, `${tier}.webp`))

  console.log(`  ${tier.padEnd(9)} ${info2.width} × ${info2.height}  ${Math.round(info2.size / 1024)} Ko`)
}

console.log(`\n✅ ${TIERS.length} terminaux générés → app/assets/images/mission-pads/`)
