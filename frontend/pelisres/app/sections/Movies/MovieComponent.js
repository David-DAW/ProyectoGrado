"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { getPopularMovies } from "../../services/api";

const Movies = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      const popularMovies = await getPopularMovies();
      setMovies(popularMovies.slice(0, 8));
    };

    fetchMovies();
  }, []);

  return (
    <div className="p-6 w-3/4 flex flex-col justify-center mx-auto">
      <h2 className="text-2xl font-bold text-white mb-4">
        Películas Populares
      </h2>
      <div className="grid gap-6 md:grid-cols-3 lg:grid-cols-4">
        {movies.map((movie) => (
          <div key={movie.id} className="bg-gray-900 p-4 rounded shadow-lg">
            <Link href={`/movies/${movie.id}`} key={movie.id}>
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="rounded mb-2"
              />
              <h3 className="text-lg font-semibold text-white">
                {movie.title}
              </h3>
              <p className="text-gray-400">⭐ {movie.vote_average.toFixed(1)}</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Movies;
