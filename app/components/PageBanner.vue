<script setup lang="ts">
/**
 * Bannière d'en-tête de page.
 *
 * Le pack fournit une image par page et par palier de largeur, avec des cadrages
 * différents — le mobile est en portrait (720×960), le desktop en bandeau très large
 * (1920×480). Ce ne sont donc pas de simples redimensionnements : `srcset` seul ne
 * suffirait pas, il faut `<picture>` et des `media` pour choisir le bon cadrage.
 *
 * Les images sont volontairement sans texte : le titre et le contenu se posent dessus.
 */
const props = withDefaults(
  defineProps<{
    /** Nom de la page dans le pack : `droidex`, `renaissances`, `missions`… */
    name: string
    /** Hauteur minimale du bandeau. */
    minHeight?: string
  }>(),
  { minHeight: '13rem' },
)

const images = import.meta.glob('~/assets/images/banners/*.webp', {
  import: 'default',
  eager: true,
}) as Record<string, string>

const FALLBACK = 'hero-droids'

/**
 * Cherche l'image de la page, puis retombe sur la bannière commune. Ce repli permet de
 * changer d'ambiance page par page en déposant simplement un fichier au bon nom, sans
 * toucher au code.
 */
const src = (bp: string) => {
  for (const name of [props.name, FALLBACK]) {
    const key = Object.keys(images).find((k) => k.endsWith(`/${name}-${bp}.webp`))
    if (key) return images[key]
  }
  return undefined
}

const desktop = computed(() => src('desktop'))
const tablet = computed(() => src('tablet'))
const mobile = computed(() => src('mobile'))
</script>

<template>
  <section
    class="panel relative isolate overflow-hidden"
    :style="{ minHeight }"
  >
    <picture v-if="desktop" class="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
      <source v-if="mobile" :srcset="mobile" media="(max-width: 720px)">
      <source v-if="tablet" :srcset="tablet" media="(max-width: 1200px)">
      <img :src="desktop" alt="" class="size-full object-cover object-center">
    </picture>

    <!--
      Voile de lecture : presque opaque à gauche, ouvert à droite. Sans lui, un titre
      blanc passerait sur les zones claires de l'illustration.
    -->
    <div
      v-if="desktop"
      class="pointer-events-none absolute inset-0 -z-10"
      style="background: linear-gradient(90deg, rgb(4 13 27 / 0.94) 0%, rgb(4 13 27 / 0.78) 45%, rgb(4 13 27 / 0.30) 100%)"
      aria-hidden="true"
    />

    <div class="relative flex h-full flex-col justify-center gap-4 p-6 lg:p-8">
      <slot />
    </div>
  </section>
</template>
