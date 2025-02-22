<template>

<div v-if="loading" class="loader-container w-full h-screen flex items-center justify-center">
            <img :src="loader" alt="Loading..." class="loader" />
        </div>


        <div v-else class="w-full">

    <div class="hero relative md:h-[90vh] h-[75vh]">
  <img :src="`https://image.tmdb.org/t/p/original${tvDetails?.backdrop_path}`"  class="banner-img w-full h-full object-cover"> 
  <div class="her-caption flex flex-col gap-6 absolute w-full pl-4 sm:pl-6 lg:pl-8 lg:bottom-[8%] md:bottom-8 bottom-0">
    <div>
                        
                        <h1
                            class="text-xl sm:text-2xl mt-3 md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-4">
                            {{ tvDetails?.name }}
                        </h1>
                    </div>
                 
      <div class="hero-btns flex flex-wrap gap-4 mb-8">
          <button @click="playVideo" class="hover:bg-[#ffffffbf] border py-2 px-4 flex items-center text-sm sm:text-base font-semibold text-black rounded-sm bg-white cursor-pointer gap-2">
              <img class="w-6" :src="Play" alt="Play">Play
          </button>
          <button class="hover:bg-[#6d6d6e66] border py-2 px-4 flex items-center text-sm sm:text-base font-semibold text-white rounded-sm bg-[#6d6d6eb3] cursor-pointer gap-2">
              <img class="w-6" :src="Info" alt="More Info">More Info
          </button>
      </div>

  </div>
</div>




      <div class="px-4 sm:px-6 lg:px-8 flex flex-col pt-5">

      
  

    <div class="mt-4 flex flex-col gap-10">
      <div class="flex w-full  md:flex-row flex-col">
        <div class="flex flex-col gap-1 md:w-[50%]">
            <h3 class="opacity-60 text-lg">Watch Offline</h3>
            <p class="text-base">Download and watch everywhere you go.</p>
        </div>
        <div class="flex flex-col gap-1 md:w-[50%]">
            <h3 class="opacity-60 text-lg">Genre</h3>
            <p class="text-base">Romantic TV Dramas, TV Dramas, TV Shows Based on Books, Teen TV Shows, TV Comedies, Romantic TV Comedies, Hindi-Language TV Shows</p>
        </div>
      </div>
        <div class="flex md:flex-row flex-col w-full gap-5">
          <p class="text-sm sm:text-base lg:text-lg  mb-4 md:w-[50%]">
           {{ tvDetails?.overview }}
        </p>
          <div class="flex flex-col gap-1 md:w-[50%]">
            <h3 class="opacity-60 text-lg">Quote of the movie is...</h3>
            <p class="text-base">{{ tvDetails?.tagline }}</p>
        </div>
       
        </div>
      
        
    </div>
</div>


<div class="px-4 sm:px-6 lg:px-8 mt-6">
  <h2 class="text-2xl mb-4 font-semibold">Seasons</h2>

  <div class="relative z-10"> 
    <NetflixDropdown :options=getOptions(tvDetails?.seasons) @optionSelected="handleSelection" />

    <div v-if="episodes.length>0" class=" mt-3 flex flex-col gap-5 ">
      <div
  v-for="(episode, index) in episodes"
  :key="index"
  @click="playEpisodeTrailer(tvDetails.id, selectedSeason, episode.episode_number)"
  class="flex flex-row items-center w-full py-4 hover:bg-[#101010]  rounded-md overflow-hidden shadow-md transform transition duration-300 hover:scale-105 cursor-pointer"
>
  <div class="text-white text-sm px-4">{{ index + 1 }}</div>
  <img
    :src="`https://image.tmdb.org/t/p/original/${episode.still_path}`"
    :alt="episode.name"
    class="w-[200px] h-auto object-cover "
  />
  <div class="flex flex-col justify-center p-4">
    <h4 class="text-[19px] font-semibold text-white">{{ episode.name }}</h4>
    <p class="text-sm text-gray-400 line-clamp-2">{{ episode.overview }}</p>
  </div>
  <div class="ml-auto px-4 text-gray-400 text-sm">{{ episode.runtime }}m</div>
</div>

    </div>
  </div>
</div>

<div class="more-cards pl-[2%] ">
          <Traillercards title="Blockbuster Movies" :name="String(tvDetails?.name)" :card_data="allVideos"/>
         
      </div>



