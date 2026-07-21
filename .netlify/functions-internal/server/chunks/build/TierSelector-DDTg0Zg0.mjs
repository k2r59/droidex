import { a as formatIncome } from './format-GC6uCquA.mjs';
import { defineComponent, computed, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderList, ssrRenderAttr, ssrRenderClass, ssrInterpolate } from 'vue/server-renderer';

//#region app/components/TierSelector.vue?vue&type=script&setup=true&lang.ts
var TierSelector_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "TierSelector",
	__ssrInlineRender: true,
	props: {
		droid: {},
		modelValue: {},
		size: {}
	},
	emits: ["update:modelValue", "preview"],
	setup(__props, { emit: __emit }) {
		const props = __props;
		/** Un droid Emblématique n'a qu'un palier : on affiche une simple bascule possédé/non. */
		const tiers = computed(() => Object.keys(props.droid.tiers));
		const TIER_CLASS = {
			DEFAULT: "bg-tier-default",
			GOLD: "bg-tier-gold",
			DIAMOND: "bg-tier-diamond",
			RAINBOW: "tier-rainbow-bg",
			BESKAR: "tier-beskar-bg",
			GALACTIC: "tier-galactic-bg"
		};
		const dotSize = computed(() => props.size === "sm" ? "size-4" : "size-6");
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<div${ssrRenderAttrs(mergeProps({
				class: "flex items-center gap-1",
				role: "radiogroup",
				"aria-label": _ctx.$t("droidex.filterTier")
			}, _attrs))}><!--[-->`);
			ssrRenderList(unref(tiers), (tier) => {
				_push(`<button type="button" role="radio"${ssrRenderAttr("aria-checked", __props.modelValue === tier)}${ssrRenderAttr("title", `${_ctx.$t(`tier.${tier}`)}${__props.droid.tiers[tier]?.income ? ` — ${("formatIncome" in _ctx ? _ctx.formatIncome : unref(formatIncome))(__props.droid.tiers[tier].income)}` : ""}`)} class="${ssrRenderClass([[
					unref(dotSize),
					TIER_CLASS[tier],
					__props.modelValue === tier ? "ring-2 ring-ink scale-110" : "opacity-40 hover:opacity-100"
				], "rounded-full ring-offset-2 ring-offset-panel transition-all hover:scale-125 focus:outline-none focus-visible:ring-2 focus-visible:ring-ink"])}"><span class="sr-only">${ssrInterpolate(_ctx.$t(`tier.${tier}`))}</span></button>`);
			});
			_push(`<!--]--></div>`);
		};
	}
});
//#endregion
//#region app/components/TierSelector.vue
var _sfc_setup = TierSelector_vue_vue_type_script_setup_true_lang_default.setup;
TierSelector_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/TierSelector.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var TierSelector_default = Object.assign(TierSelector_vue_vue_type_script_setup_true_lang_default, { __name: "TierSelector" });

export { TierSelector_default as T };
//# sourceMappingURL=TierSelector-DDTg0Zg0.mjs.map
