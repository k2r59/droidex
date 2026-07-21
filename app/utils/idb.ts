/**
 * Petit magasin clé-valeur sur IndexedDB.
 *
 * Écrit à la main plutôt qu'emprunté à une bibliothèque : on n'a besoin que de trois
 * opérations, et une dépendance de plus pour ça alourdirait le bundle sans rien apporter.
 *
 * IndexedDB est asynchrone, contrairement à `localStorage` : toutes les fonctions rendent
 * une promesse. C'est le coût du changement, et la raison pour laquelle l'hydratation du
 * store doit être attendue plutôt que lue en ligne.
 */

const DB_NAME = 'droidex'
const DB_VERSION = 1
const STORE = 'kv'

let connexion: Promise<IDBDatabase> | undefined

function open(): Promise<IDBDatabase> {
  connexion ??= new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, DB_VERSION)
    req.onupgradeneeded = () => {
      if (!req.result.objectStoreNames.contains(STORE)) req.result.createObjectStore(STORE)
    }
    req.onsuccess = () => resolve(req.result)
    req.onerror = () => reject(req.error)
  })
  return connexion
}

/** Enveloppe une transaction dans une promesse, en attendant la fin de la transaction. */
async function tx<T>(mode: IDBTransactionMode, run: (s: IDBObjectStore) => IDBRequest<T>): Promise<T> {
  const db = await open()
  return new Promise<T>((resolve, reject) => {
    const t = db.transaction(STORE, mode)
    const req = run(t.objectStore(STORE))
    // On résout sur `oncomplete` et non sur `req.onsuccess` : en écriture, le succès de la
    // requête précède la validation de la transaction, et resoudre trop tôt laisserait
    // croire que la donnée est écrite alors qu'elle peut encore échouer.
    t.oncomplete = () => resolve(req.result)
    t.onerror = () => reject(t.error)
    t.onabort = () => reject(t.error)
  })
}

/** `true` si le navigateur expose IndexedDB — absent en SSR et dans certains modes privés. */
export const idbAvailable = () => typeof indexedDB !== 'undefined'

export async function idbGet<T>(key: string): Promise<T | undefined> {
  if (!idbAvailable()) return undefined
  try {
    return await tx<T>('readonly', (s) => s.get(key) as IDBRequest<T>)
  }
  catch {
    return undefined
  }
}

/**
 * Détache la valeur de Vue avant l'écriture.
 *
 * `structuredClone` refuse un Proxy — et un état Pinia en est un. L'appeler directement
 * levait donc `DataCloneError` sur *chaque* écriture ; comme l'appelant ignore la promesse
 * et que l'erreur est rattrapée ici, la panne était totalement silencieuse : l'interface
 * se mettait à jour, la progression n'était jamais écrite, et le rechargement la perdait.
 *
 * Le passage par JSON déréférence les proxies à toute profondeur. C'est acceptable parce
 * que ce magasin ne stocke que du JSON — nombres, chaînes, booléens, tableaux et objets
 * simples. Une `Date`, une `Map` ou un `undefined` n'y survivraient pas ; il n'y en a pas,
 * et le typage de `Snapshot` l'interdit.
 */
function detache(value: unknown): unknown {
  return JSON.parse(JSON.stringify(value))
}

export async function idbSet(key: string, value: unknown): Promise<void> {
  if (!idbAvailable()) return
  try {
    await tx('readwrite', (s) => s.put(detache(value), key))
  }
  catch {
    // Stockage indisponible ou quota atteint : la session reste utilisable, sans persistance.
  }
}

export async function idbDel(key: string): Promise<void> {
  if (!idbAvailable()) return
  try {
    await tx('readwrite', (s) => s.delete(key))
  }
  catch {
    // Idem : un échec d'effacement ne doit pas interrompre l'utilisateur.
  }
}
