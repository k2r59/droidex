<script setup lang="ts">
/**
 * Page de fréquentation.
 *
 * Non listée et en `noindex` : accessible par son URL directe, mais on ne la met en avant
 * nulle part et on la tient hors des moteurs de recherche. Elle affiche les compteurs
 * agrégés servis par `/api/stats` — tout est anonyme (ni cookie, ni identifiant), il n'y a
 * donc rien à protéger derrière un mot de passe.
 */
const { t, locale } = useI18n()

useSeoMeta({
  title: () => t('statsPage.title'),
  // Non listée et sans intérêt pour l'index : on la tient hors des moteurs.
  robots: 'noindex, nofollow',
})

type StatsResponse = {
  totals: { pageviews: number, visits: number }
  pages: { page: string, views: number }[]
  days: { date: string, pageviews: number, visits: number }[]
  updatedAt: string
}

const { data, pending, error } = await useFetch<StatsResponse>('/api/stats')

/** Libellés des pages : on réutilise la navigation, avec quelques ajouts propres aux stats. */
const PAGE_LABEL: Record<string, string> = {
  accueil: 'nav.droidex',
  renaissances: 'nav.rebirths',
  missions: 'nav.missions',
  boutique: 'nav.shop',
  nouveautes: 'nav.updates',
  guide: 'nav.guide',
  legal: 'nav.legal',
  profil: 'nav.profile',
  installation: 'statsPage.labelInstall',
  stats: 'statsPage.title',
  droid: 'statsPage.labelDroid',
  autre: 'statsPage.labelOther',
}
function pageLabel(key: string) {
  return t(PAGE_LABEL[key] ?? 'statsPage.labelOther')
}

const days = computed(() => data.value?.days ?? [])
const maxDay = computed(() => Math.max(1, ...days.value.map((d) => d.pageviews)))
const totalPages = computed(() => data.value?.pages.reduce((s, p) => s + p.views, 0) ?? 0)

function dayTitle(iso: string, views: number) {
  const d = new Intl.DateTimeFormat(locale.value, { day: 'numeric', month: 'short' }).format(new Date(iso))
  return `${d} · ${views}`
}
</script>

<template>
  <div class="mx-auto flex max-w-3xl flex-col gap-6">
    <header>
      <h1 class="text-2xl font-bold uppercase tracking-tight sm:text-3xl">
        {{ $t('statsPage.title') }}
      </h1>
      <p class="mt-2 text-sm leading-relaxed text-ink-muted">
        {{ $t('statsPage.intro') }}
      </p>
    </header>

    <p
      v-if="error"
      class="panel p-4 sm:p-6 text-sm text-danger"
    >
      {{ $t('statsPage.loadError') }}
    </p>

    <template v-else>
      <!-- Deux grands compteurs. -->
      <section class="grid gap-3 sm:grid-cols-2">
        <div class="panel p-4 sm:p-6">
          <p class="text-xs uppercase tracking-wide text-ink-muted">
            {{ $t('statsPage.visits') }}
          </p>
          <p class="mt-1 font-mono text-3xl font-bold tabular-nums text-accent">
            <span v-if="pending">—</span>
            <span v-else>{{ formatExact(data?.totals.visits ?? 0, locale) }}</span>
          </p>
        </div>
        <div class="panel p-4 sm:p-6">
          <p class="text-xs uppercase tracking-wide text-ink-muted">
            {{ $t('statsPage.pageviews') }}
          </p>
          <p class="mt-1 font-mono text-3xl font-bold tabular-nums">
            <span v-if="pending">—</span>
            <span v-else>{{ formatExact(data?.totals.pageviews ?? 0, locale) }}</span>
          </p>
        </div>
      </section>

      <!-- 30 derniers jours : barres de pages vues. -->
      <section class="panel p-4 sm:p-6">
        <h2 class="text-sm font-semibold uppercase tracking-[0.14em] text-ink">
          {{ $t('statsPage.last30') }}
        </h2>
        <div class="mt-5 flex h-32 items-end gap-1">
          <div
            v-for="d in days"
            :key="d.date"
            class="group flex h-full flex-1 items-end"
            :title="dayTitle(d.date, d.pageviews)"
          >
            <div
              class="w-full rounded-t bg-accent/70 transition-colors group-hover:bg-accent"
              :style="{ height: `${Math.round((d.pageviews / maxDay) * 100)}%`, minHeight: d.pageviews ? '2px' : '0' }"
            />
          </div>
        </div>
        <p class="mt-3 text-xs text-ink-muted">
          {{ $t('statsPage.last30Note') }}
        </p>
      </section>

      <!-- Répartition par page. -->
      <section
        v-if="data?.pages.length"
        class="panel p-4 sm:p-6"
      >
        <h2 class="text-sm font-semibold uppercase tracking-[0.14em] text-ink">
          {{ $t('statsPage.byPage') }}
        </h2>
        <ul class="mt-4 flex flex-col gap-2.5">
          <li
            v-for="p in data.pages"
            :key="p.page"
            class="flex items-center gap-3"
          >
            <span class="w-28 shrink-0 truncate text-sm sm:w-36">{{ pageLabel(p.page) }}</span>
            <span class="dx-progress h-2 flex-1">
              <span :style="{ '--value': `${totalPages ? Math.round((p.views / totalPages) * 100) : 0}%` }" />
            </span>
            <span class="w-14 shrink-0 text-right font-mono text-sm tabular-nums text-ink-muted">
              {{ formatExact(p.views, locale) }}
            </span>
          </li>
        </ul>
      </section>

      <p class="text-center text-xs text-ink-muted">
        {{ $t('statsPage.privacyNote') }}
      </p>
    </template>
  </div>
</template>
