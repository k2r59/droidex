import { todayKey, type DayBucket, type PageKey, type Totals } from '../utils/stats'

/**
 * Renvoie les statistiques agrégées pour la page publique `/stats`.
 *
 * Rien de personnel : des totaux, la répartition par page, et les 30 derniers jours. Les
 * jours sans visite sont comblés à zéro pour un graphique continu. Une trentaine de lectures
 * par affichage — négligeable, la page étant peu fréquentée.
 */

/** Retourne les 30 dernières dates (aujourd'hui inclus), de la plus ancienne à la plus récente. */
function last30Dates(): string[] {
  const days: string[] = []
  const now = new Date()
  for (let i = 29; i >= 0; i--) {
    const d = new Date(now)
    d.setUTCDate(d.getUTCDate() - i)
    days.push(todayKey(d))
  }
  return days
}

export default defineEventHandler(async () => {
  const store = useStorage('stats')

  const totals = (await store.getItem<Totals>('totals')) ?? { pageviews: 0, visits: 0, pages: {} }

  const dates = last30Dates()
  const buckets = await Promise.all(
    dates.map((d) => store.getItem<DayBucket>(`day:${d}`)),
  )
  const days = dates.map((date, i) => ({
    date,
    pageviews: buckets[i]?.pageviews ?? 0,
    visits: buckets[i]?.visits ?? 0,
  }))

  // Répartition par page, triée du plus vu au moins vu.
  const pages = (Object.entries(totals.pages) as [PageKey, number][])
    .map(([page, views]) => ({ page, views }))
    .sort((a, b) => b.views - a.views)

  return {
    totals: { pageviews: totals.pageviews, visits: totals.visits },
    pages,
    days,
    updatedAt: todayKey(),
  }
})
