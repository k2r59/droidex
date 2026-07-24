<script setup lang="ts">
import { migrateCollection } from '~/stores/collection'

const store = useCollectionStore()
const { t } = useI18n()
const { user } = useAuthSession()

useSeoMeta({ title: () => t('nav.profile') })

/**
 * Toast de confirmation éphémère : les actions serveur (effacement, échange de code) se
 * faisaient sans retour visible, on ne savait pas si elles avaient abouti. Un message court
 * apparaît puis s'efface tout seul.
 */
const confirmToast = ref<string | null>(null)
let toastTimer: ReturnType<typeof setTimeout> | null = null
function notify(text: string) {
  confirmToast.value = text
  if (toastTimer) clearTimeout(toastTimer)
  toastTimer = setTimeout(() => { confirmToast.value = null }, 3000)
}

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
 * Sauvegarde par code anonyme, désormais **transparente** : le store génère un code au premier
 * passage et y réplique la progression en continu (voir `useCollectionStore`). Ici on ne fait
 * plus que l'AFFICHER (avec copie) et permettre d'en **changer** — saisir le code d'un autre
 * appareil pour reprendre sa progression et poursuivre les sauvegardes sous ce code.
 */
const copiedCode = ref(false)

async function copyCode() {
  if (!store.syncCode) return
  try {
    await navigator.clipboard.writeText(store.syncCode)
    copiedCode.value = true
    setTimeout(() => { copiedCode.value = false }, 1500)
  }
  catch {
    // Presse-papiers indisponible : le code reste lisible à l'écran, on n'affiche rien.
  }
}

/** Popup de changement de code : on récupère la progression du code saisi, puis on l'adopte. */
const editingCode = ref(false)
const recoverInput = ref('')
const recoverBusy = ref(false)
const recoverMessage = ref<{ ok: boolean, text: string } | null>(null)

function openEditCode() {
  recoverInput.value = ''
  recoverMessage.value = null
  editingCode.value = true
}

async function adoptCode() {
  const raw = recoverInput.value.trim()
  if (!raw) return
  recoverBusy.value = true
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
    } }>(`/api/sync/${encodeURIComponent(raw)}`)
    await store.replaceAll({
      collection: migrateCollection(snapshot.collection as never),
      rebirth: Number(snapshot.rebirth) || 0,
      superRebirth: Number(snapshot.superRebirth) || 0,
      cycle: Number(snapshot.cycle) || 1,
      novaCrystals: Number(snapshot.novaCrystals) || 0,
      shopLevels: snapshot.shopLevels ?? {},
      rebirthChecks: snapshot.rebirthChecks ?? {},
    })
    // On adopte le code : les sauvegardes suivantes iront sous lui. Forme d'affichage canonique.
    const clean = raw.toUpperCase().replace(/[^A-Z0-9]/g, '')
    await store.setSyncCode(clean.length === 8 ? `${clean.slice(0, 4)}-${clean.slice(4)}` : clean)
    editingCode.value = false
    notify(t('sync.recoverDone'))
  }
  catch {
    recoverMessage.value = { ok: false, text: t('sync.recoverFailed') }
  }
  finally {
    recoverBusy.value = false
  }
}

/** L'effacement est irréversible : il demande une confirmation explicite, jamais un seul clic. */
const confirmingClear = ref(false)

