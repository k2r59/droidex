# Illustrations

Assets d'interface, importés depuis les composants :

```vue
import hero from '~/assets/images/hero-tatooine-1920.webp'
```

Passer par `app/assets/` plutôt que par `public/` fait transiter les fichiers par Vite :
empreinte dans le nom pour un cache long, et compression au build. `public/` reste
réservé aux fichiers dont l'URL doit rester stable — les icônes de droids, par exemple,
qui sont référencées par nom calculé depuis le dataset.

## Inventaire

| Fichier | Origine | Usage |
|---|---|---|
| `banners/hero-droids-<bp>.webp` | Fournie par Hervé | Bannière commune à toutes les pages |
| `banners/per-page/<page>-<bp>.webp` | Banners Pack | Bannières par page, écartées — voir ci-dessous |
| `banners/event-*.webp` | Banners Pack | Bannières d'événement |
| `backgrounds/<ambiance>-<bp>.webp` | Banners Pack | 7 ambiances de fond de section |
| `backgrounds/sidebar-left.webp` · `sidebar-right.webp` | Banners Pack | Textures des colonnes latérales |
| `hero-tatooine-*.webp` | Complete Asset Pack | Scène cinématique — non utilisée, voir ci-dessous |
| `droidex-mark.svg` | Complete Asset Pack | Logo compact |
| `droidex-logo-horizontal.svg` | Complete Asset Pack | Logo complet |
| `dots.svg` `grid.svg` `hex.svg` `scanlines.svg` | Complete Asset Pack | Motifs de fond |
| `nebula-cyan.svg` `stars-deep.svg` | Complete Asset Pack | Décors spatiaux |
| `nova-crystal-hero.webp` | Complete Asset Pack | Illustration du rail Supers Renaissances |
| `planet-rebirth.svg` | Composition maison | Fond de la carte « prochaine renaissance » |

## Bannières de page

Le pack fournit un cadrage par palier de largeur, et non un simple redimensionnement :
le mobile est en portrait (720×960) là où le desktop est un bandeau (1920×480). C'est
pourquoi `PageBanner` utilise `<picture>` avec des `media`, et non un simple `srcset`.

Les 42 PNG passent de 2,11 Mo à 0,83 Mo en WebP, soit 61 % de gain.

## Sur `hero-tatooine-*`

La scène cinématique du Complete Asset Pack est conservée mais inutilisée. Elle est si
lumineuse qu'il fallait la masquer à 97 % pour lire le titre par-dessus — autant prendre
la bannière que le Banners Pack prévoit pour cette page, sombre et sans texte.

## Droits

Le pack déclare ses SVG, CSS et HTML comme créations originales. Les illustrations PNG,
elles, représentent des personnages Star Wars et restent soumises aux droits de Lucasfilm
— même cadre d'usage que les icônes de droids décrit dans le README racine : outil
communautaire non commercial.

## Bannière commune et bannières par page

`PageBanner` cherche d'abord une image au nom de la page, puis retombe sur `hero-droids`.
Les bannières du Banners Pack sont donc simplement rangées dans `per-page/` : les
remettre en service se fait en remontant un fichier d'un dossier, sans toucher au code.

`pnpm run import:banner` importe une nouvelle bannière depuis le presse-papiers ou un
chemin, et produit les trois largeurs attendues.

## Sur `planet-rebirth.svg`

Composition de substitution, en SVG plutôt qu'en bitmap : nette à toute taille pour 2 Ko,
là où l'illustration d'origine n'a pas pu être récupérée. Pour la remplacer, déposer le
fichier et changer l'import dans `AppSidebar.vue` — la carte l'utilise déjà en fond
plein cadre, aucune autre adaptation n'est nécessaire.
