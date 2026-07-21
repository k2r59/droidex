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
| `hero-tatooine-1686.webp` | Complete Asset Pack, bannière cinématique | Fond de la bannière d'accueil |
| `hero-tatooine-1280.webp` | idem | Écrans intermédiaires |
| `hero-tatooine-860.webp` | idem | Mobile et tablette |
| `droidex-mark.svg` | Complete Asset Pack | Logo compact |
| `droidex-logo-horizontal.svg` | Complete Asset Pack | Logo complet |
| `dots.svg` `grid.svg` `hex.svg` `scanlines.svg` | Complete Asset Pack | Motifs de fond |
| `nebula-cyan.svg` `stars-deep.svg` | Complete Asset Pack | Décors spatiaux |
| `droid-sidebar-droite.png` | — | ⏳ à déposer |

La bannière d'origine fait 2,3 Mo en PNG pour 1686 px de large. Elle est réencodée en WebP
à trois largeurs, sans jamais agrandir au-delà de la source : un « 1920 » n'aurait ajouté
que du poids pour des pixels interpolés.

## Droits

Le pack déclare ses SVG, CSS et HTML comme créations originales. Les illustrations PNG,
elles, représentent des personnages Star Wars et restent soumises aux droits de Lucasfilm
— même cadre d'usage que les icônes de droids décrit dans le README racine : outil
communautaire non commercial.
