<script setup lang="ts">
import type { Droid, Tier } from '~~/shared/types/droid'

/**
 * Carte d'une **variante** de droid : le couple (droid, palier) traité comme un objet de
 * collection à part entière, avec son illustration propre, ses stats de palier et sa bascule
 * « possédé ». La grille en aligne une par palier — filtrer sur « Or » revient à ne montrer
 * que les variantes Or. Toute la carte est teintée à la couleur de son palier, pilotée par
 * une seule variable CSS `--tier`, ce qui évite de multiplier les classes Tailwind par palier.
 *
 * Deux dispositions, au seuil `@md` du conteneur (même bascule que la grille) :
 *  - téléphone (1 colonne) : rangée compacte, image à gauche, faible hauteur ;
 *  - au-delà : carte verticale, illustration en bandeau surmontée des puces de coin.
 */
const props = defineProps<{ droid: Droid, tier: Tier }>()

const store = useCollectionStore()
const { locale } = useI18n()
const localePath = useLocalePath()

const entry = computed(() => store.entry(props.droid.slug))
const owned = computed(() => entry.value.tiers.includes(props.tier))
const stats = computed(() => props.droid.tiers[props.tier])

/** Couleur du palier, injectée en variable CSS pour teinter bordure, lueur et fond d'un coup. */
const TIER_VAR: Record<Tier, string> = {
  DEFAULT: 'var(--color-tier-default)',
  GOLD: 'var(--color-tier-gold)',
  DIAMOND: 'var(--color-tier-diamond)',
  RAINBOW: 'var(--color-tier-rainbow)',
  BESKAR: 'var(--color-tier-beskar)',
  GALACTIC: 'var(--color-tier-galactic)',
}

/** Classe de nébuleuse du champ d'étoiles, teintée par palier (classes globales `nebula-*`). */
const NEBULA: Record<Tier, string> = {
  DEFAULT: 'nebula-default',
  GOLD: 'nebula-gold',
  DIAMOND: 'nebula-diamond',
  RAINBOW: 'nebula-rainbow',
  BESKAR: 'nebula-beskar',
  GALACTIC: 'nebula-galactic',
}

/** Un palier sans revenu publié (Galactique) : on montre un tiret plutôt qu'un « 0 » faux. */
const hasData = computed(() => stats.value?.income != null)

function toggle() {
  store.toggleTier(props.droid.slug, props.tier)
}
</script>

<template>
  <article
    class="vcard flex items-center gap-3 @md:flex-col @md:items-stretch"
    :class="{ 'vcard--owned': owned }"
    :style="{ '--tier': TIER_VAR[tier] }"
  >
    <!-- Case de possession, coin haut-droit : le seul geste pour consigner la variante. Vide,
         c'est un cercle teinté ; cochée, elle se remplit à la couleur du palier avec sa coche. -->
    <button
      type="button"
      class="vcard__own"
      :class="{ 'is-owned': owned }"
      role="checkbox"
      :aria-checked="owned"
      :aria-label="$t('droid.owned')"
      :title="$t('droid.owned')"
      @click="toggle"
    >
      <DxIcon
        name="actions/check"
        :size="13"
        class="vcard__own-check"
      />
    </button>

    <!--
      Mobile : moitié DROITE de la tuile = grande cible pour cocher (au doigt, viser la petite
      pastille est pénible et ouvrait la fiche par erreur). La moitié gauche reste couverte par
      le lien étiré, donc ouvre la fiche. En carte verticale (desktop), cette zone disparaît.
    -->
    <button
      type="button"
      class="vcard__tap-own @md:hidden"
      :aria-label="$t('droid.owned')"
      tabindex="-1"
      @click="toggle"
    />

    <!--
      Bandeau : le champ d'étoiles (classes globales `droid-starfield` + `nebula-*`) porté par
      le média lui-même, pour qu'il occupe tout le bandeau. L'illustration, en `no-starfield`,
      se pose par-dessus à sa taille d'origine — c'est le ciel qui grandit, pas le droid.
    -->
    <div
      class="vcard__media droid-starfield"
      :class="NEBULA[tier]"
    >
      <!-- Puce de palier, réservée à la carte verticale : trop à l'étroit sur la vignette. -->
      <span class="vcard__tier hidden @md:flex">{{ $t(`tier.${tier}`) }}</span>

      <DroidImage
        :droid="droid"
        :tier="tier"
        size="sm"
        no-starfield
        :dimmed="!owned"
        class="relative z-[1] @md:hidden"
      />
      <DroidImage
        :droid="droid"
        :tier="tier"
        size="md"
        no-starfield
        :dimmed="!owned"
        class="relative z-[1] hidden @md:block"
      />
    </div>

    <!-- Marge à droite en rangée pour que le nom ne passe pas sous la case ; inutile en pile. -->
    <div class="min-w-0 flex-1 pr-6 @md:pr-0">
      <!--
        Lien étiré : son `::after` couvre toute la carte, si bien qu'un clic n'importe où ouvre
        la fiche du droid. La coche, posée au-dessus (z-index supérieur), reste seule cliquable
        sans déclencher la navigation. On garde un vrai <a> porteur du nom, pour l'accessibilité.
      -->
      <NuxtLink
        :to="localePath(`/droids/${droid.slug}`)"
        class="vcard__link block truncate font-semibold leading-tight hover:underline"
      >
        {{ droid.name }}
      </NuxtLink>

      <div class="mt-1 flex flex-wrap items-center gap-1.5 text-xs">
        <!-- Rappel du palier en rangée, là où la puce de coin est masquée. -->
        <span class="vcard__tier-inline @md:hidden">{{ $t(`tier.${tier}`) }}</span>
        <RarityBadge :rarity="droid.rarity" />
        <TypeBadge :type="droid.type" />
      </div>

      <!-- Stats de la variante. Les Emblématiques rapportent un % du revenu global : pas de
           barème par palier, on montre ce pourcentage à la place des trois colonnes. -->
      <div
        v-if="droid.percentIncome"
        class="vcard__percent"
      >
        {{ $t('droid.percentIncome', { value: droid.percentValue ?? '?' }) }}
      </div>
      <dl
        v-else
        class="vcard__stats"
      >
        <div>
          <dt>{{ $t('droid.income') }}</dt>
          <dd
            class="vcard__income"
            :title="formatExact(stats?.income, locale)"
          >
            {{ hasData ? formatIncome(stats?.income, locale) : '—' }}
          </dd>
        </div>
        <div>
          <dt>{{ $t('droid.cost') }}</dt>
          <dd :title="formatExact(stats?.cost, locale)">
            {{ stats?.cost != null ? formatNumber(stats.cost, locale) : '—' }}
          </dd>
        </div>
        <div>
          <dt>{{ $t('droid.value') }}</dt>
          <dd :title="formatExact(stats?.value, locale)">
            {{ stats?.value != null ? formatNumber(stats.value, locale) : '—' }}
          </dd>
        </div>
      </dl>
    </div>
  </article>
