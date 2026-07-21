<script setup lang="ts">
/**
 * Effacement de la progression, depuis la barre du haut.
 *
 * La progression vit dans le navigateur : aucun compte ne la rattrape, aucune corbeille ne
 * la garde. L'effacer est donc définitif au sens strict, et un geste définitif placé dans
 * une barre permanente demande plus qu'un clic — d'où deux confirmations distinctes plutôt
 * qu'une. La première annonce ce qui va disparaître, chiffres à l'appui ; la seconde ne
 * demande plus rien d'autre qu'un oui, une fois qu'on a lu.
 *
 * Les deux étapes sont volontairement dissemblables : même libellé, même position et même
 * couleur produiraient deux clics au même endroit, c'est-à-dire une seule confirmation
 * étalée sur deux écrans.
 */

const store = useCollectionStore()

/** `null` = fermé, `1` = récapitulatif, `2` = confirmation finale. */
const etape = ref<null | 1 | 2>(null)

/** Ce que l'effacement va emporter, pour que la décision se prenne en connaissance de cause. */
const bilan = computed(() => ({
  variantes: Object.values(store.entries).reduce((n, e) => n + e.tiers.length, 0),
  droids: Object.values(store.entries).filter((e) => e.tiers.length).length,
  rebirth: store.rebirth,
  superRebirth: store.superRebirth,
  nova: store.novaCrystals,
}))

/** Rien à effacer : le bouton n'a alors aucun sens et disparaît. */
const aQuelqueChose = computed(() => !store.isEmpty)

function ouvrir() {
  etape.value = 1
}

function fermer() {
  etape.value = null
}

const enCours = ref(false)

async function effacer() {
  enCours.value = true
  try {
    await store.clear()
    fermer()
  }
  finally {
    enCours.value = false
  }
}

const dialogRef = useTemplateRef<HTMLElement>('dialogRef')
useFocusTrap(dialogRef, computed(() => etape.value !== null))

/**
 * Échap ferme, à n'importe quelle étape. Fermer n'efface rien : la touche ne peut donc
 * que renoncer, jamais valider — c'est le sens qu'on attend d'elle.
 */
onKeyStroke('Escape', () => { if (etape.value) fermer() })

watch(etape, (v) => {
  if (import.meta.client) document.body.style.overflow = v ? 'hidden' : ''
})
onUnmounted(() => {
  if (import.meta.client) document.body.style.overflow = ''
})
</script>

<template>
  <button
    v-if="aQuelqueChose"
    type="button"
    class="dx-button dx-button--danger"
    @click="ouvrir"
  >
    <DxIcon
      name="actions/trash"
      :size="16"
    />
    <span class="hidden sm:inline">{{ $t('reset.action') }}</span>
  </button>

  <Teleport to="body">
    <div
      v-if="etape"
      class="fixed inset-0 z-[92] grid place-items-center overflow-y-auto bg-void/90 p-4 backdrop-blur-sm"
      @click.self="fermer"
    >
      <section
        ref="dialogRef"
        role="dialog"
        aria-modal="true"
        aria-labelledby="reset-title"
        tabindex="-1"
        class="panel dx-modal-in my-auto w-full max-w-md border-danger/40 p-6"
      >
        <h2
          id="reset-title"
          class="flex items-center gap-2 text-lg uppercase tracking-wide text-danger"
        >
          <DxIcon
            name="status/warning"
            :size="20"
          />
          {{ etape === 1 ? $t('reset.title') : $t('reset.lastCallTitle') }}
        </h2>

        <!-- Étape 1 : ce qui disparaît, en chiffres. -->
        <template v-if="etape === 1">
          <p class="mt-2 text-sm text-ink-muted">
            {{ $t('reset.intro') }}
          </p>

          <ul class="mt-4 flex flex-col gap-1.5 rounded-card border border-edge-soft bg-void/50 p-4 text-sm">
            <li class="flex justify-between gap-4">
              <span class="text-ink-muted">{{ $t('reset.variants') }}</span>
              <span class="font-mono font-bold tabular-nums">{{ bilan.variantes }}</span>
            </li>
            <li class="flex justify-between gap-4">
              <span class="text-ink-muted">{{ $t('reset.droids') }}</span>
              <span class="font-mono font-bold tabular-nums">{{ bilan.droids }}</span>
            </li>
            <li class="flex justify-between gap-4">
              <span class="text-ink-muted">{{ $t('rebirth.title') }}</span>
              <span class="font-mono font-bold tabular-nums">{{ bilan.rebirth }}</span>
            </li>
            <li class="flex justify-between gap-4">
              <span class="text-ink-muted">{{ $t('superRebirth.title') }}</span>
              <span class="font-mono font-bold tabular-nums">{{ bilan.superRebirth }}</span>
            </li>
            <li class="flex justify-between gap-4">
              <span class="text-ink-muted">{{ $t('superRebirth.crystalBalance') }}</span>
              <span class="font-mono font-bold tabular-nums">{{ bilan.nova }}</span>
            </li>
          </ul>

          <p class="mt-3 text-xs text-ink-muted">
            {{ $t('reset.exportHint') }}
          </p>

          <div class="mt-6 grid gap-2 sm:grid-cols-2">
            <button
              type="button"
              class="dx-button dx-button--ghost"
              @click="fermer"
            >
              {{ $t('common.cancel') }}
            </button>
            <button
              type="button"
              class="dx-button dx-button--danger"
              @click="etape = 2"
            >
              {{ $t('reset.continue') }}
            </button>
          </div>
        </template>

        <!--
          Étape 2 : plus de chiffres, plus de choix latéral. Le bouton qui annule est
          désormais le plus visible des deux, et celui qui efface passe en second — pour
          qu'un enchaînement machinal de clics au même endroit ne suffise pas.
        -->
        <template v-else>
          <p class="mt-2 text-sm">
            {{ $t('reset.lastCall') }}
          </p>

          <div class="mt-6 flex flex-col gap-2">
            <button
              type="button"
              class="dx-button dx-button--primary dx-button--block"
              @click="fermer"
            >
              {{ $t('reset.keep') }}
            </button>
            <button
              type="button"
              class="dx-button dx-button--danger dx-button--block"
              :disabled="enCours"
              @click="effacer"
            >
              {{ $t('reset.confirm') }}
            </button>
          </div>
        </template>
      </section>
    </div>
  </Teleport>
</template>
