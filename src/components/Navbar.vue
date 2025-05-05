<template>
  <div class="navbar w-full py-5 md:px-[6%] px-[4%] flex justify-between fixed text-sm text-[#e5e5e5] z-10">
    <!-- Left section -->
    <div class="navbar-left flex items-center gap-[50px]">
      <img
        src="../assets/logo.png"
        alt="logo"
        class="lg:w-[100px] w-[100px] cursor-pointer"
        @click="gohome"
      />
      <ul class="lg:flex hidden gap-[25px] cursor-pointer list-none">
        <li>Home</li>
        <li>TV Shows</li>
        <li>Movies</li>
        <li>New & Popular</li>
        <li>My List</li>
        <li>Browse by Language</li>
      </ul>
    </div>

    <!-- Right section -->
    <div class="navbar-right flex md:gap-[20px] gap-[15px] items-center">
      <!-- Search Icon and Input -->
      <div class="flex items-center gap-2">
        <!-- Toggle between search icon and close (×) -->
        <template v-if="isSearchOpen">
          <svg
            @click="toggleSearch"
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5 cursor-pointer text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </template>
        <template v-else>
          <img
            @click="toggleSearch"
            :src="searchIcon"
            alt="Search"
            class="w-5 cursor-pointer"
          />
        </template>

        <!-- Search Input -->
        <input
          v-if="isSearchOpen"
          v-model="searchText"
          @keyup.enter="submitSearch"
          type="text"
          placeholder="Titles, people, genres"
          class="bg-transparent border-b border-white outline-none text-white placeholder-gray-300 w-48 transition-all duration-300"
        />
      </div>

      <p class="hidden lg:flex">Children</p>
      <img :src="bell" alt="Bell" class="w-[20px] cursor-pointer" />
      <div class="navbar-profile flex items-center relative gap-[10px] cursor-pointer">
        <img :src="profile" alt="Profile" class="rounded-sm w-[32px]" />
        <img :src="caret_icon" alt="Caret" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';

// Assets
import searchIcon from '../assets/search_icon.svg';
import bell from '../assets/bell_icon.svg';
import profile from '../assets/profile_img.png';
import caret_icon from '../assets/caret_icon.svg';

// Router
const router = useRouter();
const gohome = () => {
  router.push('/');
};

// State
const isSearchOpen = ref(false);
const searchText = ref('');

const toggleSearch = () => {
  isSearchOpen.value = !isSearchOpen.value;
};

const submitSearch = () => {
  if (searchText.value.trim()) {
    router.push({ name: 'search', query: { q: searchText.value.trim() } });
    isSearchOpen.value = false;
    searchText.value = '';
  }
};
</script>

<style scoped>
.navbar {
  background-image: linear-gradient(180deg, rgba(0, 0, 0, 0.7) 10%, transparent);
}
</style>
