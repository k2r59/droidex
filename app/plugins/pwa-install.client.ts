/**
 * Branche l'écoute de `beforeinstallprompt` au démarrage, avant tout composant.
 *
 * L'événement n'est émis qu'une fois par Chrome/Android, très tôt. Le capter depuis un
 * plugin — et non depuis un `onMounted` de composant — garantit qu'on ne le rate pas si le
 * navigateur le déclenche avant le premier rendu.
 */
export default defineNuxtPlugin(() => {
  initInstallPrompt()
})
