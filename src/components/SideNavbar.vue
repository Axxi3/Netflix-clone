<template>
 <div class="fixed w-full h-screen bg-black">
    <div  id="SideNav" class="flex x-40 items-center w-[120px] h-screen bg-black relative">
        <img class="absolute top-0 w-[35px] mt-10 ml-10" src="/public/images/netflix-logo.png" alt="">
        <div class="">
          <div class="py-2 mx-10 my-6">
            <Magnify fillColor="#FFFFFF" :size="40" class="cursor-pointer"/>
          </div>
          <div class="py-2 mx-10 my-6 border-b-4 border-b-red-500">
            <HomeOutline fillColor="#FFFFFF" :size="40" class="cursor-pointer"/>
          </div>
          <div class="py-2 mx-10 my-6">
            <TrendingUp fillColor="#FFFFFF" :size="40" class="cursor-pointer"/>
          </div>
          <div class="py-2 mx-10 my-6">
            <MovieOutline fillColor="#FFFFFF" :size="40" class="cursor-pointer"/>
          </div>
          <div class="py-2 mx-10 my-6">
            <Plus fillColor="#FFFFFF" :size="40" class="cursor-pointer"/>
          </div>
        </div>
    </div>
   
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import {onMounted} from 'vue'

import Magnify from 'vue-material-design-icons/Magnify.vue'
import HomeOutline from 'vue-material-design-icons/HomeOutline.vue'
import TrendingUp from 'vue-material-design-icons/TrendingUp.vue'
import Television from 'vue-material-design-icons/Television.vue'
import MovieOutline from 'vue-material-design-icons/MovieOutline.vue'
import Plus from 'vue-material-design-icons/Plus.vue'
import ChevronLeft from 'vue-material-design-icons/ChevronLeft.vue'
</script>

<style lang="scss" scoped>

</style>