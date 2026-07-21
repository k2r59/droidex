# Illustrations

Assets d'interface, importés depuis les composants :

```vue
import droidSidebarDroite from '~/assets/images/droid-sidebar-droite.png'
```

Passer par `app/assets/` plutôt que par `public/` fait transiter les fichiers par Vite :
empreinte dans le nom pour un cache long, et compression au build. `public/` reste
réservé aux fichiers dont l'URL doit rester stable — les icônes de droids, par exemple,
qui sont référencées par nom calculé depuis le dataset.

## Convention de nommage

`<zone>-<usage>.<ext>`, en minuscules et sans accent. La zone d'abord, pour que les
fichiers d'un même emplacement se regroupent au tri.

## Inventaire

| Fichier | Emplacement | État |
|---|---|---|
| `droid-sidebar-droite.png` | Colonne des Emblématiques | ⏳ à déposer |

## Droits

Ces illustrations représentent des personnages Star Wars. Générées ou non, elles
restent soumises aux droits de Lucasfilm : même cadre d'usage que les icônes de droids
décrit dans le README racine — outil communautaire non commercial.
