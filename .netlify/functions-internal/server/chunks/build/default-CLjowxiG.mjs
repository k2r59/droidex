import { u as useRoute$1, b as useLocalePath, N as NuxtLink, a as useI18n, e as useSwitchLocalePath, f as useFetch } from '../virtual/entry.mjs';
import { D as DxIcon_default } from './DxIcon-70RsSwuM.mjs';
import { r as rebirths_default } from './rebirths-CkSxdQ_O.mjs';
import { u as useCollectionStore, g as generatedFrom } from './collection-CMF38Hwi.mjs';
import { a as onClickOutside } from './dist-BxHIjq2A.mjs';
import { u as useAuthSession } from './useAuthSession-AQGXZ6Q7.mjs';
import { f as formatExact } from './format-GC6uCquA.mjs';
import { u as updates_default } from './updates-Dq7D2Nn8.mjs';
import { I as IconicPanel_default } from './IconicPanel-DhM6-3GF.mjs';
import { defineComponent, computed, watch, mergeProps, unref, withCtx, createVNode, toDisplayString, openBlock, createBlock, createCommentVNode, createTextVNode, ref, useTemplateRef, withAsyncContext, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderSlot, ssrRenderList, ssrRenderStyle, ssrRenderAttr, ssrRenderClass } from 'vue/server-renderer';
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
import './DroidImage-cGvQPK3j.mjs';

