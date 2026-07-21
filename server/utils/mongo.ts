import { MongoClient, type Db } from 'mongodb'

/**
 * Connexion MongoDB partagée. Nitro recharge les modules en dev à chaque HMR, donc on
 * mémorise le client sur `globalThis` pour ne pas ouvrir un pool par rechargement.
 */
declare global {
  // eslint-disable-next-line no-var
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

/** Collection de progression, typée. */
export async function progressCollection() {
  const db = await useDb()
  return db.collection<UserProgress>('progress')
}
