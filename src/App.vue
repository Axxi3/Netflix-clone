<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';

import Navbar from './components/Navbar.vue';
import MovieDetails from './Pages/MovieDetails.vue'; // make sure this path is correct

const route = useRoute();

// Detect mobile width (simplified)
const isMobile = computed(() => window.innerWidth < 768);
</script>

<template>
  <div>
    <Navbar />


  <router-view />

  </div>
</template>

<style scoped>
/* You can add overlay-style z-index or blur effects here if needed */
</style>