//#region app/assets/images/planet-rebirth.webp
var planet_rebirth_default = "" + __buildAssetsURL("planet-rebirth.gRP0xozp.webp");
//#endregion
//#region app/components/AppSidebar.vue?vue&type=script&setup=true&lang.ts
/**
* Colonne de gauche : identité, navigation principale, prochaine renaissance et liens
* communautaires. Masquée sous `xl` — la barre d'onglets du bas prend le relais.
*/
var AppSidebar_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "AppSidebar",
	__ssrInlineRender: true,
	setup(__props) {
		const store = useCollectionStore();
		const localePath = useLocalePath();
		const links = [
			{
				to: "/",
				key: "droidex",
				icon: "navigation/droidex"
			},
			{
				to: "/rebirths",
				key: "rebirths",
				icon: "navigation/renaissances"
			},
			{
				to: "/missions",
				key: "missions",
				icon: "navigation/missions"
			},
			{
				to: "/shop",
				key: "shop",
				icon: "navigation/nova-shop"
			},
			{
				to: "/updates",
				key: "updates",
				icon: "ui/notification"
			},
			{
				to: "/guide",
				key: "guide",
				icon: "navigation/guide"
			}
		];
		const nextRebirth = computed(() => Math.min(store.rebirth + 1, rebirths_default.maxRebirth));
		/** Gain de crédits accordé par le prochain palier, en pourcentage. */
		const nextBonus = computed(() => Math.round(rebirths_default.creditMultiplierPerLevel * 100));
		const socials = [
			{
				id: "discord",
				label: "Discord — Droid Tycoon",
				icon: "brands/discord",
				href: "https://discord.gg/droidtycoon",
				tint: "text-[#5865F2]"
			},
			{
				id: "foad",
				label: "X — FOAD",
				icon: "brands/x",
				href: "https://x.com/FoadZone",
				tint: "text-[#1d9bf0]"
			},
			{
				id: "blzn",
				label: "X — Blzn Studios",
				icon: "brands/x",
				href: "https://x.com/BlznDev",
				tint: "text-[#e0245e]"
			},
			{
				id: "island",
				label: "Île Fortnite",
				icon: "actions/external-link",
				href: "https://www.fortnite.com/@foad/7865-8305-9184",
				tint: "text-accent"
			}
		];
		return (_ctx, _push, _parent, _attrs) => {
			const _component_NuxtLink = NuxtLink;
			const _component_DxIcon = DxIcon_default;
			_push(`<aside${ssrRenderAttrs(mergeProps({ class: "sidebar-shell sticky top-0 hidden h-dvh w-60 shrink-0 flex-col gap-5 overflow-hidden border-r border-edge px-4 py-5 xl:flex" }, _attrs))}>`);
			_push(ssrRenderComponent(_component_NuxtLink, {
				to: unref(localePath)("/"),
				class: "flex items-center gap-2.5"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(ssrRenderComponent(_component_DxIcon, {
							name: "brands/droidex-mark",
							size: 30,
							class: "text-accent"
						}, null, _parent, _scopeId));
						_push(`<span class="text-xl font-bold tracking-[0.06em]"${_scopeId}>DROIDEX</span>`);
					} else return [createVNode(_component_DxIcon, {
						name: "brands/droidex-mark",
						size: 30,
						class: "text-accent"
					}), createVNode("span", { class: "text-xl font-bold tracking-[0.06em]" }, "DROIDEX")];
				}),
				_: 1
			}, _parent));
			_push(`<span class="-mt-2 flex items-center gap-1" aria-hidden="true"><span class="h-px flex-1 bg-gradient-to-r from-transparent via-edge to-edge-strong"></span>`);
			_push(ssrRenderComponent(_component_DxIcon, {
				name: "actions/arrow-right",
				size: 11,
				class: "text-edge-strong"
			}, null, _parent));
			_push(`</span><div class="sidebar-nav flex flex-col gap-3"><p class="flex items-center gap-1.5 px-2 pb-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-ink-muted">`);
			_push(ssrRenderComponent(_component_DxIcon, {
				name: "actions/plus",
				size: 9
			}, null, _parent));
			_push(` ${ssrInterpolate(_ctx.$t("nav.collection"))}</p><!--[-->`);
			ssrRenderList(links, (link) => {
				_push(ssrRenderComponent(_component_NuxtLink, {
					key: link.to,
					to: unref(localePath)(link.to),
					class: "side-nav-item",
					"active-class": "nav-active"
				}, {
					default: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) {
							_push(ssrRenderComponent(_component_DxIcon, {
								name: link.icon,
								size: 20
							}, null, _parent, _scopeId));
							_push(`<span class="flex-1"${_scopeId}>${ssrInterpolate(_ctx.$t(`nav.${link.key}`))}</span>`);
							if (link.key === "droidex") _push(`<span class="side-nav-item__count font-mono text-xs tabular-nums"${_scopeId}>${ssrInterpolate(unref(store).ownedCount)} / ${ssrInterpolate(unref(store).totalCount)}</span>`);
							else _push(`<!---->`);
						} else return [
							createVNode(_component_DxIcon, {
								name: link.icon,
								size: 20
							}, null, 8, ["name"]),
							createVNode("span", { class: "flex-1" }, toDisplayString(_ctx.$t(`nav.${link.key}`)), 1),
							link.key === "droidex" ? (openBlock(), createBlock("span", {
								key: 0,
								class: "side-nav-item__count font-mono text-xs tabular-nums"
							}, toDisplayString(unref(store).ownedCount) + " / " + toDisplayString(unref(store).totalCount), 1)) : createCommentVNode("", true)
						];
					}),
					_: 2
				}, _parent));
			});
			_push(`<!--]--></div>`);
			_push(ssrRenderComponent(_component_NuxtLink, {
				to: unref(localePath)("/rebirths"),
				class: "sidebar-rebirth dx-side-panel relative mt-auto flex shrink-0 flex-col items-center overflow-hidden !p-0 text-center"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`<span class="pointer-events-none absolute inset-0 bg-cover bg-center bg-no-repeat" style="${ssrRenderStyle({ backgroundImage: `url(${unref(planet_rebirth_default)})` })}" aria-hidden="true"${_scopeId}></span><span class="pointer-events-none absolute inset-0" style="${ssrRenderStyle({ "background": "linear-gradient(180deg, rgb(7 16 31 / 0.92) 0%, rgb(7 16 31 / 0.30) 30%, rgb(7 16 31 / 0.34) 60%, rgb(7 16 31 / 0.93) 88%)" })}" aria-hidden="true"${_scopeId}></span><span class="relative mt-[8.5%] whitespace-nowrap text-[0.58rem] font-semibold uppercase tracking-[0.1em] text-ink-muted"${_scopeId}>${ssrInterpolate(_ctx.$t("rebirth.next"))}</span><span class="relative mt-[5.4%] text-[1.05rem] font-bold leading-tight"${_scopeId}>${ssrInterpolate(_ctx.$t("rebirth.levelShort", { level: unref(nextRebirth) }))}</span><span class="sidebar-planet flex-1" aria-hidden="true"${_scopeId}></span><span class="relative text-[0.8rem] font-semibold text-accent"${_scopeId}> +${ssrInterpolate(unref(nextBonus))} % ${ssrInterpolate(_ctx.$t("stats.income"))}</span><span class="dx-button dx-button--secondary relative mx-[6%] mb-[4.5%] mt-[3.5%] w-[88%] !min-h-0 py-[0.45rem] text-[0.8rem]"${_scopeId}>${ssrInterpolate(_ctx.$t("common.discover"))}</span>`);
					else return [
						createVNode("span", {
							class: "pointer-events-none absolute inset-0 bg-cover bg-center bg-no-repeat",
							style: { backgroundImage: `url(${unref(planet_rebirth_default)})` },
							"aria-hidden": "true"
						}, null, 4),
						createVNode("span", {
							class: "pointer-events-none absolute inset-0",
							style: { "background": "linear-gradient(180deg, rgb(7 16 31 / 0.92) 0%, rgb(7 16 31 / 0.30) 30%, rgb(7 16 31 / 0.34) 60%, rgb(7 16 31 / 0.93) 88%)" },
							"aria-hidden": "true"
						}),
						createVNode("span", { class: "relative mt-[8.5%] whitespace-nowrap text-[0.58rem] font-semibold uppercase tracking-[0.1em] text-ink-muted" }, toDisplayString(_ctx.$t("rebirth.next")), 1),
						createVNode("span", { class: "relative mt-[5.4%] text-[1.05rem] font-bold leading-tight" }, toDisplayString(_ctx.$t("rebirth.levelShort", { level: unref(nextRebirth) })), 1),
						createVNode("span", {
							class: "sidebar-planet flex-1",
							"aria-hidden": "true"
						}),
						createVNode("span", { class: "relative text-[0.8rem] font-semibold text-accent" }, " +" + toDisplayString(unref(nextBonus)) + " % " + toDisplayString(_ctx.$t("stats.income")), 1),
						createVNode("span", { class: "dx-button dx-button--secondary relative mx-[6%] mb-[4.5%] mt-[3.5%] w-[88%] !min-h-0 py-[0.45rem] text-[0.8rem]" }, toDisplayString(_ctx.$t("common.discover")), 1)
					];
				}),
				_: 1
			}, _parent));
			_push(`<div class="sidebar-social flex shrink-0 flex-col items-center gap-2"><p class="text-xs text-ink-muted">${ssrInterpolate(_ctx.$t("common.joinCommunity"))}</p><div class="flex gap-2"><!--[-->`);
			ssrRenderList(socials, (s) => {
				_push(`<a${ssrRenderAttr("href", s.href)} target="_blank" rel="noopener noreferrer" class="${ssrRenderClass([s.tint, "grid size-8 place-items-center rounded-md opacity-80 transition hover:scale-110 hover:opacity-100"])}"${ssrRenderAttr("title", s.label)}${ssrRenderAttr("aria-label", s.label)}>`);
				_push(ssrRenderComponent(_component_DxIcon, {
					name: s.icon,
					size: 16
				}, null, _parent));
				_push(`</a>`);
			});
			_push(`<!--]--></div></div></aside>`);
		};
	}
});
//#endregion
//#region app/components/AppSidebar.vue
var _sfc_setup$6 = AppSidebar_vue_vue_type_script_setup_true_lang_default.setup;
AppSidebar_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/AppSidebar.vue");
	return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
