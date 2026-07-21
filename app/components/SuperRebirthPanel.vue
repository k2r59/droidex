<script setup lang="ts">
const props = defineProps<{
  unlocked: boolean
  /** Cristaux gagnés si le Super Rebirth est fait au palier actuel, ou `null` si non tabulé. */
  crystalsNow: number | null
  novaByRebirth: Record<string, number>
  unlockRebirth: number
}>()

const store = useCollectionStore()

/** Le cycle d'exigences avance de 1 à 4 puis reboucle après chaque Super Rebirth. */
function doSuperRebirth() {
  store.setSuperRebirth(store.superRebirth + 1, (store.cycle % 4) + 1)
}

const table = computed(() =>
  Object.entries(props.novaByRebirth)
    .map(([level, crystals]) => ({ level: Number(level), crystals }))
    .sort((a, b) => a.level - b.level),
)
</script>

<template>
  <section class="flex flex-col gap-3 rounded-card border border-edge bg-panel p-6">
    <div class="flex flex-wrap items-baseline justify-between gap-2">
      <h2 class="font-semibold">{{ $t('superRebirth.title') }}</h2>
      <span
        class="rounded px-2 py-0.5 text-xs"
        :class="unlocked ? 'bg-valid/15 text-valid' : 'bg-panel-raised text-ink-muted'"
      >
        {{ unlocked ? $t('superRebirth.unlocked') : $t('superRebirth.locked') }}
      </span>
    </div>

    <p class="text-sm text-ink-muted">
      {{ $t('superRebirth.unlock', { rebirth: unlockRebirth }) }}
    </p>

    <div class="flex flex-wrap items-center gap-4">
      <p class="text-sm">
        {{ $t('superRebirth.count', store.superRebirth, { named: { count: store.superRebirth } }) }}
      </p>

      <p v-if="crystalsNow !== null" class="font-mono text-sm text-iconic">
        ✦ {{ $t('superRebirth.crystals', crystalsNow, { named: { count: crystalsNow } }) }}
      </p>

      <button
        type="button"
        class="ml-auto rounded-lg bg-iconic px-3 py-1.5 text-sm font-medium text-void transition-opacity hover:opacity-90 disabled:opacity-30"
        :disabled="!unlocked"
        @click="doSuperRebirth"
      >
        {{ $t('superRebirth.doIt') }}
      </button>
    </div>

    <dl class="grid gap-2 text-sm sm:grid-cols-3">
      <div class="rounded-lg bg-panel-raised p-2">
        <dt class="text-xs font-medium text-red-400">{{ $t('rebirth.loses') }}</dt>
        <dd class="text-xs text-ink-muted">{{ $t('superRebirth.loses') }}</dd>
      </div>
      <div class="rounded-lg bg-panel-raised p-2">
        <dt class="text-xs font-medium text-valid">{{ $t('rebirth.keeps') }}</dt>
        <dd class="text-xs text-ink-muted">{{ $t('superRebirth.keeps') }}</dd>
      </div>
      <div class="rounded-lg bg-panel-raised p-2">
        <dt class="text-xs font-medium text-iconic">{{ $t('superRebirth.reward') }}</dt>
        <dd class="text-xs text-ink-muted">{{ $t('rebirth.grantsList') }}</dd>
      </div>
    </dl>

    <details class="text-sm">
      <summary class="cursor-pointer text-ink-muted hover:text-ink">
        {{ $t('superRebirth.crystalTable') }}
      </summary>
      <ul class="mt-2 grid grid-cols-3 gap-1 sm:grid-cols-6">
        <li
          v-for="row in table"
          :key="row.level"
          class="rounded bg-panel-raised px-2 py-1 text-center text-xs"
          :class="row.level === store.rebirth && 'ring-1 ring-iconic'"
        >
          <span class="block text-ink-muted">{{ row.level }}</span>
          <span class="font-mono text-iconic">✦{{ row.crystals }}</span>
        </li>
      </ul>
    </details>
  </section>
</template>
