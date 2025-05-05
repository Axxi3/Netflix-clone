import { createRouter, createWebHistory } from 'vue-router';
import Home from '../Pages/Home.vue';
import MovieDetails from '../Pages/MovieDetails.vue';
import TvDetails from '../Pages/TvDetails.vue';
import VideoPlayer from '../Pages/VideoPlayer.vue';
import Search from '../Pages/Search.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    children: [
      {
        path: 'movie/:id',
        name: 'MovieDetails',
        component: MovieDetails,
        meta: { isModal: true }
      },
      {
        path: '/tv/:id',
        name: 'Tvdetails',
        component: TvDetails,
        meta: { modal: true },
      }
    ]
  },
  // {
  //   path: '/tv/:id',
  //   name: 'TvDetails',
  //   component: TvDetails,
  // },
  {
    path: '/watch/:videoKey',
    name: 'WatchVideo',
    component: VideoPlayer
  },
  {
    path: '/search',
    name: 'search',
    component: () => Search,
  }
];


const router = createRouter({
  history: createWebHistory(), // ✅ Corrected
  routes,
});

export default router;
