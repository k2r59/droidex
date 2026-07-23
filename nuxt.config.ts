import tailwindcss from '@tailwindcss/vite'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({

  modules: ['@pinia/nuxt', '@nuxtjs/i18n', '@vueuse/nuxt', '@vite-pwa/nuxt', '@nuxt/fonts', '@nuxt/eslint'],
  devtools: { enabled: true },

  css: ['~/assets/css/main.css'],

  runtimeConfig: {
    mongodbUri: '', // NUXT_MONGODB_URI
    mongodbDbName: 'droidex', // NUXT_MONGODB_DB_NAME
    betterAuthSecret: '', // NUXT_BETTER_AUTH_SECRET
    discordClientId: '', // NUXT_DISCORD_CLIENT_ID
    discordClientSecret: '', // NUXT_DISCORD_CLIENT_SECRET
    googleClientId: '', // NUXT_GOOGLE_CLIENT_ID
    googleClientSecret: '', // NUXT_GOOGLE_CLIENT_SECRET
    twitchClientId: '', // NUXT_TWITCH_CLIENT_ID
    twitchClientSecret: '', // NUXT_TWITCH_CLIENT_SECRET
    // Jeton privé qui déverrouille la page de statistiques (lecture seule). La page reste
    // non listée ; sans ce jeton, /api/stats refuse la lecture. Le comptage (écriture) reste
    // public. À définir en production via NUXT_STATS_TOKEN.
    statsToken: '', // NUXT_STATS_TOKEN
    public: {
      // URL publique de l'app, utilisée par BetterAuth pour les callbacks OAuth.
      baseUrl: 'http://localhost:3000', // NUXT_PUBLIC_BASE_URL
      // Base d'où sont servies les icônes de droids. Voir README : les assets sont
      // propriétaires Epic/Lucasfilm et ne sont pas versionnés dans ce dépôt.
      droidImageBase: '/droids', // NUXT_PUBLIC_DROID_IMAGE_BASE
    },
  },
  compatibilityDate: '2025-07-15',

  /**
   * Stockage des instantanés de synchronisation (codes de partage anonymes).
   *
   * En production, on s'appuie sur **Netlify Blobs** : un magasin clé-valeur intégré à la
   * plateforme, sans base de données ni connexion à provisionner — l'instantané d'une
   * progression n'a besoin de rien de plus. En développement, un simple dossier `.data/`
   * (pilote `fs`) rend la même API disponible sans dépendre de Netlify.
   */
  nitro: {
    storage: {
      sync: { driver: 'netlify-blobs', name: 'droidex-sync' },
      // Compteurs de fréquentation agrégés (voir server/utils/stats.ts). Même magasin
      // Netlify Blobs, espace distinct : quelques petites clés, aucune donnée personnelle.
      stats: { driver: 'netlify-blobs', name: 'droidex-stats' },
    },
    devStorage: {
      sync: { driver: 'fs', base: './.data/sync' },
      stats: { driver: 'fs', base: './.data/stats' },
    },
  },

  vite: {
    plugins: [tailwindcss()],
  },

  /**
   * Le module génère la configuration ESLint à plat en s'appuyant sur les conventions
   * Nuxt : auto-imports connus, ordre des blocs de composant, règles Vue et TypeScript.
   * `stylistic` couvre la mise en forme, ce qui évite d'ajouter Prettier — deux outils
   * qui se disputent le formatage finissent toujours par se contredire.
   */
  eslint: {
    config: {
      stylistic: {
        indent: 2,
        quotes: 'single',
        semi: false,
        commaDangle: 'always-multiline',
        // Le code existant écrit systématiquement `(x) => …`. On aligne l'outil sur la
        // convention en place plutôt que de reformater 400 emplacements pour un gain nul.
        arrowParens: true,
      },
    },
  },

  /**
   * Polices téléchargées et servies depuis notre domaine au build : pas de requête vers
   * un tiers au chargement, et pas de saut de mise en page grâce aux métriques de repli
   * calculées par le module.
   */
  fonts: {
    families: [
      { name: 'Rajdhani', provider: 'google', weights: [500, 600, 700] },
      { name: 'Inter', provider: 'google', weights: [400, 500, 600] },
      { name: 'JetBrains Mono', provider: 'google', weights: [400, 500, 700] },
    ],
  },

  i18n: {
    defaultLocale: 'fr',
    strategy: 'prefix_except_default',
    // Requis pour générer des balises hreflang et canonical absolues.
    baseUrl: process.env.NUXT_PUBLIC_BASE_URL || 'http://localhost:3000',
    // Mémorise la langue choisie sans redirection surprise au premier chargement.
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'droidex_locale',
      redirectOn: 'root',
    },
    locales: [
      { code: 'fr', language: 'fr-FR', name: 'Français', file: 'fr.json' },
      { code: 'en', language: 'en-US', name: 'English', file: 'en.json' },
      { code: 'es', language: 'es-ES', name: 'Español', file: 'es.json' },
      { code: 'de', language: 'de-DE', name: 'Deutsch', file: 'de.json' },
      { code: 'pt', language: 'pt-PT', name: 'Português', file: 'pt.json' },
      { code: 'it', language: 'it-IT', name: 'Italiano', file: 'it.json' },
    ],
  },

  /**
   * PWA installable et consultable hors ligne — l'app se lit en second écran pendant
   * une session de jeu, où la connexion n'est pas garantie.
   */
  pwa: {
    registerType: 'autoUpdate',
    manifest: {
      name: 'Droidex — Star Wars: Droid Tycoon',
      short_name: 'Droidex',
      description: 'La bible communautaire de Star Wars: Droid Tycoon',
      lang: 'fr',
      theme_color: '#07090f',
      background_color: '#07090f',
      display: 'standalone',
      orientation: 'portrait',
      start_url: '/',
      icons: [
        { src: '/icons/icon-192.png', sizes: '192x192', type: 'image/png' },
        { src: '/icons/icon-512.png', sizes: '512x512', type: 'image/png' },
        { src: '/icons/icon-512-maskable.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
      ],
    },
    workbox: {
      globPatterns: ['**/*.{js,css,html,json,woff2}'],
      runtimeCaching: [
        {
          // Les icônes de droids ne changent jamais une fois publiées.
          urlPattern: ({ url }) => url.pathname.startsWith('/droids/'),
          handler: 'CacheFirst',
          options: {
            cacheName: 'droid-images',
            expiration: { maxEntries: 400, maxAgeSeconds: 60 * 60 * 24 * 90 },
          },
        },
        {
          // La progression doit rester fraîche, mais rester lisible hors ligne.
          urlPattern: ({ url }) => url.pathname.startsWith('/api/progress'),
          handler: 'NetworkFirst',
          options: { cacheName: 'progress', networkTimeoutSeconds: 5 },
        },
      ],
    },
    client: { installPrompt: true },
    devOptions: { enabled: false },
  },
})
