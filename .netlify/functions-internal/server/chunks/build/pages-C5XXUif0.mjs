import { a as useI18n, d as useSeoMeta$1, u as useRoute$1, C as ClientOnly, b as useLocalePath, N as NuxtLink } from '../virtual/entry.mjs';
import { D as DxIcon_default } from './DxIcon-70RsSwuM.mjs';
import { u as useCollectionStore } from './collection-CMF38Hwi.mjs';
import { o as onKeyStroke } from './dist-BxHIjq2A.mjs';
import { u as useAuthSession } from './useAuthSession-AQGXZ6Q7.mjs';
import { a as formatIncome, b as formatNumber } from './format-GC6uCquA.mjs';
import { D as DroidImage_default } from './DroidImage-cGvQPK3j.mjs';
import { I as IconicPanel_default } from './IconicPanel-DhM6-3GF.mjs';
import { R as RarityBadge_default } from './RarityBadge-BGlq658Y.mjs';
import { T as TierSelector_default } from './TierSelector-DDTg0Zg0.mjs';
import { P as PageBanner_default } from './PageBanner-B_1qgWUv.mjs';
import { defineComponent, ref, computed, useTemplateRef, mergeProps, withCtx, createVNode, unref, toDisplayString, openBlock, createBlock, Fragment, renderList, createTextVNode, createCommentVNode, watch, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderAttr, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderList, ssrRenderClass } from 'vue/server-renderer';
import 'unhead/plugins';
import 'unhead/utils';
import '../routes/renderer.mjs';
import '../nitro/nitro.mjs';
import 'mongodb';
import 'better-auth';
import 'better-auth/adapters/mongodb';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'vue-router';
import 'unhead/server';
import 'unhead/legacy';
import 'nostics';
import 'vue-bundle-renderer/runtime';
import 'devalue';
import 'fnv1a-64';
import 'object-identity';
import 'perfect-debounce';
import 'pinia';
import 'better-auth/vue';

