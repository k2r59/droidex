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
  <section class="rounded-xl border border-edge bg-panel p-4">
    <h2 class="mb-3 flex flex-wrap items-baseline gap-2 font-semibold">
      {{ $t('timers.title') }}
      <span class="text-xs font-normal text-ink-muted">{{ $t('timers.hint') }}</span>
    </h2>

    <ul class="flex flex-col gap-2">
      <li
        class="flex items-center gap-3 rounded-lg bg-panel-raised p-3 transition-colors"
        :class="isImminent(beskarRemaining) && 'ring-1 ring-amber-500'"
      >
        <span class="size-3 shrink-0 rounded-full tier-beskar-bg" />

        <div class="min-w-0 flex-1">
          <p class="text-sm font-medium">{{ $t('timers.beskarLabel') }}</p>
          <p class="text-xs text-ink-muted">
            {{ $t('timers.every', { minutes: sandcrawler.beskarIntervalMinutes }) }}
          </p>
        </div>

        <p
          class="font-mono text-xl tabular-nums"
          :class="isImminent(beskarRemaining) ? 'text-amber-400' : 'text-ink'"
        >
          {{ beskarRemaining !== null ? format(beskarRemaining) : '—:—' }}
        </p>

        <div class="flex flex-col gap-1">
          <button
            type="button"
            class="rounded bg-panel px-2 py-1 text-xs transition-colors hover:bg-edge"
            @click="lastBeskar = Date.now()"
          >
            {{ $t('timers.sawIt') }}
          </button>
          <button
            v-if="lastBeskar"
            type="button"
            class="rounded px-2 py-0.5 text-xs text-ink-muted transition-colors hover:text-ink"
            @click="lastBeskar = null"
          >
            {{ $t('timers.reset') }}
          </button>
        </div>
      </li>

      <!-- Mythic : calé sur l'horloge, donc toujours affiché, sans bouton. -->
      <li
        class="flex items-center gap-3 rounded-lg bg-panel-raised p-3 transition-colors"
        :class="isImminent(mythicRemaining) && 'ring-1 ring-amber-500'"
      >
        <span class="size-3 shrink-0 rounded-full bg-mythic" />

        <div class="min-w-0 flex-1">
          <p class="text-sm font-medium">{{ $t('timers.mythicLabel') }}</p>
          <p class="text-xs text-ink-muted">{{ $t('timers.mythicAuto') }}</p>
        </div>

        <p
          class="font-mono text-xl tabular-nums"
          :class="isImminent(mythicRemaining) ? 'text-amber-400' : 'text-ink'"
        >
          {{ format(mythicRemaining) }}
        </p>
      </li>
    </ul>

    <p class="mt-2 text-xs text-ink-muted">{{ $t('timers.beskarPerPlayer') }}</p>
    <p class="mt-1 text-xs text-ink-muted">{{ $t('timers.rainbowRemoved') }}</p>
  </section>
</template>
