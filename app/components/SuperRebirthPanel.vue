<script setup lang="ts">
import crystal from '~/assets/images/nova-crystal-hero.webp'

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
/*
 * Les icônes désignent le sujet — la base perdue, ce qui est mis de côté, la récompense —
 * plutôt qu'un ✗/✓ abstrait, comme sur la maquette. Celle-ci utilise en revanche des
 * illustrations en couleur qui n'existent pas dans le dépôt : les 115 icônes du pack sont
 * monochromes (`stroke="currentColor"`). On s'en approche avec un médaillon teinté.
 */
const blocs = [
  { key: 'loses', icon: 'game/factory', tone: 'text-danger', ring: 'border-danger/50 bg-danger/12 shadow-[inset_0_0_12px_rgba(255,93,108,0.18)]', title: 'rebirth.loses', body: 'superRebirth.loses' },
  { key: 'keeps', icon: 'game/crate', tone: 'text-valid', ring: 'border-valid/60 bg-valid/12 shadow-[inset_0_0_12px_rgba(34,212,154,0.18)]', title: 'rebirth.keeps', body: 'superRebirth.keeps' },
  { key: 'reward', icon: 'resources/nova-crystal', tone: 'text-rare', ring: 'border-rare/50 bg-rare/12 shadow-[inset_0_0_12px_rgba(116,183,255,0.20)]', title: 'superRebirth.rewardTitle', body: 'rebirth.grantsList' },
] as const
</script>

<template>
  <aside class="flex flex-col gap-4">
    <!--
      L'illustration occupe tout le bloc et le contenu se pose dessus, sans contour :
      c'est la carte d'appel du rail. Le voile en dégradé ne sert qu'à garder le titre et
      le bouton lisibles au-dessus des zones claires du cristal.
    -->
    <section class="panel relative overflow-hidden p-3">
      <!-- L'illustration couvre toute la carte ; elle n'a pas de cadre à elle. -->
      <span
        class="pointer-events-none absolute inset-0 bg-cover bg-center"
        :style="{ backgroundImage: `url(${crystal})` }"
        aria-hidden="true"
      />

      <div class="relative flex flex-col gap-3">
        <!--
          En-tête et pied sont deux sous-blocs translucides encadrés, posés sur
          l'illustration. C'est eux qui rendent le texte lisible : le cristal reste
          visible entre les deux, sans voile qui l'assombrirait sur toute la hauteur.
        -->
        <div class="rounded-lg border border-edge-soft bg-void/60 p-4 backdrop-blur-sm">
          <h2 class="text-xl font-bold uppercase tracking-[0.03em]">
            {{ $t('superRebirth.title') }}
          </h2>
          <p class="mt-1 text-sm text-ink-muted">
            {{ $t('superRebirth.unlock', { rebirth: unlockRebirth }) }}
            <!-- L'exigence est le mot que le joueur cherche : elle passe en doré, sur sa ligne. -->
            <span class="block font-semibold text-legendary">{{ $t('superRebirth.unlockItem') }}</span>
          </p>
        </div>

        <!-- Laisse respirer le cristal : c'est cette réserve qui donne sa hauteur au bloc. -->
        <div
          class="aspect-[5/4]"
          aria-hidden="true"
        />

        <div class="rounded-lg border border-edge-soft bg-void/60 p-4 backdrop-blur-sm">
          <p class="flex items-baseline gap-2">
            <span class="font-mono text-2xl font-bold text-accent">{{ store.superRebirth }}</span>
            <span class="text-sm text-ink-muted">{{ $t('superRebirth.done') }}</span>
          </p>

          <button
            type="button"
            class="dx-button dx-button--primary dx-button--block mt-3"
            :disabled="!unlocked"
            @click="doSuperRebirth"
          >
            {{ $t('superRebirth.doIt') }}
          </button>

          <p
            v-if="crystalsNow !== null"
            class="mt-2 text-center font-mono text-sm text-accent"
          >
            ✦ {{ $t('superRebirth.crystals', crystalsNow, { named: { count: crystalsNow } }) }}
          </p>
        </div>
      </div>
    </section>

    <section class="panel divide-y divide-edge-soft">
      <div
        v-for="bloc in blocs"
        :key="bloc.key"
        class="flex gap-3.5 p-4"
      >
        <!-- Médaillon rond cerclé, teinté par le ton du bloc. -->
        <span
          class="grid size-11 shrink-0 place-items-center rounded-full border"
          :class="[bloc.ring, bloc.tone]"
        >
          <DxIcon
            :name="bloc.icon"
            :size="20"
          />
        </span>
        <div class="min-w-0">
          <p
            class="font-semibold"
            :class="bloc.tone"
          >
            {{ $t(bloc.title) }}
          </p>
          <p class="mt-0.5 text-sm text-ink-muted">
            {{ $t(bloc.body) }}
          </p>
        </div>
      </div>
    </section>

    <details class="panel group p-4">
      <summary class="flex cursor-pointer list-none items-center gap-2 text-sm text-ink-muted hover:text-ink">
        <DxIcon
          name="resources/nova-crystal"
          :size="18"
          class="text-accent"
        />
        <span class="flex-1">{{ $t('superRebirth.crystalsByTier') }}</span>
        <DxIcon
          name="actions/chevron-down"
          :size="16"
          class="transition-transform group-open:rotate-180"
        />
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
