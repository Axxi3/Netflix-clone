<template>
  <div class="bg-black text-white min-h-screen">
    <Navbar />

    <!-- Loader -->
    <div v-if="loading" class="fixed inset-0 flex items-center justify-center z-50 bg-black">
      <img :src="loader" alt="Loading..." class="w-24 h-24" />
    </div>

    <!-- Main Content -->
    <div v-else class="pb-16">
      <!-- Featured Hero Banner -->
      <div v-if="upcomingMovies.length > 0" class="relative h-[85vh] w-full">
        <!-- Hero Background Image with Gradient Overlay -->
        <div class="absolute inset-0">
          <img 
            :src="`https://image.tmdb.org/t/p/original/${upcomingMovies[0].backdrop_path}`"
            class="w-full h-full object-cover"
            alt="Featured movie backdrop"
          />
          <div class="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent"></div>
          <div class="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"></div>
        </div>

        <!-- Hero Content -->
        <div class="absolute bottom-[15%] w-full px-4 sm:px-8 lg:px-16 z-10">
          <div class="mb-5">
            <img :src="logo" alt="Netflix" class="w-16 md:w-24" />
          </div>

          <h1 class="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4 max-w-4xl">
            {{ upcomingMovies[0].title }}
          </h1>

          <p class="text-base md:text-lg max-w-2xl mb-8 text-gray-200 line-clamp-3">
            {{ upcomingMovies[0].overview }}
          </p>

          <div class="flex gap-3">
            <button class="flex items-center gap-2 bg-white text-black py-2 px-8 rounded font-bold hover:bg-opacity-80 transition">
              <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z"></path>
              </svg>
              Play
            </button>
            <button
              @click="goToMovieDetails(upcomingMovies[0].id)"
              class="flex items-center gap-2 bg-gray-600/70 text-white py-2 px-8 rounded font-bold hover:bg-gray-500/70 transition"
            >
              <img class="w-6" :src="Info" alt="More Info" />
              More Info
            </button>
          </div>
        </div>
      </div>

      <!-- Content Rows -->
      <div class="relative -mt-12 z-20">
        <Card title="Blockbuster Movies" :card_data="popularMovies" />
        <TvCard title="Top Rated Shows" :card_data="TopratedTvs" />
        <Card title="New Releases" :card_data="upcomingMovies" />
        <TvCard title="Trending Tonight" :card_data="airingToday" />
        <Card v-if="popularMovies.length > 0" title="Watch Again" :card_data="popularMovies.slice().reverse()" />
      </div>
    </div>

    <router-view v-slot="{ Component }">
  <transition name="fade">
    <component
      :is="Component"
      v-if="$route.query.modal === 'true'"
      class="fixed inset-0 z-50"
    />
  </transition>
</router-view>



    <Footer />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';
import Navbar from '../components/Navbar.vue';
import Card from '../components/Card.vue';
import TvCard from '../components/TvCard.vue';
import Footer from '../components/Footer.vue';
import MovieDetails from './MovieDetails.vue';
import { VueFinalModal } from 'vue-final-modal';
import logo from "../assets/logo.png";
import loader from "../assets/loader.gif";
import Info from "../assets/info_icon.png";
import { Movie, TvShows } from '../Services/DataProvider';
import { AiringToday, getNowPlayingMovies, getPopularMovies, getTopRatedTv } from '../Services/API';

const isMobile = ref(false);
const checkScreenSize = () => {
  isMobile.value = window.innerWidth < 768;
};
onMounted(() => {
  checkScreenSize();
  window.addEventListener('resize', checkScreenSize);
});
onUnmounted(() => {
  window.removeEventListener('resize', checkScreenSize);
});

const router = useRouter();
const upcomingMovies = ref<Movie[]>([]);
const popularMovies = ref<Movie[]>([]);
const TopratedTvs = ref<TvShows[]>([]);
const airingToday = ref<TvShows[]>([]);
const loading = ref(true);

const fetchAllMoviesAndShows = async (): Promise<void> => {
  loading.value = true;
  try {
    const [upcoming, popular, topRated, airing] = await Promise.all([
      getNowPlayingMovies(),
      getPopularMovies(),
      getTopRatedTv(),
      AiringToday()
    ]);
    upcomingMovies.value = upcoming;
    popularMovies.value = popular;
    TopratedTvs.value = topRated;
    airingToday.value = airing;
  } catch (error) {
    console.error("Error fetching movies or shows:", error);
  } finally {
    setTimeout(() => {
      loading.value = false;
    }, 500);
  }
};

const showMovieModal = ref(false);
const selectedMovieId = ref<number | null>(null);

const openMovieModal = (id: number) => {
  selectedMovieId.value = id;
  showMovieModal.value = true;
};

const closeMovieModal = () => {
  showMovieModal.value = false;
  selectedMovieId.value = null;
};

const goToMovieDetails = (id: number) => {
  if (isMobile.value) {
    router.push({ name: 'MovieDetails', params: { id } });
  } else {
    router.push({ name: 'MovieDetails', params: { id }, query: { modal: 'true' } });
  }
};


onMounted(fetchAllMoviesAndShows);
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>
