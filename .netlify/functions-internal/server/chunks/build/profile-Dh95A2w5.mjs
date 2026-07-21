import { a as useI18n, d as useSeoMeta$1 } from '../virtual/entry.mjs';
import { D as DxIcon_default } from './DxIcon-70RsSwuM.mjs';
import { u as useCollectionStore } from './collection-CMF38Hwi.mjs';
import { u as useAuthSession } from './useAuthSession-AQGXZ6Q7.mjs';
import { a as formatIncome } from './format-GC6uCquA.mjs';
import { defineComponent, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr, ssrInterpolate, ssrRenderComponent } from 'vue/server-renderer';
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

//#region app/pages/profile.vue?vue&type=script&setup=true&lang.ts
var profile_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "profile",
	__ssrInlineRender: true,
	setup(__props) {
		const store = useCollectionStore();
		const { t, locale } = useI18n();
		const { user } = useAuthSession();
		useSeoMeta$1({ title: () => t("nav.profile") });
		return (_ctx, _push, _parent, _attrs) => {
			const _component_DxIcon = DxIcon_default;
			_push(`<div${ssrRenderAttrs(mergeProps({ class: "flex flex-col gap-5" }, _attrs))}>`);
			if (unref(user)) {
				_push(`<section class="flex items-center gap-4 rounded-card border border-edge bg-panel p-6">`);
				if (unref(user).image) _push(`<img${ssrRenderAttr("src", unref(user).image)}${ssrRenderAttr("alt", unref(user).name ?? "")} class="size-14 rounded-full object-cover" referrerpolicy="no-referrer">`);
				else _push(`<!---->`);
				_push(`<div><h1 class="text-lg font-bold">${ssrInterpolate(unref(user).name)}</h1><p class="text-sm text-ink-muted">${ssrInterpolate(unref(user).email)}</p></div></section>`);
			} else _push(`<p class="rounded-card border border-edge bg-panel p-6 text-sm text-ink-muted">${ssrInterpolate(_ctx.$t("auth.signInPrompt"))}</p>`);
			_push(`<section class="grid gap-3 sm:grid-cols-3"><div class="rounded-card border border-edge bg-panel p-6"><p class="text-xs text-ink-muted">${ssrInterpolate(_ctx.$t("stats.collection"))}</p><p class="font-mono text-2xl tabular-nums">${ssrInterpolate(unref(store).ownedCount)}/${ssrInterpolate(unref(store).totalCount)}</p></div><div class="rounded-card border border-edge bg-panel p-6"><p class="text-xs text-ink-muted">${ssrInterpolate(_ctx.$t("rebirth.current"))}</p><p class="font-mono text-2xl tabular-nums">${ssrInterpolate(unref(store).rebirth)}</p></div><div class="rounded-card border border-edge bg-panel p-6"><p class="text-xs text-ink-muted">${ssrInterpolate(_ctx.$t("stats.totalIncome"))}</p><p class="font-mono text-2xl tabular-nums">${ssrInterpolate(("formatIncome" in _ctx ? _ctx.formatIncome : unref(formatIncome))(unref(store).totalIncome, unref(locale)))}</p></div></section><section class="rounded-card border border-edge bg-panel p-6"><button type="button" class="rounded-lg bg-panel-raised px-3 py-2 text-sm transition-colors hover:bg-edge">`);
			_push(ssrRenderComponent(_component_DxIcon, {
				name: "actions/download",
				size: 15
			}, null, _parent));
			_push(` ${ssrInterpolate(_ctx.$t("common.exportJson"))}</button></section></div>`);
		};
	}
});
//#endregion
//#region app/pages/profile.vue
var _sfc_setup = profile_vue_vue_type_script_setup_true_lang_default.setup;
profile_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/profile.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var profile_default = profile_vue_vue_type_script_setup_true_lang_default;

export { profile_default as default };
//# sourceMappingURL=profile-Dh95A2w5.mjs.map
