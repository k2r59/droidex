import { g as useRuntimeConfig } from '../virtual/entry.mjs';
import { defineComponent, computed, ref, watch, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderClass, ssrInterpolate } from 'vue/server-renderer';

//#region app/components/DroidImage.vue?vue&type=script&setup=true&lang.ts
var DroidImage_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "DroidImage",
	__ssrInlineRender: true,
	props: {
		droid: {},
		tier: {},
		size: { default: "md" },
		dimmed: {
			type: Boolean,
			default: false
		},
		noStarfield: { type: Boolean }
	},
	setup(__props) {
		const props = __props;
		const config = useRuntimeConfig();
		const stats = computed(() => props.droid.tiers[props.tier]);
		const src = computed(() => {
			const file = stats.value?.image;
			return file ? `${config.public.droidImageBase}/${file}` : null;
		});
		/** Le palier Galactique réutilise le visuel Beskar faute d'asset publié. */
		const isFallback = computed(() => stats.value?.imageIsFallback ?? false);
		const sizeClass = computed(() => ({
			sm: "size-12",
			md: "size-20",
			lg: "size-36"
		})[props.size]);
		/**
		* Le ciel est masqué en `sm` : sous 48 px, les étoiles se lisent comme du bruit et
		* brouillent la silhouette du droid.
		*/
		const showStarfield = computed(() => !props.noStarfield && props.size !== "sm");
		/** Classes littérales : une classe construite à la volée ne serait pas générée. */
		const NEBULA = {
			DEFAULT: "nebula-default",
			GOLD: "nebula-gold",
			DIAMOND: "nebula-diamond",
			RAINBOW: "nebula-rainbow",
			BESKAR: "nebula-beskar",
			GALACTIC: "nebula-galactic"
		};
		const failed = ref(false);
		watch(src, () => {
			failed.value = false;
		});
		/** Le ciel n'apparaît que derrière une illustration réellement chargée. */
		const containerClass = computed(() => {
			const classes = [sizeClass.value];
			if (props.dimmed) classes.push("opacity-35", "grayscale");
			if (showStarfield.value && src.value && !failed.value) classes.push("droid-starfield", NEBULA[props.tier]);
			return classes;
		});
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<div${ssrRenderAttrs(mergeProps({ class: ["relative shrink-0 grid place-items-center overflow-hidden rounded-lg transition-opacity", unref(containerClass)] }, _attrs))}>`);
			if (unref(src) && !unref(failed)) _push(`<img${ssrRenderAttr("src", unref(src))}${ssrRenderAttr("alt", `${__props.droid.name} — ${_ctx.$t(`tier.${__props.tier}`)}`)} class="relative size-full object-contain" loading="lazy" decoding="async">`);
			else _push(`<div class="${ssrRenderClass([__props.size === "sm" ? "text-sm" : "text-xl", "size-full grid place-items-center rounded-lg bg-panel-raised border border-edge text-ink-muted font-bold"])}"${ssrRenderAttr("title", _ctx.$t("droid.noData"))}>${ssrInterpolate(__props.droid.name.slice(0, 2))}</div>`);
			if (unref(isFallback) && !unref(failed) && unref(src)) _push(`<span class="absolute bottom-0.5 right-0.5 size-2 rounded-full bg-tier-galactic ring-1 ring-void"${ssrRenderAttr("title", _ctx.$t("droid.imageFallback"))}></span>`);
			else _push(`<!---->`);
			_push(`</div>`);
		};
	}
});
//#endregion
//#region app/components/DroidImage.vue
var _sfc_setup = DroidImage_vue_vue_type_script_setup_true_lang_default.setup;
DroidImage_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/DroidImage.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var DroidImage_default = Object.assign(DroidImage_vue_vue_type_script_setup_true_lang_default, { __name: "DroidImage" });

export { DroidImage_default as D };
//# sourceMappingURL=DroidImage-cGvQPK3j.mjs.map
