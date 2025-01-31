import { createRouter, createWebHistory } from 'vue-router';
import Home from '../Pages/Home.vue';
import MovieDetails from '../Pages/MovieDetails.vue';
import TvDetails from '../Pages/TvDetails.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/movie/:id',
    name: 'MovieDetails',
    component: MovieDetails,
  },
  {
    path: '/tv/:id',
    name: 'TvDetails',
    component: TvDetails,
  },
];

const router = createRouter({
  history: createWebHistory(), // ✅ Corrected
  routes,
});

export default router;
