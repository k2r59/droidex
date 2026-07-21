//#region app/utils/format.ts
/**
* Les montants du jeu vont de 950 à 45 000 000 000 000. On les abrège plutôt que
* d'aligner 14 chiffres dans une cellule de tableau.
*
* L'abrègement est délégué à `Intl` en notation compacte. Une table de suffixes écrite à
* la main ne traduisait que les milliards — le reste sortait en « k / M / T » quelle que
* soit la langue — et surtout `toFixed` imposait le point décimal, donc « 1.4Md » en
* français au lieu de « 1,4 Md ». `Intl` gère le séparateur, l'espace insécable et les
* suffixes propres à chaque langue : « 21 Md » en français, « 21B » en anglais,
* « 21 mil M » en espagnol, « 21 Mrd. » en allemand.
*
* Une décimale au plus : « 1,4 M » est utile, « 340,2 M » ne l'est pas.
*/
var compact = /* @__PURE__ */ new Map();
function formatteur(locale) {
	let f = compact.get(locale);
	if (!f) {
		f = new Intl.NumberFormat(locale, {
			notation: "compact",
			maximumFractionDigits: 1
		});
		compact.set(locale, f);
	}
	return f;
}
function formatNumber(value, locale = "fr") {
	if (value == null) return "—";
	if (value < 1e3) return String(Math.round(value));
	return formatteur(locale).format(value);
}
/** Montant complet avec séparateurs, pour les infobulles. */
function formatExact(value, locale = "fr") {
	if (value == null) return "—";
	return new Intl.NumberFormat(locale).format(value);
}
function formatIncome(value, locale = "fr") {
	if (value == null) return "—";
	return `${formatNumber(value, locale)}/s`;
}

export { formatIncome as a, formatNumber as b, formatExact as f };
//# sourceMappingURL=format-GC6uCquA.mjs.map
