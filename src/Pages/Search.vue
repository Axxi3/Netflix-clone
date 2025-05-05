<template>
  <div class="pt-24 px-4 md:px-10">
    <h2 class="text-2xl text-white font-semibold mb-6">
      Search Results for "{{ query }}"
    </h2>

    <div v-if="results.length > 0" class="w-full px-4 mb-12 relative">
      <!-- Carousel Container -->
      <div class="relative w-full h-[230px]">
        <!-- Left Button -->
        <button
          @click="scrollLeft"
          class="absolute left-0 top-1/2 -translate-y-1/2 z-40 p-2 bg-black/50 text-white rounded-full hover:bg-black/75 transition transform hover:scale-110 hidden md:flex"
        >
          <ChevronLeftIcon class="h-6 w-6" />
        </button>

        <!-- Scrollable Row -->
        <div
          ref="sliderRef"
          class="flex gap-2 overflow-visible scrollbar-hide py-6 px-2 scroll-smooth"
        >
          <MovieCard
            v-for="(movie, index) in results"
            :key="movie.id + index"
            :movie="movie"
            :hovered="hoveredIndex === index"
            @mouseenter="hoveredIndex = index"
            @mouseleave="hoveredIndex = null"
            @play="onPlay"
            @add="onAdd"
            @like="onLike"
            @info="onInfo"
          />
        </div>

        <!-- Right Button -->
        <button
          @click="scrollRight"
          class="absolute right-0 top-1/2 -translate-y-1/2 z-40 p-2 bg-black/50 text-white rounded-full hover:bg-black/75 transition transform hover:scale-110 hidden md:flex"
        >
          <ChevronRightIcon class="h-6 w-6" />
        </button>
      </div>
    </div>

    <p v-else class="text-gray-400">No results found.</p>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, onUnmounted } from 'vue';
import { useRoute } from 'vue-router';
import { searchMulti } from '../Services/API';
import type { SearchResult } from '../Services/DataProvider';
import MovieCard from '../components/MovieCard.vue';
import ChevronLeftIcon from 'vue-material-design-icons/ChevronLeft.vue';
import ChevronRightIcon from 'vue-material-design-icons/ChevronRight.vue';

const route = useRoute();
const query = ref<string>((route.query.q as string) || '');
const results = ref<SearchResult[]>([]);
const hoveredIndex = ref<number | null>(null);
const sliderRef = ref<HTMLElement | null>(null);

const fetchResults = async () => {
  if (query.value) {
    const data = await searchMulti(query.value);
    results.value = data ?? [];
  }
};

onMounted(fetchResults);

watch(
  () => route.query.q,
  (newQ) => {
    query.value = (newQ as string) || '';
    fetchResults();
  }
);

// Scroll buttons
const scrollLeft = () => {
  if (sliderRef.value) {
    sliderRef.value.scrollBy({ left: -sliderRef.value.clientWidth * 0.75, behavior: 'smooth' });
  }
};
const scrollRight = () => {
  if (sliderRef.value) {
    sliderRef.value.scrollBy({ left: sliderRef.value.clientWidth * 0.75, behavior: 'smooth' });
  }
};

// Mouse wheel horizontal scroll
const handleWheel = (e: WheelEvent) => {
  if (!sliderRef.value) return;
  e.preventDefault();
  sliderRef.value.scrollLeft += e.deltaY;
};

onMounted(() => {
  sliderRef.value?.addEventListener('wheel', handleWheel, { passive: false });
});
onUnmounted(() => {
  sliderRef.value?.removeEventListener('wheel', handleWheel);
});

// Action handlers
const onPlay = (movie: SearchResult) => console.log('Play', movie);
const onAdd = (movie: SearchResult) => console.log('Add to list', movie);
const onLike = (movie: SearchResult) => console.log('Like', movie);
const onInfo = (movie: SearchResult) => console.log('Info', movie);
</script>

<style scoped>
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
