import { b as useLocalePath, N as NuxtLink } from '../virtual/entry.mjs';
import { D as DxIcon_default } from './DxIcon-70RsSwuM.mjs';
import { u as useCollectionStore } from './collection-CMF38Hwi.mjs';
import { D as DroidImage_default } from './DroidImage-cGvQPK3j.mjs';
import { defineComponent, computed, useTemplateRef, ref, mergeProps, unref, withCtx, createTextVNode, toDisplayString, createVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderList, ssrRenderComponent, ssrIncludeBooleanAttr, ssrRenderAttr, ssrRenderClass } from 'vue/server-renderer';

//#region app/components/IconicCard.vue?vue&type=script&setup=true&lang.ts
/**
* Carte d'un droid Emblématique. Partagée entre le panneau latéral (grands écrans) et
* la bande horizontale qui le remplace en dessous — même rendu, deux emplacements.
*/
var IconicCard_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "IconicCard",
	__ssrInlineRender: true,
	props: { droid: {} },
	setup(__props) {
		const localePath = useLocalePath();
		return (_ctx, _push, _parent, _attrs) => {
			const _component_NuxtLink = NuxtLink;
			const _component_DroidImage = DroidImage_default;
			_push(ssrRenderComponent(_component_NuxtLink, mergeProps({
				to: unref(localePath)(`/droids/${__props.droid.slug}`),
				class: "flex shrink-0 flex-col items-center gap-1.5 rounded-card p-4 text-center transition-transform hover:scale-[1.02]"
			}, _attrs), {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(ssrRenderComponent(_component_DroidImage, {
							droid: __props.droid,
							tier: "DEFAULT",
							size: "md"
						}, null, _parent, _scopeId));
						_push(`<p class="mt-1 font-bold"${_scopeId}>${ssrInterpolate(__props.droid.name)}</p><span class="rounded bg-accent-soft/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-accent-soft"${_scopeId}>${ssrInterpolate(_ctx.$t("rarity.iconic"))}</span><p class="text-xs text-ink-muted"${_scopeId}>${ssrInterpolate(_ctx.$t(`type.${__props.droid.type}`))}</p><p class="mt-1 text-2xl font-bold text-accent-soft"${_scopeId}>${ssrInterpolate(__props.droid.percentValue ?? "?")} %</p><p class="-mt-1 text-xs text-ink-muted"${_scopeId}>${ssrInterpolate(_ctx.$t("iconic.ofTotalIncome"))}</p>`);
					} else return [
						createVNode(_component_DroidImage, {
							droid: __props.droid,
							tier: "DEFAULT",
							size: "md"
						}, null, 8, ["droid"]),
						createVNode("p", { class: "mt-1 font-bold" }, toDisplayString(__props.droid.name), 1),
						createVNode("span", { class: "rounded bg-accent-soft/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-accent-soft" }, toDisplayString(_ctx.$t("rarity.iconic")), 1),
						createVNode("p", { class: "text-xs text-ink-muted" }, toDisplayString(_ctx.$t(`type.${__props.droid.type}`)), 1),
						createVNode("p", { class: "mt-1 text-2xl font-bold text-accent-soft" }, toDisplayString(__props.droid.percentValue ?? "?") + " %", 1),
						createVNode("p", { class: "-mt-1 text-xs text-ink-muted" }, toDisplayString(_ctx.$t("iconic.ofTotalIncome")), 1)
					];
				}),
				_: 1
			}, _parent));
		};
	}
});
//#endregion
//#region app/components/IconicCard.vue
var _sfc_setup$1 = IconicCard_vue_vue_type_script_setup_true_lang_default.setup;
IconicCard_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/IconicCard.vue");
	return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
