/**
 * Télécharge les icônes de droids dans `public/droids/`.
 *
 * ⚠️ AVERTISSEMENT DE DROITS — À LIRE AVANT DE LANCER CE SCRIPT
 *
 * Ces images sont des assets PROPRIÉTAIRES d'Epic Games et de Lucasfilm (Disney),
 * extraits de l'interface du Droidex en jeu. Le dépôt qui les héberge n'a aucune licence
 * déclarée, et son auteur ne peut de toute façon pas concéder de droits sur des assets
 * qu'il ne possède pas.
 *
 * Usage réaliste : outil communautaire non commercial, sans branding Star Wars ni Fortnite,
 * avec mention des ayants droit. Toute redistribution ou usage commercial nécessiterait
 * une autorisation d'Epic et de Lucasfilm.
 *
 * `public/droids/` est volontairement exclu du dépôt (voir .gitignore) : les assets ne
 * sont pas versionnés, chacun les récupère localement.
 *
 * Usage : pnpm run fetch:images [--force]
 */
import { readFileSync, mkdirSync, existsSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const outDir = resolve(root, 'public/droids')
const force = process.argv.includes('--force')

const BASE = 'https://raw.githubusercontent.com/erikpeik/droidex/main/public/droids'
/** Le palier Galactique n'a aucun asset publié : il réutilise le visuel Beskar. */
const SKIP_TIERS = new Set(['GALACTIC'])

const dataset = JSON.parse(readFileSync(resolve(root, 'app/data/droids.json'), 'utf8'))

const wanted = new Set()
for (const droid of dataset.droids) {
  for (const [tier, stats] of Object.entries(droid.tiers)) {
    if (SKIP_TIERS.has(tier) || !stats.image) continue
    wanted.add(stats.image)
  }
}

mkdirSync(outDir, { recursive: true })

const files = [...wanted].sort()
let downloaded = 0
let skipped = 0
const missing = []

console.log(`${files.length} icônes à traiter → public/droids/\n`)

// Requêtes séquentielles avec une petite pause : on tape sur un dépôt tiers,
// autant ne pas le marteler.
for (const file of files) {
  const dest = resolve(outDir, file)

  if (!force && existsSync(dest)) {
    skipped += 1
    continue
  }

  try {
    const res = await fetch(`${BASE}/${encodeURIComponent(file)}`)
    if (!res.ok) {
      missing.push(`${file} (HTTP ${res.status})`)
      continue
    }
    writeFileSync(dest, Buffer.from(await res.arrayBuffer()))
    downloaded += 1
    if (downloaded % 25 === 0) console.log(`  ${downloaded} téléchargées…`)
    await new Promise((r) => setTimeout(r, 40))
  } catch (err) {
    missing.push(`${file} (${err.message})`)
  }
}

console.log(`\n✅ ${downloaded} téléchargées · ${skipped} déjà présentes`)

if (missing.length) {
  // Une icône absente n'est pas bloquante : le composant DroidImage retombe sur
  // les initiales du droid. On la signale pour pouvoir la fournir à la main.
  console.warn(`\n⚠️  ${missing.length} introuvables (l'app affichera les initiales) :`)
  for (const m of missing) console.warn(`   ${m}`)
}
