#!/usr/bin/env bash
#
# Importe une bannière d'en-tête : copie le fichier au bon endroit, le convertit en WebP
# aux trois largeurs attendues par `PageBanner`, et supprime l'original.
#
# Deux usages :
#
#   ./scripts/import-banner.sh                      # depuis le presse-papiers
#   ./scripts/import-banner.sh ~/Downloads/img.png  # depuis un fichier
#
# Le nom de sortie est `hero-droids`. Passer un second argument pour en changer :
#
#   ./scripts/import-banner.sh mon-image.png autre-nom
#
set -euo pipefail

cd "$(dirname "$0")/.."

SOURCE="${1:-}"
NAME="${2:-hero-droids}"
DEST="app/assets/images/banners"
TMP=""

if [ -z "$SOURCE" ]; then
  # Rien en argument : on tente le presse-papiers. `«class PNGf»` échoue proprement
  # si le presse-papiers ne contient pas d'image.
  TMP="$(mktemp -t droidex-banner).png"
  if ! osascript \
      -e "set f to (open for access POSIX file \"$TMP\" with write permission)" \
      -e 'write (the clipboard as «class PNGf») to f' \
      -e 'close access f' 2>/dev/null; then
    rm -f "$TMP"
    echo "✗ Le presse-papiers ne contient pas d'image." >&2
    echo "  Copie l'image (clic droit → Copier l'image), ou passe un chemin :" >&2
    echo "  ./scripts/import-banner.sh ~/Downloads/mon-image.png" >&2
    exit 1
  fi
  SOURCE="$TMP"
  echo "→ image récupérée depuis le presse-papiers"
fi

if [ ! -f "$SOURCE" ]; then
  echo "✗ Fichier introuvable : $SOURCE" >&2
  exit 1
fi

mkdir -p "$DEST"

# Les trois largeurs correspondent aux `media` de PageBanner. `withoutEnlargement`
# évite de fabriquer des pixels si la source est plus petite que la cible.
node -e "
const sharp = require('sharp'), fs = require('fs');
const src = process.argv[1], dest = process.argv[2], name = process.argv[3];
(async () => {
  const meta = await sharp(src).metadata();
  console.log('source : ' + meta.width + 'x' + meta.height + ' — ' + (fs.statSync(src).size / 1048576).toFixed(2) + ' Mo');
  for (const [bp, w] of [['desktop', 1920], ['tablet', 1200], ['mobile', 760]]) {
    const out = dest + '/' + name + '-' + bp + '.webp';
    await sharp(src).resize({ width: w, withoutEnlargement: true }).webp({ quality: 84 }).toFile(out);
    const m = await sharp(out).metadata();
    console.log('  ' + out.padEnd(52) + m.width + 'x' + m.height + '  ' + (fs.statSync(out).size / 1024).toFixed(0) + ' Ko');
  }
})();
" "$SOURCE" "$DEST" "$NAME"

[ -n "$TMP" ] && rm -f "$TMP"

echo
echo "✓ Bannière « $NAME » importée."
echo "  Dis-moi « c'est bon » et je la branche sur les pages."
