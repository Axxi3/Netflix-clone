<template>
  <div class="mb-8 mt-12">
    <!-- Dynamic title from props -->
    <h2 class="mb-2 text-xl font-bold text-white px-4">{{ title }}</h2>
    <div class="relative flex items-center w-full">
      <!-- Left Navigation Arrow -->
      <button 
        @click="scrollLeft" 
        class="absolute left-0 z-20 p-2 bg-black/50 text-white rounded-full hover:bg-black/75 transition hidden sm:flex"
        aria-label="Scroll left"
      >
        <ChevronLeftIcon class="h-6 w-6" />
      </button>

      <!-- Cards Container -->
      <div 
        ref="cardsContainer" 
        class="flex gap-4 overflow-x-auto overflow-y-visible scroll-smooth py-6 px-2 w-full mx-2 
               no-scrollbar"
      >
        <!-- Individual Card -->
        <div 
          v-for="(show, index) in card_data" 
          :key="index" 
          class="relative flex-shrink-0 cursor-pointer group
                 w-[180px] sm:w-[220px] md:w-[280px]
                 transition-all duration-300 ease-out origin-center
                 hover:scale-125 hover:z-50 overflow-visible"
        >
          <div 
            @click="navigateToShow(show.id)"
            class="relative rounded-md overflow-hidden shadow-lg transition-all duration-300"
          >
            <!-- Show Thumbnail -->
            <div class="relative w-full aspect-video">
              <img 
                class="absolute inset-0 w-full h-full object-cover rounded-md" 
                :src="`https://image.tmdb.org/t/p/w500${show.backdrop_path}`" 
                :alt="show.name" 
              />
            </div>

            <!-- Hover Overlay -->
            <div 
              class="absolute inset-0 bg-black/75 opacity-0 group-hover:opacity-100 
                     transition-opacity duration-300 flex flex-col justify-end p-4"
            >
              <!-- Background Blur Effect -->
              <div 
                class="absolute inset-0 bg-cover bg-center opacity-30 blur-md" 
                :style="{ backgroundImage: `url('https://image.tmdb.org/t/p/w500${show.backdrop_path}')` }"
              ></div>

              <!-- Control Buttons -->
              <div class="relative z-10 flex justify-between items-center mb-3">
                <div class="flex space-x-2">
                  <button 
                    @click.stop="playShow(show)"
                    class="bg-white text-black p-2 rounded-full hover:bg-gray-200 transition"
                    aria-label="Play"
                  >
                    <PlayIcon class="h-5 w-5"/>
                  </button>
                  <button 
                    @click.stop="addToList(show)"
                    class="border border-white text-white p-2 rounded-full hover:bg-white/20 transition"
                    aria-label="Add to list"
                  >
                    <PlusIcon class="h-5 w-5"/>
                  </button>
                </div>
                <button 
                  @click.stop="showMoreInfo(show)"
                  class="border border-white text-white p-2 rounded-full hover:bg-white/20 transition"
                  aria-label="More information"
                >
                  <InformationIcon class="h-5 w-5"/>
                </button>
              </div>

              <!-- Show Info -->
              <div class="relative z-10 text-white">
                <h3 class="text-sm sm:text-base font-bold mb-1 leading-tight">{{ show.name }}</h3>
                <div class="flex items-center space-x-2 text-xs sm:text-sm">
                  <span class="text-green-500 font-semibold">98% Match</span>
                  <span class="border border-gray-500 px-1 rounded">HD</span>
                  <span>{{ show.first_air_date?.split('-')[0] }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Right Navigation Arrow -->
      <button 
        @click="scrollRight" 
        class="absolute right-0 z-20 p-2 bg-black/50 text-white rounded-full hover:bg-black/75 transition hidden sm:flex"
        aria-label="Scroll right"
      >
        <ChevronRightIcon class="h-6 w-6" />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import type { TvShows } from "../Services/DataProvider";
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
const cardsContainer = ref<HTMLElement | null>(null);
const windowWidth = ref(window.innerWidth);

// Check if mobile based on screen width
const isMobile = computed(() => windowWidth.value < 768);

// Update navigation to use TV details route
const navigateToShow = (id: number) => {
  if (isMobile.value) {
    router.push({ name: 'Tvdetails', params: { id } }); // Full page for mobile
  } else {
    router.push({ name: 'Tvdetails', params: { id }, query: { modal: 'true' } }); // Modal for desktop
  }
};

// Action handlers
const playShow = (show: TvShows) => {
  console.log('Playing:', show.name);
  // If you have video keys in your data, you can navigate to video player
  if (show.videoKey) {
    router.push(`/watch/${show.videoKey}`);
  }
};

const addToList = (show: TvShows) => {
  console.log('Added to list:', show.name);
};

const showMoreInfo = (show: TvShows) => {
  navigateToShow(show.id);
};

// Scroll handlers with improved scroll distance calculation
const scrollLeft = () => {
  if (cardsContainer.value) {
    const cardWidth = cardsContainer.value.querySelector('.group')?.clientWidth || 280;
    cardsContainer.value.scrollBy({ left: -cardWidth * 2, behavior: "smooth" });
  }
};

const scrollRight = () => {
  if (cardsContainer.value) {
    const cardWidth = cardsContainer.value.querySelector('.group')?.clientWidth || 280;
    cardsContainer.value.scrollBy({ left: cardWidth * 2, behavior: "smooth" });
  }
};

// Handle resize for mobile detection
const handleResize = () => {
  windowWidth.value = window.innerWidth;
};

// Mouse wheel horizontal scrolling
onMounted(() => {
  window.addEventListener('resize', handleResize);
  
  if (cardsContainer.value) {
    cardsContainer.value.addEventListener("wheel", (event) => {
      event.preventDefault();
      cardsContainer.value!.scrollLeft += event.deltaY;
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