var AppSidebar_default = Object.assign(AppSidebar_vue_vue_type_script_setup_true_lang_default, { __name: "AppSidebar" });
//#endregion
//#region app/components/LocaleSwitcher.vue?vue&type=script&setup=true&lang.ts
var LocaleSwitcher_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "LocaleSwitcher",
	__ssrInlineRender: true,
	setup(__props) {
		const { locale, locales } = useI18n();
		const switchLocalePath = useSwitchLocalePath();
		const open = ref(false);
		const root = useTemplateRef("root");
		onClickOutside(root, () => {
			open.value = false;
		});
		const current = computed(() => locales.value.find((l) => l.code === locale.value));
		return (_ctx, _push, _parent, _attrs) => {
			const _component_NuxtLink = NuxtLink;
			_push(`<div${ssrRenderAttrs(mergeProps({
				ref_key: "root",
				ref: root,
				class: "relative"
			}, _attrs))}><button type="button" class="rounded-nav border border-edge bg-panel px-3.5 py-2.5 font-display font-semibold text-ink transition-colors hover:border-accent/40"${ssrRenderAttr("aria-label", _ctx.$t("common.language"))}${ssrRenderAttr("aria-expanded", unref(open))}>${ssrInterpolate(unref(current)?.code.toUpperCase())}</button>`);
			if (unref(open)) {
				_push(`<ul class="absolute right-0 z-50 mt-1 min-w-36 overflow-hidden rounded-lg border border-edge bg-panel-raised py-1 shadow-xl"><!--[-->`);
				ssrRenderList(unref(locales), (l) => {
					_push(`<li>`);
					_push(ssrRenderComponent(_component_NuxtLink, {
						to: unref(switchLocalePath)(l.code),
						class: ["block px-3 py-1.5 text-sm transition-colors hover:bg-panel", l.code === unref(locale) && "text-iconic"],
						onClick: ($event) => open.value = false
					}, {
						default: withCtx((_, _push, _parent, _scopeId) => {
							if (_push) _push(`${ssrInterpolate(l.name)}`);
							else return [createTextVNode(toDisplayString(l.name), 1)];
						}),
						_: 2
					}, _parent));
					_push(`</li>`);
				});
				_push(`<!--]--></ul>`);
			} else _push(`<!---->`);
			_push(`</div>`);
		};
	}
});
//#endregion
//#region app/components/LocaleSwitcher.vue
var _sfc_setup$5 = LocaleSwitcher_vue_vue_type_script_setup_true_lang_default.setup;
LocaleSwitcher_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/LocaleSwitcher.vue");
	return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
