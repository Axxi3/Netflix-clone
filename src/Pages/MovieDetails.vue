
<template>
  <div
    ref="modalContainer"
    :class="[
      isModal
        ? 'fixed inset-0 bg-black/80 flex items-start overflow-scroll  z-50'
        : 'bg-black text-white overflow-y-scroll min-h-screen',
    ]"
   
    @click.self="isModal ? closePopup() : null"
  >
    <div
      class="relative w-full mx-auto bg-[#181818] overflow-hidden shadow-xl"
      :class="{
        'max-w-[1000px] rounded-lg my-8': isModal,
        'min-h-screen': !isModal,
      }"
    >
      <!-- Video Hero Section -->
      <div class="relative pt-[56.25%]">
        <div class="absolute inset-0">
          <img
            :src="`https://image.tmdb.org/t/p/original${movieDetails?.backdrop_path}`"
            class="w-full h-full object-cover opacity-50"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-[#181818] via-transparent to-transparent"></div>
        </div>

        <!-- Close Button -->
        <button
          v-if="isModal"
          @click="closePopup"
          class="absolute top-4 right-4 z-50 text-white hover:text-gray-300 transition"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 md:h-10 md:w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <!-- Content Section -->
      <div class="px-4 md:px-12 py-4 md:py-8 bg-[#181818]">
        <div class="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6">
          <img
            :src="`https://image.tmdb.org/t/p/w500${movieDetails?.poster_path}`"
            :alt="movieDetails?.title"
            class="w-32 h-48 md:w-48 md:h-72 object-cover rounded-md shadow-lg"
          />

          <div class="w-full text-white text-center md:text-left">
            <h1 class="text-2xl md:text-4xl lg:text-5xl font-bold mb-2 md:mb-4">{{ movieDetails?.title }}</h1>

            <div class="flex justify-center md:justify-start items-center space-x-2 md:space-x-3 mb-2 md:mb-4 flex-wrap">
              <span class="text-green-500 font-bold text-sm md:text-base">{{ getMatchPercentage() }}% Match</span>
              <span class="text-xs md:text-sm border border-gray-500 px-1">HD</span>
              <span class="text-sm">{{ movieDetails?.release_date?.split('-')[0] }}</span>
              <span class="text-sm border border-gray-500 px-1">{{ movieDetails?.runtime }} min</span>
            </div>

            <div class="flex justify-center md:justify-start items-center space-x-2 md:space-x-4 mb-4">
              <button
                @click="playVideo"
                class="bg-white text-black px-4 py-1 md:px-6 md:py-2 rounded flex items-center space-x-2 hover:bg-gray-200"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 md:h-6 md:w-6" viewBox="0 0 24 24" fill="currentColor">
                  <path
                    fill-rule="evenodd"
                    d="M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653z"
                    clip-rule="evenodd"
                  />
                </svg>
                <span class="text-sm md:text-base">Play</span>
              </button>
              <button class="bg-gray-600 bg-opacity-50 text-white px-4 py-1 md:px-6 md:py-2 rounded flex items-center space-x-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 md:h-6 md:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                </svg>
                <span class="text-sm md:text-base">My List</span>
              </button>
            </div>

            <p class="text-base md:text-lg mb-4">{{ movieDetails?.overview }}</p>
          </div>
        </div>

        <div class="mt-4">
          <div class="mb-2">
            <span class="text-gray-500 text-sm md:text-base">Genres: </span>
            <span class="text-white text-sm md:text-base">
              {{ movieDetails?.genres?.map(genre => genre.name).join(', ') }}
            </span>
          </div>
          <div>
            <span class="text-gray-500 text-sm md:text-base">Available Languages: </span>
            <span class="text-white text-sm md:text-base">English, Spanish, French</span>
          </div>
        </div>
      </div>

      <!-- More Like This -->
      <div class="px-4 md:px-12 py-4 md:py-8 bg-[#141414]">
        <h2 class="text-xl md:text-2xl text-white mb-4 md:mb-6">More Like This</h2>
        <div class="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-4">
          <div
            v-for="(movie, index) in similarMovies"
            :key="index"
            @click="navigateToMovie(movie.id)"
            class="relative group cursor-pointer"
          >
            <div class="relative pb-[150%] md:pb-[56.25%] overflow-hidden rounded-md">
              <img
                :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`"
                :alt="movie.title"
                class="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
            </div>
            <div class="mt-1 md:mt-2 text-gray-400 text-xs md:text-sm text-center md:text-left">
              {{ movie.title }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, onUnmounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { Movie, MovieDetails, VideoDetails } from '../Services/DataProvider';
import { getMovieDetails, getSimilarMovies, getTrailers } from '../Services/API';
import { watch } from 'vue';



const route = useRoute();
const router = useRouter();

const movieID = ref<string>(route.params.id as string);
const movieDetails = ref<MovieDetails | null>(null);
const allVideos = ref<VideoDetails[]>([]);
const similarMovies = ref<Movie[]>([]);
const loading = ref<boolean>(true);
const windowWidth = ref(window.innerWidth);

const modalContainer = ref<HTMLElement | null>(null);

watch(
  () => route.params.id,
  (newId) => {
    movieID.value = newId as string;
    loading.value = true;

    // Scroll modal container to top (if modal)
    if (isModal.value && modalContainer.value) {
      modalContainer.value.scrollTo({ top: 0, behavior: 'smooth' });
    }

    fetchMovieData();
  }
);




// Check if mobile based on screen width
const isMobile = computed(() => windowWidth.value < 768);

// Determine if it's in modal mode (not mobile and route marked as modal)
const isModal = computed(() => route.meta.isModal && !isMobile.value);

const handleResize = () => {
  windowWidth.value = window.innerWidth;
};


const navigateToMovie = (id: number) => {
  if (isMobile.value) {
    router.push({ name: 'MovieDetails', params: { id } }); // Full page
  } else {
    router.push({ name: 'MovieDetails', params: { id }, query: { modal: 'true' } }); // Modal
  }
};

const playVideo = () => {
  if (allVideos.value.length > 0) {
    const videoKey = allVideos.value[0].key;
    router.push(`/watch/${videoKey}`);
  }
};

const closePopup = () => {
  router.go(-1);
};

const getMatchPercentage = () => {
  return movieDetails.value ? (parseInt(movieDetails.value.id.toString()) % 50) + 50 : 70;
};

const fetchMovieData = async () => {
  try {
    if (!movieID.value) return;

    const [details, videos, similar] = await Promise.all([
      getMovieDetails(Number(movieID.value)),
      getTrailers(movieID.value, 'movie'),
      getSimilarMovies(movieID.value)
    ]);

    movieDetails.value = details;
    allVideos.value = videos;
    similarMovies.value = similar;
  } catch (error) {
    console.error('Error fetching movie data:', error);
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchMovieData();
  window.addEventListener('resize', handleResize);
});

onUnmounted(() => {
  window.removeEventListener('resize', handleResize);
});
</script>

<style scoped>
/* Hide scrollbar for Chrome, Safari, Opera */
.no-scrollbar::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for IE, Edge, Firefox */
.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
