"use client";
import { useEffect, useState } from "react";
import {
  getPopularMovies,
  getGenres,
  getPopularMoviesByGenre,
} from "../services/api"
import MovieCard from "../components/MovieCard/movieCard";
import Header from "../sections/Header/HeaderComponent";
import Footer from "../sections/Footer/FooterComponent";

export default function PopularMoviesPage() {
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchInitialData = async () => {
      setLoading(true);
      const [popular, genreList] = await Promise.all([
        getPopularMovies(),
        getGenres(),
      ]);
      setMovies(popular);
      setGenres(genreList);
      setLoading(false);
    };

    fetchInitialData();
  }, []);

  const handleGenreChange = async (genreId) => {
    setSelectedGenre(genreId);
    setLoading(true);
    const filteredMovies = genreId
      ? await getPopularMoviesByGenre(genreId)
      : await getPopularMovies();
    setMovies(filteredMovies);
    setLoading(false);
  };

  return (
    <div className="bg-gradient-to-r from-amber-600 to-amber-950 min-h-screen">
      <Header />

      <div className="flex flex-wrap gap-3 justify-center mb-6 w-3/4 mx-auto my-10">
        <button
          onClick={() => handleGenreChange(null)}
          className={`px-4 py-2 rounded-full cursor-pointer ${
            selectedGenre === null ? "bg-white text-black" : "bg-black text-white"
          } hover:bg-amber-500 transition`}
        >
          Todos
        </button>
        {genres.map((genre) => (
          <button
            key={genre.id}
            onClick={() => handleGenreChange(genre.id)}
            className={`px-4 py-2 rounded-full cursor-pointer ${
              selectedGenre === genre.id ? "bg-white text-black" : "bg-black text-white"
            } hover:bg-amber-500 transition`}
          >
            {genre.name}
          </button>
        ))}
      </div>

      {loading ? (
        <p className="text-center text-xl">Cargando películas...</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 w-3/4 mx-auto my-10">
          {movies.length > 0 ? (
            movies.map((movie) => <MovieCard key={movie.id} movie={movie} />)
          ) : (
            <p className="col-span-full text-center">No hay películas disponibles.</p>
          )}
        </div>
      )}
      <Footer />
    </div>
  );
}
