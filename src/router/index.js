import { createRouter, createWebHistory } from 'vue-router';
import Home from '../Pages/Home.vue';
import MovieDetails from '../Pages/MovieDetails.vue';
import TvDetails from '../Pages/TvDetails.vue';
import VideoPlayer from '../Pages/VideoPlayer.vue';

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
  {
    path: '/watch/:videoKey',
    name: 'WatchVideo',
    component:VideoPlayer
  }
  
];

const router = createRouter({
  history: createWebHistory(), // ✅ Corrected
  routes,
});

export default router;
