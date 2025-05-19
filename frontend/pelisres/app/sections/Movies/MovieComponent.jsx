"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { getPopularMovies } from "../../services/api";
import MovieCard from "../../components/MovieCard/movieCard";

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
      <h2 className="text-2xl font-bold text-white mb-4">Películas Populares</h2>
      <div className="grid gap-6 md:grid-cols-3 lg:grid-cols-4">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
};


export default Movies;
