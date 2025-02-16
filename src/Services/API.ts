import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import apiClient from './Config';
import { Movie, TvShows,MovieDetails, VideoDetails, TVShowDetails, Episode } from './DataProvider';




const requests = async <T>(config: AxiosRequestConfig): Promise<T | null> => {
  try {
    const response: AxiosResponse<T> = await apiClient.request(config);
    return response.data;
  } catch (error: any) {
    console.error('API request error:', error?.response?.data || error.message);
    return null;
  }
};

export const getNowPlayingMovies = async (): Promise<Movie[]> => {
  const data = await requests<{ results: Movie[] }>({
    url: '/movie/now_playing',
    method: 'GET',
    params: { language: 'en-US', page: 1 }
  });
  return data?.results || [];
};

export const getPopularMovies = async (): Promise<Movie[]> => {
  const data = await requests<{ results: Movie[] }>({
    url: '/movie/popular',
    method: 'GET',
    params: { language: 'en-US', page: 1 }
  });
  return data?.results || [];
};



export const getTopRatedTv = async (): Promise<TvShows[]> => {
  const data = await requests<{ results: TvShows[] }>({
    url: '/tv/top_rated',
    method: 'GET',
    params: { language: 'en-US', page: 1 }
  });
  return data?.results || [];
};

export const AiringToday = async (): Promise<TvShows[]> => {
  const data = await requests<{ results: TvShows[] }>({
    url: '/tv/airing_today',
    method: 'GET',
    params: { language: 'en-US', page: 1 }
  });
  return data?.results || [];
};

export const getTrailers = async (id:string, type:string): Promise<VideoDetails[]> => {
  const data = await requests<{ results: VideoDetails[] }>({
    url:`/${type}/${id}/videos`,
    method: 'GET',
    params: { language: 'en-US', page: 1 }
  });
  return data?.results || [];
};

export const getSimilarMovies = async (id:string): Promise<Movie[]> => {
  const data = await requests<{ results: Movie[] }>({
    url:`/movie/${id}/similar`,
    method: 'GET',
    params: { language: 'en-US', page: 1 }
  });
  return data?.results || [];
};


export const getSimilarTvShows = async (id:string): Promise<TvShows[]> => {
  const data = await requests<{ results: TvShows[] }>({
    url:`/tv/${id}/similar`,
    method: 'GET',
    params: { language: 'en-US', page: 1 }
  });
  return data?.results || [];
};


export const getMovieDetails = async (movieID: number): Promise<MovieDetails | null> => {
  try {
    const data = await requests<MovieDetails>({
      url: `/movie/${movieID}`,
      method: 'GET',
      params: { language: 'en-US' },
    });
    return data || null; // Return the movie object instead of an array
  } catch (error) {
    console.error("Failed to fetch movie details:", error);
    return null; // Handle errors gracefully
  }
};


export const getTvSeriesDetails = async (tvID: number): Promise<TVShowDetails | null> => {
  try {
    const data = await requests<TVShowDetails>({
      url: `/tv/${tvID}`,
      method: 'GET',
      params: { language: 'en-US' },
    });
    return data || null; // Return the movie object instead of an array
  } catch (error) {
    console.error("Failed to fetch movie details:", error);
    return null; // Handle errors gracefully
  }
};

export const getTvEpisodesDetails = async (
  tvID: number,
  season_number: string
): Promise<Episode[]> => {
  try {
    const data = await requests<{ episodes: Episode[] }>({
      url: `/tv/${tvID}/season/${season_number}`,
      method: "GET",
      params: { language: "en-US" },
    });
    return data?.episodes || []; // Ensure it returns an array
  } catch (error) {
    console.error("Failed to fetch TV episodes:", error);
    return []; // Return an empty array on error
  }
};



export const getEpisodeTrailer = async (
  seriesId: string,
  seasonNumber: string,
  episodeNumber: string
): Promise<string | null> => {
  try {
    const data = await requests<{ results?: VideoDetails[] }>({
      url: `/tv/${seriesId}/season/${seasonNumber}/episode/${episodeNumber}/videos`,
      method: "GET",
      params: { language: "en-US" },
    });

    // Ensure results exist and have at least one entry
    if (data?.results && data.results.length > 0) {
      console.log(data)
      return data.results[0].key;
      
    } else {
      console.warn("No trailer found.");
      return null;
    }
  } catch (error) {
    console.error("Error fetching episode trailer:", error);
    return null;
  }
};



export { requests };
