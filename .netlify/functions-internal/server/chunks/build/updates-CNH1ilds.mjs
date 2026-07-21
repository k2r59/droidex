import { a as useI18n, b as useLocalePath, d as useSeoMeta$1, N as NuxtLink } from '../virtual/entry.mjs';
import { u as useCollectionStore } from './collection-CMF38Hwi.mjs';
import { u as updates_default$1 } from './updates-Dq7D2Nn8.mjs';
import { D as DroidImage_default } from './DroidImage-cGvQPK3j.mjs';
import { P as PageBanner_default } from './PageBanner-B_1qgWUv.mjs';
import { defineComponent, computed, mergeProps, withCtx, createVNode, toDisplayString, unref, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderClass, ssrRenderAttr } from 'vue/server-renderer';
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

//#region app/pages/updates.vue?vue&type=script&setup=true&lang.ts
var updates_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "updates",
	__ssrInlineRender: true,
	setup(__props) {
		const store = useCollectionStore();
		const { t, locale } = useI18n();
		const localePath = useLocalePath();
		useSeoMeta$1({
			title: () => t("updates.title"),
			description: () => t("updates.subtitle")
		});
		const entries = computed(() => [...updates_default$1.entries].sort((a, b) => b.date.localeCompare(a.date)));
		const droidBySlug = computed(() => Object.fromEntries(store.droids.map((d) => [d.slug, d])));
		const KIND_CLASS = {
			release: "bg-iconic/15 text-iconic",
			patch: "bg-rare/15 text-rare",
			event: "bg-legendary/15 text-legendary"
		};
		function formatDate(iso) {
			return new Intl.DateTimeFormat(locale.value, { dateStyle: "long" }).format(new Date(iso));
		}
		return (_ctx, _push, _parent, _attrs) => {
			const _component_PageBanner = PageBanner_default;
			const _component_NuxtLink = NuxtLink;
			const _component_DroidImage = DroidImage_default;
			_push(`<div${ssrRenderAttrs(mergeProps({ class: "flex flex-col gap-5" }, _attrs))}>`);
			_push(ssrRenderComponent(_component_PageBanner, { name: "nouveautes" }, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`<div${_scopeId}><h1 class="text-xl font-bold"${_scopeId}>${ssrInterpolate(_ctx.$t("updates.title"))}</h1><p class="text-sm text-ink-muted"${_scopeId}>${ssrInterpolate(_ctx.$t("updates.subtitle"))}</p></div>`);
					else return [createVNode("div", null, [createVNode("h1", { class: "text-xl font-bold" }, toDisplayString(_ctx.$t("updates.title")), 1), createVNode("p", { class: "text-sm text-ink-muted" }, toDisplayString(_ctx.$t("updates.subtitle")), 1)])];
				}),
				_: 1
			}, _parent));
			_push(`<ol class="relative flex flex-col gap-3 border-l border-edge-soft pl-5"><!--[-->`);
			ssrRenderList(unref(entries), (entry) => {
				_push(`<li class="panel relative p-6"><span class="${ssrRenderClass([entry.kind === "event" ? "bg-legendary" : "bg-rare", "absolute -left-[26px] top-5 size-2.5 rounded-full ring-4 ring-void"])}"></span><div class="flex flex-wrap items-center gap-2"><span class="${ssrRenderClass([KIND_CLASS[entry.kind], "rounded px-1.5 py-0.5 text-xs font-medium uppercase"])}">${ssrInterpolate(_ctx.$t(`updates.${entry.kind === "event" ? "event" : "patch"}`))}</span>`);
				if (entry.version) _push(`<span class="font-mono text-xs text-ink-muted">${ssrInterpolate(_ctx.$t("updates.version", { version: entry.version }))}</span>`);
				else _push(`<!---->`);
				_push(`<time${ssrRenderAttr("datetime", entry.date)} class="ml-auto text-xs text-ink-muted">${ssrInterpolate(formatDate(entry.date))} `);
				if (entry.endDate) _push(`<!--[--> → ${ssrInterpolate(formatDate(entry.endDate))}<!--]-->`);
				else _push(`<!---->`);
				_push(`</time></div><h2 class="mt-1.5 font-semibold">${ssrInterpolate(entry.title)}</h2><p class="mt-1 text-sm text-ink-muted">${ssrInterpolate(entry.body)}</p>`);
				if (entry.droidSlug && unref(droidBySlug)[entry.droidSlug]) _push(ssrRenderComponent(_component_NuxtLink, {
					to: unref(localePath)(`/droids/${entry.droidSlug}`),
					class: "mt-3 inline-flex items-center gap-2 rounded-lg bg-panel-raised px-2 py-1.5 text-sm transition-colors hover:bg-edge"
				}, {
					default: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) {
							_push(ssrRenderComponent(_component_DroidImage, {
								droid: unref(droidBySlug)[entry.droidSlug],
								tier: "DEFAULT",
								size: "sm"
							}, null, _parent, _scopeId));
							_push(` ${ssrInterpolate(unref(droidBySlug)[entry.droidSlug].name)}`);
						} else return [createVNode(_component_DroidImage, {
							droid: unref(droidBySlug)[entry.droidSlug],
							tier: "DEFAULT",
							size: "sm"
						}, null, 8, ["droid"]), createTextVNode(" " + toDisplayString(unref(droidBySlug)[entry.droidSlug].name), 1)];
					}),
					_: 2
				}, _parent));
				else _push(`<!---->`);
				_push(`</li>`);
			});
			_push(`<!--]--></ol></div>`);
		};
	}
});
//#endregion
//#region app/pages/updates.vue
var _sfc_setup = updates_vue_vue_type_script_setup_true_lang_default.setup;
updates_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/updates.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var updates_default = updates_vue_vue_type_script_setup_true_lang_default;

export { updates_default as default };
//# sourceMappingURL=updates-CNH1ilds.mjs.map
