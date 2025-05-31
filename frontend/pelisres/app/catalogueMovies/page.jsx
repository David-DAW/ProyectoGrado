"use client";
import { useEffect, useState } from "react";
import {
  getPopularMovies,
  getGenres,
  getPopularMoviesByGenre,
  getPopularTVShows,
  getPopularTVShowsByGenre,
  getTVGenres,
} from "../services/api";
import MovieCard from "../components/MovieCard/movieCard";
import Header from "../sections/Header/HeaderComponent";
import Footer from "../sections/Footer/FooterComponent";
import TVShowCard from "../components/tvshowCard/tvshowCard";

export default function PopularMoviesPage() {
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [loading, setLoading] = useState(false);
  const [contentType, setContentType] = useState("movie");

  useEffect(() => {
    const fetchInitialData = async () => {
      setLoading(true);

      let popular, genreList;

      if (contentType === "movie") {
        [popular, genreList] = await Promise.all([
          getPopularMovies(),
          getGenres(),
        ]);
      } else {
        [popular, genreList] = await Promise.all([
          getPopularTVShows(),
          getTVGenres(),
        ]);
      }

      setMovies(popular);
      setGenres(genreList);
      setLoading(false);
    };

    fetchInitialData();
  }, [contentType]);

  const handleGenreChange = async (genreId) => {
    setSelectedGenre(genreId);
    setLoading(true);

    let filtered;

    if (contentType === "movie") {
      filtered = genreId
        ? await getPopularMoviesByGenre(genreId)
        : await getPopularMovies();
    } else {
      filtered = genreId
        ? await getPopularTVShowsByGenre(genreId)
        : await getPopularTVShows();
    }

    setMovies(filtered);
    setLoading(false);
  };

  return (
    <div className="bg-gradient-to-r from-amber-600 to-amber-950 min-h-screen">
      <Header />

      <div className="flex justify-center gap-4 mt-8">
        <button
          onClick={() => {
            setContentType("movie");
            setSelectedGenre(null);
          }}
          className={`px-5 py-2 rounded-full font-semibold ${
            contentType === "movie"
              ? "bg-white text-black"
              : "bg-black text-white"
          } hover:bg-amber-500 transition`}
        >
          Películas
        </button>
        <button
          onClick={() => {
            setContentType("tv");
            setSelectedGenre(null);
          }}
          className={`px-5 py-2 rounded-full font-semibold ${
            contentType === "tv" ? "bg-white text-black" : "bg-black text-white"
          } hover:bg-amber-500 transition`}
        >
          Series
        </button>
      </div>

      <div className="md:hidden px-4 py-4 w-full mx-auto my-10">
        <select
          value={selectedGenre || ""}
          onChange={(e) => handleGenreChange(e.target.value || null)}
          className="w-full p-3 text-black rounded-xl border-2 border-amber-400
               bg-white shadow-md focus:outline-none focus:ring-2 focus:ring-amber-500
               transition duration-300 appearance-none cursor-pointer"
          aria-label="Seleccionar género"
        >
          <option value="">Todos</option>
          {genres.map((genre) => (
            <option key={genre.id} value={genre.id}>
              {genre.name}
            </option>
          ))}
        </select>
      </div>

      <div className="hidden md:flex flex-wrap gap-3 justify-center mb-6 w-3/4 mx-auto my-10">
        <button
          onClick={() => handleGenreChange(null)}
          className={`px-4 py-2 rounded-full cursor-pointer ${
            selectedGenre === null
              ? "bg-white text-black"
              : "bg-black text-white"
          } hover:bg-amber-500 transition`}
        >
          Todos
        </button>
        {genres.map((genre) => (
          <button
            key={genre.id}
            onClick={() => handleGenreChange(genre.id)}
            className={`px-4 py-2 rounded-full cursor-pointer ${
              selectedGenre === genre.id
                ? "bg-white text-black"
                : "bg-black text-white"
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
            movies.map((item) =>
              contentType === "movie" ? (
                <MovieCard key={item.id} movie={item} />
              ) : (
                <TVShowCard key={item.id} tvShow={item} />
              )
            )
          ) : (
            <p className="col-span-full text-center">
              No hay {contentType === "movie" ? "películas" : "series"}{" "}
              disponibles.
            </p>
          )}
        </div>
      )}
      <Footer />
    </div>
  );
}
