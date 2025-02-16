<template>
    <div class="w-screen h-screen flex justify-center items-center bg-black">
      <iframe
        class="w-full h-full"
        :src="`https://www.youtube.com/embed/${$route.params.videoKey}?autoplay=1&mute=0`"
        frameborder="0"
        allowfullscreen
      ></iframe>
    </div>
  </template>
  
  <script setup>
  import { onMounted } from 'vue';
  
  onMounted(() => {
    if (window.innerWidth < 768) {
      screen.orientation.lock('landscape').catch(() => {
        console.warn('Screen orientation lock not supported');
      });
    }
  });
  </script>
  
  <style scoped>
 
  </style>
  