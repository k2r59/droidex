<script setup lang="ts">
/**
 * Invitation à installer l'app sur mobile.
 *
 * Deux chemins, parce que les deux plateformes n'offrent pas la même chose :
 *
 * — Android / Chrome émet `beforeinstallprompt`. On le capte, on empêche la bannière
 *   native (qui apparaît là où le navigateur veut, quand il veut) et on rend la main au
 *   joueur via un bouton qui déclenche la vraie invite système.
 * — iOS / Safari n'émet rien et n'expose aucune API d'installation. Le seul recours est
 *   d'expliquer le geste : Partager, puis « Sur l'écran d'accueil ». D'où la détection
 *   explicite du couple iOS + Safari, et un texte plutôt qu'un bouton.
 *
 * Rien ne s'affiche si l'app tourne déjà en mode autonome : proposer d'installer ce qui
 * est installé est le genre de détail qui fait passer une app pour négligée.
 */

/** Type non standard, absent de la lib DOM. */
type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>
}

const CLE = 'droidex:install-dismissed:v1'

/** Délai avant apparition : laisser le joueur voir le site avant de lui proposer autre chose. */
const DELAI_MS = 20_000

const differe = ref<BeforeInstallPromptEvent | null>(null)
const iosSafari = ref(false)
const visible = ref(false)

let minuteur: ReturnType<typeof setTimeout> | undefined

/** `true` si l'app est déjà lancée depuis l'écran d'accueil. */
function dejaInstallee(): boolean {
  return window.matchMedia('(display-mode: standalone)').matches
    // Propriété propre à iOS, non standard, absente du typage.
    || (navigator as unknown as { standalone?: boolean }).standalone === true
}

function refuseParLePasse(): boolean {
  try {
    return localStorage.getItem(CLE) !== null
  }
  catch {
    return false
  }
}

function programmer() {
  if (dejaInstallee() || refuseParLePasse()) return
  minuteur = setTimeout(() => { visible.value = true }, DELAI_MS)
}

onMounted(() => {
  const ua = navigator.userAgent
  /*
   * `iPad` a disparu de l'UA d'iPadOS 13+, qui se déclare « Macintosh ». On complète donc
   * par le test tactile, sans quoi les iPad n'auraient jamais vu l'explication.
   */
  const estIOS = /iPad|iPhone|iPod/.test(ua)
    || (ua.includes('Macintosh') && navigator.maxTouchPoints > 1)
  // Chrome et Firefox sur iOS embarquent WebKit et se signalent par CriOS / FxiOS.
  const estSafari = !/CriOS|FxiOS|EdgiOS|OPiOS/.test(ua)

  iosSafari.value = estIOS && estSafari
  if (iosSafari.value) programmer()

  window.addEventListener('beforeinstallprompt', onBeforeInstall)
  window.addEventListener('appinstalled', onInstalled)
})

onUnmounted(() => {
  clearTimeout(minuteur)
  window.removeEventListener('beforeinstallprompt', onBeforeInstall)
  window.removeEventListener('appinstalled', onInstalled)
})

function onBeforeInstall(e: Event) {
  // Sans ça, le navigateur affiche sa propre bannière et notre invite ferait doublon.
  e.preventDefault()
  differe.value = e as BeforeInstallPromptEvent
  programmer()
}

function onInstalled() {
  visible.value = false
  fermerDefinitivement()
}

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
  const e = differe.value
  if (!e) return
  visible.value = false
  await e.prompt()
  await e.userChoice
  // L'invite système ne se rejoue pas : on relâche l'événement dans tous les cas.
  differe.value = null
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
