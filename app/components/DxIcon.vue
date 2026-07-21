<script setup lang="ts">
/**
 * Icône du pack d'assets, rendue en SVG inline.
 *
 * Les fichiers sont inclus dans le bundle par `import.meta.glob` en mode brut plutôt
 * que chargés en `<img>` : c'est ce qui permet à `currentColor` de fonctionner, donc
 * de teinter l'icône par état (actif, survol, désactivé) sans dupliquer les fichiers.
 * Le coût est un peu de poids dans le bundle, largement compensé par les requêtes
 * réseau évitées — la navigation en affiche une douzaine.
 */
const props = withDefaults(
  defineProps<{
    /** Chemin relatif sans extension, par exemple `navigation/droidex`. */
    name: string
    size?: number | string
  }>(),
  { size: 20 },
)

const files = import.meta.glob('~/assets/icons/**/*.svg', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>

/** Les clés du glob sont des chemins complets : on les réindexe sur `dossier/nom`. */
const byName = Object.fromEntries(
  Object.entries(files).map(([path, svg]) => {
    const m = path.match(/icons\/(.+)\.svg$/)
    return [m ? m[1] : path, svg]
  }),
)

const svg = computed(() => {
  const raw = byName[props.name]
  if (!raw) {
    // Une icône absente ne doit pas casser la mise en page : on laisse un vide de la
    // bonne taille, et on signale en développement.
    if (import.meta.dev) console.warn(`[DxIcon] icône introuvable : ${props.name}`)
    return ''
  }
  // La taille est portée par le conteneur ; on retire celle du fichier si présente.
  return raw.replace(/<svg([^>]*)>/, (_: string, attrs: string) =>
    `<svg${attrs.replace(/\s(width|height)="[^"]*"/g, '')} width="100%" height="100%">`,
  )
})

const style = computed(() => {
  const s = typeof props.size === 'number' ? `${props.size}px` : props.size
  return { width: s, height: s }
})
</script>

<template>
  <span
    class="inline-grid shrink-0 place-items-center"
    :style="style"
    aria-hidden="true"
    v-html="svg"
  />
</template>
