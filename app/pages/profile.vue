<script setup lang="ts">
import { migrateCollection } from '~/stores/collection'

const store = useCollectionStore()
const { t } = useI18n()
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
    rebirthChecks: store.rebirthChecks,
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
const importMessage = ref<{ ok: boolean, text: string } | null>(null)
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
      rebirthChecks: parsed.rebirthChecks ?? {},
    })
    importMessage.value = { ok: true, text: t('profile.importDone') }
  }
  catch {
    importMessage.value = { ok: false, text: t('profile.importFailed') }
  }
  finally {
    // Réinitialise le champ : sans ça, réimporter le même fichier ne déclenche rien.
    if (fileInput.value) fileInput.value.value = ''
  }
}

/**
 * Synchronisation par code anonyme.
 *
 * On dépose un instantané de la progression sur le serveur (stockage Netlify Blobs) et on
 * reçoit un code court. L'autre appareil saisit ce code pour récupérer la progression.
 * Aucun compte, aucune donnée personnelle — seulement la progression de jeu, sous un code
 * aléatoire qui expire après 30 jours.
 */
const syncCode = ref<string | null>(null)
const syncBusy = ref(false)
const syncError = ref<string | null>(null)
const copiedCode = ref(false)

async function generateCode() {
  syncBusy.value = true
  syncError.value = null
  syncCode.value = null
  try {
    const res = await $fetch<{ code: string }>('/api/sync', {
      method: 'POST',
      body: {
        collection: store.entries,
        rebirth: store.rebirth,
        superRebirth: store.superRebirth,
        cycle: store.cycle,
        novaCrystals: store.novaCrystals,
        shopLevels: store.shopLevels,
        rebirthChecks: store.rebirthChecks,
      },
    })
    syncCode.value = res.code
  }
  catch {
    syncError.value = t('sync.genFailed')
  }
  finally {
    syncBusy.value = false
  }
}

async function copyCode() {
  if (!syncCode.value) return
  try {
    await navigator.clipboard.writeText(syncCode.value)
    copiedCode.value = true
    setTimeout(() => { copiedCode.value = false }, 1500)
  }
  catch {
    // Presse-papiers indisponible : le code reste lisible à l'écran, on n'affiche rien.
  }
}

/** Récupération : remplace la progression de CET appareil par celle du code. */
const recoverInput = ref('')
const recoverMessage = ref<{ ok: boolean, text: string } | null>(null)