//#region app/components/HomeHero.vue?vue&type=script&setup=true&lang.ts
var RADIUS = 42;
var HomeHero_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "HomeHero",
	__ssrInlineRender: true,
	setup(__props) {
		/**
		* Bannière d'accueil : titre, anneau de complétion et répartition par rareté.
		*
		* L'illustration et le voile de lecture sont pris en charge par `PageBanner`, qui gère
		* les trois cadrages du pack. On avait d'abord la scène cinématique de Tatooine, mais
		* elle est si lumineuse qu'il fallait la masquer à 97 % pour lire le titre — autant
		* utiliser la bannière prévue pour cette page, sombre et sans texte.
		*/
		const store = useCollectionStore();
		const { locale } = useI18n();
		const { isAuthenticated } = useAuthSession();
		const completion = computed(() => store.totalCount ? Math.round(store.ownedCount / store.totalCount * 100) : 0);
		/** Périmètre du cercle de progression, pour piloter le trait en dasharray. */
		const CIRCUMFERENCE = 2 * Math.PI * RADIUS;
		const RARITY_TEXT = {
			common: "text-common",
			rare: "text-rare",
			epic: "text-epic",
			legendary: "text-legendary",
			mythic: "text-mythic",
			iconic: "text-iconic"
		};
		/**
		* Pastille de rareté : contour teinté et lavis dégradé qui s'éteint vers la droite, pour
		* que le compteur reste lisible par-dessus l'illustration. Les classes sont écrites en
		* toutes lettres — Tailwind ne génère que ce qu'il trouve littéralement dans les sources.
		*/
		const RARITY_CHIP = {
			common: "border-common/45 from-common/12",
			rare: "border-rare/45 from-rare/20",
			epic: "border-epic/45 from-epic/20",
			legendary: "border-legendary/45 from-legendary/22",
			mythic: "border-mythic/45 from-mythic/22",
			iconic: "border-iconic/45 from-iconic/20"
		};
		return (_ctx, _push, _parent, _attrs) => {
			const _component_PageBanner = PageBanner_default;
			const _component_DxIcon = DxIcon_default;
			_push(ssrRenderComponent(_component_PageBanner, mergeProps({
				name: "droidex",
				"min-height": "15rem"
			}, _attrs), {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(`<div class="flex flex-col gap-5 lg:flex-row lg:items-center"${_scopeId}><div class="flex-1"${_scopeId}><h1 class="text-4xl font-bold tracking-tight lg:text-5xl"${_scopeId}>DROIDEX</h1><p class="mt-1 font-display text-lg font-semibold"${_scopeId}>${ssrInterpolate(_ctx.$t("home.subtitle"))}</p><p class="mt-2 max-w-sm text-sm text-ink-muted"${_scopeId}>${ssrInterpolate(_ctx.$t("home.tagline"))}</p></div><div class="flex shrink-0 flex-col items-center gap-1"${_scopeId}><div class="relative grid size-32 place-items-center"${_scopeId}><svg class="absolute inset-0 -rotate-90" viewBox="0 0 100 100"${_scopeId}><circle cx="50" cy="50"${ssrRenderAttr("r", RADIUS - 4)} class="fill-void/70"${_scopeId}></circle><circle cx="50" cy="50"${ssrRenderAttr("r", RADIUS)} fill="none" stroke="currentColor" stroke-width="9" class="text-edge/70"${_scopeId}></circle><circle cx="50" cy="50"${ssrRenderAttr("r", RADIUS)} fill="none" stroke="currentColor" stroke-width="9" stroke-linecap="round" class="text-accent drop-shadow-[0_0_6px_rgba(37,215,255,0.55)] transition-[stroke-dashoffset] duration-700"${ssrRenderAttr("stroke-dasharray", CIRCUMFERENCE)}${ssrRenderAttr("stroke-dashoffset", CIRCUMFERENCE * (1 - unref(completion) / 100))}${_scopeId}></circle></svg><span class="relative font-mono text-3xl font-bold tabular-nums text-ink-strong"${_scopeId}>${ssrInterpolate(unref(completion))}%</span></div><p class="text-xs text-ink-muted"${_scopeId}>${ssrInterpolate(_ctx.$t("stats.totalIncome"))}</p><p class="font-mono text-lg tabular-nums text-accent"${_scopeId}>${ssrInterpolate(("formatIncome" in _ctx ? _ctx.formatIncome : unref(formatIncome))(unref(store).totalIncome, unref(locale)))}</p></div></div><div class="flex flex-wrap gap-2"${_scopeId}><!--[-->`);
						ssrRenderList(unref(store).dataset.rarities, (r) => {
							_push(`<div class="${ssrRenderClass([RARITY_CHIP[r], "flex min-w-[9rem] items-center justify-between gap-4 rounded-md border bg-gradient-to-r to-transparent bg-void/55 px-3.5 py-1.5 backdrop-blur"])}"${_scopeId}><span class="${ssrRenderClass([RARITY_TEXT[r], "text-[0.8125rem] font-semibold"])}"${_scopeId}>${ssrInterpolate(_ctx.$t(`rarity.${r}`))}</span><span class="${ssrRenderClass([RARITY_TEXT[r], "font-mono text-[0.8125rem] font-bold tabular-nums"])}"${_scopeId}>${ssrInterpolate(unref(store).countByRarity[r].owned)}/${ssrInterpolate(unref(store).countByRarity[r].total)}</span></div>`);
						});
						_push(`<!--]--></div>`);
						if (!unref(isAuthenticated)) {
							_push(`<p class="flex items-center gap-2 rounded-md border border-edge bg-void/60 px-4 py-2.5 text-[0.8125rem] text-ink-muted backdrop-blur"${_scopeId}>`);
							_push(ssrRenderComponent(_component_DxIcon, {
								name: "status/locked",
								size: 15,
								class: "shrink-0"
							}, null, _parent, _scopeId));
							_push(` ${ssrInterpolate(_ctx.$t("auth.signInPrompt"))}</p>`);
						} else _push(`<!---->`);
					} else return [
						createVNode("div", { class: "flex flex-col gap-5 lg:flex-row lg:items-center" }, [createVNode("div", { class: "flex-1" }, [
							createVNode("h1", { class: "text-4xl font-bold tracking-tight lg:text-5xl" }, "DROIDEX"),
							createVNode("p", { class: "mt-1 font-display text-lg font-semibold" }, toDisplayString(_ctx.$t("home.subtitle")), 1),
							createVNode("p", { class: "mt-2 max-w-sm text-sm text-ink-muted" }, toDisplayString(_ctx.$t("home.tagline")), 1)
						]), createVNode("div", { class: "flex shrink-0 flex-col items-center gap-1" }, [
							createVNode("div", { class: "relative grid size-32 place-items-center" }, [(openBlock(), createBlock("svg", {
								class: "absolute inset-0 -rotate-90",
								viewBox: "0 0 100 100"
							}, [
								createVNode("circle", {
									cx: "50",
									cy: "50",
									r: RADIUS - 4,
									class: "fill-void/70"
								}, null, 8, ["r"]),
								createVNode("circle", {
									cx: "50",
									cy: "50",
									r: RADIUS,
									fill: "none",
									stroke: "currentColor",
									"stroke-width": "9",
									class: "text-edge/70"
								}),
								createVNode("circle", {
									cx: "50",
									cy: "50",
									r: RADIUS,
									fill: "none",
									stroke: "currentColor",
									"stroke-width": "9",
									"stroke-linecap": "round",
									class: "text-accent drop-shadow-[0_0_6px_rgba(37,215,255,0.55)] transition-[stroke-dashoffset] duration-700",
									"stroke-dasharray": CIRCUMFERENCE,
									"stroke-dashoffset": CIRCUMFERENCE * (1 - unref(completion) / 100)
								}, null, 8, ["stroke-dashoffset"])
							])), createVNode("span", { class: "relative font-mono text-3xl font-bold tabular-nums text-ink-strong" }, toDisplayString(unref(completion)) + "%", 1)]),
							createVNode("p", { class: "text-xs text-ink-muted" }, toDisplayString(_ctx.$t("stats.totalIncome")), 1),
							createVNode("p", { class: "font-mono text-lg tabular-nums text-accent" }, toDisplayString(("formatIncome" in _ctx ? _ctx.formatIncome : unref(formatIncome))(unref(store).totalIncome, unref(locale))), 1)
						])]),
						createVNode("div", { class: "flex flex-wrap gap-2" }, [(openBlock(true), createBlock(Fragment, null, renderList(unref(store).dataset.rarities, (r) => {
							return openBlock(), createBlock("div", {
								key: r,
								class: ["flex min-w-[9rem] items-center justify-between gap-4 rounded-md border bg-gradient-to-r to-transparent bg-void/55 px-3.5 py-1.5 backdrop-blur", RARITY_CHIP[r]]
							}, [createVNode("span", { class: ["text-[0.8125rem] font-semibold", RARITY_TEXT[r]] }, toDisplayString(_ctx.$t(`rarity.${r}`)), 3), createVNode("span", { class: ["font-mono text-[0.8125rem] font-bold tabular-nums", RARITY_TEXT[r]] }, toDisplayString(unref(store).countByRarity[r].owned) + "/" + toDisplayString(unref(store).countByRarity[r].total), 3)], 2);
						}), 128))]),
						!unref(isAuthenticated) ? (openBlock(), createBlock("p", {
							key: 0,
							class: "flex items-center gap-2 rounded-md border border-edge bg-void/60 px-4 py-2.5 text-[0.8125rem] text-ink-muted backdrop-blur"
						}, [createVNode(_component_DxIcon, {
							name: "status/locked",
							size: 15,
							class: "shrink-0"
						}), createTextVNode(" " + toDisplayString(_ctx.$t("auth.signInPrompt")), 1)])) : createCommentVNode("", true)
					];
				}),
				_: 1
			}, _parent));
		};
	}
});
//#endregion
//#region app/components/HomeHero.vue
var _sfc_setup$3 = HomeHero_vue_vue_type_script_setup_true_lang_default.setup;
HomeHero_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/HomeHero.vue");
	return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
