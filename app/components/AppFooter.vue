<script setup lang="ts">
/**
 * Imports nommés, et non l'objet entier : `import droidData from '…/droids.json'`
 * embarquait les 126 Ko du dataset dans le bundle de **chaque** page pour n'en afficher
 * qu'une chaîne. Vite sait éliminer le reste quand on ne demande que le champ utile.
 */
import { generatedFrom } from '~/data/droids.json'
import updates from '~/data/updates.json'

const ISLAND_CODE = '7865-8305-9184'

/**
 * Version courante de l'île : la plus récente des notes de version qui en porte une.
 * On la dérive du fil des nouveautés plutôt que de la saisir en dur, pour qu'elle ne
 * puisse pas diverger de ce que la page Nouveautés annonce.
 */
const islandVersion = computed<string | null>(() => {
  const datees = updates.entries
    .filter((e) => 'version' in e && e.version)
    .sort((a, b) => b.date.localeCompare(a.date))
  return (datees[0] as { version?: string } | undefined)?.version ?? null
})
</script>

<template>
  <footer class="mt-12 border-t border-edge-soft px-4 py-8 text-sm text-ink-muted">
    <div class="mx-auto flex max-w-7xl flex-col gap-3">
      <p class="font-medium text-ink">
        {{ $t('disclaimer.title') }}
      </p>
      <p>{{ $t('disclaimer.community') }}</p>
      <p class="text-xs">
        {{ $t('disclaimer.rights') }}
      </p>
      <p class="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs">
        <span>{{ $t('app.islandCode', { code: ISLAND_CODE }) }}</span>
        <span
          v-if="islandVersion"
          aria-hidden="true"
        >·</span>
        <span
          v-if="islandVersion"
          class="rounded-md border border-edge-soft bg-panel px-2 py-0.5 font-mono text-accent"
        >
          {{ $t('app.islandVersion', { version: islandVersion }) }}
        </span>
        <span aria-hidden="true">·</span>
        <span class="font-mono">{{ generatedFrom }}</span>
      </p>
    </div>
  </footer>
</template>
