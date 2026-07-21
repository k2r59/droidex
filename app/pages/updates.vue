<script setup lang="ts">
import updatesData from '~/data/updates.json'

const store = useCollectionStore()
const { t, locale } = useI18n()
const localePath = useLocalePath()

useSeoMeta({
  title: () => t('updates.title'),
  description: () => t('updates.subtitle'),
})

type Entry = {
  date: string
  kind: 'release' | 'patch' | 'event'
  version?: string
  title: string
  body: string
  endDate?: string
  droidSlug?: string
}

const entries = computed(() =>
  [...(updatesData.entries as Entry[])].sort((a, b) => b.date.localeCompare(a.date)),
)

const droidBySlug = computed(() => Object.fromEntries(store.droids.map((d) => [d.slug, d])))

const KIND_CLASS: Record<Entry['kind'], string> = {
  release: 'bg-iconic/15 text-iconic',
  patch: 'bg-rare/15 text-rare',
  event: 'bg-legendary/15 text-legendary',
}

function formatDate(iso: string) {
  return new Intl.DateTimeFormat(locale.value, { dateStyle: 'long' }).format(new Date(iso))
}
</script>

<template>
  <div class="flex flex-col gap-5">
    <PageBanner name="nouveautes">
      <div>
      <h1 class="text-xl font-bold">{{ $t('updates.title') }}</h1>
      <p class="text-sm text-ink-muted">{{ $t('updates.subtitle') }}</p>
      </div>
    </PageBanner>

    <!-- Fil chronologique inversé : la nouveauté est ce qu'on vient vérifier. -->
    <ol class="relative flex flex-col gap-3 border-l border-edge pl-5">
      <li
        v-for="entry in entries"
        :key="`${entry.date}-${entry.title}`"
        class="relative rounded-card border border-edge bg-panel p-6"
      >
        <span
          class="absolute -left-[26px] top-5 size-2.5 rounded-full ring-4 ring-void"
          :class="entry.kind === 'event' ? 'bg-legendary' : 'bg-rare'"
        />

        <div class="flex flex-wrap items-center gap-2">
          <span class="rounded px-1.5 py-0.5 text-xs font-medium uppercase" :class="KIND_CLASS[entry.kind]">
            {{ $t(`updates.${entry.kind === 'event' ? 'event' : 'patch'}`) }}
          </span>
          <span v-if="entry.version" class="font-mono text-xs text-ink-muted">
            {{ $t('updates.version', { version: entry.version }) }}
          </span>
          <time :datetime="entry.date" class="ml-auto text-xs text-ink-muted">
            {{ formatDate(entry.date) }}
            <template v-if="entry.endDate"> → {{ formatDate(entry.endDate) }}</template>
          </time>
        </div>

        <h2 class="mt-1.5 font-semibold">{{ entry.title }}</h2>
        <p class="mt-1 text-sm text-ink-muted">{{ entry.body }}</p>

        <NuxtLink
          v-if="entry.droidSlug && droidBySlug[entry.droidSlug]"
          :to="localePath(`/droids/${entry.droidSlug}`)"
          class="mt-3 inline-flex items-center gap-2 rounded-lg bg-panel-raised px-2 py-1.5 text-sm transition-colors hover:bg-edge"
        >
          <DroidImage :droid="droidBySlug[entry.droidSlug]!" tier="DEFAULT" size="sm" />
          {{ droidBySlug[entry.droidSlug]!.name }}
        </NuxtLink>
      </li>
    </ol>
  </div>
</template>
