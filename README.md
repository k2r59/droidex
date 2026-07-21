# Droidex

La bible communautaire de **Star Wars: Droid Tycoon** (Fortnite, île `7865-8305-9184`).

Droidex complet avec journal de collection palier par palier, planificateur de renaissances,
catalogue Nova Shop, fil des nouveautés et guide des mécaniques. Multilingue, installable en
PWA, et utilisable sans compte : la progression vit dans le navigateur.

## Stack

| Brique | Choix |
|---|---|
| Framework | Nuxt 4 (Vue 3 + Nitro) |
| Styles | Tailwind CSS 4 (via `@tailwindcss/vite`) |
| État | Pinia |
| Stockage local | IndexedDB (couche maison, `app/utils/idb.ts`) |
| Requêtes | ofetch |
| Base de données | MongoDB |
| Authentification | BetterAuth — Discord, Google, Twitch |
| i18n | `@nuxtjs/i18n` — fr, en, es, de |
| PWA | `@vite-pwa/nuxt` |

## Démarrage

```bash
pnpm install
cp .env.example .env      # puis remplis les variables
pnpm run images           # ⚠️ lis la section « Images » avant
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
avec la même adresse **vérifiée** retrouve sa progression au lieu d'un doublon.

`trustedProviders` est laissé **vide**, à dessein. Malgré son nom, cette option ne désigne pas
des fournisseurs de confiance mais ceux pour lesquels BetterAuth *saute* le contrôle
`emailVerified` — les y déclarer permettait de prendre le contrôle d'un compte en créant un
compte Discord portant l'adresse d'une victime inscrite via Google.

En production, le serveur **refuse de démarrer** si `NUXT_BETTER_AUTH_SECRET` est absente
(BetterAuth retomberait sinon, sans rien signaler, sur une constante publiée dans son propre
dépôt) ou si `NUXT_PUBLIC_BASE_URL` pointe encore sur localhost.

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
communautaires qui se contredisent parfois. Le champ `unverified` marque les 18 droids dont
les chiffres sont extrapolés ou issus d'une source unique ; l'UI les signale par un ⚠.

Points connus à surveiller :

- **Palier Galactique** : existe (exigé au rebirth 27→28), mais aucune statistique ni
  illustration publiée. Les colonnes sont affichées vides plutôt que remplies au jugé.
- **Multiplicateur Beskar** : non uniforme selon la rareté (×12 Common, ×34 Epic, ×24
  Legendary, ×16 Mythic). La « règle du ×2 par palier » relayée par les guides est fausse.
- **Coûts Mythic** : les sources divergent d'un facteur ~800 selon qu'elles indiquent le
  coût de base ou celui du palier maximum.
- **Les quatre cycles viennent d'une source unique**, `tycoon-tools.com`. Aucune
  corroboration indépendante n'existe : les autres sites communautaires consultés semblent
  dériver du même tracker amont. Le cycle 1 y correspond à 26 paliers sur 28 aux données
  que nous tenions d'ailleurs — ce qui a motivé la confiance, mais indique aussi que nos
  données d'origine venaient de là, donc que le recoupement n'en est pas un. Toutes les
  exigences portent `sourceUnique` et la page l'affiche.
- **Coûts en crédits identiques sur les quatre cycles** : la source l'énonce, et la courbe
  le corrobore (×2,5 par palier du 8 au 20, ×1,5 jusqu'au 28 — une régularité qui décrit
  une propriété du palier, pas du cycle).
- **Blocs dupliqués entre cycles** : les cycles 2 et 3 sont identiques aux paliers 13-20,
  les cycles 3 et 4 aux paliers 4-13. Des cycles dont la raison d'être est d'exiger des
  droids différents ne devraient pas l'être, et le motif contigu est la signature d'un
  copier-coller côté source. Le champ `identiqueAuxCycles` est **calculé** par le
  générateur, pas codé en dur : si la source se corrige, le signalement disparaît seul.
- **`maxRebirth: 28`** : contesté. Des sources récentes annoncent 23 ou 27.

## Images

```bash
pnpm run images        # télécharge puis détoure, en une commande
```

`fetch:images` télécharge 317 icônes dans `public/droids/`, `cutout:images` les détoure.

> ⚠️ **Ces images sont des assets propriétaires d'Epic Games et de Lucasfilm**, extraits de
> l'interface du jeu. Le dépôt qui les héberge n'a aucune licence déclarée. Usage réaliste :
> outil communautaire non commercial, sans branding Star Wars ni Fortnite, avec mention des
> ayants droit. Toute redistribution ou usage commercial demanderait une autorisation.

`public/droids/` **est versionné** — les 317 icônes sont dans le dépôt pour que le
déploiement n'ait pas à les retélécharger. C'est un choix assumé malgré l'avertissement
ci-dessus : le dépôt redistribue donc des assets dont il ne détient pas les droits.
Les retirer plus tard demanderait de réécrire l'historique git, pas un simple `git rm`.

Si une icône manque, `DroidImage` retombe proprement sur les initiales du droid — rien
ne casse.

Chaque palier a sa propre illustration (`MOUSE_GOLD.png`, `MOUSE_BESKAR.png`…). Le palier
Galactique réutilise le visuel Beskar, signalé par une pastille violette.

### Détourage

Les fichiers d'origine sont des captures de l'interface du jeu, en RVB **opaque** : chacun
embarque le fond de sa carte (noir pour la plupart des paliers, gris pour le Beskar). Sans
canal alpha, le champ d'étoiles placé derrière resterait invisible.

`cutout:images` applique un **remplissage par diffusion depuis les bords** plutôt qu'un
seuil de luminosité : seul le fond connecté au pourtour devient transparent, donc les
ombres et contours sombres *à l'intérieur* du droid sont préservés. Un seuil global les
aurait troués. Les bords sont adoucis sur une bande de tolérance, sans quoi le détourage
laisse un liseré noir très visible sur fond étoilé.

Le script est idempotent et se fonde sur la transparence réelle d'un coin, pas sur le type
de fichier — les icônes Beskar sont déjà encodées en RVBA tout en étant opaques.

## Architecture

```
app/
  components/   DroidCard, TierSelector, DroidImage, AuthMenu…
  components/   …, LegalGate, OnboardingGate, InstallPrompt (écrans d'ouverture)
  composables/  useAuthSession (Ref BetterAuth), useFocusTrap (fenêtres modales),
                useGameText (textes de jeu traduits), useHydratedStorage
  utils/        idb (couche IndexedDB), format, auth-client
  data/         JSON générés ou maintenus à la main
  pages/        index (Droidex), droids/[slug], rebirths, shop, updates, guide, profile
  stores/       collection — collection, rebirths, niveaux de boutique
server/
  api/          progress (GET/PATCH/DELETE), auth-providers, auth/[...all]
  utils/        mongo (pool partagé, index unique), auth (instance BetterAuth),
                username-filter (pseudos haineux et sexuels — écrit et testé,
                pas encore branché : l'inscription passe par OAuth)
shared/types/   types partagés client/serveur
```

### Modèle de collection

On stocke **la liste des paliers réellement obtenus** par droid (`{ tiers: Tier[], flawless }`),
pas le plus haut. C'est ce que fait le Droidex du jeu : un joueur peut avoir un droid en Beskar
sans l'avoir en Or, et veut le voir consigné tel quel. Le total se compte donc par variante —
69 droids × paliers disponibles, soit 379 entrées.

Le planificateur de renaissances reste tolérant : `satisfies(slug, palier)` est vrai dès qu'une
variante de rang supérieur ou égal figure au journal, puisqu'en jeu un palier supérieur satisfait
l'exigence. Cocher l'Or exigé par un palier n'efface pas le Beskar déjà consigné.

Le modèle précédent — un palier unique par droid — est migré à la lecture (`migrateCollection`) :
un ancien `tier: 'RAINBOW'` devient la liste des paliers jusqu'à Arc-en-ciel inclus, c'est-à-dire
l'interprétation la plus proche de ce que l'ancienne UI affichait.

### Stockage

La progression est **locale d'abord**. Elle est écrite dans IndexedDB (`app/utils/idb.ts`, une
couche clé-valeur d'une centaine de lignes, sans dépendance) et n'est répliquée sur le serveur
que si un compte est connecté. Une ancienne progression en `localStorage` est reprise à la
première lecture, puis n'est plus écrite.

Le store expose `hydrated` : tant qu'il est faux, les compteurs ne s'affichent pas, sinon la page
montrerait « 0/379 » le temps que la lecture asynchrone revienne.

`idbSet` fait passer la valeur par JSON avant l'écriture. Ce n'est pas de la coquetterie :
`structuredClone` refuse un Proxy, et un état Pinia en est un. Comme l'écriture n'est pas
attendue par les actions et que l'erreur est rattrapée, l'échec était **totalement
silencieux** — l'interface se mettait à jour, rien n'était écrit, le rechargement perdait
tout.

### Écrans d'ouverture

Trois composants montés dans `app.vue`, déclenchés en cascade et jamais simultanément :

| Composant | Quand | Retenu dans |
|---|---|---|
| `LegalGate` | Première visite, avant toute consultation | `droidex:legal-seen:v1` |
| `OnboardingGate` | Avertissement accepté **et** progression vierge | `droidex:onboarded:v1` |
| `InstallPrompt` | 20 s après l'arrivée, hors mode autonome | `droidex:install-dismissed:v1` |

`OnboardingGate` attend `hydrated` avant de tester `isEmpty` : interrogé plus tôt, le store
répond « vide » pour tout le monde et l'écran s'imposerait à des joueurs déjà renseignés.

`InstallPrompt` couvre deux chemins distincts. Android/Chrome émet `beforeinstallprompt`, que
l'on capte et neutralise pour rendre le moment au joueur. iOS/Safari n'émet rien et n'expose
aucune API d'installation : le seul recours est d'expliquer le geste (Partager → Sur l'écran
d'accueil), d'où la détection explicite du couple iOS + Safari — en tenant compte des iPad,
qui se déclarent « Macintosh » depuis iPadOS 13 et se reconnaissent au tactile.

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
| `pnpm run build:mission-pads` | Découpe la planche de sprites des terminaux |
| `pnpm run build:icons` | Régénère l'index des icônes |
| `pnpm run lint` / `lint:fix` | ESLint (formatage inclus, pas de Prettier) |
| `pnpm run images` | Télécharge puis détoure les icônes |
| `pnpm run fetch:images` | Télécharge seulement (`--force` pour réécrire) |
| `pnpm run cutout:images` | Détoure seulement |
| `pnpm run typecheck` | Vérification TypeScript |

## Mentions

Projet communautaire, ni affilié ni approuvé par Epic Games ou Lucasfilm. Star Wars et
Fortnite sont leurs marques respectives.