</template>

<style scoped>
/*
 * Toute la carte se teinte à `--tier` (posée en inline par le composant). On mélange cette
 * couleur au fond sombre avec `color-mix` : une seule variable pilote bordure, lueur, fond
 * et accents, si bien qu'un palier Or rayonne en or et un Galactique en violet, sans dupliquer
 * la moindre classe. La carte non possédée reste discrète ; la possession l'allume.
 */
.vcard {
  position: relative;
  padding: 0.7rem;
  border-radius: var(--radius-card);
  border: 1px solid color-mix(in srgb, var(--tier) 22%, var(--color-edge));
  background:
    linear-gradient(160deg, color-mix(in srgb, var(--tier) 7%, transparent), transparent 55%),
    var(--color-panel);
  transition:
    transform 200ms var(--dx-ease, ease),
    border-color 200ms,
    box-shadow 200ms;
}

.vcard:hover {
  border-color: color-mix(in srgb, var(--tier) 55%, transparent);
  box-shadow: 0 12px 30px -12px color-mix(in srgb, var(--tier) 55%, transparent);
}

.vcard--owned {
  border-color: color-mix(in srgb, var(--tier) 60%, transparent);
  background:
    linear-gradient(160deg, color-mix(in srgb, var(--tier) 15%, transparent), transparent 60%),
    var(--color-panel-raised);
  box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--tier) 30%, transparent);
}

/*
 * Possédée : le halo spatial du bandeau change de lumière. La nébuleuse, discrète tant que la
 * variante n'est pas obtenue, s'embrase alors en vert — l'espace lui-même « s'allume » dans la
 * carte pour signaler la possession, d'un vert d'acquisition indépendant de la couleur du palier.
 */
