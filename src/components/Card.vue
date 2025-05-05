<template>
  <div class="w-full px-4 mb-12 relative">
    <!-- Row Title -->
    <h2 class="text-xl font-bold text-white mb-2 px-2">{{ title }}</h2>

    <!-- Carousel Container -->
    <div class="relative w-full h-[200px]">
      <!-- Left Navigation Button -->
      <button 
        @click="scrollLeft" 
        class="absolute left-0 top-1/2 -translate-y-1/2 z-40 p-2 bg-black/50 text-white rounded-full hover:bg-black/75 transition transform hover:scale-110 hidden md:flex"
        aria-label="Scroll left"
      >
        <ChevronLeftIcon class="h-6 w-6" />
      </button>

      <!-- Cards Container -->
      <div 
        ref="sliderRef" 
        class="flex gap-2 overflow-visible scrollbar-hide py-6 px-2 scroll-smooth"
      >
        <!-- Movie Card Wrapper -->
        <div 
          v-for="(movie, index) in movies" 
          :key="movie.id" 
          class="relative flex-shrink-0 transition-all overflow-visible duration-300 transform group"
          :class="{'z-50': hoveredIndex === index}"
          @mouseenter="hoveredIndex = index" 
          @mouseleave="hoveredIndex = null"
          :style="{ width: cardWidth }"
        >
          <!-- Base Card -->
          <div 
            class="bg-zinc-900 rounded-md overflow-hidden shadow-lg  hover:-top-20 hover:absolute z-99 transform "
            :class="{'shadow-2xl': hoveredIndex === index}"
          >
            <img
              class="w-full object-cover transition-all duration-300"
              :class="{'h-36': hoveredIndex !== index, 'h-52': hoveredIndex === index}"
              :src="`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`"
              :alt="movie.title"
            />
            
            <!-- Card Content (Only shown on hover) -->
            <div 
              v-if="hoveredIndex === index"
              class="p-4 bg-zinc-900 text-white"
            >
              <div class="flex gap-2 mb-3">
                <button 
                  @click.stop="playMovie(movie)" 
                  class="flex items-center justify-center w-10 h-10 rounded-full bg-white text-black hover:bg-gray-200 transition"
                >
                  <PlayIcon class="h-6 w-6" />
                </button>
                <button 
                  @click.stop="addToList(movie)" 
                  class="flex items-center justify-center w-10 h-10 rounded-full bg-zinc-800 hover:bg-zinc-700 transition"
                >
                  <PlusIcon class="h-6 w-6" />
                </button>
                <button 
                  @click.stop="likeMovie(movie)" 
                  class="flex items-center justify-center w-10 h-10 rounded-full bg-zinc-800 hover:bg-zinc-700 transition"
                >
                  <ThumbUpIcon class="h-6 w-6" />
                </button>
                <button 
                  @click.stop="showMoreInfo(movie)" 
                  class="flex items-center justify-center w-10 h-10 rounded-full bg-zinc-800 hover:bg-zinc-700 transition ml-auto"
                >
                  <ChevronDownIcon class="h-6 w-6" />
                </button>
              </div>
              <h3 class="font-bold text-lg mb-1 line-clamp-1">{{ movie.title }}</h3>
              <p class="text-sm text-gray-300">Witty • Heartfelt • Drama</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Right Navigation Button -->
      <button 
        @click="scrollRight" 
        class="absolute right-0 top-1/2 -translate-y-1/2 z-40 p-2 bg-black/50 text-white rounded-full hover:bg-black/75 transition transform hover:scale-110 hidden md:flex"
        aria-label="Scroll right"
      >
        <ChevronRightIcon class="h-6 w-6" />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';
import ChevronLeftIcon from 'vue-material-design-icons/ChevronLeft.vue';
import ChevronRightIcon from 'vue-material-design-icons/ChevronRight.vue';
import PlayIcon from 'vue-material-design-icons/Play.vue';
import PlusIcon from 'vue-material-design-icons/Plus.vue';
import ThumbUpIcon from 'vue-material-design-icons/ThumbUp.vue';
import ChevronDownIcon from 'vue-material-design-icons/ChevronDown.vue';

// Props
const props = defineProps<{
  title: string;
  card_data: { 
    id: number;
    title: string;
    backdrop_path: string;
    release_date?: string;
  }[];
}>();

// Data
const movies = props.card_data;
const router = useRouter();
const sliderRef = ref<HTMLElement | null>(null);
const hoveredIndex = ref<number | null>(null);

// Responsive card width
const cardWidth = computed(() => {
  return 'clamp(160px, 20vw, 280px)';
});

// Scroll handlers
const scrollLeft = () => {
  if (!sliderRef.value) return;
  
  const scrollAmount = sliderRef.value.clientWidth * 0.75;
  sliderRef.value.scrollBy({
    left: -scrollAmount,
    behavior: 'smooth'
  });
};

const scrollRight = () => {
  if (!sliderRef.value) return;
  
  const scrollAmount = sliderRef.value.clientWidth * 0.75;
  sliderRef.value.scrollBy({
    left: scrollAmount,
    behavior: 'smooth'
  });
};

// Action handlers
const playMovie = (movie: any) => {
  console.log('Playing:', movie.title);
  // Implementation for play functionality
};

const addToList = (movie: any) => {
  console.log('Added to list:', movie.title);
  // Implementation for add to list functionality
};

const likeMovie = (movie: any) => {
  console.log('Liked:', movie.title);
  // Implementation for like functionality
};

const showMoreInfo = (movie: any) => {
  router.push({
    path: `movie/${movie.id}`,
    query: { modal: 'true' }
  });
};

// Wheel event for horizontal scrolling
const handleWheel = (event: WheelEvent) => {
  if (!sliderRef.value) return;
  event.preventDefault();
  sliderRef.value.scrollLeft += event.deltaY;
};

// Lifecycle hooks
onMounted(() => {
  // Enable horizontal scrolling with mouse wheel
  sliderRef.value?.addEventListener('wheel', handleWheel, { passive: false });
});

onUnmounted(() => {
  // Clean up event listener
  sliderRef.value?.removeEventListener('wheel', handleWheel);
});
</script>

<style scoped>
/* Hide scrollbar for Chrome, Safari and Opera */
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
.scrollbar-hide {
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
}
</style>