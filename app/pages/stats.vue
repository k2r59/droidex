<script setup lang="ts">
/**
 * Page de fréquentation — **privée**.
 *
 * Elle n'est listée nulle part et son API de lecture exige un jeton (voir
 * `server/api/stats.get.ts`). On saisit ce jeton une fois ; il est gardé en local et renvoyé
 * en en-tête à chaque lecture. Le comptage (écriture) reste public, lui.
 *
 * Récupération côté client uniquement : le jeton vit dans le navigateur, jamais dans un rendu
 * serveur. La page n'est donc pas indexée et ne fuite aucun chiffre sans le secret.
 */
const { t, locale } = useI18n()

useSeoMeta({
  title: () => t('statsPage.title'),
  // Non listée et sans intérêt pour l'index : on décourage l'exploration.
  robots: 'noindex, nofollow',
})

type StatsResponse = {
  totals: { pageviews: number, visits: number }
  pages: { page: string, views: number }[]
  days: { date: string, pageviews: number, visits: number }[]
  updatedAt: string
}

const STORE_KEY = 'droidex:stats-token'

const token = ref('')
const data = ref<StatsResponse | null>(null)
const loading = ref(false)
const wrong = ref(false)

async function load(secret: string) {
  loading.value = true
  wrong.value = false
  try {
    data.value = await $fetch<StatsResponse>('/api/stats', {
      headers: { 'x-stats-token': secret },
    })
    try {
      localStorage.setItem(STORE_KEY, secret)
    }
    catch {
      // Sans stockage, il faudra ressaisir le jeton à la prochaine visite. Sans gravité.
    }
  }
  catch {
    data.value = null
    wrong.value = true
    try {
      localStorage.removeItem(STORE_KEY)
    }
    catch { /* ignoré */ }
  }
  finally {
    loading.value = false
  }
}

function unlock() {
  const secret = token.value.trim()
  if (secret) load(secret)
}

function lock() {
  data.value = null
  token.value = ''
  try {
    localStorage.removeItem(STORE_KEY)
  }
  catch { /* ignoré */ }
}

onMounted(() => {
  let saved: string | null = null
  try {
    saved = localStorage.getItem(STORE_KEY)
  }
  catch { /* ignoré */ }
  if (saved) load(saved)
})

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
    <header class="flex items-start justify-between gap-4">
      <div>
        <h1 class="text-2xl font-bold uppercase tracking-tight sm:text-3xl">
          {{ $t('statsPage.title') }}
        </h1>
        <p class="mt-2 text-sm leading-relaxed text-ink-muted">
          {{ $t('statsPage.intro') }}
        </p>
      </div>
      <button
        v-if="data"
        type="button"
        class="dx-button dx-button--ghost shrink-0"
        @click="lock"
      >
        <DxIcon
          name="status/locked"
          :size="15"
        />
        {{ $t('statsPage.lock') }}
      </button>
    </header>

    <!-- Porte d'accès : tant que les données ne sont pas chargées, on demande le jeton. -->
    <section
      v-if="!data"
      class="panel p-6"
    >
      <h2 class="flex items-center gap-2 font-semibold">
        <DxIcon
          name="status/locked"
          :size="18"
          class="text-accent"
        />
        {{ $t('statsPage.lockedTitle') }}
      </h2>
      <p class="mt-1 text-sm text-ink-muted">
        {{ $t('statsPage.lockedIntro') }}
      </p>
      <form
        class="mt-4 flex flex-col gap-2 sm:flex-row"
        @submit.prevent="unlock"
      >
        <input
          v-model="token"
          type="password"
          autocomplete="off"
          :placeholder="$t('statsPage.tokenPlaceholder')"
          class="min-w-0 flex-1 rounded-md border border-edge bg-void/60 px-3 py-2 font-mono outline-none transition-colors placeholder:font-sans placeholder:text-ink-muted focus:border-accent"
        >
        <button
          type="submit"
          class="dx-button dx-button--primary shrink-0"
          :disabled="loading || !token.trim()"
        >
          {{ $t('statsPage.unlock') }}
        </button>
      </form>
      <p
        v-if="wrong"
        class="mt-2 text-sm text-danger"
      >
        {{ $t('statsPage.wrongToken') }}
      </p>
    </section>

    <template v-else>
      <!-- Deux grands compteurs. -->
      <section class="grid gap-3 sm:grid-cols-2">
        <div class="panel p-6">
          <p class="text-xs uppercase tracking-wide text-ink-muted">
            {{ $t('statsPage.visits') }}
          </p>
          <p class="mt-1 font-mono text-3xl font-bold tabular-nums text-accent">
            {{ formatExact(data.totals.visits, locale) }}
          </p>
        </div>
        <div class="panel p-6">
          <p class="text-xs uppercase tracking-wide text-ink-muted">
            {{ $t('statsPage.pageviews') }}
          </p>
          <p class="mt-1 font-mono text-3xl font-bold tabular-nums">
            {{ formatExact(data.totals.pageviews, locale) }}
          </p>
        </div>
      </section>

      <!-- 30 derniers jours : barres de pages vues. -->
      <section class="panel p-6">
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
        v-if="data.pages.length"
        class="panel p-6"
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
