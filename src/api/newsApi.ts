import axios from "axios";

const API_KEY = import.meta.env.VITE_NEWS_API_KEY
  ? import.meta.env.VITE_NEWS_API_KEY
  : "c8b3145d5c274d519e48b5eac56dd04e";
const BASE_URL = "https://newsapi.org/v2";

export const fetchNewsFromApi = (category: string, page: number) => {
  const url = `${BASE_URL}/top-headlines?country=us&category=${category}&page=${page}&apiKey=${API_KEY}`;
  return axios.get(url);
};