var LocaleSwitcher_default = Object.assign(LocaleSwitcher_vue_vue_type_script_setup_true_lang_default, { __name: "LocaleSwitcher" });
//#endregion
//#region app/components/AuthMenu.vue?vue&type=script&setup=true&lang.ts
var AuthMenu_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "AuthMenu",
	__ssrInlineRender: true,
	async setup(__props) {
		let __temp, __restore;
		const { user, isPending } = useAuthSession();
		const localePath = useLocalePath();
		const open = ref(false);
		const root = useTemplateRef("root");
		onClickOutside(root, () => {
			open.value = false;
		});
		const { data: providerData } = ([__temp, __restore] = withAsyncContext(() => useFetch("/api/auth-providers", "$k9Wu0rdRlh")), __temp = await __temp, __restore(), __temp);
		const providers = computed(() => providerData.value?.providers ?? []);
		const PROVIDER_CLASS = {
			discord: "bg-[#5865F2] hover:bg-[#4752c4]",
			google: "bg-[#ffffff] text-[#1f1f1f] hover:bg-[#e8e8e8]",
			twitch: "bg-[#9146FF] hover:bg-[#772ce8]"
		};
		return (_ctx, _push, _parent, _attrs) => {
			const _component_NuxtLink = NuxtLink;
			_push(`<div${ssrRenderAttrs(mergeProps({
				ref_key: "root",
				ref: root,
				class: "relative"
			}, _attrs))}>`);
			if (unref(isPending)) _push(`<div class="size-8 animate-pulse rounded-full bg-panel"></div>`);
			else if (unref(user)) {
				_push(`<button type="button" class="grid size-8 place-items-center overflow-hidden rounded-full bg-panel-raised text-sm font-semibold"${ssrRenderAttr("aria-expanded", unref(open))}>`);
				if (unref(user).image) _push(`<img${ssrRenderAttr("src", unref(user).image)}${ssrRenderAttr("alt", unref(user).name ?? "")} class="size-full object-cover" referrerpolicy="no-referrer">`);
				else _push(`<span>${ssrInterpolate((unref(user).name ?? "?").slice(0, 1).toUpperCase())}</span>`);
				_push(`</button>`);
			} else _push(`<button type="button" class="dx-button dx-button--blue">${ssrInterpolate(_ctx.$t("auth.signIn"))}</button>`);
			if (unref(open)) {
				_push(`<div class="absolute right-0 z-50 mt-1 w-60 overflow-hidden rounded-card border border-edge bg-panel-raised shadow-xl">`);
				if (unref(user)) {
					_push(`<!--[--><div class="border-b border-edge px-3 py-2"><p class="truncate text-sm font-medium">${ssrInterpolate(unref(user).name)}</p><p class="truncate text-xs text-ink-muted">${ssrInterpolate(unref(user).email)}</p></div>`);
					_push(ssrRenderComponent(_component_NuxtLink, {
						to: unref(localePath)("/profile"),
						class: "block px-3 py-2 text-sm transition-colors hover:bg-panel",
						onClick: ($event) => open.value = false
					}, {
						default: withCtx((_, _push, _parent, _scopeId) => {
							if (_push) _push(`${ssrInterpolate(_ctx.$t("nav.profile"))}`);
							else return [createTextVNode(toDisplayString(_ctx.$t("nav.profile")), 1)];
						}),
						_: 1
					}, _parent));
					_push(`<button type="button" class="w-full px-3 py-2 text-left text-sm text-red-400 transition-colors hover:bg-panel">${ssrInterpolate(_ctx.$t("auth.signOut"))}</button><!--]-->`);
				} else {
					_push(`<!--[--><p class="border-b border-edge px-3 py-2 text-xs text-ink-muted">${ssrInterpolate(unref(providers).length ? _ctx.$t("auth.signInBenefit") : _ctx.$t("auth.noProvider"))}</p>`);
					if (unref(providers).length) {
						_push(`<div class="flex flex-col gap-1.5 p-2"><!--[-->`);
						ssrRenderList(unref(providers), (p) => {
							_push(`<button type="button" class="${ssrRenderClass([PROVIDER_CLASS[p], "rounded-lg px-3 py-2 text-sm font-medium text-white transition-colors"])}">${ssrInterpolate(_ctx.$t("auth.signInWith", { provider: _ctx.$t(`auth.provider.${p}`) }))}</button>`);
						});
						_push(`<!--]--></div>`);
					} else _push(`<!---->`);
					_push(`<!--]-->`);
				}
				_push(`</div>`);
			} else _push(`<!---->`);
			_push(`</div>`);
		};
	}
});
//#endregion
//#region app/components/AuthMenu.vue
var _sfc_setup$4 = AuthMenu_vue_vue_type_script_setup_true_lang_default.setup;
AuthMenu_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/AuthMenu.vue");
	return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
