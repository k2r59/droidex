import tailwindcss from '@tailwindcss/vite'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  modules: ['@pinia/nuxt', '@nuxtjs/i18n', '@vueuse/nuxt', '@vite-pwa/nuxt', '@nuxt/fonts'],

  css: ['~/assets/css/main.css'],

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

  vite: {
    plugins: [tailwindcss()],
  },

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
    public: {
      // URL publique de l'app, utilisée par BetterAuth pour les callbacks OAuth.
      baseUrl: 'http://localhost:3000', // NUXT_PUBLIC_BASE_URL
      // Base d'où sont servies les icônes de droids. Voir README : les assets sont
      // propriétaires Epic/Lucasfilm et ne sont pas versionnés dans ce dépôt.
      droidImageBase: '/droids', // NUXT_PUBLIC_DROID_IMAGE_BASE
    },
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
          urlPattern: ({ url }) => url.pathname.startsWith('/api/v1/progress'),
          handler: 'NetworkFirst',
          options: { cacheName: 'progress', networkTimeoutSeconds: 5 },
        },
      ],
    },
    client: { installPrompt: true },
    devOptions: { enabled: false },
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
    ],
  },
})
