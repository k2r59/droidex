/**
 * Compteurs de fréquentation, agrégés et anonymes.
 *
 * Aucune donnée personnelle : ni cookie, ni IP, ni identifiant. On ne stocke que des
 * compteurs (pages vues, visites) rangés sous un petit ensemble de **clés de page connues**.
 * Cette liste blanche est doublement utile : elle borne le nombre de clés dans le stockage
 * (pas de gonflement possible depuis le client) et garantit qu'aucune valeur libre — donc
 * aucune donnée potentiellement identifiante glissée dans une URL — n'atteint le magasin.
 */

/** Pages suivies, par clé stable et indépendante de la langue. */
export const KNOWN_PAGES = [
  'accueil',
  'renaissances',
  'missions',
  'boutique',
  'nouveautes',
  'guide',
  'legal',
  'installation',
  'profil',
  'stats',
  'droid', // toutes les fiches de droid regroupées (évite ~379 clés distinctes)
  'autre', // filet : tout chemin inconnu
] as const

export type PageKey = (typeof KNOWN_PAGES)[number]

/** Correspondance chemin canonique → clé de page. Le préfixe de langue est retiré en amont. */
const ROUTE_TO_PAGE: Record<string, PageKey> = {
  '/': 'accueil',
  '/rebirths': 'renaissances',
  '/missions': 'missions',
  '/shop': 'boutique',
  '/updates': 'nouveautes',
  '/guide': 'guide',
  '/legal': 'legal',
  '/install': 'installation',
  '/profile': 'profil',
  '/stats': 'stats',
}

const LOCALES = ['fr', 'en', 'es', 'de', 'pt', 'it']

/**
 * Réduit un chemin quelconque à l'une des clés connues. On retire le préfixe de langue
 * (`/en/guide` → `/guide`), on ignore la requête et le fragment, puis on mappe. Les fiches
 * de droid (`/droids/…`) sont regroupées sous une seule clé ; tout le reste tombe dans
 * `autre`. Rien de ce que le client envoie ne peut créer une clé arbitraire.
 */
export function normalizePage(rawPath: string): PageKey {
  // On ne garde que le chemin, sans requête ni fragment.
  let path = String(rawPath).split('?')[0]!.split('#')[0]!
  // Retrait d'un éventuel préfixe de langue.
  const seg = path.split('/').filter(Boolean)
  if (seg.length && LOCALES.includes(seg[0]!)) seg.shift()
  path = '/' + seg.join('/')

  if (ROUTE_TO_PAGE[path]) return ROUTE_TO_PAGE[path]
  if (path.startsWith('/droids/')) return 'droid'
  return 'autre'
}

/** Date du jour au format `YYYY-MM-DD`, en UTC pour que les seaux soient stables partout. */
export function todayKey(now = new Date()): string {
  return now.toISOString().slice(0, 10)
}

/** Forme d'un seau quotidien. */
export type DayBucket = { pageviews: number, visits: number }

/** Totaux cumulés depuis toujours + compteurs par page. */
export type Totals = {
  pageviews: number
  visits: number
  pages: Partial<Record<PageKey, number>>
}