async function recoverFromCode() {
  const code = recoverInput.value.trim()
  if (!code) return
  syncBusy.value = true
  recoverMessage.value = null
  try {
    const { snapshot } = await $fetch<{ snapshot: {
      collection: unknown
      rebirth?: number
      superRebirth?: number
      cycle?: number
      novaCrystals?: number
      shopLevels?: Record<string, number>
      rebirthChecks?: Record<string, true>
    } }>(`/api/sync/${encodeURIComponent(code)}`)
    await store.replaceAll({
      collection: migrateCollection(snapshot.collection as never),
      rebirth: Number(snapshot.rebirth) || 0,
      superRebirth: Number(snapshot.superRebirth) || 0,
      cycle: Number(snapshot.cycle) || 1,
      novaCrystals: Number(snapshot.novaCrystals) || 0,
      shopLevels: snapshot.shopLevels ?? {},
      rebirthChecks: snapshot.rebirthChecks ?? {},
    })
    recoverMessage.value = { ok: true, text: t('sync.recoverDone') }
    recoverInput.value = ''
  }
  catch {
    recoverMessage.value = { ok: false, text: t('sync.recoverFailed') }
  }
  finally {
    syncBusy.value = false
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
    <section
      v-if="user"
      class="panel flex items-center gap-4 p-4 sm:p-6"
    >
      <img
        v-if="user.image"
        :src="user.image"
        :alt="user.name ?? ''"
        class="size-14 rounded-full object-cover"
        referrerpolicy="no-referrer"
      >
      <div>
        <h1 class="text-lg font-bold">
          {{ user.name }}
        </h1>
        <p class="text-sm text-ink-muted">
          {{ user.email }}
        </p>
      </div>
    </section>

    <section class="grid grid-cols-2 gap-3">
      <div class="panel p-4 sm:p-6">
        <p class="text-xs text-ink-muted">
          {{ $t('stats.collection') }}
        </p>
        <p class="font-mono text-2xl tabular-nums">
          {{ store.ownedCount }}/{{ store.totalCount }}
        </p>
      </div>
      <div class="panel p-4 sm:p-6">
        <p class="text-xs text-ink-muted">
          {{ $t('rebirth.current') }}
        </p>
        <p class="font-mono text-2xl tabular-nums">
          {{ store.rebirth }}
        </p>
      </div>
    </section>

    <section class="panel p-4 sm:p-6">
      <div class="flex items-center justify-between gap-3">
        <button
          type="button"
          class="flex items-center gap-2 rounded-lg bg-panel-raised px-3 py-2 text-sm transition-colors hover:bg-panel-high"
          @click="exportProgress"
        >
          <DxIcon
            name="actions/download"
            :size="15"
          />
          {{ $t('common.exportJson') }}
        </button>

        <label class="flex cursor-pointer items-center gap-2 rounded-lg bg-panel-raised px-3 py-2 text-sm transition-colors hover:bg-panel-high">
          <DxIcon
            name="actions/upload"
            :size="15"
          />
          {{ $t('profile.importJson') }}
          <input
            ref="fileInput"
            type="file"
            accept="application/json"
            class="sr-only"
            @change="importProgress"
          >
        </label>
      </div>

      <p
        v-if="importMessage"
        class="mt-3 text-[0.8125rem]"
        :class="importMessage.ok ? 'text-valid' : 'text-danger'"
      >
        {{ importMessage.text }}
      </p>
    </section>

    <!-- Synchronisation par code anonyme entre appareils. -->
    <section class="panel p-4 sm:p-6">
      <h2 class="flex items-center gap-2 font-semibold">
        <DxIcon
          name="actions/refresh"
          :size="18"
          class="text-accent"
        />
        {{ $t('sync.title') }}
      </h2>
      <p class="mt-1 text-[0.8125rem] text-ink-muted">
        {{ $t('sync.subtitle') }}
      </p>

      <div class="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <!-- Envoyer : générer un code depuis cet appareil. -->
        <div class="rounded-card border border-edge-soft bg-void/40 p-4">
          <p class="text-[10px] font-semibold uppercase tracking-[0.14em] text-ink-muted">
            {{ $t('sync.sendTitle') }}
          </p>

          <button
            v-if="!syncCode"
            type="button"
            class="dx-button dx-button--primary dx-button--block mt-3"
            :disabled="syncBusy"
            @click="generateCode"
          >
            {{ $t('sync.generate') }}
          </button>

          <template v-else>
            <button
              type="button"
              class="mt-3 flex w-full items-center justify-center gap-2 rounded-lg border border-accent/40 bg-accent/10 px-3 py-3 font-mono text-xl font-bold tracking-widest text-accent transition-colors hover:border-accent"
              @click="copyCode"
            >
              {{ syncCode }}
              <DxIcon
                :name="copiedCode ? 'actions/check' : 'actions/copy'"
                :size="16"
                :class="copiedCode ? 'text-valid' : 'text-accent'"
              />
            </button>
            <p class="mt-2 text-xs text-ink-muted">
              {{ $t('sync.codeHint') }}
            </p>
          </template>

          <p
            v-if="syncError"
            class="mt-2 text-[0.8125rem] text-danger"
          >
            {{ syncError }}
          </p>
        </div>

        <!-- Récupérer : saisir un code sur cet appareil. -->
        <div class="rounded-card border border-edge-soft bg-void/40 p-4">
          <p class="text-[10px] font-semibold uppercase tracking-[0.14em] text-ink-muted">
            {{ $t('sync.receiveTitle') }}
          </p>

          <form
            class="mt-3 flex gap-2"
            @submit.prevent="recoverFromCode"
          >
            <input
              v-model="recoverInput"
              type="text"
              autocapitalize="characters"
              spellcheck="false"
              :placeholder="$t('sync.codePlaceholder')"
              class="min-w-0 flex-1 rounded-md border border-edge bg-void/60 px-3 py-2 font-mono uppercase tracking-widest outline-none transition-colors placeholder:tracking-normal placeholder:text-ink-muted focus:border-accent"
            >
            <button
              type="submit"
              class="dx-button dx-button--secondary shrink-0"
              :disabled="syncBusy || !recoverInput.trim()"
            >
              {{ $t('sync.recover') }}
            </button>
          </form>

          <p class="mt-2 text-xs text-warn">
            {{ $t('sync.receiveWarning') }}
          </p>
          <p
            v-if="recoverMessage"
            class="mt-1 text-[0.8125rem]"
            :class="recoverMessage.ok ? 'text-valid' : 'text-danger'"
          >
            {{ recoverMessage.text }}
          </p>
        </div>
      </div>
    </section>

    <!-- Effacement : séparé du reste et cerclé de rouge, pour qu'on ne le déclenche pas par mégarde. -->
    <section class="panel border-danger/40 p-4 sm:p-6">
      <h2 class="flex items-center gap-2 font-semibold text-danger">
        <DxIcon
          name="status/warning"
          :size="18"
        />
        {{ $t('profile.dangerZone') }}
      </h2>
      <p class="mt-1 text-[0.8125rem] text-ink-muted">
        {{ $t('profile.clearWarning') }}
      </p>

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
          <button
            type="button"
            class="dx-button dx-button--danger"
            @click="clearAll"
          >
            {{ $t('profile.clearConfirm') }}
          </button>
          <button
            type="button"
            class="dx-button dx-button--ghost"
            @click="confirmingClear = false"
          >
            {{ $t('profile.cancel') }}
          </button>
        </template>
      </div>
    </section>
  </div>
</template>
