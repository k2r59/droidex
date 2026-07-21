<script setup lang="ts">
import mechanics from '~/data/mechanics.json'

/**
 * Minuteurs des apparitions garanties au Sandcrawler.
 *
 * Le joueur appuie sur « maintenant » quand il voit une apparition ; le compte à rebours
 * suivant s'en déduit. On stocke l'horodatage de la dernière apparition plutôt qu'un
 * compteur décrémenté : le minuteur reste juste après un rechargement, une mise en
 * veille ou un passage en arrière-plan, là où un `setInterval` aurait dérivé.
 */
type TimerId = 'rainbow' | 'beskar'

const TIMERS: { id: TimerId; minutes: number; tier: 'RAINBOW' | 'BESKAR'; class: string }[] = [
  { id: 'rainbow', minutes: mechanics.sandcrawler.rainbowIntervalMinutes, tier: 'RAINBOW', class: 'tier-rainbow-bg' },
  { id: 'beskar', minutes: mechanics.sandcrawler.beskarIntervalMinutes, tier: 'BESKAR', class: 'tier-beskar-bg' },
]

const lastSeen = useLocalStorage<Record<TimerId, number | null>>('droidex:sandcrawler', {
  rainbow: null,
  beskar: null,
})

const now = ref(Date.now())
let handle: ReturnType<typeof setInterval> | undefined

onMounted(() => { handle = setInterval(() => { now.value = Date.now() }, 1000) })
onUnmounted(() => { if (handle) clearInterval(handle) })

/** Secondes restantes, ou `null` si le minuteur n'a jamais été lancé. */
function remaining(timer: (typeof TIMERS)[number]): number | null {
  const start = lastSeen.value[timer.id]
  if (!start) return null
  const period = timer.minutes * 60_000
  // Modulo : si le joueur a raté un cycle, on affiche le temps jusqu'au prochain,
  // pas un compte à rebours négatif.
  const elapsed = (now.value - start) % period
  return Math.ceil((period - elapsed) / 1000)
}

function format(seconds: number) {
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  return `${m}:${String(s).padStart(2, '0')}`
}

/** Les 20 dernières secondes passent en alerte : c'est le moment de se rapprocher. */
const isImminent = (s: number | null) => s !== null && s <= 20

function markNow(id: TimerId) {
  lastSeen.value = { ...lastSeen.value, [id]: Date.now() }
}

function clear(id: TimerId) {
  lastSeen.value = { ...lastSeen.value, [id]: null }
}
</script>

<template>
  <section class="rounded-xl border border-edge bg-panel p-4">
    <h2 class="mb-3 flex items-center gap-2 font-semibold">
      {{ $t('timers.title') }}
      <span class="text-xs font-normal text-ink-muted">{{ $t('timers.hint') }}</span>
    </h2>

    <ul class="grid gap-2 sm:grid-cols-2">
      <li
        v-for="timer in TIMERS"
        :key="timer.id"
        class="flex items-center gap-3 rounded-lg bg-panel-raised p-3 transition-colors"
        :class="isImminent(remaining(timer)) && 'ring-1 ring-amber-500'"
      >
        <span class="size-3 shrink-0 rounded-full" :class="timer.class" />

        <div class="min-w-0 flex-1">
          <p class="text-sm font-medium">{{ $t(`tier.${timer.tier}`) }}</p>
          <p class="text-xs text-ink-muted">
            {{ $t('timers.every', { minutes: timer.minutes }) }}
          </p>
        </div>

        <p
          class="font-mono text-xl tabular-nums"
          :class="isImminent(remaining(timer)) ? 'text-amber-400' : 'text-ink'"
        >
          {{ remaining(timer) !== null ? format(remaining(timer)!) : '—:—' }}
        </p>

        <div class="flex flex-col gap-1">
          <button
            type="button"
            class="rounded bg-panel px-2 py-1 text-xs transition-colors hover:bg-edge"
            @click="markNow(timer.id)"
          >
            {{ $t('timers.sawIt') }}
          </button>
          <button
            v-if="lastSeen[timer.id]"
            type="button"
            class="rounded px-2 py-0.5 text-xs text-ink-muted transition-colors hover:text-ink"
            @click="clear(timer.id)"
          >
            {{ $t('timers.reset') }}
          </button>
        </div>
      </li>
    </ul>

    <p class="mt-2 text-xs text-ink-muted">{{ $t('timers.beskarPerPlayer') }}</p>
  </section>
</template>
