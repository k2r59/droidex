<script setup lang="ts">
/**
 * Invitation basse à installer l'app sur mobile.
 *
 * L'état d'installation (événement `beforeinstallprompt` capté, détection iOS/Safari, mode
 * autonome) vient de `useInstallPrompt`, partagé avec le bouton « Android » du pied de page.
 * Ce composant ne gère que **quand** proposer : un délai pour laisser voir le site, un rejet
 * mémorisé, et le geste iOS qui n'a pas d'API et se raconte à la main.
 *
 * Rien ne s'affiche si l'app tourne déjà en mode autonome : proposer d'installer ce qui est
 * installé est le genre de détail qui fait passer une app pour négligée.
 */
const { canInstall, promptInstall, iosSafari, isStandalone } = useInstallPrompt()

const CLE = 'droidex:install-dismissed:v1'

/** Délai avant apparition : laisser le joueur voir le site avant de lui proposer autre chose. */
const DELAI_MS = 20_000

const visible = ref(false)
let minuteur: ReturnType<typeof setTimeout> | undefined

function refuseParLePasse(): boolean {
  try {
    return localStorage.getItem(CLE) !== null
  }
  catch {
    return false
  }
}

function programmer() {
  if (isStandalone.value || refuseParLePasse() || minuteur) return
  minuteur = setTimeout(() => { visible.value = true }, DELAI_MS)
}

onMounted(() => {
  // iOS : rien à attendre d'un événement, on programme d'emblée l'explication.
  if (iosSafari.value) programmer()
})

/*
 * Android : `beforeinstallprompt` peut arriver après le montage. On surveille donc
 * `canInstall` pour lancer le minuteur au moment où l'invite devient réellement proposable.
 */
watch(canInstall, (ok) => { if (ok) programmer() }, { immediate: true })

onUnmounted(() => clearTimeout(minuteur))

function fermerDefinitivement() {
  try {
    localStorage.setItem(CLE, new Date().toISOString())
  }
  catch {
    // Sans stockage, l'invite pourra revenir à la prochaine visite.
  }
}

function refuser() {
  visible.value = false
  fermerDefinitivement()
}

async function installer() {
  visible.value = false
  await promptInstall()
  fermerDefinitivement()
}
</script>

<template>
  <Teleport to="body">
    <!--
      Barre basse plutôt que fenêtre modale : l'installation n'est pas un préalable, et
      couper l'accès au site pour la proposer serait disproportionné. Le décalage par
      `safe-area-inset-bottom` évite la barre de gestes iOS, et `bottom-20` laisse passer
      la navigation mobile du projet.
    -->
    <div
      v-if="visible"
      class="fixed inset-x-3 bottom-20 z-[90] sm:inset-x-auto sm:right-4 sm:w-96"
      :style="{ marginBottom: 'env(safe-area-inset-bottom)' }"
      role="dialog"
      aria-labelledby="install-title"
    >
      <section class="panel dx-modal-in p-4 shadow-2xl">
        <div class="flex items-start gap-3">
          <img
            src="/icons/favicon-32.png"
            alt=""
            width="32"
            height="32"
            class="mt-0.5 shrink-0 rounded-lg"
          >
          <div class="min-w-0 flex-1">
            <p
              id="install-title"
              class="font-semibold"
            >
              {{ $t('install.title') }}
            </p>
            <p class="mt-0.5 text-sm text-ink-muted">
              {{ iosSafari ? $t('install.iosSteps') : $t('install.body') }}
            </p>
          </div>
          <button
            type="button"
            class="dx-icon-button shrink-0"
            :aria-label="$t('common.close')"
            @click="refuser"
          >
            <DxIcon
              name="actions/close"
              :size="16"
            />
          </button>
        </div>

        <button
          v-if="!iosSafari"
          type="button"
          class="dx-button dx-button--primary dx-button--block mt-3"
          @click="installer"
        >
          {{ $t('install.action') }}
        </button>
      </section>
    </div>
  </Teleport>
</template>
