<script setup lang="ts">
/**
 * Page Mentions légales.
 *
 * Réunit ce qui protège le diffuseur : nature non commerciale du projet, absence
 * d'affiliation, propriété intellectuelle des tiers, réserve sur la fiabilité des données,
 * confidentialité (tout est local), et surtout la **liste des sources** communautaires
 * avec leurs liens — pour créditer les auteurs et rendre la provenance vérifiable.
 *
 * Le contenu réutilise les chaînes `legal.*` et `disclaimer.*` déjà traduites (elles
 * servent aussi à la fenêtre d'accueil), et n'ajoute que les libellés propres à la page.
 */
const { t } = useI18n()

useSeoMeta({
  title: () => t('legalPage.title'),
  description: () => t('legalPage.intro'),
})

const EMAIL = 'droidtycoon@proton.me'

/**
 * Sources utilisées, par ordre de contribution. Les noms sont ceux de leurs auteurs ou
 * domaines (non traduits) ; seul le rôle est localisé. Chaque entrée pointe vers la source
 * pour que quiconque puisse la consulter.
 */
const sources = [
  { name: 'erikpeik/droidex', url: 'https://github.com/erikpeik/droidex', role: 'roleImages' },
  { name: 'srbcontrol.com', url: 'https://srbcontrol.com', role: 'roleRebirth' },
  { name: 'tycoon-tools.com', url: 'https://tycoon-tools.com/droid-tycoon/', role: 'roleTracker' },
  { name: 'droidtycoonguide.com', url: 'https://droidtycoonguide.com', role: 'roleGuides' },
  { name: 'neonlightsmedia.com', url: 'https://neonlightsmedia.com', role: 'roleNova' },
  { name: 'r/StarWarsDroidTycoon', url: 'https://www.reddit.com/r/StarWarsDroidTycoon/', role: 'roleCommunity' },
  { name: 'FOAD — @FoadZone', url: 'https://x.com/FoadZone', role: 'roleOfficial' },
  { name: 'Blzn Studios — @BlznDev', url: 'https://x.com/BlznDev', role: 'roleOfficial' },
] as const

/** Sections dont le corps réutilise une chaîne déjà traduite ailleurs. */
const sections = [
  { title: 'legalPage.natureTitle', bodies: ['legal.noRights', 'legal.nonProfit'] },
  { title: 'legalPage.ipTitle', bodies: ['legal.trademarks', 'legal.images'] },
  { title: 'legalPage.dataTitle', bodies: ['disclaimer.community', 'legal.data'] },
] as const
</script>

<template>
  <div class="mx-auto flex max-w-3xl flex-col gap-6">
    <header>
      <h1 class="text-2xl font-bold uppercase tracking-tight sm:text-3xl">
        {{ $t('legalPage.title') }}
      </h1>
      <p class="mt-2 text-sm text-ink-muted">
        {{ $t('legalPage.intro') }}
      </p>
    </header>

    <!-- Éditeur / responsable. -->
    <section class="panel p-6">
      <h2 class="text-sm font-semibold uppercase tracking-[0.14em] text-ink">
        {{ $t('legalPage.editorTitle') }}
      </h2>
      <i18n-t
        keypath="legalPage.editorBody"
        tag="p"
        class="mt-2 text-sm leading-relaxed text-ink-muted"
      >
        <template #email>
          <a
            :href="`mailto:${EMAIL}`"
            class="text-accent underline decoration-dotted underline-offset-2 hover:text-ink"
          >{{ EMAIL }}</a>
        </template>
      </i18n-t>
    </section>

    <!-- Sections réutilisant les chaînes légales existantes. -->
    <section
      v-for="s in sections"
      :key="s.title"
      class="panel p-6"
    >
      <h2 class="text-sm font-semibold uppercase tracking-[0.14em] text-ink">
        {{ $t(s.title) }}
      </h2>
      <p
        v-for="body in s.bodies"
        :key="body"
        class="mt-2 text-sm leading-relaxed text-ink-muted"
      >
        {{ $t(body) }}
      </p>
    </section>

    <!-- Sources — le cœur de la page. -->
    <section class="panel p-6">
      <h2 class="text-sm font-semibold uppercase tracking-[0.14em] text-ink">
        {{ $t('legalPage.sourcesTitle') }}
      </h2>
      <p class="mt-2 text-sm leading-relaxed text-ink-muted">
        {{ $t('legalPage.sourcesIntro') }}
      </p>
      <ul class="mt-4 flex flex-col divide-y divide-edge-soft">
        <li
          v-for="src in sources"
          :key="src.name"
          class="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-0.5 py-2.5"
        >
          <a
            :href="src.url"
            target="_blank"
            rel="noopener noreferrer nofollow"
            class="inline-flex items-center gap-1.5 font-medium text-accent transition-colors hover:text-ink"
          >
            {{ src.name }}
            <DxIcon
              name="actions/external-link"
              :size="12"
            />
          </a>
          <span class="text-sm text-ink-muted">{{ $t(`legalPage.${src.role}`) }}</span>
        </li>
      </ul>
    </section>

    <!-- Confidentialité. -->
    <section class="panel p-6">
      <h2 class="text-sm font-semibold uppercase tracking-[0.14em] text-ink">
        {{ $t('legalPage.privacyTitle') }}
      </h2>
      <p class="mt-2 text-sm leading-relaxed text-ink-muted">
        {{ $t('legalPage.privacyBody') }}
      </p>
    </section>

    <!-- Contact et retrait. -->
    <section class="panel border-warn/40 p-6">
      <h2 class="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.14em] text-warn">
        <DxIcon
          name="game/shield"
          :size="16"
        />
        {{ $t('legalPage.contactTitle') }}
      </h2>
      <i18n-t
        keypath="legal.takedown"
        tag="p"
        class="mt-2 text-sm leading-relaxed text-ink-muted"
      >
        <template #email>
          <a
            :href="`mailto:${EMAIL}`"
            class="text-accent underline decoration-dotted underline-offset-2 hover:text-ink"
          >{{ EMAIL }}</a>
        </template>
      </i18n-t>
    </section>
  </div>
</template>
