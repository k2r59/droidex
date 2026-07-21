<script setup lang="ts">
import background from '~/assets/images/backgrounds/sidebar-right.webp'

/**
 * Colonne de droite de la page Renaissances.
 *
 * Le Super Rebirth mérite son propre rail : c'est une décision irréversible qui efface
 * la base, et les trois blocs « perdu / conservé / accordé » sont exactement ce que le
 * joueur relit avant de s'engager.
 */
const props = defineProps<{
  unlocked: boolean
  /** Cristaux gagnés si le Super Rebirth est fait au palier actuel, ou `null` si non tabulé. */
  crystalsNow: number | null
  novaByRebirth: Record<string, number>
  unlockRebirth: number
}>()

const store = useCollectionStore()

/** Le cycle d'exigences avance de 1 à 4 puis reboucle après chaque Super Rebirth. */
function doSuperRebirth() {
  store.setSuperRebirth(store.superRebirth + 1, (store.cycle % 4) + 1)
}

const table = computed(() =>
  Object.entries(props.novaByRebirth)
    .map(([level, crystals]) => ({ level: Number(level), crystals }))
    .sort((a, b) => a.level - b.level),
)

/** Dans l'ordre où le joueur se pose les questions : que perds-je, que garde-je, que gagne-je. */
const blocs = [
  { key: 'loses', icon: 'status/error', tone: 'text-danger', title: 'rebirth.loses', body: 'superRebirth.loses' },
  { key: 'keeps', icon: 'status/success', tone: 'text-valid', title: 'rebirth.keeps', body: 'superRebirth.keeps' },
  { key: 'reward', icon: 'resources/nova-crystal', tone: 'text-glow', title: 'superRebirth.rewardTitle', body: 'rebirth.grantsList' },
] as const
</script>

<template>
  <aside class="flex flex-col gap-4">
    <section
      class="panel overflow-hidden bg-cover bg-center p-5"
      :style="{ backgroundImage: `linear-gradient(rgb(7 16 31 / 0.86), rgb(7 16 31 / 0.94)), url(${background})` }"
    >
      <h2 class="text-xl">{{ $t('superRebirth.title') }}</h2>
      <p class="mt-1 text-sm text-ink-muted">
        {{ $t('superRebirth.unlock', { rebirth: unlockRebirth }) }}
      </p>

      <!--
        Illustration de substitution : l'icône Nova agrandie sur un halo. Elle tient lieu
        de visuel tant que `droid-sidebar-droite.png` n'est pas déposé.
      -->
      <div class="relative my-5 grid place-items-center py-4">
        <span class="absolute size-40 rounded-full bg-accent/20 blur-3xl" />
        <DxIcon name="resources/nova-crystal" size="9rem" class="relative text-accent" />
      </div>

      <p class="flex items-center gap-2 text-sm">
        <span class="font-mono text-lg text-ink-strong">{{ store.superRebirth }}</span>
        <span class="text-ink-muted">{{ $t('superRebirth.done') }}</span>
      </p>

      <button
        type="button"
        class="dx-button dx-button--primary dx-button--block mt-3"
        :disabled="!unlocked"
        @click="doSuperRebirth"
      >
        {{ $t('superRebirth.doIt') }}
      </button>

      <p v-if="crystalsNow !== null" class="mt-2 text-center font-mono text-sm text-accent">
        ✦ {{ $t('superRebirth.crystals', crystalsNow, { named: { count: crystalsNow } }) }}
      </p>
    </section>

    <section class="panel divide-y divide-edge">
      <div v-for="bloc in blocs" :key="bloc.key" class="flex gap-3 p-4">
        <DxIcon :name="bloc.icon" :size="22" class="mt-0.5 shrink-0" :class="bloc.tone" />
        <div class="min-w-0">
          <p class="font-semibold" :class="bloc.tone">{{ $t(bloc.title) }}</p>
          <p class="mt-0.5 text-sm text-ink-muted">{{ $t(bloc.body) }}</p>
        </div>
      </div>
    </section>

    <details class="panel group p-4">
      <summary class="flex cursor-pointer list-none items-center gap-2 text-sm text-ink-muted hover:text-ink">
        <DxIcon name="resources/nova-crystal" :size="18" class="text-accent" />
        <span class="flex-1">{{ $t('superRebirth.crystalsByTier') }}</span>
        <DxIcon name="actions/chevron-down" :size="16" class="transition-transform group-open:rotate-180" />
      </summary>

      <ul class="mt-3 grid grid-cols-3 gap-1.5">
        <li
          v-for="row in table"
          :key="row.level"
          class="rounded-sm bg-panel-raised px-2 py-1 text-center text-xs"
          :class="row.level === store.rebirth && 'ring-1 ring-accent'"
        >
          <span class="block text-ink-muted">{{ row.level }}</span>
          <span class="font-mono text-accent">✦{{ row.crystals }}</span>
        </li>
      </ul>
    </details>
  </aside>
</template>