async function clearAll() {
  await store.clear()
  confirmingClear.value = false
  notify(t('profile.clearDone'))
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

      <!-- Code auto-généré, affiché en permanence : copie d'un côté, changement de l'autre. -->
      <div class="mt-4 rounded-card border border-edge-soft bg-void/40 p-4">
        <p class="text-[10px] font-semibold uppercase tracking-[0.14em] text-ink-muted">
          {{ $t('sync.myCodeTitle') }}
        </p>

        <div class="mt-3 flex items-center gap-2">
          <button
            type="button"
            class="flex flex-1 items-center justify-center gap-2 rounded-lg border border-accent/40 bg-accent/10 px-3 py-3 font-mono text-xl font-bold tracking-widest text-accent transition-colors hover:border-accent disabled:opacity-40"
            :disabled="!store.syncCode"
            @click="copyCode"
          >
            {{ store.syncCode ?? '••••-••••' }}
            <DxIcon
              :name="copiedCode ? 'actions/check' : 'actions/copy'"
              :size="16"
              :class="copiedCode ? 'text-valid' : 'text-accent'"
            />
          </button>

          <button
            type="button"
            class="dx-icon-button size-11 shrink-0 border border-edge bg-panel"
            :title="$t('sync.changeCode')"
            :aria-label="$t('sync.changeCode')"
            @click="openEditCode"
          >
            <DxIcon
              name="actions/edit"
              :size="17"
            />
          </button>
        </div>

        <p class="mt-2 text-xs text-ink-muted">
          {{ $t('sync.autoHint') }}
        </p>
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

    <!-- Popup : changer de code — reprendre la sauvegarde d'un autre appareil. -->
    <Teleport to="body">
      <div
        v-if="editingCode"
        class="fixed inset-0 z-[100] grid place-items-center p-4"
      >
        <div
          class="absolute inset-0 bg-black/60 backdrop-blur-sm"
          @click="editingCode = false"
        />
        <div
          class="panel relative z-10 flex w-full max-w-sm flex-col gap-4 p-5"
          role="dialog"
          aria-modal="true"
          aria-labelledby="change-code-title"
        >
          <div class="flex items-center justify-between">
            <h2
              id="change-code-title"
              class="flex items-center gap-2 font-bold"
            >
              <DxIcon
                name="actions/edit"
                :size="17"
                class="text-accent"
              />
              {{ $t('sync.changeCode') }}
            </h2>
            <button
              type="button"
              class="dx-icon-button size-8"
              :aria-label="$t('common.close')"
              @click="editingCode = false"
            >
              <DxIcon
                name="actions/close"
                :size="15"
              />
            </button>
          </div>

          <p class="text-sm text-warn">
            {{ $t('sync.receiveWarning') }}
          </p>

          <form
            class="flex gap-2"
            @submit.prevent="adoptCode"
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
              class="dx-button dx-button--primary shrink-0"
              :disabled="recoverBusy || !recoverInput.trim()"
            >
              {{ $t('sync.recover') }}
            </button>
          </form>

          <p
            v-if="recoverMessage"
            class="text-[0.8125rem]"
            :class="recoverMessage.ok ? 'text-valid' : 'text-danger'"
          >
            {{ recoverMessage.text }}
          </p>
        </div>
      </div>
    </Teleport>

    <!-- Toast de confirmation éphémère (effacement, échange de code). -->
    <Teleport to="body">
      <Transition name="dx-toast">
        <div
          v-if="confirmToast"
          class="dx-toast"
          role="status"
          aria-live="polite"
        >
          <DxIcon
            name="actions/check"
            :size="16"
            class="text-valid"
          />
          {{ confirmToast }}
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<style scoped>
/* Toast centré sous l'en-tête (haut plutôt que bas, pour ne pas passer sous la barre mobile). */
.dx-toast {
  position: fixed;
  left: 50%;
  top: calc(var(--header-height, 68px) + 0.75rem);
  transform: translateX(-50%);
  z-index: 200;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.65rem 1.1rem;
  border-radius: 999px;
  font-size: 0.875rem;
  font-weight: 600;
  white-space: nowrap;
  color: var(--color-ink-strong, #fff);
  background: color-mix(in srgb, var(--color-panel-raised) 94%, transparent);
  border: 1px solid color-mix(in srgb, var(--color-valid) 45%, var(--color-edge));
  box-shadow: 0 12px 30px -10px rgba(0, 0, 0, 0.55);
  backdrop-filter: blur(8px);
}

.dx-toast-enter-active,
.dx-toast-leave-active {
  transition: opacity 0.25s ease, transform 0.25s ease;
}
.dx-toast-enter-from,
.dx-toast-leave-to {
  opacity: 0;
  transform: translate(-50%, -12px);
}
</style>