var IconicCard_default = Object.assign(IconicCard_vue_vue_type_script_setup_true_lang_default, { __name: "IconicCard" });
//#endregion
//#region app/assets/images/backgrounds/sidebar-right.webp
var sidebar_right_default = "" + __buildAssetsURL("sidebar-right.DzKuIQuT.webp");
//#endregion
//#region app/components/IconicPanel.vue?vue&type=script&setup=true&lang.ts
var IconicPanel_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "IconicPanel",
	__ssrInlineRender: true,
	props: { variant: { default: "sidebar" } },
	setup(__props) {
		/**
		* Les droids Emblématiques, sous deux formes selon la place disponible :
		*
		* - `sidebar` : colonne de droite, à partir de `2xl`.
		* - `strip` : bande horizontale défilante, utilisée en dessous de `2xl` pour que le
		*   contenu ne disparaisse pas purement et simplement sur les écrans plus étroits.
		*
		* Ils méritent un emplacement à part parce qu'ils ne se comparent pas au reste : revenu
		* exprimé en pourcentage du total, palier unique, obtention par événement.
		*/
		const props = __props;
		const store = useCollectionStore();
		const localePath = useLocalePath();
		const iconics = computed(() => store.droids.filter((d) => d.rarity === "iconic"));
		/** Les plus rentables d'abord. La colonne en montre 4, la bande les montre tous. */
		const sorted = computed(() => [...iconics.value].sort((a, b) => (b.percentValue ?? 0) - (a.percentValue ?? 0)));
		const shown = computed(() => props.variant === "sidebar" ? sorted.value.slice(0, 4) : sorted.value);
		useTemplateRef("rail");
		const index = ref(0);
		/**
		* Le rail déborde-t-il assez pour mériter des commandes ?
		*
		* En dessous d'une carte de débordement, les flèches et les pastilles ne servent à rien
		* et forment du bruit : tout est déjà visible. On les masque alors.
		*/
		const debordement = ref(0);
		computed(() => debordement.value > 40);
		const peutReculer = computed(() => index.value > 0);
		const peutAvancer = computed(() => index.value < shown.value.length - 1);
		return (_ctx, _push, _parent, _attrs) => {
			const _component_IconicCard = IconicCard_default;
			const _component_NuxtLink = NuxtLink;
			const _component_DxIcon = DxIcon_default;
			if (__props.variant === "sidebar") {
				_push(`<aside${ssrRenderAttrs(mergeProps({
					class: "sticky top-0 hidden h-dvh w-72 shrink-0 flex-col gap-3 overflow-hidden border-l border-edge bg-panel bg-cover bg-center px-4 py-5 2xl:flex",
					style: { backgroundImage: `linear-gradient(rgb(7 16 31 / 0.86), rgb(7 16 31 / 0.94)), url(${unref(sidebar_right_default)})` }
				}, _attrs))}><div><h2 class="text-sm font-bold uppercase tracking-wide">${ssrInterpolate(_ctx.$t("iconic.title"))}</h2><p class="text-xs text-ink-muted">${ssrInterpolate(_ctx.$t("iconic.subtitle"))}</p></div><div class="iconic-list flex min-h-0 flex-1 flex-col gap-3"><!--[-->`);
				ssrRenderList(unref(shown), (droid) => {
					_push(ssrRenderComponent(_component_IconicCard, {
						key: droid.slug,
						droid
					}, null, _parent));
				});
				_push(`<!--]--></div>`);
				_push(ssrRenderComponent(_component_NuxtLink, {
					to: unref(localePath)("/?rarity=iconic"),
					class: "dx-button dx-button--secondary dx-button--block shrink-0"
				}, {
					default: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) _push(`${ssrInterpolate(_ctx.$t("iconic.seeAll"))}`);
						else return [createTextVNode(toDisplayString(_ctx.$t("iconic.seeAll")), 1)];
					}),
					_: 1
				}, _parent));
				_push(`</aside>`);
			} else {
				_push(`<section${ssrRenderAttrs(mergeProps({ class: "flex flex-col gap-2 2xl:hidden" }, _attrs))}><div class="flex items-baseline justify-between gap-3"><div><h2 class="text-sm font-bold uppercase tracking-wide">${ssrInterpolate(_ctx.$t("iconic.title"))}</h2><p class="text-xs text-ink-muted">${ssrInterpolate(_ctx.$t("iconic.subtitle"))}</p></div><div class="flex shrink-0 items-center gap-2"><div class="hidden items-center gap-1 sm:flex"><button type="button" class="dx-icon-button size-9 disabled:opacity-30"${ssrIncludeBooleanAttr(!unref(peutReculer)) ? " disabled" : ""}${ssrRenderAttr("aria-label", _ctx.$t("common.previous"))}>`);
				_push(ssrRenderComponent(_component_DxIcon, {
					name: "actions/chevron-left",
					size: 16
				}, null, _parent));
				_push(`</button><button type="button" class="dx-icon-button size-9 disabled:opacity-30"${ssrIncludeBooleanAttr(!unref(peutAvancer)) ? " disabled" : ""}${ssrRenderAttr("aria-label", _ctx.$t("common.next"))}>`);
				_push(ssrRenderComponent(_component_DxIcon, {
					name: "actions/chevron-right",
					size: 16
				}, null, _parent));
				_push(`</button></div>`);
				_push(ssrRenderComponent(_component_NuxtLink, {
					to: unref(localePath)("/?rarity=iconic"),
					class: "text-sm text-accent hover:underline"
				}, {
					default: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) _push(`${ssrInterpolate(_ctx.$t("iconic.seeAll"))}`);
						else return [createTextVNode(toDisplayString(_ctx.$t("iconic.seeAll")), 1)];
					}),
					_: 1
				}, _parent));
				_push(`</div></div><ul class="dx-carousel -mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-smooth px-4 pb-2"><!--[-->`);
				ssrRenderList(unref(shown), (droid) => {
					_push(`<li class="w-40 shrink-0 snap-start sm:w-44">`);
					_push(ssrRenderComponent(_component_IconicCard, {
						droid,
						class: "w-full"
					}, null, _parent));
					_push(`</li>`);
				});
				_push(`<!--]--></ul><div class="flex justify-center gap-1.5"><!--[-->`);
				ssrRenderList(unref(shown), (droid, i) => {
					_push(`<button type="button" class="${ssrRenderClass([i === unref(index) ? "w-5 bg-accent" : "w-1.5 bg-edge-strong hover:bg-ink-muted", "h-1.5 rounded-full transition-all"])}"${ssrRenderAttr("aria-label", droid.name)}${ssrRenderAttr("aria-current", i === unref(index) ? "true" : void 0)}></button>`);
				});
				_push(`<!--]--></div></section>`);
			}
		};
	}
});
//#endregion
//#region app/components/IconicPanel.vue
var _sfc_setup = IconicPanel_vue_vue_type_script_setup_true_lang_default.setup;
IconicPanel_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/IconicPanel.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var IconicPanel_default = Object.assign(IconicPanel_vue_vue_type_script_setup_true_lang_default, { __name: "IconicPanel" });

export { IconicPanel_default as I };
//# sourceMappingURL=IconicPanel-DhM6-3GF.mjs.map
