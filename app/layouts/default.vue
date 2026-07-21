<script setup lang="ts">
const store = useCollectionStore()
const { user } = useAuthSession()

// La progression n'existe que pour un compte : on la charge à la connexion, et on la
// vide à la déconnexion pour ne pas laisser la collection du précédent utilisateur à l'écran.
watch(
  () => user.value?.id,
  (id) => {
    if (id) store.load()
    else store.reset()
  },
  { immediate: true },
)
</script>

<template>
  <div class="min-h-dvh bg-void text-ink">
    <AppHeader />

    <!-- Un échec d'enregistrement doit être visible : sinon l'utilisateur croit sa
         collection sauvegardée alors qu'elle ne l'est pas. -->
    <p
      v-if="store.syncError"
      class="sticky top-0 z-40 bg-red-950 px-4 py-2 text-center text-sm text-red-200"
      role="alert"
    >
      {{ $t('common.syncFailed') }}
      <button class="ml-2 underline" @click="store.load()">{{ $t('common.retry') }}</button>
    </p>

    <main class="mx-auto max-w-7xl px-4 py-6 pb-24 md:pb-6">
      <slot />
    </main>

    <AppFooter />
    <MobileNav />
  </div>
</template>
