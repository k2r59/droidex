import { a as useI18n, b as useLocalePath, d as useSeoMeta$1, N as NuxtLink } from '../virtual/entry.mjs';
import { D as DxIcon_default } from './DxIcon-70RsSwuM.mjs';
import { u as useCollectionStore } from './collection-CMF38Hwi.mjs';
import { f as formatExact } from './format-GC6uCquA.mjs';
import { D as DroidImage_default } from './DroidImage-cGvQPK3j.mjs';
import { P as PageBanner_default } from './PageBanner-B_1qgWUv.mjs';
import { defineComponent, computed, ref, watchEffect, mergeProps, withCtx, unref, createVNode, toDisplayString, withDirectives, isRef, vModelText, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderAttr, ssrRenderList, ssrRenderClass, ssrIncludeBooleanAttr } from 'vue/server-renderer';
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

var nova_shop_default = {
	version: 1,
	generatedFrom: "Google Sheet communautaire (onglet Nova Crystals + Shop Reference) et DATA.nova de tycoon-tools, juillet 2026",
	currency: "novaCrystals",
	note: "Les coûts sont PAR NIVEAU et non cumulatifs : passer du niveau 2 au niveau 5 coûte la somme des niveaux 3, 4 et 5.",
	sections: [
		{
			"id": "featured",
			"items": [
				{
					"id": "critical-chance",
					"name": "Critical Chance",
					"costs": [
						60,
						90,
						120,
						180,
						210
					],
					"effect": "Chance de coup critique",
					"confidence": "conflicting",
					"note": "tycoon-tools ne liste que 4 niveaux (total 550) ; le Google Sheet en liste 5 (total 660). Le sheet semble plus récent."
				},
				{
					"id": "critical-amount",
					"name": "Critical Amount",
					"costs": [
						30,
						90,
						150,
						210,
						330
					],
					"effect": "Dégâts du coup critique",
					"confidence": "confirmed"
				},
				{
					"id": "companion-slot",
					"name": "Companion Slot",
					"costs": [],
					"effect": "Slot de droid compagnon supplémentaire",
					"confidence": "unknown",
					"note": "Présent comme colonne dans les données du jeu, mais entièrement vide. Ni niveaux ni coûts publiés."
				}
			]
		},
		{
			"id": "core",
			"items": [
				{
					"id": "max-health",
					"name": "Max Health",
					"costs": [
						1,
						6,
						13,
						19,
						25,
						31,
						37,
						43
					],
					"effect": "PV maximum du joueur",
					"confidence": "confirmed"
				},
				{
					"id": "damage",
					"name": "Damage",
					"costs": [
						1,
						13,
						25,
						37,
						49,
						61,
						73,
						85
					],
					"effect": "Dégâts infligés",
					"confidence": "confirmed"
				},
				{
					"id": "credits",
					"name": "Credits",
					"costs": [
						2,
						6,
						10,
						14,
						18,
						22,
						26,
						30,
						34,
						38,
						42,
						46,
						50,
						54,
						58,
						62,
						66,
						70
					],
					"effect": "Multiplicateur de gains de crédits",
					"confidence": "confirmed"
				},
				{
					"id": "movement-speed",
					"name": "Movement Speed",
					"costs": [
						1,
						2,
						4,
						6,
						8,
						10,
						12,
						14,
						16,
						18,
						20,
						22,
						24,
						26,
						28,
						30,
						32,
						34
					],
					"effect": "Vitesse de déplacement",
					"confidence": "confirmed"
				},
				{
					"id": "pickaxe-mastery",
					"name": "Pickaxe Mastery",
					"costs": [
						5,
						10,
						15,
						20,
						25,
						30,
						35,
						40,
						45,
						50,
						55
					],
					"effect": "Niveaux de pioche permanents",
					"confidence": "confirmed"
				},
				{
					"id": "jawa-bartering",
					"name": "Jawa Bartering",
					"costs": [
						5,
						15,
						30,
						45,
						60
					],
					"effect": "Meilleurs prix de vente chez les Jawas",
					"confidence": "confirmed"
				},
				{
					"id": "super-crates",
					"name": "Super Crates",
					"costs": [
						10,
						25,
						50
					],
					"effect": null,
					"confidence": "confirmed",
					"note": "Coûts confirmés, effet réel non documenté."
				},
				{
					"id": "flawless-charm",
					"name": "Flawless Charm",
					"costs": [500],
					"oneTime": true,
					"effect": "Améliore les chances d'obtenir un droid Flawless",
					"confidence": "confirmed"
				},
				{
					"id": "double-daily-quests",
					"name": "Double Daily Quests",
					"costs": [75],
					"oneTime": true,
					"effect": "Double les quêtes journalières",
					"confidence": "confirmed"
				}
			]
		},
		{
			"id": "workshop",
			"items": [
				{
					"id": "lounge-slot",
					"name": "Lounge Slot",
					"costs": [
						1,
						30,
						60,
						90
					],
					"effect": "Slots de salon supplémentaires",
					"confidence": "confirmed"
				},
				{
					"id": "upgrade-chip-scrap",
					"name": "Puces via le scrap",
					"costs": [
						2,
						5,
						10,
						15,
						20,
						25,
						30,
						35,
						40,
						45
					],
					"effect": "Puces d'amélioration obtenues en cassant du scrap",
					"confidence": "confirmed"
				},
				{
					"id": "scrap-value",
					"name": "Scrap Value",
					"costs": [
						25,
						55,
						85,
						115,
						145,
						175,
						205,
						235,
						265,
						295,
						325,
						355,
						385
					],
					"effect": "Crédits rapportés par le scrap",
					"confidence": "confirmed"
				},
				{
					"id": "blueprint-scrap",
					"name": "Blueprint Scrap",
					"costs": [
						1,
						12,
						24,
						36
					],
					"effect": "Chance de blueprint depuis le scrap",
					"confidence": "confirmed"
				},
				{
					"id": "crafting-speed",
					"name": "Crafting Speed",
					"costs": [
						3,
						18,
						33,
						48,
						63,
						78,
						93,
						108,
						123,
						138
					],
					"effect": "Vitesse de fabrication des droids",
					"confidence": "confirmed"
				},
				{
					"id": "blueprint-storage",
					"name": "Blueprint Storage",
					"costs": [
						10,
						75,
						150
					],
					"effect": "Capacité de stockage des blueprints",
					"confidence": "confirmed"
				},
				{
					"id": "collect-all",
					"name": "Collect All",
					"costs": [
						3,
						25,
						100
					],
					"effect": "Collecte les gains de tous les droids d'un coup",
					"confidence": "confirmed"
				},
				{
					"id": "rebirth-droid-alert",
					"name": "Rebirth Droid Alert",
					"costs": [10],
					"oneTime": true,
					"effect": "Alerte quand un droid requis pour la renaissance apparaît",
					"confidence": "confirmed"
				},
				{
					"id": "blueprint-vendor",
					"name": "Blueprint Vendor",
					"costs": [10],
					"oneTime": true,
					"effect": "Débloque le vendeur de blueprints",
					"confidence": "confirmed"
				}
			]
		},
		{
			"id": "cosmetic",
			"items": [{
				"id": "nova-crystal-base-paint",
				"name": "Nova Crystal Base Paint",
				"costs": [
					30,
					120,
					400
				],
				"effect": "Peinture de base « Nova Crystal », 3 stades progressifs",
				"confidence": "confirmed",
				"note": "Seul cosmétique achetable en Nova Crystals. Les 27 autres peintures et 26 chapeaux s'obtiennent en crédits, par événement, par palier de renaissance ou par niveau Droidsmith."
			}]
		},
		{
			"id": "iconic",
			"items": [
				{
					"id": "iconic-bb8",
					"name": "BB-8",
					"droidSlug": "bb8",
					"costs": [30],
					"oneTime": true,
					"effect": "Droid Iconique rachetable",
					"confidence": "single-source"
				},
				{
					"id": "iconic-mister-bones",
					"name": "Mister Bones",
					"droidSlug": "mister-bones",
					"costs": [30],
					"oneTime": true,
					"effect": "Droid Iconique rachetable",
					"confidence": "single-source"
				},
				{
					"id": "iconic-ig-11-marshal",
					"name": "IG-11 Marshal",
					"droidSlug": "ig-11-marshal",
					"costs": [30],
					"oneTime": true,
					"effect": "Droid Iconique rachetable",
					"confidence": "single-source"
				},
				{
					"id": "iconic-cb-23",
					"name": "CB-23",
					"droidSlug": "cb-23",
					"costs": [75],
					"oneTime": true,
					"effect": "Droid Iconique rachetable",
					"confidence": "single-source",
					"note": "Le champ « 75 » du tracker contient des crédits pour tous les autres droids — ce prix est peut-être un artefact."
				},
				{
					"id": "iconic-dj-r3x",
					"name": "DJ-R3X",
					"droidSlug": "dj-r3x",
					"costs": [],
					"oneTime": true,
					"effect": "Droid Iconique rachetable",
					"confidence": "unknown"
				},
				{
					"id": "iconic-r2-d2",
					"name": "R2-D2",
					"droidSlug": "r2-d2",
					"costs": [],
					"oneTime": true,
					"effect": "Droid Iconique rachetable",
					"confidence": "unknown"
				},
				{
					"id": "iconic-c-3p0",
					"name": "C-3P0",
					"droidSlug": "c-3p0",
					"costs": [],
					"oneTime": true,
					"effect": "Droid Iconique rachetable",
					"confidence": "unknown"
				}
			]
		}
	],
	recommendedOrder: [
		"blueprint-vendor",
		"rebirth-droid-alert",
		"credits",
		"scrap-value",
		"upgrade-chip-scrap",
		"double-daily-quests",
		"flawless-charm"
	]
};
//#endregion
//#region app/pages/shop.vue?vue&type=script&setup=true&lang.ts
var shop_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "shop",
	__ssrInlineRender: true,
	setup(__props) {
		const store = useCollectionStore();
		const { t, locale } = useI18n();
		const localePath = useLocalePath();
		useSeoMeta$1({
			title: () => t("shop.title"),
			description: () => t("shop.subtitle")
		});
		const sections = nova_shop_default.sections;
		const allItems = computed(() => sections.flatMap((s) => s.items));
		const level = (id) => store.shopLevels[id] ?? 0;
		/** Coût du prochain niveau. `null` si l'article est au maximum ou non chiffré. */
		function nextCost(item) {
			const l = level(item.id);
			return l < item.costs.length ? item.costs[l] ?? null : null;
		}
		/** Somme des niveaux restant à acheter. */
		const remainingCost = (item) => item.costs.slice(level(item.id)).reduce((a, b) => a + b, 0);
		const totalRemaining = computed(() => allItems.value.reduce((s, i) => s + remainingCost(i), 0));
		const grandTotal = computed(() => allItems.value.reduce((s, i) => s + i.costs.reduce((a, b) => a + b, 0), 0));
		/**
		* Une icône par article. Le pack n'en fournit pas de dédiées, on réutilise celles de
		* ressource dont le sens est le plus proche — le repère visuel compte plus que
		* l'exactitude du pictogramme.
		*/
		const ICONS = {
			"critical-chance": "game/radar",
			"critical-amount": "resources/star",
			"companion-slot": "game/droid",
			"max-health": "status/success",
			"damage": "resources/energy",
			"credits": "resources/credits",
			"movement-speed": "game/rocket",
			"pickaxe-mastery": "game/factory",
			"jawa-bartering": "game/crate",
			"super-crates": "game/crate",
			"flawless-charm": "resources/diamond",
			"double-daily-quests": "resources/timer",
			"lounge-slot": "game/factory",
			"upgrade-chip-scrap": "resources/gold",
			"scrap-value": "resources/credits",
			"blueprint-scrap": "game/crate",
			"crafting-speed": "resources/timer",
			"blueprint-storage": "game/crate",
			"collect-all": "actions/download",
			"rebirth-droid-alert": "status/warning",
			"blueprint-vendor": "game/portal",
			"nova-crystal-base-paint": "resources/nova-crystal"
		};
		const iconOf = (id) => ICONS[id] ?? "resources/nova-crystal";
		const CONFIDENCE_CLASS = {
			confirmed: "text-valid",
			conflicting: "text-warn",
			"single-source": "text-warn",
			unknown: "text-ink-muted"
		};
		const recommended = computed(() => nova_shop_default.recommendedOrder.map((id) => allItems.value.find((i) => i.id === id)).filter(Boolean));
		const iconics = computed(() => sections.find((s) => s.id === "iconic")?.items ?? []);
		const upgradeSections = computed(() => sections.filter((s) => s.id !== "iconic"));
		const droidBySlug = computed(() => Object.fromEntries(store.droids.map((d) => [d.slug, d])));
		const balanceInput = ref(null);
		watchEffect(() => {
			balanceInput.value = store.novaCrystals;
		});
		/** Notes de lecture du catalogue, groupées en pied de page. */
		const notes = [
			{
				icon: "status/info",
				tone: "text-glow",
				key: "shop.noteLevels"
			},
			{
				icon: "resources/nova-crystal",
				tone: "text-nova",
				key: "shop.noteOneTime"
			},
			{
				icon: "status/warning",
				tone: "text-warn",
				key: "shop.noteUnverified"
			}
		];
		return (_ctx, _push, _parent, _attrs) => {
			const _component_PageBanner = PageBanner_default;
			const _component_DxIcon = DxIcon_default;
			const _component_DroidImage = DroidImage_default;
			const _component_NuxtLink = NuxtLink;
			_push(`<div${ssrRenderAttrs(mergeProps({ class: "layout-2-columns" }, _attrs))}><div class="flex min-w-0 flex-col gap-5">`);
			_push(ssrRenderComponent(_component_PageBanner, {
				name: "nova-shop",
				"min-height": "14rem"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(`<div class="flex flex-wrap items-end justify-between gap-6"${_scopeId}><div class="flex items-start gap-3"${_scopeId}><span class="grid size-11 shrink-0 place-items-center rounded-md bg-nova/15 text-nova"${_scopeId}>`);
						_push(ssrRenderComponent(_component_DxIcon, {
							name: "resources/nova-crystal",
							size: 24
						}, null, _parent, _scopeId));
						_push(`</span><div${_scopeId}><h1 class="text-4xl lg:text-5xl"${_scopeId}>${ssrInterpolate(_ctx.$t("shop.title"))}</h1><p class="text-sm text-ink-muted"${_scopeId}>${ssrInterpolate(_ctx.$t("shop.subtitle"))}</p></div></div><label class="flex flex-col gap-1"${_scopeId}><span class="text-[10px] font-semibold uppercase tracking-[0.14em] text-ink-muted"${_scopeId}>${ssrInterpolate(_ctx.$t("shop.balance"))}</span><span class="dx-search"${_scopeId}>`);
						_push(ssrRenderComponent(_component_DxIcon, {
							name: "resources/nova-crystal",
							size: 18,
							class: "text-nova"
						}, null, _parent, _scopeId));
						_push(`<input${ssrRenderAttr("value", unref(balanceInput))} type="number" min="0" class="w-24 border-0 bg-transparent text-lg outline-none"${_scopeId}><span${_scopeId}></span></span></label><dl class="flex gap-6"${_scopeId}><div${_scopeId}><dt class="text-[10px] font-semibold uppercase tracking-[0.14em] text-ink-muted"${_scopeId}>${ssrInterpolate(_ctx.$t("shop.remaining"))}</dt><dd class="flex items-center gap-1.5 font-mono text-2xl"${_scopeId}>${ssrInterpolate(("formatExact" in _ctx ? _ctx.formatExact : unref(formatExact))(unref(totalRemaining), unref(locale)))} `);
						_push(ssrRenderComponent(_component_DxIcon, {
							name: "resources/nova-crystal",
							size: 18,
							class: "text-nova"
						}, null, _parent, _scopeId));
						_push(`</dd></div><div${_scopeId}><dt class="text-[10px] font-semibold uppercase tracking-[0.14em] text-ink-muted"${_scopeId}>${ssrInterpolate(_ctx.$t("shop.grandTotal"))}</dt><dd class="flex items-center gap-1.5 font-mono text-2xl text-ink-muted"${_scopeId}>${ssrInterpolate(("formatExact" in _ctx ? _ctx.formatExact : unref(formatExact))(unref(grandTotal), unref(locale)))} `);
						_push(ssrRenderComponent(_component_DxIcon, {
							name: "resources/nova-crystal",
							size: 18,
							class: "text-nova"
						}, null, _parent, _scopeId));
						_push(`</dd></div></dl></div>`);
					} else return [createVNode("div", { class: "flex flex-wrap items-end justify-between gap-6" }, [
						createVNode("div", { class: "flex items-start gap-3" }, [createVNode("span", { class: "grid size-11 shrink-0 place-items-center rounded-md bg-nova/15 text-nova" }, [createVNode(_component_DxIcon, {
							name: "resources/nova-crystal",
							size: 24
						})]), createVNode("div", null, [createVNode("h1", { class: "text-4xl lg:text-5xl" }, toDisplayString(_ctx.$t("shop.title")), 1), createVNode("p", { class: "text-sm text-ink-muted" }, toDisplayString(_ctx.$t("shop.subtitle")), 1)])]),
						createVNode("label", { class: "flex flex-col gap-1" }, [createVNode("span", { class: "text-[10px] font-semibold uppercase tracking-[0.14em] text-ink-muted" }, toDisplayString(_ctx.$t("shop.balance")), 1), createVNode("span", { class: "dx-search" }, [
							createVNode(_component_DxIcon, {
								name: "resources/nova-crystal",
								size: 18,
								class: "text-nova"
							}),
							withDirectives(createVNode("input", {
								"onUpdate:modelValue": ($event) => isRef(balanceInput) ? balanceInput.value = $event : null,
								type: "number",
								min: "0",
								class: "w-24 border-0 bg-transparent text-lg outline-none",
								onChange: ($event) => unref(store).setNovaCrystals(Math.max(0, unref(balanceInput) ?? 0))
							}, null, 40, ["onUpdate:modelValue", "onChange"]), [[
								vModelText,
								unref(balanceInput),
								void 0,
								{ number: true }
							]]),
							createVNode("span")
						])]),
						createVNode("dl", { class: "flex gap-6" }, [createVNode("div", null, [createVNode("dt", { class: "text-[10px] font-semibold uppercase tracking-[0.14em] text-ink-muted" }, toDisplayString(_ctx.$t("shop.remaining")), 1), createVNode("dd", { class: "flex items-center gap-1.5 font-mono text-2xl" }, [createTextVNode(toDisplayString(("formatExact" in _ctx ? _ctx.formatExact : unref(formatExact))(unref(totalRemaining), unref(locale))) + " ", 1), createVNode(_component_DxIcon, {
							name: "resources/nova-crystal",
							size: 18,
							class: "text-nova"
						})])]), createVNode("div", null, [createVNode("dt", { class: "text-[10px] font-semibold uppercase tracking-[0.14em] text-ink-muted" }, toDisplayString(_ctx.$t("shop.grandTotal")), 1), createVNode("dd", { class: "flex items-center gap-1.5 font-mono text-2xl text-ink-muted" }, [createTextVNode(toDisplayString(("formatExact" in _ctx ? _ctx.formatExact : unref(formatExact))(unref(grandTotal), unref(locale))) + " ", 1), createVNode(_component_DxIcon, {
							name: "resources/nova-crystal",
							size: 18,
							class: "text-nova"
						})])])])
					])];
				}),
				_: 1
			}, _parent));
			_push(`<p class="dx-alert dx-alert--warning border-0 text-[0.8125rem]">`);
			_push(ssrRenderComponent(_component_DxIcon, {
				name: "status/warning",
				size: 17,
				class: "mt-px shrink-0"
			}, null, _parent));
			_push(`<span>${ssrInterpolate(_ctx.$t("shop.incomplete"))}</span></p><section class="panel p-5"><h2 class="mb-3 text-sm font-semibold uppercase tracking-[0.14em] text-ink-muted">${ssrInterpolate(_ctx.$t("shop.recommendedOrder"))}</h2><ol class="flex flex-wrap items-center gap-2 text-sm"><!--[-->`);
			ssrRenderList(unref(recommended), (item, i) => {
				_push(`<li class="flex items-center gap-2"><span class="flex items-center gap-2 rounded-md border border-edge-soft bg-panel-raised px-2.5 py-1.5">`);
				_push(ssrRenderComponent(_component_DxIcon, {
					name: iconOf(item.id),
					size: 16,
					class: "text-accent"
				}, null, _parent));
				_push(` ${ssrInterpolate(item.name)}</span>`);
				if (i < unref(recommended).length - 1) _push(ssrRenderComponent(_component_DxIcon, {
					name: "actions/arrow-right",
					size: 14,
					class: "text-ink-muted"
				}, null, _parent));
				else _push(`<!---->`);
				_push(`</li>`);
			});
			_push(`<!--]--></ol></section><!--[-->`);
			ssrRenderList(unref(upgradeSections), (section) => {
				_push(`<section class="flex flex-col gap-3"><h2 class="text-lg uppercase tracking-wide">${ssrInterpolate(_ctx.$t(`shop.category.${section.id}`))}</h2><ul class="grid gap-3 sm:grid-cols-2 xl:grid-cols-3"><!--[-->`);
				ssrRenderList(section.items, (item) => {
					_push(`<li class="dx-shop-card"><span class="dx-shop-card__icon">`);
					_push(ssrRenderComponent(_component_DxIcon, {
						name: iconOf(item.id),
						size: 30
					}, null, _parent));
					_push(`</span><div class="min-w-0"><div class="flex flex-wrap items-start justify-between gap-2"><h3 class="text-base">${ssrInterpolate(item.name)} `);
					if (item.confidence !== "confirmed") _push(`<span class="${ssrRenderClass([CONFIDENCE_CLASS[item.confidence], "cursor-help align-super text-xs"])}"${ssrRenderAttr("title", item.note ?? _ctx.$t(`shop.confidence.${item.confidence}`))}>⚠</span>`);
					else _push(`<!---->`);
					_push(`</h3>`);
					if (item.oneTime) _push(`<span class="dx-badge dx-badge--epic">${ssrInterpolate(_ctx.$t("shop.oneTime"))}</span>`);
					else _push(`<!---->`);
					_push(`</div><p class="text-xs text-ink-muted">${ssrInterpolate(item.effect ?? _ctx.$t("droid.noData"))}</p>`);
					if (!item.costs.length) _push(`<p class="mt-3 text-sm text-ink-muted">${ssrInterpolate(_ctx.$t("shop.unknownCost"))}</p>`);
					else {
						_push(`<div class="mt-3 flex flex-wrap items-center justify-between gap-3"><div class="dx-stepper"><button type="button"${ssrIncludeBooleanAttr(level(item.id) === 0) ? " disabled" : ""}${ssrRenderAttr("aria-label", `−1 ${item.name}`)}>−</button><output>${ssrInterpolate(level(item.id))} / ${ssrInterpolate(item.costs.length)}</output><button type="button"${ssrIncludeBooleanAttr(level(item.id) >= item.costs.length) ? " disabled" : ""}${ssrRenderAttr("aria-label", `+1 ${item.name}`)}>+</button></div><p class="text-right">`);
						if (nextCost(item) !== null) {
							_push(`<!--[--><span class="${ssrRenderClass([nextCost(item) <= unref(store).novaCrystals ? "text-valid" : "text-nova", "flex items-center gap-1.5 font-mono"])}">`);
							_push(ssrRenderComponent(_component_DxIcon, {
								name: "resources/nova-crystal",
								size: 15
							}, null, _parent));
							_push(` ${ssrInterpolate(("formatExact" in _ctx ? _ctx.formatExact : unref(formatExact))(nextCost(item), unref(locale)))}</span><span class="text-[11px] text-ink-muted">${ssrInterpolate(_ctx.$t("shop.remaining"))} : ${ssrInterpolate(("formatExact" in _ctx ? _ctx.formatExact : unref(formatExact))(remainingCost(item), unref(locale)))}</span><!--]-->`);
						} else _push(`<span class="text-xs text-valid">${ssrInterpolate(_ctx.$t("shop.maxed"))}</span>`);
						_push(`</p></div>`);
					}
					_push(`</div></li>`);
				});
				_push(`<!--]--></ul></section>`);
			});
			_push(`<!--]--><ul class="grid gap-3 md:grid-cols-3"><!--[-->`);
			ssrRenderList(notes, (n) => {
				_push(`<li class="panel flex items-start gap-3 p-4 text-xs">`);
				_push(ssrRenderComponent(_component_DxIcon, {
					name: n.icon,
					size: 20,
					class: ["mt-0.5 shrink-0", n.tone]
				}, null, _parent));
				_push(`<span class="text-ink-muted">${ssrInterpolate(_ctx.$t(n.key))}</span></li>`);
			});
			_push(`<!--]--></ul><p class="text-xs text-ink-muted">${ssrInterpolate(unref(nova_shop_default).note)}</p></div><aside class="flex flex-col gap-4"><section class="panel p-4"><h2 class="mb-3 text-base uppercase tracking-wide">${ssrInterpolate(_ctx.$t("shop.category.iconic"))}</h2><ul class="flex flex-col gap-1"><!--[-->`);
			ssrRenderList(unref(iconics), (item) => {
				_push(`<li class="flex items-center gap-3 rounded-md p-2 transition-colors hover:bg-panel-raised">`);
				if (item.droidSlug && unref(droidBySlug)[item.droidSlug]) _push(ssrRenderComponent(_component_DroidImage, {
					droid: unref(droidBySlug)[item.droidSlug],
					tier: "DEFAULT",
					size: "sm"
				}, null, _parent));
				else _push(`<!---->`);
				_push(`<div class="min-w-0 flex-1"><p class="truncate font-display font-semibold">${ssrInterpolate(item.name)}</p><p class="truncate text-[11px] text-ink-muted">${ssrInterpolate(_ctx.$t("shop.redeemable"))}</p></div>`);
				if (item.costs.length) {
					_push(`<span class="flex shrink-0 items-center gap-1 font-mono text-sm text-nova">`);
					_push(ssrRenderComponent(_component_DxIcon, {
						name: "resources/nova-crystal",
						size: 14
					}, null, _parent));
					_push(` ${ssrInterpolate(item.costs[0])}</span>`);
				} else _push(`<span class="shrink-0 text-[10px] text-ink-muted">${ssrInterpolate(_ctx.$t("shop.unknownCost"))}</span>`);
				_push(`</li>`);
			});
			_push(`<!--]--></ul>`);
			_push(ssrRenderComponent(_component_NuxtLink, {
				to: unref(localePath)("/"),
				class: "dx-button dx-button--secondary dx-button--block mt-3"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(`${ssrInterpolate(_ctx.$t("shop.seeAllDroids"))} `);
						_push(ssrRenderComponent(_component_DxIcon, {
							name: "actions/arrow-right",
							size: 16
						}, null, _parent, _scopeId));
					} else return [createTextVNode(toDisplayString(_ctx.$t("shop.seeAllDroids")) + " ", 1), createVNode(_component_DxIcon, {
						name: "actions/arrow-right",
						size: 16
					})];
				}),
				_: 1
			}, _parent));
			_push(`</section></aside></div>`);
		};
	}
});
//#endregion
//#region app/pages/shop.vue
var _sfc_setup = shop_vue_vue_type_script_setup_true_lang_default.setup;
shop_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/shop.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var shop_default = shop_vue_vue_type_script_setup_true_lang_default;

export { shop_default as default };
//# sourceMappingURL=shop-D0bS0LQp.mjs.map
