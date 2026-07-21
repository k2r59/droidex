<script setup lang="ts">
import rebirthData from '~/data/rebirths.json'
import type { Droid, Tier } from '~~/shared/types/droid'

const route = useRoute()
const store = useCollectionStore()
const { t, locale } = useI18n()
const localePath = useLocalePath()

const slug = computed(() => String(route.params.slug))
const droid = computed<Droid | undefined>(() => store.droids.find((d) => d.slug === slug.value))

// 404 propre plutôt qu'une page vide si le slug n'existe pas.
if (!droid.value) {
  throw createError({ statusCode: 404, statusMessage: `Droid introuvable : ${slug.value}` })
}

useSeoMeta({
  title: () => droid.value?.name ?? '',
  description: () =>
    t('droidex.subtitle', { owned: store.ownedCount, total: store.totalCount }),
})

const entry = computed(() => store.entry(slug.value))
const tiers = computed(() => Object.keys(droid.value!.tiers) as Tier[])

/** Palier mis en avant dans la grande illustration. */
const focusTier = ref<Tier>('DEFAULT')
watchEffect(() => { focusTier.value = store.highestTier(slug.value) ?? 'DEFAULT' })

const focusStats = computed(() => droid.value!.tiers[focusTier.value])

/** Paliers de renaissance qui exigent ce droid, tous cycles confondus. */
const usedInRebirths = computed(() => {
  const out: { cycle: number; level: number; tier: Tier | null }[] = []
  for (const [cycle, levels] of Object.entries(rebirthData.cycles as Record<string, { level: number; droids: { slug: string; tier: Tier | null }[] }[]>)) {
    for (const lvl of levels) {
      for (const req of lvl.droids) {
        if (req.slug === slug.value) out.push({ cycle: Number(cycle), level: lvl.level, tier: req.tier })
      }
    }
  }
  return out.sort((a, b) => a.cycle - b.cycle || a.level - b.level)
})
</script>

