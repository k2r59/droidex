/**
 * État partagé de l'installation PWA.
 *
 * `beforeinstallprompt` n'est émis qu'une fois, très tôt, par Chrome/Android. Le capter
 * dans un seul composant (l'ancienne invite) le rendait inaccessible ailleurs : le bouton
 * « Android » du pied de page n'aurait rien eu à déclencher. On le range donc dans un état
 * de module, partagé par tous les appelants — l'invite basse **et** le bouton du pied.
 *
 * L'écoute est branchée une seule fois (voir `app/plugins/pwa-install.client.ts`, appelé au
 * plus tôt), pour ne pas rater l'événement.
 */

/** Type non standard, absent de la lib DOM. */
type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>
}

// État de module : une seule instance, partagée entre le pied de page et l'invite basse.
const deferred = shallowRef<BeforeInstallPromptEvent | null>(null)
const installed = ref(false)
const standalone = ref(false)
const iosSafari = ref(false)
let initialise = false

/** `true` si l'app est déjà lancée depuis l'écran d'accueil. */
function estStandalone(): boolean {
  return window.matchMedia('(display-mode: standalone)').matches
    // Propriété propre à iOS, non standard, absente du typage.
    || (navigator as unknown as { standalone?: boolean }).standalone === true
}

/**
 * iOS + Safari : la seule combinaison qui n'expose aucune API d'installation, donc la seule
 * qui impose d'expliquer le geste à la main. `iPad` a disparu de l'UA d'iPadOS 13+, d'où le
 * repli sur le test tactile ; Chrome/Firefox iOS embarquent WebKit et se signalent en CriOS
 * / FxiOS, on les écarte.
 */
function detecteIosSafari(): boolean {
  const ua = navigator.userAgent
  const estIOS = /iPad|iPhone|iPod/.test(ua)
    || (ua.includes('Macintosh') && navigator.maxTouchPoints > 1)
  const estSafari = !/CriOS|FxiOS|EdgiOS|OPiOS/.test(ua)
  return estIOS && estSafari
}

/** Branche les écoutes globales. Idempotent : n'agit qu'au premier appel, côté client. */
export function initInstallPrompt() {
  if (!import.meta.client || initialise) return
  initialise = true

  standalone.value = estStandalone()
  iosSafari.value = detecteIosSafari()

  window.addEventListener('beforeinstallprompt', (e) => {
    // Sans ça, le navigateur affiche sa propre bannière, qui ferait doublon avec la nôtre.
    e.preventDefault()
    deferred.value = e as BeforeInstallPromptEvent
  })
  window.addEventListener('appinstalled', () => {
    installed.value = true
    standalone.value = true
    deferred.value = null
  })
}

export function useInstallPrompt() {
  initInstallPrompt()

  /** L'invite native n'est proposable que si l'événement a été capté et l'app pas déjà posée. */
  const canInstall = computed(() => Boolean(deferred.value) && !standalone.value)

  /**
   * Déclenche l'invite système d'installation. Renvoie l'issue, ou `'unavailable'` si aucun
   * événement n'a été capté (l'appelant peut alors rediriger vers les instructions).
   */
  async function promptInstall(): Promise<'accepted' | 'dismissed' | 'unavailable'> {
    const e = deferred.value
    if (!e) return 'unavailable'
    await e.prompt()
    const { outcome } = await e.userChoice
    // L'invite système ne se rejoue pas : on relâche l'événement dans tous les cas.
    deferred.value = null
    return outcome
  }

  return {
    canInstall,
    promptInstall,
    isStandalone: readonly(standalone),
    iosSafari: readonly(iosSafari),
    installed: readonly(installed),
  }
}
