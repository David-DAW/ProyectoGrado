import axios from "axios";

const API_KEY = "4bb2228842327719649b24fa41b3d9c3";
const BASE_URL = "https://api.themoviedb.org/3";

export const getPopularMovies = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/movie/popular?api_key=${API_KEY}&language=es-ES`);
    return response.data.results;
  } catch (error) {
    console.error("Error al obtener películas populares:", error);
    return [];
  }
};

export const getMovieDetails = async (id) => {
  const res = await fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=es`);
  const data = await res.json();
  return data;
};

export async function getSimilarMovies(id) {
  const res = await fetch(
    `${BASE_URL}/movie/${id}/recommendations?api_key=${API_KEY}&language=es-ES`
  );
  const data = await res.json();
  return data.results || [];
}

export async function searchMovies(query) {
  const res = await fetch(
    `${BASE_URL}/search/multi?query=${encodeURIComponent(query)}&api_key=${API_KEY}&language=es-ES`
  );
  const data = await res.json();
  return data.results || [];
}

export const getGenres = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/genre/movie/list?api_key=${API_KEY}&language=es-ES`);
    return response.data.genres;
  } catch (error) {
    console.error("Error al obtener géneros:", error);
    return [];
  }
};

export const getPopularMoviesByGenre = async (genreId) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=es-ES&with_genres=${genreId}`
    );
    return response.data.results;
  } catch (error) {
    console.error("Error al obtener películas por género:", error);
    return [];
  }
};

export const getPopularTVShows = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/tv/popular?api_key=${API_KEY}&language=es-ES`);
    return response.data.results;
  } catch (error) {
    console.error("Error al obtener series populares:", error);
    return [];
  }
};

export const getTVShowDetails = async (id) => {
  const res = await fetch(`${BASE_URL}/tv/${id}?api_key=${API_KEY}&language=es`);
  const data = await res.json();
  return data;
};

export async function getSimilarTVShows(id) {
  const res = await fetch(
    `${BASE_URL}/tv/${id}/recommendations?api_key=${API_KEY}&language=es-ES`
  );
  const data = await res.json();
  return data.results || [];
}

export async function searchTVShows(query) {
  const res = await fetch(
    `${BASE_URL}/search/tv?query=${encodeURIComponent(query)}&api_key=${API_KEY}&language=es-ES`
  );
  const data = await res.json();
  return data.results || [];
}

export const getTVGenres = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/genre/tv/list?api_key=${API_KEY}&language=es-ES`);
    return response.data.genres;
  } catch (error) {
    console.error("Error al obtener géneros de series:", error);
    return [];
  }
};

export const getPopularTVShowsByGenre = async (genreId) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/discover/tv?api_key=${API_KEY}&language=es-ES&with_genres=${genreId}`
    );
    return response.data.results;
  } catch (error) {
    console.error("Error al obtener series por género:", error);
    return [];
  }
};