"use client";
import Link from "next/link";

export default function MovieCard({ movie }) {
  const imageUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "/no-image.jpg";

  return (
    <div className="bg-gray-900 p-4 rounded shadow-lg hover:scale-105 transition">
      <Link href={`/movies/${movie.id}`}>
        <img
          src={imageUrl}
          alt={movie.title}
          className="rounded mb-2 w-full object-cover h-[380px]"
        />
        <h3 className="text-lg font-semibold text-white truncate">{movie.title}</h3>
        <p className="text-gray-400">⭐ {movie.vote_average?.toFixed(1)}</p>
      </Link>
    </div>
  );
}
