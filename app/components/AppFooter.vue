<script setup lang="ts">
/**
 * Pied de page principal, en quatre colonnes (marque, données, liens, crédits), suivi d'un
 * bandeau de garanties et d'une barre basse.
 *
 * Imports nommés et non l'objet entier : `import droidData from '…/droids.json'` embarquait
 * les 126 Ko du dataset dans le bundle de chaque page pour n'en lire qu'une chaîne. Vite
 * élimine le reste quand on ne demande que le champ utile.
 */
import { generatedFrom } from '~/data/droids.json'
import updates from '~/data/updates.json'
import planet from '~/assets/images/planet-rebirth.webp'

const { locale } = useI18n()
const localePath = useLocalePath()

const ISLAND_CODE = '7865-8305-9184'

/**
 * Version courante de l'île : la plus récente des notes qui en portent une. Dérivée du fil
 * des nouveautés plutôt que saisie en dur, pour ne pas diverger de la page Nouveautés.
 */
const islandVersion = computed(() => {
  const datees = updates.entries
    .filter((e) => 'version' in e && e.version)
    .sort((a, b) => b.date.localeCompare(a.date))
  return (datees[0] as { version?: string } | undefined)?.version ?? null
})

/**
 * Date de génération des données et millésime des guides, extraits de `generatedFrom`
 * (forme `…/droidex@2026-06-02 + guides communautaires juillet 2026`). On les lit plutôt
 * que de les saisir en dur, pour qu'ils suivent la régénération des données. L'auteur du
 * dépôt d'origine n'est **pas** affiché : le projet agrège plusieurs sources
 * communautaires, en créditer une seule serait trompeur (voir la ligne « Sources »).
 */
const credits = computed(() => {
  const m = generatedFrom.match(/@(\d{4}-\d{2}-\d{2})(?:.*?guides communautaires\s+(.+))?$/)
  const iso = m?.[1] ?? null
  return {
    guides: m?.[2] ?? null,
    date: iso ? new Intl.DateTimeFormat(locale.value, { dateStyle: 'long' }).format(new Date(iso)) : null,
  }
})

/** Colonne « Liens utiles » : navigation interne + entrée communauté. */
const links = [
  { key: 'footer.guideComplete', icon: 'navigation/guide', to: '/guide' },
  { key: 'nav.rebirths', icon: 'navigation/renaissances', to: '/rebirths' },
  { key: 'nav.missions', icon: 'navigation/missions', to: '/missions' },
  { key: 'nav.shop', icon: 'navigation/nova-shop', to: '/shop' },
  { key: 'nav.updates', icon: 'ui/notification', to: '/updates' },
  { key: 'footer.subreddit', icon: 'brands/reddit', href: 'https://www.reddit.com/r/StarWarsDroidTycoon/' },
  { key: 'footer.joinCommunity', icon: 'game/community', href: 'https://discord.gg/droidtycoon' },
] as const

/** Bandeau de garanties : quatre repères sur la nature du projet. */
const features = [
  { icon: 'game/community', tone: 'text-accent', ring: 'border-accent/40', key: 'community' },
  { icon: 'game/shield', tone: 'text-valid', ring: 'border-valid/40', key: 'verified' },
  { icon: 'resources/energy', tone: 'text-rare', ring: 'border-rare/40', key: 'updates' },
  { icon: 'actions/heart', tone: 'text-legendary', ring: 'border-legendary/40', key: 'support' },
] as const

/** Réseaux et lien officiel, repris de la colonne de gauche. */
const socials = [
  { icon: 'brands/discord', href: 'https://discord.gg/droidtycoon', tint: 'text-[#5865F2]', label: 'Discord' },
  { icon: 'brands/x', href: 'https://x.com/FoadZone', tint: 'text-[#1d9bf0]', label: 'X — FOAD' },
  { icon: 'brands/x', href: 'https://x.com/BlznDev', tint: 'text-[#e0245e]', label: 'X — Blzn Studios' },
  { icon: 'actions/external-link', href: `https://www.fortnite.com/island?code=${ISLAND_CODE}`, tint: 'text-accent', label: 'Fortnite' },
] as const

/** Année du copyright, figée au montage : `new Date()` est indisponible au rendu serveur. */
const year = ref(2026)
onMounted(() => { year.value = new Date().getFullYear() })

const copied = ref(false)
async function copyCode() {
  try {
    await navigator.clipboard.writeText(ISLAND_CODE)
    copied.value = true
    setTimeout(() => { copied.value = false }, 1500)
  }
  catch {
    // Presse-papiers refusé (contexte non sécurisé) : on n'affiche rien plutôt qu'une erreur.
  }
}
</script>

