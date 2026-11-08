<script setup lang="ts">
/**
 * Marque statique : un carré coupé en diagonale en deux pièces qui s'emboîtent.
 * Moitié haute-gauche = Développeur (teal/cyan), basse-droite = Architecte (jaune/ambre).
 * La version animée (GSAP, survol asymétrique) remplacera ce composant à l'étape 4.
 */
withDefaults(defineProps<{ size?: number }>(), { size: 36 });
</script>

<template>
  <svg class="logomark" :width="size" :height="size" viewBox="0 0 40 40" aria-hidden="true" focusable="false">
    <path class="logomark-dev" d="M5 5H32.5L5 32.5Z" />
    <path class="logomark-archi" d="M35 7.5V35H7.5Z" />
  </svg>
</template>