.vcard--owned .vcard__media {
  --nebula: color-mix(in srgb, #2f9e74 34%, transparent);
}

/* Lien étiré : couvre toute la carte pour la rendre cliquable ; la coche passe au-dessus. */
.vcard {
  cursor: pointer;
}

.vcard__link::after {
  content: '';
  position: absolute;
  inset: 0;
  /* Mobile : le lien ne couvre que la moitié GAUCHE ; la droite sert à cocher. */
  right: 50%;
  z-index: 1;
}

/* Zone tactile de possession, moitié droite (mobile uniquement). */
.vcard__tap-own {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 50%;
  z-index: 1;
  cursor: pointer;
}

/* Desktop (carte verticale) : le lien reprend toute la carte, la zone tactile disparaît. */
@container (min-width: 28rem) {
  .vcard__link::after {
    right: 0;
  }
}

/* Vignette (rangée) : image posée sur le champ d'étoiles ; le fond vient de `droid-starfield`. */
.vcard__media {
  position: relative;
  display: grid;
  place-items: center;
  flex-shrink: 0;
  overflow: hidden;
  padding: 0.25rem;
  border-radius: 0.6rem;
}

/*
 * Champ d'étoiles FIGÉ sur les cartes. `droid-starfield` anime en continu deux couches par
 * carte (dérive + scintillement) : sur une grille, des dizaines de ciels animés en parallèle
 * saturent le GPU et font ramer, voire planter, le navigateur. On garde le rendu — étoiles et
 * nébuleuse teintée — mais on coupe l'animation. La dérive reste réservée à la page détail,
 * où le ciel n'existe qu'en un seul exemplaire.
 */
.vcard__media::before,
.vcard__media::after {
  animation: none;
}

/*
 * En pile, la vignette devient un vrai bandeau : plein-bord (marges négatives qui annulent le
 * padding de la carte), il occupe environ la moitié haute jusqu'au-dessus du nom. L'image, elle,
 * garde sa taille — elle est simplement centrée dans ce bandeau, entourée du fond teinté.
 */
@container (min-width: 28rem) {
  .vcard__media {
    margin: -0.7rem -0.7rem 0;
    padding: 0.6rem;
    min-height: 8.5rem;
    border-radius: var(--radius-card) var(--radius-card) 0 0;
  }

  .vcard:hover {
    transform: translateY(-3px);
  }
}

/* Puce de palier, coin haut-gauche (carte verticale) : couleur pleine sur fond sombre. */
.vcard__tier {
  position: absolute;
  top: 0.4rem;
  left: 0.4rem;
  z-index: 1;
  align-items: center;
  padding: 0.1rem 0.45rem;
  border-radius: 999px;
  font-size: 0.65rem;
  font-weight: 700;
  color: color-mix(in srgb, var(--tier) 78%, white);
  background: color-mix(in srgb, var(--tier) 20%, var(--color-void));
  border: 1px solid color-mix(in srgb, var(--tier) 45%, transparent);
}

/* Même puce, en ligne dans l'en-tête sur la version rangée. */
.vcard__tier-inline {
  padding: 0.05rem 0.4rem;
  border-radius: 999px;
  font-size: 0.65rem;
  font-weight: 700;
  color: color-mix(in srgb, var(--tier) 78%, white);
  background: color-mix(in srgb, var(--tier) 18%, var(--color-void));
  border: 1px solid color-mix(in srgb, var(--tier) 40%, transparent);
}

/*
 * Case de possession, coin haut-droit. Le seul contrôle de la carte : vide, c'est un cercle
 * teinté qui laisse deviner une coche au survol ; cochée, elle se remplit à la couleur du
 * palier, coche blanche et légère lueur — « une jolie coche » qui se lit d'un coup d'œil.
 */
.vcard__own {
  position: absolute;
  top: 0.55rem;
  right: 0.55rem;
  z-index: 2;
  display: grid;
  place-items: center;
  width: 1.6rem;
  height: 1.6rem;
  border-radius: 999px;
  cursor: pointer;
  border: 1.5px solid color-mix(in srgb, var(--tier) 55%, transparent);
  background: color-mix(in srgb, var(--tier) 12%, var(--color-void));
  transition: background 160ms, border-color 160ms, box-shadow 160ms, transform 120ms;
}

.vcard__own:hover {
  transform: scale(1.08);
  border-color: color-mix(in srgb, var(--tier) 80%, transparent);
}

.vcard__own:focus-visible {
  outline: none;
  box-shadow: 0 0 0 2px color-mix(in srgb, var(--tier) 70%, transparent);
}

.vcard__own-check {
  opacity: 0;
  color: color-mix(in srgb, var(--tier) 75%, white);
  transition: opacity 140ms;
}

/* Indice au survol d'une case vide : la coche apparaît en filigrane. */
.vcard__own:hover .vcard__own-check {
  opacity: 0.4;
}

.vcard__own.is-owned {
  border-color: transparent;
  background: color-mix(in srgb, var(--tier) 85%, white);
  box-shadow: 0 0 12px -2px color-mix(in srgb, var(--tier) 75%, transparent);
}

.vcard__own.is-owned .vcard__own-check {
  opacity: 1;
  color: var(--color-void);
}

.vcard__stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.4rem 0.5rem;
  margin-top: 0.35rem;
}

.vcard__stats dt {
  font-size: 0.58rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  line-height: 1.15;
  color: var(--color-ink-muted);
}

.vcard__stats dd {
  margin-top: 0.05rem;
  font: 600 0.78rem / 1.1 var(--dx-font-mono, ui-monospace, monospace);
  font-variant-numeric: tabular-nums;
  color: var(--color-ink);
}

/* Le revenu est la stat qu'on lit en premier : teinte du palier, éclaircie pour rester lisible. */
.vcard__income {
  color: color-mix(in srgb, var(--tier) 62%, white) !important;
  font-size: 0.88rem !important;
}

.vcard__percent {
  margin-top: 0.35rem;
  font-weight: 600;
  color: var(--color-iconic);
}

@media (prefers-reduced-motion: reduce) {
  .vcard,
  .vcard:hover,
  .vcard__own:hover {
    transform: none;
  }
}
</style>
