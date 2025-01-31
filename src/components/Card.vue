<template>
  <div class="titlecard mt-[50px] mb-[30px]">
    <!-- Dynamic title from props -->
    <h2 class="mb-[8px] text-xl font-bold text-white">{{ title }}</h2>
    <div class="card-list flex gap-4 overflow-x-auto pb-2" ref="cardRef">
      <div 
        v-for="(movie, index) in card_data" 
        :key="index" 
        @click="navigateToMovie(movie.id)"
        class="card relative flex-shrink-0">
        <img 
          class="rounded-md cursor-pointer w-[280px] h-[160px] object-cover" 
          :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`" 
          :alt="movie.title" 
        />
        <p class="mt-2 absolute bottom-[10px] right-[10px] text-white text-sm bg-black bg-opacity-60 px-2 py-1 rounded-md">
          {{ movie.title }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, defineProps } from "vue";
import type { Movie } from "../Services/DataProvider"; // Importing the Movie interface
import { useRouter } from "vue-router";

// Props with strict typing
const props = defineProps<{
  title: string;
  card_data: Movie[];
}>();

const router=useRouter()

const cardRef = ref<HTMLElement | null>(null);


const navigateToMovie = (id: number) => {
  router.push({ name: "MovieDetails", params: { id } });
};


// Enable horizontal scrolling with mouse wheel
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
.card-list::-webkit-scrollbar {
  display: none; /* Hide scrollbar */
}
</style>
