import { defineComponent, computed, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderStyle, ssrRenderSlot } from 'vue/server-renderer';

//#region app/assets/images/banners/event-galactic-event.webp
var event_galactic_event_default = "" + __buildAssetsURL("event-galactic-event.C6k3B5Zj.webp");
//#endregion
//#region app/assets/images/banners/event-new-droid.webp
var event_new_droid_default = "" + __buildAssetsURL("event-new-droid.C3LAkvsu.webp");
//#endregion
//#region app/assets/images/banners/event-nova-special.webp
var event_nova_special_default = "" + __buildAssetsURL("event-nova-special.Bqe1HrqK.webp");
//#endregion
//#region app/assets/images/banners/event-xp-weekend.webp
var event_xp_weekend_default = "" + __buildAssetsURL("event-xp-weekend.Ce4X03c6.webp");
//#endregion
//#region app/assets/images/banners/hero-droids-desktop.webp
var hero_droids_desktop_default = "" + __buildAssetsURL("hero-droids-desktop.DBKw3c6-.webp");
//#endregion
//#region app/assets/images/banners/hero-droids-mobile.webp
var hero_droids_mobile_default = "" + __buildAssetsURL("hero-droids-mobile.BO7uZNbe.webp");
//#endregion
//#region app/assets/images/banners/hero-droids-tablet.webp
var hero_droids_tablet_default = "" + __buildAssetsURL("hero-droids-tablet.CMOUeKUo.webp");
//#endregion
//#region app/components/PageBanner.vue?vue&type=script&setup=true&lang.ts
var FALLBACK = "hero-droids";
/**
* Cherche l'image de la page, puis retombe sur la bannière commune. Ce repli permet de
* changer d'ambiance page par page en déposant simplement un fichier au bon nom, sans
* toucher au code.
*/
var PageBanner_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "PageBanner",
	__ssrInlineRender: true,
	props: {
		name: {},
		minHeight: { default: "13rem" }
	},
	setup(__props) {
		/**
		* Bannière d'en-tête de page.
		*
		* Le pack fournit une image par page et par palier de largeur, avec des cadrages
		* différents — le mobile est en portrait (720×960), le desktop en bandeau très large
		* (1920×480). Ce ne sont donc pas de simples redimensionnements : `srcset` seul ne
		* suffirait pas, il faut `<picture>` et des `media` pour choisir le bon cadrage.
		*
		* Les images sont volontairement sans texte : le titre et le contenu se posent dessus.
		*/
		const props = __props;
		const images = /* #__PURE__ */ Object.assign({
			"/assets/images/banners/event-galactic-event.webp": event_galactic_event_default,
			"/assets/images/banners/event-new-droid.webp": event_new_droid_default,
			"/assets/images/banners/event-nova-special.webp": event_nova_special_default,
			"/assets/images/banners/event-xp-weekend.webp": event_xp_weekend_default,
			"/assets/images/banners/hero-droids-desktop.webp": hero_droids_desktop_default,
			"/assets/images/banners/hero-droids-mobile.webp": hero_droids_mobile_default,
			"/assets/images/banners/hero-droids-tablet.webp": hero_droids_tablet_default
		});
		const src = (bp) => {
			for (const name of [props.name, FALLBACK]) {
				const key = Object.keys(images).find((k) => k.endsWith(`/${name}-${bp}.webp`));
				if (key) return images[key];
			}
		};
		const desktop = computed(() => src("desktop"));
		const tablet = computed(() => src("tablet"));
		const mobile = computed(() => src("mobile"));
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<section${ssrRenderAttrs(mergeProps({
				class: "panel relative isolate overflow-hidden",
				style: { minHeight: __props.minHeight }
			}, _attrs))}>`);
			if (unref(desktop)) {
				_push(`<picture class="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">`);
				if (unref(mobile)) _push(`<source${ssrRenderAttr("srcset", unref(mobile))} media="(max-width: 720px)">`);
				else _push(`<!---->`);
				if (unref(tablet)) _push(`<source${ssrRenderAttr("srcset", unref(tablet))} media="(max-width: 1200px)">`);
				else _push(`<!---->`);
				_push(`<img${ssrRenderAttr("src", unref(desktop))} alt="" class="size-full object-cover object-center"></picture>`);
			} else _push(`<!---->`);
			if (unref(desktop)) _push(`<div class="pointer-events-none absolute inset-0 -z-10" style="${ssrRenderStyle({ "background": "linear-gradient(90deg, rgb(4 13 27 / 0.94) 0%, rgb(4 13 27 / 0.78) 45%, rgb(4 13 27 / 0.30) 100%)" })}" aria-hidden="true"></div>`);
			else _push(`<!---->`);
			_push(`<div class="relative flex h-full flex-col justify-center gap-4 p-6 lg:p-8">`);
			ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
			_push(`</div></section>`);
		};
	}
});
//#endregion
//#region app/components/PageBanner.vue
var _sfc_setup = PageBanner_vue_vue_type_script_setup_true_lang_default.setup;
PageBanner_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/PageBanner.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var PageBanner_default = Object.assign(PageBanner_vue_vue_type_script_setup_true_lang_default, { __name: "PageBanner" });

export { PageBanner_default as P };
//# sourceMappingURL=PageBanner-B_1qgWUv.mjs.map
