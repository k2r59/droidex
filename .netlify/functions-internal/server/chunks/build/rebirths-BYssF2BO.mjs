import { a as useI18n, d as useSeoMeta$1 } from '../virtual/entry.mjs';
import { D as DxIcon_default } from './DxIcon-70RsSwuM.mjs';
import { r as rebirths_default$1 } from './rebirths-CkSxdQ_O.mjs';
import { u as useCollectionStore } from './collection-CMF38Hwi.mjs';
import { o as onKeyStroke } from './dist-BxHIjq2A.mjs';
import { b as formatNumber } from './format-GC6uCquA.mjs';
import { D as DroidImage_default } from './DroidImage-cGvQPK3j.mjs';
import { P as PageBanner_default } from './PageBanner-B_1qgWUv.mjs';
import { defineComponent, computed, ref, mergeProps, withCtx, unref, createVNode, toDisplayString, openBlock, createBlock, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderAttr, ssrRenderClass, ssrRenderList, ssrRenderTeleport, ssrIncludeBooleanAttr, ssrRenderStyle } from 'vue/server-renderer';
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

//#region app/assets/images/nova-crystal-hero.webp
var nova_crystal_hero_default = "" + __buildAssetsURL("nova-crystal-hero.B3NvAjAy.webp");
//#endregion
//#region app/components/SuperRebirthPanel.vue?vue&type=script&setup=true&lang.ts
/**
* Colonne de droite de la page Renaissances.
*
* Le Super Rebirth mérite son propre rail : c'est une décision irréversible qui efface
* la base, et les trois blocs « perdu / conservé / accordé » sont exactement ce que le
* joueur relit avant de s'engager.
*/
var SuperRebirthPanel_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "SuperRebirthPanel",
	__ssrInlineRender: true,
	props: {
		unlocked: { type: Boolean },
		crystalsNow: {},
		novaByRebirth: {},
		unlockRebirth: {}
	},
	setup(__props) {
		const props = __props;
		const store = useCollectionStore();
		const table = computed(() => Object.entries(props.novaByRebirth).map(([level, crystals]) => ({
			level: Number(level),
			crystals
		})).sort((a, b) => a.level - b.level));
		/** Dans l'ordre où le joueur se pose les questions : que perds-je, que garde-je, que gagne-je. */
		const blocs = [
			{
				key: "loses",
				icon: "game/factory",
				tone: "text-danger",
				ring: "border-danger/50 bg-danger/12 shadow-[inset_0_0_12px_rgba(255,93,108,0.18)]",
				title: "rebirth.loses",
				body: "superRebirth.loses"
			},
			{
				key: "keeps",
				icon: "game/crate",
				tone: "text-valid",
				ring: "border-valid/60 bg-valid/12 shadow-[inset_0_0_12px_rgba(34,212,154,0.18)]",
				title: "rebirth.keeps",
				body: "superRebirth.keeps"
			},
			{
				key: "reward",
				icon: "resources/nova-crystal",
				tone: "text-rare",
				ring: "border-rare/50 bg-rare/12 shadow-[inset_0_0_12px_rgba(116,183,255,0.20)]",
				title: "superRebirth.rewardTitle",
				body: "rebirth.grantsList"
			}
		];
		return (_ctx, _push, _parent, _attrs) => {
			const _component_DxIcon = DxIcon_default;
			_push(`<aside${ssrRenderAttrs(mergeProps({ class: "flex flex-col gap-4" }, _attrs))}><section class="panel relative overflow-hidden p-3"><span class="pointer-events-none absolute inset-0 bg-cover bg-center" style="${ssrRenderStyle({ backgroundImage: `url(${unref(nova_crystal_hero_default)})` })}" aria-hidden="true"></span><div class="relative flex flex-col gap-3"><div class="rounded-lg border border-edge-soft bg-void/60 p-4 backdrop-blur-sm"><h2 class="text-xl font-bold uppercase tracking-[0.03em]">${ssrInterpolate(_ctx.$t("superRebirth.title"))}</h2><p class="mt-1 text-sm text-ink-muted">${ssrInterpolate(_ctx.$t("superRebirth.unlock", { rebirth: __props.unlockRebirth }))} <span class="block font-semibold text-legendary">${ssrInterpolate(_ctx.$t("superRebirth.unlockItem"))}</span></p></div><div class="aspect-[5/4]" aria-hidden="true"></div><div class="rounded-lg border border-edge-soft bg-void/60 p-4 backdrop-blur-sm"><p class="flex items-baseline gap-2"><span class="font-mono text-2xl font-bold text-accent">${ssrInterpolate(unref(store).superRebirth)}</span><span class="text-sm text-ink-muted">${ssrInterpolate(_ctx.$t("superRebirth.done"))}</span></p><button type="button" class="dx-button dx-button--primary dx-button--block mt-3"${ssrIncludeBooleanAttr(!__props.unlocked) ? " disabled" : ""}>${ssrInterpolate(_ctx.$t("superRebirth.doIt"))}</button>`);
			if (__props.crystalsNow !== null) _push(`<p class="mt-2 text-center font-mono text-sm text-accent"> ✦ ${ssrInterpolate(_ctx.$t("superRebirth.crystals", __props.crystalsNow, { named: { count: __props.crystalsNow } }))}</p>`);
			else _push(`<!---->`);
			_push(`</div></div></section><section class="panel divide-y divide-edge-soft"><!--[-->`);
			ssrRenderList(blocs, (bloc) => {
				_push(`<div class="flex gap-3.5 p-4"><span class="${ssrRenderClass([[bloc.ring, bloc.tone], "grid size-11 shrink-0 place-items-center rounded-full border"])}">`);
				_push(ssrRenderComponent(_component_DxIcon, {
					name: bloc.icon,
					size: 20
				}, null, _parent));
				_push(`</span><div class="min-w-0"><p class="${ssrRenderClass([bloc.tone, "font-semibold"])}">${ssrInterpolate(_ctx.$t(bloc.title))}</p><p class="mt-0.5 text-sm text-ink-muted">${ssrInterpolate(_ctx.$t(bloc.body))}</p></div></div>`);
			});
			_push(`<!--]--></section><details class="panel group p-4"><summary class="flex cursor-pointer list-none items-center gap-2 text-sm text-ink-muted hover:text-ink">`);
			_push(ssrRenderComponent(_component_DxIcon, {
				name: "resources/nova-crystal",
				size: 18,
				class: "text-accent"
			}, null, _parent));
			_push(`<span class="flex-1">${ssrInterpolate(_ctx.$t("superRebirth.crystalsByTier"))}</span>`);
			_push(ssrRenderComponent(_component_DxIcon, {
				name: "actions/chevron-down",
				size: 16,
				class: "transition-transform group-open:rotate-180"
			}, null, _parent));
			_push(`</summary><ul class="mt-3 grid grid-cols-3 gap-1.5"><!--[-->`);
			ssrRenderList(unref(table), (row) => {
				_push(`<li class="${ssrRenderClass([row.level === unref(store).rebirth && "ring-1 ring-accent", "rounded-sm bg-panel-raised px-2 py-1 text-center text-xs"])}"><span class="block text-ink-muted">${ssrInterpolate(row.level)}</span><span class="font-mono text-accent">✦${ssrInterpolate(row.crystals)}</span></li>`);
			});
			_push(`<!--]--></ul></details></aside>`);
		};
	}
});
//#endregion
//#region app/components/SuperRebirthPanel.vue
var _sfc_setup$1 = SuperRebirthPanel_vue_vue_type_script_setup_true_lang_default.setup;
SuperRebirthPanel_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/SuperRebirthPanel.vue");
	return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
