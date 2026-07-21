# Droidex

La bible communautaire de **Star Wars: Droid Tycoon** (Fortnite, île `7865-8305-9184`).

Droidex complet avec suivi de collection par palier, planificateur de renaissances, catalogue
Nova Shop, fil des nouveautés et guide des mécaniques. Multilingue, installable en PWA.

## Stack

| Brique | Choix |
|---|---|
| Framework | Nuxt 4 (Vue 3 + Nitro) |
| Styles | Tailwind CSS 4 (via `@tailwindcss/vite`) |
| État | Pinia |
| Requêtes | ofetch |
| Base de données | MongoDB |
| Authentification | BetterAuth — Discord, Google, Twitch |
| i18n | `@nuxtjs/i18n` — fr, en, es, de |
| PWA | `@vite-pwa/nuxt` |

## Démarrage

```bash
pnpm install
cp .env.example .env      # puis remplis les variables
pnpm run fetch:images     # ⚠️ lis la section « Images » avant
pnpm dev
```

MongoDB doit tourner (`mongodb://localhost:27017` par défaut). BetterAuth crée ses
collections automatiquement à la première connexion.

### Fournisseurs OAuth

Déclare cette URL de redirection chez chacun :

```
{NUXT_PUBLIC_BASE_URL}/api/auth/callback/{discord|google|twitch}
```

Le rattachement de comptes est activé : un joueur qui arrive par Discord puis par Google
avec la même adresse vérifiée retrouve sa progression au lieu d'un doublon.

## Données

Les données du jeu sont **générées**, pas écrites à la main. Deux scripts produisent les
fichiers JSON consommés par l'app :

```bash
pnpm run build:data       # droids + rebirths
```

| Fichier | Généré par | Contenu |
|---|---|---|
| `app/data/droids.json` | `scripts/build-droids.mjs` | 69 droids × 6 paliers |
| `app/data/rebirths.json` | `scripts/build-rebirths.mjs` | 28 paliers × 4 cycles |
| `app/data/nova-shop.json` | manuel | Catalogue et coûts en cristaux |
| `app/data/mechanics.json` | manuel | Slots, Flawless, chips, missions |
| `app/data/updates.json` | manuel | Patchs et événements |

`build-rebirths.mjs` valide chaque slug de droid contre `droids.json` et échoue en cas de
coquille — les deux jeux de données ne peuvent pas diverger silencieusement.

### Fiabilité des chiffres

**Aucune source officielle exhaustive n'existe.** Tout vient de trackers et wikis
communautaires qui se contredisent parfois. Le champ `unverified` marque les 15 droids dont
les chiffres sont extrapolés ou issus d'une source unique ; l'UI les signale par un ⚠.

Points connus à surveiller :

- **Palier Galactique** : existe (exigé au rebirth 27→28), mais aucune statistique ni
  illustration publiée. Les colonnes sont affichées vides plutôt que remplies au jugé.
- **Multiplicateur Beskar** : non uniforme selon la rareté (×12 Common, ×34 Epic, ×24
  Legendary, ×16 Mythic). La « règle du ×2 par palier » relayée par les guides est fausse.
- **Coûts Mythic** : les sources divergent d'un facteur ~800 selon qu'elles indiquent le
  coût de base ou celui du palier maximum.
- **Cycles 2 et 3** : exigences de renaissance non publiées, affichées comme telles.

## Images

`pnpm run fetch:images` télécharge environ 320 icônes (~10 Mo) dans `public/droids/`.

> ⚠️ **Ces images sont des assets propriétaires d'Epic Games et de Lucasfilm**, extraits de
> l'interface du jeu. Le dépôt qui les héberge n'a aucune licence déclarée. Usage réaliste :
> outil communautaire non commercial, sans branding Star Wars ni Fortnite, avec mention des
> ayants droit. Toute redistribution ou usage commercial demanderait une autorisation.

`public/droids/` n'est pas versionné. Si une icône manque, `DroidImage` retombe
proprement sur les initiales du droid — rien ne casse.

Chaque palier a sa propre illustration (`MOUSE_GOLD.png`, `MOUSE_BESKAR.png`…). Le palier
Galactique réutilise le visuel Beskar, signalé par une pastille violette.

## Architecture

```
app/
  components/   DroidCard, TierSelector, DroidImage, AuthMenu…
  composables/  useAuthSession — normalise le Ref de BetterAuth
  data/         JSON générés ou maintenus à la main
  pages/        index (Droidex), droids/[slug], rebirths, shop, updates, guide, profile
  stores/       collection — collection, rebirths, niveaux de boutique
server/
  api/          progress (GET/PATCH), auth/[...all]
  utils/        mongo (pool partagé), auth (instance BetterAuth)
shared/types/   types partagés client/serveur
```

### Modèle de collection

On stocke **le palier le plus haut possédé** par droid, pas un booléen par palier. La règle
du jeu — un palier supérieur satisfait toujours une exigence inférieure — se traduit alors
directement en une comparaison de rang (`satisfies()`), et le planificateur de renaissances
en découle sans logique supplémentaire.

### Vers une app mobile native

Le `PATCH /api/progress` fusionne clé par clé plutôt que de remplacer en bloc : deux
appareils qui modifient des droids différents ne s'écrasent pas. Les types de `shared/`
sont réutilisables tels quels par un client natif, et `MobileNav` respecte déjà les cibles
tactiles de 44 px et les zones sûres (`env(safe-area-inset-bottom)`).

## Scripts

| Commande | Effet |
|---|---|
| `pnpm dev` | Serveur de développement |
| `pnpm build` / `pnpm preview` | Build de production |
| `pnpm run build:data` | Régénère droids et rebirths |
| `pnpm run fetch:images` | Télécharge les icônes (`--force` pour réécrire) |
| `pnpm run typecheck` | Vérification TypeScript |

## Mentions

Projet communautaire, ni affilié ni approuvé par Epic Games ou Lucasfilm. Star Wars et
Fortnite sont leurs marques respectives.
