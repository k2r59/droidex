<script setup lang="ts">
const store = useCollectionStore()
const { user } = useAuthSession()

// La progression locale est disponible sans compte : on la charge dès le montage,
// avant même de savoir si une session existe.
onMounted(() => store.loadLocal())

// Puis on active la réplication serveur à la connexion, et on la coupe à la déconnexion
// — sans effacer le local, l'utilisateur redevient simplement un visiteur.
watch(
  () => user.value?.id,
  (id) => {
    if (id) store.enableRemote()
    else store.disableRemote()
  },
)
</script>

<template>
  <div class="min-h-dvh bg-void text-ink">
    <AppHeader />

    <!-- Un échec de synchronisation doit être visible, mais sans alarmer : la progression
         est déjà enregistrée localement, seule la copie serveur a échoué. -->
    <p
      v-if="store.syncError"
      class="sticky top-0 z-40 bg-amber-950 px-4 py-2 text-center text-sm text-amber-200"
      role="status"
    >
      {{ $t('common.syncFailed') }}
      <button class="ml-2 underline" @click="store.enableRemote()">{{ $t('common.retry') }}</button>
    </p>

    <main class="mx-auto max-w-7xl px-4 py-6 pb-24 md:pb-6">
      <slot />
    </main>

    <AppFooter />
    <MobileNav />
  </div>
</template>
