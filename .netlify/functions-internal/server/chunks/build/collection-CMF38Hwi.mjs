import { computed, ref } from 'vue';
import { X as ofetch } from '../nitro/nitro.mjs';
import { defineStore } from 'pinia';

var generatedFrom = "erikpeik/droidex@2026-06-02 + guides communautaires juillet 2026";
//#endregion
//#region app/stores/collection.ts
var data = {
	version: 1,
	generatedFrom,
	tiers: [
		"DEFAULT",
		"GOLD",
		"DIAMOND",
		"RAINBOW",
		"BESKAR",
		"GALACTIC"
	],
	quantifiedTiers: [
		"DEFAULT",
		"GOLD",
		"DIAMOND",
		"RAINBOW",
		"BESKAR"
	],
	rarities: [
		"common",
		"rare",
		"epic",
		"legendary",
		"mythic",
		"iconic"
	],
	types: [
		"worker",
		"astromech",
		"battle"
	],
	droids: [
		{
			"slug": "mouse",
			"name": "MOUSE",
			"assetKey": "MOUSE",
			"rarity": "common",
			"type": "worker",
			"percentIncome": false,
			"percentValue": null,
			"perk": null,
			"unverified": false,
			"tiers": {
				"DEFAULT": {
					"income": 2,
					"incomeLabel": "2/s",
					"cost": 950,
					"costLabel": "950",
					"value": 665,
					"valueLabel": "665",
					"image": "MOUSE_DEFAULT.png",
					"imageIsFallback": false
				},
				"GOLD": {
					"income": 4,
					"incomeLabel": "4/s",
					"cost": 3800,
					"costLabel": "3.8k",
					"value": 2660,
					"valueLabel": "2.66k",
					"image": "MOUSE_GOLD.png",
					"imageIsFallback": false
				},
				"DIAMOND": {
					"income": 8,
					"incomeLabel": "8/s",
					"cost": 7600,
					"costLabel": "7.6k",
					"value": 5320,
					"valueLabel": "5.32k",
					"image": "MOUSE_DIAMOND.png",
					"imageIsFallback": false
				},
				"RAINBOW": {
					"income": 16,
					"incomeLabel": "16/s",
					"cost": 15200,
					"costLabel": "15.20k",
					"value": 10640,
					"valueLabel": "10.64k",
					"image": "MOUSE_RAINBOW.png",
					"imageIsFallback": false
				},
				"BESKAR": {
					"income": 24,
					"incomeLabel": "24/s",
					"cost": 15200,
					"costLabel": "15.20k",
					"value": 10640,
					"valueLabel": "10.64k",
					"image": "MOUSE_BESKAR.png",
					"imageIsFallback": false
				},
				"GALACTIC": {
					"income": null,
					"incomeLabel": null,
					"cost": null,
					"costLabel": null,
					"value": null,
					"valueLabel": null,
					"image": "MOUSE_BESKAR.png",
					"imageIsFallback": true
				}
			}
		},
		{
			"slug": "pit",
			"name": "PIT",
			"assetKey": "PIT",
			"rarity": "common",
			"type": "worker",
			"percentIncome": false,
			"percentValue": null,
			"perk": null,
			"unverified": false,
			"tiers": {
				"DEFAULT": {
					"income": 2,
					"incomeLabel": "2/s",
					"cost": 1100,
					"costLabel": "1.1k",
					"value": 770,
					"valueLabel": "770",
					"image": "PIT_DEFAULT.png",
					"imageIsFallback": false
				},
				"GOLD": {
					"income": 4,
					"incomeLabel": "4/s",
					"cost": 4400,
					"costLabel": "4.4k",
					"value": 3080,
					"valueLabel": "3.08k",
					"image": "PIT_GOLD.png",
					"imageIsFallback": false
				},
				"DIAMOND": {
					"income": 8,
					"incomeLabel": "8/s",
					"cost": 8800,
					"costLabel": "8.8k",
					"value": 6160,
					"valueLabel": "6.16k",
					"image": "PIT_DIAMOND.png",
					"imageIsFallback": false
				},
				"RAINBOW": {
					"income": 16,
					"incomeLabel": "16/s",
					"cost": 17600,
					"costLabel": "17.60k",
					"value": 12320,
					"valueLabel": "12.32k",
					"image": "PIT_RAINBOW.png",
					"imageIsFallback": false
				},
				"BESKAR": {
					"income": 24,
					"incomeLabel": "24/s",
					"cost": 17600,
					"costLabel": "17.60k",
					"value": 12320,
					"valueLabel": "12.32k",
					"image": "PIT_BESKAR.png",
					"imageIsFallback": false
				},
				"GALACTIC": {
					"income": null,
					"incomeLabel": null,
					"cost": null,
					"costLabel": null,
					"value": null,
					"valueLabel": null,
					"image": "PIT_BESKAR.png",
					"imageIsFallback": true
				}
			}
		},
		{
			"slug": "cb",
			"name": "CB",
			"assetKey": "CB",
			"rarity": "common",
			"type": "astromech",
			"percentIncome": false,
			"percentValue": null,
			"perk": null,
			"unverified": false,
			"tiers": {
				"DEFAULT": {
					"income": 3,
					"incomeLabel": "3/s",
					"cost": 2e3,
					"costLabel": "2k",
					"value": 1400,
					"valueLabel": "1.40k",
					"image": "CB_DEFAULT.png",
					"imageIsFallback": false
				},
				"GOLD": {
					"income": 6,
					"incomeLabel": "6/s",
					"cost": 8e3,
					"costLabel": "8k",
					"value": 5600,
					"valueLabel": "5.60k",
					"image": "CB_GOLD.png",
					"imageIsFallback": false
				},
				"DIAMOND": {
					"income": 12,
					"incomeLabel": "12/s",
					"cost": 16e3,
					"costLabel": "16k",
					"value": 11200,
					"valueLabel": "11.20k",
					"image": "CB_DIAMOND.png",
					"imageIsFallback": false
				},
				"RAINBOW": {
					"income": 24,
					"incomeLabel": "24/s",
					"cost": 32e3,
					"costLabel": "32k",
					"value": 22400,
					"valueLabel": "22.40k",
					"image": "CB_RAINBOW.png",
					"imageIsFallback": false
				},
				"BESKAR": {
					"income": 36,
					"incomeLabel": "36/s",
					"cost": 32e3,
					"costLabel": "32k",
					"value": 22400,
					"valueLabel": "22.40k",
					"image": "CB_BESKAR.png",
					"imageIsFallback": false
				},
				"GALACTIC": {
					"income": null,
					"incomeLabel": null,
					"cost": null,
					"costLabel": null,
					"value": null,
					"valueLabel": null,
					"image": "CB_BESKAR.png",
					"imageIsFallback": true
				}
			}
		},
		{
			"slug": "r3",
			"name": "R3",
			"assetKey": "R3",
			"rarity": "common",
			"type": "astromech",
			"percentIncome": false,
			"percentValue": null,
			"perk": null,
			"unverified": false,
			"tiers": {
				"DEFAULT": {
					"income": 3,
					"incomeLabel": "3/s",
					"cost": 2e3,
					"costLabel": "2k",
					"value": 1400,
					"valueLabel": "1.40k",
					"image": "R3_DEFAULT.png",
					"imageIsFallback": false
				},
				"GOLD": {
					"income": 6,
					"incomeLabel": "6/s",
					"cost": 8e3,
					"costLabel": "8k",
					"value": 5600,
					"valueLabel": "5.60k",
					"image": "R3_GOLD.png",
					"imageIsFallback": false
				},
				"DIAMOND": {
					"income": 12,
					"incomeLabel": "12/s",
					"cost": 16e3,
					"costLabel": "16k",
					"value": 11200,
					"valueLabel": "11.20k",
					"image": "R3_DIAMOND.png",
					"imageIsFallback": false
				},
				"RAINBOW": {
					"income": 24,
					"incomeLabel": "24/s",
					"cost": 32e3,
					"costLabel": "32k",
					"value": 22400,
					"valueLabel": "22.40k",
					"image": "R3_RAINBOW.png",
					"imageIsFallback": false
				},
				"BESKAR": {
					"income": 36,
					"incomeLabel": "36/s",
					"cost": 32e3,
					"costLabel": "32k",
					"value": 22400,
					"valueLabel": "22.40k",
					"image": "R3_BESKAR.png",
					"imageIsFallback": false
				},
				"GALACTIC": {
					"income": null,
					"incomeLabel": null,
					"cost": null,
					"costLabel": null,
					"value": null,
					"valueLabel": null,
					"image": "R3_BESKAR.png",
					"imageIsFallback": true
				}
			}
		},
		{
			"slug": "r5",
			"name": "R5",
			"assetKey": "R5",
			"rarity": "common",
			"type": "astromech",
			"percentIncome": false,
			"percentValue": null,
			"perk": null,
			"unverified": false,
			"tiers": {
				"DEFAULT": {
					"income": 3,
					"incomeLabel": "3/s",
					"cost": 2e3,
					"costLabel": "2k",
					"value": 1400,
					"valueLabel": "1.40k",
					"image": "R5_DEFAULT.png",
					"imageIsFallback": false
				},
				"GOLD": {
					"income": 6,
					"incomeLabel": "6/s",
					"cost": 8e3,
					"costLabel": "8k",
					"value": 5600,
					"valueLabel": "5.60k",
					"image": "R5_GOLD.png",
					"imageIsFallback": false
				},
				"DIAMOND": {
					"income": 12,
					"incomeLabel": "12/s",
					"cost": 16e3,
					"costLabel": "16k",
					"value": 11200,
					"valueLabel": "11.20k",
					"image": "R5_DIAMOND.png",
					"imageIsFallback": false
				},
				"RAINBOW": {
					"income": 24,
					"incomeLabel": "24/s",
					"cost": 32e3,
					"costLabel": "32k",
					"value": 22400,
					"valueLabel": "22.40k",
					"image": "R5_RAINBOW.png",
					"imageIsFallback": false
				},
				"BESKAR": {
					"income": 36,
					"incomeLabel": "36/s",
					"cost": 32e3,
					"costLabel": "32k",
					"value": 22400,
					"valueLabel": "22.40k",
					"image": "R5_BESKAR.png",
					"imageIsFallback": false
				},
				"GALACTIC": {
					"income": null,
					"incomeLabel": null,
					"cost": null,
					"costLabel": null,
					"value": null,
					"valueLabel": null,
					"image": "R5_BESKAR.png",
					"imageIsFallback": true
				}
			}
		},
		{
			"slug": "drk-1-probe",
			"name": "DRK-1 PROBE",
			"assetKey": "DRK-1_PROBE",
			"rarity": "common",
			"type": "battle",
			"percentIncome": false,
			"percentValue": null,
			"perk": null,
			"unverified": false,
			"tiers": {
				"DEFAULT": {
					"income": 3,
					"incomeLabel": "3/s",
					"cost": 3e3,
					"costLabel": "3k",
					"value": 2100,
					"valueLabel": "2.10k",
					"image": "DRK-1_PROBE_DEFAULT.png",
					"imageIsFallback": false
				},
				"GOLD": {
					"income": 6,
					"incomeLabel": "6/s",
					"cost": 12e3,
					"costLabel": "12k",
					"value": 8400,
					"valueLabel": "8.40k",
					"image": "DRK-1_PROBE_GOLD.png",
					"imageIsFallback": false
				},
				"DIAMOND": {
					"income": 12,
					"incomeLabel": "12/s",
					"cost": 24e3,
					"costLabel": "24k",
					"value": 16800,
					"valueLabel": "16.80k",
					"image": "DRK-1_PROBE_DIAMOND.png",
					"imageIsFallback": false
				},
				"RAINBOW": {
					"income": 24,
					"incomeLabel": "24/s",
					"cost": 48e3,
					"costLabel": "48k",
					"value": 33600,
					"valueLabel": "33.60k",
					"image": "DRK-1_PROBE_RAINBOW.png",
					"imageIsFallback": false
				},
				"BESKAR": {
					"income": 36,
					"incomeLabel": "36/s",
					"cost": 48e3,
					"costLabel": "48k",
					"value": 33600,
					"valueLabel": "33.60k",
					"image": "DRK-1_PROBE_BESKAR.png",
					"imageIsFallback": false
				},
				"GALACTIC": {
					"income": null,
					"incomeLabel": null,
					"cost": null,
					"costLabel": null,
					"value": null,
					"valueLabel": null,
					"image": "DRK-1_PROBE_BESKAR.png",
					"imageIsFallback": true
				}
			}
		},
		{
			"slug": "gonk",
			"name": "GONK",
			"assetKey": "GONK",
			"rarity": "common",
			"type": "worker",
			"percentIncome": false,
			"percentValue": null,
			"perk": null,
			"unverified": false,
			"tiers": {
				"DEFAULT": {
					"income": 4,
					"incomeLabel": "4/s",
					"cost": 3e3,
					"costLabel": "3k",
					"value": 2100,
					"valueLabel": "2.10k",
					"image": "GONK_DEFAULT.png",
					"imageIsFallback": false
				},
				"GOLD": {
					"income": 8,
					"incomeLabel": "8/s",
					"cost": 12e3,
					"costLabel": "12k",
					"value": 8400,
					"valueLabel": "8.40k",
					"image": "GONK_GOLD.png",
					"imageIsFallback": false
				},
				"DIAMOND": {
					"income": 16,
					"incomeLabel": "16/s",
					"cost": 24e3,
					"costLabel": "24k",
					"value": 16800,
					"valueLabel": "16.80k",
					"image": "GONK_DIAMOND.png",
					"imageIsFallback": false
				},
				"RAINBOW": {
					"income": 32,
					"incomeLabel": "32/s",
					"cost": 48e3,
					"costLabel": "48k",
					"value": 33600,
					"valueLabel": "33.60k",
					"image": "GONK_RAINBOW.png",
					"imageIsFallback": false
				},
				"BESKAR": {
					"income": 48,
					"incomeLabel": "48/s",
					"cost": 48e3,
					"costLabel": "48k",
					"value": 33600,
					"valueLabel": "33.60k",
					"image": "GONK_BESKAR.png",
					"imageIsFallback": false
				},
				"GALACTIC": {
					"income": null,
					"incomeLabel": null,
					"cost": null,
					"costLabel": null,
					"value": null,
					"valueLabel": null,
					"image": "GONK_BESKAR.png",
					"imageIsFallback": true
				}
			}
		},
		{
			"slug": "r8",
			"name": "R8",
			"assetKey": "R8",
			"rarity": "common",
			"type": "astromech",
			"percentIncome": false,
			"percentValue": null,
			"perk": null,
			"unverified": false,
			"tiers": {
				"DEFAULT": {
					"income": 4,
					"incomeLabel": "4/s",
					"cost": 3e3,
					"costLabel": "3k",
					"value": 2100,
					"valueLabel": "2.10k",
					"image": "R8_DEFAULT.png",
					"imageIsFallback": false
				},
				"GOLD": {
					"income": 8,
					"incomeLabel": "8/s",
					"cost": 12e3,
					"costLabel": "12k",
					"value": 8400,
					"valueLabel": "8.40k",
					"image": "R8_GOLD.png",
					"imageIsFallback": false
				},
				"DIAMOND": {
					"income": 16,
					"incomeLabel": "16/s",
					"cost": 24e3,
					"costLabel": "24k",
					"value": 16800,
					"valueLabel": "16.80k",
					"image": "R8_DIAMOND.png",
					"imageIsFallback": false
				},
				"RAINBOW": {
					"income": 32,
					"incomeLabel": "32/s",
					"cost": 48e3,
					"costLabel": "48k",
					"value": 33600,
					"valueLabel": "33.60k",
					"image": "R8_RAINBOW.png",
					"imageIsFallback": false
				},
				"BESKAR": {
					"income": 48,
					"incomeLabel": "48/s",
					"cost": 48e3,
					"costLabel": "48k",
					"value": 33600,
					"valueLabel": "33.60k",
					"image": "R8_BESKAR.png",
					"imageIsFallback": false
				},
				"GALACTIC": {
					"income": null,
					"incomeLabel": null,
					"cost": null,
					"costLabel": null,
					"value": null,
					"valueLabel": null,
					"image": "R8_BESKAR.png",
					"imageIsFallback": true
				}
			}
		},
		{
			"slug": "id10",
			"name": "ID10",
			"assetKey": "ID10",
			"rarity": "common",
			"type": "battle",
			"percentIncome": false,
			"percentValue": null,
			"perk": null,
			"unverified": false,
			"tiers": {
				"DEFAULT": {
					"income": 4,
					"incomeLabel": "4/s",
					"cost": 4e3,
					"costLabel": "4k",
					"value": 2800,
					"valueLabel": "2.80k",
					"image": "ID10_DEFAULT.png",
					"imageIsFallback": false
				},
				"GOLD": {
					"income": 8,
					"incomeLabel": "8/s",
					"cost": 16e3,
					"costLabel": "16k",
					"value": 11200,
					"valueLabel": "11.20k",
					"image": "ID10_GOLD.png",
					"imageIsFallback": false
				},
				"DIAMOND": {
					"income": 16,
					"incomeLabel": "16/s",
					"cost": 32e3,
					"costLabel": "32k",
					"value": 22400,
					"valueLabel": "22.40k",
					"image": "ID10_DIAMOND.png",
					"imageIsFallback": false
				},
				"RAINBOW": {
					"income": 32,
					"incomeLabel": "32/s",
					"cost": 64e3,
					"costLabel": "64k",
					"value": 44800,
					"valueLabel": "44.80k",
					"image": "ID10_RAINBOW.png",
					"imageIsFallback": false
				},
				"BESKAR": {
					"income": 48,
					"incomeLabel": "48/s",
					"cost": 64e3,
					"costLabel": "64k",
					"value": 44800,
					"valueLabel": "44.80k",
					"image": "ID10_BESKAR.png",
					"imageIsFallback": false
				},
				"GALACTIC": {
					"income": null,
					"incomeLabel": null,
					"cost": null,
					"costLabel": null,
					"value": null,
					"valueLabel": null,
					"image": "ID10_BESKAR.png",
					"imageIsFallback": true
				}
			}
		},
		{
			"slug": "b1-battle",
			"name": "B1 BATTLE",
			"assetKey": "B1_BATTLE",
			"rarity": "common",
			"type": "battle",
			"percentIncome": false,
			"percentValue": null,
			"perk": null,
			"unverified": false,
			"tiers": {
				"DEFAULT": {
					"income": 5,
					"incomeLabel": "5/s",
					"cost": 4e3,
					"costLabel": "4k",
					"value": 2800,
					"valueLabel": "2.80k",
					"image": "B1_BATTLE_DEFAULT.png",
					"imageIsFallback": false
				},
				"GOLD": {
					"income": 10,
					"incomeLabel": "10/s",
					"cost": 16e3,
					"costLabel": "16k",
					"value": 11200,
					"valueLabel": "11.20k",
					"image": "B1_BATTLE_GOLD.png",
					"imageIsFallback": false
				},
				"DIAMOND": {
					"income": 20,
					"incomeLabel": "20/s",
					"cost": 32e3,
					"costLabel": "32k",
					"value": 22400,
					"valueLabel": "22.40k",
					"image": "B1_BATTLE_DIAMOND.png",
					"imageIsFallback": false
				},
				"RAINBOW": {
					"income": 40,
					"incomeLabel": "40/s",
					"cost": 64e3,
					"costLabel": "64k",
					"value": 44800,
					"valueLabel": "44.80k",
					"image": "B1_BATTLE_RAINBOW.png",
					"imageIsFallback": false
				},
				"BESKAR": {
					"income": 60,
					"incomeLabel": "60/s",
					"cost": 64e3,
					"costLabel": "64k",
					"value": 44800,
					"valueLabel": "44.80k",
					"image": "B1_BATTLE_BESKAR.png",
					"imageIsFallback": false
				},
				"GALACTIC": {
					"income": null,
					"incomeLabel": null,
					"cost": null,
					"costLabel": null,
					"value": null,
					"valueLabel": null,
					"image": "B1_BATTLE_BESKAR.png",
					"imageIsFallback": true
				}
			}
		},
		{
			"slug": "imperial-probe",
			"name": "IMPERIAL PROBE",
			"assetKey": "IMPERIAL_PROBE",
			"rarity": "common",
			"type": "battle",
			"percentIncome": false,
			"percentValue": null,
			"perk": null,
			"unverified": false,
			"tiers": {
				"DEFAULT": {
					"income": 6,
					"incomeLabel": "6/s",
					"cost": 5e3,
					"costLabel": "5k",
					"value": 3500,
					"valueLabel": "3.50k",
					"image": "IMPERIAL_PROBE_DEFAULT.png",
					"imageIsFallback": false
				},
				"GOLD": {
					"income": 12,
					"incomeLabel": "12/s",
					"cost": 2e4,
					"costLabel": "20k",
					"value": 14e3,
					"valueLabel": "14.00k",
					"image": "IMPERIAL_PROBE_GOLD.png",
					"imageIsFallback": false
				},
				"DIAMOND": {
					"income": 24,
					"incomeLabel": "24/s",
					"cost": 4e4,
					"costLabel": "40k",
					"value": 28e3,
					"valueLabel": "28.00k",
					"image": "IMPERIAL_PROBE_DIAMOND.png",
					"imageIsFallback": false
				},
				"RAINBOW": {
					"income": 48,
					"incomeLabel": "48/s",
					"cost": 8e4,
					"costLabel": "80k",
					"value": 56e3,
					"valueLabel": "56.00k",
					"image": "IMPERIAL_PROBE_RAINBOW.png",
					"imageIsFallback": false
				},
				"BESKAR": {
					"income": 72,
					"incomeLabel": "72/s",
					"cost": 8e4,
					"costLabel": "80k",
					"value": 56e3,
					"valueLabel": "56.00k",
					"image": "IMPERIAL_PROBE_BESKAR.png",
					"imageIsFallback": false
				},
				"GALACTIC": {
					"income": null,
					"incomeLabel": null,
					"cost": null,
					"costLabel": null,
					"value": null,
					"valueLabel": null,
					"image": "IMPERIAL_PROBE_BESKAR.png",
					"imageIsFallback": true
				}
			}
		},
		{
			"slug": "bdx-explorer",
			"name": "BDX EXPLORER",
			"assetKey": "BDX_EXPLORER",
			"rarity": "rare",
			"type": "worker",
			"percentIncome": false,
			"percentValue": null,
			"perk": null,
			"unverified": false,
			"tiers": {
				"DEFAULT": {
					"income": 15,
					"incomeLabel": "15/s",
					"cost": 25e3,
					"costLabel": "25k",
					"value": 17500,
					"valueLabel": "17.50k",
					"image": "BDX_EXPLORER_DEFAULT.png",
					"imageIsFallback": false
				},
				"GOLD": {
					"income": 30,
					"incomeLabel": "30/s",
					"cost": 1e5,
					"costLabel": "100k",
					"value": 7e4,
					"valueLabel": "70.00k",
					"image": "BDX_EXPLORER_GOLD.png",
					"imageIsFallback": false
				},
				"DIAMOND": {
					"income": 60,
					"incomeLabel": "60/s",
					"cost": 2e5,
					"costLabel": "200k",
					"value": 14e4,
					"valueLabel": "140.00k",
					"image": "BDX_EXPLORER_DIAMOND.png",
					"imageIsFallback": false
				},
				"RAINBOW": {
					"income": 120,
					"incomeLabel": "120/s",
					"cost": 4e5,
					"costLabel": "400k",
					"value": 28e4,
					"valueLabel": "280.00k",
					"image": "BDX_EXPLORER_RAINBOW.png",
					"imageIsFallback": false
				},
				"BESKAR": {
					"income": 180,
					"incomeLabel": "180/s",
					"cost": 4e5,
					"costLabel": "400k",
					"value": 28e4,
					"valueLabel": "280.00k",
					"image": "BDX_EXPLORER_BESKAR.png",
					"imageIsFallback": false
				},
				"GALACTIC": {
					"income": null,
					"incomeLabel": null,
					"cost": null,
					"costLabel": null,
					"value": null,
					"valueLabel": null,
					"image": "BDX_EXPLORER_BESKAR.png",
					"imageIsFallback": true
				}
			}
		},
		{
			"slug": "2bb",
			"name": "2BB",
			"assetKey": "2BB",
			"rarity": "rare",
			"type": "astromech",
			"percentIncome": false,
			"percentValue": null,
			"perk": null,
			"unverified": false,
			"tiers": {
				"DEFAULT": {
					"income": 17,
					"incomeLabel": "17/s",
					"cost": 3e4,
					"costLabel": "30k",
					"value": 21e3,
					"valueLabel": "21.00k",
					"image": "2BB_DEFAULT.png",
					"imageIsFallback": false
				},
				"GOLD": {
					"income": 34,
					"incomeLabel": "34/s",
					"cost": 12e4,
					"costLabel": "120k",
					"value": 84e3,
					"valueLabel": "84.00k",
					"image": "2BB_GOLD.png",
					"imageIsFallback": false
				},
				"DIAMOND": {
					"income": 68,
					"incomeLabel": "68/s",
					"cost": 24e4,
					"costLabel": "240k",
					"value": 168e3,
					"valueLabel": "168.00k",
					"image": "2BB_DIAMOND.png",
					"imageIsFallback": false
				},
				"RAINBOW": {
					"income": 136,
					"incomeLabel": "136/s",
					"cost": 48e4,
					"costLabel": "480k",
					"value": 336e3,
					"valueLabel": "336.00k",
					"image": "2BB_RAINBOW.png",
					"imageIsFallback": false
				},
				"BESKAR": {
					"income": 204,
					"incomeLabel": "204/s",
					"cost": 48e4,
					"costLabel": "480k",
					"value": 336e3,
					"valueLabel": "336.00k",
					"image": "2BB_BESKAR.png",
					"imageIsFallback": false
				},
				"GALACTIC": {
					"income": null,
					"incomeLabel": null,
					"cost": null,
					"costLabel": null,
					"value": null,
					"valueLabel": null,
					"image": "2BB_BESKAR.png",
					"imageIsFallback": true
				}
			}
		},
		{
			"slug": "nav-ex",
			"name": "NAV-EX",
			"assetKey": "NAV-EX",
			"rarity": "rare",
			"type": "battle",
			"percentIncome": false,
			"percentValue": null,
			"perk": null,
			"unverified": false,
			"tiers": {
				"DEFAULT": {
					"income": 18,
					"incomeLabel": "18/s",
					"cost": 36e3,
					"costLabel": "36k",
					"value": 25200,
					"valueLabel": "25.20k",
					"image": "NAV-EX_DEFAULT.png",
					"imageIsFallback": false
				},
				"GOLD": {
					"income": 36,
					"incomeLabel": "36/s",
					"cost": 144e3,
					"costLabel": "144k",
					"value": 100800,
					"valueLabel": "100.80k",
					"image": "NAV-EX_GOLD.png",
					"imageIsFallback": false
				},
				"DIAMOND": {
					"income": 72,
					"incomeLabel": "72/s",
					"cost": 288e3,
					"costLabel": "288k",
					"value": 201600,
					"valueLabel": "201.60k",
					"image": "NAV-EX_DIAMOND.png",
					"imageIsFallback": false
				},
				"RAINBOW": {
					"income": 144,
					"incomeLabel": "144/s",
					"cost": 576e3,
					"costLabel": "576k",
					"value": 403200,
					"valueLabel": "403.20k",
					"image": "NAV-EX_RAINBOW.png",
					"imageIsFallback": false
				},
				"BESKAR": {
					"income": 216,
					"incomeLabel": "216/s",
					"cost": 576e3,
					"costLabel": "576k",
					"value": 403200,
					"valueLabel": "403.20k",
					"image": "NAV-EX_BESKAR.png",
					"imageIsFallback": false
				},
				"GALACTIC": {
					"income": null,
					"incomeLabel": null,
					"cost": null,
					"costLabel": null,
					"value": null,
					"valueLabel": null,
					"image": "NAV-EX_BESKAR.png",
					"imageIsFallback": true
				}
			}
		},
		{
			"slug": "bal-core",
			"name": "BAL-CORE",
			"assetKey": "BAL-CORE",
			"rarity": "rare",
			"type": "worker",
			"percentIncome": false,
			"percentValue": null,
			"perk": null,
			"unverified": false,
			"tiers": {
				"DEFAULT": {
					"income": 23,
					"incomeLabel": "23/s",
					"cost": 43e3,
					"costLabel": "43k",
					"value": 30100,
					"valueLabel": "30.10k",
					"image": "BAL-CORE_DEFAULT.png",
					"imageIsFallback": false
				},
				"GOLD": {
					"income": 46,
					"incomeLabel": "46/s",
					"cost": 172e3,
					"costLabel": "172k",
					"value": 120400,
					"valueLabel": "120.40k",
					"image": "BAL-CORE_GOLD.png",
					"imageIsFallback": false
				},
				"DIAMOND": {
					"income": 92,
					"incomeLabel": "92/s",
					"cost": 344e3,
					"costLabel": "344k",
					"value": 240800,
					"valueLabel": "240.80k",
					"image": "BAL-CORE_DIAMOND.png",
					"imageIsFallback": false
				},
				"RAINBOW": {
					"income": 184,
					"incomeLabel": "184/s",
					"cost": 688e3,
					"costLabel": "688k",
					"value": 481600,
					"valueLabel": "481.60k",
					"image": "BAL-CORE_RAINBOW.png",
					"imageIsFallback": false
				},
				"BESKAR": {
					"income": 276,
					"incomeLabel": "276/s",
					"cost": 688e3,
					"costLabel": "688k",
					"value": 481600,
					"valueLabel": "481.60k",
					"image": "BAL-CORE_BESKAR.png",
					"imageIsFallback": false
				},
				"GALACTIC": {
					"income": null,
					"incomeLabel": null,
					"cost": null,
					"costLabel": null,
					"value": null,
					"valueLabel": null,
					"image": "BAL-CORE_BESKAR.png",
					"imageIsFallback": true
				}
			}
		},
		{
			"slug": "vect-arm",
			"name": "VECT-ARM",
			"assetKey": "VECT-ARM",
			"rarity": "rare",
			"type": "battle",
			"percentIncome": false,
			"percentValue": null,
			"perk": null,
			"unverified": false,
			"tiers": {
				"DEFAULT": {
					"income": 27,
					"incomeLabel": "27/s",
					"cost": 52e3,
					"costLabel": "52k",
					"value": 36400,
					"valueLabel": "36.40k",
					"image": "VECT-ARM_DEFAULT.png",
					"imageIsFallback": false
				},
				"GOLD": {
					"income": 54,
					"incomeLabel": "54/s",
					"cost": 208e3,
					"costLabel": "208k",
					"value": 145600,
					"valueLabel": "145.60k",
					"image": "VECT-ARM_GOLD.png",
					"imageIsFallback": false
				},
				"DIAMOND": {
					"income": 108,
					"incomeLabel": "108/s",
					"cost": 416e3,
					"costLabel": "416k",
					"value": 291200,
					"valueLabel": "291.20k",
					"image": "VECT-ARM_DIAMOND.png",
					"imageIsFallback": false
				},
				"RAINBOW": {
					"income": 216,
					"incomeLabel": "216/s",
					"cost": 832e3,
					"costLabel": "832k",
					"value": 582400,
					"valueLabel": "582.40k",
					"image": "VECT-ARM_RAINBOW.png",
					"imageIsFallback": false
				},
				"BESKAR": {
					"income": 324,
					"incomeLabel": "324/s",
					"cost": 832e3,
					"costLabel": "832k",
					"value": 582400,
					"valueLabel": "582.40k",
					"image": "VECT-ARM_BESKAR.png",
					"imageIsFallback": false
				},
				"GALACTIC": {
					"income": null,
					"incomeLabel": null,
					"cost": null,
					"costLabel": null,
					"value": null,
					"valueLabel": null,
					"image": "VECT-ARM_BESKAR.png",
					"imageIsFallback": true
				}
			}
		},
		{
			"slug": "roll-r",
			"name": "ROLL-R",
			"assetKey": "ROLL-R",
			"rarity": "rare",
			"type": "worker",
			"percentIncome": false,
			"percentValue": null,
			"perk": null,
			"unverified": false,
			"tiers": {
				"DEFAULT": {
					"income": 31,
					"incomeLabel": "31/s",
					"cost": 62e3,
					"costLabel": "62k",
					"value": 43400,
					"valueLabel": "43.40k",
					"image": "ROLL-R_DEFAULT.png",
					"imageIsFallback": false
				},
				"GOLD": {
					"income": 62,
					"incomeLabel": "62/s",
					"cost": 248e3,
					"costLabel": "248k",
					"value": 173600,
					"valueLabel": "173.60k",
					"image": "ROLL-R_GOLD.png",
					"imageIsFallback": false
				},
				"DIAMOND": {
					"income": 124,
					"incomeLabel": "124/s",
					"cost": 496e3,
					"costLabel": "496k",
					"value": 347200,
					"valueLabel": "347.20k",
					"image": "ROLL-R_DIAMOND.png",
					"imageIsFallback": false
				},
				"RAINBOW": {
					"income": 248,
					"incomeLabel": "248/s",
					"cost": 992e3,
					"costLabel": "992k",
					"value": 694400,
					"valueLabel": "694.40k",
					"image": "ROLL-R_RAINBOW.png",
					"imageIsFallback": false
				},
				"BESKAR": {
					"income": 372,
					"incomeLabel": "372/s",
					"cost": 992e3,
					"costLabel": "992k",
					"value": 694400,
					"valueLabel": "694.40k",
					"image": "ROLL-R_BESKAR.png",
					"imageIsFallback": false
				},
				"GALACTIC": {
					"income": null,
					"incomeLabel": null,
					"cost": null,
					"costLabel": null,
					"value": null,
					"valueLabel": null,
					"image": "ROLL-R_BESKAR.png",
					"imageIsFallback": true
				}
			}
		},
		{
			"slug": "a-lt",
			"name": "A-LT",
			"assetKey": "A-LT",
			"rarity": "rare",
			"type": "astromech",
			"percentIncome": false,
			"percentValue": null,
			"perk": null,
			"unverified": false,
			"tiers": {
				"DEFAULT": {
					"income": 36,
					"incomeLabel": "36/s",
					"cost": 74e3,
					"costLabel": "74k",
					"value": 51800,
					"valueLabel": "51.80k",
					"image": "A-LT_DEFAULT.png",
					"imageIsFallback": false
				},
				"GOLD": {
					"income": 72,
					"incomeLabel": "72/s",
					"cost": 296e3,
					"costLabel": "296k",
					"value": 207200,
					"valueLabel": "207.20k",
					"image": "A-LT_GOLD.png",
					"imageIsFallback": false
				},
				"DIAMOND": {
					"income": 144,
					"incomeLabel": "144/s",
					"cost": 592e3,
					"costLabel": "592k",
					"value": 414400,
					"valueLabel": "414.40k",
					"image": "A-LT_DIAMOND.png",
					"imageIsFallback": false
				},
				"RAINBOW": {
					"income": 288,
					"incomeLabel": "288/s",
					"cost": 118e4,
					"costLabel": "1.18m",
					"value": 828800,
					"valueLabel": "828.80k",
					"image": "A-LT_RAINBOW.png",
					"imageIsFallback": false
				},
				"BESKAR": {
					"income": 432,
					"incomeLabel": "432/s",
					"cost": 118e4,
					"costLabel": "1.18m",
					"value": 828800,
					"valueLabel": "828.80k",
					"image": "A-LT_BESKAR.png",
					"imageIsFallback": false
				},
				"GALACTIC": {
					"income": null,
					"incomeLabel": null,
					"cost": null,
					"costLabel": null,
					"value": null,
					"valueLabel": null,
					"image": "A-LT_BESKAR.png",
					"imageIsFallback": true
				}
			}
		},
		{
			"slug": "arg",
			"name": "ARG",
			"assetKey": "ARG",
			"rarity": "rare",
			"type": "worker",
			"percentIncome": false,
			"percentValue": null,
			"perk": null,
			"unverified": false,
			"tiers": {
				"DEFAULT": {
					"income": 42,
					"incomeLabel": "42/s",
					"cost": 88e3,
					"costLabel": "88k",
					"value": 61600,
					"valueLabel": "61.60k",
					"image": "ARG_DEFAULT.png",
					"imageIsFallback": false
				},
				"GOLD": {
					"income": 84,
					"incomeLabel": "84/s",
					"cost": 352e3,
					"costLabel": "352k",
					"value": 246400,
					"valueLabel": "246.40k",
					"image": "ARG_GOLD.png",
					"imageIsFallback": false
				},
				"DIAMOND": {
					"income": 168,
					"incomeLabel": "168/s",
					"cost": 704e3,
					"costLabel": "704k",
					"value": 492800,
					"valueLabel": "492.80k",
					"image": "ARG_DIAMOND.png",
					"imageIsFallback": false
				},
				"RAINBOW": {
					"income": 336,
					"incomeLabel": "336/s",
					"cost": 141e4,
					"costLabel": "1.41m",
					"value": 985600,
					"valueLabel": "985.60k",
					"image": "ARG_RAINBOW.png",
					"imageIsFallback": false
				},
				"BESKAR": {
					"income": 504,
					"incomeLabel": "504/s",
					"cost": 141e4,
					"costLabel": "1.41m",
					"value": 985600,
					"valueLabel": "985.60k",
					"image": "ARG_BESKAR.png",
					"imageIsFallback": false
				},
				"GALACTIC": {
					"income": null,
					"incomeLabel": null,
					"cost": null,
					"costLabel": null,
					"value": null,
					"valueLabel": null,
					"image": "ARG_BESKAR.png",
					"imageIsFallback": true
				}
			}
		},
		{
			"slug": "senate-hovercam",
			"name": "SENATE HOVERCAM",
			"assetKey": "SENATE_HOVERCAM",
			"rarity": "rare",
			"type": "worker",
			"percentIncome": false,
			"percentValue": null,
			"perk": null,
			"unverified": false,
			"tiers": {
				"DEFAULT": {
					"income": 46,
					"incomeLabel": "46/s",
					"cost": 1e5,
					"costLabel": "100k",
					"value": 7e4,
					"valueLabel": "70.00k",
					"image": "SENATE_HOVERCAM_DEFAULT.png",
					"imageIsFallback": false
				},
				"GOLD": {
					"income": 92,
					"incomeLabel": "92/s",
					"cost": 4e5,
					"costLabel": "400k",
					"value": 28e4,
					"valueLabel": "280.00k",
					"image": "SENATE_HOVERCAM_GOLD.png",
					"imageIsFallback": false
				},
				"DIAMOND": {
					"income": 184,
					"incomeLabel": "184/s",
					"cost": 8e5,
					"costLabel": "800k",
					"value": 56e4,
					"valueLabel": "560.00k",
					"image": "SENATE_HOVERCAM_DIAMOND.png",
					"imageIsFallback": false
				},
				"RAINBOW": {
					"income": 368,
					"incomeLabel": "368/s",
					"cost": 16e5,
					"costLabel": "1.60m",
					"value": 112e4,
					"valueLabel": "1.12m",
					"image": "SENATE_HOVERCAM_RAINBOW.png",
					"imageIsFallback": false
				},
				"BESKAR": {
					"income": 552,
					"incomeLabel": "552/s",
					"cost": 16e5,
					"costLabel": "1.60m",
					"value": 112e4,
					"valueLabel": "1.12m",
					"image": "SENATE_HOVERCAM_BESKAR.png",
					"imageIsFallback": false
				},
				"GALACTIC": {
					"income": null,
					"incomeLabel": null,
					"cost": null,
					"costLabel": null,
					"value": null,
					"valueLabel": null,
					"image": "SENATE_HOVERCAM_BESKAR.png",
					"imageIsFallback": true
				}
			}
		},
		{
			"slug": "r4",
			"name": "R4",
			"assetKey": "R4",
			"rarity": "rare",
			"type": "astromech",
			"percentIncome": false,
			"percentValue": null,
			"perk": null,
			"unverified": false,
			"tiers": {
				"DEFAULT": {
					"income": 50,
					"incomeLabel": "50/s",
					"cost": 11e4,
					"costLabel": "110k",
					"value": 77e3,
					"valueLabel": "77.00k",
					"image": "R4_DEFAULT.png",
					"imageIsFallback": false
				},
				"GOLD": {
					"income": 100,
					"incomeLabel": "100/s",
					"cost": 44e4,
					"costLabel": "440k",
					"value": 308e3,
					"valueLabel": "308.00k",
					"image": "R4_GOLD.png",
					"imageIsFallback": false
				},
				"DIAMOND": {
					"income": 200,
					"incomeLabel": "200/s",
					"cost": 88e4,
					"costLabel": "880k",
					"value": 616e3,
					"valueLabel": "616.00k",
					"image": "R4_DIAMOND.png",
					"imageIsFallback": false
				},
				"RAINBOW": {
					"income": 400,
					"incomeLabel": "400/s",
					"cost": 176e4,
					"costLabel": "1.76m",
					"value": 123e4,
					"valueLabel": "1.23m",
					"image": "R4_RAINBOW.png",
					"imageIsFallback": false
				},
				"BESKAR": {
					"income": 600,
					"incomeLabel": "600/s",
					"cost": 176e4,
					"costLabel": "1.76m",
					"value": 123e4,
					"valueLabel": "1.23m",
					"image": "R4_BESKAR.png",
					"imageIsFallback": false
				},
				"GALACTIC": {
					"income": null,
					"incomeLabel": null,
					"cost": null,
					"costLabel": null,
					"value": null,
					"valueLabel": null,
					"image": "R4_BESKAR.png",
					"imageIsFallback": true
				}
			}
		},
		{
			"slug": "r9",
			"name": "R9",
			"assetKey": "R9",
			"rarity": "rare",
			"type": "astromech",
			"percentIncome": false,
			"percentValue": null,
			"perk": null,
			"unverified": false,
			"tiers": {
				"DEFAULT": {
					"income": 54,
					"incomeLabel": "54/s",
					"cost": 12e4,
					"costLabel": "120k",
					"value": 84e3,
					"valueLabel": "84.00k",
					"image": "R9_DEFAULT.png",
					"imageIsFallback": false
				},
				"GOLD": {
					"income": 108,
					"incomeLabel": "108/s",
					"cost": 48e4,
					"costLabel": "480k",
					"value": 336e3,
					"valueLabel": "336.00k",
					"image": "R9_GOLD.png",
					"imageIsFallback": false
				},
				"DIAMOND": {
					"income": 216,
					"incomeLabel": "216/s",
					"cost": 96e4,
					"costLabel": "960k",
					"value": 672e3,
					"valueLabel": "672.00k",
					"image": "R9_DIAMOND.png",
					"imageIsFallback": false
				},
				"RAINBOW": {
					"income": 432,
					"incomeLabel": "432/s",
					"cost": 192e4,
					"costLabel": "1.92m",
					"value": 134e4,
					"valueLabel": "1.34m",
					"image": "R9_RAINBOW.png",
					"imageIsFallback": false
				},
				"BESKAR": {
					"income": 648,
					"incomeLabel": "648/s",
					"cost": 192e4,
					"costLabel": "1.92m",
					"value": 134e4,
					"valueLabel": "1.34m",
					"image": "R9_BESKAR.png",
					"imageIsFallback": false
				},
				"GALACTIC": {
					"income": null,
					"incomeLabel": null,
					"cost": null,
					"costLabel": null,
					"value": null,
					"valueLabel": null,
					"image": "R9_BESKAR.png",
					"imageIsFallback": true
				}
			}
		},
		{
			"slug": "bu-4d",
			"name": "BU-4D",
			"assetKey": "BU-4D",
			"rarity": "rare",
			"type": "worker",
			"percentIncome": false,
			"percentValue": null,
			"perk": null,
			"unverified": false,
			"tiers": {
				"DEFAULT": {
					"income": 58,
					"incomeLabel": "58/s",
					"cost": 13e4,
					"costLabel": "130k",
					"value": 91e3,
					"valueLabel": "91.00k",
					"image": "BU-4D_DEFAULT.png",
					"imageIsFallback": false
				},
				"GOLD": {
					"income": 116,
					"incomeLabel": "116/s",
					"cost": 52e4,
					"costLabel": "520k",
					"value": 364e3,
					"valueLabel": "364.00k",
					"image": "BU-4D_GOLD.png",
					"imageIsFallback": false
				},
				"DIAMOND": {
					"income": 232,
					"incomeLabel": "232/s",
					"cost": 104e4,
					"costLabel": "1.04m",
					"value": 728e3,
					"valueLabel": "728.00k",
					"image": "BU-4D_DIAMOND.png",
					"imageIsFallback": false
				},
				"RAINBOW": {
					"income": 464,
					"incomeLabel": "464/s",
					"cost": 208e4,
					"costLabel": "2.08m",
					"value": 146e4,
					"valueLabel": "1.46m",
					"image": "BU-4D_RAINBOW.png",
					"imageIsFallback": false
				},
				"BESKAR": {
					"income": 696,
					"incomeLabel": "696/s",
					"cost": 208e4,
					"costLabel": "2.08m",
					"value": 146e4,
					"valueLabel": "1.46m",
					"image": "BU-4D_BESKAR.png",
					"imageIsFallback": false
				},
				"GALACTIC": {
					"income": null,
					"incomeLabel": null,
					"cost": null,
					"costLabel": null,
					"value": null,
					"valueLabel": null,
					"image": "BU-4D_BESKAR.png",
					"imageIsFallback": true
				}
			}
		},
		{
			"slug": "hov-r",
			"name": "HOV-R",
			"assetKey": "HOV-R",
			"rarity": "rare",
			"type": "battle",
			"percentIncome": false,
			"percentValue": null,
			"perk": null,
			"unverified": false,
			"tiers": {
				"DEFAULT": {
					"income": 62,
					"incomeLabel": "62/s",
					"cost": 14e4,
					"costLabel": "140k",
					"value": 98e3,
					"valueLabel": "98.00k",
					"image": "HOV-R_DEFAULT.png",
					"imageIsFallback": false
				},
				"GOLD": {
					"income": 124,
					"incomeLabel": "124/s",
					"cost": 56e4,
					"costLabel": "560k",
					"value": 392e3,
					"valueLabel": "392.00k",
					"image": "HOV-R_GOLD.png",
					"imageIsFallback": false
				},
				"DIAMOND": {
					"income": 248,
					"incomeLabel": "248/s",
					"cost": 112e4,
					"costLabel": "1.12m",
					"value": 784e3,
					"valueLabel": "784.00k",
					"image": "HOV-R_DIAMOND.png",
					"imageIsFallback": false
				},
				"RAINBOW": {
					"income": 496,
					"incomeLabel": "496/s",
					"cost": 224e4,
					"costLabel": "2.24m",
					"value": 157e4,
					"valueLabel": "1.57m",
					"image": "HOV-R_RAINBOW.png",
					"imageIsFallback": false
				},
				"BESKAR": {
					"income": 744,
					"incomeLabel": "744/s",
					"cost": 224e4,
					"costLabel": "2.24m",
					"value": 157e4,
					"valueLabel": "1.57m",
					"image": "HOV-R_BESKAR.png",
					"imageIsFallback": false
				},
				"GALACTIC": {
					"income": null,
					"incomeLabel": null,
					"cost": null,
					"costLabel": null,
					"value": null,
					"valueLabel": null,
					"image": "HOV-R_BESKAR.png",
					"imageIsFallback": true
				}
			}
		},
		{
			"slug": "b1-security",
			"name": "B1 SECURITY",
			"assetKey": "B1_SECURITY",
			"rarity": "rare",
			"type": "battle",
			"percentIncome": false,
			"percentValue": null,
			"perk": null,
			"unverified": false,
			"tiers": {
				"DEFAULT": {
					"income": 66,
					"incomeLabel": "66/s",
					"cost": 15e4,
					"costLabel": "150k",
					"value": 105e3,
					"valueLabel": "105k",
					"image": "B1_SECURITY_DEFAULT.png",
					"imageIsFallback": false
				},
				"GOLD": {
					"income": 132,
					"incomeLabel": "132/s",
					"cost": 6e5,
					"costLabel": "600k",
					"value": 42e4,
					"valueLabel": "420.00k",
					"image": "B1_SECURITY_GOLD.png",
					"imageIsFallback": false
				},
				"DIAMOND": {
					"income": 264,
					"incomeLabel": "264/s",
					"cost": 12e5,
					"costLabel": "1.20m",
					"value": 84e4,
					"valueLabel": "840.00k",
					"image": "B1_SECURITY_DIAMOND.png",
					"imageIsFallback": false
				},
				"RAINBOW": {
					"income": 528,
					"incomeLabel": "528/s",
					"cost": 24e5,
					"costLabel": "2.40m",
					"value": 168e4,
					"valueLabel": "1.68m",
					"image": "B1_SECURITY_RAINBOW.png",
					"imageIsFallback": false
				},
				"BESKAR": {
					"income": 792,
					"incomeLabel": "792/s",
					"cost": 24e5,
					"costLabel": "2.40m",
					"value": 168e4,
					"valueLabel": "1.68m",
					"image": "B1_SECURITY_BESKAR.png",
					"imageIsFallback": false
				},
				"GALACTIC": {
					"income": null,
					"incomeLabel": null,
					"cost": null,
					"costLabel": null,
					"value": null,
					"valueLabel": null,
					"image": "B1_SECURITY_BESKAR.png",
					"imageIsFallback": true
				}
			}
		},
		{
			"slug": "groundmech",
			"name": "GROUNDMECH",
			"assetKey": "GROUNDMECH",
			"rarity": "epic",
			"type": "worker",
			"percentIncome": false,
			"percentValue": null,
			"perk": null,
			"unverified": false,
			"tiers": {
				"DEFAULT": {
					"income": 120,
					"incomeLabel": "120/s",
					"cost": 9e5,
					"costLabel": "900k",
					"value": 63e4,
					"valueLabel": "630.00k",
					"image": "GROUNDMECH_DEFAULT.png",
					"imageIsFallback": false
				},
				"GOLD": {
					"income": 240,
					"incomeLabel": "240/s",
					"cost": 36e5,
					"costLabel": "3.60m",
					"value": 252e4,
					"valueLabel": "2.52m",
					"image": "GROUNDMECH_GOLD.png",
					"imageIsFallback": false
				},
				"DIAMOND": {
					"income": 480,
					"incomeLabel": "480/s",
					"cost": 72e5,
					"costLabel": "7.20m",
					"value": 504e4,
					"valueLabel": "5.04m",
					"image": "GROUNDMECH_DIAMOND.png",
					"imageIsFallback": false
				},
				"RAINBOW": {
					"income": 960,
					"incomeLabel": "960/s",
					"cost": 144e5,
					"costLabel": "14.40m",
					"value": 1008e4,
					"valueLabel": "10.08m",
					"image": "GROUNDMECH_RAINBOW.png",
					"imageIsFallback": false
				},
				"BESKAR": {
					"income": 4080,
					"incomeLabel": "4.08k/s",
					"cost": 1125e5,
					"costLabel": "112.50m",
					"value": 7875e4,
					"valueLabel": "78.75m",
					"image": "GROUNDMECH_BESKAR.png",
					"imageIsFallback": false
				},
				"GALACTIC": {
					"income": null,
					"incomeLabel": null,
					"cost": null,
					"costLabel": null,
					"value": null,
					"valueLabel": null,
					"image": "GROUNDMECH_BESKAR.png",
					"imageIsFallback": true
				}
			}
		},
		{
			"slug": "bb",
			"name": "BB",
			"assetKey": "BB",
			"rarity": "epic",
			"type": "astromech",
			"percentIncome": false,
			"percentValue": null,
			"perk": null,
			"unverified": false,
			"tiers": {
				"DEFAULT": {
					"income": 150,
					"incomeLabel": "150/s",
					"cost": 12e5,
					"costLabel": "1.20m",
					"value": 84e4,
					"valueLabel": "840.00k",
					"image": "BB_DEFAULT.png",
					"imageIsFallback": false
				},
				"GOLD": {
					"income": 300,
					"incomeLabel": "300/s",
					"cost": 48e5,
					"costLabel": "4.80m",
					"value": 336e4,
					"valueLabel": "3.36m",
					"image": "BB_GOLD.png",
					"imageIsFallback": false
				},
				"DIAMOND": {
					"income": 600,
					"incomeLabel": "600/s",
					"cost": 96e5,
					"costLabel": "9.60m",
					"value": 672e4,
					"valueLabel": "6.72m",
					"image": "BB_DIAMOND.png",
					"imageIsFallback": false
				},
				"RAINBOW": {
					"income": 1200,
					"incomeLabel": "1.20k/s",
					"cost": 192e5,
					"costLabel": "19.20m",
					"value": 1344e4,
					"valueLabel": "13.44m",
					"image": "BB_RAINBOW.png",
					"imageIsFallback": false
				},
				"BESKAR": {
					"income": 5100,
					"incomeLabel": "5.10k/s",
					"cost": 15e7,
					"costLabel": "150m",
					"value": 105e6,
					"valueLabel": "105m",
					"image": "BB_BESKAR.png",
					"imageIsFallback": false
				},
				"GALACTIC": {
					"income": null,
					"incomeLabel": null,
					"cost": null,
					"costLabel": null,
					"value": null,
					"valueLabel": null,
					"image": "BB_BESKAR.png",
					"imageIsFallback": true
				}
			}
		},
		{
			"slug": "orb-walker",
			"name": "ORB-WALKER",
			"assetKey": "ORB-WALKER",
			"rarity": "epic",
			"type": "astromech",
			"percentIncome": false,
			"percentValue": null,
			"perk": null,
			"unverified": false,
			"tiers": {
				"DEFAULT": {
					"income": 180,
					"incomeLabel": "180/s",
					"cost": 15e5,
					"costLabel": "1.50m",
					"value": 105e4,
					"valueLabel": "1.05m",
					"image": "ORB-WALKER_DEFAULT.png",
					"imageIsFallback": false
				},
				"GOLD": {
					"income": 360,
					"incomeLabel": "360/s",
					"cost": 6e6,
					"costLabel": "6m",
					"value": 42e5,
					"valueLabel": "4.20m",
					"image": "ORB-WALKER_GOLD.png",
					"imageIsFallback": false
				},
				"DIAMOND": {
					"income": 720,
					"incomeLabel": "720/s",
					"cost": 12e6,
					"costLabel": "12m",
					"value": 84e5,
					"valueLabel": "8.40m",
					"image": "ORB-WALKER_DIAMOND.png",
					"imageIsFallback": false
				},
				"RAINBOW": {
					"income": 1440,
					"incomeLabel": "1.44k/s",
					"cost": 24e6,
					"costLabel": "24m",
					"value": 168e5,
					"valueLabel": "16.80m",
					"image": "ORB-WALKER_RAINBOW.png",
					"imageIsFallback": false
				},
				"BESKAR": {
					"income": 6120,
					"incomeLabel": "6.12k/s",
					"cost": 1875e5,
					"costLabel": "187.50m",
					"value": 13125e4,
					"valueLabel": "131.25m",
					"image": "ORB-WALKER_BESKAR.png",
					"imageIsFallback": false
				},
				"GALACTIC": {
					"income": null,
					"incomeLabel": null,
					"cost": null,
					"costLabel": null,
					"value": null,
					"valueLabel": null,
					"image": "ORB-WALKER_BESKAR.png",
					"imageIsFallback": true
				}
			}
		},
		{
			"slug": "util-tec",
			"name": "UTIL-TEC",
			"assetKey": "UTIL-TEC",
			"rarity": "epic",
			"type": "astromech",
			"percentIncome": false,
			"percentValue": null,
			"perk": null,
			"unverified": false,
			"tiers": {
				"DEFAULT": {
					"income": 210,
					"incomeLabel": "210/s",
					"cost": 18e5,
					"costLabel": "1.80m",
					"value": 126e4,
					"valueLabel": "1.26m",
					"image": "UTIL-TEC_DEFAULT.png",
					"imageIsFallback": false
				},
				"GOLD": {
					"income": 420,
					"incomeLabel": "420/s",
					"cost": 72e5,
					"costLabel": "7.20m",
					"value": 504e4,
					"valueLabel": "5.04m",
					"image": "UTIL-TEC_GOLD.png",
					"imageIsFallback": false
				},
				"DIAMOND": {
					"income": 840,
					"incomeLabel": "840/s",
					"cost": 144e5,
					"costLabel": "14.40m",
					"value": 1008e4,
					"valueLabel": "10.08m",
					"image": "UTIL-TEC_DIAMOND.png",
					"imageIsFallback": false
				},
				"RAINBOW": {
					"income": 1680,
					"incomeLabel": "1.68k/s",
					"cost": 288e5,
					"costLabel": "28.80m",
					"value": 2016e4,
					"valueLabel": "20.16m",
					"image": "UTIL-TEC_RAINBOW.png",
					"imageIsFallback": false
				},
				"BESKAR": {
					"income": 7140,
					"incomeLabel": "7.14k/s",
					"cost": 225e6,
					"costLabel": "225m",
					"value": 1575e5,
					"valueLabel": "157.5m",
					"image": "UTIL-TEC_BESKAR.png",
					"imageIsFallback": false
				},
				"GALACTIC": {
					"income": null,
					"incomeLabel": null,
					"cost": null,
					"costLabel": null,
					"value": null,
					"valueLabel": null,
					"image": "UTIL-TEC_BESKAR.png",
					"imageIsFallback": true
				}
			}
		},
		{
			"slug": "lo",
			"name": "LO",
			"assetKey": "LO",
			"rarity": "epic",
			"type": "worker",
			"percentIncome": false,
			"percentValue": null,
			"perk": null,
			"unverified": false,
			"tiers": {
				"DEFAULT": {
					"income": 240,
					"incomeLabel": "240/s",
					"cost": 21e5,
					"costLabel": "2.10m",
					"value": 147e4,
					"valueLabel": "1.47m",
					"image": "LO_DEFAULT.png",
					"imageIsFallback": false
				},
				"GOLD": {
					"income": 480,
					"incomeLabel": "480/s",
					"cost": 84e5,
					"costLabel": "8.40m",
					"value": 588e4,
					"valueLabel": "5.88m",
					"image": "LO_GOLD.png",
					"imageIsFallback": false
				},
				"DIAMOND": {
					"income": 960,
					"incomeLabel": "960/s",
					"cost": 168e5,
					"costLabel": "16.8m",
					"value": 1176e4,
					"valueLabel": "11.76m",
					"image": "LO_DIAMOND.png",
					"imageIsFallback": false
				},
				"RAINBOW": {
					"income": 1920,
					"incomeLabel": "1.92k/s",
					"cost": 336e5,
					"costLabel": "33.60m",
					"value": 2352e4,
					"valueLabel": "23.52m",
					"image": "LO_RAINBOW.png",
					"imageIsFallback": false
				},
				"BESKAR": {
					"income": 8160,
					"incomeLabel": "8.16k/s",
					"cost": 2625e5,
					"costLabel": "262.50m",
					"value": 18375e4,
					"valueLabel": "183.75m",
					"image": "LO_BESKAR.png",
					"imageIsFallback": false
				},
				"GALACTIC": {
					"income": null,
					"incomeLabel": null,
					"cost": null,
					"costLabel": null,
					"value": null,
					"valueLabel": null,
					"image": "LO_BESKAR.png",
					"imageIsFallback": true
				}
			}
		},
		{
			"slug": "haul-r",
			"name": "HAUL-R",
			"assetKey": "HAUL-R",
			"rarity": "epic",
			"type": "battle",
			"percentIncome": false,
			"percentValue": null,
			"perk": null,
			"unverified": false,
			"tiers": {
				"DEFAULT": {
					"income": 270,
					"incomeLabel": "270/s",
					"cost": 24e5,
					"costLabel": "2.40m",
					"value": 168e4,
					"valueLabel": "1.68m",
					"image": "HAUL-R_DEFAULT.png",
					"imageIsFallback": false
				},
				"GOLD": {
					"income": 540,
					"incomeLabel": "540/s",
					"cost": 96e5,
					"costLabel": "9.60m",
					"value": 672e4,
					"valueLabel": "6.72m",
					"image": "HAUL-R_GOLD.png",
					"imageIsFallback": false
				},
				"DIAMOND": {
					"income": 1080,
					"incomeLabel": "1.08k/s",
					"cost": 192e5,
					"costLabel": "19.20m",
					"value": 1344e4,
					"valueLabel": "13.44m",
					"image": "HAUL-R_DIAMOND.png",
					"imageIsFallback": false
				},
				"RAINBOW": {
					"income": 2160,
					"incomeLabel": "2.16k/s",
					"cost": 384e5,
					"costLabel": "38.40m",
					"value": 2688e4,
					"valueLabel": "26.88m",
					"image": "HAUL-R_RAINBOW.png",
					"imageIsFallback": false
				},
				"BESKAR": {
					"income": 9180,
					"incomeLabel": "9.18k/s",
					"cost": 3e8,
					"costLabel": "300m",
					"value": 21e7,
					"valueLabel": "210.00m",
					"image": "HAUL-R_BESKAR.png",
					"imageIsFallback": false
				},
				"GALACTIC": {
					"income": null,
					"incomeLabel": null,
					"cost": null,
					"costLabel": null,
					"value": null,
					"valueLabel": null,
					"image": "HAUL-R_BESKAR.png",
					"imageIsFallback": true
				}
			}
		},
		{
			"slug": "r6",
			"name": "R6",
			"assetKey": "R6",
			"rarity": "epic",
			"type": "astromech",
			"percentIncome": false,
			"percentValue": null,
			"perk": null,
			"unverified": false,
			"tiers": {
				"DEFAULT": {
					"income": 300,
					"incomeLabel": "300/s",
					"cost": 27e5,
					"costLabel": "2.70m",
					"value": 189e4,
					"valueLabel": "1.89m",
					"image": "R6_DEFAULT.png",
					"imageIsFallback": false
				},
				"GOLD": {
					"income": 600,
					"incomeLabel": "600/s",
					"cost": 108e5,
					"costLabel": "10.80m",
					"value": 756e4,
					"valueLabel": "7.56m",
					"image": "R6_GOLD.png",
					"imageIsFallback": false
				},
				"DIAMOND": {
					"income": 1200,
					"incomeLabel": "1.20k/s",
					"cost": 216e5,
					"costLabel": "21.60m",
					"value": 1512e4,
					"valueLabel": "15.12m",
					"image": "R6_DIAMOND.png",
					"imageIsFallback": false
				},
				"RAINBOW": {
					"income": 2400,
					"incomeLabel": "2.40k/s",
					"cost": 432e5,
					"costLabel": "43.20m",
					"value": 3024e4,
					"valueLabel": "30.24m",
					"image": "R6_RAINBOW.png",
					"imageIsFallback": false
				},
				"BESKAR": {
					"income": 10200,
					"incomeLabel": "10.20k/s",
					"cost": 3375e5,
					"costLabel": "337.50m",
					"value": 23625e4,
					"valueLabel": "236.25m",
					"image": "R6_BESKAR.png",
					"imageIsFallback": false
				},
				"GALACTIC": {
					"income": null,
					"incomeLabel": null,
					"cost": null,
					"costLabel": null,
					"value": null,
					"valueLabel": null,
					"image": "R6_BESKAR.png",
					"imageIsFallback": true
				}
			}
		},
		{
			"slug": "trak-r",
			"name": "TRAK-R",
			"assetKey": "TRAK-R",
			"rarity": "epic",
			"type": "astromech",
			"percentIncome": false,
			"percentValue": null,
			"perk": null,
			"unverified": false,
			"tiers": {
				"DEFAULT": {
					"income": 330,
					"incomeLabel": "330/s",
					"cost": 3e6,
					"costLabel": "3.00m",
					"value": 21e5,
					"valueLabel": "2.10m",
					"image": "TRAK-R_DEFAULT.png",
					"imageIsFallback": false
				},
				"GOLD": {
					"income": 660,
					"incomeLabel": "660/s",
					"cost": 12e6,
					"costLabel": "12m",
					"value": 84e5,
					"valueLabel": "8.40m",
					"image": "TRAK-R_GOLD.png",
					"imageIsFallback": false
				},
				"DIAMOND": {
					"income": 1320,
					"incomeLabel": "1.32k/s",
					"cost": 24e6,
					"costLabel": "24m",
					"value": 168e5,
					"valueLabel": "16.80m",
					"image": "TRAK-R_DIAMOND.png",
					"imageIsFallback": false
				},
				"RAINBOW": {
					"income": 2640,
					"incomeLabel": "2.64k/s",
					"cost": 48e6,
					"costLabel": "48m",
					"value": 336e5,
					"valueLabel": "33.60m",
					"image": "TRAK-R_RAINBOW.png",
					"imageIsFallback": false
				},
				"BESKAR": {
					"income": 11220,
					"incomeLabel": "11.22k/s",
					"cost": 375e6,
					"costLabel": "375m",
					"value": 2625e5,
					"valueLabel": "262.50m",
					"image": "TRAK-R_BESKAR.png",
					"imageIsFallback": false
				},
				"GALACTIC": {
					"income": null,
					"incomeLabel": null,
					"cost": null,
					"costLabel": null,
					"value": null,
					"valueLabel": null,
					"image": "TRAK-R_BESKAR.png",
					"imageIsFallback": true
				}
			}
		},
		{
			"slug": "r2",
			"name": "R2",
			"assetKey": "R2",
			"rarity": "epic",
			"type": "astromech",
			"percentIncome": false,
			"percentValue": null,
			"perk": null,
			"unverified": false,
			"tiers": {
				"DEFAULT": {
					"income": 360,
					"incomeLabel": "360/s",
					"cost": 33e5,
					"costLabel": "3.30m",
					"value": 231e4,
					"valueLabel": "2.31m",
					"image": "R2_DEFAULT.png",
					"imageIsFallback": false
				},
				"GOLD": {
					"income": 720,
					"incomeLabel": "720/s",
					"cost": 132e5,
					"costLabel": "13.20m",
					"value": 924e4,
					"valueLabel": "9.24m",
					"image": "R2_GOLD.png",
					"imageIsFallback": false
				},
				"DIAMOND": {
					"income": 1440,
					"incomeLabel": "1.44k/s",
					"cost": 264e5,
					"costLabel": "26.40m",
					"value": 1848e4,
					"valueLabel": "18.48m",
					"image": "R2_DIAMOND.png",
					"imageIsFallback": false
				},
				"RAINBOW": {
					"income": 2880,
					"incomeLabel": "2.88k/s",
					"cost": 528e5,
					"costLabel": "52.80m",
					"value": 3696e4,
					"valueLabel": "36.96m",
					"image": "R2_RAINBOW.png",
					"imageIsFallback": false
				},
				"BESKAR": {
					"income": 12240,
					"incomeLabel": "12.24k/s",
					"cost": 4125e5,
					"costLabel": "412.50m",
					"value": 28875e4,
					"valueLabel": "288.75m",
					"image": "R2_BESKAR.png",
					"imageIsFallback": false
				},
				"GALACTIC": {
					"income": null,
					"incomeLabel": null,
					"cost": null,
					"costLabel": null,
					"value": null,
					"valueLabel": null,
					"image": "R2_BESKAR.png",
					"imageIsFallback": true
				}
			}
		},
		{
			"slug": "opti-pod",
			"name": "OPTI-POD",
			"assetKey": "OPTI-POD",
			"rarity": "epic",
			"type": "worker",
			"percentIncome": false,
			"percentValue": null,
			"perk": null,
			"unverified": false,
			"tiers": {
				"DEFAULT": {
					"income": 390,
					"incomeLabel": "390/s",
					"cost": 36e5,
					"costLabel": "3.60m",
					"value": 252e4,
					"valueLabel": "2.52m",
					"image": "OPTI-POD_DEFAULT.png",
					"imageIsFallback": false
				},
				"GOLD": {
					"income": 780,
					"incomeLabel": "780/s",
					"cost": 144e5,
					"costLabel": "14.4m",
					"value": 1008e4,
					"valueLabel": "10.08m",
					"image": "OPTI-POD_GOLD.png",
					"imageIsFallback": false
				},
				"DIAMOND": {
					"income": 1560,
					"incomeLabel": "1.56k/s",
					"cost": 288e5,
					"costLabel": "28.80m",
					"value": 2016e4,
					"valueLabel": "20.16m",
					"image": "OPTI-POD_DIAMOND.png",
					"imageIsFallback": false
				},
				"RAINBOW": {
					"income": 3120,
					"incomeLabel": "3.12k/s",
					"cost": 576e5,
					"costLabel": "57.60m",
					"value": 4032e4,
					"valueLabel": "40.32m",
					"image": "OPTI-POD_RAINBOW.png",
					"imageIsFallback": false
				},
				"BESKAR": {
					"income": 13260,
					"incomeLabel": "13.26k/s",
					"cost": 45e7,
					"costLabel": "450m",
					"value": 315e6,
					"valueLabel": "315m",
					"image": "OPTI-POD_BESKAR.png",
					"imageIsFallback": false
				},
				"GALACTIC": {
					"income": null,
					"incomeLabel": null,
					"cost": null,
					"costLabel": null,
					"value": null,
					"valueLabel": null,
					"image": "OPTI-POD_BESKAR.png",
					"imageIsFallback": true
				}
			}
		},
		{
			"slug": "b2-super",
			"name": "B2 SUPER",
			"assetKey": "B2_SUPER",
			"rarity": "epic",
			"type": "battle",
			"percentIncome": false,
			"percentValue": null,
			"perk": null,
			"unverified": false,
			"tiers": {
				"DEFAULT": {
					"income": 420,
					"incomeLabel": "420/s",
					"cost": 39e5,
					"costLabel": "3.90m",
					"value": 273e4,
					"valueLabel": "2.73m",
					"image": "B2_SUPER_DEFAULT.png",
					"imageIsFallback": false
				},
				"GOLD": {
					"income": 840,
					"incomeLabel": "840/s",
					"cost": 156e5,
					"costLabel": "15.60m",
					"value": 1092e4,
					"valueLabel": "10.92m",
					"image": "B2_SUPER_GOLD.png",
					"imageIsFallback": false
				},
				"DIAMOND": {
					"income": 1680,
					"incomeLabel": "1.68k/s",
					"cost": 312e5,
					"costLabel": "31.20m",
					"value": 2184e4,
					"valueLabel": "21.84m",
					"image": "B2_SUPER_DIAMOND.png",
					"imageIsFallback": false
				},
				"RAINBOW": {
					"income": 3360,
					"incomeLabel": "3.36k/s",
					"cost": 624e5,
					"costLabel": "62.40m",
					"value": 4368e4,
					"valueLabel": "43.68m",
					"image": "B2_SUPER_RAINBOW.png",
					"imageIsFallback": false
				},
				"BESKAR": {
					"income": 14280,
					"incomeLabel": "14.28k/s",
					"cost": 4875e5,
					"costLabel": "487.50m",
					"value": 34125e4,
					"valueLabel": "341.25m",
					"image": "B2_SUPER_BESKAR.png",
					"imageIsFallback": false
				},
				"GALACTIC": {
					"income": null,
					"incomeLabel": null,
					"cost": null,
					"costLabel": null,
					"value": null,
					"valueLabel": null,
					"image": "B2_SUPER_BESKAR.png",
					"imageIsFallback": true
				}
			}
		},
		{
			"slug": "lng-shot",
			"name": "LNG-SHOT",
			"assetKey": "LNG-SHOT",
			"rarity": "epic",
			"type": "battle",
			"percentIncome": false,
			"percentValue": null,
			"perk": null,
			"unverified": false,
			"tiers": {
				"DEFAULT": {
					"income": 450,
					"incomeLabel": "450/s",
					"cost": 42e5,
					"costLabel": "4.20m",
					"value": 294e4,
					"valueLabel": "2.94m",
					"image": "LNG-SHOT_DEFAULT.png",
					"imageIsFallback": false
				},
				"GOLD": {
					"income": 900,
					"incomeLabel": "900/s",
					"cost": 168e5,
					"costLabel": "16.80m",
					"value": 1176e4,
					"valueLabel": "11.76m",
					"image": "LNG-SHOT_GOLD.png",
					"imageIsFallback": false
				},
				"DIAMOND": {
					"income": 1800,
					"incomeLabel": "1.80k/s",
					"cost": 336e5,
					"costLabel": "33.60m",
					"value": 2352e4,
					"valueLabel": "23.52m",
					"image": "LNG-SHOT_DIAMOND.png",
					"imageIsFallback": false
				},
				"RAINBOW": {
					"income": 3600,
					"incomeLabel": "3.60k/s",
					"cost": 672e5,
					"costLabel": "67.20m",
					"value": 4704e4,
					"valueLabel": "47.04m",
					"image": "LNG-SHOT_RAINBOW.png",
					"imageIsFallback": false
				},
				"BESKAR": {
					"income": 15300,
					"incomeLabel": "15.30k/s",
					"cost": 525e6,
					"costLabel": "525m",
					"value": 3675e5,
					"valueLabel": "367.50m",
					"image": "LNG-SHOT_BESKAR.png",
					"imageIsFallback": false
				},
				"GALACTIC": {
					"income": null,
					"incomeLabel": null,
					"cost": null,
					"costLabel": null,
					"value": null,
					"valueLabel": null,
					"image": "LNG-SHOT_BESKAR.png",
					"imageIsFallback": true
				}
			}
		},
		{
			"slug": "b2-heavy",
			"name": "B2 HEAVY",
			"assetKey": "B2_HEAVY",
			"rarity": "epic",
			"type": "battle",
			"percentIncome": false,
			"percentValue": null,
			"perk": null,
			"unverified": false,
			"tiers": {
				"DEFAULT": {
					"income": 480,
					"incomeLabel": "480/s",
					"cost": 45e5,
					"costLabel": "4.50m",
					"value": 315e4,
					"valueLabel": "3.15m",
					"image": "B2_HEAVY_DEFAULT.png",
					"imageIsFallback": false
				},
				"GOLD": {
					"income": 960,
					"incomeLabel": "960/s",
					"cost": 18e6,
					"costLabel": "18m",
					"value": 126e5,
					"valueLabel": "12.60m",
					"image": "B2_HEAVY_GOLD.png",
					"imageIsFallback": false
				},
				"DIAMOND": {
					"income": 1920,
					"incomeLabel": "1.92k/s",
					"cost": 36e6,
					"costLabel": "36m",
					"value": 252e5,
					"valueLabel": "25.20m",
					"image": "B2_HEAVY_DIAMOND.png",
					"imageIsFallback": false
				},
				"RAINBOW": {
					"income": 3840,
					"incomeLabel": "3.84k/s",
					"cost": 72e6,
					"costLabel": "72m",
					"value": 504e5,
					"valueLabel": "50.40m",
					"image": "B2_HEAVY_RAINBOW.png",
					"imageIsFallback": false
				},
				"BESKAR": {
					"income": 16320,
					"incomeLabel": "16.32k/s",
					"cost": 5625e5,
					"costLabel": "562.50m",
					"value": 39375e4,
					"valueLabel": "393.75m",
					"image": "B2_HEAVY_BESKAR.png",
					"imageIsFallback": false
				},
				"GALACTIC": {
					"income": null,
					"incomeLabel": null,
					"cost": null,
					"costLabel": null,
					"value": null,
					"valueLabel": null,
					"image": "B2_HEAVY_BESKAR.png",
					"imageIsFallback": true
				}
			}
		},
		{
			"slug": "sen-tri",
			"name": "SEN-TRI",
			"assetKey": "SEN-TRI",
			"rarity": "epic",
			"type": "worker",
			"percentIncome": false,
			"percentValue": null,
			"perk": null,
			"unverified": false,
			"tiers": {
				"DEFAULT": {
					"income": 510,
					"incomeLabel": "510/s",
					"cost": 48e5,
					"costLabel": "4.80m",
					"value": 336e4,
					"valueLabel": "3.36m",
					"image": "SEN-TRI_DEFAULT.png",
					"imageIsFallback": false
				},
				"GOLD": {
					"income": 1020,
					"incomeLabel": "1.02k/s",
					"cost": 192e5,
					"costLabel": "19.20m",
					"value": 1344e4,
					"valueLabel": "13.44m",
					"image": "SEN-TRI_GOLD.png",
					"imageIsFallback": false
				},
				"DIAMOND": {
					"income": 2040,
					"incomeLabel": "2.04k/s",
					"cost": 384e5,
					"costLabel": "38.40m",
					"value": 2688e4,
					"valueLabel": "26.88m",
					"image": "SEN-TRI_DIAMOND.png",
					"imageIsFallback": false
				},
				"RAINBOW": {
					"income": 4080,
					"incomeLabel": "4.08k/s",
					"cost": 768e5,
					"costLabel": "76.80m",
					"value": 5376e4,
					"valueLabel": "53.76m",
					"image": "SEN-TRI_RAINBOW.png",
					"imageIsFallback": false
				},
				"BESKAR": {
					"income": 17340,
					"incomeLabel": "17.34k/s",
					"cost": 6e8,
					"costLabel": "600m",
					"value": 42e7,
					"valueLabel": "420m",
					"image": "SEN-TRI_BESKAR.png",
					"imageIsFallback": false
				},
				"GALACTIC": {
					"income": null,
					"incomeLabel": null,
					"cost": null,
					"costLabel": null,
					"value": null,
					"valueLabel": null,
					"image": "SEN-TRI_BESKAR.png",
					"imageIsFallback": true
				}
			}
		},
		{
			"slug": "strike-orb",
			"name": "STRIKE-ORB",
			"assetKey": "STRIKE-ORB",
			"rarity": "epic",
			"type": "battle",
			"percentIncome": false,
			"percentValue": null,
			"perk": null,
			"unverified": false,
			"tiers": {
				"DEFAULT": {
					"income": 540,
					"incomeLabel": "540/s",
					"cost": 51e5,
					"costLabel": "5.10m",
					"value": 357e4,
					"valueLabel": "3.57m",
					"image": "STRIKE-ORB_DEFAULT.png",
					"imageIsFallback": false
				},
				"GOLD": {
					"income": 1080,
					"incomeLabel": "1.08k/s",
					"cost": 204e5,
					"costLabel": "20.40m",
					"value": 1428e4,
					"valueLabel": "14.28m",
					"image": "STRIKE-ORB_GOLD.png",
					"imageIsFallback": false
				},
				"DIAMOND": {
					"income": 2160,
					"incomeLabel": "2.16k/s",
					"cost": 408e5,
					"costLabel": "40.80m",
					"value": 2856e4,
					"valueLabel": "28.56m",
					"image": "STRIKE-ORB_DIAMOND.png",
					"imageIsFallback": false
				},
				"RAINBOW": {
					"income": 4320,
					"incomeLabel": "4.32k/s",
					"cost": 816e5,
					"costLabel": "81.60m",
					"value": 5712e4,
					"valueLabel": "57.12m",
					"image": "STRIKE-ORB_RAINBOW.png",
					"imageIsFallback": false
				},
				"BESKAR": {
					"income": 18360,
					"incomeLabel": "18.36k/s",
					"cost": 6375e5,
					"costLabel": "637.50m",
					"value": 44625e4,
					"valueLabel": "446.25m",
					"image": "STRIKE-ORB_BESKAR.png",
					"imageIsFallback": false
				},
				"GALACTIC": {
					"income": null,
					"incomeLabel": null,
					"cost": null,
					"costLabel": null,
					"value": null,
					"valueLabel": null,
					"image": "STRIKE-ORB_BESKAR.png",
					"imageIsFallback": true
				}
			}
		},
		{
			"slug": "amp-walker",
			"name": "AMP WALKER",
			"assetKey": "AMP_WALKER",
			"rarity": "epic",
			"type": "worker",
			"percentIncome": false,
			"percentValue": null,
			"perk": null,
			"unverified": false,
			"tiers": {
				"DEFAULT": {
					"income": 570,
					"incomeLabel": "570/s",
					"cost": 54e5,
					"costLabel": "5.40m",
					"value": 378e4,
					"valueLabel": "3.78m",
					"image": "AMP_WALKER_DEFAULT.png",
					"imageIsFallback": false
				},
				"GOLD": {
					"income": 1140,
					"incomeLabel": "1.14k/s",
					"cost": 216e5,
					"costLabel": "21.60m",
					"value": 1512e4,
					"valueLabel": "15.12m",
					"image": "AMP_WALKER_GOLD.png",
					"imageIsFallback": false
				},
				"DIAMOND": {
					"income": 2280,
					"incomeLabel": "2.28k/s",
					"cost": 432e5,
					"costLabel": "43.20m",
					"value": 3024e4,
					"valueLabel": "30.24m",
					"image": "AMP_WALKER_DIAMOND.png",
					"imageIsFallback": false
				},
				"RAINBOW": {
					"income": 4560,
					"incomeLabel": "4.56k/s",
					"cost": 864e5,
					"costLabel": "86.40m",
					"value": 6048e4,
					"valueLabel": "60.48m",
					"image": "AMP_WALKER_RAINBOW.png",
					"imageIsFallback": false
				},
				"BESKAR": {
					"income": 19380,
					"incomeLabel": "19.38k/s",
					"cost": 675e6,
					"costLabel": "675m",
					"value": 4725e5,
					"valueLabel": "472.50m",
					"image": "AMP_WALKER_BESKAR.png",
					"imageIsFallback": false
				},
				"GALACTIC": {
					"income": null,
					"incomeLabel": null,
					"cost": null,
					"costLabel": null,
					"value": null,
					"valueLabel": null,
					"image": "AMP_WALKER_BESKAR.png",
					"imageIsFallback": true
				}
			}
		},
		{
			"slug": "b1-heavy",
			"name": "B1 HEAVY",
			"assetKey": "B1_HEAVY",
			"rarity": "epic",
			"type": "battle",
			"percentIncome": false,
			"percentValue": null,
			"perk": null,
			"unverified": false,
			"tiers": {
				"DEFAULT": {
					"income": 630,
					"incomeLabel": "630/s",
					"cost": 6e6,
					"costLabel": "6.00m",
					"value": 42e5,
					"valueLabel": "4.20m",
					"image": "B1_HEAVY_DEFAULT.png",
					"imageIsFallback": false
				},
				"GOLD": {
					"income": 1260,
					"incomeLabel": "1.26k/s",
					"cost": 24e6,
					"costLabel": "24m",
					"value": 168e5,
					"valueLabel": "16.80m",
					"image": "B1_HEAVY_GOLD.png",
					"imageIsFallback": false
				},
				"DIAMOND": {
					"income": 2520,
					"incomeLabel": "2.52k/s",
					"cost": 48e6,
					"costLabel": "48m",
					"value": 336e5,
					"valueLabel": "33.60m",
					"image": "B1_HEAVY_DIAMOND.png",
					"imageIsFallback": false
				},
				"RAINBOW": {
					"income": 5040,
					"incomeLabel": "5.04k/s",
					"cost": 96e6,
					"costLabel": "96m",
					"value": 672e5,
					"valueLabel": "67.20m",
					"image": "B1_HEAVY_RAINBOW.png",
					"imageIsFallback": false
				},
				"BESKAR": {
					"income": 20400,
					"incomeLabel": "20.40k/s",
					"cost": 24e9,
					"costLabel": "24b",
					"value": 168e8,
					"valueLabel": "16.80b",
					"image": "B1_HEAVY_BESKAR.png",
					"imageIsFallback": false
				},
				"GALACTIC": {
					"income": null,
					"incomeLabel": null,
					"cost": null,
					"costLabel": null,
					"value": null,
					"valueLabel": null,
					"image": "B1_HEAVY_BESKAR.png",
					"imageIsFallback": true
				}
			}
		},
		{
			"slug": "gunrunner",
			"name": "GUNRUNNER",
			"assetKey": "GUNRUNNER",
			"rarity": "epic",
			"type": "worker",
			"percentIncome": false,
			"percentValue": null,
			"perk": null,
			"unverified": false,
			"tiers": {
				"DEFAULT": {
					"income": 660,
					"incomeLabel": "660/s",
					"cost": 63e5,
					"costLabel": "6.30m",
					"value": 441e4,
					"valueLabel": "4.41m",
					"image": "GUNRUNNER_DEFAULT.png",
					"imageIsFallback": false
				},
				"GOLD": {
					"income": 1320,
					"incomeLabel": "1.32k/s",
					"cost": 252e5,
					"costLabel": "25.20m",
					"value": 1764e4,
					"valueLabel": "17.64m",
					"image": "GUNRUNNER_GOLD.png",
					"imageIsFallback": false
				},
				"DIAMOND": {
					"income": 2640,
					"incomeLabel": "2.64k/s",
					"cost": 504e5,
					"costLabel": "50.40m",
					"value": 3528e4,
					"valueLabel": "35.28m",
					"image": "GUNRUNNER_DIAMOND.png",
					"imageIsFallback": false
				},
				"RAINBOW": {
					"income": 5280,
					"incomeLabel": "5.28k/s",
					"cost": 1008e5,
					"costLabel": "100.80m",
					"value": 7056e4,
					"valueLabel": "70.56m",
					"image": "GUNRUNNER_RAINBOW.png",
					"imageIsFallback": false
				},
				"BESKAR": {
					"income": 22440,
					"incomeLabel": "22.44k/s",
					"cost": 252e8,
					"costLabel": "25.20b",
					"value": 1764e7,
					"valueLabel": "17.64b",
					"image": "GUNRUNNER_BESKAR.png",
					"imageIsFallback": false
				},
				"GALACTIC": {
					"income": null,
					"incomeLabel": null,
					"cost": null,
					"costLabel": null,
					"value": null,
					"valueLabel": null,
					"image": "GUNRUNNER_BESKAR.png",
					"imageIsFallback": true
				}
			}
		},
		{
			"slug": "proto-roller",
			"name": "PROTO-ROLLER",
			"assetKey": "PROTO-ROLLER",
			"rarity": "legendary",
			"type": "worker",
			"percentIncome": false,
			"percentValue": null,
			"perk": null,
			"unverified": false,
			"tiers": {
				"DEFAULT": {
					"income": 972,
					"incomeLabel": "972/s",
					"cost": 22e6,
					"costLabel": "22m",
					"value": 154e5,
					"valueLabel": "15.40m",
					"image": "PROTO-ROLLER_DEFAULT.png",
					"imageIsFallback": false
				},
				"GOLD": {
					"income": 1940,
					"incomeLabel": "1.94k/s",
					"cost": 88e6,
					"costLabel": "88m",
					"value": 616e5,
					"valueLabel": "61.60m",
					"image": "PROTO-ROLLER_GOLD.png",
					"imageIsFallback": false
				},
				"DIAMOND": {
					"income": 3890,
					"incomeLabel": "3.89k/s",
					"cost": 176e6,
					"costLabel": "176m",
					"value": 1232e5,
					"valueLabel": "123.20m",
					"image": "PROTO-ROLLER_DIAMOND.png",
					"imageIsFallback": false
				},
				"RAINBOW": {
					"income": 7780,
					"incomeLabel": "7.78k/s",
					"cost": 352e6,
					"costLabel": "352m",
					"value": 2464e5,
					"valueLabel": "246.40m",
					"image": "PROTO-ROLLER_RAINBOW.png",
					"imageIsFallback": false
				},
				"BESKAR": {
					"income": 23330,
					"incomeLabel": "23.33k/s",
					"cost": 88e8,
					"costLabel": "8.80b",
					"value": 616e7,
					"valueLabel": "6.16b",
					"image": "PROTO-ROLLER_BESKAR.png",
					"imageIsFallback": false
				},
				"GALACTIC": {
					"income": null,
					"incomeLabel": null,
					"cost": null,
					"costLabel": null,
					"value": null,
					"valueLabel": null,
					"image": "PROTO-ROLLER_BESKAR.png",
					"imageIsFallback": true
				}
			}
		},
		{
			"slug": "mecha-droid",
			"name": "MECHA-DROID",
			"assetKey": "MECHA-DROID",
			"rarity": "legendary",
			"type": "worker",
			"percentIncome": false,
			"percentValue": null,
			"perk": null,
			"unverified": false,
			"tiers": {
				"DEFAULT": {
					"income": 1240,
					"incomeLabel": "1.24k/s",
					"cost": 29e6,
					"costLabel": "29m",
					"value": 203e5,
					"valueLabel": "20.30m",
					"image": "MECHA-DROID_DEFAULT.png",
					"imageIsFallback": false
				},
				"GOLD": {
					"income": 2490,
					"incomeLabel": "2.49k/s",
					"cost": 116e6,
					"costLabel": "116m",
					"value": 812e5,
					"valueLabel": "81.20m",
					"image": "MECHA-DROID_GOLD.png",
					"imageIsFallback": false
				},
				"DIAMOND": {
					"income": 4970,
					"incomeLabel": "4.97k/s",
					"cost": 232e6,
					"costLabel": "232m",
					"value": 1624e5,
					"valueLabel": "162.40m",
					"image": "MECHA-DROID_DIAMOND.png",
					"imageIsFallback": false
				},
				"RAINBOW": {
					"income": 9950,
					"incomeLabel": "9.95k/s",
					"cost": 464e6,
					"costLabel": "464m",
					"value": 3248e5,
					"valueLabel": "324.80m",
					"image": "MECHA-DROID_RAINBOW.png",
					"imageIsFallback": false
				},
				"BESKAR": {
					"income": 29850,
					"incomeLabel": "29.85k/s",
					"cost": 116e8,
					"costLabel": "11.60b",
					"value": 8119999999.999999,
					"valueLabel": "8.12b",
					"image": "MECHA-DROID_BESKAR.png",
					"imageIsFallback": false
				},
				"GALACTIC": {
					"income": null,
					"incomeLabel": null,
					"cost": null,
					"costLabel": null,
					"value": null,
					"valueLabel": null,
					"image": "MECHA-DROID_BESKAR.png",
					"imageIsFallback": true
				}
			}
		},
		{
			"slug": "cyclo-grav",
			"name": "CYCLO-GRAV",
			"assetKey": "CYCLO-GRAV",
			"rarity": "legendary",
			"type": "battle",
			"percentIncome": false,
			"percentValue": null,
			"perk": null,
			"unverified": false,
			"tiers": {
				"DEFAULT": {
					"income": 1260,
					"incomeLabel": "1.26k/s",
					"cost": 3e7,
					"costLabel": "30m",
					"value": 21e6,
					"valueLabel": "21.00m",
					"image": "CYCLO-GRAV_DEFAULT.png",
					"imageIsFallback": false
				},
				"GOLD": {
					"income": 2520,
					"incomeLabel": "2.52k/s",
					"cost": 12e7,
					"costLabel": "120m",
					"value": 84e6,
					"valueLabel": "84.00m",
					"image": "CYCLO-GRAV_GOLD.png",
					"imageIsFallback": false
				},
				"DIAMOND": {
					"income": 5040,
					"incomeLabel": "5.04k/s",
					"cost": 24e7,
					"costLabel": "240m",
					"value": 168e6,
					"valueLabel": "168.00m",
					"image": "CYCLO-GRAV_DIAMOND.png",
					"imageIsFallback": false
				},
				"RAINBOW": {
					"income": 10080,
					"incomeLabel": "10.08k/s",
					"cost": 48e7,
					"costLabel": "480m",
					"value": 336e6,
					"valueLabel": "336.00m",
					"image": "CYCLO-GRAV_RAINBOW.png",
					"imageIsFallback": false
				},
				"BESKAR": {
					"income": 30240,
					"incomeLabel": "30.24k/s",
					"cost": 12e9,
					"costLabel": "12.00b",
					"value": 84e8,
					"valueLabel": "8.40b",
					"image": "CYCLO-GRAV_BESKAR.png",
					"imageIsFallback": false
				},
				"GALACTIC": {
					"income": null,
					"incomeLabel": null,
					"cost": null,
					"costLabel": null,
					"value": null,
					"valueLabel": null,
					"image": "CYCLO-GRAV_BESKAR.png",
					"imageIsFallback": true
				}
			}
		},
		{
			"slug": "bb9",
			"name": "BB9",
			"assetKey": "BB9",
			"rarity": "legendary",
			"type": "astromech",
			"percentIncome": false,
			"percentValue": null,
			"perk": null,
			"unverified": false,
			"tiers": {
				"DEFAULT": {
					"income": 1300,
					"incomeLabel": "1.30k/s",
					"cost": 28e6,
					"costLabel": "28m",
					"value": 196e5,
					"valueLabel": "19.60m",
					"image": "BB9_DEFAULT.png",
					"imageIsFallback": false
				},
				"GOLD": {
					"income": 2600,
					"incomeLabel": "2.60k/s",
					"cost": 112e6,
					"costLabel": "112m",
					"value": 784e5,
					"valueLabel": "78.40m",
					"image": "BB9_GOLD.png",
					"imageIsFallback": false
				},
				"DIAMOND": {
					"income": 5200,
					"incomeLabel": "5.20k/s",
					"cost": 224e6,
					"costLabel": "224m",
					"value": 1568e5,
					"valueLabel": "156.80m",
					"image": "BB9_DIAMOND.png",
					"imageIsFallback": false
				},
				"RAINBOW": {
					"income": 10400,
					"incomeLabel": "10.40k/s",
					"cost": 448e6,
					"costLabel": "448m",
					"value": 3136e5,
					"valueLabel": "313.60m",
					"image": "BB9_RAINBOW.png",
					"imageIsFallback": false
				},
				"BESKAR": {
					"income": 31200,
					"incomeLabel": "31.20k/s",
					"cost": 112e8,
					"costLabel": "11.20b",
					"value": 784e7,
					"valueLabel": "7.84b",
					"image": "BB9_BESKAR.png",
					"imageIsFallback": false
				},
				"GALACTIC": {
					"income": null,
					"incomeLabel": null,
					"cost": null,
					"costLabel": null,
					"value": null,
					"valueLabel": null,
					"image": "BB9_BESKAR.png",
					"imageIsFallback": true
				}
			}
		},
		{
			"slug": "b2-rp",
			"name": "B2-RP",
			"assetKey": "B2-RP",
			"rarity": "legendary",
			"type": "battle",
			"percentIncome": false,
			"percentValue": null,
			"perk": null,
			"unverified": false,
			"tiers": {
				"DEFAULT": {
					"income": 1300,
					"incomeLabel": "1.30k/s",
					"cost": 31e6,
					"costLabel": "31m",
					"value": 217e5,
					"valueLabel": "21.70m",
					"image": "B2-RP_DEFAULT.png",
					"imageIsFallback": false
				},
				"GOLD": {
					"income": 2600,
					"incomeLabel": "2.60k/s",
					"cost": 124e6,
					"costLabel": "124m",
					"value": 868e5,
					"valueLabel": "86.80m",
					"image": "B2-RP_GOLD.png",
					"imageIsFallback": false
				},
				"DIAMOND": {
					"income": 5210,
					"incomeLabel": "5.21k/s",
					"cost": 248e6,
					"costLabel": "248m",
					"value": 1736e5,
					"valueLabel": "173.60m",
					"image": "B2-RP_DIAMOND.png",
					"imageIsFallback": false
				},
				"RAINBOW": {
					"income": 10430,
					"incomeLabel": "10.43k/s",
					"cost": 496e6,
					"costLabel": "496m",
					"value": 3472e5,
					"valueLabel": "347.20m",
					"image": "B2-RP_RAINBOW.png",
					"imageIsFallback": false
				},
				"BESKAR": {
					"income": 31300,
					"incomeLabel": "31.30k/s",
					"cost": 124e8,
					"costLabel": "12.40b",
					"value": 868e7,
					"valueLabel": "8.68b",
					"image": "B2-RP_BESKAR.png",
					"imageIsFallback": false
				},
				"GALACTIC": {
					"income": null,
					"incomeLabel": null,
					"cost": null,
					"costLabel": null,
					"value": null,
					"valueLabel": null,
					"image": "B2-RP_BESKAR.png",
					"imageIsFallback": true
				}
			}
		},
		{
			"slug": "mono-walker",
			"name": "MONO-WALKER",
			"assetKey": "MONO-WALKER",
			"rarity": "legendary",
			"type": "worker",
			"percentIncome": false,
			"percentValue": null,
			"perk": null,
			"unverified": false,
			"tiers": {
				"DEFAULT": {
					"income": 1500,
					"incomeLabel": "1.50k/s",
					"cost": 37e6,
					"costLabel": "37m",
					"value": 259e5,
					"valueLabel": "25.90m",
					"image": "MONO-WALKER_DEFAULT.png",
					"imageIsFallback": false
				},
				"GOLD": {
					"income": 3e3,
					"incomeLabel": "3.00k/s",
					"cost": 148e6,
					"costLabel": "148m",
					"value": 1036e5,
					"valueLabel": "103.60m",
					"image": "MONO-WALKER_GOLD.png",
					"imageIsFallback": false
				},
				"DIAMOND": {
					"income": 6e3,
					"incomeLabel": "6.00k/s",
					"cost": 296e6,
					"costLabel": "296m",
					"value": 2072e5,
					"valueLabel": "207.20m",
					"image": "MONO-WALKER_DIAMOND.png",
					"imageIsFallback": false
				},
				"RAINBOW": {
					"income": 12e3,
					"incomeLabel": "12.00k/s",
					"cost": 592e6,
					"costLabel": "592m",
					"value": 4144e5,
					"valueLabel": "414.40m",
					"image": "MONO-WALKER_RAINBOW.png",
					"imageIsFallback": false
				},
				"BESKAR": {
					"income": 36e3,
					"incomeLabel": "36.00k/s",
					"cost": 148e8,
					"costLabel": "14.80b",
					"value": 1036e7,
					"valueLabel": "10.36b",
					"image": "MONO-WALKER_BESKAR.png",
					"imageIsFallback": false
				},
				"GALACTIC": {
					"income": null,
					"incomeLabel": null,
					"cost": null,
					"costLabel": null,
					"value": null,
					"valueLabel": null,
					"image": "MONO-WALKER_BESKAR.png",
					"imageIsFallback": true
				}
			}
		},
		{
			"slug": "r7",
			"name": "R7",
			"assetKey": "R7",
			"rarity": "legendary",
			"type": "astromech",
			"percentIncome": false,
			"percentValue": null,
			"perk": null,
			"unverified": false,
			"tiers": {
				"DEFAULT": {
					"income": 1500,
					"incomeLabel": "1.50k/s",
					"cost": 37e6,
					"costLabel": "37m",
					"value": 259e5,
					"valueLabel": "25.90m",
					"image": "R7_DEFAULT.png",
					"imageIsFallback": false
				},
				"GOLD": {
					"income": 3e3,
					"incomeLabel": "3.00k/s",
					"cost": 148e6,
					"costLabel": "148m",
					"value": 1036e5,
					"valueLabel": "103.60m",
					"image": "R7_GOLD.png",
					"imageIsFallback": false
				},
				"DIAMOND": {
					"income": 6e3,
					"incomeLabel": "6.00k/s",
					"cost": 296e6,
					"costLabel": "296m",
					"value": 2072e5,
					"valueLabel": "207.20m",
					"image": "R7_DIAMOND.png",
					"imageIsFallback": false
				},
				"RAINBOW": {
					"income": 12e3,
					"incomeLabel": "12.00k/s",
					"cost": 592e6,
					"costLabel": "592m",
					"value": 4144e5,
					"valueLabel": "414.40m",
					"image": "R7_RAINBOW.png",
					"imageIsFallback": false
				},
				"BESKAR": {
					"income": 36e3,
					"incomeLabel": "36.00k/s",
					"cost": 148e8,
					"costLabel": "14.80b",
					"value": 1036e7,
					"valueLabel": "10.36b",
					"image": "R7_BESKAR.png",
					"imageIsFallback": false
				},
				"GALACTIC": {
					"income": null,
					"incomeLabel": null,
					"cost": null,
					"costLabel": null,
					"value": null,
					"valueLabel": null,
					"image": "R7_BESKAR.png",
					"imageIsFallback": true
				}
			}
		},
		{
			"slug": "opti-strike",
			"name": "OPTI-STRIKE",
			"assetKey": "OPTI-STRIKE",
			"rarity": "legendary",
			"type": "battle",
			"percentIncome": false,
			"percentValue": null,
			"perk": null,
			"unverified": false,
			"tiers": {
				"DEFAULT": {
					"income": 1500,
					"incomeLabel": "1.50k/s",
					"cost": 37e6,
					"costLabel": "37m",
					"value": 259e5,
					"valueLabel": "25.90m",
					"image": "OPTI-STRIKE_DEFAULT.png",
					"imageIsFallback": false
				},
				"GOLD": {
					"income": 3e3,
					"incomeLabel": "3.00k/s",
					"cost": 148e6,
					"costLabel": "148m",
					"value": 1036e5,
					"valueLabel": "103.60m",
					"image": "OPTI-STRIKE_GOLD.png",
					"imageIsFallback": false
				},
				"DIAMOND": {
					"income": 6e3,
					"incomeLabel": "6.00k/s",
					"cost": 296e6,
					"costLabel": "296m",
					"value": 2072e5,
					"valueLabel": "207.20m",
					"image": "OPTI-STRIKE_DIAMOND.png",
					"imageIsFallback": false
				},
				"RAINBOW": {
					"income": 12e3,
					"incomeLabel": "12.00k/s",
					"cost": 592e6,
					"costLabel": "592m",
					"value": 4144e5,
					"valueLabel": "414.40m",
					"image": "OPTI-STRIKE_RAINBOW.png",
					"imageIsFallback": false
				},
				"BESKAR": {
					"income": 36e3,
					"incomeLabel": "36.00k/s",
					"cost": 148e8,
					"costLabel": "14.80b",
					"value": 1036e7,
					"valueLabel": "10.36b",
					"image": "OPTI-STRIKE_BESKAR.png",
					"imageIsFallback": false
				},
				"GALACTIC": {
					"income": null,
					"incomeLabel": null,
					"cost": null,
					"costLabel": null,
					"value": null,
					"valueLabel": null,
					"image": "OPTI-STRIKE_BESKAR.png",
					"imageIsFallback": true
				}
			}
		},
		{
			"slug": "snow-mouse",
			"name": "SNOW MOUSE",
			"assetKey": "SNOW_MOUSE",
			"rarity": "mythic",
			"type": "worker",
			"percentIncome": false,
			"percentValue": null,
			"perk": "perk.mythicWorker",
			"unverified": true,
			"tiers": {
				"DEFAULT": {
					"income": 4400,
					"incomeLabel": null,
					"cost": 18e7,
					"costLabel": null,
					"value": null,
					"valueLabel": null,
					"image": "SNOW_MOUSE_DEFAULT.png",
					"imageIsFallback": false
				},
				"GOLD": {
					"income": 8800,
					"incomeLabel": null,
					"cost": null,
					"costLabel": null,
					"value": null,
					"valueLabel": null,
					"image": "SNOW_MOUSE_GOLD.png",
					"imageIsFallback": false
				},
				"DIAMOND": {
					"income": 17600,
					"incomeLabel": null,
					"cost": null,
					"costLabel": null,
					"value": null,
					"valueLabel": null,
					"image": "SNOW_MOUSE_DIAMOND.png",
					"imageIsFallback": false
				},
				"RAINBOW": {
					"income": 35200,
					"incomeLabel": null,
					"cost": null,
					"costLabel": null,
					"value": null,
					"valueLabel": null,
					"image": "SNOW_MOUSE_RAINBOW.png",
					"imageIsFallback": false
				},
				"BESKAR": {
					"income": 70400,
					"incomeLabel": null,
					"cost": null,
					"costLabel": null,
					"value": null,
					"valueLabel": null,
					"image": "SNOW_MOUSE_BESKAR.png",
					"imageIsFallback": false
				},
				"GALACTIC": {
					"income": null,
					"incomeLabel": null,
					"cost": null,
					"costLabel": null,
					"value": null,
					"valueLabel": null,
					"image": "SNOW_MOUSE_BESKAR.png",
					"imageIsFallback": true
				}
			}
		},
		{
			"slug": "cyclens",
			"name": "CYCLENS",
			"assetKey": "CYCLENS",
			"rarity": "mythic",
			"type": "astromech",
			"percentIncome": false,
			"percentValue": null,
			"perk": "perk.mythicAstromech",
			"unverified": true,
			"tiers": {
				"DEFAULT": {
					"income": 4400,
					"incomeLabel": null,
					"cost": 18e7,
					"costLabel": null,
					"value": null,
					"valueLabel": null,
					"image": "CYCLENS_DEFAULT.png",
					"imageIsFallback": false
				},
				"GOLD": {
					"income": 8800,
					"incomeLabel": null,
					"cost": null,
					"costLabel": null,
					"value": null,
					"valueLabel": null,
					"image": "CYCLENS_GOLD.png",
					"imageIsFallback": false
				},
				"DIAMOND": {
					"income": 17600,
					"incomeLabel": null,
					"cost": null,
					"costLabel": null,
					"value": null,
					"valueLabel": null,
					"image": "CYCLENS_DIAMOND.png",
					"imageIsFallback": false
				},
				"RAINBOW": {
					"income": 35200,
					"incomeLabel": null,
					"cost": null,
					"costLabel": null,
					"value": null,
					"valueLabel": null,
					"image": "CYCLENS_RAINBOW.png",
					"imageIsFallback": false
				},
				"BESKAR": {
					"income": 70400,
					"incomeLabel": null,
					"cost": null,
					"costLabel": null,
					"value": null,
					"valueLabel": null,
					"image": "CYCLENS_BESKAR.png",
					"imageIsFallback": false
				},
				"GALACTIC": {
					"income": null,
					"incomeLabel": null,
					"cost": null,
					"costLabel": null,
					"value": null,
					"valueLabel": null,
					"image": "CYCLENS_BESKAR.png",
					"imageIsFallback": true
				}
			}
		},
		{
			"slug": "ric",
			"name": "RIC",
			"assetKey": "RIC",
			"rarity": "mythic",
			"type": "worker",
			"percentIncome": false,
			"percentValue": null,
			"perk": "perk.mythicWorker",
			"unverified": true,
			"tiers": {
				"DEFAULT": {
					"income": 5100,
					"incomeLabel": null,
					"cost": 204e6,
					"costLabel": null,
					"value": null,
					"valueLabel": null,
					"image": "RIC_DEFAULT.png",
					"imageIsFallback": false
				},
				"GOLD": {
					"income": 10200,
					"incomeLabel": null,
					"cost": null,
					"costLabel": null,
					"value": null,
					"valueLabel": null,
					"image": "RIC_GOLD.png",
					"imageIsFallback": false
				},
				"DIAMOND": {
					"income": 20400,
					"incomeLabel": null,
					"cost": null,
					"costLabel": null,
					"value": null,
					"valueLabel": null,
					"image": "RIC_DIAMOND.png",
					"imageIsFallback": false
				},
				"RAINBOW": {
					"income": 40800,
					"incomeLabel": null,
					"cost": null,
					"costLabel": null,
					"value": null,
					"valueLabel": null,
					"image": "RIC_RAINBOW.png",
					"imageIsFallback": false
				},
				"BESKAR": {
					"income": 81600,
					"incomeLabel": null,
					"cost": null,
					"costLabel": null,
					"value": null,
					"valueLabel": null,
					"image": "RIC_BESKAR.png",
					"imageIsFallback": false
				},
				"GALACTIC": {
					"income": null,
					"incomeLabel": null,
					"cost": null,
					"costLabel": null,
					"value": null,
					"valueLabel": null,
					"image": "RIC_BESKAR.png",
					"imageIsFallback": true
				}
			}
		},
		{
			"slug": "ric-1200",
			"name": "RIC-1200",
			"assetKey": "RIC-1200",
			"rarity": "mythic",
			"type": "worker",
			"percentIncome": false,
			"percentValue": null,
			"perk": "perk.mythicWorker",
			"unverified": true,
			"tiers": {
				"DEFAULT": {
					"income": 5800,
					"incomeLabel": null,
					"cost": 228e6,
					"costLabel": null,
					"value": null,
					"valueLabel": null,
					"image": "RIC-1200_DEFAULT.png",
					"imageIsFallback": false
				},
				"GOLD": {
					"income": 11600,
					"incomeLabel": null,
					"cost": null,
					"costLabel": null,
					"value": null,
					"valueLabel": null,
					"image": "RIC-1200_GOLD.png",
					"imageIsFallback": false
				},
				"DIAMOND": {
					"income": 23200,
					"incomeLabel": null,
					"cost": null,
					"costLabel": null,
					"value": null,
					"valueLabel": null,
					"image": "RIC-1200_DIAMOND.png",
					"imageIsFallback": false
				},
				"RAINBOW": {
					"income": 46400,
					"incomeLabel": null,
					"cost": null,
					"costLabel": null,
					"value": null,
					"valueLabel": null,
					"image": "RIC-1200_RAINBOW.png",
					"imageIsFallback": false
				},
				"BESKAR": {
					"income": 92800,
					"incomeLabel": null,
					"cost": null,
					"costLabel": null,
					"value": null,
					"valueLabel": null,
					"image": "RIC-1200_BESKAR.png",
					"imageIsFallback": false
				},
				"GALACTIC": {
					"income": null,
					"incomeLabel": null,
					"cost": null,
					"costLabel": null,
					"value": null,
					"valueLabel": null,
					"image": "RIC-1200_BESKAR.png",
					"imageIsFallback": true
				}
			}
		},
		{
			"slug": "drft-r",
			"name": "DRFT-R",
			"assetKey": "DRFT-R",
			"rarity": "mythic",
			"type": "astromech",
			"percentIncome": false,
			"percentValue": null,
			"perk": "perk.mythicAstromech",
			"unverified": true,
			"tiers": {
				"DEFAULT": {
					"income": 5800,
					"incomeLabel": null,
					"cost": 228e6,
					"costLabel": null,
					"value": null,
					"valueLabel": null,
					"image": "DRFT-R_DEFAULT.png",
					"imageIsFallback": false
				},
				"GOLD": {
					"income": 11600,
					"incomeLabel": null,
					"cost": null,
					"costLabel": null,
					"value": null,
					"valueLabel": null,
					"image": "DRFT-R_GOLD.png",
					"imageIsFallback": false
				},
				"DIAMOND": {
					"income": 23200,
					"incomeLabel": null,
					"cost": null,
					"costLabel": null,
					"value": null,
					"valueLabel": null,
					"image": "DRFT-R_DIAMOND.png",
					"imageIsFallback": false
				},
				"RAINBOW": {
					"income": 46400,
					"incomeLabel": null,
					"cost": null,
					"costLabel": null,
					"value": null,
					"valueLabel": null,
					"image": "DRFT-R_RAINBOW.png",
					"imageIsFallback": false
				},
				"BESKAR": {
					"income": 92800,
					"incomeLabel": null,
					"cost": null,
					"costLabel": null,
					"value": null,
					"valueLabel": null,
					"image": "DRFT-R_BESKAR.png",
					"imageIsFallback": false
				},
				"GALACTIC": {
					"income": null,
					"incomeLabel": null,
					"cost": null,
					"costLabel": null,
					"value": null,
					"valueLabel": null,
					"image": "DRFT-R_BESKAR.png",
					"imageIsFallback": true
				}
			}
		},
		{
			"slug": "ig",
			"name": "IG",
			"assetKey": "IG",
			"rarity": "mythic",
			"type": "battle",
			"percentIncome": false,
			"percentValue": null,
			"perk": "perk.mythicBattle",
			"unverified": true,
			"tiers": {
				"DEFAULT": {
					"income": 5800,
					"incomeLabel": null,
					"cost": 228e6,
					"costLabel": null,
					"value": null,
					"valueLabel": null,
					"image": "IG_DEFAULT.png",
					"imageIsFallback": false
				},
				"GOLD": {
					"income": 11600,
					"incomeLabel": null,
					"cost": null,
					"costLabel": null,
					"value": null,
					"valueLabel": null,
					"image": "IG_GOLD.png",
					"imageIsFallback": false
				},
				"DIAMOND": {
					"income": 23200,
					"incomeLabel": null,
					"cost": null,
					"costLabel": null,
					"value": null,
					"valueLabel": null,
					"image": "IG_DIAMOND.png",
					"imageIsFallback": false
				},
				"RAINBOW": {
					"income": 46400,
					"incomeLabel": null,
					"cost": null,
					"costLabel": null,
					"value": null,
					"valueLabel": null,
					"image": "IG_RAINBOW.png",
					"imageIsFallback": false
				},
				"BESKAR": {
					"income": 92800,
					"incomeLabel": null,
					"cost": null,
					"costLabel": null,
					"value": null,
					"valueLabel": null,
					"image": "IG_BESKAR.png",
					"imageIsFallback": false
				},
				"GALACTIC": {
					"income": null,
					"incomeLabel": null,
					"cost": null,
					"costLabel": null,
					"value": null,
					"valueLabel": null,
					"image": "IG_BESKAR.png",
					"imageIsFallback": true
				}
			}
		},
		{
			"slug": "lep",
			"name": "LEP",
			"assetKey": "LEP",
			"rarity": "mythic",
			"type": "worker",
			"percentIncome": false,
			"percentValue": null,
			"perk": "perk.mythicWorker",
			"unverified": true,
			"tiers": {
				"DEFAULT": {
					"income": 6500,
					"incomeLabel": null,
					"cost": 252e6,
					"costLabel": null,
					"value": null,
					"valueLabel": null,
					"image": "LEP_DEFAULT.png",
					"imageIsFallback": false
				},
				"GOLD": {
					"income": 13e3,
					"incomeLabel": null,
					"cost": null,
					"costLabel": null,
					"value": null,
					"valueLabel": null,
					"image": "LEP_GOLD.png",
					"imageIsFallback": false
				},
				"DIAMOND": {
					"income": 26e3,
					"incomeLabel": null,
					"cost": null,
					"costLabel": null,
					"value": null,
					"valueLabel": null,
					"image": "LEP_DIAMOND.png",
					"imageIsFallback": false
				},
				"RAINBOW": {
					"income": 52e3,
					"incomeLabel": null,
					"cost": null,
					"costLabel": null,
					"value": null,
					"valueLabel": null,
					"image": "LEP_RAINBOW.png",
					"imageIsFallback": false
				},
				"BESKAR": {
					"income": 104e3,
					"incomeLabel": null,
					"cost": null,
					"costLabel": null,
					"value": null,
					"valueLabel": null,
					"image": "LEP_BESKAR.png",
					"imageIsFallback": false
				},
				"GALACTIC": {
					"income": null,
					"incomeLabel": null,
					"cost": null,
					"costLabel": null,
					"value": null,
					"valueLabel": null,
					"image": "LEP_BESKAR.png",
					"imageIsFallback": true
				}
			}
		},
		{
			"slug": "tri-tek",
			"name": "TRI-TEK",
			"assetKey": "TRI-TEK",
			"rarity": "mythic",
			"type": "astromech",
			"percentIncome": false,
			"percentValue": null,
			"perk": "perk.mythicAstromech",
			"unverified": true,
			"tiers": {
				"DEFAULT": {
					"income": 6500,
					"incomeLabel": null,
					"cost": 252e6,
					"costLabel": null,
					"value": null,
					"valueLabel": null,
					"image": "TRI-TEK_DEFAULT.png",
					"imageIsFallback": false
				},
				"GOLD": {
					"income": 13e3,
					"incomeLabel": null,
					"cost": null,
					"costLabel": null,
					"value": null,
					"valueLabel": null,
					"image": "TRI-TEK_GOLD.png",
					"imageIsFallback": false
				},
				"DIAMOND": {
					"income": 26e3,
					"incomeLabel": null,
					"cost": null,
					"costLabel": null,
					"value": null,
					"valueLabel": null,
					"image": "TRI-TEK_DIAMOND.png",
					"imageIsFallback": false
				},
				"RAINBOW": {
					"income": 52e3,
					"incomeLabel": null,
					"cost": null,
					"costLabel": null,
					"value": null,
					"valueLabel": null,
					"image": "TRI-TEK_RAINBOW.png",
					"imageIsFallback": false
				},
				"BESKAR": {
					"income": 104e3,
					"incomeLabel": null,
					"cost": null,
					"costLabel": null,
					"value": null,
					"valueLabel": null,
					"image": "TRI-TEK_BESKAR.png",
					"imageIsFallback": false
				},
				"GALACTIC": {
					"income": null,
					"incomeLabel": null,
					"cost": null,
					"costLabel": null,
					"value": null,
					"valueLabel": null,
					"image": "TRI-TEK_BESKAR.png",
					"imageIsFallback": true
				}
			}
		},
		{
			"slug": "loadlifter",
			"name": "LOADLIFTER",
			"assetKey": "LOADLIFTER",
			"rarity": "mythic",
			"type": "worker",
			"percentIncome": false,
			"percentValue": null,
			"perk": "perk.mythicWorker",
			"unverified": true,
			"tiers": {
				"DEFAULT": {
					"income": 7200,
					"incomeLabel": null,
					"cost": 3e8,
					"costLabel": null,
					"value": null,
					"valueLabel": null,
					"image": "LOADLIFTER_DEFAULT.png",
					"imageIsFallback": false
				},
				"GOLD": {
					"income": 14400,
					"incomeLabel": null,
					"cost": null,
					"costLabel": null,
					"value": null,
					"valueLabel": null,
					"image": "LOADLIFTER_GOLD.png",
					"imageIsFallback": false
				},
				"DIAMOND": {
					"income": 28800,
					"incomeLabel": null,
					"cost": null,
					"costLabel": null,
					"value": null,
					"valueLabel": null,
					"image": "LOADLIFTER_DIAMOND.png",
					"imageIsFallback": false
				},
				"RAINBOW": {
					"income": 57600,
					"incomeLabel": null,
					"cost": null,
					"costLabel": null,
					"value": null,
					"valueLabel": null,
					"image": "LOADLIFTER_RAINBOW.png",
					"imageIsFallback": false
				},
				"BESKAR": {
					"income": 115200,
					"incomeLabel": null,
					"cost": null,
					"costLabel": null,
					"value": null,
					"valueLabel": null,
					"image": "LOADLIFTER_BESKAR.png",
					"imageIsFallback": false
				},
				"GALACTIC": {
					"income": null,
					"incomeLabel": null,
					"cost": null,
					"costLabel": null,
					"value": null,
					"valueLabel": null,
					"image": "LOADLIFTER_BESKAR.png",
					"imageIsFallback": true
				}
			}
		},
		{
			"slug": "mo-trak",
			"name": "MO-TRAK",
			"assetKey": "MO-TRAK",
			"rarity": "mythic",
			"type": "astromech",
			"percentIncome": false,
			"percentValue": null,
			"perk": "perk.mythicAstromech",
			"unverified": true,
			"tiers": {
				"DEFAULT": {
					"income": 7200,
					"incomeLabel": null,
					"cost": 3e8,
					"costLabel": null,
					"value": null,
					"valueLabel": null,
					"image": "MO-TRAK_DEFAULT.png",
					"imageIsFallback": false
				},
				"GOLD": {
					"income": 14400,
					"incomeLabel": null,
					"cost": null,
					"costLabel": null,
					"value": null,
					"valueLabel": null,
					"image": "MO-TRAK_GOLD.png",
					"imageIsFallback": false
				},
				"DIAMOND": {
					"income": 28800,
					"incomeLabel": null,
					"cost": null,
					"costLabel": null,
					"value": null,
					"valueLabel": null,
					"image": "MO-TRAK_DIAMOND.png",
					"imageIsFallback": false
				},
				"RAINBOW": {
					"income": 57600,
					"incomeLabel": null,
					"cost": null,
					"costLabel": null,
					"value": null,
					"valueLabel": null,
					"image": "MO-TRAK_RAINBOW.png",
					"imageIsFallback": false
				},
				"BESKAR": {
					"income": 115200,
					"incomeLabel": null,
					"cost": null,
					"costLabel": null,
					"value": null,
					"valueLabel": null,
					"image": "MO-TRAK_BESKAR.png",
					"imageIsFallback": false
				},
				"GALACTIC": {
					"income": null,
					"incomeLabel": null,
					"cost": null,
					"costLabel": null,
					"value": null,
					"valueLabel": null,
					"image": "MO-TRAK_BESKAR.png",
					"imageIsFallback": true
				}
			}
		},
		{
			"slug": "kx",
			"name": "KX",
			"assetKey": "KX",
			"rarity": "mythic",
			"type": "battle",
			"percentIncome": false,
			"percentValue": null,
			"perk": "perk.mythicBattle",
			"unverified": true,
			"tiers": {
				"DEFAULT": {
					"income": 7200,
					"incomeLabel": null,
					"cost": 3e8,
					"costLabel": null,
					"value": null,
					"valueLabel": null,
					"image": "KX_DEFAULT.png",
					"imageIsFallback": false
				},
				"GOLD": {
					"income": 14400,
					"incomeLabel": null,
					"cost": null,
					"costLabel": null,
					"value": null,
					"valueLabel": null,
					"image": "KX_GOLD.png",
					"imageIsFallback": false
				},
				"DIAMOND": {
					"income": 28800,
					"incomeLabel": null,
					"cost": null,
					"costLabel": null,
					"value": null,
					"valueLabel": null,
					"image": "KX_DIAMOND.png",
					"imageIsFallback": false
				},
				"RAINBOW": {
					"income": 57600,
					"incomeLabel": null,
					"cost": null,
					"costLabel": null,
					"value": null,
					"valueLabel": null,
					"image": "KX_RAINBOW.png",
					"imageIsFallback": false
				},
				"BESKAR": {
					"income": 115200,
					"incomeLabel": null,
					"cost": null,
					"costLabel": null,
					"value": null,
					"valueLabel": null,
					"image": "KX_BESKAR.png",
					"imageIsFallback": false
				},
				"GALACTIC": {
					"income": null,
					"incomeLabel": null,
					"cost": null,
					"costLabel": null,
					"value": null,
					"valueLabel": null,
					"image": "KX_BESKAR.png",
					"imageIsFallback": true
				}
			}
		},
		{
			"slug": "bb8",
			"name": "BB8",
			"assetKey": "BB8",
			"rarity": "iconic",
			"type": "astromech",
			"percentIncome": true,
			"percentValue": 15,
			"perk": "perk.bb8",
			"unverified": false,
			"tiers": { "DEFAULT": {
				"income": null,
				"incomeLabel": "5%/s",
				"cost": null,
				"costLabel": null,
				"value": null,
				"valueLabel": null,
				"image": "BB8_DEFAULT.png",
				"imageIsFallback": false
			} }
		},
		{
			"slug": "mister-bones",
			"name": "MISTER BONES",
			"assetKey": "MISTER_BONES",
			"rarity": "iconic",
			"type": "battle",
			"percentIncome": true,
			"percentValue": 15,
			"perk": "perk.misterBones",
			"unverified": false,
			"tiers": { "DEFAULT": {
				"income": null,
				"incomeLabel": "5%/s",
				"cost": null,
				"costLabel": null,
				"value": null,
				"valueLabel": null,
				"image": "MISTER_BONES_DEFAULT.png",
				"imageIsFallback": false
			} }
		},
		{
			"slug": "ig-11-marshal",
			"name": "IG-11 MARSHAL",
			"assetKey": "IG-11_MARSHAL",
			"rarity": "iconic",
			"type": "battle",
			"percentIncome": true,
			"percentValue": 15,
			"perk": "perk.ig11",
			"unverified": false,
			"tiers": { "DEFAULT": {
				"income": null,
				"incomeLabel": "5%/s",
				"cost": null,
				"costLabel": null,
				"value": null,
				"valueLabel": null,
				"image": "IG-11_MARSHAL_DEFAULT.png",
				"imageIsFallback": false
			} }
		},
		{
			"slug": "dj-r3x",
			"name": "DJ-R3X",
			"assetKey": "DJ-R3X",
			"rarity": "iconic",
			"type": "worker",
			"percentIncome": true,
			"percentValue": 15,
			"perk": "perk.djr3x",
			"unverified": true,
			"tiers": { "DEFAULT": {
				"income": null,
				"incomeLabel": null,
				"cost": null,
				"costLabel": null,
				"value": null,
				"valueLabel": null,
				"image": "DJ-R3X_DEFAULT.png",
				"imageIsFallback": false
			} }
		},
		{
			"slug": "cb-23",
			"name": "CB-23",
			"assetKey": "CB-23",
			"rarity": "iconic",
			"type": "astromech",
			"percentIncome": true,
			"percentValue": 15,
			"perk": "perk.cb23",
			"unverified": true,
			"tiers": { "DEFAULT": {
				"income": null,
				"incomeLabel": null,
				"cost": null,
				"costLabel": null,
				"value": null,
				"valueLabel": null,
				"image": "CB-23_DEFAULT.png",
				"imageIsFallback": false
			} }
		},
		{
			"slug": "r2-d2",
			"name": "R2-D2",
			"assetKey": "R2-D2",
			"rarity": "iconic",
			"type": "astromech",
			"percentIncome": true,
			"percentValue": 25,
			"perk": null,
			"unverified": true,
			"tiers": { "DEFAULT": {
				"income": null,
				"incomeLabel": null,
				"cost": null,
				"costLabel": null,
				"value": null,
				"valueLabel": null,
				"image": "R2-D2_DEFAULT.png",
				"imageIsFallback": false
			} }
		},
		{
			"slug": "c-3p0",
			"name": "C-3P0",
			"assetKey": "C-3P0",
			"rarity": "iconic",
			"type": "worker",
			"percentIncome": true,
			"percentValue": 25,
			"perk": null,
			"unverified": true,
			"tiers": { "DEFAULT": {
				"income": null,
				"incomeLabel": null,
				"cost": null,
				"costLabel": null,
				"value": null,
				"valueLabel": null,
				"image": "C-3P0_DEFAULT.png",
				"imageIsFallback": false
			} }
		}
	]
};
/** Ordre des paliers, pour comparer « qui est plus haut que qui ». */
var TIER_RANK = {
	DEFAULT: 0,
	GOLD: 1,
	DIAMOND: 2,
	RAINBOW: 3,
	BESKAR: 4,
	GALACTIC: 5
};
/** Les paliers du plus bas au plus haut, dérivés du barème ci-dessus pour rester alignés. */
var TIER_ORDER = Object.keys(TIER_RANK).sort((a, b) => TIER_RANK[a] - TIER_RANK[b]);
var emptyEntry = () => ({
	tier: null,
	flawless: false
});
/**
* Suivi de collection **local-first**.
*
* L'app se consulte largement sans compte : forcer la connexion pour cocher une case
* ferait fuir la moitié des visiteurs. La progression vit donc toujours dans
* `localStorage`, et n'est répliquée sur le serveur que si l'utilisateur est connecté.
* À la première connexion, une progression locale non vide est poussée vers un compte
* encore vierge — on ne perd pas ce qui a été coché avant de créer le compte.
*/
var useCollectionStore = defineStore("collection", () => {
	const droids = computed(() => data.droids);
	const entries = ref({});
	const rebirth = ref(0);
	const superRebirth = ref(0);
	const cycle = ref(1);
	const novaCrystals = ref(0);
	const shopLevels = ref({});
	/** `true` dès qu'une session est active : conditionne la réplication serveur. */
	const remoteEnabled = ref(false);
	const loading = ref(false);
	const syncing = ref(false);
	/** Erreur de synchronisation serveur. Le local, lui, a déjà été écrit. */
	const syncError = ref(null);
	function snapshot() {
		return {
			collection: entries.value,
			rebirth: rebirth.value,
			superRebirth: superRebirth.value,
			cycle: cycle.value,
			novaCrystals: novaCrystals.value,
			shopLevels: shopLevels.value
		};
	}
	function apply(s) {
		entries.value = s.collection ?? {};
		rebirth.value = s.rebirth ?? 0;
		superRebirth.value = s.superRebirth ?? 0;
		cycle.value = s.cycle ?? 1;
		novaCrystals.value = s.novaCrystals ?? 0;
		shopLevels.value = s.shopLevels ?? {};
	}
	function entry(slug) {
		return entries.value[slug] ?? emptyEntry();
	}
	/**
	* Paliers réellement décrits pour un droid. Les Emblématiques n'en ont qu'un ; les
	* autres en ont six, Galactique compris.
	*/
	const tiersOf = (d) => TIER_ORDER.filter((t) => d.tiers[t]);
	/**
	* Nombre de variantes possédées pour un droid.
	*
	* On collectionne une entrée **par palier**, pas par droid : un MOUSE Beskar vaut cinq
	* variantes — Typique, Or, Diamant, Arc-en-ciel, Beskar — puisqu'un palier supérieur
	* satisfait toujours les inférieurs, règle déjà portée par `satisfies()`.
	*/
	function ownedTiersOf(d) {
		const owned = entry(d.slug).tier;
		if (!owned) return 0;
		return tiersOf(d).filter((t) => TIER_RANK[t] <= TIER_RANK[owned]).length;
	}
	const ownedCount = computed(() => droids.value.reduce((n, d) => n + ownedTiersOf(d), 0));
	const totalCount = computed(() => droids.value.reduce((n, d) => n + tiersOf(d).length, 0));
	const countByRarity = computed(() => {
		const acc = {};
		for (const r of data.rarities) acc[r] = {
			owned: 0,
			total: 0
		};
		for (const d of droids.value) {
			acc[d.rarity].total += tiersOf(d).length;
			acc[d.rarity].owned += ownedTiersOf(d);
		}
		return acc;
	});
	/**
	* Nombre de droids possédés à chaque palier, en comptage exact : un droid en Beskar
	* compte pour Beskar et nulle part ailleurs. C'est la lecture utile pour un
	* collectionneur — « combien de Beskar j'ai » — là où un comptage cumulatif
	* (« au moins Or ») ne ferait que répéter le total.
	*/
	const countByTier = computed(() => {
		const acc = {};
		for (const t of data.tiers) acc[t] = 0;
		for (const e of Object.values(entries.value)) if (e.tier) acc[e.tier] = (acc[e.tier] ?? 0) + 1;
		return acc;
	});
	/**
	* Revenu total des droids possédés, au palier possédé. Les Emblématiques sont exclus :
	* ils rapportent un pourcentage du revenu global, les additionner n'aurait pas de sens.
	*/
	const totalIncome = computed(() => droids.value.reduce((sum, d) => {
		const tier = entry(d.slug).tier;
		if (!tier || d.percentIncome) return sum;
		return sum + (d.tiers[tier]?.income ?? 0);
	}, 0));
	/** Un palier possédé satisfait toute exigence d'un palier inférieur ou égal. */
	function satisfies(slug, required) {
		const owned = entry(slug).tier;
		return owned !== null && TIER_RANK[owned] >= TIER_RANK[required];
	}
	const isEmpty = computed(() => !Object.values(entries.value).some((e) => e.tier !== null) && rebirth.value === 0 && superRebirth.value === 0 && novaCrystals.value === 0 && !Object.keys(shopLevels.value).length);
	/** Charge le local. Appelé au montage, avant même de savoir si une session existe. */
	function loadLocal() {
	}
	/**
	* Bascule en mode connecté. Si le compte est vierge et que du travail local existe,
	* on le pousse ; sinon le serveur fait autorité, c'est lui qui a vu les autres appareils.
	*/
	async function enableRemote() {
		loading.value = true;
		syncError.value = null;
		try {
			const remote = await ofetch("/api/progress");
			if (!Object.values(remote.collection ?? {}).some((e) => e.tier !== null) && !remote.rebirth && !isEmpty.value) {
				remoteEnabled.value = true;
				await push(snapshot());
			} else {
				apply(remote);
				remoteEnabled.value = true;
			}
		} catch (err) {
			syncError.value = err instanceof Error ? err.message : String(err);
		} finally {
			loading.value = false;
		}
	}
	/** Repasse en mode anonyme sans effacer le local : on redevient un simple visiteur. */
	function disableRemote() {
		remoteEnabled.value = false;
		syncError.value = null;
	}
	/** Envoie un delta au serveur. Sans session, c'est un no-op silencieux et voulu. */
	async function push(payload) {
		if (!remoteEnabled.value) return;
		syncing.value = true;
		syncError.value = null;
		try {
			await ofetch("/api/progress", {
				method: "PATCH",
				body: payload
			});
		} catch (err) {
			syncError.value = err instanceof Error ? err.message : String(err);
		} finally {
			syncing.value = false;
		}
	}
	async function setTier(slug, tier) {
		const next = {
			...entry(slug),
			tier
		};
		entries.value = {
			...entries.value,
			[slug]: next
		};
		await push({ collection: { [slug]: next } });
	}
	async function toggleFlawless(slug) {
		const previous = entry(slug);
		const next = {
			...previous,
			flawless: !previous.flawless
		};
		entries.value = {
			...entries.value,
			[slug]: next
		};
		await push({ collection: { [slug]: next } });
	}
	async function setShopLevel(itemId, level) {
		shopLevels.value = {
			...shopLevels.value,
			[itemId]: level
		};
		await push({ shopLevels: { [itemId]: level } });
	}
	async function setNovaCrystals(value) {
		novaCrystals.value = value;
		await push({ novaCrystals: value });
	}
	async function setRebirth(value) {
		rebirth.value = value;
		await push({ rebirth: value });
	}
	async function setSuperRebirth(value, nextCycle) {
		superRebirth.value = value;
		cycle.value = nextCycle;
		await push({
			superRebirth: value,
			cycle: nextCycle
		});
	}
	/**
	* Remet tout à zéro, local **et** serveur.
	*
	* L'effacement distant n'était pas fait : la progression revenait à la reconnexion
	* suivante, ce qui rendait le bouton trompeur. On vide le local d'abord — l'utilisateur
	* voit l'effet immédiatement — puis on supprime le document si une session est active.
	*/
	async function clear() {
		apply({});
		if (!remoteEnabled.value) return;
		syncing.value = true;
		syncError.value = null;
		try {
			await ofetch("/api/progress", { method: "DELETE" });
		} catch (err) {
			syncError.value = err instanceof Error ? err.message : String(err);
		} finally {
			syncing.value = false;
		}
	}
	return {
		droids,
		dataset: data,
		entries,
		rebirth,
		superRebirth,
		cycle,
		novaCrystals,
		shopLevels,
		remoteEnabled,
		loading,
		syncing,
		syncError,
		entry,
		ownedCount,
		totalCount,
		countByRarity,
		countByTier,
		totalIncome,
		isEmpty,
		satisfies,
		loadLocal,
		enableRemote,
		disableRemote,
		setTier,
		toggleFlawless,
		setShopLevel,
		setNovaCrystals,
		setRebirth,
		setSuperRebirth,
		clear
	};
});

export { generatedFrom as g, useCollectionStore as u };
//# sourceMappingURL=collection-CMF38Hwi.mjs.map