var HomeHero_default = Object.assign(HomeHero_vue_vue_type_script_setup_true_lang_default, { __name: "HomeHero" });
//#endregion
//#region app/composables/useHydratedStorage.ts
/**
* Référence persistée dans `localStorage`, sans casser l'hydratation.
*
* `useLocalStorage` de VueUse lit le stockage dès l'initialisation côté client, alors que
* le rendu serveur n'a que la valeur par défaut : le premier rendu client diffère du HTML
* envoyé, et Vue signale un « hydration mismatch ». On garde donc la valeur par défaut
* jusqu'au montage, puis on adopte celle du stockage.
*
* Le coût est un flash d'un frame sur les préférences persistées ; en échange l'hydratation
* est propre et le SSR reste utilisable pour le référencement.
*/
function useHydratedStorage(key, defaultValue) {
	return ref(defaultValue);
}
//#endregion
//#region app/components/NextPurchaseAdvisor.vue?vue&type=script&setup=true&lang.ts
/**
* Budget par défaut : 10 000 crédits. Sans plafond, le classement est dominé par des
* paliers hors de portée en début de partie ; un budget d'entrée donne d'emblée une liste
* réellement achetable. `null` reste possible et signifie « illimité ».
*/
var DEFAULT_BUDGET = 1e4;
var NextPurchaseAdvisor_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "NextPurchaseAdvisor",
	__ssrInlineRender: true,
	setup(__props) {
		const store = useCollectionStore();
		const { locale } = useI18n();
		const localePath = useLocalePath();
		const budget = useHydratedStorage("droidex:budget", DEFAULT_BUDGET);
		/**
		* Saisie du budget en texte plutôt qu'en `<input type="number">`.
		*
		* Les montants du jeu se comptent en centaines de millions : taper « 300000000 » au
		* clavier est pénible et illisible une fois saisi. On accepte donc les suffixes du jeu
		* (« 15k », « 1,2M », « 3.5b »), les espaces et la virgule décimale française, et on
		* réaffiche la valeur formatée dès que le champ perd le focus.
		*/
		const budgetText = ref("");
		const budgetFocused = ref(false);
		/** Paliers usuels : un clic vaut mieux qu'une saisie à huit chiffres. */
		const PRESETS = [
			1e4,
			1e5,
			1e6,
			1e7,
			1e8
		];
		watch(budget, (v) => {
			if (!budgetFocused.value) budgetText.value = v === null ? "" : formatNumber(v, locale.value);
		}, { immediate: true });
		const candidates = computed(() => {
			const out = [];
			for (const droid of store.droids) {
				if (droid.percentIncome) continue;
				if (store.entry(droid.slug).tier) continue;
				const base = droid.tiers.DEFAULT;
				if (!base?.cost || !base.income) continue;
				out.push({
					droid,
					tier: "DEFAULT",
					cost: base.cost,
					income: base.income,
					gain: base.income,
					ratio: base.income / base.cost
				});
			}
			return out.sort((a, b) => b.ratio - a.ratio);
		});
		/**
		* Ce que le joueur peut réellement s'offrir, s'il a saisi un budget.
		*
		* Le test porte sur `null` et non sur la véracité : un budget de 0 est une saisie
		* légitime (« je n'ai plus rien »), qui doit vider la liste et non la laisser entière
		* comme le ferait un `budget.value ? …`.
		*/
		const affordable = computed(() => budget.value === null ? candidates.value : candidates.value.filter((c) => c.cost <= budget.value));
		const shown = computed(() => affordable.value.slice(0, 8));
		/** Temps d'amortissement : combien de secondes pour rembourser l'achat. */
		const payback = (c) => c.cost / c.gain;
		function formatPayback(seconds) {
			if (seconds < 60) return `${Math.round(seconds)} s`;
			if (seconds < 3600) return `${Math.round(seconds / 60)} min`;
			if (seconds < 86400) return `${Math.round(seconds / 3600)} h`;
			return `${Math.round(seconds / 86400)} j`;
		}
		return (_ctx, _push, _parent, _attrs) => {
			const _component_DxIcon = DxIcon_default;
			const _component_DroidImage = DroidImage_default;
			const _component_NuxtLink = NuxtLink;
			_push(`<section${ssrRenderAttrs(mergeProps({ class: "rounded-card border border-edge bg-panel p-6" }, _attrs))}><div class="mb-3 flex flex-wrap items-center justify-between gap-3"><div><h2 class="font-semibold">${ssrInterpolate(_ctx.$t("advisor.title"))}</h2><p class="text-xs text-ink-muted">${ssrInterpolate(_ctx.$t("advisor.hint"))}</p></div><div class="flex flex-col items-end gap-1.5"><label class="flex items-center gap-2 text-sm"><span class="text-xs text-ink-muted">${ssrInterpolate(_ctx.$t("advisor.budget"))}</span><span class="flex items-center gap-2 rounded-lg border border-edge bg-panel-raised px-3 py-1.5 transition-colors focus-within:border-accent">`);
			_push(ssrRenderComponent(_component_DxIcon, {
				name: "resources/credits",
				size: 15,
				class: "shrink-0 text-ink-muted"
			}, null, _parent));
			_push(`<input${ssrRenderAttr("value", unref(budgetText))} type="text" inputmode="decimal"${ssrRenderAttr("placeholder", _ctx.$t("advisor.noBudget"))} class="w-24 bg-transparent text-right font-mono tabular-nums placeholder:text-ink-muted focus:outline-none">`);
			if (unref(budget) !== null) {
				_push(`<button type="button" class="shrink-0 text-ink-muted transition-colors hover:text-ink"${ssrRenderAttr("aria-label", _ctx.$t("advisor.noBudget"))}>`);
				_push(ssrRenderComponent(_component_DxIcon, {
					name: "actions/close",
					size: 13
				}, null, _parent));
				_push(`</button>`);
			} else _push(`<!---->`);
			_push(`</span></label><div class="flex flex-wrap justify-end gap-1"><!--[-->`);
			ssrRenderList(PRESETS, (p) => {
				_push(`<button type="button" class="${ssrRenderClass([unref(budget) === p ? "border-accent bg-accent/10 text-accent" : "border-edge text-ink-muted hover:border-edge-strong hover:text-ink", "rounded-md border px-2 py-0.5 font-mono text-[0.7rem] tabular-nums transition-colors"])}">${ssrInterpolate(("formatNumber" in _ctx ? _ctx.formatNumber : unref(formatNumber))(p, unref(locale)))}</button>`);
			});
			_push(`<!--]--></div></div></div><p class="mb-3 flex items-start gap-2 text-xs text-ink-muted">`);
			_push(ssrRenderComponent(_component_DxIcon, {
				name: "status/info",
				size: 14,
				class: "mt-px shrink-0 text-rare"
			}, null, _parent));
			_push(` ${ssrInterpolate(_ctx.$t("advisor.creditsOnly"))}</p>`);
			if (!unref(shown).length) _push(`<p class="py-4 text-center text-sm text-ink-muted">${ssrInterpolate(unref(budget) !== null ? _ctx.$t("advisor.nothingAffordable") : _ctx.$t("advisor.allOwned"))}</p>`);
			else {
				_push(`<ol class="flex flex-col gap-1.5"><!--[-->`);
				ssrRenderList(unref(shown), (c, i) => {
					_push(`<li class="flex items-center gap-3 rounded-lg bg-panel-raised p-2"><span class="w-4 shrink-0 text-center text-xs text-ink-muted">${ssrInterpolate(i + 1)}</span>`);
					_push(ssrRenderComponent(_component_DroidImage, {
						droid: c.droid,
						tier: c.tier,
						size: "sm"
					}, null, _parent));
					_push(`<div class="min-w-0 flex-1">`);
					_push(ssrRenderComponent(_component_NuxtLink, {
						to: unref(localePath)(`/droids/${c.droid.slug}`),
						class: "block truncate text-sm font-medium hover:underline"
					}, {
						default: withCtx((_, _push, _parent, _scopeId) => {
							if (_push) _push(`${ssrInterpolate(c.droid.name)}`);
							else return [createTextVNode(toDisplayString(c.droid.name), 1)];
						}),
						_: 2
					}, _parent));
					_push(`<p class="text-xs text-ink-muted">${ssrInterpolate(_ctx.$t(`rarity.${c.droid.rarity}`))}</p></div><div class="text-right text-xs"><p class="font-mono tabular-nums text-valid"> +${ssrInterpolate(("formatIncome" in _ctx ? _ctx.formatIncome : unref(formatIncome))(c.gain, unref(locale)))}</p><p class="font-mono tabular-nums text-ink-muted">${ssrInterpolate(("formatNumber" in _ctx ? _ctx.formatNumber : unref(formatNumber))(c.cost, unref(locale)))}</p></div><div class="hidden w-20 text-right sm:block"><p class="text-xs text-ink-muted">${ssrInterpolate(_ctx.$t("advisor.payback"))}</p><p class="font-mono text-xs tabular-nums">${ssrInterpolate(formatPayback(payback(c)))}</p></div></li>`);
				});
				_push(`<!--]--></ol>`);
			}
			_push(`</section>`);
		};
	}
});
//#endregion
//#region app/components/NextPurchaseAdvisor.vue
var _sfc_setup$2 = NextPurchaseAdvisor_vue_vue_type_script_setup_true_lang_default.setup;
NextPurchaseAdvisor_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/NextPurchaseAdvisor.vue");
	return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