var AuthMenu_default = Object.assign(AuthMenu_vue_vue_type_script_setup_true_lang_default, { __name: "AuthMenu" });
//#endregion
//#region app/assets/images/droidex-mark.svg
var droidex_mark_default = "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%2064%2064'%20fill='none'%20%3e%3cdefs%3e%3clinearGradient%20id='g'%20x1='10'%20y1='8'%20x2='54'%20y2='56'%3e%3cstop%20stop-color='%2325D7FF'/%3e%3cstop%20offset='1'%20stop-color='%23459BFF'/%3e%3c/linearGradient%3e%3cfilter%20id='glow'%3e%3cfeGaussianBlur%20stdDeviation='2.2'%20result='b'/%3e%3cfeMerge%3e%3cfeMergeNode%20in='b'/%3e%3cfeMergeNode%20in='SourceGraphic'/%3e%3c/feMerge%3e%3c/filter%3e%3c/defs%3e%3cpath%20d='M32%205%2055%2018v28L32%2059%209%2046V18L32%205Z'%20stroke='url(%23g)'%20stroke-width='4'%20filter='url(%23glow)'/%3e%3ccircle%20cx='32'%20cy='32'%20r='8'%20stroke='%23fff'%20stroke-width='3'/%3e%3cpath%20d='M32%2014v10M32%2040v10M14%2032h10M40%2032h10'%20stroke='%2325D7FF'%20stroke-width='3'%20stroke-linecap='round'/%3e%3c/svg%3e";
//#endregion
//#region app/components/AppHeader.vue?vue&type=script&setup=true&lang.ts
var AppHeader_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "AppHeader",
	__ssrInlineRender: true,
	setup(__props) {
		const localePath = useLocalePath();
		const store = useCollectionStore();
		const { locale } = useI18n();
		const route = useRoute$1();
		const links = [
			{
				to: "/",
				key: "droidex"
			},
			{
				to: "/rebirths",
				key: "rebirths"
			},
			{
				to: "/missions",
				key: "missions"
			},
			{
				to: "/shop",
				key: "shop"
			},
			{
				to: "/updates",
				key: "updates"
			},
			{
				to: "/guide",
				key: "guide"
			}
		];
		/**
		* `NuxtLink` n'expose pas son état actif au contenu du slot ; on le recalcule donc
		* ici. L'accueil demande une comparaison exacte, sinon toutes les routes en
		* découleraient comme actives.
		*/
		function isActive(to) {
			const target = localePath(to);
			return to === "/" ? route.path === target : route.path.startsWith(target);
		}
		const completion = computed(() => store.totalCount ? Math.round(store.ownedCount / store.totalCount * 100) : 0);
		return (_ctx, _push, _parent, _attrs) => {
			const _component_NuxtLink = NuxtLink;
			const _component_DxIcon = DxIcon_default;
			const _component_LocaleSwitcher = LocaleSwitcher_default;
			const _component_AuthMenu = AuthMenu_default;
			_push(`<header${ssrRenderAttrs(mergeProps({ class: "sticky top-0 z-50 border-b border-edge bg-void/85 backdrop-blur" }, _attrs))}><div class="flex h-[68px] items-center gap-3 px-4">`);
			_push(ssrRenderComponent(_component_NuxtLink, {
				to: unref(localePath)("/"),
				class: "flex items-center gap-2 font-bold tracking-tight xl:hidden"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`<img${ssrRenderAttr("src", unref(droidex_mark_default))} alt="" class="size-8"${_scopeId}><span class="hidden sm:inline"${_scopeId}>DROIDEX</span>`);
					else return [createVNode("img", {
						src: unref(droidex_mark_default),
						alt: "",
						class: "size-8"
					}, null, 8, ["src"]), createVNode("span", { class: "hidden sm:inline" }, "DROIDEX")];
				}),
				_: 1
			}, _parent));
			_push(`<nav class="hidden h-full min-w-0 items-stretch gap-1 overflow-x-auto md:flex"><!--[-->`);
			ssrRenderList(links, (link) => {
				_push(ssrRenderComponent(_component_NuxtLink, {
					key: link.to,
					to: unref(localePath)(link.to),
					class: "nav-link",
					"active-class": "nav-link--active"
				}, {
					default: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) {
							_push(`<span class="nav-link__pill"${_scopeId}>`);
							if (isActive(link.to)) {
								_push(`<span class="nav-link__badge"${_scopeId}>`);
								_push(ssrRenderComponent(_component_DxIcon, {
									name: "brands/droidex-mark",
									size: 14
								}, null, _parent, _scopeId));
								_push(`</span>`);
							} else _push(`<!---->`);
							_push(` ${ssrInterpolate(_ctx.$t(`nav.${link.key}`))}</span>`);
						} else return [createVNode("span", { class: "nav-link__pill" }, [isActive(link.to) ? (openBlock(), createBlock("span", {
							key: 0,
							class: "nav-link__badge"
						}, [createVNode(_component_DxIcon, {
							name: "brands/droidex-mark",
							size: 14
						})])) : createCommentVNode("", true), createTextVNode(" " + toDisplayString(_ctx.$t(`nav.${link.key}`)), 1)])];
					}),
					_: 2
				}, _parent));
			});
			_push(`<!--]--></nav><div class="ml-auto flex shrink-0 items-center gap-2">`);
			_push(ssrRenderComponent(_component_NuxtLink, {
				to: unref(localePath)("/shop"),
				class: "hidden items-center gap-2.5 rounded-nav border border-edge bg-panel px-3.5 py-2.5 transition-colors hover:border-nova/50 sm:flex",
				title: _ctx.$t("shop.balance")
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(ssrRenderComponent(_component_DxIcon, {
							name: "resources/nova-crystal",
							size: 18,
							class: "text-nova"
						}, null, _parent, _scopeId));
						_push(`<span class="font-mono tabular-nums"${_scopeId}>${ssrInterpolate(("formatExact" in _ctx ? _ctx.formatExact : unref(formatExact))(unref(store).novaCrystals, unref(locale)))}</span>`);
					} else return [createVNode(_component_DxIcon, {
						name: "resources/nova-crystal",
						size: 18,
						class: "text-nova"
					}), createVNode("span", { class: "font-mono tabular-nums" }, toDisplayString(("formatExact" in _ctx ? _ctx.formatExact : unref(formatExact))(unref(store).novaCrystals, unref(locale))), 1)];
				}),
				_: 1
			}, _parent));
			_push(`<div class="hidden items-center gap-2.5 rounded-nav border border-edge bg-panel px-3.5 py-2.5 sm:flex"${ssrRenderAttr("title", _ctx.$t("stats.completion", { percent: unref(completion) }))}><span class="font-mono tabular-nums">${ssrInterpolate(unref(store).ownedCount)} / ${ssrInterpolate(unref(store).totalCount)}</span><span class="dx-progress w-16" role="progressbar"${ssrRenderAttr("aria-valuenow", unref(completion))} aria-valuemin="0" aria-valuemax="100"><span style="${ssrRenderStyle({ "--value": `${unref(completion)}%` })}"></span></span></div>`);
			if (unref(store).syncing) _push(`<span class="text-xs text-ink-muted">${ssrInterpolate(_ctx.$t("common.syncing"))}</span>`);
			else _push(`<!---->`);
			_push(ssrRenderComponent(_component_LocaleSwitcher, null, null, _parent));
			_push(ssrRenderComponent(_component_AuthMenu, null, null, _parent));
			_push(`</div></div></header>`);
		};
	}
});
//#endregion
//#region app/components/AppHeader.vue
var _sfc_setup$3 = AppHeader_vue_vue_type_script_setup_true_lang_default.setup;
AppHeader_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/AppHeader.vue");
	return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
