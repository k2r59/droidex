<script setup lang="ts">
import mechanics from '~/data/mechanics.json'

const { t, locale } = useI18n()
const { gameText, gameTextList } = useGameText()
const localePath = useLocalePath()

useSeoMeta({
  title: () => t('guide.title'),
  description: () => t('guide.subtitle'),
})

const base = mechanics.base
</script>

<template>
  <div class="flex flex-col gap-5">
    <header>
      <h1 class="text-xl font-bold">
        {{ $t('guide.title') }}
      </h1>
      <p class="text-sm text-ink-muted">
        {{ $t('guide.subtitle') }}
      </p>
    </header>

    <section class="panel p-6">
      <h2 class="mb-3 font-semibold">
        {{ $t('guide.base') }}
      </h2>
      <p class="text-sm">
        {{ $t('guide.slots', {
          count: base.totalSlots,
          worker: base.slotsByType.worker,
          astromech: base.slotsByType.astromech,
          battle: base.slotsByType.battle,
        }) }}
      </p>
      <ul class="mt-2 flex flex-col gap-1 text-sm text-ink-muted">
        <li>• {{ $t('guide.specialtyBonus') }}</li>
        <li>• {{ $t('guide.collectionBonus') }}</li>
      </ul>
    </section>

    <section class="panel p-6">
      <h2 class="mb-3 font-semibold">
        {{ $t('guide.flawlessTitle') }}
      </h2>
      <p class="mb-3 text-sm text-ink-muted">
        {{ $t('guide.flawlessBonus') }}
      </p>

      <h3 class="mb-2 text-xs uppercase text-ink-muted">
        {{ $t('guide.flawlessRate') }}
      </h3>
      <ul class="grid grid-cols-2 gap-2 sm:grid-cols-6">
        <li
          v-for="row in mechanics.flawlessRates"
          :key="row.tier"
          class="rounded-lg bg-panel-raised px-2 py-1.5 text-center"
        >
          <span class="block text-xs text-ink-muted">{{ $t(`tier.${row.tier}`) }}</span>
          <span class="font-mono text-sm">
            {{ row.odds ? `1 / ${row.odds}` : $t('droid.noData') }}
          </span>
        </li>
      </ul>
    </section>

    <section class="panel overflow-x-auto p-6">
      <h2 class="mb-3 font-semibold">
        {{ $t('guide.chipsTitle') }}
      </h2>
      <h3 class="mb-2 text-xs uppercase text-ink-muted">
        {{ $t('guide.chipsCost') }}
      </h3>

      <table class="w-full text-sm">
        <thead class="text-left text-xs uppercase text-ink-muted">
          <tr>
            <th class="py-1 font-medium">
              {{ $t('droidex.filterRarity') }}
            </th>
            <th class="py-1 text-right font-medium">
              {{ $t('tier.GOLD') }}
            </th>
            <th class="py-1 text-right font-medium">
              {{ $t('tier.DIAMOND') }}
            </th>
            <th class="py-1 text-right font-medium">
              {{ $t('tier.RAINBOW') }}
            </th>
            <th class="py-1 text-right font-medium">
              {{ $t('tier.BESKAR') }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="row in mechanics.chipCosts"
            :key="row.rarity"
            class="border-t border-edge-soft"
          >
            <td class="py-1.5">
              <RarityBadge :rarity="row.rarity as any" />
              <span
                v-if="row.conflicting"
                v-tippy="{ content: $t('guide.chipsConflict') }"
                class="ml-1 cursor-help text-xs text-warn"
              >⚠</span>
            </td>
            <td class="py-1.5 text-right font-mono tabular-nums">
              {{ formatExact(row.gold, locale) }}
            </td>
            <td class="py-1.5 text-right font-mono tabular-nums">
              {{ formatExact(row.diamond, locale) }}
            </td>
            <td class="py-1.5 text-right font-mono tabular-nums">
              {{ formatExact(row.rainbow, locale) }}
            </td>
            <td class="py-1.5 text-right font-mono tabular-nums">
              {{ formatExact(row.beskar, locale) }}
            </td>
          </tr>
        </tbody>
      </table>
    </section>

    <NuxtLink
      :to="localePath('/missions')"
      class="panel flex items-center justify-between p-6 transition-colors hover:bg-panel-raised"
    >
      <span>
        <span class="block font-semibold">{{ $t('missions.title') }}</span>
        <span class="block text-sm text-ink-muted">{{ $t('missions.subtitle') }}</span>
      </span>
      <span
        class="text-ink-muted"
        aria-hidden="true"
      >→</span>
    </NuxtLink>

    <section class="panel p-6">
      <h2 class="mb-3 font-semibold">
        {{ $t('guide.sandcrawlerTitle') }}
      </h2>
      <ul class="flex flex-col gap-1 text-sm text-ink-muted">
        <li>• {{ $t('guide.sandcrawlerBeskar', { minutes: mechanics.sandcrawler.beskarIntervalMinutes }) }}</li>
        <li>• {{ $t('guide.sandcrawlerMythic', { minute: mechanics.sandcrawler.mythicHourlyMinute }) }}</li>
      </ul>
      <p class="mt-2 text-sm text-ink-muted">
        {{ gameText('mechanics.sandcrawler.notes') }}
      </p>
    </section>

    <section class="panel p-6">
      <h2 class="mb-3 font-semibold">
        {{ $t('guide.currenciesTitle') }}
      </h2>
      <ul class="grid gap-2 sm:grid-cols-3">
        <li
          v-for="(c, i) in mechanics.currencies"
          :key="c.id"
          class="rounded-lg bg-panel-raised p-3 text-sm"
        >
          <p class="font-medium">
            {{ $t(`guide.currency.${c.id}`) }}
          </p>
          <p class="mt-1 text-xs text-ink-muted">
            {{ gameText(`mechanics.currencies.${i}.sources`) }}
          </p>
          <p class="mt-1 text-xs text-ink-muted">
            → {{ gameText(`mechanics.currencies.${i}.uses`) }}
          </p>
        </li>
      </ul>
    </section>

    <section class="panel p-6">
      <h2 class="mb-3 flex items-center gap-2 font-semibold">
        <DxIcon
          name="resources/star"
          :size="18"
          class="text-warn"
        />
        {{ $t('guide.tipsTitle') }}
      </h2>
      <ul class="flex flex-col gap-2 text-sm text-ink-muted">
        <li
          v-for="(tip, i) in gameTextList('mechanics.tips')"
          :key="i"
        >
          • {{ tip }}
        </li>
      </ul>
    </section>
  </div>
</template>
