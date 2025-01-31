<template>
    <div class="navbar w-[100%]  py-[20px] md:px-[6%] px-[4%] flex justify-between fixed text-[14px] text-[#e5e5e5] z-10">
        <div class="navbar-left flex items-center gap-[50px] ">
            <img src="../assets/logo.png" alt="" class="lg:w-[100px] w-[100px] cursor-pointer"   @click="gohome">
            <ul class="lg:flex hidden gap-[25px] cursor-pointer list-none">
               <li>Home</li>
               <li>TV Shows</li>
               <li>Movies</li>
               <li>New & Popular</li>
               <li>My List</li>
               <li>Browse by Language</li>
            </ul>
        </div>
        <div class="navbar-right flex md:gap-[20px] gap-[15px] items-center"> 
            <img :src="search" alt="Search" class="icons w-[20px] cursor-pointer">
            <p class="hidden lg:flex">Children</p>
            <img :src="bell" alt="Search" class="icons w-[20px] cursor-pointer" >
            <div class="navbar-profile flex items-center relative gap-[10px] cursor-pointer">
                <img :src="profile" alt="Search" class="profile rounded-sm w-[32px]">
                <img :src="caret_icon" alt="Search" class="profile">
                
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import search from '../assets/search_icon.svg'
     import bell from '../assets/bell_icon.svg'
     import profile from '../assets/profile_img.png'
     import caret_icon from '../assets/caret_icon.svg'
     import { useRouter } from 'vue-router';

     const router=useRouter()
     const gohome=()=>{
        router.push('/')
     }
</script>

<style  scoped>
.navbar{
    background-image: linear-gradient(180deg, rgba(0,0,0,0.7) 10%, transparent);

}




</style>
