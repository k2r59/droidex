<script setup lang="ts">
const store = useCollectionStore()
const { user } = useAuthSession()

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
        class="sticky top-0 z-40 bg-amber-950 px-4 py-2 text-center text-sm text-amber-200"
        role="status"
      >
        {{ $t('common.syncFailed') }}
        <button class="ml-2 underline" @click="store.enableRemote()">{{ $t('common.retry') }}</button>
      </p>

      <main class="@container mx-auto w-full max-w-[1600px] flex-1 px-3 py-4 pb-24 sm:px-4 sm:py-5 md:pb-6">
        <slot />
      </main>

      <AppFooter />
    </div>

    <IconicPanel />
    <MobileNav />
  </div>
</template>
