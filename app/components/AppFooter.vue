<script setup lang="ts">
import droidData from '~/data/droids.json'

const ISLAND_CODE = '7865-8305-9184'
</script>

<template>
  <footer class="mt-12 border-t border-edge px-4 py-8 text-sm text-ink-muted">
    <div class="mx-auto flex max-w-7xl flex-col gap-3">
      <p class="font-medium text-ink">{{ $t('disclaimer.title') }}</p>
      <p>{{ $t('disclaimer.community') }}</p>
      <p class="text-xs">{{ $t('disclaimer.rights') }}</p>
      <p class="text-xs">
        {{ $t('app.islandCode', { code: ISLAND_CODE }) }} ·
        <span class="font-mono">{{ droidData.generatedFrom }}</span>
      </p>
    </div>
  </footer>
</template>
