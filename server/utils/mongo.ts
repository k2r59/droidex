import { MongoClient, type Db } from 'mongodb'

/**
 * Connexion MongoDB partagée. Nitro recharge les modules en dev à chaque HMR, donc on
 * mémorise le client sur `globalThis` pour ne pas ouvrir un pool par rechargement.
 */
declare global {

  var __droidexMongo: Promise<MongoClient> | undefined
}

function client(): Promise<MongoClient> {
  if (!globalThis.__droidexMongo) {
    const uri = useRuntimeConfig().mongodbUri
    if (!uri) {
      throw createError({
        statusCode: 500,
        statusMessage: 'NUXT_MONGODB_URI absente — voir .env.example',
      })
    }
    globalThis.__droidexMongo = new MongoClient(uri).connect()
  }
  return globalThis.__droidexMongo
}

export async function useDb(): Promise<Db> {
  const c = await client()
  return c.db(useRuntimeConfig().mongodbDbName)
}

/**
 * Index de la collection de progression, créés une seule fois par processus.
 *
 * L'index **unique** sur `userId` est indispensable : les routes écrivent en `upsert`, et
 * sans contrainte d'unicité deux requêtes concurrentes du même utilisateur — deux onglets,
 * ou un doublon de synchronisation — peuvent créer deux documents dont un seul sera
 * ensuite relu. Il supprime au passage le balayage complet de collection à chaque lecture.
 */
let indexesReady: Promise<unknown> | undefined

/** Collection de progression, typée. */
export async function progressCollection() {
  const db = await useDb()
  const collection = db.collection<UserProgress>('progress')

  indexesReady ??= collection
    .createIndex({ userId: 1 }, { unique: true, name: 'userId_unique' })
    .catch((err) => {
      // Un échec d'index ne doit pas empêcher l'app de servir : on le signale et on continue.
      console.error('[mongo] création de l’index userId impossible :', err)
      indexesReady = undefined
    })
  await indexesReady

  return collection
}
