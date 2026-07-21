// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt(
  {
    rules: {
      /**
       * Le code écrit volontairement les crochets de cycle de vie et les gardes courtes
       * sur une ligne — `onMounted(() => { handle = setInterval(tick, 1000) })`. Les
       * éclater sur trois lignes allongerait sans rien clarifier. La règle reste utile
       * ailleurs, mais pas au point d'imposer ce découpage.
       */
      '@stylistic/max-statements-per-line': 'off',
    },
  },
  {
    /**
     * Les fichiers générés ne sont pas relus à la main : les signaler noierait les
     * problèmes du code écrit.
     */
    ignores: ['app/data/droids.json', 'app/data/rebirths.json', '.nuxt/**', '.output/**', 'dist/**'],
  },
)
