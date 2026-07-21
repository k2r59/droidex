import { defineComponent, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate } from 'vue/server-renderer';

//#region app/components/RarityBadge.vue?vue&type=script&setup=true&lang.ts
var RarityBadge_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "RarityBadge",
	__ssrInlineRender: true,
	props: { rarity: {} },
	setup(__props) {
		/**
		* Le kit nomme la rareté Emblématique `emblematic` là où le dataset dit `iconic`.
		* La correspondance est explicite plutôt que calculée : elle est arbitraire et
		* doit rester visible.
		*/
		const MODIFIER = {
			common: "dx-badge--common",
			rare: "dx-badge--rare",
			epic: "dx-badge--epic",
			legendary: "dx-badge--legendary",
			mythic: "dx-badge--mythic",
			iconic: "dx-badge--emblematic"
		};
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<span${ssrRenderAttrs(mergeProps({ class: ["dx-badge", MODIFIER[__props.rarity]] }, _attrs))}>${ssrInterpolate(_ctx.$t(`rarity.${__props.rarity}`))}</span>`);
		};
	}
});
//#endregion
//#region app/components/RarityBadge.vue
var _sfc_setup = RarityBadge_vue_vue_type_script_setup_true_lang_default.setup;
RarityBadge_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/RarityBadge.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var RarityBadge_default = Object.assign(RarityBadge_vue_vue_type_script_setup_true_lang_default, { __name: "RarityBadge" });

export { RarityBadge_default as R };
//# sourceMappingURL=RarityBadge-BGlq658Y.mjs.map
