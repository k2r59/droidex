<script setup lang="ts">
import mechanics from '~/data/mechanics.json'

const { t, locale } = useI18n()

useSeoMeta({
  title: () => t('guide.title'),
  description: () => t('guide.subtitle'),
})

const base = mechanics.base
</script>

<template>
  <div class="flex flex-col gap-5">
    <header>
      <h1 class="text-xl font-bold">{{ $t('guide.title') }}</h1>
      <p class="text-sm text-ink-muted">{{ $t('guide.subtitle') }}</p>
    </header>

    <section class="rounded-xl border border-edge bg-panel p-4">
      <h2 class="mb-3 font-semibold">{{ $t('guide.base') }}</h2>
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

    <section class="rounded-xl border border-edge bg-panel p-4">
      <h2 class="mb-3 font-semibold">{{ $t('guide.flawlessTitle') }}</h2>
      <p class="mb-3 text-sm text-ink-muted">{{ $t('guide.flawlessBonus') }}</p>

      <h3 class="mb-2 text-xs uppercase text-ink-muted">{{ $t('guide.flawlessRate') }}</h3>
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

    <section class="overflow-x-auto rounded-xl border border-edge bg-panel p-4">
      <h2 class="mb-3 font-semibold">{{ $t('guide.chipsTitle') }}</h2>
      <h3 class="mb-2 text-xs uppercase text-ink-muted">{{ $t('guide.chipsCost') }}</h3>

      <table class="w-full text-sm">
        <thead class="text-left text-xs uppercase text-ink-muted">
          <tr>
            <th class="py-1 font-medium">{{ $t('droidex.filterRarity') }}</th>
            <th class="py-1 text-right font-medium">{{ $t('tier.GOLD') }}</th>
            <th class="py-1 text-right font-medium">{{ $t('tier.DIAMOND') }}</th>
            <th class="py-1 text-right font-medium">{{ $t('tier.RAINBOW') }}</th>
            <th class="py-1 text-right font-medium">{{ $t('tier.BESKAR') }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="row in mechanics.chipCosts" :key="row.rarity" class="border-t border-edge/50">
            <td class="py-1.5">
              <RarityBadge :rarity="row.rarity as any" />
              <span v-if="row.conflicting" class="ml-1 cursor-help text-xs text-amber-500" title="Une source donne 5 / 25 / 40 / 80">⚠</span>
            </td>
            <td class="py-1.5 text-right font-mono tabular-nums">{{ formatExact(row.gold, locale) }}</td>
            <td class="py-1.5 text-right font-mono tabular-nums">{{ formatExact(row.diamond, locale) }}</td>
            <td class="py-1.5 text-right font-mono tabular-nums">{{ formatExact(row.rainbow, locale) }}</td>
            <td class="py-1.5 text-right font-mono tabular-nums">{{ formatExact(row.beskar, locale) }}</td>
          </tr>
        </tbody>
      </table>
    </section>

    <section class="overflow-x-auto rounded-xl border border-edge bg-panel p-4">
      <h2 class="mb-3 font-semibold">{{ $t('guide.missionsTitle') }}</h2>
      <ul class="flex flex-col gap-2">
        <li
          v-for="m in mechanics.missions"
          :key="m.pad"
          class="flex items-baseline gap-3 rounded-lg bg-panel-raised px-3 py-2 text-sm"
        >
          <span class="grid size-6 shrink-0 place-items-center rounded-full bg-panel text-xs font-bold">{{ m.pad }}</span>
          <span class="font-mono tabular-nums text-ink-muted">
            {{ m.unlockCost ? formatNumber(m.unlockCost, locale) : '—' }}
          </span>
          <span class="flex-1">{{ m.rewards ?? $t('droid.noData') }}</span>
        </li>
      </ul>
    </section>

    <section class="rounded-xl border border-edge bg-panel p-4">
      <h2 class="mb-3 font-semibold">{{ $t('guide.sandcrawlerTitle') }}</h2>
      <ul class="flex flex-col gap-1 text-sm text-ink-muted">
        <li>• {{ $t('guide.sandcrawlerRainbow') }}</li>
        <li>• {{ $t('guide.sandcrawlerBeskar') }}</li>
      </ul>
      <p class="mt-2 text-sm text-ink-muted">{{ mechanics.sandcrawler.notes }}</p>
    </section>

    <section class="rounded-xl border border-edge bg-panel p-4">
      <h2 class="mb-3 font-semibold">{{ $t('guide.currenciesTitle') }}</h2>
      <ul class="grid gap-2 sm:grid-cols-3">
        <li v-for="c in mechanics.currencies" :key="c.id" class="rounded-lg bg-panel-raised p-3 text-sm">
          <p class="font-medium capitalize">{{ c.id }}</p>
          <p class="mt-1 text-xs text-ink-muted">{{ c.sources }}</p>
          <p class="mt-1 text-xs text-ink-muted">→ {{ c.uses }}</p>
        </li>
      </ul>
    </section>

    <section class="rounded-xl border border-edge bg-panel p-4">
      <h2 class="mb-3 font-semibold">💡</h2>
      <ul class="flex flex-col gap-2 text-sm text-ink-muted">
        <li v-for="tip in mechanics.tips" :key="tip">• {{ tip }}</li>
      </ul>
    </section>
  </div>
</template>
