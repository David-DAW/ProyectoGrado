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
    `${BASE_URL}/search/movie?query=${encodeURIComponent(query)}&api_key=${API_KEY}&language=es-ES`
  );
  const data = await res.json();
  return data.results || [];
}
