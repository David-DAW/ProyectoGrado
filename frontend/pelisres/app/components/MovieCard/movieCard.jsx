"use client";
import Link from "next/link";

export default function MovieCard({ movie }) {
  const imageUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "/no-image.jpg";

  return (
    <div className="rounded overflow-hidden shadow-lg hover:scale-105 transition-transform duration-300 bg-gray-900 sm:pt-5">
      <Link href={`/movies/${movie.id}`} className="block">
        <img
          src={imageUrl}
          alt={movie.title}
          className="w-full h-64 object-cover sm:h-[380px] sm:object-contain"
        />

        <div className="p-4">
          <h3 className="text-lg font-semibold text-white truncate sm:ml-5">
            {movie.title}
          </h3>
          <p className="text-gray-300 text-xl sm:ml-4">
            ⭐ {movie.vote_average === 0 ? "N/A" : movie.vote_average?.toFixed(1)}
          </p>
        </div>
      </Link>
    </div>
  );
}
