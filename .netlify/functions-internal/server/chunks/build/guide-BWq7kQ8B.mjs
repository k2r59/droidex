import { a as useI18n, b as useLocalePath, d as useSeoMeta$1, N as NuxtLink } from '../virtual/entry.mjs';
import { D as DxIcon_default } from './DxIcon-70RsSwuM.mjs';
import { f as formatExact } from './format-GC6uCquA.mjs';
import { R as RarityBadge_default } from './RarityBadge-BGlq658Y.mjs';
import { defineComponent, mergeProps, unref, withCtx, createVNode, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderList, ssrRenderComponent } from 'vue/server-renderer';
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

var mechanics_default = {
	version: 1,
	base: {
		"totalSlots": 25,
		"slotsByType": {
			"worker": 11,
			"astromech": 9,
			"battle": 5
		},
		"specialtyBonus": .1,
		"collectionBonus": .25,
		"realisticIncomeCap": 585700,
		"theoreticalIncomeCap": 317e4,
		"maxPlayers": 6
	},
	flawlessRates: [
		{
			"tier": "DEFAULT",
			"odds": 1e3
		},
		{
			"tier": "GOLD",
			"odds": 500
		},
		{
			"tier": "DIAMOND",
			"odds": 250
		},
		{
			"tier": "RAINBOW",
			"odds": 125
		},
		{
			"tier": "BESKAR",
			"odds": 100
		},
		{
			"tier": "GALACTIC",
			"odds": null
		}
	],
	flawlessBonusPerType: .01,
	flawlessCraftableTypes: 51,
	chipCosts: [
		{
			"rarity": "common",
			"gold": 5,
			"diamond": 10,
			"rainbow": 15,
			"beskar": 80,
			"conflicting": true
		},
		{
			"rarity": "rare",
			"gold": 30,
			"diamond": 50,
			"rainbow": 75,
			"beskar": 250
		},
		{
			"rarity": "epic",
			"gold": 120,
			"diamond": 180,
			"rainbow": 240,
			"beskar": 5e3
		},
		{
			"rarity": "legendary",
			"gold": 400,
			"diamond": 1200,
			"rainbow": 4e3,
			"beskar": 12e3
		},
		{
			"rarity": "mythic",
			"gold": 6e3,
			"diamond": 13e3,
			"rainbow": 3e4,
			"beskar": 75e3
		}
	],
	tierMultipliers: [
		{
			"rarity": "common",
			"gold": 2,
			"diamond": 4,
			"rainbow": 8,
			"beskar": 12
		},
		{
			"rarity": "rare",
			"gold": 2,
			"diamond": 4,
			"rainbow": 8,
			"beskar": 12
		},
		{
			"rarity": "epic",
			"gold": 2,
			"diamond": 4,
			"rainbow": 8,
			"beskar": 34
		},
		{
			"rarity": "legendary",
			"gold": 2,
			"diamond": 4,
			"rainbow": 8,
			"beskar": 24
		},
		{
			"rarity": "mythic",
			"gold": 2,
			"diamond": 4,
			"rainbow": 8,
			"beskar": 16
		}
	],
	sandcrawler: {
		"beskarIntervalMinutes": 15,
		"beskarPerPlayer": true,
		"mythicHourlyMinute": 55,
		"mythicPerPlayer": true,
		"rainbowRemoved": true,
		"notes": "Timers à jour en v1.22 : le Beskar est passé de 20 à 15 minutes et le timer Rainbow de 5 minutes a été supprimé. Un blueprint Mythique garanti a été ajouté en v1.20, chaque heure à XX:55, un par joueur. Pendant les Beskar Events, un drop garanti supplémentaire toutes les 5 minutes. Les variantes Beskar ne s'achètent que sur la trade row."
	},
	currencies: [
		{
			"id": "credits",
			"sources": "Revenu passif, ventes, missions, quêtes de la Cantina",
			"uses": "Blueprints, renaissances"
		},
		{
			"id": "chips",
			"sources": "Vente de droids Or et plus, pickups (1 à 3)",
			"uses": "Montée de palier"
		},
		{
			"id": "nova",
			"sources": "Super Rebirth (11 à 191), 1 par jour en quête difficile",
			"uses": "Nova Shop, droids Iconiques"
		}
	],
	tips: [
		"Équiper BB-8 comme compagnon double les Puces d'amélioration obtenues à la vente d'un droid.",
		"Vendre un blueprint brut rapporte toujours moins que de fabriquer le droid puis de le vendre.",
		"Frapper un droid en cours de construction avec la pioche réduit son temps de fabrication.",
		"Un roll gratuit par 24 h à la Cantina : équipe ton droid le plus rare avant de rouler.",
		"Le Gunrunner est le meilleur remplisseur de slot du jeu, même hors de son slot de spécialité.",
		"Garde toujours une réserve de crédits : les blueprints Mythique apparaissent aléatoirement au Sandcrawler et disparaissent du cycle."
	]
};
//#endregion
//#region app/pages/guide.vue?vue&type=script&setup=true&lang.ts
var guide_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "guide",
	__ssrInlineRender: true,
	setup(__props) {
		const { t, locale } = useI18n();
		const localePath = useLocalePath();
		useSeoMeta$1({
			title: () => t("guide.title"),
			description: () => t("guide.subtitle")
		});
		const base = mechanics_default.base;
		return (_ctx, _push, _parent, _attrs) => {
			const _component_RarityBadge = RarityBadge_default;
			const _component_NuxtLink = NuxtLink;
			const _component_DxIcon = DxIcon_default;
			_push(`<div${ssrRenderAttrs(mergeProps({ class: "flex flex-col gap-5" }, _attrs))}><header><h1 class="text-xl font-bold">${ssrInterpolate(_ctx.$t("guide.title"))}</h1><p class="text-sm text-ink-muted">${ssrInterpolate(_ctx.$t("guide.subtitle"))}</p></header><section class="panel p-6"><h2 class="mb-3 font-semibold">${ssrInterpolate(_ctx.$t("guide.base"))}</h2><p class="text-sm">${ssrInterpolate(_ctx.$t("guide.slots", {
				count: unref(base).totalSlots,
				worker: unref(base).slotsByType.worker,
				astromech: unref(base).slotsByType.astromech,
				battle: unref(base).slotsByType.battle
			}))}</p><ul class="mt-2 flex flex-col gap-1 text-sm text-ink-muted"><li>• ${ssrInterpolate(_ctx.$t("guide.specialtyBonus"))}</li><li>• ${ssrInterpolate(_ctx.$t("guide.collectionBonus"))}</li></ul></section><section class="panel p-6"><h2 class="mb-3 font-semibold">${ssrInterpolate(_ctx.$t("guide.flawlessTitle"))}</h2><p class="mb-3 text-sm text-ink-muted">${ssrInterpolate(_ctx.$t("guide.flawlessBonus"))}</p><h3 class="mb-2 text-xs uppercase text-ink-muted">${ssrInterpolate(_ctx.$t("guide.flawlessRate"))}</h3><ul class="grid grid-cols-2 gap-2 sm:grid-cols-6"><!--[-->`);
			ssrRenderList(unref(mechanics_default).flawlessRates, (row) => {
				_push(`<li class="rounded-lg bg-panel-raised px-2 py-1.5 text-center"><span class="block text-xs text-ink-muted">${ssrInterpolate(_ctx.$t(`tier.${row.tier}`))}</span><span class="font-mono text-sm">${ssrInterpolate(row.odds ? `1 / ${row.odds}` : _ctx.$t("droid.noData"))}</span></li>`);
			});
			_push(`<!--]--></ul></section><section class="panel overflow-x-auto p-6"><h2 class="mb-3 font-semibold">${ssrInterpolate(_ctx.$t("guide.chipsTitle"))}</h2><h3 class="mb-2 text-xs uppercase text-ink-muted">${ssrInterpolate(_ctx.$t("guide.chipsCost"))}</h3><table class="w-full text-sm"><thead class="text-left text-xs uppercase text-ink-muted"><tr><th class="py-1 font-medium">${ssrInterpolate(_ctx.$t("droidex.filterRarity"))}</th><th class="py-1 text-right font-medium">${ssrInterpolate(_ctx.$t("tier.GOLD"))}</th><th class="py-1 text-right font-medium">${ssrInterpolate(_ctx.$t("tier.DIAMOND"))}</th><th class="py-1 text-right font-medium">${ssrInterpolate(_ctx.$t("tier.RAINBOW"))}</th><th class="py-1 text-right font-medium">${ssrInterpolate(_ctx.$t("tier.BESKAR"))}</th></tr></thead><tbody><!--[-->`);
			ssrRenderList(unref(mechanics_default).chipCosts, (row) => {
				_push(`<tr class="border-t border-edge-soft"><td class="py-1.5">`);
				_push(ssrRenderComponent(_component_RarityBadge, { rarity: row.rarity }, null, _parent));
				if (row.conflicting) _push(`<span class="ml-1 cursor-help text-xs text-warn" title="Une source donne 5 / 25 / 40 / 80">⚠</span>`);
				else _push(`<!---->`);
				_push(`</td><td class="py-1.5 text-right font-mono tabular-nums">${ssrInterpolate(("formatExact" in _ctx ? _ctx.formatExact : unref(formatExact))(row.gold, unref(locale)))}</td><td class="py-1.5 text-right font-mono tabular-nums">${ssrInterpolate(("formatExact" in _ctx ? _ctx.formatExact : unref(formatExact))(row.diamond, unref(locale)))}</td><td class="py-1.5 text-right font-mono tabular-nums">${ssrInterpolate(("formatExact" in _ctx ? _ctx.formatExact : unref(formatExact))(row.rainbow, unref(locale)))}</td><td class="py-1.5 text-right font-mono tabular-nums">${ssrInterpolate(("formatExact" in _ctx ? _ctx.formatExact : unref(formatExact))(row.beskar, unref(locale)))}</td></tr>`);
			});
			_push(`<!--]--></tbody></table></section>`);
			_push(ssrRenderComponent(_component_NuxtLink, {
				to: unref(localePath)("/missions"),
				class: "panel flex items-center justify-between p-6 transition-colors hover:bg-panel-raised"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`<span${_scopeId}><span class="block font-semibold"${_scopeId}>${ssrInterpolate(_ctx.$t("missions.title"))}</span><span class="block text-sm text-ink-muted"${_scopeId}>${ssrInterpolate(_ctx.$t("missions.subtitle"))}</span></span><span class="text-ink-muted" aria-hidden="true"${_scopeId}>→</span>`);
					else return [createVNode("span", null, [createVNode("span", { class: "block font-semibold" }, toDisplayString(_ctx.$t("missions.title")), 1), createVNode("span", { class: "block text-sm text-ink-muted" }, toDisplayString(_ctx.$t("missions.subtitle")), 1)]), createVNode("span", {
						class: "text-ink-muted",
						"aria-hidden": "true"
					}, "→")];
				}),
				_: 1
			}, _parent));
			_push(`<section class="panel p-6"><h2 class="mb-3 font-semibold">${ssrInterpolate(_ctx.$t("guide.sandcrawlerTitle"))}</h2><ul class="flex flex-col gap-1 text-sm text-ink-muted"><li>• ${ssrInterpolate(_ctx.$t("guide.sandcrawlerBeskar", { minutes: unref(mechanics_default).sandcrawler.beskarIntervalMinutes }))}</li><li>• ${ssrInterpolate(_ctx.$t("guide.sandcrawlerMythic", { minute: unref(mechanics_default).sandcrawler.mythicHourlyMinute }))}</li></ul><p class="mt-2 text-sm text-ink-muted">${ssrInterpolate(unref(mechanics_default).sandcrawler.notes)}</p></section><section class="panel p-6"><h2 class="mb-3 font-semibold">${ssrInterpolate(_ctx.$t("guide.currenciesTitle"))}</h2><ul class="grid gap-2 sm:grid-cols-3"><!--[-->`);
			ssrRenderList(unref(mechanics_default).currencies, (c) => {
				_push(`<li class="rounded-lg bg-panel-raised p-3 text-sm"><p class="font-medium">${ssrInterpolate(_ctx.$t(`guide.currency.${c.id}`))}</p><p class="mt-1 text-xs text-ink-muted">${ssrInterpolate(c.sources)}</p><p class="mt-1 text-xs text-ink-muted">→ ${ssrInterpolate(c.uses)}</p></li>`);
			});
			_push(`<!--]--></ul></section><section class="panel p-6"><h2 class="mb-3 flex items-center gap-2 font-semibold">`);
			_push(ssrRenderComponent(_component_DxIcon, {
				name: "resources/star",
				size: 18,
				class: "text-warn"
			}, null, _parent));
			_push(` ${ssrInterpolate(_ctx.$t("guide.tipsTitle"))}</h2><ul class="flex flex-col gap-2 text-sm text-ink-muted"><!--[-->`);
			ssrRenderList(unref(mechanics_default).tips, (tip) => {
				_push(`<li>• ${ssrInterpolate(tip)}</li>`);
			});
			_push(`<!--]--></ul></section></div>`);
		};
	}
});
//#endregion
//#region app/pages/guide.vue
var _sfc_setup = guide_vue_vue_type_script_setup_true_lang_default.setup;
guide_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/guide.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var guide_default = guide_vue_vue_type_script_setup_true_lang_default;

export { guide_default as default };
//# sourceMappingURL=guide-BWq7kQ8B.mjs.map
