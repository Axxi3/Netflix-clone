<template>
    <div class="titlecard flex flex-col gap-4 mt-[50px] mb-[30px]">
      <!-- Dynamic title from props -->
      <h2 class="mb-[8px] text-[28px]">{{ title }} | <span class="font-light opacity-70">{{ name }}</span></h2>
      <div class="card-list flex gap-4 mt-2 overflow-x-auto pb-2" ref="cardRef">
        <div 
  v-for="(video, index) in card_data" 
  :key="index" 
  class="video-card relative flex-shrink-0"
>
  <iframe 
    class="w-[450px] h-[250px]" 
    :src="`https://www.youtube.com/embed/${video.key}`" 
    frameborder="0" 
    allowfullscreen
  ></iframe>

  <img 
    :src="play_icon" 
    alt="Play Icon" 
    class="mt-2 h-[50px] w-[50px] p-3 bg-white rounded-full absolute bottom-[10px] left-[10px]"
  />
</div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted, defineProps } from "vue";
  import play_icon from '../assets/play_icon.png'
import { VideoDetails } from "../Services/DataProvider";
  
  // Props to accept title and card data
  const props = defineProps<{
  title: string;
  card_data: VideoDetails[];
  name:string
}>();
  
  const cardRef = ref(null);
  
  // Enable horizontal scrolling with mouse wheel
  onMounted(() => {
    cardRef.value.addEventListener("wheel", (event) => {
      event.preventDefault();
      cardRef.value.scrollLeft += event.deltaY;
    });
  });
  </script>
  
  <style scoped>
  .card-list::-webkit-scrollbar {
    display: none; /* Hide scrollbar */
  }
  </style>
  