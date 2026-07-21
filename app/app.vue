<script setup lang="ts">
const { t, locale } = useI18n()

// `useLocaleHead()` produit les balises hreflang et canonical ; ses types de `link`/`meta`
// ne correspondent pas à ceux attendus par `useHead`, d'où le passage par `useServerHead`
// dédié côté i18n et un `useHead` limité au titre et à la langue du document.
const head = useLocaleHead()

useHead(() => ({
  htmlAttrs: { lang: locale.value },
  link: [
    // Le SVG passe avant l'ICO : les navigateurs qui le gèrent prennent le vectoriel,
    // les autres retombent d'eux-mêmes sur `/favicon.ico`.
    { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
    { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/icons/favicon-32.png' },
    { rel: 'apple-touch-icon', href: '/icons/apple-touch-icon.png' },
    ...(head.value.link as never[]),
  ],
  meta: head.value.meta as never,
  /**
   * Sur les pages internes, le nom du site suffit en suffixe. Sur l'accueil, où le titre
   * de page est vide, on déroule l'accroche : c'est ce libellé qui s'affiche dans un
   * onglet, un favori et un résultat de recherche.
   */
  titleTemplate: (title?: string) =>
    title ? `${title} — ${t('app.name')}` : `${t('app.name')} — ${t('app.tagline')}`,
}))
</script>

<template>
  <div>
    <NuxtRouteAnnouncer />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
