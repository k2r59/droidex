/**
 * Filtre des pseudos : refuse les termes haineux et sexuellement explicites.
 *
 * Périmètre volontairement restreint. La grossièreté ordinaire, l'usurpation de rôle ou
 * les pseudos simplement de mauvais goût ne sont pas filtrés : chaque règle ajoutée
 * fabrique des faux positifs, et un joueur refusé sans comprendre pourquoi ne revient pas.
 *
 * Une recherche de sous-chaîne naïve échoue dans les deux sens :
 *
 * - elle se contourne par le leet speak (`n1gg3r`), les accents, les séparateurs
 *   (`c-o-n-n-a-r-d`) ou la répétition de lettres ;
 * - elle produit des faux positifs — le « problème de Scunthorpe ». `Cassiopée` contient
 *   « ass », `Constantin` contient « con », `Sexton` contient « sex ».
 *
 * D'où deux listes distinctes : les termes assez longs et spécifiques pour être cherchés
 * n'importe où, et ceux, courts ou homographes d'un mot courant, qui ne comptent que si
 * le pseudo s'y réduit entièrement.
 */

/** Repliement du leet speak et des artifices de contournement. */
const SUBSTITUTIONS: Record<string, string> = {
  '4': 'a', '@': 'a', '8': 'b', '(': 'c', '3': 'e', '6': 'g',
  '1': 'i', '!': 'i', '|': 'i', '0': 'o', '5': 's', '$': 's',
  '7': 't', '+': 't', '9': 'g',
  // Volontairement absent : 2 → z. Les noms de droids en sont truffés (R2-D2, 2BB) et
  // « 2 » pour « z » n'est pas un contournement courant.
}

/**
 * Normalise pour la comparaison uniquement — le pseudo affiché n'est pas modifié.
 *
 * Décompose les accents, replie le leet speak, retire tout ce qui n'est pas une lettre
 * (séparateurs, chiffres résiduels, caractères invisibles), puis écrase les répétitions :
 * `cooonnnard` et `c.o.n.n.a.r.d` se ramènent tous deux à `conard`.
 */
export function normalizeForFilter(input: string): string {
  const replie = input
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .split('')
    .map((c) => SUBSTITUTIONS[c] ?? c)
    .join('')
    .replace(/[^a-z]/g, '')

  // Écrase les répétitions de 3 lettres et plus, sans toucher aux doublements légitimes.
  return replie.replace(/(.)\1{2,}/g, '$1$1')
}

/**
 * Cherchés **n'importe où** dans le pseudo normalisé. Chaque entrée est assez longue et
 * spécifique pour qu'un mot français ou anglais courant ne la contienne pas.
 *
 * Liste de départ : la modération d'une communauté ne s'écrit pas d'avance, elle se
 * complète au fil des abus constatés.
 */
const TERMES_INTERDITS = [
  // Haine raciale, ethnique, religieuse
  'nigger', 'nigga', 'bougnoule', 'youpin', 'chinetoque',
  'ratonnade', 'negrolatre',
  // Apologie
  'hitler', 'heilhitler', 'kukluxklan', 'whitepower', 'gaschamber',
  'chambreagaz', 'nazillon', 'sieghell', 'siegheil',
  // Homophobie, transphobie
  'pedale', 'tarlouze', 'faggot', 'tranny',
  // Sexuel explicite
  'porno', 'pornhub', 'hentai', 'bukkake', 'gangbang', 'blowjob',
  'creampie', 'cumshot', 'masturb', 'penis', 'vagin', 'zoophil',
  'pedophil', 'pedobear', 'enculer', 'salope', 'branlette',
]

/**
 * Ne comptent que si le pseudo **s'y réduit entièrement**.
 *
 * Ces termes sont soit trop courts, soit contenus dans des mots parfaitement anodins :
 * « pute » est dans *député*, *réputation*, *dispute* ; « nique » dans *technique*,
 * *unique*, *clinique* ; « chatte » et « baiser » ont un sens courant. Les chercher en
 * sous-chaîne refuserait des pseudos innocents, ce qui est pire que de laisser passer
 * un « Nique » isolé.
 */
const MOTS_INTERDITS = [
  'pute', 'putain', 'nique', 'niquer', 'chatte', 'baiser',
  'bite', 'sexe', 'sex', 'anal', 'anus', 'encule', 'negre',
  'nazi', 'ss',
  // « kk » et non « kkk » : l'écrasement des répétitions ramène toute suite de 3 lettres
  // identiques à 2, donc « kkk » ne peut jamais apparaître après normalisation. Toute
  // entrée de ces listes doit être écrite dans sa forme déjà normalisée.
  'kk',
]

/**
 * `true` si le pseudo est acceptable.
 *
 * Le refus renvoyé au client reste générique : détailler la règle enfreinte revient à
 * publier le mode d'emploi du contournement.
 */
export function isUsernameAllowed(username: string): boolean {
  const n = normalizeForFilter(username)

  // Aucune contrainte de longueur ici : elle appartient à `minUsernameLength` du plugin.
  // Un seuil posé sur la forme normalisée refusait `R2D2`, réduit à « rd » une fois les
  // chiffres retirés — exactement le genre de pseudo attendu sur ce site.
  if (TERMES_INTERDITS.some((t) => n.includes(t))) return false
  if (MOTS_INTERDITS.includes(n)) return false

  return true
}
