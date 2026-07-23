/**
 * Détoure les icônes de droids : rend le fond transparent pour qu'un décor puisse
 * apparaître derrière.
 *
 * Les fichiers récupérés sont des captures de l'interface du jeu, en RVB **opaque** :
 * chaque icône embarque le fond de sa carte (noir pur pour la plupart des paliers,
 * gris ~rgb(64,64,64) pour le Beskar). Sans canal alpha, tout décor placé derrière
 * reste invisible.
 *
 * Méthode : **remplissage par diffusion depuis les bords**, et non un simple seuil de
 * luminosité. Un seuil global trouerait le droid lui-même — ses ombres et ses contours
 * noirs disparaîtraient. En ne propageant qu'à partir des pixels de bordure, seul le
 * fond réellement connecté au pourtour devient transparent ; une zone sombre entourée
 * par le droid reste intacte.
 *
 * Les bords sont adoucis sur une bande de tolérance, sinon le détourage laisse un
 * liseré noir dur, très visible sur un fond étoilé.
 *
 * Idempotent : un fichier dont le coin est déjà transparent est ignoré. Pour repartir
 * des originaux, relancer `pnpm run fetch:images --force` puis ce script.
 *
 * Usage : pnpm run cutout:images
 */
import { readdirSync, writeFileSync, unlinkSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const dir = resolve(root, 'public/droids')

/** En deçà : franchement du fond. Au-delà : franchement du droid. Entre : alpha dégradé. */
const NEAR = 26
const FAR = 62

const files = readdirSync(dir).filter((f) => f.endsWith('.png')).sort()
let processed = 0
let skipped = 0

for (const file of files) {
  const path = resolve(dir, file)

  const { data, info } = await sharp(path)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true })

  const { width, height, channels } = info
  const at = (x, y) => (y * width + x) * channels

  // Idempotence : on teste la transparence RÉELLE d'un coin, pas le type de fichier.
  // Les icônes Beskar sont déjà encodées en RVBA tout en étant entièrement opaques —
  // se fier au type de couleur les aurait écartées à tort.
  if (data[at(0, 0) + 3] === 0) {
    skipped += 1
    continue
  }

  // Couleur de fond = moyenne des quatre coins. Elle varie selon le palier, donc on la
  // mesure par fichier plutôt que de coder le noir en dur.
  let br = 0, bg = 0, bb = 0
  const corners = [[0, 0], [width - 1, 0], [0, height - 1], [width - 1, height - 1]]
  for (const [x, y] of corners) {
    const i = at(x, y)
    br += data[i]; bg += data[i + 1]; bb += data[i + 2]
  }
  br /= 4; bg /= 4; bb /= 4

  const distance = (i) => {
    const dr = data[i] - br
    const dg = data[i + 1] - bg
    const db = data[i + 2] - bb
    return Math.sqrt(dr * dr + dg * dg + db * db)
  }

  // Diffusion depuis toute la bordure, en file d'attente plutôt qu'en récursion :
  // une pile d'appels de 38 000 pixels déborderait.
  const visited = new Uint8Array(width * height)
  const queue = []

  const seed = (x, y) => {
    const p = y * width + x
    if (visited[p]) return
    if (distance(at(x, y)) > FAR) return
    visited[p] = 1
    queue.push(p)
  }

  for (let x = 0; x < width; x++) { seed(x, 0); seed(x, height - 1) }
  for (let y = 0; y < height; y++) { seed(0, y); seed(width - 1, y) }

  while (queue.length) {
    const p = queue.pop()
    const x = p % width
    const y = (p / width) | 0

    for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
      const nx = x + dx
      const ny = y + dy
      if (nx < 0 || ny < 0 || nx >= width || ny >= height) continue
      const np = ny * width + nx
      if (visited[np]) continue
      if (distance(at(nx, ny)) > FAR) continue
      visited[np] = 1
      queue.push(np)
    }
  }

  // Alpha progressif dans la bande [NEAR, FAR] pour éviter un contour dur.
  for (let p = 0; p < width * height; p++) {
    if (!visited[p]) continue
    const i = p * channels
    const d = distance(i)
    data[i + 3] = d <= NEAR ? 0 : Math.round(((d - NEAR) / (FAR - NEAR)) * 255)
  }

  // Sortie en WebP : ~84 % plus léger que le PNG dont l'icône est issue, pour un rendu
  // identique. On écrit le `.webp` et on retire le `.png` source, qui n'est plus servi.
  const out = await sharp(data, { raw: { width, height, channels } })
    .webp({ quality: 82, alphaQuality: 90, effort: 6 })
    .toBuffer()
  writeFileSync(path.replace(/\.png$/, '.webp'), out)
  unlinkSync(path)

  processed += 1
  if (processed % 50 === 0) console.log(`  ${processed} détourées…`)
}

console.log(`\n✅ ${processed} détourées · ${skipped} déjà transparentes`)
