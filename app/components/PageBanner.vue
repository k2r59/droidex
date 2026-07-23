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
  <!--
    La hauteur minimale (calée sur le cadrage de l'illustration) ne s'applique qu'à partir de
    `sm` : sur mobile, la bannière épouse son contenu, sans réserver de vide sous une carte
    compacte. En dessous, un plancher discret garde une présence à l'image.
  -->
  <section
    class="panel relative isolate min-h-[9rem] overflow-hidden sm:min-h-[var(--dx-banner-h)]"
    :style="{ '--dx-banner-h': minHeight }"
  >
    <!--
      Fond de la bannière. Par défaut : l'illustration du pack + un voile de lecture. Une page
      peut le remplacer entièrement via le slot `#backdrop` — par exemple un fond spatial
      animé, sans image à charger.
    -->
    <slot name="backdrop">
      <picture
        v-if="desktop"
        class="pointer-events-none absolute inset-0 -z-10"
        aria-hidden="true"
      >
        <source
          v-if="mobile"
          :srcset="mobile"
          media="(max-width: 720px)"
        >
        <source
          v-if="tablet"
          :srcset="tablet"
          media="(max-width: 1200px)"
        >
        <img
          :src="desktop"
          alt=""
          class="size-full object-cover object-center"
        >
      </picture>

      <!--
        Voile de lecture : presque opaque à gauche (là où passe le titre blanc), et bien plus
        ouvert à droite pour laisser voir l'illustration. Le fondu se referme vers 55 % puis
        s'éclaircit franchement, la droite ne portant aucun texte.
      -->
      <div
        v-if="desktop"
        class="pointer-events-none absolute inset-0 -z-10"
        style="background: linear-gradient(90deg, rgb(4 13 27 / 0.94) 0%, rgb(4 13 27 / 0.72) 45%, rgb(4 13 27 / 0.10) 100%)"
        aria-hidden="true"
      />
    </slot>

    <!-- Marges réduites sur mobile : chaque pixel de largeur compte sur un téléphone, et le
         contenu (cartes compactes) doit s'étendre au plus près des bords. -->
    <div class="relative flex h-full flex-col justify-center gap-4 p-4 sm:p-6 lg:p-8">
      <slot />
    </div>
  </section>
</template>
