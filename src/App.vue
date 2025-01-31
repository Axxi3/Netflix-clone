<script setup>
import { onMounted, ref } from 'vue';
import movies from './movies.json';
import Magnify from 'vue-material-design-icons/Magnify.vue';
import HomeOutline from 'vue-material-design-icons/HomeOutline.vue';
import TrendingUp from 'vue-material-design-icons/TrendingUp.vue';
import Television from 'vue-material-design-icons/Television.vue';
import MovieOutline from 'vue-material-design-icons/MovieOutline.vue';
import Plus from 'vue-material-design-icons/Plus.vue';
import ChevronLeft from 'vue-material-design-icons/ChevronLeft.vue';
import Navbar from './components/Navbar.vue';
</script>

<template>
  <div>
    <Navbar />
    <div>
      <router-link to="/">
      </router-link>
      <router-link to="/movie/1"></router-link>
    </div>
    <router-view :key="$route.fullPath"></router-view>
  </div>
</template>

<style scoped>
</style>
