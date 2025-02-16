<template>

<div v-if="loading" class="loader-container w-full h-screen flex items-center justify-center">
            <img :src="loader" alt="Loading..." class="loader" />
        </div>


        <div v-else class="w-full">

    <div class="hero relative md:h-[90vh] h-[75vh]">
  <img :src="`https://image.tmdb.org/t/p/original${tvDetails?.backdrop_path}`"  class="banner-img w-full h-full object-cover"> 
  <div class="her-caption absolute w-full pl-4 sm:pl-6 lg:pl-8 lg:bottom-[8%] md:bottom-8 bottom-0">
    <div>
                        
                        <h1
                            class="text-xl sm:text-2xl mt-3 md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-4">
                            {{ tvDetails?.original_name }}
                        </h1>
                    </div>
                    <p class="text-sm sm:text-base lg:text-lg max-w-[90%] sm:max-w-[700px] mb-4">
           {{ tvDetails?.overview }}
        </p>
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


<div class="more-cards pl-[2%] ">
          <Traillercards title="Blockbuster Movies" :name="String(tvDetails?.original_name)" :card_data="allVideos"/>
         
      </div>

      <div class="px-4 sm:px-6 lg:px-8">
    <h2 class="text-2xl mb-4 font-semibold">More Details</h2>

    <div class="mt-7 flex flex-col md:flex-row gap-6">
        <div class="flex flex-col gap-1 md:w-1/3">
            <h3 class="opacity-60 text-lg">Watch Offline</h3>
            <p class="text-base">Download and watch everywhere you go.</p>
        </div>
        <div class="flex flex-col gap-1 md:w-1/3">
            <h3 class="opacity-60 text-lg">Genre</h3>
            <p class="text-base">Romantic TV Dramas, TV Dramas, TV Shows Based on Books, Teen TV Shows, TV Comedies, Romantic TV Comedies, Hindi-Language TV Shows</p>
        </div>
        <div class="flex flex-col gap-1 md:w-1/3">
            <h3 class="opacity-60 text-lg">Quote of the movie is...</h3>
            <p class="text-base">{{ tvDetails?.tagline }}</p>
        </div>
    </div>
</div>


<div class="px-4 sm:px-6 lg:px-8 mt-6">
  <h2 class="text-2xl mb-4 font-semibold">Seasons</h2>

  <div class="relative z-10"> 
    <NetflixDropdown :options=getOptions(tvDetails?.seasons) @optionSelected="handleSelection" />

    <div v-if="episodes.length>0" class=" mt-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      <div
  v-for="(episode, index) in episodes"
  :key="index"
  @click="playEpisodeTrailer(tvDetails.id, selectedSeason, episode.episode_number)"
  class="relative overflow-hidden shadow-md transform transition duration-300 hover:scale-105 cursor-pointer"
>
  <img
    :src="`https://image.tmdb.org/t/p/original/${episode.still_path}`"
    :alt="episode.name"
    class="w-full h-auto object-cover"
  />
  <h4 class="text-[18px] my-2">{{ episode.name }}</h4>
  <p class="line-clamp-3 opacity-70">{{ episode.overview }}</p>
</div>
    </div>
  </div>
</div>


<div class="px-4 sm:px-6 lg:px-8 mt-6">
    <h2 class="text-2xl mb-4 font-semibold">More Like This</h2>

    <div v-if="similarTvShows.length>0" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      <div
        v-for="(tv, index) in similarTvShows"
        :key="index"
        class="relative overflow-hidden  shadow-md transform transition duration-300 hover:scale-105"
      >
        <img @click="navigateToMovie(tv.id)" :src="`https://image.tmdb.org/t/p/original/${tv.poster_path}`" :alt="tv.backdrop_path" class="w-full h-auto object-cover">
       
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