<script setup lang="ts">
import rebirthData from '~/data/rebirths.json'

/**
 * Mise en route, proposée une seule fois à l'arrivée sur le site.
 *
 * Un joueur qui découvre Droidex a déjà des dizaines d'heures derrière lui : des
 * renaissances, des Super Renaissances, des cristaux. Sans cet écran, il devait deviner
 * que ces chiffres se règlent dans un rail de la page Renaissances et dans l'en-tête de la
 * boutique — trois endroits différents, aucun d'eux annoncé. La plupart repartaient de zéro
 * et voyaient un planificateur qui leur conseillait le palier 1.
 *
 * On ne demande que ce qui ne se déduit de rien d'autre. La collection, elle, n'est pas
 * demandée ici : cocher 379 variantes n'est pas une formalité de démarrage, c'est l'usage
 * même du site.
 */

const store = useCollectionStore()

const CLE = 'droidex:onboarded:v1'

const ouvert = ref(false)

const rebirth = ref(0)
const superRebirth = ref(0)
const crystals = ref(0)

/**
 * On n'ouvre que si la progression est réellement vierge.
 *
 * Il faut donc attendre `hydrated` : lire `isEmpty` avant la fin de la lecture IndexedDB
 * renverrait vrai pour tout le monde, et l'écran s'imposerait à des joueurs qui ont déjà
 * tout renseigné. On attend aussi que l'avertissement légal soit accepté — deux fenêtres
 * superposées au premier chargement seraient illisibles.
 */
onMounted(() => {
  watch(
    () => store.hydrated,
    (pret) => {
      if (!pret) return
      try {
        const legalVu = localStorage.getItem('droidex:legal-seen:v1') !== null
        ouvert.value = legalVu && localStorage.getItem(CLE) === null && store.isEmpty
      }
      catch {
        // Sans stockage, on s'abstient : mieux vaut ne pas proposer que reproposer sans fin.
      }
    },
    { immediate: true },
  )
})

function marquerVu() {
  try {
    localStorage.setItem(CLE, new Date().toISOString())
  }
  catch {
    // Sans stockage, l'écran reviendra — tant que la progression reste vierge.
  }
  ouvert.value = false
}

const MAX_SUPER = 10_000
const MAX_NOVA = 1_000_000

const borne = (v: number, max: number) => Math.min(max, Math.max(0, Math.floor(v || 0)))

async function valider() {
  const r = borne(rebirth.value, rebirthData.maxRebirth)
  const sr = borne(superRebirth.value, MAX_SUPER)
  const nova = borne(crystals.value, MAX_NOVA)

  await store.setRebirth(r)
  // Le cycle d'exigences se déduit du nombre de Super Renaissances, comme après le bouton.
  await store.setSuperRebirth(sr, (sr % 4) + 1)
  await store.setNovaCrystals(nova)

  marquerVu()
}

/** Confine le focus, comme les autres fenêtres du projet. */
const dialogRef = useTemplateRef<HTMLElement>('dialogRef')
useFocusTrap(dialogRef, ouvert)

/** Échap équivaut à « Je verrai plus tard » : on n'écrit rien et on ne repropose pas. */
onKeyStroke('Escape', () => { if (ouvert.value) marquerVu() })

watch(ouvert, (v) => {
  if (import.meta.client) document.body.style.overflow = v ? 'hidden' : ''
})
onUnmounted(() => {
  if (import.meta.client) document.body.style.overflow = ''
})
</script>

<template>
  <Teleport to="body">
    <div
      v-if="ouvert"
      class="fixed inset-0 z-[95] grid place-items-center overflow-y-auto bg-void/90 p-4 backdrop-blur-sm"
    >
      <section
        ref="dialogRef"
        role="dialog"
        aria-modal="true"
        aria-labelledby="onboarding-title"
        tabindex="-1"
        class="panel dx-modal-in my-auto w-full max-w-lg p-6 sm:p-8"
      >
        <h2
          id="onboarding-title"
          class="text-xl uppercase tracking-wide sm:text-2xl"
        >
          {{ $t('onboarding.title') }}
        </h2>
        <p class="mt-1 text-sm text-ink-muted">
          {{ $t('onboarding.subtitle') }}
        </p>

        <div class="mt-6 grid gap-4">
          <label class="block">
            <span class="text-[10px] font-semibold uppercase tracking-[0.14em] text-ink-muted">
              {{ $t('onboarding.rebirth') }}
            </span>
            <span class="dx-search mt-1.5">
              <DxIcon
                name="resources/star"
                :size="18"
                class="text-accent"
              />
              <input
                v-model.number="rebirth"
                type="number"
                min="0"
                :max="rebirthData.maxRebirth"
                inputmode="numeric"
                class="w-full min-w-0 border-0 bg-transparent font-mono text-lg outline-none"
              >
              <span class="whitespace-nowrap text-xs text-ink-muted">/ {{ rebirthData.maxRebirth }}</span>
            </span>
          </label>

          <label class="block">
            <span class="text-[10px] font-semibold uppercase tracking-[0.14em] text-ink-muted">
              {{ $t('onboarding.superRebirth') }}
            </span>
            <span class="dx-search mt-1.5">
              <DxIcon
                name="resources/diamond"
                :size="18"
                class="text-rare"
              />
              <input
                v-model.number="superRebirth"
                type="number"
                min="0"
                :max="MAX_SUPER"
                inputmode="numeric"
                class="w-full min-w-0 border-0 bg-transparent font-mono text-lg outline-none"
              >
              <span />
            </span>
          </label>

          <label class="block">
            <span class="text-[10px] font-semibold uppercase tracking-[0.14em] text-ink-muted">
              {{ $t('onboarding.crystals') }}
            </span>
            <span class="dx-search mt-1.5">
              <DxIcon
                name="resources/nova-crystal"
                :size="18"
                class="text-nova"
              />
              <input
                v-model.number="crystals"
                type="number"
                min="0"
                :max="MAX_NOVA"
                inputmode="numeric"
                class="w-full min-w-0 border-0 bg-transparent font-mono text-lg outline-none"
              >
              <span />
            </span>
          </label>
        </div>

        <p class="mt-4 text-xs text-ink-muted">
          {{ $t('onboarding.editableLater') }}
        </p>

        <div class="mt-6 grid gap-2 sm:grid-cols-2">
          <button
            type="button"
            class="dx-button dx-button--ghost"
            @click="marquerVu"
          >
            {{ $t('onboarding.skip') }}
          </button>
          <button
            type="button"
            class="dx-button dx-button--primary"
            @click="valider"
          >
            {{ $t('onboarding.start') }}
          </button>
        </div>
      </section>
    </div>
  </Teleport>
</template>