var NextPurchaseAdvisor_default = Object.assign(NextPurchaseAdvisor_vue_vue_type_script_setup_true_lang_default, { __name: "NextPurchaseAdvisor" });
//#endregion
//#region app/components/DroidCard.vue?vue&type=script&setup=true&lang.ts
var DroidCard_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "DroidCard",
	__ssrInlineRender: true,
	props: { droid: {} },
	setup(__props) {
		const props = __props;
		const store = useCollectionStore();
		const { locale } = useI18n();
		const localePath = useLocalePath();
		const entry = computed(() => store.entry(props.droid.slug));
		const owned = computed(() => entry.value.tier !== null);
		/** Palier survolé dans le sélecteur — prime sur le palier possédé pour l'illustration. */
		const previewTier = ref(null);
		/**
		* Illustration affichée : le palier survolé, sinon le palier possédé, sinon Default.
		* C'est ce qui permet de voir la version Or ou Beskar d'un droid sans le posséder.
		*/
		const shownTier = computed(() => previewTier.value ?? entry.value.tier ?? "DEFAULT");
		const stats = computed(() => props.droid.tiers[shownTier.value]);
		const RARITY_RING = {
			common: "border-common/40",
			rare: "border-rare/50",
			epic: "border-epic/50",
			legendary: "border-legendary/60",
			mythic: "border-mythic/60",
			iconic: "border-iconic/60"
		};
		return (_ctx, _push, _parent, _attrs) => {
			const _component_DroidImage = DroidImage_default;
			const _component_NuxtLink = NuxtLink;
			const _component_RarityBadge = RarityBadge_default;
			const _component_TierSelector = TierSelector_default;
			_push(`<article${ssrRenderAttrs(mergeProps({ class: ["droid-card group relative flex flex-col gap-3 rounded-card border bg-panel p-3 transition-colors", [RARITY_RING[__props.droid.rarity], unref(owned) ? "bg-panel-raised" : "hover:bg-panel-raised"]] }, _attrs))}>`);
			if (unref(owned)) _push(`<span class="absolute right-2 top-2 grid size-5 place-items-center rounded-full bg-valid text-xs font-bold text-void"${ssrRenderAttr("title", _ctx.$t("droidex.tierOwned", { tier: _ctx.$t(`tier.${unref(entry).tier}`) }))} aria-hidden="true">✓</span>`);
			else _push(`<!---->`);
			_push(`<div class="flex items-start gap-3">`);
			_push(ssrRenderComponent(_component_DroidImage, {
				droid: __props.droid,
				tier: unref(shownTier),
				size: "md",
				dimmed: !unref(owned) && !unref(previewTier)
			}, null, _parent));
			_push(`<div class="min-w-0 flex-1">`);
			_push(ssrRenderComponent(_component_NuxtLink, {
				to: unref(localePath)(`/droids/${__props.droid.slug}`),
				class: "block truncate font-semibold hover:underline"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`${ssrInterpolate(__props.droid.name)}`);
					else return [createTextVNode(toDisplayString(__props.droid.name), 1)];
				}),
				_: 1
			}, _parent));
			_push(`<div class="mt-0.5 flex flex-wrap items-center gap-1.5 text-xs">`);
			_push(ssrRenderComponent(_component_RarityBadge, { rarity: __props.droid.rarity }, null, _parent));
			_push(`<span class="text-ink-muted">${ssrInterpolate(_ctx.$t(`type.${__props.droid.type}`))}</span></div><p class="mt-1.5 font-mono text-sm tabular-nums">`);
			if (__props.droid.percentIncome) _push(`<span class="text-iconic">${ssrInterpolate(_ctx.$t("droid.percentIncome", { value: __props.droid.percentValue ?? "?" }))}</span>`);
			else if (unref(stats)?.income) _push(`<!--[-->${ssrInterpolate(("formatIncome" in _ctx ? _ctx.formatIncome : unref(formatIncome))(unref(stats).income, unref(locale)))} <span class="ml-1 text-xs text-ink-muted">${ssrInterpolate(_ctx.$t(`tier.${unref(shownTier)}`))}</span><!--]-->`);
			else _push(`<span class="text-ink-muted">${ssrInterpolate(_ctx.$t("droid.noData"))}</span>`);
			_push(`</p></div></div><div class="flex items-center justify-between gap-2">`);
			_push(ssrRenderComponent(_component_TierSelector, {
				droid: __props.droid,
				"model-value": unref(entry).tier,
				size: "sm",
				"onUpdate:modelValue": ($event) => unref(store).setTier(__props.droid.slug, $event),
				onPreview: ($event) => previewTier.value = $event
			}, null, _parent));
			_push(`<div class="flex items-center gap-1.5">`);
			if (__props.droid.unverified) _push(`<span class="cursor-help text-xs text-warn"${ssrRenderAttr("title", _ctx.$t("droid.unverifiedHint"))}>⚠</span>`);
			else _push(`<!---->`);
			_push(`<button type="button" class="${ssrRenderClass([unref(entry).flawless ? "opacity-100" : "opacity-25 hover:opacity-60", "text-sm transition-transform hover:scale-125"])}"${ssrRenderAttr("title", _ctx.$t("droid.flawless"))}${ssrRenderAttr("aria-pressed", unref(entry).flawless)}>✨</button></div></div></article>`);
		};
	}
});
//#endregion
//#region app/components/DroidCard.vue
var _sfc_setup$1 = DroidCard_vue_vue_type_script_setup_true_lang_default.setup;
DroidCard_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/DroidCard.vue");
	return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