<template>
  <div v-if="droid" class="flex flex-col gap-5">
    <NuxtLink :to="localePath('/')" class="text-sm text-ink-muted hover:text-ink">
      ← {{ $t('droid.backToDroidex') }}
    </NuxtLink>

    <section class="panel flex flex-col gap-5 p-5 md:flex-row">
      <div class="flex shrink-0 flex-col items-center gap-2">
        <DroidImage :droid="droid" :tier="focusTier" size="lg" />
        <p class="text-xs text-ink-muted">{{ $t(`tier.${focusTier}`) }}</p>
        <p v-if="focusStats?.imageIsFallback" class="max-w-40 text-center text-xs text-tier-galactic">
          {{ $t('droid.imageFallback') }}
        </p>
      </div>

      <div class="min-w-0 flex-1">
        <div class="flex flex-wrap items-center gap-2">
          <h1 class="text-2xl font-bold">{{ droid.name }}</h1>
          <RarityBadge :rarity="droid.rarity" />
          <span class="text-sm text-ink-muted">{{ $t(`type.${droid.type}`) }}</span>
          <span
            v-if="droid.unverified"
            class="rounded bg-warn/15 px-1.5 py-0.5 text-xs text-warn"
            :title="$t('droid.unverifiedHint')"
          >{{ $t('droid.unverified') }}</span>
        </div>

        <p v-if="droid.perk" class="mt-2 rounded-lg bg-panel-raised px-3 py-2 text-sm">
          <span class="text-xs text-ink-muted">{{ $t('droid.perk') }}</span><br>
          {{ $t(droid.perk) }}
        </p>

        <div class="mt-4 flex flex-wrap items-center gap-x-6 gap-y-4">
          <!--
            Les Emblématiques n'ont qu'un palier : le sélecteur se réduirait à un cercle
            unique, qui n'offre aucun choix. On le remplace par une bascule « possédé ».
          -->
          <DxToggle
            v-if="droid.percentIncome"
            :model-value="entry.tiers.length > 0"
            :label="$t('droid.owned')"
            @update:model-value="store.setOwned(slug, $event)"
          />

          <div v-else>
            <p class="text-xs text-ink-muted">{{ $t('droidex.filterTier') }}</p>
            <TierSelector
              :droid="droid"
              :model-value="entry.tiers"
              @toggle="store.toggleTier(slug, $event)"
              @preview="focusTier = $event ?? store.highestTier(slug) ?? 'DEFAULT'"
            />
          </div>

          <DxToggle
            :model-value="entry.flawless"
            :label="$t('droid.flawless')"
            @update:model-value="store.toggleFlawless(slug)"
          />
        </div>

        <!--
          Galerie des paliers, déplacée sous le texte : empilée sous l'illustration, elle
          allongeait la carte alors que la colonne de droite avait de la place en largeur.
        -->
        <div v-if="!droid.percentIncome" class="mt-4 flex flex-wrap gap-1.5">
          <button
            v-for="tier in tiers"
            :key="tier"
            type="button"
            class="rounded-lg border p-1 transition-colors"
            :class="focusTier === tier ? 'border-iconic bg-panel-raised' : 'border-edge-soft hover:border-edge-strong'"
            :title="$t(`tier.${tier}`)"
            @click="focusTier = tier"
          >
            <DroidImage :droid="droid" :tier="tier" size="sm" :dimmed="!entry.tiers.includes(tier)" />
          </button>
        </div>

        <p class="mt-1 text-xs text-ink-muted">{{ $t('droid.flawlessHint') }}</p>

        <!-- Revenu en pourcentage pour les Emblématiques : pas de tableau par palier. -->
        <p v-if="droid.percentIncome" class="mt-4 text-lg text-iconic">
          {{ $t('droid.percentIncome', { value: droid.percentValue ?? '?' }) }}
        </p>
      </div>
    </section>

    <section v-if="!droid.percentIncome" class="panel overflow-x-auto">
      <h2 class="px-4 pt-4 font-semibold">{{ $t('droid.tierTable') }}</h2>

      <table class="mt-3 w-full text-sm">
        <thead class="border-b border-edge-soft text-left text-xs uppercase text-ink-muted">
          <tr>
            <th class="px-4 py-2 font-medium">{{ $t('droidex.filterTier') }}</th>
            <th class="px-4 py-2 text-right font-medium">{{ $t('droid.income') }}</th>
            <th class="px-4 py-2 text-right font-medium">{{ $t('droid.cost') }}</th>
            <th class="px-4 py-2 text-right font-medium">{{ $t('droid.value') }}</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="tier in tiers"
            :key="tier"
            class="border-b border-edge-soft transition-colors last:border-0 hover:bg-panel-raised"
            :class="entry.tiers.includes(tier) && 'bg-panel-raised'"
          >
            <td class="px-4 py-2">
              <button type="button" class="flex items-center gap-2 hover:underline" @click="focusTier = tier">
                <DroidImage :droid="droid" :tier="tier" size="sm" />
                {{ $t(`tier.${tier}`) }}
              </button>
            </td>
            <td class="px-4 py-2 text-right font-mono tabular-nums" :title="formatExact(droid.tiers[tier]?.income, locale)">
              {{ formatIncome(droid.tiers[tier]?.income, locale) }}
            </td>
            <td class="px-4 py-2 text-right font-mono tabular-nums text-ink-muted" :title="formatExact(droid.tiers[tier]?.cost, locale)">
              {{ formatNumber(droid.tiers[tier]?.cost, locale) }}
            </td>
            <td class="px-4 py-2 text-right font-mono tabular-nums text-ink-muted" :title="formatExact(droid.tiers[tier]?.value, locale)">
              {{ formatNumber(droid.tiers[tier]?.value, locale) }}
            </td>
          </tr>
        </tbody>
      </table>

      <p class="px-4 py-3 text-xs text-ink-muted">{{ $t('droid.galacticNoData') }}</p>
    </section>

    <section v-if="usedInRebirths.length" class="panel p-4">
      <h2 class="mb-2 font-semibold">{{ $t('droid.usedInRebirths') }}</h2>
      <ul class="flex flex-wrap gap-2 text-sm">
        <li
          v-for="use in usedInRebirths"
          :key="`${use.cycle}-${use.level}-${use.tier}`"
          class="rounded-lg bg-panel-raised px-2.5 py-1"
        >
          <span class="text-xs text-ink-muted">{{ $t('rebirth.cycle', { number: use.cycle }) }} ·</span>
          {{ use.level }}
          <span class="text-xs text-ink-muted">
            <!-- Même règle que sur la page Renaissances : une exigence sans palier
                 équivaut à « Typique », puisque tout palier possédé la satisfait. -->
            {{ $t(`tier.${use.tier ?? 'DEFAULT'}`) }}
          </span>
        </li>
      </ul>
    </section>
  </div>
</template>
