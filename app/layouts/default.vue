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

onMounted(() => { void store.loadLocal() })

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

    <!--
      Le dégagement de `MobileNav` (barre fixe en bas, jusqu'à `lg`) est porté ici, sous le
      footer : c'est le dernier bloc, c'est donc lui qui doit passer au-dessus de la barre.
      Le mettre sur `<main>` créait un grand vide entre le contenu et le footer.
    -->
    <div class="flex min-w-0 flex-1 flex-col pb-24 lg:pb-0">
      <AppHeader />

      <p
        v-if="store.syncError"
        class="sticky top-0 z-40 bg-warn/15 px-4 py-2 text-center text-sm text-warn"
        role="status"
      >
        {{ $t('common.syncFailed') }}
        <button
          class="ml-2 underline"
          @click="store.enableRemote()"
        >
          {{ $t('common.retry') }}
        </button>
      </p>

      <main class="@container mx-auto w-full max-w-[1440px] flex-1 px-3 py-4 sm:px-4 sm:py-5">
        <slot />
      </main>

      <AppFooter />
    </div>

    <IconicPanel v-if="showIconicRail" />
    <MobileNav />

    <!--
      Voile de chargement : présent dès le rendu serveur (`hydrated` est faux avant que la
      progression locale ne soit lue), il floute toute la page et s'efface en fondu une fois
      prête. `hydrated` ne se réarme qu'au chargement/rechargement complet — pas en navigation
      SPA —, si bien que le voile n'apparaît qu'au bon moment.
    -->
    <Transition name="dx-boot">
      <div
        v-if="!store.hydrated"
        class="dx-boot"
        role="status"
        aria-live="polite"
        aria-busy="true"
      >
        <div class="dx-boot__inner">
          <span
            class="dx-boot__spinner"
            aria-hidden="true"
          />
          <span class="dx-boot__label">{{ $t('common.loading') }}</span>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
/* Voile plein écran qui floute le contenu ; le contenu reste dessous, juste dépoli. */
.dx-boot {
  position: fixed;
  inset: 0;
  z-index: 200;
  display: grid;
  place-items: center;
  background: color-mix(in srgb, var(--color-void) 55%, transparent);
  backdrop-filter: blur(14px) saturate(120%);
  -webkit-backdrop-filter: blur(14px) saturate(120%);
}

.dx-boot__inner {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.dx-boot__spinner {
  width: 2.75rem;
  height: 2.75rem;
  border-radius: 50%;
  border: 3px solid color-mix(in srgb, var(--color-accent) 22%, transparent);
  border-top-color: var(--color-accent);
  animation: dx-boot-spin 0.8s linear infinite;
}

.dx-boot__label {
  font-weight: 600;
  font-size: 0.95rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--color-ink-strong, #fff);
}

@keyframes dx-boot-spin {
  to {
    transform: rotate(360deg);
  }
}

/* Sortie en fondu ; l'entrée est immédiate (le voile est là dès la première peinture). */
.dx-boot-leave-active {
  transition: opacity 0.35s ease;
}
.dx-boot-leave-to {
  opacity: 0;
}

@media (prefers-reduced-motion: reduce) {
  .dx-boot__spinner {
    animation: none;
  }
}
</style>
