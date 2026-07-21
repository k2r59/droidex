<script setup lang="ts">
import type { Droid, Tier } from '~~/shared/types/droid'

const props = defineProps<{ droid: Droid }>()

const store = useCollectionStore()
const { locale } = useI18n()
const localePath = useLocalePath()

const entry = computed(() => store.entry(props.droid.slug))
const owned = computed(() => entry.value.tiers.length > 0)

/** Palier survolé dans le sélecteur — prime sur le palier possédé pour l'illustration. */
const previewTier = ref<Tier | null>(null)

/**
 * Illustration affichée : le palier survolé, sinon le palier possédé, sinon Default.
 * C'est ce qui permet de voir la version Or ou Beskar d'un droid sans le posséder.
 */
const shownTier = computed<Tier>(() => previewTier.value ?? store.highestTier(props.droid.slug) ?? 'DEFAULT')

const stats = computed(() => props.droid.tiers[shownTier.value])

const RARITY_RING: Record<string, string> = {
  common: 'border-common/40',
  rare: 'border-rare/50',
  epic: 'border-epic/50',
  legendary: 'border-legendary/60',
  mythic: 'border-mythic/60',
  iconic: 'border-iconic/60',
}
</script>

<template>
  <article
    class="droid-card group relative flex flex-col gap-3 rounded-card border bg-panel p-3 transition-colors"
    :class="[
      RARITY_RING[droid.rarity],
      owned ? 'bg-panel-raised' : 'hover:bg-panel-raised',
    ]"
  >
    <!-- Pastille de possession, lisible d'un coup d'œil sur une grille dense. -->
    <span
      v-if="owned"
      class="absolute right-2 top-2 grid size-5 place-items-center rounded-full bg-valid text-xs font-bold text-void"
      :title="$t('droidex.tierCount', { count: entry.tiers.length })"
      aria-hidden="true"
    >✓</span>

    <div class="flex items-start gap-3">
      <DroidImage
        :droid="droid"
        :tier="shownTier"
        size="md"
        :dimmed="!owned && !previewTier"
      />

      <div class="min-w-0 flex-1">
        <NuxtLink
          :to="localePath(`/droids/${droid.slug}`)"
          class="block truncate font-semibold hover:underline"
        >
          {{ droid.name }}
        </NuxtLink>

        <div class="mt-0.5 flex flex-wrap items-center gap-1.5 text-xs">
          <RarityBadge :rarity="droid.rarity" />
          <span class="text-ink-muted">{{ $t(`type.${droid.type}`) }}</span>
        </div>

        <p class="mt-1.5 font-mono text-sm tabular-nums">
          <template v-if="droid.percentIncome">
            <span class="text-iconic">{{ $t('droid.percentIncome', { value: droid.percentValue ?? '?' }) }}</span>
          </template>
          <template v-else-if="stats?.income">
            {{ formatIncome(stats.income, locale) }}
            <span class="ml-1 text-xs text-ink-muted">{{ $t(`tier.${shownTier}`) }}</span>
          </template>
          <span
            v-else
            class="text-ink-muted"
          >{{ $t('droid.noData') }}</span>
        </p>
      </div>
    </div>

    <!--
      Les Iconiques n'ont ni palier ni Parfait : un seul palier existe — le sélecteur se
      réduisait à un cercle gris sans choix — et ils ne sont pas fabricables, or le Parfait
      s'obtient à la fabrication (le Guide compte 51 types concernés, Iconiques exclus).
      La rangée entière disparaît donc pour eux ; la coche de possession suffit.
    -->
    <div
      v-if="!droid.percentIncome"
      class="flex items-center justify-between gap-2"
    >
      <TierSelector
        :droid="droid"
        :model-value="entry.tiers"
        size="sm"
        @toggle="store.toggleTier(droid.slug, $event)"
        @preview="previewTier = $event"
      />

      <div class="flex items-center gap-1.5">
        <span
          v-if="droid.unverified"
          class="cursor-help text-xs text-warn"
          :title="$t('droid.unverifiedHint')"
        >⚠</span>

        <button
          type="button"
          class="text-sm transition-transform hover:scale-125"
          :class="entry.flawless ? 'opacity-100' : 'opacity-25 hover:opacity-60'"
          :title="$t('droid.flawless')"
          :aria-pressed="entry.flawless"
          @click="store.toggleFlawless(droid.slug)"
        >
          ✨
        </button>
      </div>
    </div>

    <!-- Iconique : la possession se bascule directement, sans passer par un palier. -->
    <div
      v-else
      class="flex items-center justify-between gap-2"
    >
      <DxToggle
        :model-value="owned"
        :label="$t('droid.owned')"
        @update:model-value="store.setOwned(droid.slug, $event)"
      />

      <span
        v-if="droid.unverified"
        class="cursor-help text-xs text-warn"
        :title="$t('droid.unverifiedHint')"
      >⚠</span>
    </div>
  </article>
</template>
