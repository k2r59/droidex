import VueTippy from 'vue-tippy'
import 'tippy.js/dist/tippy.css'
import 'tippy.js/animations/shift-away.css'

/**
 * Info-bulles Tippy, en remplacement des `title` natifs.
 *
 * Le `title` du navigateur a trois défauts pour des repères d'information : il n'apparaît
 * qu'après un délai long et non réglable, il ne se déclenche pas au clavier ni au toucher,
 * et son style échappe à la charte. Tippy corrige les trois, avec un thème accordé au fond
 * sombre défini dans `main.css` (`.tippy-box[data-theme~='droidex']`).
 *
 * Le plugin est universel (pas `.client`) à dessein : la directive `v-tippy` doit exister
 * aussi au rendu serveur, sinon Vue échoue à la résoudre pendant le SSR. Tippy lui-même ne
 * s'initialise qu'au montage client — la directive est un simple relais côté serveur.
 */
export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(VueTippy, {
    directive: 'tippy',
    component: 'Tippy',
    defaultProps: {
      theme: 'droidex',
      animation: 'shift-away',
      arrow: true,
      // Délai court à l'apparition, disparition immédiate : un repère d'info doit répondre
      // vite sans s'attarder quand on s'éloigne.
      delay: [150, 0],
      duration: [160, 120],
      maxWidth: 280,
      // Le contenu vient toujours de nos chaînes i18n, jamais d'une entrée utilisateur :
      // le HTML reste désactivé par principe, on n'affiche que du texte.
      allowHTML: false,
    },
  })
})