<template>
  <footer class="mt-12 px-3 pb-6 sm:px-4">
    <div class="panel mx-auto max-w-[1440px] overflow-hidden p-6 sm:p-8 lg:p-10">
      <!-- Quatre colonnes : marque, données, liens, crédits. -->
      <div class="grid gap-8 lg:grid-cols-4 lg:gap-10">
        <!-- Marque -->
        <div>
          <div class="flex items-center gap-2.5">
            <DxIcon
              name="brands/droidex-mark"
              :size="30"
              class="text-accent"
            />
            <span class="text-xl font-bold uppercase tracking-tight">Droidex</span>
          </div>
          <p class="mt-3 max-w-xs text-sm leading-relaxed text-ink-muted">
            {{ $t('footer.tagline') }}
          </p>
          <span class="mt-4 inline-flex items-center gap-2 rounded-full border border-valid/40 bg-valid/10 px-3 py-1 text-xs font-medium text-valid">
            <span class="size-1.5 rounded-full bg-valid shadow-[0_0_6px_rgba(34,212,154,0.9)]" />
            {{ $t('footer.communityActive') }}
          </span>
          <img
            :src="planet"
            alt=""
            class="mt-5 h-28 w-auto opacity-90"
            loading="lazy"
            decoding="async"
          >
        </div>

        <!-- À propos des données -->
        <div>
          <h2 class="footer-head">
            <DxIcon
              name="status/info"
              :size="16"
              class="text-accent"
            />
            {{ $t('disclaimer.title') }}
          </h2>
          <p class="mt-3 text-sm leading-relaxed text-ink-muted">
            {{ $t('disclaimer.community') }}
          </p>
          <div class="mt-4 rounded-card border border-warn/40 bg-warn/5 p-4">
            <p class="flex items-center gap-2 text-sm font-semibold text-warn">
              <DxIcon
                name="game/shield"
                :size="16"
              />
              {{ $t('footer.warning') }}
            </p>
            <p class="mt-1.5 text-[0.8125rem] leading-relaxed text-ink-muted">
              {{ $t('disclaimer.rights') }}
            </p>
          </div>
        </div>

        <!-- Liens utiles -->
        <div>
          <h2 class="footer-head">
            <DxIcon
              name="ui/link"
              :size="16"
              class="text-accent"
            />
            {{ $t('footer.usefulLinks') }}
          </h2>
          <ul class="mt-3 flex flex-col gap-1">
            <li
              v-for="link in links"
              :key="link.key"
            >
              <NuxtLink
                v-if="'to' in link"
                :to="localePath(link.to)"
                class="footer-link group"
              >
                <DxIcon
                  :name="link.icon"
                  :size="17"
                  class="shrink-0 text-ink-muted transition-colors group-hover:text-accent"
                />
                <span class="flex-1">{{ $t(link.key) }}</span>
                <DxIcon
                  name="actions/arrow-right"
                  :size="15"
                  class="shrink-0 -translate-x-1 text-ink-muted opacity-0 transition-all group-hover:translate-x-0 group-hover:text-accent group-hover:opacity-100"
                />
              </NuxtLink>
              <a
                v-else
                :href="link.href"
                target="_blank"
                rel="noopener noreferrer"
                class="footer-link group"
              >
                <DxIcon
                  :name="link.icon"
                  :size="17"
                  class="shrink-0 text-ink-muted transition-colors group-hover:text-accent"
                />
                <span class="flex-1">{{ $t(link.key) }}</span>
                <DxIcon
                  name="actions/arrow-right"
                  :size="15"
                  class="shrink-0 -translate-x-1 text-ink-muted opacity-0 transition-all group-hover:translate-x-0 group-hover:text-accent group-hover:opacity-100"
                />
              </a>
            </li>
          </ul>
        </div>

        <!-- Infos & crédits -->
        <div>
          <h2 class="footer-head">
            <span class="font-mono text-sm text-accent">&lt;/&gt;</span>
            {{ $t('footer.infoCredits') }}
          </h2>
          <dl class="mt-3 flex flex-col gap-2.5 text-sm">
            <div class="flex items-center justify-between gap-3">
              <dt class="text-ink-muted">
                {{ $t('footer.islandCode') }}
              </dt>
              <dd>
                <button
                  type="button"
                  class="inline-flex items-center gap-1.5 rounded-md border border-edge-soft bg-void/60 px-2 py-0.5 font-mono text-xs text-ink transition-colors hover:border-accent/60"
                  :aria-label="$t('footer.copyCode')"
                  @click="copyCode"
                >
                  {{ ISLAND_CODE }}
                  <DxIcon
                    :name="copied ? 'actions/check' : 'actions/copy'"
                    :size="13"
                    :class="copied ? 'text-valid' : 'text-ink-muted'"
                  />
                </button>
              </dd>
            </div>

            <div
              v-if="islandVersion"
              class="flex items-center justify-between gap-3"
            >
              <dt class="text-ink-muted">
                {{ $t('footer.versionLabel') }}
              </dt>
              <dd class="rounded-md border border-accent/30 bg-accent/10 px-2 py-0.5 font-mono text-xs text-accent">
                v{{ islandVersion }}
              </dd>
            </div>

            <div
              v-if="credits.date"
              class="flex items-center justify-between gap-3"
            >
              <dt class="text-ink-muted">
                {{ $t('footer.lastUpdate') }}
              </dt>
              <dd class="text-right text-ink">
                {{ credits.date }}
              </dd>
            </div>

            <div class="flex items-center justify-between gap-3">
              <dt class="text-ink-muted">
                {{ $t('footer.sources') }}
              </dt>
              <dd class="text-right text-ink">
                {{ $t('footer.sourcesValue') }}
              </dd>
            </div>

            <div
              v-if="credits.guides"
              class="flex items-center justify-between gap-3"
            >
              <dt class="text-ink-muted">
                {{ $t('footer.communityGuides') }}
              </dt>
              <dd class="rounded-md border border-edge-soft bg-void/60 px-2 py-0.5 text-right font-mono text-xs text-ink">
                {{ credits.guides }}
              </dd>
            </div>
          </dl>
        </div>
      </div>

      <!-- Bandeau de garanties. Le fond `bg-edge-soft` avec `gap-px` dessine les filets. -->
      <ul class="mt-8 grid gap-px overflow-hidden rounded-card border border-edge-soft bg-edge-soft sm:grid-cols-2 lg:grid-cols-4">
        <li
          v-for="feat in features"
          :key="feat.key"
          class="flex items-center gap-3 bg-panel-deep p-4"
        >
          <span
            class="grid size-11 shrink-0 place-items-center rounded-full border bg-void/40"
            :class="[feat.ring, feat.tone]"
          >
            <DxIcon
              :name="feat.icon"
              :size="20"
            />
          </span>
          <div class="min-w-0">
            <p
              class="text-sm font-semibold"
              :class="feat.tone"
            >
              {{ $t(`footer.feat.${feat.key}Title`) }}
            </p>
            <p class="text-xs leading-snug text-ink-muted">
              {{ $t(`footer.feat.${feat.key}Desc`) }}
            </p>
          </div>
        </li>
      </ul>

      <!-- Barre basse : réseaux à gauche, copyright à droite. Volontairement basse. -->
      <div class="mt-5 flex flex-col items-center gap-3 border-t border-edge-soft pt-3 sm:flex-row sm:justify-between sm:gap-2">
        <div class="flex items-center gap-1.5">
          <a
            v-for="social in socials"
            :key="social.label"
            :href="social.href"
            target="_blank"
            rel="noopener noreferrer"
            :aria-label="social.label"
            class="grid size-8 place-items-center rounded-md text-ink-muted transition-colors hover:bg-panel-raised"
            :class="social.tint"
          >
            <DxIcon
              :name="social.icon"
              :size="15"
            />
          </a>
        </div>

        <p class="flex flex-wrap items-center justify-center gap-x-2.5 gap-y-1 text-xs text-ink-muted">
          <span>{{ $t('footer.copyright', { year }) }}</span>
          <span aria-hidden="true">·</span>
          <span class="inline-flex items-center gap-1.5 rounded-full border border-edge-soft bg-void/50 px-2.5 py-0.5 text-valid">
            <DxIcon
              name="actions/heart"
              :size="12"
            />
            {{ $t('footer.proudlyCommunity') }}
          </span>
          <span aria-hidden="true">·</span>
          <span>{{ $t('footer.allRights') }}</span>
        </p>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer-head {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.14em;
  color: var(--color-ink);
}

.footer-link {
  display: flex;
  align-items: center;
  gap: 0.625rem;
  border-radius: 0.5rem;
  padding: 0.4rem 0.5rem;
  font-size: 0.875rem;
  color: var(--color-ink-muted);
  transition: background 150ms, color 150ms;
}

.footer-link:hover {
  background: var(--color-panel-raised);
  color: var(--color-ink);
}
</style>
