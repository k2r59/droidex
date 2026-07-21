/**
 * Les montants du jeu vont de 950 à 45 000 000 000 000. On les abrège plutôt que
 * d'aligner 14 chiffres dans une cellule de tableau.
 */
const UNITS = [
  { threshold: 1e12, suffix: 'T' },
  { threshold: 1e9, suffix: 'Md' },
  { threshold: 1e6, suffix: 'M' },
  { threshold: 1e3, suffix: 'k' },
] as const

/** Suffixes par langue — « Md » n'existe qu'en français. */
const LOCALIZED_BILLION: Record<string, string> = { fr: 'Md', en: 'B', es: 'MM', de: 'Mrd' }

export function formatNumber(value: number | null | undefined, locale = 'fr'): string {
  if (value == null) return '—'
  if (value < 1000) return String(Math.round(value))

  for (const { threshold, suffix } of UNITS) {
    if (value >= threshold) {
      const n = value / threshold
      // Une décimale sous 100, aucune au-delà : « 1.4M » est utile, « 340.2M » ne l'est pas.
      const digits = n < 100 ? 1 : 0
      const label = suffix === 'Md' ? (LOCALIZED_BILLION[locale] ?? 'B') : suffix
      return `${n.toFixed(digits).replace(/\.0$/, '')}${label}`
    }
  }
  return String(value)
}

/** Montant complet avec séparateurs, pour les infobulles. */
export function formatExact(value: number | null | undefined, locale = 'fr'): string {
  if (value == null) return '—'
  return new Intl.NumberFormat(locale).format(value)
}

export function formatIncome(value: number | null | undefined, locale = 'fr'): string {
  if (value == null) return '—'
  return `${formatNumber(value, locale)}/s`
}
