<template>

<div v-if="loading" class="loader-container w-full h-screen flex items-center justify-center">
            <img :src="loader" alt="Loading..." class="loader" />
        </div>


<div v-else class="w-full">
      <div class="hero relative md:h-[90vh] h-[75vh]">
    <img :src="`https://image.tmdb.org/t/p/original${movieDetails?.backdrop_path}`" class="banner-img w-full h-full object-cover"> 
    <div class="her-caption absolute w-full pl-4 sm:pl-6 lg:pl-8 lg:bottom-[8%] md:bottom-8 bottom-0">
        <div>
                        
                        <h1
                            class="text-xl sm:text-2xl mt-3 md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-4">
                            {{ movieDetails?.title }}
                        </h1>
                    </div>
        <p class="text-sm sm:text-base lg:text-lg max-w-[90%] sm:max-w-[700px] mb-4">
           {{ movieDetails?.overview }}
        </p>
        <div class="hero-btns flex flex-wrap gap-4 mb-8">
            <button @click="playVideo" class="hover:bg-[#ffffffbf] border py-2 px-4 flex items-center text-sm sm:text-base font-semibold text-black rounded-sm bg-white cursor-pointer gap-2">
                <img class="w-6" :src="Play" alt="Play">Play
            </button>
            <button class="hover:bg-[#6d6d6e66] border py-2 px-4 flex items-center text-sm sm:text-base font-semibold text-white rounded-sm bg-[#6d6d6eb3] cursor-pointer gap-2">
                <img class="w-6" :src="Info" alt="More Info">More Info
            </button>
        </div>

    </div>
</div>


<div v-if="allVideos.length>0" class="more-cards pl-[2%] ">
            <Traillercards title="Blockbuster Movies" :name="movieDetails?.original_title || ''" :card_data="allVideos"/>
           
        </div>

        <div class="px-4 sm:px-6 lg:px-8">
    <h2 class="text-2xl mb-4 font-semibold">More Details</h2>

    <div class="mt-7 flex flex-col md:flex-row gap-6">
        <div class="flex flex-col gap-1 md:w-1/3">
            <h3 class="opacity-60 text-lg">Watch Offline</h3>
            <p class="text-base">Download and watch everywhere you go.</p>
        </div>
        <div class="flex flex-col gap-1 md:w-1/3">
            <h3 class="opacity-60 text-lg">Genre</h3>
            <p class="text-base">Romantic TV Dramas, TV Dramas, TV Shows Based on Books, Teen TV Shows, TV Comedies, Romantic TV Comedies, Hindi-Language TV Shows</p>
        </div>
        <div class="flex flex-col gap-1 md:w-1/3">
            <h3 class="opacity-60 text-lg">Quote of the movie is...</h3>
            <p class="text-base">{{ movieDetails?.tagline }}</p>
        </div>
    </div>
</div>



        <div class="px-4 sm:px-6 lg:px-8 mt-6">
    <h2 class="text-2xl mb-4 font-semibold">More Like This</h2>

    <div v-if="similarMovies.length>0" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      <div
        v-for="(movie, index) in similarMovies"
        :key="index"
        class="relative overflow-hidden  shadow-md transform transition duration-300 hover:scale-105"
      >
        <img @click="navigateToMovie(movie.id)" :src="`https://image.tmdb.org/t/p/original/${movie.poster_path}`" :alt="movie.backdrop_path" class="w-full h-auto object-cover">
       
      </div>
    </div>
  </div>

</div>




        <Footer/>

</template>

<script setup lang="ts">
import Navbar from '../components/Navbar.vue';
import Traillercards from '../components/Traillercards.vue';
import Footer from '../components/Footer.vue';
import { onMounted, ref } from 'vue';
import loader from "../assets/loader.gif";
import herobanner from "../assets/hero_banner.jpg";
import herotitle from "../assets/hero_title.png";
import Play from "../assets/play_icon.png";
import Info from "../assets/info_icon.png";
import cards_data from '../assets/cards/Cards_data';
import { useRoute, useRouter } from 'vue-router';
import { Movie, MovieDetails, VideoDetails } from '../Services/DataProvider';
import { getMovieDetails, getSimilarMovies, getTrailers } from '../Services/API';
import { all } from 'axios';

const route = useRoute();
const movieID = ref<string>(route.params.id as string);
const movieDetails = ref<MovieDetails | null>(null);
const allVideos = ref<VideoDetails[]>([]);
const similarMovies = ref<Movie[]>([]);
const loading = ref<boolean>(false);


const router=useRouter()

const navigateToMovie = (id: number) => {
  router.push({ name: "MovieDetails", params: { id } });
};


const playVideo = () => {
  if (allVideos.value.length > 0) {
    const videoKey = allVideos.value[0].key;
    router.push(`/watch/${videoKey}`);
  }
};



const fetchMovieData = async () => {
  try {
    if (!movieID.value) return;
    loading.value = true;
    
    // Fetch all data in parallel
    const [details, videos, similar] = await Promise.all([
      getMovieDetails(Number(movieID.value)),
      getTrailers(movieID.value, 'movie'),
      getSimilarMovies(movieID.value)
    ]);

    // Assign fetched data to state variables
    movieDetails.value = details;
    allVideos.value = videos;
    similarMovies.value = similar;
    
    console.log({ details, videos, similar });

    console.log(`https://image.tmdb.org/t/p/original${movieDetails.value.backdrop_path}`)
  } catch (error) {
    console.error("Error fetching movie data:", error);
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchMovieData();
});



// Fetch movie details when the component mounts

</script>


<style lang="scss" scoped>
.banner-img {
    mask-image: linear-gradient(to right, transparent, black 75%),
    linear-gradient(to top from bottom, transparent, black 75%);
               
    -webkit-mask-image: linear-gradient(to right, transparent, black 75%), 
                        
}
</style>