<div class="px-4 sm:px-6 lg:px-8 mt-6">
    <h2 class="text-2xl mb-4 font-semibold">More Like This</h2>

    <div v-if="similarTvShows.length>0" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        <div 
        v-for="(movie, index) in similarTvShows" 
        :key="index" 
        @click="navigateToMovie(movie.id)"
        
        class="card relative hover:scale-125 hover:z-99 transition duration-500 flex-shrink-0">
        <img 
          class="rounded-md cursor-pointer w-full object-cover" 
          :src="`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`" 
          :alt="movie.name" 
        />
        <p class="mt-2 absolute bottom-[10px] right-[10px] text-white text-sm bg-black bg-opacity-60 px-2 py-1 rounded-md">
          {{ movie.name }}
        </p>

     

     
      </div>
    </div>
  </div>


  <Footer/>

</div>





</template>

<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import loader from "../assets/loader.gif";
import Play from "../assets/play_icon.png";
import Info from "../assets/info_icon.png";
import Footer from "../components/Footer.vue";

import {
  TVShowDetails,
  TvShows,
  VideoDetails,
  Episode,
  Season
} from "../Services/DataProvider";
import {
  getEpisodeTrailer,
  getSimilarTvShows,
  getTrailers,
  getTvEpisodesDetails,
  getTvSeriesDetails
} from "../Services/API";
import NetflixDropdown from "../components/NetflixDropdown.vue";

const route = useRoute();
const router = useRouter();
const tvID = ref<string>(route.params.id as string);
const tvDetails = ref<TVShowDetails | null>(null);
const allVideos = ref<VideoDetails[]>([]);
const similarTvShows = ref<TvShows[]>([]);
const episodes = ref<Episode[]>([]);
const loading = ref<boolean>(true);
const selectedSeason = ref<string>("1"); // Default season



const navigateToMovie = (id: number) => {
  router.push({ name: "Tvdetails", params: { id } });
};

// Fetch Episodes when season changes
watch(selectedSeason, async (newSeason) => {
  if (!tvID.value) return;
  loading.value = true;
  try {
    episodes.value = await getTvEpisodesDetails(Number(tvID.value), newSeason);
    console.log(`Fetched episodes for Season ${newSeason}`, episodes.value);
  } catch (error) {
    console.error("Error fetching episodes:", error);
  } finally {
    loading.value = false;
  }
});

const handleSelection = (selected: string) => {
  console.log("User selected:", selected);
  selectedSeason.value = selected; // Update selected season
};



const playEpisodeTrailer = async (seriesId: string, seasonNumber: string, episodeNumber: string) => {
  try {
    const videoKey = await getEpisodeTrailer(seriesId, seasonNumber.toString(), episodeNumber.toString());

    if (videoKey) {
      router.push(`/watch/${videoKey}`);
    } else {
      console.warn("No trailer found for this episode.");
      alert("Trailer not available for this episode.");
    }
  } catch (error) {
    console.error("Error playing episode trailer:", error);
  }
};

const fetchTvData = async () => {
  try {
    if (!tvID.value) return;
    loading.value = true;

    const [details, videos, similar, episodeList] = await Promise.all([
      getTvSeriesDetails(Number(tvID.value)),
      getTrailers(tvID.value, "tv"),
      getSimilarTvShows(tvID.value),
      getTvEpisodesDetails(Number(tvID.value), selectedSeason.value), // Use selectedSeason
    ]);

    tvDetails.value = details;
    allVideos.value = videos;
    similarTvShows.value = similar;
    episodes.value = episodeList;

    console.log({ details, videos, similar, episodes });
  } catch (error) {
    console.error("Error fetching TV data:", error);
  } finally {
    loading.value = false;
  }
};
const getOptions = (seasons: Season[]) => {
  const seasonNames: string[] = [];
  for (const season of seasons) {
    seasonNames.push(season.name.toLowerCase());
  }
  return seasonNames;
};


const playVideo = () => {
  if (allVideos.value.length > 0) {
    const videoKey = allVideos.value[0].key;
    router.push(`/watch/${videoKey}`);
  }
};

onMounted(() => {
  fetchTvData();
});

</script>


<style lang="scss" scoped>
.banner-img {
  mask-image: linear-gradient(to right, transparent, black 75%),
  linear-gradient(to top from bottom, transparent, black 75%);
             
  -webkit-mask-image: linear-gradient(to right, transparent, black 75%), 
                      
}
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3; /* Limits text to 3 lines */
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>