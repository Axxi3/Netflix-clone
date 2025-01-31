<template>
    <div class="footer py-6 px-4 max-w-full my-4 mx-auto text-center md:text-left">
        <div class="icons flex justify-center md:justify-start gap-5 my-6">
            <img :src="facebook_icon" alt="Facebook" class="w-8 md:w-10 cursor-pointer">
            <img :src="instagram_icon" alt="Instagram" class="w-8 md:w-10 cursor-pointer">
            <img :src="twitter_icon" alt="Twitter" class="w-8 md:w-10 cursor-pointer">
            <img :src="youtube_icon" alt="YouTube" class="w-8 md:w-10 cursor-pointer">
        </div>

        <ul class="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm md:text-base">
            <li>Audio Description</li>
            <li>Help Center</li>
            <li>Gift Cards</li>
            <li>Media Center</li>
            <li>Investor Relations</li>
            <li>Jobs</li>
            <li>Terms of Use</li>
            <li>Privacy</li>
            <li>Legal Notice</li>
            <li>Cookie Information</li>
            <li>Contact Us</li>
        </ul>

        <p class="text-gray-600 text-sm mt-6">© Netflix 2005-2025</p>
    </div>
</template>

<script setup>
   import youtube_icon from '../assets/youtube_icon.png'
   import twitter_icon from '../assets/twitter_icon.png'
   import instagram_icon from '../assets/instagram_icon.png'
   import facebook_icon from '../assets/facebook_icon.png'
</script>

<style lang="scss" scoped>
</style>
