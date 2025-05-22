"use client";
import Link from "next/link";

export default function TVShowCard({ tvShow }) {

  const imageUrl = tvShow.poster_path
    ? `https://image.tmdb.org/t/p/w500${tvShow.poster_path}`
    : "/no-image.jpg";

//   console.log("TVShowCard", tvShow);
  
  return (
    <div className="bg-gray-900 p-4 rounded shadow-lg hover:scale-105 transition-transform duration-300">
      <Link href={`/tv/${tvShow.id}`}>
        <img
          src={imageUrl}
          alt={tvShow.name}
          className="rounded mb-2 w-full object-cover
                     h-[250px] sm:h-[300px] md:h-[380px]"
        />
        <h3 className="text-lg font-semibold text-white truncate">{tvShow.name}</h3>
        <p className="text-gray-400">⭐ {tvShow.vote_average === 0 ? "N/A" : tvShow.vote_average?.toFixed(1)}</p>
      </Link>
    </div>
  );
}
