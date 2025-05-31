"use client";
import Link from "next/link";

export default function TVShowCard({ tvShow }) {
  const imageUrl = tvShow.poster_path
    ? `https://image.tmdb.org/t/p/w500${tvShow.poster_path}`
    : "/no-image.jpg";

  //   console.log("TVShowCard", tvShow);

  return (
    <div className="rounded overflow-hidden shadow-lg hover:scale-105 transition-transform duration-300 bg-gray-900 sm:pt-5">
      <Link href={`/tv/${tvShow.id}`} className="block">
        <img
          src={imageUrl}
          alt={tvShow.name}
          className="w-full h-64 object-cover sm:h-[380px] sm:object-contain"
        />
      </Link>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-white truncate sm:ml-5">
          {tvShow.name}
        </h3>
        <p className="text-gray-400 text-xl sm:ml-4">
          ⭐{" "}
          {tvShow.vote_average === 0 ? "N/A" : tvShow.vote_average?.toFixed(1)}
        </p>
      </div>
    </div>
  );
}
