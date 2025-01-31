<template>
   
    <div class="relative inline-block">
      <button
        @click="toggleDropdown"
        class="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition flex items-center"
      >
        {{ selectedOption || "Select an Option" }}
        <svg
          class="w-4 h-4 ml-2 transition-transform"
          :class="{ 'rotate-180': isOpen }"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clip-rule="evenodd"
          />
        </svg>
      </button>
  
      <div
        v-if="isOpen"
        class="absolute mt-2 w-48 bg-black text-white border border-gray-700 rounded-md shadow-lg z-10"
      >
        <ul class="py-2">
          <li
            v-for="option in options"
            :key="option"
            @click="selectOption(option)"
            class="px-4 py-2 cursor-pointer hover:bg-gray-800"
          >
            {{ option }}
          </li>
        </ul>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, defineProps, defineEmits } from "vue";
  
  const props = defineProps({
    options: Array,
  });
  
  const emit = defineEmits(["optionSelected"]);
  
  const isOpen = ref(false);
  const selectedOption = ref("");
  
  const toggleDropdown = () => {
    isOpen.value = !isOpen.value;
  };
  
  const selectOption = (option) => {
    selectedOption.value = option;
    emit("optionSelected", option);
    isOpen.value = false;
  };
  </script>
  