var AppHeader_default = Object.assign(AppHeader_vue_vue_type_script_setup_true_lang_default, { __name: "AppHeader" });
//#endregion
//#region app/components/AppFooter.vue?vue&type=script&setup=true&lang.ts
var ISLAND_CODE = "7865-8305-9184";
/**
* Version courante de l'île : la plus récente des notes de version qui en porte une.
* On la dérive du fil des nouveautés plutôt que de la saisir en dur, pour qu'elle ne
* puisse pas diverger de ce que la page Nouveautés annonce.
*/
var AppFooter_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "AppFooter",
	__ssrInlineRender: true,
	setup(__props) {
		/**
		* Imports nommés, et non l'objet entier : `import droidData from '…/droids.json'`
		* embarquait les 126 Ko du dataset dans le bundle de **chaque** page pour n'en afficher
		* qu'une chaîne. Vite sait éliminer le reste quand on ne demande que le champ utile.
		*/
		const islandVersion = computed(() => {
			return updates_default.entries.filter((e) => "version" in e && e.version).sort((a, b) => b.date.localeCompare(a.date))[0]?.version ?? null;
		});
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<footer${ssrRenderAttrs(mergeProps({ class: "mt-12 border-t border-edge-soft px-4 py-8 text-sm text-ink-muted" }, _attrs))}><div class="mx-auto flex max-w-7xl flex-col gap-3"><p class="font-medium text-ink">${ssrInterpolate(_ctx.$t("disclaimer.title"))}</p><p>${ssrInterpolate(_ctx.$t("disclaimer.community"))}</p><p class="text-xs">${ssrInterpolate(_ctx.$t("disclaimer.rights"))}</p><p class="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs"><span>${ssrInterpolate(_ctx.$t("app.islandCode", { code: ISLAND_CODE }))}</span>`);
			if (unref(islandVersion)) _push(`<span aria-hidden="true">·</span>`);
			else _push(`<!---->`);
			if (unref(islandVersion)) _push(`<span class="rounded-md border border-edge-soft bg-panel px-2 py-0.5 font-mono text-accent">${ssrInterpolate(_ctx.$t("app.islandVersion", { version: unref(islandVersion) }))}</span>`);
			else _push(`<!---->`);
			_push(`<span aria-hidden="true">·</span><span class="font-mono">${ssrInterpolate(unref(generatedFrom))}</span></p></div></footer>`);
		};
	}
});
//#endregion
//#region app/components/AppFooter.vue
var _sfc_setup$2 = AppFooter_vue_vue_type_script_setup_true_lang_default.setup;
AppFooter_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/AppFooter.vue");
	return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
var AppFooter_default = Object.assign(AppFooter_vue_vue_type_script_setup_true_lang_default, { __name: "AppFooter" });
//#endregion
//#region app/components/MobileNav.vue?vue&type=script&setup=true&lang.ts
var MobileNav_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "MobileNav",
	__ssrInlineRender: true,
	setup(__props) {
		const localePath = useLocalePath();
		/**
		* Barre d'onglets fixe en bas sur mobile. La disposition et les cibles tactiles (44 px)
		* sont calquées sur une navigation native — c'est le socle du futur portage mobile.
		*/
		const links = [
			{
				to: "/",
				key: "droidex",
				icon: "navigation/droidex"
			},
			{
				to: "/rebirths",
				key: "rebirths",
				icon: "navigation/renaissances"
			},
			{
				to: "/missions",
				key: "missions",
				icon: "navigation/missions"
			},
			{
				to: "/shop",
				key: "shop",
				icon: "navigation/nova-shop"
			},
			{
				to: "/updates",
				key: "updates",
				icon: "ui/notification"
			},
			{
				to: "/guide",
				key: "guide",
				icon: "navigation/guide"
			}
		];
		return (_ctx, _push, _parent, _attrs) => {
			const _component_NuxtLink = NuxtLink;
			const _component_DxIcon = DxIcon_default;
			_push(`<nav${ssrRenderAttrs(mergeProps({ class: "fixed inset-x-0 bottom-0 z-50 border-t border-edge bg-void/95 pb-[env(safe-area-inset-bottom)] backdrop-blur md:hidden" }, _attrs))}><ul class="flex"><!--[-->`);
			ssrRenderList(links, (link) => {
				_push(`<li class="flex-1">`);
				_push(ssrRenderComponent(_component_NuxtLink, {
					to: unref(localePath)(link.to),
					class: "flex min-h-11 flex-col items-center justify-center gap-0.5 py-2 text-ink-muted transition-colors",
					"active-class": "!text-iconic"
				}, {
					default: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) {
							_push(ssrRenderComponent(_component_DxIcon, {
								name: link.icon,
								size: 20
							}, null, _parent, _scopeId));
							_push(`<span class="text-[10px] font-medium"${_scopeId}>${ssrInterpolate(_ctx.$t(`nav.${link.key}`))}</span>`);
						} else return [createVNode(_component_DxIcon, {
							name: link.icon,
							size: 20
						}, null, 8, ["name"]), createVNode("span", { class: "text-[10px] font-medium" }, toDisplayString(_ctx.$t(`nav.${link.key}`)), 1)];
					}),
					_: 2
				}, _parent));
				_push(`</li>`);
			});
			_push(`<!--]--></ul></nav>`);
		};
	}
});
//#endregion
//#region app/components/MobileNav.vue
var _sfc_setup$1 = MobileNav_vue_vue_type_script_setup_true_lang_default.setup;
MobileNav_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/MobileNav.vue");
	return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
var MobileNav_default = Object.assign(MobileNav_vue_vue_type_script_setup_true_lang_default, { __name: "MobileNav" });
//#endregion
//#region app/layouts/default.vue?vue&type=script&setup=true&lang.ts
var default_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "default",
	__ssrInlineRender: true,
	setup(__props) {
		const store = useCollectionStore();
		const { user } = useAuthSession();
		const route = useRoute$1();
		const showIconicRail = computed(() => /^index(___[a-z]{2})?$/.test(String(route.name ?? "")));
		watch(() => user.value?.id, (id) => {
			if (id) store.enableRemote();
			else store.disableRemote();
		});
		return (_ctx, _push, _parent, _attrs) => {
			const _component_AppSidebar = AppSidebar_default;
			const _component_AppHeader = AppHeader_default;
			const _component_AppFooter = AppFooter_default;
			const _component_IconicPanel = IconicPanel_default;
			const _component_MobileNav = MobileNav_default;
			_push(`<div${ssrRenderAttrs(mergeProps({ class: "flex min-h-dvh items-start bg-void text-ink" }, _attrs))}>`);
			_push(ssrRenderComponent(_component_AppSidebar, null, null, _parent));
			_push(`<div class="flex min-w-0 flex-1 flex-col">`);
			_push(ssrRenderComponent(_component_AppHeader, null, null, _parent));
			if (unref(store).syncError) _push(`<p class="sticky top-0 z-40 bg-warn/15 px-4 py-2 text-center text-sm text-warn" role="status">${ssrInterpolate(_ctx.$t("common.syncFailed"))} <button class="ml-2 underline">${ssrInterpolate(_ctx.$t("common.retry"))}</button></p>`);
			else _push(`<!---->`);
			_push(`<main class="@container mx-auto w-full max-w-[1440px] flex-1 px-3 py-4 pb-24 sm:px-4 sm:py-5 md:pb-6">`);
			ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
			_push(`</main>`);
			_push(ssrRenderComponent(_component_AppFooter, null, null, _parent));
			_push(`</div>`);
			if (unref(showIconicRail)) _push(ssrRenderComponent(_component_IconicPanel, null, null, _parent));
			else _push(`<!---->`);
			_push(ssrRenderComponent(_component_MobileNav, null, null, _parent));
			_push(`</div>`);
		};
	}
});
//#endregion
//#region app/layouts/default.vue
var _sfc_setup = default_vue_vue_type_script_setup_true_lang_default.setup;
default_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/default.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var default_default = default_vue_vue_type_script_setup_true_lang_default;

export { default_default as default };
//# sourceMappingURL=default-CLjowxiG.mjs.map
