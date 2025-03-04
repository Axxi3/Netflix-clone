<template>
  <div class="titlecard mt-[50px] mb-[30px]">
    <!-- Dynamic title from props -->
    <h2 class="mb-[8px] text-xl font-bold text-white">{{ title }}</h2>
    <div class="relative flex items-center w-full overflow-x-hidden">
      <!-- Left Arrow -->
      <div class="h-full">
        <button 
          @click="scrollLeft" 
          class="absolute left-0 z-2000 p-2 bg-black bg-opacity-50 text-white rounded-full hover:bg-opacity-75 transition hidden sm:flex"
        >
          <ChevronLeftIcon class="h-6 w-6" />
        </button>
      </div>

      <div 
        class="relative flex gap-4 overflow-x-auto overflow-y-visible scroll-smooth no-scrollbar w-full md:px-8"
        ref="cardRef"
      >
        <div 
          v-for="(movie, index) in card_data" 
          :key="index" 
          class="relative flex-shrink-0 cursor-pointer overflow-y-visible group transition-all duration-300 
                 hover:z-50 hover:scale-110 
                 w-[180px] sm:w-[220px] md:w-[280px]"
        >
          <div 
            @click="navigateToMovie(movie.id)"
            class="relative rounded-md transition-all duration-300 overflow-hidden"
          >
            <!-- Movie Thumbnail -->
            <div class="relative w-full aspect-[16/9]">
              <img 
                class="absolute inset-0 w-full h-full object-cover transition-transform duration-300 rounded-md" 
                :src="`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`" 
                :alt="movie.name" 
              />
            </div>

            <!-- Hover Overlay -->
            <div 
              class="opacity-0 group-hover:opacity-100 absolute inset-0 w-full bg-black bg-opacity-75 
                     transition-opacity duration-300 flex flex-col justify-end p-4 sm:p-5 
                     pointer-events-auto z-50 overflow-hidden"
            >
              <!-- Background Blur -->
              <div 
                class="absolute inset-0 bg-cover bg-center opacity-30 blur-lg" 
                :style="{ backgroundImage: `url('https://image.tmdb.org/t/p/w500${movie.backdrop_path}')` }"
              ></div>

              <!-- Control Buttons -->
              <div class="relative z-10 flex justify-between items-center mb-3 pointer-events-auto">
                <div class="flex space-x-2 sm:space-x-3">
                  <button 
                    @click.stop="playShow(movie)"
                    class="bg-white text-black p-2 sm:p-2.5 rounded-full hover:bg-gray-200 transition"
                  >
                    <PlayIcon class="h-5 w-5"/>
                  </button>
                  <button 
                    @click.stop="addToList(movie)"
                    class="border border-white text-white p-2 sm:p-2.5 rounded-full hover:bg-white hover:bg-opacity-20 transition"
                  >
                    <PlusIcon class="h-5 w-5"/>
                  </button>
                </div>
                <button 
                  @click.stop="showMoreInfo(movie)"
                  class="border border-white text-white p-2 sm:p-2.5 rounded-full hover:bg-white hover:bg-opacity-20 transition"
                >
                  <InformationIcon class="h-5 w-5"/>
                </button>
              </div>

              <!-- Title & Metadata -->
              <div class="relative z-10 text-white pointer-events-auto">
                <h3 class="text-sm sm:text-base font-bold mb-1 leading-tight">{{ movie.name }}</h3>
                <div class="flex items-center space-x-2 text-xs sm:text-sm">
                  <span class="text-green-500 font-semibold">98% Match</span>
                  <span class="border border-gray-500 px-1 rounded">HD</span>
                  <span>{{ movie.first_air_date?.split('-')[0] }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Right Arrow -->
      <div class="h-full">
        <button 
          @click="scrollRight" 
          class="absolute right-0 z-2000 p-2 bg-black bg-opacity-50 text-white rounded-full hover:bg-opacity-75 transition hidden sm:flex"
        >
          <ChevronRightIcon class="h-6 w-6" />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, defineProps } from "vue";
import type { Movie, TvShows } from "../Services/DataProvider";
import { useRouter } from "vue-router";
import ChevronLeftIcon from "vue-material-design-icons/ChevronLeft.vue";
import ChevronRightIcon from "vue-material-design-icons/ChevronRight.vue";
import PlayIcon from "vue-material-design-icons/Play.vue";
import PlusIcon from "vue-material-design-icons/Plus.vue";
import InformationIcon from "vue-material-design-icons/Information.vue";

// Props with strict typing
const props = defineProps<{
  title: string;
  card_data: TvShows[];
}>();

const router = useRouter();
const cardRef = ref<HTMLElement | null>(null);

const navigateToMovie = (id: number) => {
  router.push({ 
    name: "TvDetails", 
    params: { id },
    query: { modal: 'true' }
  });
};

const playShow = (show: TvShows) => {
  console.log('Play show:', show.name);
};

const addToList = (show: TvShows) => {
  console.log('Add to list:', show.name);
};

const showMoreInfo = (show: TvShows) => {
  navigateToMovie(show.id);
};

// Scrolling Functionality
const scrollLeft = () => {
  if (cardRef.value) cardRef.value.scrollBy({ left: -300, behavior: "smooth" });
};

const scrollRight = () => {
  if (cardRef.value) cardRef.value.scrollBy({ left: 300, behavior: "smooth" });
};

// Enable smooth horizontal scrolling with the mouse wheel
onMounted(() => {
  if (cardRef.value) {
    cardRef.value.addEventListener("wheel", (event) => {
      event.preventDefault();
      cardRef.value!.scrollLeft += event.deltaY;
    });
  }
});
</script>

<style scoped>
/* Hide scrollbar */
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
.no-scrollbar {
  -ms-overflow-style: none;  
  scrollbar-width: none;
}
</style>