import axios from "axios";

const apiClient = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyZTc4NDQyOGQ4ODc3N2UyYjkxMzQyYWEwODUyODJkZiIsIm5iZiI6MTcwNDg5OTUwOS42NTIsInN1YiI6IjY1OWViM2I1MjRiMzMzMDBmMTU3MmUwYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Tw2RS-FimLhy1biNJaISdLsqmMjFddtcvZsdPmpsXiM'
  }
});

export default apiClient