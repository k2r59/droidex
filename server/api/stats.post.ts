import { z } from 'zod'
import { normalizePage, todayKey, type DayBucket, type Totals } from '../utils/stats'

/**
 * Reçoit un **beacon de fin de visite** et met à jour les compteurs agrégés.
 *
 * Le client n'envoie qu'une fois par visite (à la fermeture de l'onglet), la liste des pages
 * parcourues. On incrémente : les totaux, le compteur par page, et le seau du jour. Aucune
 * donnée personnelle n'est reçue ni stockée — seulement des chemins, aussitôt réduits à des
 * clés de page connues.
 *
 * Réponse `204` sans corps : `navigator.sendBeacon` ne lit pas la réponse.
 */

// Bornes de sûreté : une visite ne parcourt pas 200 pages, un chemin ne fait pas 512 car.
const bodySchema = z.object({
  paths: z.array(z.string().max(512)).max(200),
  newVisit: z.boolean().optional().default(true),
})

export default defineEventHandler(async (event) => {
  const body = await readValidatedBody(event, bodySchema.parse)

  const pages = body.paths.map(normalizePage)
  const pageviews = pages.length
  if (pageviews === 0 && !body.newVisit) {
    setResponseStatus(event, 204)
    return null
  }

  const store = useStorage('stats')

  // Totaux cumulés + répartition par page.
  const totals = (await store.getItem<Totals>('totals')) ?? { pageviews: 0, visits: 0, pages: {} }
  totals.pageviews += pageviews
  if (body.newVisit) totals.visits += 1
  for (const page of pages) {
    totals.pages[page] = (totals.pages[page] ?? 0) + 1
  }
  await store.setItem('totals', totals)

  // Seau du jour (sert au graphique des 30 derniers jours).
  const dayId = `day:${todayKey()}`
  const day = (await store.getItem<DayBucket>(dayId)) ?? { pageviews: 0, visits: 0 }
  day.pageviews += pageviews
  if (body.newVisit) day.visits += 1
  await store.setItem(dayId, day)

  setResponseStatus(event, 204)
  return null
})
