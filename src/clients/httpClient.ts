import axios, { AxiosInstance } from 'axios';

const baseURL = import.meta.env.VITE_APP_TMDB_BASE_URL;

export const httpClient: AxiosInstance = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${import.meta.env.VITE_APP_TMDB_ACCESS_TOKEN}`,
  },
});
