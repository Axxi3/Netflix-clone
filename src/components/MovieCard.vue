<template>
    <div 
      class="bg-zinc-900 rounded-md overflow-hidden shadow-lg hover:-top-20 hover:absolute z-50 transform transition-all duration-300"
      :class="{ 'shadow-2xl': hovered }"
    >
      <!-- Movie image -->
      <img
        class="w-full object-cover"
        :class="{ 'h-36': !hovered, 'h-52': hovered }"
        :src="`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`"
        :alt="movie.title"
      />
  
      <!-- Hover content -->
      <div v-if="hovered" class="p-4 bg-zinc-900 text-white">
        <div class="flex gap-2 mb-3">
          <button
            @click.stop="$emit('play', movie)"
            class="flex items-center justify-center w-10 h-10 rounded-full bg-white text-black hover:bg-gray-200 transition"
          >
            <PlayIcon class="w-6 h-6" />
          </button>
          <button
            @click.stop="$emit('add', movie)"
            class="flex items-center justify-center w-10 h-10 rounded-full bg-zinc-800 hover:bg-zinc-700 transition"
          >
            <PlusIcon class="w-6 h-6" />
          </button>
          <button
            @click.stop="$emit('like', movie)"
            class="flex items-center justify-center w-10 h-10 rounded-full bg-zinc-800 hover:bg-zinc-700 transition"
          >
            <ThumbUpIcon class="w-6 h-6" />
          </button>
          <button
            @click.stop="$emit('info', movie)"
            class="flex items-center justify-center w-10 h-10 rounded-full bg-zinc-800 hover:bg-zinc-700 transition ml-auto"
          >
            <ChevronDownIcon class="w-6 h-6" />
          </button>
        </div>
        <h3 class="font-bold text-lg mb-1 line-clamp-1">{{ movie.title }}</h3>
        <p class="text-sm text-gray-300">Witty • Heartfelt • Drama</p>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { defineProps, defineEmits } from 'vue';
  
  // Icon imports
  import PlayIcon from 'vue-material-design-icons/Play.vue';
  import PlusIcon from 'vue-material-design-icons/Plus.vue';
  import ThumbUpIcon from 'vue-material-design-icons/ThumbUp.vue';
  import ChevronDownIcon from 'vue-material-design-icons/ChevronDown.vue';
  
  // Props and emits
  defineProps<{
    movie: any;
    hovered: boolean;
  }>();
  
  defineEmits(['play', 'add', 'like', 'info']);
  </script>
  