var DroidCard_default = Object.assign(DroidCard_vue_vue_type_script_setup_true_lang_default, { __name: "DroidCard" });
//#endregion
//#region app/pages/index.vue?vue&type=script&setup=true&lang.ts
var index_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "index",
	__ssrInlineRender: true,
	setup(__props) {
		const store = useCollectionStore();
		const { t, locale } = useI18n();
		useSeoMeta$1({
			title: () => t("droidex.title"),
			description: () => t("app.tagline")
		});
		const search = ref("");
		const rarity = useHydratedStorage("droidex:rarity", "all");
		const type = useHydratedStorage("droidex:type", "all");
		const ownership = useHydratedStorage("droidex:ownership", "all");
		const sort = useHydratedStorage("droidex:sort", "rarity");
		const RARITY_ORDER = store.dataset.rarities;
		useRoute$1();
		const filtered = computed(() => {
			const q = search.value.trim().toLowerCase();
			const list = store.droids.filter((d) => {
				if (q && !d.name.toLowerCase().includes(q)) return false;
				if (rarity.value !== "all" && d.rarity !== rarity.value) return false;
				if (type.value !== "all" && d.type !== type.value) return false;
				const entry = store.entry(d.slug);
				if (ownership.value === "owned" && entry.tier === null) return false;
				if (ownership.value === "missing" && entry.tier !== null) return false;
				if (ownership.value === "flawless" && !entry.flawless) return false;
				return true;
			});
			const income = (d) => d.tiers.DEFAULT?.income ?? 0;
			return [...list].sort((a, b) => {
				switch (sort.value) {
					case "income": return (b.tiers.DEFAULT?.income ?? 0) - (a.tiers.DEFAULT?.income ?? 0);
					case "cost": return (b.tiers.DEFAULT?.cost ?? 0) - (a.tiers.DEFAULT?.cost ?? 0);
					case "name": return a.name.localeCompare(b.name, locale.value);
					default: return RARITY_ORDER.indexOf(a.rarity) - RARITY_ORDER.indexOf(b.rarity) || income(a) - income(b);
				}
			});
		});
		const hasFilters = computed(() => Boolean(search.value) || rarity.value !== "all" || type.value !== "all" || ownership.value !== "all");
		const searchInput = useTemplateRef("searchInput");
		onKeyStroke("/", (e) => {
			if ((void 0).activeElement?.tagName === "INPUT") return;
			e.preventDefault();
			searchInput.value?.focus();
		});
		onKeyStroke("Escape", () => {
			if ((void 0).activeElement === searchInput.value) search.value = "";
		});
		return (_ctx, _push, _parent, _attrs) => {
			const _component_HomeHero = HomeHero_default;
			const _component_ClientOnly = ClientOnly;
			const _component_NextPurchaseAdvisor = NextPurchaseAdvisor_default;
			const _component_IconicPanel = IconicPanel_default;
			const _component_DroidCard = DroidCard_default;
			_push(`<div${ssrRenderAttrs(mergeProps({ class: "flex flex-col gap-5" }, _attrs))}>`);
			_push(ssrRenderComponent(_component_HomeHero, null, null, _parent));
			_push(`<div class="grid gap-3 @4xl:grid-cols-2">`);
			_push(ssrRenderComponent(_component_ClientOnly, null, { fallback: withCtx((_, _push, _parent, _scopeId) => {
				if (_push) _push(`<div class="h-48 animate-pulse rounded-card border border-edge bg-panel"${_scopeId}></div>`);
				else return [createVNode("div", { class: "h-48 animate-pulse rounded-card border border-edge bg-panel" })];
			}) }, _parent));
			_push(ssrRenderComponent(_component_NextPurchaseAdvisor, null, null, _parent));
			_push(`</div>`);
			_push(ssrRenderComponent(_component_IconicPanel, { variant: "strip" }, null, _parent));
			_push(`<h2 class="text-sm font-bold uppercase tracking-wide">${ssrInterpolate(_ctx.$t("home.allDroids"))}</h2><div class="sticky top-[68px] z-30 -mx-4 flex flex-col gap-3 bg-void/95 px-4 py-3 backdrop-blur"><div class="flex flex-wrap items-center gap-2"><div class="relative min-w-48 flex-1"><input${ssrRenderAttr("value", unref(search))} type="search"${ssrRenderAttr("placeholder", _ctx.$t("droidex.search"))} class="w-full rounded-card border border-edge bg-panel py-2.5 pl-9 pr-3 text-sm placeholder:text-ink-muted focus:border-accent focus:outline-none"><span class="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-muted">⌕</span></div><select class="rounded-card border border-edge bg-panel px-3 py-2.5 text-sm"><option value="all"${ssrIncludeBooleanAttr(Array.isArray(unref(rarity)) ? ssrLooseContain(unref(rarity), "all") : ssrLooseEqual(unref(rarity), "all")) ? " selected" : ""}>${ssrInterpolate(_ctx.$t("droidex.filterRarity"))} — ${ssrInterpolate(_ctx.$t("droidex.filterAll"))}</option><!--[-->`);
			ssrRenderList(unref(store).dataset.rarities, (r) => {
				_push(`<option${ssrRenderAttr("value", r)}${ssrIncludeBooleanAttr(Array.isArray(unref(rarity)) ? ssrLooseContain(unref(rarity), r) : ssrLooseEqual(unref(rarity), r)) ? " selected" : ""}>${ssrInterpolate(_ctx.$t(`rarity.${r}`))}</option>`);
			});
			_push(`<!--]--></select><select class="rounded-card border border-edge bg-panel px-3 py-2.5 text-sm"><option value="all"${ssrIncludeBooleanAttr(Array.isArray(unref(type)) ? ssrLooseContain(unref(type), "all") : ssrLooseEqual(unref(type), "all")) ? " selected" : ""}>${ssrInterpolate(_ctx.$t("droidex.filterType"))} — ${ssrInterpolate(_ctx.$t("droidex.filterAll"))}</option><!--[-->`);
			ssrRenderList(unref(store).dataset.types, (ty) => {
				_push(`<option${ssrRenderAttr("value", ty)}${ssrIncludeBooleanAttr(Array.isArray(unref(type)) ? ssrLooseContain(unref(type), ty) : ssrLooseEqual(unref(type), ty)) ? " selected" : ""}>${ssrInterpolate(_ctx.$t(`type.${ty}`))}</option>`);
			});
			_push(`<!--]--></select><select class="rounded-card border border-edge bg-panel px-3 py-2.5 text-sm"><!--[-->`);
			ssrRenderList([
				"rarity",
				"income",
				"cost",
				"name"
			], (s) => {
				_push(`<option${ssrRenderAttr("value", s)}${ssrIncludeBooleanAttr(Array.isArray(unref(sort)) ? ssrLooseContain(unref(sort), s) : ssrLooseEqual(unref(sort), s)) ? " selected" : ""}>${ssrInterpolate(_ctx.$t("droidex.sortBy"))} : ${ssrInterpolate(_ctx.$t(`droidex.sort.${s}`))}</option>`);
			});
			_push(`<!--]--></select></div><div class="flex flex-wrap items-center gap-2"><!--[-->`);
			ssrRenderList([
				"all",
				"owned",
				"missing",
				"flawless"
			], (o) => {
				_push(`<button type="button" class="${ssrRenderClass([unref(ownership) === o ? "border-[#69ecff] bg-gradient-to-b from-[#54e7ff] to-[#17badc] text-[#00131b]" : "border-transparent bg-panel text-ink-muted hover:text-ink", "rounded-full border px-3 py-1 text-xs font-medium transition-colors"])}">${ssrInterpolate(_ctx.$t(o === "all" ? "droidex.filterAll" : `droidex.filter${o.charAt(0).toUpperCase()}${o.slice(1)}`))}</button>`);
			});
			_push(`<!--]-->`);
			if (unref(hasFilters)) _push(`<button type="button" class="ml-auto text-xs text-ink-muted underline hover:text-ink">${ssrInterpolate(_ctx.$t("droidex.resetFilters"))}</button>`);
			else _push(`<!---->`);
			_push(`</div></div>`);
			if (!unref(filtered).length) _push(`<p class="py-16 text-center text-ink-muted">${ssrInterpolate(_ctx.$t("droidex.empty"))}</p>`);
			else {
				_push(`<div class="grid grid-cols-1 gap-3 @lg:grid-cols-2 @3xl:grid-cols-3 @6xl:grid-cols-4"><!--[-->`);
				ssrRenderList(unref(filtered), (droid) => {
					_push(ssrRenderComponent(_component_DroidCard, {
						key: droid.slug,
						droid
					}, null, _parent));
				});
				_push(`<!--]--></div>`);
			}
			_push(`</div>`);
		};
	}
});
//#endregion
//#region app/pages/index.vue
var _sfc_setup = index_vue_vue_type_script_setup_true_lang_default.setup;
index_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var pages_default = index_vue_vue_type_script_setup_true_lang_default;

export { pages_default as default };
//# sourceMappingURL=pages-C5XXUif0.mjs.map
