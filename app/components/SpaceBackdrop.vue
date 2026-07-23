<script setup lang="ts">
/**
 * Fond spatial animé : dégradé bleu nuit et trois couches d'étoiles qui dérivent à des
 * vitesses différentes (parallaxe), avec un léger scintillement. Tout est en CSS — pas de
 * canvas ni de JS de rendu —, posé en `absolute` pour se glisser derrière le contenu d'une
 * bannière. `aria-hidden` : c'est décoratif. `prefers-reduced-motion` fige les couches.
 *
 * Les décalages d'animation sont des multiples exacts de la taille de tuile, sinon la boucle
 * « saute » à chaque cycle. Chaque couche cumule plusieurs points par tuile pour éviter la
 * grille régulière qu'un seul point trahirait.
 */
</script>

<template>
  <div
    class="space"
    aria-hidden="true"
  >
    <span class="layer layer-far" />
    <span class="layer layer-mid" />
    <span class="layer layer-near" />
  </div>
</template>

<style scoped>
.space {
  position: absolute;
  inset: 0;
  overflow: hidden;
  /* Bleu nuit, un peu plus clair en haut à droite — une lueur lointaine. */
  background:
    radial-gradient(140% 120% at 78% -12%, #17325f 0%, #0d1d3c 38%, #070f24 72%, #050913 100%);
}

.layer {
  position: absolute;
  inset: 0;
  background-repeat: repeat;
  will-change: background-position;
}

.layer-far {
  background-image:
    radial-gradient(1px 1px at 40px 60px, rgba(255, 255, 255, 0.65), transparent),
    radial-gradient(1px 1px at 130px 20px, rgba(200, 220, 255, 0.55), transparent),
    radial-gradient(1px 1px at 90px 150px, rgba(255, 255, 255, 0.45), transparent),
    radial-gradient(1px 1px at 180px 110px, rgba(255, 255, 255, 0.55), transparent);
  background-size: 220px 220px;
  animation: drift-far 150s linear infinite;
}

.layer-mid {
  background-image:
    radial-gradient(1.5px 1.5px at 60px 40px, rgba(255, 255, 255, 0.85), transparent),
    radial-gradient(1.5px 1.5px at 150px 120px, rgba(185, 212, 255, 0.75), transparent),
    radial-gradient(1px 1px at 30px 175px, rgba(255, 255, 255, 0.7), transparent);
  background-size: 200px 200px;
  animation:
    drift-mid 95s linear infinite,
    twinkle 7s ease-in-out infinite;
}

.layer-near {
  background-image:
    radial-gradient(2px 2px at 100px 80px, rgba(255, 255, 255, 1), transparent),
    radial-gradient(1.5px 1.5px at 210px 30px, rgba(215, 232, 255, 0.9), transparent);
  background-size: 260px 260px;
  animation: drift-near 60s linear infinite;
}

@keyframes drift-far {
  to {
    background-position: -220px -440px;
  }
}
@keyframes drift-mid {
  to {
    background-position: 200px -400px;
  }
}
@keyframes drift-near {
  to {
    background-position: -260px 260px;
  }
}
@keyframes twinkle {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.55;
  }
}

@media (prefers-reduced-motion: reduce) {
  .layer {
    animation: none;
  }
}
</style>
