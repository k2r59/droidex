import de from '~/data/i18n/de.json'
import en from '~/data/i18n/en.json'
import es from '~/data/i18n/es.json'
import fr from '~/data/i18n/fr.json'

/**
 * Prose des fichiers de données du jeu (`app/data/*.json`), séparée de la donnée
 * structurée pour être traduisible.
 *
 * **Pourquoi un second système à côté de `$t`.** Les fichiers `i18n/locales/*.json`
 * décrivent l'interface — libellés, titres, gabarits de phrase. Ce dictionnaire-ci décrit
 * le *contenu* : notes de version, effets d'article, conseils. Les deux évoluent à des
 * rythmes différents et à partir de sources différentes (le contenu suit les patch notes
 * du jeu), les garder séparés évite de mélanger les deux dans un même fichier de 400 clés.
 *
 * **Pourquoi des imports statiques.** Les quatre dictionnaires pèsent une quinzaine de
 * kilo-octets chacun. Les charger tous évite un `await` dans le rendu — donc pas de
 * Suspense, pas d'écart d'hydratation, et la langue change sans requête réseau. Un
 * chargement paresseux coûterait plus cher en complexité qu'il ne ferait gagner d'octets.
 */
type GameTextNode = string | { [key: string]: GameTextNode }

const DICTIONARIES: Record<string, GameTextNode> = { fr, en, es, de }

/** Langue source : c'est en français qu'un texte est rédigé avant d'être traduit. */
const FALLBACK_LOCALE = 'fr'

/** Descend l'arborescence par segments. Renvoie `null` dès qu'un segment manque. */
function lookupNode(root: GameTextNode | undefined, path: string): GameTextNode | null {
  let node: GameTextNode | undefined = root
  for (const segment of path.split('.')) {
    if (node === undefined || typeof node === 'string') return null
    node = node[segment]
  }
  return node ?? null
}

/** Variante qui n'accepte que les feuilles. */
function lookup(root: GameTextNode | undefined, path: string): string | null {
  const node = lookupNode(root, path)
  return typeof node === 'string' ? node : null
}

export function useGameText() {
  const { locale } = useI18n()

  const dictionary = computed(() => DICTIONARIES[locale.value] ?? DICTIONARIES[FALLBACK_LOCALE]!)

  /**
   * Texte de contenu à un chemin donné, par exemple `updates.entries.3.body`.
   *
   * Repli en cascade : langue courante, puis français, puis chaîne vide. La chaîne vide
   * plutôt que le chemin brut, parce que la plupart de ces textes sont optionnels côté
   * gabarit (`v-if="gameText(…)"`) — une clé absente doit faire disparaître le bloc, pas
   * afficher un identifiant technique au joueur.
   */
  function gameText(path: string): string {
    return lookup(dictionary.value, path) ?? lookup(DICTIONARIES[FALLBACK_LOCALE], path) ?? ''
  }

  /**
   * Liste de textes à un chemin donné, par exemple `mechanics.tips`.
   *
   * Les tableaux de prose des fichiers source (conseils, stratégies, exemples de quêtes)
   * deviennent ici des objets indexés `{ "0": …, "1": … }`. Les gabarits ont besoin de la
   * liste complète sans connaître sa longueur, et cette longueur n'a plus de raison d'être
   * dupliquée dans `app/data/*.json` : elle est une propriété du texte, pas de la donnée.
   */
  function gameTextList(path: string): string[] {
    const node = (lookupNode(dictionary.value, path) ?? lookupNode(DICTIONARIES[FALLBACK_LOCALE], path))
    if (node === null || typeof node === 'string') return []
    // Tri numérique : `Object.keys` rend déjà les clés entières dans l'ordre, mais on ne
    // dépend pas de ce détail de spécification pour l'ordre d'affichage.
    return Object.keys(node)
      .sort((a, b) => Number(a) - Number(b))
      .map((k) => node[k])
      .filter((v): v is string => typeof v === 'string')
  }

  return { gameText, gameTextList }
}
