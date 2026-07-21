<script setup lang="ts">
const { t, locale } = useI18n()

// `useLocaleHead()` produit les balises hreflang et canonical ; ses types de `link`/`meta`
// ne correspondent pas à ceux attendus par `useHead`, d'où le passage par `useServerHead`
// dédié côté i18n et un `useHead` limité au titre et à la langue du document.
const head = useLocaleHead()

useHead(() => ({
  htmlAttrs: { lang: locale.value },
  link: head.value.link as never,
  meta: head.value.meta as never,
  titleTemplate: (title?: string) => (title ? `${title} — ${t('app.name')}` : t('app.name')),
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
