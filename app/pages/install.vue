<script setup lang="ts">
/**
 * Page « Installer l'application ».
 *
 * Deux plateformes, deux chemins. Android/Chrome sait installer une PWA d'un clic quand le
 * navigateur l'a proposé — on offre alors le bouton natif. iOS/Safari n'expose aucune API :
 * le seul recours est d'expliquer le geste (Partager → Sur l'écran d'accueil), d'où la
 * section détaillée, atteignable directement via l'ancre `#ios` depuis le pied de page.
 */
const { t } = useI18n()
const { canInstall, promptInstall } = useInstallPrompt()

useSeoMeta({
  title: () => t('installPage.title'),
  description: () => t('installPage.intro'),
})

const benefits = [
  { icon: 'resources/energy', key: 'instant' },
  { icon: 'ui/link', key: 'offline' },
  { icon: 'game/shield', key: 'fullscreen' },
] as const

const iosSteps = ['iosS1', 'iosS2', 'iosS3'] as const
const androidSteps = ['androidS1', 'androidS2'] as const

/**
 * Installation Android. Le bouton reste toujours affiché — l'utilisateur veut un point
 * d'entrée visible. Mais le navigateur n'autorise l'installation programmatique que si
 * `beforeinstallprompt` a été capté (critères d'installabilité réunis : HTTPS, manifeste,
 * service worker) ; sinon `promptInstall` renvoie `'unavailable'` et on invite à passer par
 * le menu du navigateur, détaillé juste en dessous.
 */
const installing = ref(false)
const promptUnavailable = ref(false)
async function install() {
  installing.value = true
  const issue = await promptInstall()
  installing.value = false
  promptUnavailable.value = issue === 'unavailable'
}
</script>

<template>
  <div class="mx-auto flex max-w-3xl flex-col gap-6">
    <header>
      <h1 class="text-2xl font-bold uppercase tracking-tight sm:text-3xl">
        {{ $t('installPage.title') }}
      </h1>
      <p class="mt-2 text-sm leading-relaxed text-ink-muted">
        {{ $t('installPage.intro') }}
      </p>
    </header>

    <!-- Avantages : trois repères courts, empilés sur mobile, en ligne dès `sm`. -->
    <ul class="grid gap-px overflow-hidden rounded-card border border-edge-soft bg-edge-soft sm:grid-cols-3">
      <li
        v-for="b in benefits"
        :key="b.key"
        class="flex items-center gap-3 bg-panel-deep p-4"
      >
        <span class="grid size-10 shrink-0 place-items-center rounded-full border border-accent/40 bg-void/40 text-accent">
          <DxIcon
            :name="b.icon"
            :size="18"
          />
        </span>
        <div class="min-w-0">
          <p class="text-sm font-semibold">
            {{ $t(`installPage.${b.key}Title`) }}
          </p>
          <p class="text-xs leading-snug text-ink-muted">
            {{ $t(`installPage.${b.key}Desc`) }}
          </p>
        </div>
      </li>
    </ul>

    <!-- iOS / iPad — atteignable via l'ancre #ios. `scroll-mt` dégage l'en-tête collant. -->
    <section
      id="ios"
      class="panel scroll-mt-24 p-4 sm:p-6"
    >
      <h2 class="flex items-center gap-2.5 text-lg font-semibold">
        <DxIcon
          name="brands/apple"
          :size="22"
        />
        {{ $t('installPage.iosTitle') }}
      </h2>
      <p class="mt-1 text-sm text-ink-muted">
        {{ $t('installPage.iosLead') }}
      </p>
      <ol class="mt-4 flex flex-col gap-3">
        <li
          v-for="(step, i) in iosSteps"
          :key="step"
          class="flex items-start gap-3"
        >
          <span class="grid size-7 shrink-0 place-items-center rounded-full border border-accent/40 bg-accent/10 font-mono text-sm font-bold text-accent">
            {{ i + 1 }}
          </span>
          <p class="pt-0.5 text-sm leading-relaxed">
            {{ $t(`installPage.${step}`) }}
          </p>
        </li>
      </ol>
      <p class="mt-4 rounded-card border border-edge-soft bg-void/40 p-3 text-xs leading-relaxed text-ink-muted">
        {{ $t('installPage.iosNote') }}
      </p>
    </section>

    <!-- Android / Chrome — atteignable via l'ancre #android. -->
    <section
      id="android"
      class="panel scroll-mt-24 p-4 sm:p-6"
    >
      <h2 class="flex items-center gap-2.5 text-lg font-semibold">
        <DxIcon
          name="brands/google-play"
          :size="22"
          class="text-accent"
        />
        {{ $t('installPage.androidTitle') }}
      </h2>
      <p class="mt-1 text-sm text-ink-muted">
        {{ $t('installPage.androidLead') }}
      </p>

      <!--
        Bouton d'installation automatique, toujours présent. `canInstall` ne le masque plus :
        il ne fait que colorer le message. S'il n'y a pas d'invite captée, le clic le dit et
        renvoie vers les étapes manuelles ci-dessous.
      -->
      <button
        type="button"
        class="dx-button dx-button--primary mt-4 w-full sm:w-auto"
        :disabled="installing"
        @click="install"
      >
        <DxIcon
          name="brands/google-play"
          :size="17"
        />
        {{ $t('install.action') }}
      </button>
      <p
        v-if="canInstall"
        class="mt-2 text-xs text-valid"
      >
        {{ $t('installPage.androidReady') }}
      </p>
      <p
        v-else-if="promptUnavailable"
        class="mt-2 text-xs text-warn"
      >
        {{ $t('installPage.androidUnavailable') }}
      </p>

      <!-- Repli manuel : le menu du navigateur, toujours affiché. -->
      <p class="mt-4 text-xs font-semibold uppercase tracking-wide text-ink-muted">
        {{ $t('installPage.androidManual') }}
      </p>
      <ol class="mt-2 flex flex-col gap-3">
        <li
          v-for="(step, i) in androidSteps"
          :key="step"
          class="flex items-start gap-3"
        >
          <span class="grid size-7 shrink-0 place-items-center rounded-full border border-accent/40 bg-accent/10 font-mono text-sm font-bold text-accent">
            {{ i + 1 }}
          </span>
          <p class="pt-0.5 text-sm leading-relaxed">
            {{ $t(`installPage.${step}`) }}
          </p>
        </li>
      </ol>
    </section>
  </div>
</template>
