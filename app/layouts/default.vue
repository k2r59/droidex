<script setup lang="ts">
const store = useCollectionStore()
const { user } = useAuthSession()
const route = useRoute()

/*
 * La colonne des Emblématiques n'appartient qu'au Droidex. Les autres pages ont leur
 * propre colonne de droite — les Supers Renaissances, par exemple — et deux rails
 * simultanés ne tiendraient pas.
 */
const showIconicRail = computed(() => /^index(___[a-z]{2})?$/.test(String(route.name ?? '')))

onMounted(() => store.loadLocal())

watch(
  () => user.value?.id,
  (id) => {
    if (id) store.enableRemote()
    else store.disableRemote()
  },
)
</script>

<template>
  <div class="flex min-h-dvh items-start bg-void text-ink">
    <AppSidebar />

    <div class="flex min-w-0 flex-1 flex-col">
      <AppHeader />

      <p
        v-if="store.syncError"
        class="sticky top-0 z-40 bg-warn/15 px-4 py-2 text-center text-sm text-warn"
        role="status"
      >
        {{ $t('common.syncFailed') }}
        <button class="ml-2 underline" @click="store.enableRemote()">{{ $t('common.retry') }}</button>
      </p>

      <main class="@container mx-auto w-full max-w-[1440px] flex-1 px-3 py-4 pb-24 sm:px-4 sm:py-5 md:pb-6">
        <slot />
      </main>

      <AppFooter />
    </div>

    <IconicPanel v-if="showIconicRail" />
    <MobileNav />
  </div>
</template>
