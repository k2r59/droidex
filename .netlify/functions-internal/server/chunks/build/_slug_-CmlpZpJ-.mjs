import { u as useRoute$1, a as useI18n, b as useLocalePath, c as createError$1, d as useSeoMeta$1, N as NuxtLink } from '../virtual/entry.mjs';
import { r as rebirths_default } from './rebirths-CkSxdQ_O.mjs';
import { u as useCollectionStore } from './collection-CMF38Hwi.mjs';
import { f as formatExact, a as formatIncome, b as formatNumber } from './format-GC6uCquA.mjs';
import { D as DroidImage_default } from './DroidImage-cGvQPK3j.mjs';
import { R as RarityBadge_default } from './RarityBadge-BGlq658Y.mjs';
import { T as TierSelector_default } from './TierSelector-DDTg0Zg0.mjs';
import { defineComponent, computed, ref, watchEffect, unref, mergeProps, withCtx, createTextVNode, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderAttr, ssrRenderList, ssrRenderClass, ssrRenderSlot } from 'vue/server-renderer';
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

//#region app/components/DxToggle.vue?vue&type=script&setup=true&lang.ts
var DxToggle_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "DxToggle",
	__ssrInlineRender: true,
	props: {
		modelValue: { type: Boolean },
		label: {}
	},
	emits: ["update:modelValue"],
	setup(__props) {
		/**
		* Interrupteur à bascule.
		*
		* Un `<button role="switch">` plutôt qu'une `<input type="checkbox">` habillée : le rôle
		* `switch` annonce « activé / désactivé » aux lecteurs d'écran, là où une case à cocher
		* annonce « coché », ce qui ne veut pas dire la même chose pour un état persistant.
		*
		* Le bouton porte lui-même le libellé : pas de `<label for>` à synchroniser, et toute la
		* surface — texte compris — devient cliquable, ce qui compte au doigt.
		*/
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<button${ssrRenderAttrs(mergeProps({
				type: "button",
				role: "switch",
				"aria-checked": __props.modelValue,
				class: "group flex cursor-pointer items-center gap-2.5 text-sm"
			}, _attrs))}><span class="${ssrRenderClass([__props.modelValue ? "border-accent bg-accent/25" : "border-edge-soft bg-panel-raised group-hover:border-edge-strong", "relative h-6 w-11 shrink-0 rounded-full border transition-colors"])}"><span class="${ssrRenderClass([__props.modelValue ? "left-[calc(100%-1.25rem)] bg-accent shadow-[0_0_8px_rgba(37,215,255,0.7)]" : "left-1 bg-ink-muted", "absolute top-1/2 size-4 -translate-y-1/2 rounded-full transition-all"])}"></span></span>`);
			if (__props.label) _push(`<span class="${ssrRenderClass(__props.modelValue ? "text-ink-strong" : "text-ink-muted")}">${ssrInterpolate(__props.label)}</span>`);
			else _push(`<!---->`);
			ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
			_push(`</button>`);
		};
	}
});
//#endregion
//#region app/components/DxToggle.vue
var _sfc_setup$1 = DxToggle_vue_vue_type_script_setup_true_lang_default.setup;
DxToggle_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/DxToggle.vue");
	return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
var DxToggle_default = Object.assign(DxToggle_vue_vue_type_script_setup_true_lang_default, { __name: "DxToggle" });
//#endregion
//#region app/pages/droids/[slug].vue?vue&type=script&setup=true&lang.ts
var _slug__vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "[slug]",
	__ssrInlineRender: true,
	setup(__props) {
		const route = useRoute$1();
		const store = useCollectionStore();
		const { t, locale } = useI18n();
		const localePath = useLocalePath();
		const slug = computed(() => String(route.params.slug));
		const droid = computed(() => store.droids.find((d) => d.slug === slug.value));
		if (!droid.value) throw createError$1({
			statusCode: 404,
			statusMessage: `Droid introuvable : ${slug.value}`
		});
		useSeoMeta$1({
			title: () => droid.value?.name ?? "",
			description: () => t("droidex.subtitle", {
				owned: store.ownedCount,
				total: store.totalCount
			})
		});
		const entry = computed(() => store.entry(slug.value));
		const tiers = computed(() => Object.keys(droid.value.tiers));
		/** Palier mis en avant dans la grande illustration. */
		const focusTier = ref("DEFAULT");
		watchEffect(() => {
			focusTier.value = entry.value.tier ?? "DEFAULT";
		});
		const focusStats = computed(() => droid.value.tiers[focusTier.value]);
		/** Paliers de renaissance qui exigent ce droid, tous cycles confondus. */
		const usedInRebirths = computed(() => {
			const out = [];
			for (const [cycle, levels] of Object.entries(rebirths_default.cycles)) for (const lvl of levels) for (const req of lvl.droids) if (req.slug === slug.value) out.push({
				cycle: Number(cycle),
				level: lvl.level,
				tier: req.tier
			});
			return out.sort((a, b) => a.cycle - b.cycle || a.level - b.level);
		});
		return (_ctx, _push, _parent, _attrs) => {
			const _component_NuxtLink = NuxtLink;
			const _component_DroidImage = DroidImage_default;
			const _component_RarityBadge = RarityBadge_default;
			const _component_DxToggle = DxToggle_default;
			const _component_TierSelector = TierSelector_default;
			if (unref(droid)) {
				_push(`<div${ssrRenderAttrs(mergeProps({ class: "flex flex-col gap-5" }, _attrs))}>`);
				_push(ssrRenderComponent(_component_NuxtLink, {
					to: unref(localePath)("/"),
					class: "text-sm text-ink-muted hover:text-ink"
				}, {
					default: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) _push(` ← ${ssrInterpolate(_ctx.$t("droid.backToDroidex"))}`);
						else return [createTextVNode(" ← " + toDisplayString(_ctx.$t("droid.backToDroidex")), 1)];
					}),
					_: 1
				}, _parent));
				_push(`<section class="panel flex flex-col gap-5 p-5 md:flex-row"><div class="flex shrink-0 flex-col items-center gap-2">`);
				_push(ssrRenderComponent(_component_DroidImage, {
					droid: unref(droid),
					tier: unref(focusTier),
					size: "lg"
				}, null, _parent));
				_push(`<p class="text-xs text-ink-muted">${ssrInterpolate(_ctx.$t(`tier.${unref(focusTier)}`))}</p>`);
				if (unref(focusStats)?.imageIsFallback) _push(`<p class="max-w-40 text-center text-xs text-tier-galactic">${ssrInterpolate(_ctx.$t("droid.imageFallback"))}</p>`);
				else _push(`<!---->`);
				_push(`</div><div class="min-w-0 flex-1"><div class="flex flex-wrap items-center gap-2"><h1 class="text-2xl font-bold">${ssrInterpolate(unref(droid).name)}</h1>`);
				_push(ssrRenderComponent(_component_RarityBadge, { rarity: unref(droid).rarity }, null, _parent));
				_push(`<span class="text-sm text-ink-muted">${ssrInterpolate(_ctx.$t(`type.${unref(droid).type}`))}</span>`);
				if (unref(droid).unverified) _push(`<span class="rounded bg-warn/15 px-1.5 py-0.5 text-xs text-warn"${ssrRenderAttr("title", _ctx.$t("droid.unverifiedHint"))}>${ssrInterpolate(_ctx.$t("droid.unverified"))}</span>`);
				else _push(`<!---->`);
				_push(`</div>`);
				if (unref(droid).perk) _push(`<p class="mt-2 rounded-lg bg-panel-raised px-3 py-2 text-sm"><span class="text-xs text-ink-muted">${ssrInterpolate(_ctx.$t("droid.perk"))}</span><br> ${ssrInterpolate(_ctx.$t(unref(droid).perk))}</p>`);
				else _push(`<!---->`);
				_push(`<div class="mt-4 flex flex-wrap items-center gap-x-6 gap-y-4">`);
				if (unref(droid).percentIncome) _push(ssrRenderComponent(_component_DxToggle, {
					"model-value": unref(entry).tier !== null,
					label: _ctx.$t("droid.owned"),
					"onUpdate:modelValue": ($event) => unref(store).setTier(unref(slug), $event ? "DEFAULT" : null)
				}, null, _parent));
				else {
					_push(`<div><p class="text-xs text-ink-muted">${ssrInterpolate(_ctx.$t("droidex.filterTier"))}</p>`);
					_push(ssrRenderComponent(_component_TierSelector, {
						droid: unref(droid),
						"model-value": unref(entry).tier,
						"onUpdate:modelValue": ($event) => unref(store).setTier(unref(slug), $event),
						onPreview: ($event) => focusTier.value = $event ?? unref(entry).tier ?? "DEFAULT"
					}, null, _parent));
					_push(`</div>`);
				}
				_push(ssrRenderComponent(_component_DxToggle, {
					"model-value": unref(entry).flawless,
					label: _ctx.$t("droid.flawless"),
					"onUpdate:modelValue": ($event) => unref(store).toggleFlawless(unref(slug))
				}, null, _parent));
				_push(`</div>`);
				if (!unref(droid).percentIncome) {
					_push(`<div class="mt-4 flex flex-wrap gap-1.5"><!--[-->`);
					ssrRenderList(unref(tiers), (tier) => {
						_push(`<button type="button" class="${ssrRenderClass([unref(focusTier) === tier ? "border-iconic bg-panel-raised" : "border-edge-soft hover:border-edge-strong", "rounded-lg border p-1 transition-colors"])}"${ssrRenderAttr("title", _ctx.$t(`tier.${tier}`))}>`);
						_push(ssrRenderComponent(_component_DroidImage, {
							droid: unref(droid),
							tier,
							size: "sm",
							dimmed: !unref(store).satisfies(unref(slug), tier)
						}, null, _parent));
						_push(`</button>`);
					});
					_push(`<!--]--></div>`);
				} else _push(`<!---->`);
				_push(`<p class="mt-1 text-xs text-ink-muted">${ssrInterpolate(_ctx.$t("droid.flawlessHint"))}</p>`);
				if (unref(droid).percentIncome) _push(`<p class="mt-4 text-lg text-iconic">${ssrInterpolate(_ctx.$t("droid.percentIncome", { value: unref(droid).percentValue ?? "?" }))}</p>`);
				else _push(`<!---->`);
				_push(`</div></section>`);
				if (!unref(droid).percentIncome) {
					_push(`<section class="panel overflow-x-auto"><h2 class="px-4 pt-4 font-semibold">${ssrInterpolate(_ctx.$t("droid.tierTable"))}</h2><table class="mt-3 w-full text-sm"><thead class="border-b border-edge-soft text-left text-xs uppercase text-ink-muted"><tr><th class="px-4 py-2 font-medium">${ssrInterpolate(_ctx.$t("droidex.filterTier"))}</th><th class="px-4 py-2 text-right font-medium">${ssrInterpolate(_ctx.$t("droid.income"))}</th><th class="px-4 py-2 text-right font-medium">${ssrInterpolate(_ctx.$t("droid.cost"))}</th><th class="px-4 py-2 text-right font-medium">${ssrInterpolate(_ctx.$t("droid.value"))}</th></tr></thead><tbody><!--[-->`);
					ssrRenderList(unref(tiers), (tier) => {
						_push(`<tr class="${ssrRenderClass([unref(entry).tier === tier && "bg-panel-raised", "border-b border-edge-soft transition-colors last:border-0 hover:bg-panel-raised"])}"><td class="px-4 py-2"><button type="button" class="flex items-center gap-2 hover:underline">`);
						_push(ssrRenderComponent(_component_DroidImage, {
							droid: unref(droid),
							tier,
							size: "sm"
						}, null, _parent));
						_push(` ${ssrInterpolate(_ctx.$t(`tier.${tier}`))}</button></td><td class="px-4 py-2 text-right font-mono tabular-nums"${ssrRenderAttr("title", ("formatExact" in _ctx ? _ctx.formatExact : unref(formatExact))(unref(droid).tiers[tier]?.income, unref(locale)))}>${ssrInterpolate(("formatIncome" in _ctx ? _ctx.formatIncome : unref(formatIncome))(unref(droid).tiers[tier]?.income, unref(locale)))}</td><td class="px-4 py-2 text-right font-mono tabular-nums text-ink-muted"${ssrRenderAttr("title", ("formatExact" in _ctx ? _ctx.formatExact : unref(formatExact))(unref(droid).tiers[tier]?.cost, unref(locale)))}>${ssrInterpolate(("formatNumber" in _ctx ? _ctx.formatNumber : unref(formatNumber))(unref(droid).tiers[tier]?.cost, unref(locale)))}</td><td class="px-4 py-2 text-right font-mono tabular-nums text-ink-muted"${ssrRenderAttr("title", ("formatExact" in _ctx ? _ctx.formatExact : unref(formatExact))(unref(droid).tiers[tier]?.value, unref(locale)))}>${ssrInterpolate(("formatNumber" in _ctx ? _ctx.formatNumber : unref(formatNumber))(unref(droid).tiers[tier]?.value, unref(locale)))}</td></tr>`);
					});
					_push(`<!--]--></tbody></table><p class="px-4 py-3 text-xs text-ink-muted">${ssrInterpolate(_ctx.$t("droid.galacticNoData"))}</p></section>`);
				} else _push(`<!---->`);
				if (unref(usedInRebirths).length) {
					_push(`<section class="panel p-4"><h2 class="mb-2 font-semibold">${ssrInterpolate(_ctx.$t("droid.usedInRebirths"))}</h2><ul class="flex flex-wrap gap-2 text-sm"><!--[-->`);
					ssrRenderList(unref(usedInRebirths), (use) => {
						_push(`<li class="rounded-lg bg-panel-raised px-2.5 py-1"><span class="text-xs text-ink-muted">${ssrInterpolate(_ctx.$t("rebirth.cycle", { number: use.cycle }))} ·</span> ${ssrInterpolate(use.level)} <span class="text-xs text-ink-muted">${ssrInterpolate(_ctx.$t(`tier.${use.tier ?? "DEFAULT"}`))}</span></li>`);
					});
					_push(`<!--]--></ul></section>`);
				} else _push(`<!---->`);
				_push(`</div>`);
			} else _push(`<!---->`);
		};
	}
});
//#endregion
//#region app/pages/droids/[slug].vue
var _sfc_setup = _slug__vue_vue_type_script_setup_true_lang_default.setup;
_slug__vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/droids/[slug].vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var _slug__default = _slug__vue_vue_type_script_setup_true_lang_default;

export { _slug__default as default };
//# sourceMappingURL=_slug_-CmlpZpJ-.mjs.map
