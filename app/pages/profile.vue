<script setup lang="ts">
const store = useCollectionStore()
const { t, locale } = useI18n()
const { user } = useAuthSession()

useSeoMeta({ title: () => t('nav.profile') })

/**
 * Export local de la progression. Utile pour repartir d'un compte à l'autre, et
 * indispensable le jour où l'app mobile devra reprendre une collection existante.
 */
function exportProgress() {
  const payload = {
    exportedAt: new Date().toISOString(),
    collection: store.entries,
    rebirth: store.rebirth,
    superRebirth: store.superRebirth,
    cycle: store.cycle,
    novaCrystals: store.novaCrystals,
    shopLevels: store.shopLevels,
  }
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'droidex-progression.json'
  a.click()
  URL.revokeObjectURL(url)
}
</script>

<template>
  <div class="flex flex-col gap-5">
    <section v-if="user" class="flex items-center gap-4 rounded-card border border-edge bg-panel p-6">
      <img
        v-if="user.image"
        :src="user.image"
        :alt="user.name ?? ''"
        class="size-14 rounded-full object-cover"
        referrerpolicy="no-referrer"
      >
      <div>
        <h1 class="text-lg font-bold">{{ user.name }}</h1>
        <p class="text-sm text-ink-muted">{{ user.email }}</p>
      </div>
    </section>

    <p v-else class="rounded-card border border-edge bg-panel p-6 text-sm text-ink-muted">
      {{ $t('auth.signInPrompt') }}
    </p>

    <section class="grid gap-3 sm:grid-cols-3">
      <div class="rounded-card border border-edge bg-panel p-6">
        <p class="text-xs text-ink-muted">{{ $t('stats.collection') }}</p>
        <p class="font-mono text-2xl tabular-nums">{{ store.ownedCount }}/{{ store.totalCount }}</p>
      </div>
      <div class="rounded-card border border-edge bg-panel p-6">
        <p class="text-xs text-ink-muted">{{ $t('rebirth.current') }}</p>
        <p class="font-mono text-2xl tabular-nums">{{ store.rebirth }}</p>
      </div>
      <div class="rounded-card border border-edge bg-panel p-6">
        <p class="text-xs text-ink-muted">{{ $t('stats.totalIncome') }}</p>
        <p class="font-mono text-2xl tabular-nums">{{ formatIncome(store.totalIncome, locale) }}</p>
      </div>
    </section>

    <section class="rounded-card border border-edge bg-panel p-6">
      <button
        type="button"
        class="rounded-lg bg-panel-raised px-3 py-2 text-sm transition-colors hover:bg-edge"
        @click="exportProgress"
      >
        ⬇ Export JSON
      </button>
    </section>
  </div>
</template>
