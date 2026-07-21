import { a as useI18n, d as useSeoMeta$1 } from '../virtual/entry.mjs';
import { D as DxIcon_default } from './DxIcon-70RsSwuM.mjs';
import { u as useCollectionStore } from './collection-CMF38Hwi.mjs';
import { o as onKeyStroke } from './dist-BxHIjq2A.mjs';
import { b as formatNumber } from './format-GC6uCquA.mjs';
import { P as PageBanner_default } from './PageBanner-B_1qgWUv.mjs';
import { defineComponent, computed, ref, mergeProps, withCtx, unref, createVNode, toDisplayString, openBlock, createBlock, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderAttr, ssrRenderList, ssrRenderClass, ssrRenderStyle, ssrRenderTeleport } from 'vue/server-renderer';
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

var missions_default$1 = {
	version: 1,
	generatedFrom: "Fortnite Wiki (Fandom), update log communautaire et patch notes du dev (@FoadZone), juillet 2026 — état v1.22.1",
	pads: {
		"note": "Les « mission pads » du Shipyard et les « Astromech Missions » des patch notes sont le même système. Il y a 5 terminaux, et chaque palier de mission s'achète séparément SUR CHAQUE terminal — débloquer la mission Diamant sur les 5 terminaux coûte 5 × 400k, pas 400k une fois. Un droid par terminal, donc 5 missions simultanées.",
		"slotLocks": true,
		"passiveIncomeDuringMission": "Non confirmé explicitement, mais les discussions de joueurs sur l'optimisation du revenu des emplacements de mission n'auraient aucun sens si le droid cessait de produire. À vérifier en jeu.",
		"entries": [
			{
				"pad": 1,
				"unlockCost": null,
				"baseDurationSeconds": 60,
				"rewards": [
					{
						"kind": "credits",
						"chance": 50
					},
					{
						"kind": "tier",
						"tier": "DEFAULT",
						"chance": 40
					},
					{
						"kind": "tier",
						"tier": "GOLD",
						"chance": 10
					}
				],
				"note": "Durée observée entre 1:00 et 1:20. Les coûts de déblocage des deux premiers paliers ne sont attestés par aucune source — les valeurs « gratuit » et « 15k » qui circulent sont invérifiées.",
				"missionTier": "DEFAULT",
				"unlockConfidence": "unknown"
			},
			{
				"pad": 2,
				"unlockCost": null,
				"baseDurationSeconds": null,
				"rewards": [
					{
						"kind": "tier",
						"tier": "DEFAULT",
						"chance": 20
					},
					{
						"kind": "tier",
						"tier": "GOLD",
						"chance": 70
					},
					{
						"kind": "tier",
						"tier": "DIAMOND",
						"chance": 10
					}
				],
				"missionTier": "GOLD",
				"unlockConfidence": "unknown",
				"note": "Coût de déblocage et durée non attestés."
			},
			{
				"pad": 3,
				"unlockCost": 4e5,
				"baseDurationSeconds": null,
				"rewards": [
					{
						"kind": "tier",
						"tier": "GOLD",
						"chance": 20
					},
					{
						"kind": "tier",
						"tier": "DIAMOND",
						"chance": 70
					},
					{
						"kind": "tier",
						"tier": "RAINBOW",
						"chance": 10
					}
				],
				"missionTier": "DIAMOND",
				"unlockConfidence": "confirmed"
			},
			{
				"pad": 4,
				"unlockCost": 8e6,
				"baseDurationSeconds": 3600,
				"rewards": [{
					"kind": "tier",
					"tier": "DIAMOND",
					"chance": 20
				}, {
					"kind": "tier",
					"tier": "RAINBOW",
					"chance": 80
				}],
				"missionTier": "RAINBOW",
				"unlockConfidence": "confirmed",
				"note": "Durée observée d'environ 1 heure."
			},
			{
				"pad": 5,
				"unlockCost": 1e10,
				"baseDurationSeconds": 720,
				"rewards": [
					{
						"kind": "credits",
						"chance": 80
					},
					{
						"kind": "tier",
						"tier": "RAINBOW",
						"chance": 15
					},
					{
						"kind": "tier",
						"tier": "BESKAR",
						"chance": 5
					}
				],
				"note": "Seule source de Beskar en mission. Les récompenses de droid sont des blueprints, pas des droids finis. Crédits augmentés d'environ 30 % en v1.16.1. La durée de base de 12 minutes vient des patch notes du dev ; les 6:00 souvent cités sont le temps atteint avec un excellent astromech, pas le temps de base.",
				"missionTier": "BESKAR",
				"unlockConfidence": "confirmed"
			}
		],
		"durationNote": "Seul un droid ASTROMECH placé sur le terminal réduit la durée. Y mettre autre chose laisse la mission à son temps de base. La réduction dépend à la fois de la rareté et du palier de l'astromech, mais aucune formule n'a été publiée.",
		"measured": {
			"missionTier": "BESKAR",
			"baseSeconds": 720,
			"rows": [
				{
					"droid": "R7 Légendaire Beskar",
					"seconds": 360
				},
				{
					"droid": "Astromech Légendaire Arc-en-ciel",
					"seconds": 368
				},
				{
					"droid": "R7 Légendaire Arc-en-ciel",
					"seconds": 378
				},
				{
					"droid": "R2 Épique",
					"seconds": 420,
					"approximate": true
				},
				{
					"droid": "Astromech Épique Beskar, ou tout non-astromech",
					"seconds": 720
				}
			]
		},
		"bestCompanion": "Depuis la v1.17.1, les droids Iconiques dépassent les Légendaires Beskar sur les missions astromech : BB-8 est le meilleur droid à envoyer.",
		"scalingNote": "Pour les mission pads, la rareté ET le palier comptent. Pour les World Missions, seule la rareté compte depuis la v1.18 — les deux systèmes ne suivent pas la même règle.",
		"perTerminalPurchase": true,
		"rewardsUnaffectedByDroid": "La qualité du droid envoyé ne change QUE la durée, jamais les récompenses."
	},
	worldMissions: {
		"note": "Objectifs répartis sur Tatooine, distincts des mission pads. Il faut amener un droid de la bonne classe pour les déclencher.",
		"types": [
			"worker",
			"astromech",
			"battle"
		],
		"rewards": "Crédits ou Puces d'amélioration, via des caisses de récompense",
		"scaling": "Depuis la v1.18, les récompenses dépendent de la RARETÉ du compagnon et non de son palier — les droids Iconiques sont donc les meilleurs compagnons pour ces missions.",
		"examples": [
			"Réparer des évaporateurs d'humidité (nécessite des droids précis)",
			"Nettoyer des Stormtroopers hostiles (faisable au blaster seul)",
			"Réparer des droids"
		],
		"cooldown": null,
		"tip": "Les world missions Worker sont les plus rapides pour farmer les puces ; celles d'Astromech sont les plus longues."
	},
	cantina: {
		"traders": 2,
		"cooldown": 0,
		"cooldownNote": "Le temps de recharge a été supprimé en v1.13 — à vider systématiquement à chaque passage.",
		"rewards": "Beaucoup de crédits et des Puces d'amélioration. Ne donnent plus de droids depuis la v1.13.",
		"mechanic": "Chaque trader demande un droid précis, ou une version de rareté supérieure de ce droid. Un palier supérieur satisfait une demande de palier inférieur.",
		"tip": "Les traders demandent souvent des droids Typiques : c'est un farm très accessible."
	},
	dailies: {
		"perDay": 3,
		"resetHours": 22,
		"tiers": [
			{
				"difficulty": "easy",
				"reward": "Blueprint aléatoire + Puces d'amélioration",
				"examples": ["Assigner 5 droids d'une classe au travail", "Se faire éliminer par un joueur"]
			},
			{
				"difficulty": "medium",
				"reward": "Blueprint aléatoire + Puces d'amélioration",
				"examples": [
					"Fabriquer 15 Typiques",
					"Fabriquer 10 Rares",
					"Fabriquer 2 Diamants",
					"Vendre un blueprint Diamant"
				]
			},
			{
				"difficulty": "hard",
				"reward": "Blueprint aléatoire + 1 Nova Crystal",
				"examples": [
					"Fabriquer 15 Or",
					"Fabriquer 10 Diamants",
					"Dépasser 100 M de crédits"
				]
			}
		],
		"blueprintWeighting": "Le blueprint offert est pondéré selon tes besoins de renaissance en cours.",
		"doubleDaily": {
			"cost": 75,
			"effect": "Après avoir terminé les 3 quêtes du jour, 3 quêtes supplémentaires apparaissent — soit 6 par jour, et non un doublement des récompenses.",
			"uncertainty": "Rien ne confirme que la seconde série contienne une quête difficile. Si c'est le cas, le perk vaut 2 Nova Crystals par jour au lieu d'1."
		}
	},
	strategies: [
		"Farm crédits : enchaîner la mission d'1 minute du pad 1 sur les 5 pads est plus rentable que les missions Beskar de 6 minutes. Occupe le temps d'attente avec des world missions.",
		"Farm puces : les Puces d'amélioration ne viennent plus des missions depuis la v1.14. La boucle actuelle passe par les world missions Worker, les plus rapides, et par la fabrication puis revente de droids — avec BB-8 en compagnon, qui double les puces à la vente.",
		"Endgame : garder le pad 5 actif en permanence — chaque complétion donne soit des crédits, soit un droid haute variante revendable, et c'est l'unique source de Beskar.",
		"Compagnon : ton astromech de plus haute rareté pour les pads ; un Iconique pour les world missions depuis la v1.18 ; DJ-R3X si tu farmes les world quests, il en double les récompenses.",
		"Les événements du week-end donnent double crédits, double puces et double chance de Flawless : c'est la fenêtre à privilégier pour tout farm de missions."
	],
	secretMission: {
		"name": "Mission secrète CB-23",
		"durationSeconds": 1140,
		"withR2D2Seconds": 960,
		"note": "Distincte des 5 terminaux. Débloquée via CB-23."
	}
};
//#endregion
//#region app/assets/images/mission-pads/beskar.webp
var beskar_default = "" + __buildAssetsURL("beskar.BC10OUge.webp");
//#endregion
//#region app/assets/images/mission-pads/default.webp
var default_default = "" + __buildAssetsURL("default.CDE3Zimd.webp");
//#endregion
//#region app/assets/images/mission-pads/diamond.webp
var diamond_default = "" + __buildAssetsURL("diamond.Btwn6PTr.webp");
//#endregion
//#region app/assets/images/mission-pads/galactic.webp
var galactic_default = "" + __buildAssetsURL("galactic.CI651vZ0.webp");
//#endregion
//#region app/assets/images/mission-pads/gold.webp
var gold_default = "" + __buildAssetsURL("gold.5msCZHvP.webp");
//#endregion
//#region app/assets/images/mission-pads/rainbow.webp
var rainbow_default = "" + __buildAssetsURL("rainbow.46azX83H.webp");
//#endregion
//#region app/pages/missions.vue?vue&type=script&setup=true&lang.ts
/**
* Chaque palier de mission emprunte la couleur de la variante qu'il rapporte : la barre
* de récompenses se lit alors sans légende, en reconnaissant les couleurs du jeu.
*/
var RADIUS = 42;
var missions_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "missions",
	__ssrInlineRender: true,
	setup(__props) {
		const PAD_IMAGE = {
			DEFAULT: default_default,
			GOLD: gold_default,
			DIAMOND: diamond_default,
			RAINBOW: rainbow_default,
			BESKAR: beskar_default,
			GALACTIC: galactic_default
		};
		const store = useCollectionStore();
		const { t, locale } = useI18n();
		useSeoMeta$1({
			title: () => t("missions.title"),
			description: () => t("missions.subtitle")
		});
		const TIER_BG = {
			DEFAULT: "bg-tier-default",
			GOLD: "bg-tier-gold",
			DIAMOND: "bg-tier-diamond",
			RAINBOW: "tier-rainbow-bg",
			BESKAR: "tier-beskar-bg",
			GALACTIC: "tier-galactic-bg"
		};
		/** Cercle du numéro de terminal, teinté lui aussi par le palier. */
		const TIER_RING = {
			DEFAULT: "border-tier-default text-tier-default",
			GOLD: "border-tier-gold text-tier-gold",
			DIAMOND: "border-tier-diamond text-tier-diamond",
			RAINBOW: "border-tier-rainbow text-tier-rainbow",
			BESKAR: "border-tier-beskar text-tier-beskar",
			GALACTIC: "border-tier-galactic text-tier-galactic"
		};
		const rewardLabel = (r) => r.kind === "credits" ? t("missions.credits") : t(`tier.${r.tier}`);
		const rewardClass = (r) => r.kind === "credits" ? "bg-valid" : TIER_BG[r.tier];
		function formatDuration(seconds) {
			if (seconds === null) return t("droid.noData");
			const m = Math.floor(seconds / 60);
			const s = seconds % 60;
			return s ? `${m}:${String(s).padStart(2, "0")}` : `${m} min`;
		}
		/** Repères transverses, présentés avant le détail : ils conditionnent toute la lecture. */
		const reperes = [
			{
				icon: "game/droid",
				tone: "text-accent",
				key: "missions.infoAstromech"
			},
			{
				icon: "resources/star",
				tone: "text-warn",
				key: "missions.infoScaling"
			},
			{
				icon: "status/info",
				tone: "text-glow",
				key: "missions.infoTwoSystems"
			}
		];
		const collectionPercent = computed(() => store.totalCount ? Math.round(store.ownedCount / store.totalCount * 100) : 0);
		const CIRCUMFERENCE = 2 * Math.PI * RADIUS;
		/**
		* Terminal ouvert dans la fenêtre de détail. Le chevron de chaque ligne promettait cette
		* vue depuis le départ mais n'avait aucun gestionnaire : cinq boutons inertes.
		*/
		const selectedPad = ref(null);
		const closePad = () => {
			selectedPad.value = null;
		};
		onKeyStroke("Escape", () => {
			if (selectedPad.value) closePad();
		});
		return (_ctx, _push, _parent, _attrs) => {
			const _component_PageBanner = PageBanner_default;
			const _component_DxIcon = DxIcon_default;
			_push(`<div${ssrRenderAttrs(mergeProps({ class: "flex flex-col gap-5" }, _attrs))}>`);
			_push(ssrRenderComponent(_component_PageBanner, {
				name: "missions",
				"min-height": "16rem"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(`<div class="flex items-start gap-3"${_scopeId}><span class="grid size-11 shrink-0 place-items-center rounded-md bg-accent/15 text-accent"${_scopeId}>`);
						_push(ssrRenderComponent(_component_DxIcon, {
							name: "navigation/missions",
							size: 24
						}, null, _parent, _scopeId));
						_push(`</span><div${_scopeId}><h1 class="text-4xl uppercase tracking-tight lg:text-5xl"${_scopeId}>${ssrInterpolate(_ctx.$t("missions.title"))}</h1><p class="text-[11px] font-semibold uppercase tracking-[0.16em] text-ink-muted"${_scopeId}>${ssrInterpolate(_ctx.$t("missions.subtitle"))}</p></div></div><div${_scopeId}><h2 class="text-lg uppercase tracking-wide"${_scopeId}>${ssrInterpolate(_ctx.$t("missions.padsTitle"))}</h2><p class="mt-1 max-w-3xl text-sm text-ink-muted"${_scopeId}>${ssrInterpolate(unref(missions_default$1).pads.note)}</p></div><div class="flex flex-wrap items-center gap-6 rounded-card border border-edge-soft bg-void/55 p-4 backdrop-blur"${_scopeId}><div class="flex items-center gap-4"${_scopeId}><div${_scopeId}><p class="text-[10px] font-semibold uppercase tracking-[0.14em] text-ink-muted"${_scopeId}>${ssrInterpolate(_ctx.$t("rebirth.yourProgress"))}</p><p class="font-mono text-2xl"${_scopeId}><span class="text-accent"${_scopeId}>${ssrInterpolate(unref(store).ownedCount)}</span><span class="text-ink-muted"${_scopeId}> / ${ssrInterpolate(unref(store).totalCount)}</span></p><p class="text-xs text-ink-muted"${_scopeId}>${ssrInterpolate(_ctx.$t("stats.droidsCollected"))}</p></div><div class="relative grid size-16 shrink-0 place-items-center"${_scopeId}><svg class="absolute inset-0 -rotate-90" viewBox="0 0 100 100"${_scopeId}><circle cx="50" cy="50"${ssrRenderAttr("r", RADIUS)} fill="none" stroke="currentColor" stroke-width="9" class="text-edge"${_scopeId}></circle><circle cx="50" cy="50"${ssrRenderAttr("r", RADIUS)} fill="none" stroke="currentColor" stroke-width="9" stroke-linecap="round" class="text-accent transition-[stroke-dashoffset] duration-700"${ssrRenderAttr("stroke-dasharray", CIRCUMFERENCE)}${ssrRenderAttr("stroke-dashoffset", CIRCUMFERENCE * (1 - unref(collectionPercent) / 100))}${_scopeId}></circle></svg><span class="font-mono text-sm"${_scopeId}>${ssrInterpolate(unref(collectionPercent))}%</span></div></div><div${_scopeId}><p class="text-[10px] font-semibold uppercase tracking-[0.14em] text-ink-muted"${_scopeId}>${ssrInterpolate(_ctx.$t("missions.cantina"))}</p><p class="font-mono text-2xl text-valid"${_scopeId}>${ssrInterpolate(unref(missions_default$1).cantina.traders)}</p><p class="text-xs text-ink-muted"${_scopeId}>${ssrInterpolate(_ctx.$t("missions.traders"))}</p></div></div>`);
					} else return [
						createVNode("div", { class: "flex items-start gap-3" }, [createVNode("span", { class: "grid size-11 shrink-0 place-items-center rounded-md bg-accent/15 text-accent" }, [createVNode(_component_DxIcon, {
							name: "navigation/missions",
							size: 24
						})]), createVNode("div", null, [createVNode("h1", { class: "text-4xl uppercase tracking-tight lg:text-5xl" }, toDisplayString(_ctx.$t("missions.title")), 1), createVNode("p", { class: "text-[11px] font-semibold uppercase tracking-[0.16em] text-ink-muted" }, toDisplayString(_ctx.$t("missions.subtitle")), 1)])]),
						createVNode("div", null, [createVNode("h2", { class: "text-lg uppercase tracking-wide" }, toDisplayString(_ctx.$t("missions.padsTitle")), 1), createVNode("p", { class: "mt-1 max-w-3xl text-sm text-ink-muted" }, toDisplayString(unref(missions_default$1).pads.note), 1)]),
						createVNode("div", { class: "flex flex-wrap items-center gap-6 rounded-card border border-edge-soft bg-void/55 p-4 backdrop-blur" }, [createVNode("div", { class: "flex items-center gap-4" }, [createVNode("div", null, [
							createVNode("p", { class: "text-[10px] font-semibold uppercase tracking-[0.14em] text-ink-muted" }, toDisplayString(_ctx.$t("rebirth.yourProgress")), 1),
							createVNode("p", { class: "font-mono text-2xl" }, [createVNode("span", { class: "text-accent" }, toDisplayString(unref(store).ownedCount), 1), createVNode("span", { class: "text-ink-muted" }, " / " + toDisplayString(unref(store).totalCount), 1)]),
							createVNode("p", { class: "text-xs text-ink-muted" }, toDisplayString(_ctx.$t("stats.droidsCollected")), 1)
						]), createVNode("div", { class: "relative grid size-16 shrink-0 place-items-center" }, [(openBlock(), createBlock("svg", {
							class: "absolute inset-0 -rotate-90",
							viewBox: "0 0 100 100"
						}, [createVNode("circle", {
							cx: "50",
							cy: "50",
							r: RADIUS,
							fill: "none",
							stroke: "currentColor",
							"stroke-width": "9",
							class: "text-edge"
						}), createVNode("circle", {
							cx: "50",
							cy: "50",
							r: RADIUS,
							fill: "none",
							stroke: "currentColor",
							"stroke-width": "9",
							"stroke-linecap": "round",
							class: "text-accent transition-[stroke-dashoffset] duration-700",
							"stroke-dasharray": CIRCUMFERENCE,
							"stroke-dashoffset": CIRCUMFERENCE * (1 - unref(collectionPercent) / 100)
						}, null, 8, ["stroke-dashoffset"])])), createVNode("span", { class: "font-mono text-sm" }, toDisplayString(unref(collectionPercent)) + "%", 1)])]), createVNode("div", null, [
							createVNode("p", { class: "text-[10px] font-semibold uppercase tracking-[0.14em] text-ink-muted" }, toDisplayString(_ctx.$t("missions.cantina")), 1),
							createVNode("p", { class: "font-mono text-2xl text-valid" }, toDisplayString(unref(missions_default$1).cantina.traders), 1),
							createVNode("p", { class: "text-xs text-ink-muted" }, toDisplayString(_ctx.$t("missions.traders")), 1)
						])])
					];
				}),
				_: 1
			}, _parent));
			_push(`<ul class="flex flex-col gap-3"><!--[-->`);
			ssrRenderList(unref(missions_default$1).pads.entries, (pad) => {
				_push(`<li class="panel p-3 sm:p-4"><div class="flex items-center gap-3 sm:gap-4"><span class="${ssrRenderClass([TIER_RING[pad.missionTier], "grid size-9 shrink-0 place-items-center rounded-full border-2 bg-void/40 font-mono text-sm"])}">${ssrInterpolate(pad.pad)}</span><img${ssrRenderAttr("src", PAD_IMAGE[pad.missionTier])} alt="" class="size-16 shrink-0 object-contain sm:size-24" loading="lazy"><div class="min-w-0 flex-1"><div class="flex flex-wrap items-center justify-between gap-x-6 gap-y-2"><div class="min-w-0"><h3 class="text-lg">${ssrInterpolate(_ctx.$t(`tier.${pad.missionTier}`))} `);
				if (pad.unlockCost) _push(`<span class="text-ink-muted">${ssrInterpolate(("formatNumber" in _ctx ? _ctx.formatNumber : unref(formatNumber))(pad.unlockCost, unref(locale)))}</span>`);
				else _push(`<!---->`);
				_push(`</h3><p class="text-xs text-ink-muted">${ssrInterpolate(pad.unlockCost ? ("formatNumber" in _ctx ? _ctx.formatNumber : unref(formatNumber))(pad.unlockCost, unref(locale)) : _ctx.$t("droid.noData"))} · ${ssrInterpolate(formatDuration(pad.baseDurationSeconds))}</p></div><div class="flex flex-wrap items-center gap-3"><span class="text-[10px] font-semibold uppercase tracking-wide text-rare">${ssrInterpolate(_ctx.$t("missions.rewards"))}</span><!--[-->`);
				ssrRenderList(pad.rewards, (r) => {
					_push(`<span class="flex items-center gap-1.5 text-sm font-semibold"><span class="${ssrRenderClass([rewardClass(r), "size-3 rounded-full"])}"></span> ${ssrInterpolate(r.chance)} % </span>`);
				});
				_push(`<!--]--></div></div><div class="mt-2.5 flex h-6 overflow-hidden rounded-md"><!--[-->`);
				ssrRenderList(pad.rewards, (r) => {
					_push(`<span class="${ssrRenderClass([rewardClass(r), "grid place-items-center text-[11px] font-bold text-white [text-shadow:0_1px_2px_rgb(0_0_0/0.5)]"])}" style="${ssrRenderStyle({ width: `${r.chance}%` })}"${ssrRenderAttr("title", `${rewardLabel(r)} — ${r.chance} %`)}>${ssrInterpolate(r.chance >= 15 ? `${r.chance}%` : "")}</span>`);
				});
				_push(`<!--]--></div></div><button type="button" class="dx-icon-button shrink-0"${ssrRenderAttr("aria-label", _ctx.$t("missions.seeDetail"))}${ssrRenderAttr("aria-haspopup", "dialog")}>`);
				_push(ssrRenderComponent(_component_DxIcon, {
					name: "actions/chevron-right",
					size: 18
				}, null, _parent));
				_push(`</button></div>`);
				if (pad.note) {
					_push(`<p class="dx-alert dx-alert--info mt-3 border-0 text-xs">`);
					_push(ssrRenderComponent(_component_DxIcon, {
						name: "status/info",
						size: 16,
						class: "mt-px shrink-0"
					}, null, _parent));
					_push(`<span>${ssrInterpolate(pad.note)}</span></p>`);
				} else _push(`<!---->`);
				_push(`</li>`);
			});
			_push(`<!--]--></ul><ul class="grid gap-3 md:grid-cols-3"><!--[-->`);
			ssrRenderList(reperes, (r) => {
				_push(`<li class="panel flex items-start gap-3 p-4 text-sm">`);
				_push(ssrRenderComponent(_component_DxIcon, {
					name: r.icon,
					size: 22,
					class: ["mt-0.5 shrink-0", r.tone]
				}, null, _parent));
				_push(`<span class="text-ink-muted">${ssrInterpolate(_ctx.$t(r.key))}</span></li>`);
			});
			_push(`<!--]--></ul><p class="dx-alert dx-alert--warning border-0 text-[0.8125rem]">`);
			_push(ssrRenderComponent(_component_DxIcon, {
				name: "status/warning",
				size: 17,
				class: "mt-px shrink-0"
			}, null, _parent));
			_push(`<span>${ssrInterpolate(unref(missions_default$1).pads.passiveIncomeDuringMission)}</span></p><div class="grid gap-3 lg:grid-cols-[minmax(0,1fr)_380px]"><section class="panel p-5"><h2 class="mb-3 text-lg uppercase tracking-wide">${ssrInterpolate(_ctx.$t("missions.measured", { tier: _ctx.$t(`tier.${unref(missions_default$1).pads.measured.missionTier}`) }))}</h2><ul class="flex flex-col gap-1.5"><!--[-->`);
			ssrRenderList(unref(missions_default$1).pads.measured.rows, (row, i) => {
				_push(`<li class="flex items-center gap-3 rounded-md bg-panel-raised px-3 py-2 text-sm"><span class="w-4 shrink-0 text-center font-mono text-xs text-ink-muted">${ssrInterpolate(i + 1)}</span><span class="min-w-0 flex-1">${ssrInterpolate(row.droid)}</span><span class="${ssrRenderClass([row.seconds === unref(missions_default$1).pads.measured.baseSeconds ? "text-ink-muted" : "text-valid", "font-mono"])}">${ssrInterpolate(row.approximate ? "≈ " : "")}${ssrInterpolate(formatDuration(row.seconds))}</span></li>`);
			});
			_push(`<!--]--></ul></section><section class="panel relative overflow-hidden p-5"><h2 class="text-lg uppercase tracking-wide">${ssrInterpolate(unref(missions_default$1).secretMission.name)}</h2><p class="mt-2 font-mono text-lg text-nova">${ssrInterpolate(formatDuration(unref(missions_default$1).secretMission.durationSeconds))} <span class="text-sm text-ink-muted"> · ${ssrInterpolate(formatDuration(unref(missions_default$1).secretMission.withR2D2Seconds))} ${ssrInterpolate(_ctx.$t("missions.withR2"))}</span></p><p class="mt-3 max-w-56 text-sm text-ink-muted">${ssrInterpolate(unref(missions_default$1).secretMission.note)}</p>`);
			_push(ssrRenderComponent(_component_DxIcon, {
				name: "game/droid",
				size: "9rem",
				class: "pointer-events-none absolute -bottom-6 -right-4 text-nova/25"
			}, null, _parent));
			_push(`</section></div><div class="grid gap-3 lg:grid-cols-2"><section class="panel p-5"><h2 class="mb-2 flex items-center gap-2 text-lg uppercase tracking-wide">`);
			_push(ssrRenderComponent(_component_DxIcon, {
				name: "game/planet",
				size: 22,
				class: "text-accent"
			}, null, _parent));
			_push(` ${ssrInterpolate(_ctx.$t("missions.world"))}</h2><p class="text-sm text-ink-muted">${ssrInterpolate(unref(missions_default$1).worldMissions.note)}</p><ul class="mt-3 flex flex-wrap gap-2"><!--[-->`);
			ssrRenderList(unref(missions_default$1).worldMissions.types, (type) => {
				_push(`<li><span class="dx-badge dx-badge--rare">${ssrInterpolate(_ctx.$t(`type.${type}`))}</span></li>`);
			});
			_push(`<!--]--></ul><dl class="mt-4 grid gap-3 sm:grid-cols-3"><div class="rounded-md bg-panel-raised p-3"><dt class="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wide text-valid">`);
			_push(ssrRenderComponent(_component_DxIcon, {
				name: "resources/credits",
				size: 14
			}, null, _parent));
			_push(`${ssrInterpolate(_ctx.$t("missions.rewards"))}</dt><dd class="mt-1 text-xs text-ink-muted">${ssrInterpolate(unref(missions_default$1).worldMissions.rewards)}</dd></div><div class="rounded-md bg-panel-raised p-3"><dt class="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wide text-glow">`);
			_push(ssrRenderComponent(_component_DxIcon, {
				name: "resources/xp",
				size: 14
			}, null, _parent));
			_push(`${ssrInterpolate(_ctx.$t("missions.scaling"))}</dt><dd class="mt-1 text-xs text-ink-muted">${ssrInterpolate(unref(missions_default$1).worldMissions.scaling)}</dd></div><div class="rounded-md bg-panel-raised p-3"><dt class="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wide text-warn">`);
			_push(ssrRenderComponent(_component_DxIcon, {
				name: "resources/star",
				size: 14
			}, null, _parent));
			_push(`${ssrInterpolate(_ctx.$t("missions.bestCompanions"))}</dt><dd class="mt-1 text-xs text-ink-muted">${ssrInterpolate(unref(missions_default$1).worldMissions.tip)}</dd></div></dl></section><section class="panel p-5"><h2 class="mb-1 flex items-center gap-2 text-lg uppercase tracking-wide">`);
			_push(ssrRenderComponent(_component_DxIcon, {
				name: "resources/timer",
				size: 22,
				class: "text-nova"
			}, null, _parent));
			_push(` ${ssrInterpolate(_ctx.$t("missions.dailies"))}</h2><p class="text-sm text-ink-muted">${ssrInterpolate(_ctx.$t("missions.dailyReset", {
				count: unref(missions_default$1).dailies.perDay,
				hours: unref(missions_default$1).dailies.resetHours
			}))}</p><ul class="mt-3 flex flex-col gap-2"><!--[-->`);
			ssrRenderList(unref(missions_default$1).dailies.tiers, (tier) => {
				_push(`<li class="grid gap-2 rounded-md bg-panel-raised p-3 sm:grid-cols-[6rem_1fr_auto]"><span class="font-display font-semibold">${ssrInterpolate(_ctx.$t(`missions.difficulty.${tier.difficulty}`))}</span><ul class="text-xs text-ink-muted"><!--[-->`);
				ssrRenderList(tier.examples, (ex) => {
					_push(`<li>• ${ssrInterpolate(ex)}</li>`);
				});
				_push(`<!--]--></ul><span class="${ssrRenderClass([tier.difficulty === "hard" ? "text-accent" : "text-ink-muted", "text-right text-xs"])}">${ssrInterpolate(tier.reward)}</span></li>`);
			});
			_push(`<!--]--></ul></section></div><div class="grid gap-3 lg:grid-cols-[minmax(0,1fr)_380px]"><section class="panel p-5"><h2 class="mb-2 text-lg uppercase tracking-wide">${ssrInterpolate(_ctx.$t("missions.cantina"))}</h2><p class="text-sm text-ink-muted">${ssrInterpolate(unref(missions_default$1).cantina.mechanic)}</p><div class="mt-3 grid gap-3 sm:grid-cols-3"><div class="rounded-md bg-panel-raised p-3"><p class="text-[10px] font-semibold uppercase tracking-wide text-ink-muted">${ssrInterpolate(_ctx.$t("missions.traders"))}</p><p class="font-mono text-xl">${ssrInterpolate(unref(missions_default$1).cantina.traders)}</p></div><div class="rounded-md bg-panel-raised p-3"><p class="text-[10px] font-semibold uppercase tracking-wide text-ink-muted">${ssrInterpolate(_ctx.$t("missions.cooldown"))}</p><p class="text-xl text-valid">${ssrInterpolate(_ctx.$t("missions.noCooldown"))}</p></div><div class="rounded-md bg-panel-raised p-3"><p class="text-[10px] font-semibold uppercase tracking-wide text-ink-muted">${ssrInterpolate(_ctx.$t("missions.rewards"))}</p><p class="mt-1 text-xs text-ink-muted">${ssrInterpolate(unref(missions_default$1).cantina.rewards)}</p></div></div><p class="mt-3 text-xs text-ink-muted">${ssrInterpolate(unref(missions_default$1).cantina.cooldownNote)}</p><p class="dx-alert dx-alert--info mt-3 border-0 text-[0.8125rem]">`);
			_push(ssrRenderComponent(_component_DxIcon, {
				name: "status/info",
				size: 17,
				class: "mt-px shrink-0"
			}, null, _parent));
			_push(`<span>${ssrInterpolate(unref(missions_default$1).cantina.tip)}</span></p></section><section class="panel relative overflow-hidden p-5"><h2 class="flex flex-wrap items-center gap-2 text-lg">`);
			_push(ssrRenderComponent(_component_DxIcon, {
				name: "resources/nova-crystal",
				size: 22,
				class: "text-nova"
			}, null, _parent));
			_push(` ${ssrInterpolate(_ctx.$t("missions.doubleDailyTitle"))} <span class="font-mono text-accent">✦ ${ssrInterpolate(unref(missions_default$1).dailies.doubleDaily.cost)}</span></h2><p class="mt-2 text-sm text-ink-muted">${ssrInterpolate(unref(missions_default$1).dailies.doubleDaily.effect)}</p><p class="dx-alert dx-alert--warning mt-3 border-0 text-xs">`);
			_push(ssrRenderComponent(_component_DxIcon, {
				name: "status/warning",
				size: 17,
				class: "mt-px shrink-0"
			}, null, _parent));
			_push(`<span>${ssrInterpolate(unref(missions_default$1).dailies.doubleDaily.uncertainty)}</span></p></section></div><ul class="grid gap-3 sm:grid-cols-2 xl:grid-cols-5"><!--[-->`);
			ssrRenderList(unref(missions_default$1).strategies, (s, i) => {
				_push(`<li class="panel p-4"><p class="mb-1.5 flex items-center gap-2 font-display font-semibold">`);
				_push(ssrRenderComponent(_component_DxIcon, {
					name: "resources/star",
					size: 16,
					class: "text-accent"
				}, null, _parent));
				_push(` ${ssrInterpolate(i + 1)}. </p><p class="text-xs text-ink-muted">${ssrInterpolate(s)}</p></li>`);
			});
			_push(`<!--]--></ul>`);
			ssrRenderTeleport(_push, (_push) => {
				if (unref(selectedPad)) {
					_push(`<div class="fixed inset-0 z-50 grid place-items-center overflow-y-auto p-4" role="dialog" aria-modal="true"><div class="absolute inset-0 bg-void-deep/70 backdrop-blur-md"></div><section class="dx-modal-panel panel relative z-10 w-full max-w-lg p-6"><div class="mb-5 flex items-start gap-4"><img${ssrRenderAttr("src", PAD_IMAGE[unref(selectedPad).missionTier])} alt="" class="size-20 shrink-0 object-contain"><div class="min-w-0 flex-1"><h2 class="text-xl">${ssrInterpolate(_ctx.$t(`tier.${unref(selectedPad).missionTier}`))} `);
					if (unref(selectedPad).unlockCost) _push(`<span class="text-ink-muted">${ssrInterpolate(("formatNumber" in _ctx ? _ctx.formatNumber : unref(formatNumber))(unref(selectedPad).unlockCost, unref(locale)))}</span>`);
					else _push(`<!---->`);
					_push(`</h2><p class="mt-1 text-xs text-ink-muted">${ssrInterpolate(_ctx.$t("missions.padNumber", { number: unref(selectedPad).pad }))} · ${ssrInterpolate(formatDuration(unref(selectedPad).baseDurationSeconds))}</p></div><button type="button" class="dx-icon-button shrink-0"${ssrRenderAttr("aria-label", _ctx.$t("common.close"))}>`);
					_push(ssrRenderComponent(_component_DxIcon, {
						name: "actions/close",
						size: 18
					}, null, _parent));
					_push(`</button></div><p class="mb-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-ink-muted">${ssrInterpolate(_ctx.$t("missions.rewards"))}</p><ul class="flex flex-col gap-1.5"><!--[-->`);
					ssrRenderList(unref(selectedPad).rewards, (r) => {
						_push(`<li class="flex items-center gap-3 rounded-md bg-void/40 px-3 py-2"><span class="${ssrRenderClass([rewardClass(r), "size-3.5 shrink-0 rounded-full"])}"></span><span class="flex-1 text-sm">${ssrInterpolate(rewardLabel(r))}</span><span class="font-mono text-sm font-bold tabular-nums">${ssrInterpolate(r.chance)} %</span></li>`);
					});
					_push(`<!--]--></ul>`);
					if (unref(selectedPad).note) {
						_push(`<p class="dx-alert dx-alert--info mt-4 border-0 text-xs">`);
						_push(ssrRenderComponent(_component_DxIcon, {
							name: "status/info",
							size: 16,
							class: "mt-px shrink-0"
						}, null, _parent));
						_push(`<span>${ssrInterpolate(unref(selectedPad).note)}</span></p>`);
					} else _push(`<!---->`);
					_push(`</section></div>`);
				} else _push(`<!---->`);
			}, "body", false, _parent);
			_push(`</div>`);
		};
	}
});
//#endregion
//#region app/pages/missions.vue
var _sfc_setup = missions_vue_vue_type_script_setup_true_lang_default.setup;
missions_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/missions.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var missions_default = missions_vue_vue_type_script_setup_true_lang_default;

export { missions_default as default };
//# sourceMappingURL=missions-B7bDCeyS.mjs.map