var SuperRebirthPanel_default = Object.assign(SuperRebirthPanel_vue_vue_type_script_setup_true_lang_default, { __name: "SuperRebirthPanel" });
//#endregion
//#region app/pages/rebirths.vue?vue&type=script&setup=true&lang.ts
var RADIUS = 42;
var rebirths_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "rebirths",
	__ssrInlineRender: true,
	setup(__props) {
		const store = useCollectionStore();
		const { t, locale } = useI18n();
		useSeoMeta$1({
			title: () => t("rebirth.title"),
			description: () => t("rebirth.cycleHint")
		});
		const cycles = rebirths_default$1.cycles;
		const levels = computed(() => cycles[String(store.cycle)] ?? cycles["1"]);
		const droidBySlug = computed(() => Object.fromEntries(store.droids.map((d) => [d.slug, d])));
		/** Une exigence sans palier précisé est satisfaite dès que le droid est possédé. */
		function met(req) {
			return req.tier ? store.satisfies(req.slug, req.tier) : store.entry(req.slug).tier !== null;
		}
		const nextLevel = computed(() => levels.value.find((l) => l.level === store.rebirth + 1) ?? null);
		const missingCount = computed(() => nextLevel.value ? nextLevel.value.droids.filter((r) => !met(r)).length : 0);
		const isReady = computed(() => Boolean(nextLevel.value?.droids.length) && missingCount.value === 0);
		const progress = computed(() => Math.round(store.rebirth / rebirths_default$1.maxRebirth * 100));
		const creditMultiplier = computed(() => Math.round(store.rebirth * rebirths_default$1.creditMultiplierPerLevel * 100));
		const superUnlocked = computed(() => store.rebirth >= rebirths_default$1.superRebirthUnlock.rebirth);
		const crystalsNow = computed(() => rebirths_default$1.novaByRebirth[String(store.rebirth)] ?? null);
		/** Périmètre du cercle de progression, pour piloter le trait en dasharray. */
		const CIRCUMFERENCE = 2 * Math.PI * RADIUS;
		/** « BONUS ACTIF » → ['BONUS', 'ACTIF'], pour teinter les deux mots différemment. */
		const bonusLabel = computed(() => {
			const words = t("rebirth.activeBonus").split(" ");
			return [words[0] ?? "", words.slice(1).join(" ")];
		});
		function setLevel(value) {
			store.setRebirth(Math.min(rebirths_default$1.maxRebirth, Math.max(0, value)));
		}
		const search = ref("");
		/**
		* Palier ouvert dans la fenêtre de détail. Cliquer une tuile n'change plus directement la
		* progression : on montre d'abord ce que le palier demande, et le joueur décide ensuite —
		* un clic de survol ne doit pas réécrire sa progression sans qu'il ait rien vu.
		*/
		const selected = ref(null);
		/** Cristaux Nova accordés à ce palier, ou `null` si la table ne le documente pas. */
		const selectedCrystals = computed(() => selected.value ? rebirths_default$1.novaByRebirth[String(selected.value.level)] ?? null : null);
		const selectedMissing = computed(() => selected.value ? selected.value.droids.filter((r) => !met(r)).length : 0);
		function closeLevel() {
			selected.value = null;
		}
		/** Échap ferme la fenêtre : c'est le réflexe attendu, et le seul si la souris est loin. */
		onKeyStroke("Escape", () => {
			if (selected.value) closeLevel();
		});
		/**
		* Un palier est « verrouillé » quand ses exigences ne sont pas publiées — ce qui est le
		* cas de presque tout le cycle 2 et du cycle 3. Le cadenas dit donc « donnée manquante »
		* et non « progression insuffisante » : mentir sur ce point induirait le joueur en erreur.
		*/
		const shown = computed(() => {
			const q = search.value.trim();
			return levels.value.filter((l) => !q || String(l.level).includes(q) || formatNumber(l.credits, locale.value).includes(q)).map((l) => ({
				...l,
				locked: l.droids.length === 0,
				done: l.level <= store.rebirth,
				current: l.level === store.rebirth + 1,
				superUnlock: l.level === rebirths_default$1.superRebirthUnlock.rebirth
			}));
		});
		return (_ctx, _push, _parent, _attrs) => {
			const _component_PageBanner = PageBanner_default;
			const _component_DxIcon = DxIcon_default;
			const _component_DroidImage = DroidImage_default;
			const _component_SuperRebirthPanel = SuperRebirthPanel_default;
			_push(`<div${ssrRenderAttrs(mergeProps({ class: "layout-2-columns" }, _attrs))}><div class="flex min-w-0 flex-col gap-5">`);
			_push(ssrRenderComponent(_component_PageBanner, {
				name: "renaissances",
				"min-height": "17rem"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`<div${_scopeId}><h1 class="text-4xl uppercase tracking-tight lg:text-5xl"${_scopeId}>${ssrInterpolate(_ctx.$t("rebirth.title"))}</h1><p class="mt-1 max-w-md text-sm text-ink-muted"${_scopeId}>${ssrInterpolate(_ctx.$t("rebirth.tagline"))}</p></div><div class="grid max-w-4xl rounded-card border border-edge-soft bg-void/55 backdrop-blur sm:grid-cols-3 sm:divide-x sm:divide-edge"${_scopeId}><div class="flex items-center gap-5 p-4"${_scopeId}><div class="min-w-0"${_scopeId}><p class="whitespace-nowrap text-[10px] font-semibold uppercase tracking-[0.14em] text-ink-muted"${_scopeId}>${ssrInterpolate(_ctx.$t("rebirth.yourProgress"))}</p><p class="mt-1 whitespace-nowrap font-mono text-3xl font-bold"${_scopeId}><span class="text-accent"${_scopeId}>${ssrInterpolate(unref(store).rebirth)}</span><span class="text-ink-strong"${_scopeId}> / ${ssrInterpolate(unref(rebirths_default$1).maxRebirth)}</span></p><p class="whitespace-nowrap text-xs text-ink-muted"${_scopeId}>${ssrInterpolate(_ctx.$t("rebirth.tiersCompleted"))}</p></div><div class="relative grid size-24 shrink-0 place-items-center"${_scopeId}><svg class="absolute inset-0 -rotate-90" viewBox="0 0 100 100"${_scopeId}><circle cx="50" cy="50"${ssrRenderAttr("r", RADIUS - 5)} class="fill-void/60"${_scopeId}></circle><circle cx="50" cy="50"${ssrRenderAttr("r", RADIUS)} fill="none" stroke="currentColor" stroke-width="8" class="text-edge/80"${_scopeId}></circle><circle cx="50" cy="50"${ssrRenderAttr("r", RADIUS)} fill="none" stroke="currentColor" stroke-width="8" stroke-linecap="round" class="text-accent drop-shadow-[0_0_6px_rgba(37,215,255,0.6)] transition-[stroke-dashoffset] duration-700"${ssrRenderAttr("stroke-dasharray", CIRCUMFERENCE)}${ssrRenderAttr("stroke-dashoffset", CIRCUMFERENCE * (1 - unref(progress) / 100))}${_scopeId}></circle></svg><span class="relative font-mono text-xl font-bold text-ink-strong"${_scopeId}>${ssrInterpolate(unref(progress))}%</span></div></div><div class="p-4"${_scopeId}><p class="text-[10px] font-semibold uppercase tracking-[0.14em] text-ink-muted"${_scopeId}>${ssrInterpolate(_ctx.$t("rebirth.setMyTier"))}</p><div class="dx-stepper mt-2"${_scopeId}><button type="button"${ssrRenderAttr("aria-label", `−1 ${_ctx.$t("rebirth.title")}`)}${_scopeId}>−</button><output${_scopeId}>${ssrInterpolate(unref(store).rebirth)}</output><button type="button"${ssrRenderAttr("aria-label", `+1 ${_ctx.$t("rebirth.title")}`)}${_scopeId}>+</button></div></div><div class="p-4"${_scopeId}><p class="whitespace-nowrap text-[10px] font-semibold uppercase tracking-[0.14em]"${_scopeId}><span class="text-ink-strong"${_scopeId}>${ssrInterpolate(unref(bonusLabel)[0])}</span><span class="ml-1 text-ink-muted"${_scopeId}>${ssrInterpolate(unref(bonusLabel)[1])}</span></p><p class="mt-1 font-mono text-3xl font-bold text-accent"${_scopeId}>+${ssrInterpolate(unref(creditMultiplier))}%</p><div class="mt-1 flex flex-wrap items-center gap-2"${_scopeId}><span class="text-xs text-ink-muted"${_scopeId}>${ssrInterpolate(_ctx.$t("rebirth.creditsPerTier"))}</span><span class="rounded-md border border-edge-soft bg-void/60 px-2 py-0.5 text-xs text-ink"${_scopeId}>${ssrInterpolate(_ctx.$t("rebirth.cycle", { number: unref(store).cycle }))}</span></div></div></div>`);
					else return [createVNode("div", null, [createVNode("h1", { class: "text-4xl uppercase tracking-tight lg:text-5xl" }, toDisplayString(_ctx.$t("rebirth.title")), 1), createVNode("p", { class: "mt-1 max-w-md text-sm text-ink-muted" }, toDisplayString(_ctx.$t("rebirth.tagline")), 1)]), createVNode("div", { class: "grid max-w-4xl rounded-card border border-edge-soft bg-void/55 backdrop-blur sm:grid-cols-3 sm:divide-x sm:divide-edge" }, [
						createVNode("div", { class: "flex items-center gap-5 p-4" }, [createVNode("div", { class: "min-w-0" }, [
							createVNode("p", { class: "whitespace-nowrap text-[10px] font-semibold uppercase tracking-[0.14em] text-ink-muted" }, toDisplayString(_ctx.$t("rebirth.yourProgress")), 1),
							createVNode("p", { class: "mt-1 whitespace-nowrap font-mono text-3xl font-bold" }, [createVNode("span", { class: "text-accent" }, toDisplayString(unref(store).rebirth), 1), createVNode("span", { class: "text-ink-strong" }, " / " + toDisplayString(unref(rebirths_default$1).maxRebirth), 1)]),
							createVNode("p", { class: "whitespace-nowrap text-xs text-ink-muted" }, toDisplayString(_ctx.$t("rebirth.tiersCompleted")), 1)
						]), createVNode("div", { class: "relative grid size-24 shrink-0 place-items-center" }, [(openBlock(), createBlock("svg", {
							class: "absolute inset-0 -rotate-90",
							viewBox: "0 0 100 100"
						}, [
							createVNode("circle", {
								cx: "50",
								cy: "50",
								r: RADIUS - 5,
								class: "fill-void/60"
							}, null, 8, ["r"]),
							createVNode("circle", {
								cx: "50",
								cy: "50",
								r: RADIUS,
								fill: "none",
								stroke: "currentColor",
								"stroke-width": "8",
								class: "text-edge/80"
							}),
							createVNode("circle", {
								cx: "50",
								cy: "50",
								r: RADIUS,
								fill: "none",
								stroke: "currentColor",
								"stroke-width": "8",
								"stroke-linecap": "round",
								class: "text-accent drop-shadow-[0_0_6px_rgba(37,215,255,0.6)] transition-[stroke-dashoffset] duration-700",
								"stroke-dasharray": CIRCUMFERENCE,
								"stroke-dashoffset": CIRCUMFERENCE * (1 - unref(progress) / 100)
							}, null, 8, ["stroke-dashoffset"])
						])), createVNode("span", { class: "relative font-mono text-xl font-bold text-ink-strong" }, toDisplayString(unref(progress)) + "%", 1)])]),
						createVNode("div", { class: "p-4" }, [createVNode("p", { class: "text-[10px] font-semibold uppercase tracking-[0.14em] text-ink-muted" }, toDisplayString(_ctx.$t("rebirth.setMyTier")), 1), createVNode("div", { class: "dx-stepper mt-2" }, [
							createVNode("button", {
								type: "button",
								"aria-label": `−1 ${_ctx.$t("rebirth.title")}`,
								onClick: ($event) => setLevel(unref(store).rebirth - 1)
							}, "−", 8, ["aria-label", "onClick"]),
							createVNode("output", null, toDisplayString(unref(store).rebirth), 1),
							createVNode("button", {
								type: "button",
								"aria-label": `+1 ${_ctx.$t("rebirth.title")}`,
								onClick: ($event) => setLevel(unref(store).rebirth + 1)
							}, "+", 8, ["aria-label", "onClick"])
						])]),
						createVNode("div", { class: "p-4" }, [
							createVNode("p", { class: "whitespace-nowrap text-[10px] font-semibold uppercase tracking-[0.14em]" }, [createVNode("span", { class: "text-ink-strong" }, toDisplayString(unref(bonusLabel)[0]), 1), createVNode("span", { class: "ml-1 text-ink-muted" }, toDisplayString(unref(bonusLabel)[1]), 1)]),
							createVNode("p", { class: "mt-1 font-mono text-3xl font-bold text-accent" }, "+" + toDisplayString(unref(creditMultiplier)) + "%", 1),
							createVNode("div", { class: "mt-1 flex flex-wrap items-center gap-2" }, [createVNode("span", { class: "text-xs text-ink-muted" }, toDisplayString(_ctx.$t("rebirth.creditsPerTier")), 1), createVNode("span", { class: "rounded-md border border-edge-soft bg-void/60 px-2 py-0.5 text-xs text-ink" }, toDisplayString(_ctx.$t("rebirth.cycle", { number: unref(store).cycle })), 1)])
						])
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
			_push(`<span>${ssrInterpolate(_ctx.$t("rebirth.placementWarning"))}</span></p>`);
			if (unref(nextLevel)) {
				_push(`<section class="${ssrRenderClass([unref(isReady) && "border-valid/60", "panel p-5"])}"><div class="mb-4 flex flex-wrap items-center justify-between gap-3"><h2 class="flex items-center gap-2 text-lg uppercase tracking-wide">`);
				_push(ssrRenderComponent(_component_DxIcon, {
					name: "resources/star",
					size: 20,
					class: "text-accent"
				}, null, _parent));
				_push(` ${ssrInterpolate(_ctx.$t("rebirth.next"))} — ${ssrInterpolate(unref(nextLevel).level)}</h2><p class="text-sm"><span class="font-mono text-lg font-bold text-nova">${ssrInterpolate(("formatNumber" in _ctx ? _ctx.formatNumber : unref(formatNumber))(unref(nextLevel).credits, unref(locale)))}</span><span class="ml-1 text-ink-muted">${ssrInterpolate(_ctx.$t("rebirth.creditsRequired"))}</span></p></div>`);
				if (!unref(nextLevel).droids.length) _push(`<p class="text-sm text-ink-muted">${ssrInterpolate(_ctx.$t("rebirth.undocumented"))}</p>`);
				else {
					_push(`<!--[--><ul class="grid gap-3 sm:grid-cols-3"><!--[-->`);
					ssrRenderList(unref(nextLevel).droids, (req) => {
						_push(`<li><button type="button" class="${ssrRenderClass([met(req) ? "border-valid/60" : "border-edge-soft", "rebirth-req flex min-h-[5.5rem] w-full items-center gap-4 rounded-lg border px-5 py-4 text-left transition-colors hover:border-accent"])}"${ssrRenderAttr("aria-pressed", met(req))}>`);
						if (unref(droidBySlug)[req.slug]) _push(ssrRenderComponent(_component_DroidImage, {
							droid: unref(droidBySlug)[req.slug],
							tier: req.tier ?? "DEFAULT",
							size: "sm"
						}, null, _parent));
						else _push(`<!---->`);
						_push(`<div class="min-w-0 flex-1"><p class="truncate font-display text-base font-bold">${ssrInterpolate(unref(droidBySlug)[req.slug]?.name ?? req.slug)}</p><span class="dx-badge dx-badge--common mt-1.5">${ssrInterpolate(_ctx.$t(`tier.${req.tier ?? "DEFAULT"}`))}</span></div>`);
						if (met(req)) _push(ssrRenderComponent(_component_DxIcon, {
							name: "status/success",
							size: 20,
							class: "shrink-0 text-valid"
						}, null, _parent));
						else _push(`<span class="size-5 shrink-0 rounded-full border-2 border-edge-strong" aria-hidden="true"></span>`);
						_push(`</button></li>`);
					});
					_push(`<!--]--></ul><p class="${ssrRenderClass([unref(isReady) ? "dx-alert--success" : "dx-alert--info", "dx-alert mt-4 border-0 text-[0.8125rem]"])}">`);
					_push(ssrRenderComponent(_component_DxIcon, {
						name: unref(isReady) ? "status/success" : "status/info",
						size: 17,
						class: "mt-px shrink-0"
					}, null, _parent));
					_push(`<span>${ssrInterpolate(unref(isReady) ? _ctx.$t("rebirth.ready") : _ctx.$t("rebirth.missing", unref(missingCount), { named: { count: unref(missingCount) } }))}</span></p><!--]-->`);
				}
				_push(`</section>`);
			} else _push(`<!---->`);
			_push(`<section class="panel p-5"><div class="mb-4 flex flex-wrap items-center gap-4"><h2 class="text-lg uppercase tracking-wide">${ssrInterpolate(_ctx.$t("rebirth.allTiers"))}</h2><label class="dx-search w-full sm:w-72">`);
			_push(ssrRenderComponent(_component_DxIcon, {
				name: "actions/search",
				size: 16,
				class: "text-ink-muted"
			}, null, _parent));
			_push(`<input${ssrRenderAttr("value", unref(search))} type="search"${ssrRenderAttr("placeholder", _ctx.$t("rebirth.searchTier"))} class="border-0 bg-transparent outline-none"><span></span></label></div><ul class="grid grid-cols-2 gap-2 sm:grid-cols-4 xl:grid-cols-6 2xl:grid-cols-8"><!--[-->`);
			ssrRenderList(unref(shown), (lvl) => {
				_push(`<li><button type="button" class="${ssrRenderClass([[lvl.current ? "border-accent bg-accent/10" : "rebirth-tile border-edge-soft", lvl.locked && "opacity-45"], "flex w-full flex-col gap-1.5 rounded-md border p-3 transition-colors hover:border-accent"])}"${ssrRenderAttr("aria-current", lvl.current ? "step" : void 0)}${ssrRenderAttr("aria-haspopup", "dialog")}><div class="flex items-center justify-between gap-1"><span class="${ssrRenderClass([lvl.done ? "text-valid" : lvl.current ? "text-accent" : "text-ink", "mx-auto rounded-full bg-void/55 px-2.5 py-0.5 font-mono text-sm"])}">${ssrInterpolate(lvl.level)}</span>`);
				if (lvl.superUnlock) _push(ssrRenderComponent(_component_DxIcon, {
					name: "resources/star",
					size: 14,
					class: "text-warn",
					title: _ctx.$t("superRebirth.title")
				}, null, _parent));
				else if (lvl.locked) _push(ssrRenderComponent(_component_DxIcon, {
					name: "status/locked",
					size: 14,
					class: "text-ink-muted",
					title: _ctx.$t("rebirth.tierLocked")
				}, null, _parent));
				else _push(`<!---->`);
				_push(`</div><p class="flex items-center gap-1.5">`);
				_push(ssrRenderComponent(_component_DxIcon, {
					name: "resources/diamond",
					size: 14,
					class: "shrink-0 text-nova"
				}, null, _parent));
				_push(`<span class="font-mono text-sm">${ssrInterpolate(("formatNumber" in _ctx ? _ctx.formatNumber : unref(formatNumber))(lvl.credits, unref(locale)))}</span></p></button></li>`);
			});
			_push(`<!--]--></ul></section></div>`);
			_push(ssrRenderComponent(_component_SuperRebirthPanel, {
				unlocked: unref(superUnlocked),
				"crystals-now": unref(crystalsNow),
				"nova-by-rebirth": unref(rebirths_default$1).novaByRebirth,
				"unlock-rebirth": unref(rebirths_default$1).superRebirthUnlock.rebirth
			}, null, _parent));
			ssrRenderTeleport(_push, (_push) => {
				if (unref(selected)) {
					_push(`<div class="fixed inset-0 z-50 grid place-items-center overflow-y-auto p-4" role="dialog" aria-modal="true"${ssrRenderAttr("aria-label", _ctx.$t("rebirth.levelShort", { level: unref(selected).level }))}><div class="absolute inset-0 bg-void-deep/70 backdrop-blur-md"></div><section class="dx-modal-panel panel relative z-10 w-full max-w-xl p-6"><div class="mb-5 flex items-start justify-between gap-4"><div><h2 class="flex items-center gap-2 text-xl uppercase tracking-wide">`);
					_push(ssrRenderComponent(_component_DxIcon, {
						name: "resources/star",
						size: 20,
						class: "text-accent"
					}, null, _parent));
					_push(` ${ssrInterpolate(_ctx.$t("rebirth.levelShort", { level: unref(selected).level }))}</h2><p class="mt-1 flex items-center gap-1.5">`);
					_push(ssrRenderComponent(_component_DxIcon, {
						name: "resources/diamond",
						size: 15,
						class: "shrink-0 text-nova"
					}, null, _parent));
					_push(`<span class="font-mono font-bold text-nova">${ssrInterpolate(("formatNumber" in _ctx ? _ctx.formatNumber : unref(formatNumber))(unref(selected).credits, unref(locale)))}</span><span class="text-sm text-ink-muted">${ssrInterpolate(_ctx.$t("rebirth.creditsRequired"))}</span></p></div><button type="button" class="dx-icon-button shrink-0"${ssrRenderAttr("aria-label", _ctx.$t("common.close"))}>`);
					_push(ssrRenderComponent(_component_DxIcon, {
						name: "actions/close",
						size: 18
					}, null, _parent));
					_push(`</button></div><ul class="mb-5 flex flex-wrap gap-2">`);
					if (unref(selectedCrystals) !== null) _push(`<li class="dx-badge dx-badge--emblematic"> ✦ ${ssrInterpolate(_ctx.$t("superRebirth.crystals", unref(selectedCrystals), { named: { count: unref(selectedCrystals) } }))}</li>`);
					else _push(`<!---->`);
					if (unref(selected).level === unref(rebirths_default$1).superRebirthUnlock.rebirth) _push(`<li class="dx-badge dx-badge--legendary">${ssrInterpolate(_ctx.$t("superRebirth.title"))}</li>`);
					else _push(`<!---->`);
					_push(`</ul>`);
					if (!unref(selected).droids.length) {
						_push(`<p class="dx-alert dx-alert--warning border-0 text-[0.8125rem]">`);
						_push(ssrRenderComponent(_component_DxIcon, {
							name: "status/locked",
							size: 17,
							class: "mt-px shrink-0"
						}, null, _parent));
						_push(`<span>${ssrInterpolate(_ctx.$t("rebirth.undocumented"))}</span></p>`);
					} else {
						_push(`<!--[--><p class="mb-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-ink-muted">${ssrInterpolate(_ctx.$t("rebirth.droidsRequired"))}</p><ul class="flex flex-col gap-2"><!--[-->`);
						ssrRenderList(unref(selected).droids, (req) => {
							_push(`<li><button type="button" class="${ssrRenderClass([met(req) ? "border-valid/60" : "border-edge-soft", "rebirth-req flex w-full items-center gap-4 rounded-lg border px-4 py-3 text-left transition-colors hover:border-accent"])}"${ssrRenderAttr("aria-pressed", met(req))}>`);
							if (unref(droidBySlug)[req.slug]) _push(ssrRenderComponent(_component_DroidImage, {
								droid: unref(droidBySlug)[req.slug],
								tier: req.tier ?? "DEFAULT",
								size: "sm"
							}, null, _parent));
							else _push(`<!---->`);
							_push(`<div class="min-w-0 flex-1"><p class="truncate font-display font-bold">${ssrInterpolate(unref(droidBySlug)[req.slug]?.name ?? req.slug)}</p><span class="dx-badge dx-badge--common mt-1">${ssrInterpolate(_ctx.$t(`tier.${req.tier ?? "DEFAULT"}`))}</span></div>`);
							if (met(req)) _push(ssrRenderComponent(_component_DxIcon, {
								name: "status/success",
								size: 20,
								class: "shrink-0 text-valid"
							}, null, _parent));
							else _push(`<span class="size-5 shrink-0 rounded-full border-2 border-edge-strong" aria-hidden="true"></span>`);
							_push(`</button></li>`);
						});
						_push(`<!--]--></ul><p class="${ssrRenderClass([unref(selectedMissing) === 0 ? "dx-alert--success" : "dx-alert--info", "dx-alert mt-4 border-0 text-[0.8125rem]"])}">`);
						_push(ssrRenderComponent(_component_DxIcon, {
							name: unref(selectedMissing) === 0 ? "status/success" : "status/info",
							size: 17,
							class: "mt-px shrink-0"
						}, null, _parent));
						_push(`<span>${ssrInterpolate(unref(selectedMissing) === 0 ? _ctx.$t("rebirth.ready") : _ctx.$t("rebirth.missing", unref(selectedMissing), { named: { count: unref(selectedMissing) } }))}</span></p><!--]-->`);
					}
					_push(`<button type="button" class="dx-button dx-button--primary dx-button--block mt-5"${ssrIncludeBooleanAttr(unref(selected).level - 1 === unref(store).rebirth) ? " disabled" : ""}>${ssrInterpolate(_ctx.$t("rebirth.setLevel"))}</button></section></div>`);
				} else _push(`<!---->`);
			}, "body", false, _parent);
			_push(`</div>`);
		};
	}
});
//#endregion
//#region app/pages/rebirths.vue
var _sfc_setup = rebirths_vue_vue_type_script_setup_true_lang_default.setup;
rebirths_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/rebirths.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var rebirths_default = rebirths_vue_vue_type_script_setup_true_lang_default;

export { rebirths_default as default };
//# sourceMappingURL=rebirths-BYssF2BO.mjs.map
