<template>
    <div class="home relative">
      <Navbar />
  
      <!-- Loader -->
      <div v-if="loading" class="loader-container w-full h-screen flex items-center justify-center">
        <img :src="loader" alt="Loading..." class="loader" />
      </div>
  
      <!-- Main Content -->
      <div v-else>
        <div v-if="upcomingMovies.length > 0" class="hero relative md:h-[100vh] h-[70vh]">
          <img :src="`https://image.tmdb.org/t/p/original/${upcomingMovies[0].backdrop_path}`"
            class="banner-img w-full h-full object-cover">
          <div class="her-caption absolute w-full pl-4 sm:pl-6 lg:pl-8 lg:top-[30%] md:bottom-8 bottom-0">
            <div>
              <img :src="logo" alt="" class="w-[100px]">
              <h1
                class="text-xl sm:text-2xl mt-3 md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-4">
                {{ upcomingMovies[0].title }}
              </h1>
            </div>
  
            <p class="text-sm sm:text-base lg:text-lg max-w-[90%] sm:max-w-[700px] mb-4 line-clamp-4">
              {{ upcomingMovies[0].overview }}
            </p>
            <div class="hero-btns flex flex-wrap gap-4 mb-8">
              <button
                class="hover:bg-[#6d6d6e66] border py-2 px-4 flex items-center text-sm sm:text-base font-semibold text-white rounded-sm bg-[#6d6d6eb3] cursor-pointer gap-2">
                <img class="w-6" :src="Info" alt="More Info">More Info
              </button>
            </div>
  
        
          </div>
        </div>
  
        <div class="more-cards md:-mt-[150px] pl-[2%]">
          <Card title="Blockbuster Movies" :card_data="popularMovies" />
          <TvCard title="Top rated Shows" :card_data="TopratedTvs" />
          <Card title="Upcoming" :card_data="upcomingMovies" />
          <TvCard title="Don't miss this tonight" :card_data="airingToday" />
        </div>
      </div>
  
      <!-- Modal Router View -->
      <router-view v-slot="{ Component }">
      <template v-if="Component">
        <div 
          v-if="$route.meta.isModal" 
          class="fixed inset-0 z-50 pointer-events-auto"
        >
          <div 
            class="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
            @click="closeModal"
          ></div>
          <div class="fixed inset-0 flex items-center justify-center z-60 pointer-events-auto">
            <component :is="Component" class="relative z-70" />
          </div>
        </div>
      </template>
    </router-view>
  
      <Footer />
    </div>
  </template>


<script setup lang="ts">
import Navbar from '../components/Navbar.vue'
import Card from '../components/Card.vue'
import Footer from '../components/Footer.vue'
import { onMounted, ref } from 'vue'
import logo from "../assets/logo.png"
import Play from "../assets/play_icon.png"
import loader from "../assets/loader.gif"
import Info from "../assets/info_icon.png"
import { Movie, TvShows } from '../Services/DataProvider'
import { AiringToday, getNowPlayingMovies, getPopularMovies, getTopRatedTv } from '../Services/API'
import TvCard from '../components/TvCard.vue'

const upcomingMovies = ref<Movie[]>([]);
const popularMovies = ref<Movie[]>([]);
const TopratedTvs = ref<TvShows[]>([]);
const airingToday = ref<TvShows[]>([]);
const loading = ref(true);

// Fetch all data in parallel with a common loading state
const fetchAllMoviesAndShows = async (): Promise<void> => {
    loading.value = true; // Start loading

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
        loading.value = false; // Stop loading
    }
};

onMounted(fetchAllMoviesAndShows);
</script>

<style scoped>
.banner-img {
    mask-image: linear-gradient(to right, transparent, black 75%);
    -webkit-mask-image: linear-gradient(to right, transparent, black 75%);
}
</style>
