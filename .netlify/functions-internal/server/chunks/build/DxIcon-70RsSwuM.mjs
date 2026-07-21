import process from 'node:process';globalThis._importMeta_=globalThis._importMeta_||{url:"file:///_entry.js",env:process.env};import { defineComponent, computed, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs } from 'vue/server-renderer';

//#region app/assets/icons/actions/arrow-down.svg?raw
var arrow_down_default = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"m5 10 7 7 7-7\"/><path d=\"M12 3v14\"/></svg>\n";
//#endregion
//#region app/assets/icons/actions/arrow-left.svg?raw
var arrow_left_default = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"m14 5-7 7 7 7\"/><path d=\"M7 12h14\"/></svg>\n";
//#endregion
//#region app/assets/icons/actions/arrow-right.svg?raw
var arrow_right_default = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"m10 5 7 7-7 7\"/><path d=\"M3 12h14\"/></svg>\n";
//#endregion
//#region app/assets/icons/actions/arrow-up.svg?raw
var arrow_up_default = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"m5 14 7-7 7 7\"/><path d=\"M12 7v14\"/></svg>\n";
//#endregion
//#region app/assets/icons/actions/check.svg?raw
var check_default = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"m4 12 5 5L20 6\"/></svg>\n";
//#endregion
//#region app/assets/icons/actions/chevron-down.svg?raw
var chevron_down_default = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"m5 9 7 7 7-7\"/></svg>\n";
//#endregion
//#region app/assets/icons/actions/chevron-left.svg?raw
var chevron_left_default = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"m15 5-7 7 7 7\"/></svg>\n";
//#endregion
//#region app/assets/icons/actions/chevron-right.svg?raw
var chevron_right_default = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"m9 5 7 7-7 7\"/></svg>\n";
//#endregion
//#region app/assets/icons/actions/chevron-up.svg?raw
var chevron_up_default = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"m5 15 7-7 7 7\"/></svg>\n";
//#endregion
//#region app/assets/icons/actions/close.svg?raw
var close_default = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"m5 5 14 14M19 5 5 19\"/></svg>\n";
//#endregion
//#region app/assets/icons/actions/copy.svg?raw
var copy_default = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><rect x=\"8\" y=\"8\" width=\"12\" height=\"12\" rx=\"2\"/><path d=\"M16 8V4H4v12h4\"/></svg>\n";
//#endregion
//#region app/assets/icons/actions/download.svg?raw
var download_default = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"M12 3v12M7 10l5 5 5-5\"/><path d=\"M4 21h16\"/></svg>\n";
//#endregion
//#region app/assets/icons/actions/edit.svg?raw
var edit_default = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"M4 20h4L20 8l-4-4L4 16z\"/><path d=\"m13 7 4 4\"/></svg>\n";
//#endregion
//#region app/assets/icons/actions/external-link.svg?raw
var external_link_default = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"M13 5h6v6M19 5l-9 9\"/><path d=\"M15 12v7H5V9h7\"/></svg>\n";
//#endregion
//#region app/assets/icons/actions/eye.svg?raw
var eye_default = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z\"/><circle cx=\"12\" cy=\"12\" r=\"3\"/></svg>\n";
//#endregion
//#region app/assets/icons/actions/filter.svg?raw
var filter_default = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"M3 5h18l-7 8v6l-4 2v-8z\"/></svg>\n";
//#endregion
//#region app/assets/icons/actions/heart.svg?raw
var heart_default = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8z\"/></svg>\n";
//#endregion
//#region app/assets/icons/actions/minus.svg?raw
var minus_default = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"M5 12h14\"/></svg>\n";
//#endregion
//#region app/assets/icons/actions/more-horizontal.svg?raw
var more_horizontal_default = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><circle cx=\"5\" cy=\"12\" r=\"1\"/><circle cx=\"12\" cy=\"12\" r=\"1\"/><circle cx=\"19\" cy=\"12\" r=\"1\"/></svg>\n";
//#endregion
//#region app/assets/icons/actions/more-vertical.svg?raw
var more_vertical_default = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><circle cx=\"12\" cy=\"5\" r=\"1\"/><circle cx=\"12\" cy=\"12\" r=\"1\"/><circle cx=\"12\" cy=\"19\" r=\"1\"/></svg>\n";
//#endregion
//#region app/assets/icons/actions/pause.svg?raw
var pause_default = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"M8 5h3v14H8zM14 5h3v14h-3z\"/></svg>\n";
//#endregion
//#region app/assets/icons/actions/play.svg?raw
var play_default = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"m8 5 11 7-11 7z\"/></svg>\n";
//#endregion
//#region app/assets/icons/actions/plus.svg?raw
var plus_default = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"M12 5v14M5 12h14\"/></svg>\n";
//#endregion
//#region app/assets/icons/actions/refresh.svg?raw
var refresh_default = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"M20 7v5h-5M4 17v-5h5\"/><path d=\"M6.1 8A8 8 0 0 1 20 12M17.9 16A8 8 0 0 1 4 12\"/></svg>\n";
//#endregion
//#region app/assets/icons/actions/search.svg?raw
var search_default = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><circle cx=\"10.5\" cy=\"10.5\" r=\"6.5\"/><path d=\"m16 16 5 5\"/></svg>\n";
//#endregion
//#region app/assets/icons/actions/share.svg?raw
var share_default = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><circle cx=\"18\" cy=\"5\" r=\"3\"/><circle cx=\"6\" cy=\"12\" r=\"3\"/><circle cx=\"18\" cy=\"19\" r=\"3\"/><path d=\"m8.7 10.7 6.6-4.4M8.7 13.3l6.6 4.4\"/></svg>\n";
//#endregion
//#region app/assets/icons/actions/trash.svg?raw
var trash_default = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"M5 7h14M9 7V4h6v3M7 7l1 14h8l1-14M10 10v7M14 10v7\"/></svg>\n";
//#endregion
//#region app/assets/icons/actions/upload.svg?raw
var upload_default = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"M12 21V9M7 14l5-5 5 5\"/><path d=\"M4 3h16\"/></svg>\n";
//#endregion
//#region app/assets/icons/brands/bluesky.svg?raw
var bluesky_default = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" fill=\"currentColor\">\n  <path d=\"M5.203 3.036C7.957 5.104 10.918 9.297 12 11.547c1.082-2.25 4.043-6.443 6.797-8.511C20.783 1.545 24 .43 24 4.1c0 .733-.42 6.156-.667 7.037-.856 3.06-3.976 3.842-6.75 3.37 4.85.826 6.084 3.56 3.42 6.294-5.06 5.194-7.273-1.303-7.84-2.968-.105-.305-.154-.448-.155-.327-.001-.121-.05.022-.154.327-.568 1.665-2.78 8.162-7.84 2.968-2.665-2.735-1.431-5.468 3.42-6.294-2.775.472-5.895-.31-6.751-3.37C.42 10.256 0 4.833 0 4.1c0-3.67 3.217-2.555 5.203-1.064Z\"/>\n</svg>\n";
//#endregion
//#region app/assets/icons/brands/discord.svg?raw
var discord_default = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" fill=\"currentColor\">\n  <path d=\"M20.317 4.37a19.79 19.79 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.865-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.058a.082.082 0 0 0 .031.056 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .079.009c.12.099.246.198.373.292a.077.077 0 0 1-.006.128 12.3 12.3 0 0 1-1.873.891.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .84.029 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.055c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.029zM8.02 15.331c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.211 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z\"/>\n</svg>\n";
//#endregion
//#region app/assets/icons/brands/droidex-mark.svg?raw
var droidex_mark_default = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" fill=\"none\">\n  <path d=\"M12 2.6 21.4 12 12 21.4 2.6 12 12 2.6Z\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linejoin=\"round\"/>\n  <path d=\"M12 8.4 15.6 12 12 15.6 8.4 12 12 8.4Z\" fill=\"currentColor\"/>\n</svg>\n";
//#endregion
//#region app/assets/icons/brands/x.svg?raw
var x_default = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" fill=\"currentColor\">\n  <path d=\"M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932zM17.61 20.644h2.039L6.486 3.24H4.298z\"/>\n</svg>\n";
//#endregion
//#region app/assets/icons/brands/youtube.svg?raw
var youtube_default = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" fill=\"currentColor\">\n  <path d=\"M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814ZM9.545 15.568V8.432L15.818 12l-6.273 3.568Z\"/>\n</svg>\n";
//#endregion
//#region app/assets/icons/game/bot-head.svg?raw
var bot_head_default = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"M7 8h10a4 4 0 0 1 4 4v5a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4v-5a4 4 0 0 1 4-4zM12 8V4M9 4h6\"/><circle cx=\"9\" cy=\"14\" r=\"1\"/><circle cx=\"15\" cy=\"14\" r=\"1\"/></svg>\n";
//#endregion
//#region app/assets/icons/game/collector.svg?raw
var collector_default = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"M5 8h14l-2 13H7z\"/><path d=\"M8 8a4 4 0 0 1 8 0M9 13h6M12 10v6\"/></svg>\n";
//#endregion
//#region app/assets/icons/game/community.svg?raw
var community_default = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><circle cx=\"8\" cy=\"9\" r=\"3\"/><circle cx=\"16\" cy=\"9\" r=\"3\"/><path d=\"M2 20a6 6 0 0 1 12 0M10 20a6 6 0 0 1 12 0\"/></svg>\n";
//#endregion
//#region app/assets/icons/game/crate.svg?raw
var crate_default = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"M4 6h16v15H4z\"/><path d=\"M4 10h16M8 6v15M16 6v15M8 10l8 11M16 10 8 21\"/></svg>\n";
//#endregion
//#region app/assets/icons/game/critical.svg?raw
var critical_default = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><circle cx=\"12\" cy=\"12\" r=\"8\"/><path d=\"m12 4 2 5 5 2-5 2-2 5-2-5-5-2 5-2z\"/></svg>\n";
//#endregion
//#region app/assets/icons/game/daily-quest.svg?raw
var daily_quest_default = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><rect x=\"4\" y=\"5\" width=\"16\" height=\"16\" rx=\"2\"/><path d=\"M8 3v4M16 3v4M4 9h16M8 14h3M8 17h6\"/></svg>\n";
//#endregion
//#region app/assets/icons/game/droid.svg?raw
var droid_default = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><rect x=\"5\" y=\"6\" width=\"14\" height=\"13\" rx=\"5\"/><path d=\"M8 6V4h8v2M8 19v2M16 19v2M5 11H3M21 11h-2\"/><circle cx=\"9\" cy=\"12\" r=\"1\"/><circle cx=\"15\" cy=\"12\" r=\"1\"/><path d=\"M9 16h6\"/></svg>\n";
//#endregion
//#region app/assets/icons/game/event.svg?raw
var event_default = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"m12 2 3 6 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1z\"/><circle cx=\"12\" cy=\"12\" r=\"2\"/></svg>\n";
//#endregion
//#region app/assets/icons/game/factory.svg?raw
var factory_default = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"M3 21V10l5 3V8l5 3V4l8 4v13z\"/><path d=\"M7 17h3M13 17h3M18 17h2\"/></svg>\n";
//#endregion
//#region app/assets/icons/game/leaderboard.svg?raw
var leaderboard_default = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"M5 21V11h4v10M10 21V5h4v16M15 21v-7h4v7M3 21h18\"/></svg>\n";
//#endregion
//#region app/assets/icons/game/map.svg?raw
var map_default = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"m3 6 6-3 6 3 6-3v15l-6 3-6-3-6 3zM9 3v15M15 6v15\"/></svg>\n";
//#endregion
//#region app/assets/icons/game/mission-pad.svg?raw
var mission_pad_default = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><ellipse cx=\"12\" cy=\"16\" rx=\"9\" ry=\"4\"/><path d=\"M5 16v-5c0-3 3-5 7-5s7 2 7 5v5\"/><ellipse cx=\"12\" cy=\"11\" rx=\"7\" ry=\"4\"/></svg>\n";
//#endregion
//#region app/assets/icons/game/planet.svg?raw
var planet_default = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><circle cx=\"12\" cy=\"12\" r=\"7\"/><path d=\"M2 15c3 3 15 1 20-4M4 17c-4-2-3-5 1-6\"/></svg>\n";
//#endregion
//#region app/assets/icons/game/portal.svg?raw
var portal_default = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><ellipse cx=\"12\" cy=\"11\" rx=\"6\" ry=\"9\"/><ellipse cx=\"12\" cy=\"11\" rx=\"3\" ry=\"6\"/><path d=\"M4 21h16\"/></svg>\n";
//#endregion
//#region app/assets/icons/game/radar.svg?raw
var radar_default = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><circle cx=\"12\" cy=\"12\" r=\"9\"/><circle cx=\"12\" cy=\"12\" r=\"5\"/><circle cx=\"12\" cy=\"12\" r=\"1\"/><path d=\"m12 12 6-6\"/></svg>\n";
//#endregion
//#region app/assets/icons/game/rebirth.svg?raw
var rebirth_default = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><circle cx=\"12\" cy=\"12\" r=\"9\"/><path d=\"M16 8a5 5 0 1 0 1 6m-1-9 .5 3.5L13 8M12 8v8M8 12h8\"/></svg>\n";
//#endregion
//#region app/assets/icons/game/rocket.svg?raw
var rocket_default = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"M9 15C6 9 9 4 17 2c2 8 0 13-6 16z\"/><path d=\"m11 18-3 4-2-3 3-3M9 15l-4 3-2-3 4-3\"/><circle cx=\"14\" cy=\"7\" r=\"2\"/></svg>\n";
//#endregion
//#region app/assets/icons/game/shield.svg?raw
var shield_default = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"M12 2 20 5v6c0 5-3 9-8 11-5-2-8-6-8-11V5z\"/><path d=\"m8 12 3 3 5-6\"/></svg>\n";
//#endregion
//#region app/assets/icons/game/upgrade.svg?raw
var upgrade_default = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"M12 2v14M7 7l5-5 5 5M5 14v7h14v-7\"/></svg>\n";
//#endregion
//#region app/assets/icons/game/worker.svg?raw
var worker_default = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><circle cx=\"12\" cy=\"7\" r=\"3\"/><path d=\"M5 21v-4a7 7 0 0 1 14 0v4M8 11l4 4 4-4\"/></svg>\n";
//#endregion
//#region app/assets/icons/navigation/dashboard.svg?raw
var dashboard_default = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><rect x=\"3\" y=\"3\" width=\"7\" height=\"7\" rx=\"1\"/><rect x=\"14\" y=\"3\" width=\"7\" height=\"7\" rx=\"1\"/><rect x=\"3\" y=\"14\" width=\"7\" height=\"7\" rx=\"1\"/><rect x=\"14\" y=\"14\" width=\"7\" height=\"7\" rx=\"1\"/></svg>\n";
//#endregion
//#region app/assets/icons/navigation/droidex.svg?raw
var droidex_default = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"M12 3.5 19 7v10l-7 3.5L5 17V7z\"/><circle cx=\"9.5\" cy=\"11\" r=\"1\"/><circle cx=\"14.5\" cy=\"11\" r=\"1\"/><path d=\"M9 15h6M12 3.5V2\"/></svg>\n";
//#endregion
//#region app/assets/icons/navigation/guide.svg?raw
var guide_default = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"M4 4h7a3 3 0 0 1 3 3v13H7a3 3 0 0 0-3 3z\"/><path d=\"M20 4h-7a3 3 0 0 0-3 3v13h7a3 3 0 0 1 3 3z\"/></svg>\n";
//#endregion
//#region app/assets/icons/navigation/home.svg?raw
var home_default = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"m3 11 9-8 9 8\"/><path d=\"M5 10v10h14V10M9 20v-6h6v6\"/></svg>\n";
//#endregion
//#region app/assets/icons/navigation/logout.svg?raw
var logout_default = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"M10 4H5v16h5M14 8l4 4-4 4M18 12H9\"/></svg>\n";
//#endregion
//#region app/assets/icons/navigation/menu.svg?raw
var menu_default = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"M3 6h18M3 12h18M3 18h18\"/></svg>\n";
//#endregion
//#region app/assets/icons/navigation/missions.svg?raw
var missions_default = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><rect x=\"5\" y=\"3\" width=\"14\" height=\"18\" rx=\"2\"/><path d=\"M8 8h8M8 12h5M8 16h4\"/><path d=\"m14.5 16 1.5 1.5 3-4\"/></svg>\n";
//#endregion
//#region app/assets/icons/navigation/news.svg?raw
var news_default = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"M6 4h12v16H6z\"/><path d=\"M9 8h6M9 11h6M9 14h4\"/><path d=\"M8 4V2h8v2\"/></svg>\n";
//#endregion
//#region app/assets/icons/navigation/nova-shop.svg?raw
var nova_shop_default = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"M5 8h14l-1 12H6z\"/><path d=\"M8 8a4 4 0 0 1 8 0\"/><path d=\"M9 13h6\"/></svg>\n";
//#endregion
//#region app/assets/icons/navigation/profile.svg?raw
var profile_default = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><circle cx=\"12\" cy=\"8\" r=\"4\"/><path d=\"M4.5 21a7.5 7.5 0 0 1 15 0\"/></svg>\n";
//#endregion
//#region app/assets/icons/navigation/renaissances.svg?raw
var renaissances_default = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"M18.5 7.5A8 8 0 1 0 20 14\"/><path d=\"m18 3.5.5 4.5-4.5-.5\"/><path d=\"M12 7v10M7 12h10\"/></svg>\n";
//#endregion
//#region app/assets/icons/navigation/settings.svg?raw
var settings_default = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><circle cx=\"12\" cy=\"12\" r=\"3\"/><path d=\"m12 2 1.5 2.4 2.8-.4.8 2.7 2.7 1.1-1.1 2.7 1.1 2.7-2.7 1.1-.8 2.7-2.8-.4L12 22l-1.5-2.4-2.8.4-.8-2.7-2.7-1.1 1.1-2.7-1.1-2.7 2.7-1.1.8-2.7 2.8.4z\"/></svg>\n";
//#endregion
//#region app/assets/icons/rarities/common.svg?raw
var common_default = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"M12 2 21 7v10l-9 5-9-5V7z\"/><circle cx=\"12\" cy=\"12\" r=\"3\"/></svg>\n";
//#endregion
//#region app/assets/icons/rarities/emblematic.svg?raw
var emblematic_default = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"M12 2 21 7v10l-9 5-9-5V7zM12 5 9 10l3 2 3-2zM12 12v7\"/></svg>\n";
//#endregion
//#region app/assets/icons/rarities/epic.svg?raw
var epic_default = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"M12 2 21 7v10l-9 5-9-5V7z\"/><path d=\"m12 5 2 4 5 1-3.5 3.5.8 5-4.3-2.3-4.3 2.3.8-5L5 10l5-1z\"/></svg>\n";
//#endregion
//#region app/assets/icons/rarities/legendary.svg?raw
var legendary_default = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"M12 2 21 7v10l-9 5-9-5V7zM12 5v14M5 12h14M7 7l10 10M17 7 7 17\"/></svg>\n";
//#endregion
//#region app/assets/icons/rarities/mythic.svg?raw
var mythic_default = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"M12 2 21 7v10l-9 5-9-5V7z\"/><path d=\"m12 5 2.2 4.5 4.8.7-3.5 3.4.8 4.9-4.3-2.3-4.3 2.3.8-4.9L5 10.2l4.8-.7z\"/><circle cx=\"12\" cy=\"12\" r=\"2\"/></svg>\n";
//#endregion
//#region app/assets/icons/rarities/rare.svg?raw
var rare_default = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"M12 2 21 7v10l-9 5-9-5V7z\"/><path d=\"m12 6 2 4 4 .5-3 3 1 4.5-4-2-4 2 1-4.5-3-3 4-.5z\"/></svg>\n";
//#endregion
//#region app/assets/icons/resources/cash.svg?raw
var cash_default = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><rect x=\"3\" y=\"6\" width=\"18\" height=\"12\" rx=\"2\"/><circle cx=\"12\" cy=\"12\" r=\"3\"/><path d=\"M6 9h.01M18 15h.01\"/></svg>\n";
//#endregion
//#region app/assets/icons/resources/credits.svg?raw
var credits_default = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><circle cx=\"12\" cy=\"12\" r=\"9\"/><path d=\"M15.5 8.5c-1.5-1.5-5.5-1.5-6.5.5-1.5 3 6 2 6.5 5 .5 3-5 4-7 1.5M12 6v12\"/></svg>\n";
//#endregion
//#region app/assets/icons/resources/diamond.svg?raw
var diamond_default = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"m3 8 4-5h10l4 5-9 13z\"/><path d=\"m3 8 9 4 9-4M7 3l5 9 5-9\"/></svg>\n";
//#endregion
//#region app/assets/icons/resources/energy.svg?raw
var energy_default = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"m14 2-8 12h6l-1 8 8-12h-6z\"/></svg>\n";
//#endregion
//#region app/assets/icons/resources/gold.svg?raw
var gold_default = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><circle cx=\"12\" cy=\"12\" r=\"9\"/><path d=\"M8.5 8h7v8h-7zM10 6h4M10 18h4\"/></svg>\n";
//#endregion
//#region app/assets/icons/resources/income.svg?raw
var income_default = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"M4 18h16M6 16l4-4 3 3 5-7M14 8h4v4\"/></svg>\n";
//#endregion
//#region app/assets/icons/resources/multiplier.svg?raw
var multiplier_default = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"m6 6 12 12M18 6 6 18\"/><circle cx=\"12\" cy=\"12\" r=\"9\"/></svg>\n";
//#endregion
//#region app/assets/icons/resources/nova-crystal.svg?raw
var nova_crystal_default = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"m12 2 7 6-3 13H8L5 8z\"/><path d=\"m5 8 7 13 7-13M12 2v19\"/></svg>\n";
//#endregion
//#region app/assets/icons/resources/rebirth-token.svg?raw
var rebirth_token_default = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><circle cx=\"12\" cy=\"12\" r=\"9\"/><path d=\"M16 8a5 5 0 1 0 1 6m-1-9 .5 3.5L13 8\"/></svg>\n";
//#endregion
//#region app/assets/icons/resources/scrap.svg?raw
var scrap_default = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"M7 7h10l2 4-2 8H7l-2-8z\"/><path d=\"m8 10 4-4 4 4M9 14h6\"/></svg>\n";
//#endregion
//#region app/assets/icons/resources/speed.svg?raw
var speed_default = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"M4 15a8 8 0 1 1 16 0M12 15l5-5M6 18h12\"/></svg>\n";
//#endregion
//#region app/assets/icons/resources/star.svg?raw
var star_default = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"m12 2 3 6 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1z\"/></svg>\n";
//#endregion
//#region app/assets/icons/resources/timer.svg?raw
var timer_default = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><circle cx=\"12\" cy=\"13\" r=\"8\"/><path d=\"M9 2h6M12 5v3M12 13l4-3\"/></svg>\n";
//#endregion
//#region app/assets/icons/resources/xp.svg?raw
var xp_default = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"M4 7l5 5-5 5M20 7l-5 5 5 5M10 19l4-14\"/></svg>\n";
//#endregion
//#region app/assets/icons/status/completed.svg?raw
var completed_default = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"M4 4h16v16H4z\"/><path d=\"m7 12 3 3 7-7\"/></svg>\n";
//#endregion
//#region app/assets/icons/status/error.svg?raw
var error_default = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><circle cx=\"12\" cy=\"12\" r=\"9\"/><path d=\"m9 9 6 6M15 9l-6 6\"/></svg>\n";
//#endregion
//#region app/assets/icons/status/info.svg?raw
var info_default = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><circle cx=\"12\" cy=\"12\" r=\"9\"/><path d=\"M12 10v6M12 7h.01\"/></svg>\n";
//#endregion
//#region app/assets/icons/status/loading.svg?raw
var loading_default = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"M12 3a9 9 0 1 1-9 9\"/></svg>\n";
//#endregion
//#region app/assets/icons/status/locked.svg?raw
var locked_default = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><rect x=\"5\" y=\"10\" width=\"14\" height=\"11\" rx=\"2\"/><path d=\"M8 10V7a4 4 0 0 1 8 0v3M12 14v3\"/></svg>\n";
//#endregion
//#region app/assets/icons/status/new.svg?raw
var new_default = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"m12 2 2.2 3.3 4-.4.7 4 3.1 2.5-2.5 3.1.4 4-4 .7L12 22l-2.2-3.3-4 .4-.7-4L2 12.6l2.5-3.1-.4-4 4-.7z\"/><path d=\"M8 12h8\"/></svg>\n";
//#endregion
//#region app/assets/icons/status/offline.svg?raw
var offline_default = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><circle cx=\"12\" cy=\"12\" r=\"9\"/><path d=\"m4 4 16 16M8 12a4 4 0 0 1 5.5-3.7M10 16a2 2 0 0 1 4 0\"/></svg>\n";
//#endregion
//#region app/assets/icons/status/online.svg?raw
var online_default = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><circle cx=\"12\" cy=\"12\" r=\"9\"/><path d=\"M7 13a5 5 0 0 1 10 0M9 16a3 3 0 0 1 6 0M12 19h.01\"/></svg>\n";
//#endregion
//#region app/assets/icons/status/success.svg?raw
var success_default = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><circle cx=\"12\" cy=\"12\" r=\"9\"/><path d=\"m7 12 3 3 7-7\"/></svg>\n";
//#endregion
//#region app/assets/icons/status/unlocked.svg?raw
var unlocked_default = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><rect x=\"5\" y=\"10\" width=\"14\" height=\"11\" rx=\"2\"/><path d=\"M16 10V7a4 4 0 0 0-7.5-2M12 14v3\"/></svg>\n";
//#endregion
//#region app/assets/icons/status/warning.svg?raw
var warning_default = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"m12 2 10 19H2z\"/><path d=\"M12 9v5M12 17h.01\"/></svg>\n";
//#endregion
//#region app/assets/icons/ui/calendar.svg?raw
var calendar_default = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><rect x=\"3\" y=\"5\" width=\"18\" height=\"16\" rx=\"2\"/><path d=\"M7 3v4M17 3v4M3 10h18\"/></svg>\n";
//#endregion
//#region app/assets/icons/ui/card.svg?raw
var card_default = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><rect x=\"4\" y=\"3\" width=\"16\" height=\"18\" rx=\"3\"/><path d=\"M7 8h10M7 12h7M7 16h5\"/></svg>\n";
//#endregion
//#region app/assets/icons/ui/checkbox.svg?raw
var checkbox_default = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><rect x=\"3\" y=\"3\" width=\"18\" height=\"18\" rx=\"3\"/><path d=\"m7 12 3 3 7-7\"/></svg>\n";
//#endregion
//#region app/assets/icons/ui/clock.svg?raw
var clock_default = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><circle cx=\"12\" cy=\"12\" r=\"9\"/><path d=\"M12 7v6l4 2\"/></svg>\n";
//#endregion
//#region app/assets/icons/ui/grid.svg?raw
var grid_default = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><rect x=\"3\" y=\"3\" width=\"7\" height=\"7\"/><rect x=\"14\" y=\"3\" width=\"7\" height=\"7\"/><rect x=\"3\" y=\"14\" width=\"7\" height=\"7\"/><rect x=\"14\" y=\"14\" width=\"7\" height=\"7\"/></svg>\n";
//#endregion
//#region app/assets/icons/ui/image.svg?raw
var image_default = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><rect x=\"3\" y=\"4\" width=\"18\" height=\"16\" rx=\"2\"/><circle cx=\"9\" cy=\"9\" r=\"2\"/><path d=\"m4 18 5-5 4 4 3-3 4 4\"/></svg>\n";
//#endregion
//#region app/assets/icons/ui/link.svg?raw
var link_default = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"M10 13a5 5 0 0 0 7.5.5l2-2a5 5 0 0 0-7-7l-1.2 1.2M14 11a5 5 0 0 0-7.5-.5l-2 2a5 5 0 0 0 7 7l1.2-1.2\"/></svg>\n";
//#endregion
//#region app/assets/icons/ui/list.svg?raw
var list_default = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"M8 6h13M8 12h13M8 18h13\"/><circle cx=\"4\" cy=\"6\" r=\"1\"/><circle cx=\"4\" cy=\"12\" r=\"1\"/><circle cx=\"4\" cy=\"18\" r=\"1\"/></svg>\n";
//#endregion
//#region app/assets/icons/ui/modal.svg?raw
var modal_default = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><rect x=\"3\" y=\"4\" width=\"18\" height=\"16\" rx=\"2\"/><path d=\"M7 8h10M7 12h7\"/></svg>\n";
//#endregion
//#region app/assets/icons/ui/notification.svg?raw
var notification_default = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4\"/></svg>\n";
//#endregion
//#region app/assets/icons/ui/panel.svg?raw
var panel_default = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><rect x=\"3\" y=\"4\" width=\"18\" height=\"16\" rx=\"2\"/><path d=\"M3 9h18\"/></svg>\n";
//#endregion
//#region app/assets/icons/ui/radio.svg?raw
var radio_default = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><circle cx=\"12\" cy=\"12\" r=\"9\"/><circle cx=\"12\" cy=\"12\" r=\"4\"/></svg>\n";
//#endregion
//#region app/assets/icons/ui/sidebar-left.svg?raw
var sidebar_left_default = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"M4 3h16v18H4zM9 3v18M6 7h1M6 11h1M6 15h1\"/></svg>\n";
//#endregion
//#region app/assets/icons/ui/sidebar-right.svg?raw
var sidebar_right_default = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"M4 3h16v18H4zM15 3v18M17 7h1M17 11h1M17 15h1\"/></svg>\n";
//#endregion
//#region app/assets/icons/ui/sort.svg?raw
var sort_default = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"M8 4v16M4 8l4-4 4 4M16 20V4M12 16l4 4 4-4\"/></svg>\n";
//#endregion
//#region app/assets/icons/ui/tabs.svg?raw
var tabs_default = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"M3 7h6l2-3h10v16H3zM3 10h18\"/></svg>\n";
//#endregion
//#region app/assets/icons/ui/toggle-off.svg?raw
var toggle_off_default = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><rect x=\"3\" y=\"7\" width=\"18\" height=\"10\" rx=\"5\"/><circle cx=\"8\" cy=\"12\" r=\"3\"/></svg>\n";
//#endregion
//#region app/assets/icons/ui/toggle-on.svg?raw
var toggle_on_default = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><rect x=\"3\" y=\"7\" width=\"18\" height=\"10\" rx=\"5\"/><circle cx=\"16\" cy=\"12\" r=\"3\"/></svg>\n";
//#endregion
//#region app/assets/icons/ui/tooltip.svg?raw
var tooltip_default = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"M4 4h16v12H9l-5 4zM8 8h8M8 12h5\"/></svg>\n";
//#endregion
//#region app/components/DxIcon.vue?vue&type=script&setup=true&lang.ts
var DxIcon_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "DxIcon",
	__ssrInlineRender: true,
	props: {
		name: {},
		size: { default: 20 }
	},
	setup(__props) {
		/**
		* Icône du pack d'assets, rendue en SVG inline.
		*
		* Les fichiers sont inclus dans le bundle par `globalThis._importMeta_.glob` en mode brut plutôt
		* que chargés en `<img>` : c'est ce qui permet à `currentColor` de fonctionner, donc
		* de teinter l'icône par état (actif, survol, désactivé) sans dupliquer les fichiers.
		* Le coût est un peu de poids dans le bundle, largement compensé par les requêtes
		* réseau évitées — la navigation en affiche une douzaine.
		*/
		const props = __props;
		/** Les clés du glob sont des chemins complets : on les réindexe sur `dossier/nom`. */
		const byName = Object.fromEntries(Object.entries(/* @__PURE__ */ Object.assign({
			"/assets/icons/actions/arrow-down.svg": arrow_down_default,
			"/assets/icons/actions/arrow-left.svg": arrow_left_default,
			"/assets/icons/actions/arrow-right.svg": arrow_right_default,
			"/assets/icons/actions/arrow-up.svg": arrow_up_default,
			"/assets/icons/actions/check.svg": check_default,
			"/assets/icons/actions/chevron-down.svg": chevron_down_default,
			"/assets/icons/actions/chevron-left.svg": chevron_left_default,
			"/assets/icons/actions/chevron-right.svg": chevron_right_default,
			"/assets/icons/actions/chevron-up.svg": chevron_up_default,
			"/assets/icons/actions/close.svg": close_default,
			"/assets/icons/actions/copy.svg": copy_default,
			"/assets/icons/actions/download.svg": download_default,
			"/assets/icons/actions/edit.svg": edit_default,
			"/assets/icons/actions/external-link.svg": external_link_default,
			"/assets/icons/actions/eye.svg": eye_default,
			"/assets/icons/actions/filter.svg": filter_default,
			"/assets/icons/actions/heart.svg": heart_default,
			"/assets/icons/actions/minus.svg": minus_default,
			"/assets/icons/actions/more-horizontal.svg": more_horizontal_default,
			"/assets/icons/actions/more-vertical.svg": more_vertical_default,
			"/assets/icons/actions/pause.svg": pause_default,
			"/assets/icons/actions/play.svg": play_default,
			"/assets/icons/actions/plus.svg": plus_default,
			"/assets/icons/actions/refresh.svg": refresh_default,
			"/assets/icons/actions/search.svg": search_default,
			"/assets/icons/actions/share.svg": share_default,
			"/assets/icons/actions/trash.svg": trash_default,
			"/assets/icons/actions/upload.svg": upload_default,
			"/assets/icons/brands/bluesky.svg": bluesky_default,
			"/assets/icons/brands/discord.svg": discord_default,
			"/assets/icons/brands/droidex-mark.svg": droidex_mark_default,
			"/assets/icons/brands/x.svg": x_default,
			"/assets/icons/brands/youtube.svg": youtube_default,
			"/assets/icons/game/bot-head.svg": bot_head_default,
			"/assets/icons/game/collector.svg": collector_default,
			"/assets/icons/game/community.svg": community_default,
			"/assets/icons/game/crate.svg": crate_default,
			"/assets/icons/game/critical.svg": critical_default,
			"/assets/icons/game/daily-quest.svg": daily_quest_default,
			"/assets/icons/game/droid.svg": droid_default,
			"/assets/icons/game/event.svg": event_default,
			"/assets/icons/game/factory.svg": factory_default,
			"/assets/icons/game/leaderboard.svg": leaderboard_default,
			"/assets/icons/game/map.svg": map_default,
			"/assets/icons/game/mission-pad.svg": mission_pad_default,
			"/assets/icons/game/planet.svg": planet_default,
			"/assets/icons/game/portal.svg": portal_default,
			"/assets/icons/game/radar.svg": radar_default,
			"/assets/icons/game/rebirth.svg": rebirth_default,
			"/assets/icons/game/rocket.svg": rocket_default,
			"/assets/icons/game/shield.svg": shield_default,
			"/assets/icons/game/upgrade.svg": upgrade_default,
			"/assets/icons/game/worker.svg": worker_default,
			"/assets/icons/navigation/dashboard.svg": dashboard_default,
			"/assets/icons/navigation/droidex.svg": droidex_default,
			"/assets/icons/navigation/guide.svg": guide_default,
			"/assets/icons/navigation/home.svg": home_default,
			"/assets/icons/navigation/logout.svg": logout_default,
			"/assets/icons/navigation/menu.svg": menu_default,
			"/assets/icons/navigation/missions.svg": missions_default,
			"/assets/icons/navigation/news.svg": news_default,
			"/assets/icons/navigation/nova-shop.svg": nova_shop_default,
			"/assets/icons/navigation/profile.svg": profile_default,
			"/assets/icons/navigation/renaissances.svg": renaissances_default,
			"/assets/icons/navigation/settings.svg": settings_default,
			"/assets/icons/rarities/common.svg": common_default,
			"/assets/icons/rarities/emblematic.svg": emblematic_default,
			"/assets/icons/rarities/epic.svg": epic_default,
			"/assets/icons/rarities/legendary.svg": legendary_default,
			"/assets/icons/rarities/mythic.svg": mythic_default,
			"/assets/icons/rarities/rare.svg": rare_default,
			"/assets/icons/resources/cash.svg": cash_default,
			"/assets/icons/resources/credits.svg": credits_default,
			"/assets/icons/resources/diamond.svg": diamond_default,
			"/assets/icons/resources/energy.svg": energy_default,
			"/assets/icons/resources/gold.svg": gold_default,
			"/assets/icons/resources/income.svg": income_default,
			"/assets/icons/resources/multiplier.svg": multiplier_default,
			"/assets/icons/resources/nova-crystal.svg": nova_crystal_default,
			"/assets/icons/resources/rebirth-token.svg": rebirth_token_default,
			"/assets/icons/resources/scrap.svg": scrap_default,
			"/assets/icons/resources/speed.svg": speed_default,
			"/assets/icons/resources/star.svg": star_default,
			"/assets/icons/resources/timer.svg": timer_default,
			"/assets/icons/resources/xp.svg": xp_default,
			"/assets/icons/status/completed.svg": completed_default,
			"/assets/icons/status/error.svg": error_default,
			"/assets/icons/status/info.svg": info_default,
			"/assets/icons/status/loading.svg": loading_default,
			"/assets/icons/status/locked.svg": locked_default,
			"/assets/icons/status/new.svg": new_default,
			"/assets/icons/status/offline.svg": offline_default,
			"/assets/icons/status/online.svg": online_default,
			"/assets/icons/status/success.svg": success_default,
			"/assets/icons/status/unlocked.svg": unlocked_default,
			"/assets/icons/status/warning.svg": warning_default,
			"/assets/icons/ui/calendar.svg": calendar_default,
			"/assets/icons/ui/card.svg": card_default,
			"/assets/icons/ui/checkbox.svg": checkbox_default,
			"/assets/icons/ui/clock.svg": clock_default,
			"/assets/icons/ui/grid.svg": grid_default,
			"/assets/icons/ui/image.svg": image_default,
			"/assets/icons/ui/link.svg": link_default,
			"/assets/icons/ui/list.svg": list_default,
			"/assets/icons/ui/modal.svg": modal_default,
			"/assets/icons/ui/notification.svg": notification_default,
			"/assets/icons/ui/panel.svg": panel_default,
			"/assets/icons/ui/radio.svg": radio_default,
			"/assets/icons/ui/sidebar-left.svg": sidebar_left_default,
			"/assets/icons/ui/sidebar-right.svg": sidebar_right_default,
			"/assets/icons/ui/sort.svg": sort_default,
			"/assets/icons/ui/tabs.svg": tabs_default,
			"/assets/icons/ui/toggle-off.svg": toggle_off_default,
			"/assets/icons/ui/toggle-on.svg": toggle_on_default,
			"/assets/icons/ui/tooltip.svg": tooltip_default
		})).map(([path, svg]) => {
			const m = path.match(/icons\/(.+)\.svg$/);
			return [m ? m[1] : path, svg];
		}));
		const svg = computed(() => {
			const raw = byName[props.name];
			if (!raw) return "";
			return raw.replace(/<svg([^>]*)>/, (_, attrs) => `<svg${attrs.replace(/\s(width|height)="[^"]*"/g, "")} width="100%" height="100%">`);
		});
		const style = computed(() => {
			const s = typeof props.size === "number" ? `${props.size}px` : props.size;
			return {
				width: s,
				height: s
			};
		});
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<span${ssrRenderAttrs(mergeProps({
				class: "inline-grid shrink-0 place-items-center",
				style: unref(style),
				"aria-hidden": "true"
			}, _attrs))}>${unref(svg) ?? ""}</span>`);
		};
	}
});
//#endregion
//#region app/components/DxIcon.vue
var _sfc_setup = DxIcon_vue_vue_type_script_setup_true_lang_default.setup;
DxIcon_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/DxIcon.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var DxIcon_default = Object.assign(DxIcon_vue_vue_type_script_setup_true_lang_default, { __name: "DxIcon" });

export { DxIcon_default as D };
//# sourceMappingURL=DxIcon-70RsSwuM.mjs.map
