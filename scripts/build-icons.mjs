/**
 * Génère les icônes PWA dans `public/icons/`.
 *
 * L'illustration est dessinée en formes géométriques plutôt qu'en texte : une icône qui
 * dépend d'une police se rend différemment selon la machine qui lance le script.
 *
 * Motif : un objectif de droid — anneau extérieur, iris, reflet — dans les couleurs du
 * thème. Volontairement abstrait : aucun élément de branding Star Wars ou Fortnite.
 *
 * Usage : pnpm run build:icons
 */
import { mkdirSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const outDir = resolve(root, 'public/icons')

const VOID = '#07090f'
const IRIS = '#22d3ee'
const RING = '#1a2030'

/**
 * @param {number} size
 * @param {boolean} maskable Réduit le motif à la « safe zone » de 80 % imposée par
 *   Android, qui rogne les icônes maskable en cercle ou en squircle.
 */
function svg(size, maskable = false) {
  const c = size / 2
  const scale = maskable ? 0.4 : 0.5
  const r = size * scale

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
  <rect width="${size}" height="${size}" fill="${VOID}"/>
  <circle cx="${c}" cy="${c}" r="${r * 0.86}" fill="${RING}"/>
  <circle cx="${c}" cy="${c}" r="${r * 0.72}" fill="none" stroke="${IRIS}" stroke-width="${r * 0.07}" opacity="0.35"/>
  <circle cx="${c}" cy="${c}" r="${r * 0.46}" fill="${IRIS}"/>
  <circle cx="${c}" cy="${c}" r="${r * 0.2}" fill="${VOID}"/>
  <circle cx="${c - r * 0.2}" cy="${c - r * 0.22}" r="${r * 0.1}" fill="#ffffff" opacity="0.85"/>
</svg>`
}

const targets = [
  { file: 'icon-192.png', size: 192, maskable: false },
  { file: 'icon-512.png', size: 512, maskable: false },
  { file: 'icon-512-maskable.png', size: 512, maskable: true },
  // Utilisée par iOS pour l'écran d'accueil, qui ignore le manifeste.
  { file: 'apple-touch-icon.png', size: 180, maskable: false },
  { file: 'favicon-32.png', size: 32, maskable: false },
]

mkdirSync(outDir, { recursive: true })

for (const { file, size, maskable } of targets) {
  const buffer = await sharp(Buffer.from(svg(size, maskable))).png().toBuffer()
  writeFileSync(resolve(outDir, file), buffer)
  console.log(`✅ ${file} — ${size}×${size}${maskable ? ' (maskable)' : ''}`)
}

// Le favicon SVG est net à toute taille ; les PNG restent le repli.
writeFileSync(resolve(root, 'public/favicon.svg'), svg(64))
console.log('✅ favicon.svg')
