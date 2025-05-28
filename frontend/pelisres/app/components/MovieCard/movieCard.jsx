"use client";
import Link from "next/link";

export default function MovieCard({ movie }) {
  const imageUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "/no-image.jpg";

  // console.log("MovieCard", movie);
  return (
    <div className="bg-gray-900 p-4 rounded shadow-lg hover:scale-105 transition-transform duration-300">
      <Link href={`/movies/${movie.id}`}>
        <img
          src={imageUrl}
          alt={movie.title}
          className="rounded mb-2 w-full object-contain h-[250px] sm:h-[300px] md:h-[380px] bg-black p-2"
        />
        <h3 className="text-lg font-semibold text-white truncate">
          {movie.title}
        </h3>
        <p className="text-gray-400">
          ⭐ {movie.vote_average === 0 ? "N/A" : movie.vote_average?.toFixed(1)}
        </p>
      </Link>
    </div>
  );
}
