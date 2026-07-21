<script setup lang="ts">
const { t, locale } = useI18n()
const head = useLocaleHead()

useHead(() => ({
  htmlAttrs: { lang: locale.value, ...head.value.htmlAttrs },
  link: head.value.link,
  meta: head.value.meta,
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
