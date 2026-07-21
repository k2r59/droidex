<script setup lang="ts">
import { migrateCollection } from '~/stores/collection'

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

/**
 * Import : contrepartie de l'export, sans laquelle celui-ci ne sert à rien. On passe par
 * `migrateCollection` pour accepter aussi les fichiers exportés avant le changement de
 * modèle, où la collection ne portait qu'un palier par droid.
 */
const importMessage = ref<{ ok: boolean; text: string } | null>(null)
const fileInput = useTemplateRef<HTMLInputElement>('fileInput')

async function importProgress(event: Event) {
  const file = (event.target as HTMLInputElement).files?.[0]
  if (!file) return

  try {
    const parsed = JSON.parse(await file.text())
    await store.replaceAll({
      collection: migrateCollection(parsed.collection),
      rebirth: Number(parsed.rebirth) || 0,
      superRebirth: Number(parsed.superRebirth) || 0,
      cycle: Number(parsed.cycle) || 1,
      novaCrystals: Number(parsed.novaCrystals) || 0,
      shopLevels: parsed.shopLevels ?? {},
    })
    importMessage.value = { ok: true, text: t('profile.importDone') }
  } catch {
    importMessage.value = { ok: false, text: t('profile.importFailed') }
  } finally {
    // Réinitialise le champ : sans ça, réimporter le même fichier ne déclenche rien.
    if (fileInput.value) fileInput.value.value = ''
  }
}

/** L'effacement est irréversible : il demande une confirmation explicite, jamais un seul clic. */
const confirmingClear = ref(false)

async function clearAll() {
  await store.clear()
  confirmingClear.value = false
}
</script>

<template>
  <div class="flex flex-col gap-5">
    <section v-if="user" class="panel flex items-center gap-4 p-6">
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

    <p v-else class="dx-alert dx-alert--info border-0 text-[0.8125rem]">
      <DxIcon name="status/locked" :size="17" class="mt-px shrink-0" />
      <span>{{ $t('auth.signInPrompt') }}</span>
    </p>

    <section class="grid gap-3 sm:grid-cols-3">
      <div class="panel p-6">
        <p class="text-xs text-ink-muted">{{ $t('stats.collection') }}</p>
        <p class="font-mono text-2xl tabular-nums">{{ store.ownedCount }}/{{ store.totalCount }}</p>
      </div>
      <div class="panel p-6">
        <p class="text-xs text-ink-muted">{{ $t('rebirth.current') }}</p>
        <p class="font-mono text-2xl tabular-nums">{{ store.rebirth }}</p>
      </div>
      <div class="panel p-6">
        <p class="text-xs text-ink-muted">{{ $t('stats.totalIncome') }}</p>
        <p class="font-mono text-2xl tabular-nums">{{ formatIncome(store.totalIncome, locale) }}</p>
      </div>
    </section>

    <section class="panel flex flex-wrap items-center gap-3 p-6">
      <button
        type="button"
        class="flex items-center gap-2 rounded-lg bg-panel-raised px-3 py-2 text-sm transition-colors hover:bg-panel-high"
        @click="exportProgress"
      >
        <DxIcon name="actions/download" :size="15" />
        {{ $t('common.exportJson') }}
      </button>

      <label class="flex cursor-pointer items-center gap-2 rounded-lg bg-panel-raised px-3 py-2 text-sm transition-colors hover:bg-panel-high">
        <DxIcon name="actions/upload" :size="15" />
        {{ $t('profile.importJson') }}
        <input ref="fileInput" type="file" accept="application/json" class="sr-only" @change="importProgress">
      </label>

      <p
        v-if="importMessage"
        class="text-[0.8125rem]"
        :class="importMessage.ok ? 'text-valid' : 'text-danger'"
      >{{ importMessage.text }}</p>
    </section>

    <!-- Effacement : séparé du reste et cerclé de rouge, pour qu'on ne le déclenche pas par mégarde. -->
    <section class="panel border-danger/40 p-6">
      <h2 class="flex items-center gap-2 font-semibold text-danger">
        <DxIcon name="status/warning" :size="18" />
        {{ $t('profile.dangerZone') }}
      </h2>
      <p class="mt-1 text-[0.8125rem] text-ink-muted">{{ $t('profile.clearWarning') }}</p>

      <div class="mt-4 flex flex-wrap gap-2">
        <button
          v-if="!confirmingClear"
          type="button"
          class="dx-button dx-button--danger"
          @click="confirmingClear = true"
        >
          {{ $t('profile.clearAll') }}
        </button>

        <template v-else>
          <button type="button" class="dx-button dx-button--danger" @click="clearAll">
            {{ $t('profile.clearConfirm') }}
          </button>
          <button type="button" class="dx-button dx-button--ghost" @click="confirmingClear = false">
            {{ $t('profile.cancel') }}
          </button>
        </template>
      </div>
    </section>
  </div>
</template>
