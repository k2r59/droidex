<script setup lang="ts">
/**
 * Avertissement légal affiché à la première ouverture du site.
 *
 * Ce projet republie des noms, des chiffres et surtout 317 illustrations tirées d'une île
 * Fortnite : des marques et des œuvres appartenant à Epic Games, à Lucasfilm et aux
 * créateurs de l'île. Nous n'avons aucun droit dessus et aucune légitimité à parler au nom
 * de qui que ce soit. Le dire au pied de page, en petit, revenait à le dire à personne —
 * d'où une fenêtre qu'il faut lire et fermer explicitement.
 *
 * L'absence totale de contrepartie financière y figure au même rang que l'absence de droits :
 * c'est ce qui distingue une entraide entre joueurs d'une exploitation commerciale, et c'est
 * précisément la distinction qu'un ayant droit regardera en premier.
 *
 * Ce n'est pas un bandeau cookies : rien n'est déposé, rien n'est demandé, et le seul
 * enregistrement est le fait que l'avertissement a été vu.
 */

/**
 * La version est incluse dans la clé : si le texte change sur un point de fond, l'ancien
 * accord ne vaut plus et la fenêtre reparaît. Un simple booléen aurait figé le premier
 * consentement pour toujours.
 */
const CLE = 'droidex:legal-seen:v1'

/** Contact du responsable — créateur et diffuseur à titre de loisir, non commercial. */
const EMAIL = 'droidtycoon@proton.me'

/**
 * Les ayants droit, nommés et liés vers leur propre site.
 *
 * Renvoyer vers eux plutôt que se contenter de les citer permet à un lecteur de vérifier
 * lui-même qui détient quoi, et de s'adresser directement à la source si le contenu
 * d'ici lui pose problème. Le code de l'île pointe vers sa fiche officielle Fortnite,
 * pas vers une page tierce.
 */
const ISLAND_CODE = '7865-8305-9184'

const AYANTS_DROIT = [
  { nom: 'Epic Games', url: 'https://www.epicgames.com' },
  { nom: 'Fortnite', url: 'https://www.fortnite.com' },
  { nom: 'Lucasfilm', url: 'https://www.lucasfilm.com' },
  { nom: 'Star Wars', url: 'https://www.starwars.com' },
  { nom: 'The Walt Disney Company', url: 'https://www.thewaltdisneycompany.com' },
  { nom: 'FOAD', url: 'https://x.com/FoadZone' },
  { nom: 'Blzn Studios', url: 'https://x.com/BlznDev' },
  /*
   * Forme par code plutôt que `fortnite.com/@pseudo/code` : le pseudo créateur exact
   * n'est pas vérifié de notre côté, et fabriquer une URL plausible mais fausse vaut
   * moins que celle qui résout à coup sûr.
   */
  { nom: `Île ${ISLAND_CODE}`, url: `https://www.fortnite.com/island?code=${ISLAND_CODE}` },
]

const ouvert = ref(false)

/**
 * On n'ouvre qu'au montage, jamais au rendu serveur : lire le stockage pendant le SSR est
 * impossible, et rendre la fenêtre côté serveur la ferait clignoter chez qui l'a déjà lue.
 */
onMounted(() => {
  try {
    ouvert.value = localStorage.getItem(CLE) === null
  }
  catch {
    // Navigation privée ou stockage refusé : on affiche. Mieux vaut revoir l'avertissement
    // à chaque visite que ne jamais l'afficher parce qu'on n'a pas pu vérifier.
    ouvert.value = true
  }
})

function accepter() {
  try {
    localStorage.setItem(CLE, new Date().toISOString())
  }
  catch {
    // Sans stockage, la fenêtre reviendra à la prochaine visite — comportement acceptable.
  }
  ouvert.value = false
}

/** Confine le focus tant que la fenêtre est ouverte, comme les autres modales du projet. */
const dialogRef = useTemplateRef<HTMLElement>('dialogRef')
useFocusTrap(dialogRef, ouvert)

/**
 * Pas de fermeture par Échap ni par clic sur le fond, contrairement aux autres fenêtres :
 * l'avertissement doit être écarté sciemment, pas balayé d'une touche réflexe.
 */

/** Empêche le défilement de la page derrière la fenêtre. */
watch(ouvert, (v) => {
  if (import.meta.client) document.body.style.overflow = v ? 'hidden' : ''
})
onUnmounted(() => {
  if (import.meta.client) document.body.style.overflow = ''
})
</script>

<template>
  <Teleport to="body">
    <div
      v-if="ouvert"
      class="fixed inset-0 z-[100] grid place-items-center overflow-y-auto bg-void/90 p-4 backdrop-blur-sm"
    >
      <section
        ref="dialogRef"
        role="dialog"
        aria-modal="true"
        aria-labelledby="legal-title"
        tabindex="-1"
        class="panel dx-modal-in my-auto w-full max-w-2xl p-6 sm:p-8"
      >
        <div class="mb-5 flex items-start gap-3">
          <DxIcon
            name="status/warning"
            :size="26"
            class="mt-0.5 shrink-0 text-warn"
          />
          <div>
            <h2
              id="legal-title"
              class="text-xl uppercase tracking-wide sm:text-2xl"
            >
              {{ $t('legal.title') }}
            </h2>
            <p class="mt-1 text-sm text-ink-muted">
              {{ $t('legal.subtitle') }}
            </p>
          </div>
        </div>

        <div class="space-y-4 text-sm leading-relaxed">
          <p class="rounded-card border border-warn/40 bg-warn/10 p-4 font-medium">
            {{ $t('legal.noRights') }}
          </p>

          <p class="rounded-card border border-valid/40 bg-valid/10 p-4 font-medium">
            {{ $t('legal.nonProfit') }}
          </p>

          <p>{{ $t('legal.trademarks') }}</p>
          <p>{{ $t('legal.images') }}</p>
          <p>{{ $t('legal.data') }}</p>

          <div>
            <p class="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-ink-muted">
              {{ $t('legal.holders') }}
            </p>
            <ul class="flex flex-wrap gap-2">
              <li
                v-for="a in AYANTS_DROIT"
                :key="a.url"
              >
                <!--
                  `noopener` est indispensable avec `_blank` : sans lui, la page ouverte
                  garde une référence sur `window.opener` et peut rediriger celle-ci.
                  `nofollow` parce que ces liens sont cités, pas recommandés.
                -->
                <a
                  :href="a.url"
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  class="dx-badge transition-colors hover:border-accent/60 hover:text-accent"
                >{{ a.nom }}</a>
              </li>
            </ul>
          </div>

          <i18n-t
            keypath="legal.takedown"
            tag="p"
            class="text-ink-muted"
          >
            <template #email>
              <a
                :href="`mailto:${EMAIL}`"
                class="text-accent underline decoration-dotted underline-offset-2 hover:text-ink"
              >{{ EMAIL }}</a>
            </template>
          </i18n-t>
        </div>

        <button
          type="button"
          class="dx-button dx-button--primary dx-button--block mt-6"
          @click="accepter"
        >
          {{ $t('legal.accept') }}
        </button>
      </section>
    </div>
  </Teleport>
</template>
