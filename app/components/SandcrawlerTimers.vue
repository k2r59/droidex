<script setup lang="ts">
import mechanics from '~/data/mechanics.json'

/**
 * Minuteurs des apparitions garanties au Sandcrawler, à jour en v1.22.
 *
 * Deux mécaniques différentes, donc deux traitements :
 *
 * - **Beskar** : intervalle de 15 minutes calé sur la dernière apparition observée. Le
 *   joueur appuie sur « maintenant » quand il en voit une. On stocke l'horodatage plutôt
 *   qu'un compteur décrémenté : le minuteur reste juste après un rechargement, une mise
 *   en veille ou un passage en arrière-plan, là où un `setInterval` aurait dérivé.
 *
 * - **Mythic** : garanti chaque heure à XX:55. C'est une heure d'horloge, pas un
 *   intervalle — donc calculé directement, sans que le joueur ait rien à saisir.
 *
 * Le timer Rainbow de 5 minutes existait avant la v1.22 ; il a été supprimé du jeu.
 */
const sandcrawler = mechanics.sandcrawler

const lastBeskar = useHydratedStorage<number | null>('droidex:sandcrawler-beskar', null)

const now = ref(Date.now())
let handle: ReturnType<typeof setInterval> | undefined

onMounted(() => { handle = setInterval(() => { now.value = Date.now() }, 1000) })
onUnmounted(() => { if (handle) clearInterval(handle) })

/** Secondes avant le prochain Beskar, ou `null` si le minuteur n'a jamais été lancé. */
const beskarRemaining = computed<number | null>(() => {
  if (!lastBeskar.value) return null
  const period = sandcrawler.beskarIntervalMinutes * 60_000
  // Modulo : si le joueur a raté un cycle, on affiche le temps jusqu'au prochain,
  // pas un compte à rebours négatif.
  const elapsed = (now.value - lastBeskar.value) % period
  return Math.ceil((period - elapsed) / 1000)
})

/** Secondes avant le prochain XX:55. Aucune saisie nécessaire, c'est une heure d'horloge. */
const mythicRemaining = computed<number>(() => {
  const date = new Date(now.value)
  const target = new Date(date)
  target.setMinutes(sandcrawler.mythicHourlyMinute, 0, 0)
  if (target <= date) target.setHours(target.getHours() + 1)
  return Math.ceil((target.getTime() - date.getTime()) / 1000)
})

function format(seconds: number) {
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  return `${m}:${String(s).padStart(2, '0')}`
}

/** Les 30 dernières secondes passent en alerte : c'est le moment de se rapprocher. */
const isImminent = (s: number | null) => s !== null && s <= 30
</script>

<template>
  <section class="rounded-card border border-edge-soft bg-panel p-5">
    <h2 class="mb-4 flex flex-wrap items-center gap-2.5">
      <DxIcon
        name="resources/timer"
        :size="20"
        class="shrink-0 text-ink-strong"
      />
      <span class="font-display text-base font-bold uppercase tracking-[0.05em] text-ink-strong">
        {{ $t('timers.title') }}
      </span>
      <span class="text-[0.8125rem] font-normal text-ink-muted">{{ $t('timers.hint') }}</span>
    </h2>

    <ul class="flex flex-col gap-3">
      <li
        class="flex items-center gap-3 rounded-lg border border-edge-soft bg-void/40 px-4 py-3 transition-colors"
        :class="isImminent(beskarRemaining) && 'border-warn/60'"
      >
        <span class="size-3.5 shrink-0 rounded-full tier-beskar-bg" />

        <div class="min-w-0 flex-1">
          <p class="font-semibold text-ink-strong">
            {{ $t('timers.beskarLabel') }}
          </p>
          <p class="text-[0.8125rem] text-ink-muted">
            {{ $t('timers.every', { minutes: sandcrawler.beskarIntervalMinutes }) }}
          </p>
        </div>

        <!-- Tant que le joueur n'a rien signalé, il n'y a pas de compte à rebours à montrer. -->
        <p
          v-if="beskarRemaining !== null"
          class="font-mono text-xl font-bold tabular-nums sm:text-2xl"
          :class="isImminent(beskarRemaining) ? 'text-warn' : 'text-ink-strong'"
        >
          {{ format(beskarRemaining) }}
        </p>

        <!-- Bouton icône seule sur mobile (le libellé écrasait le titre), texte dès `sm`. -->
        <button
          type="button"
          class="flex shrink-0 items-center gap-2.5 rounded-lg border border-edge-strong bg-panel-raised px-2.5 py-2.5 text-[0.8125rem] font-medium transition-colors hover:border-accent/50 sm:px-4"
          :aria-label="$t('timers.sawIt')"
          @click="lastBeskar = Date.now()"
        >
          <DxIcon
            name="game/radar"
            :size="18"
            class="text-ink-strong"
          />
          <span class="hidden sm:inline">{{ $t('timers.sawIt') }}</span>
        </button>
        <button
          v-if="lastBeskar"
          type="button"
          class="shrink-0 rounded px-2 py-0.5 text-xs text-ink-muted transition-colors hover:text-ink"
          @click="lastBeskar = null"
        >
          {{ $t('timers.reset') }}
        </button>
      </li>

      <!--
        Mythic : calé sur l'horloge, donc toujours affiché, sans bouton. La teinte rouge
        est permanente et non réservée à l'imminence — c'est le repère visuel du palier.
      -->
      <li class="flex items-center gap-3 rounded-lg border border-mythic/45 bg-mythic/10 px-4 py-3">
        <span class="size-3.5 shrink-0 rounded-full bg-mythic" />

        <div class="min-w-0 flex-1">
          <p class="font-semibold text-mythic">
            {{ $t('timers.mythicLabel') }}
          </p>
          <p class="text-[0.8125rem] text-ink-muted">
            {{ $t('timers.mythicAuto') }}
          </p>
        </div>

        <p class="font-mono text-xl font-bold tabular-nums text-mythic sm:text-2xl">
          {{ format(mythicRemaining) }}
        </p>
      </li>
    </ul>

    <div class="mt-3 flex items-start gap-3 rounded-lg border border-edge-soft bg-void/40 px-4 py-3">
      <DxIcon
        name="status/info"
        :size="18"
        class="mt-px shrink-0 text-rare"
      />
      <div class="text-[0.8125rem] leading-relaxed text-ink-muted">
        <p>{{ $t('timers.beskarPerPlayer') }}</p>
        <p>{{ $t('timers.rainbowRemoved') }}</p>
      </div>
    </div>
  </section>
</template>
