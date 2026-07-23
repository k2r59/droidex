/**
 * Les montants du jeu vont de 950 à 100 000 000 000 000. On les abrège plutôt que
 * d'aligner quatorze chiffres dans une cellule de tableau.
 *
 * Suffixes en **échelle courte K/M/B/T**, celle qu'emploient le jeu et ses guides. On
 * n'utilise plus la notation compacte d'`Intl` pour le suffixe : en français, elle rend
 * l'échelle longue — « Md » pour 10⁹, « Bn » (billion) pour 10¹² — qui déroute un public
 * habitué à l'anglais du jeu, où « B » vaut 10⁹ et « T » vaut 10¹². `Intl` reste chargé de
 * la mantisse : c'est lui qui met la virgule française (« 1,4 B ») et l'espace insécable.
 *
 * Une décimale au plus : « 1,4 M » est utile, « 340,2 M » ne l'est pas.
 */
const SCALE = [
  { seuil: 1e12, suffixe: 'T' },
  { seuil: 1e9, suffixe: 'B' },
  { seuil: 1e6, suffixe: 'M' },
  { seuil: 1e3, suffixe: 'k' },
] as const

/** Espace insécable : le nombre ne doit jamais se séparer de son unité en fin de ligne. */
const NBSP = ' '

const mantisses = new Map<string, Intl.NumberFormat>()

function mantisse(locale: string): Intl.NumberFormat {
  let f = mantisses.get(locale)
  if (!f) {
    f = new Intl.NumberFormat(locale, { maximumFractionDigits: 1 })
    mantisses.set(locale, f)
  }
  return f
}

export function formatNumber(value: number | null | undefined, locale = 'fr'): string {
  if (value == null) return '—'
  const abs = Math.abs(value)
  // Sous mille, l'abrègement n'apporte rien et ferait perdre l'unité exacte.
  if (abs < 1000) return String(Math.round(value))
  const palier = SCALE.find((u) => abs >= u.seuil)!
  return `${mantisse(locale).format(value / palier.seuil)}${NBSP}${palier.suffixe}`
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
