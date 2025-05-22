"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { getPopularMovies, getPopularTVShows } from "../../services/api";
import MovieCard from "../../components/MovieCard/movieCard";
import TVShowCard from "@/app/components/tvshowCard/tvshowCard";

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [tvShows, setTvShows] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const popularMovies = await getPopularMovies();
      const popularTV = await getPopularTVShows();

      setMovies(popularMovies.slice(0, 8));
      setTvShows(popularTV.slice(0, 8));

      console.log("POPULAR TV RAW DATA:", popularTV);

    };

    fetchData();
  }, []);

  return (
    <div className="p-6 flex flex-col justify-center mx-auto w-3/4">
      <h2 className="text-2xl font-bold text-white">Películas Populares</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 my-10">
        {movies.length > 0 ? (
          movies.map((movie) => <MovieCard key={`movie-${movie.id}`} movie={movie} />)
        ) : (
          <p className="col-span-full text-center">No hay películas disponibles.</p>
        )}
      </div>

      <h2 className="text-2xl font-bold text-white mt-12">Series Populares</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 my-10">
        {tvShows.length > 0 ? (
          tvShows.map((tv) => <TVShowCard key={`tvShow-${tv.id}`} tvShow={tv} />)
        ) : (
          <p className="col-span-full text-center">No hay series disponibles.</p>
        )}
      </div>
    </div>
  );
};

export default Movies;
