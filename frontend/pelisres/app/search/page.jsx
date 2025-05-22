import { searchMovies } from "@/app/services/api";
import Header from "../sections/Header/HeaderComponent";
import Footer from "../sections/Footer/FooterComponent";
import Link from "next/link";

export default async function SearchPage({ searchParams }) {
  const query = searchParams.query ?? "";
  const results = query
    ? (await searchMovies(query))
        .filter(
          (item) => item.media_type === "movie" || item.media_type === "tv"
        )
        .sort((a, b) => b.popularity - a.popularity)
    : [];

  return (
    <div className="bg-gradient-to-l from-amber-950 to-amber-600 min-h-screen">
      <Header />
      <div className="w-3/4 mx-auto mt-8 text-white mb-12">
        <h1 className="text-2xl font-bold mb-4">Resultados para: "{query}"</h1>

        <div className="grid gap-6 md:grid-cols-3 lg:grid-cols-4">
          {results.map((item) => (
            <div key={item.id} className="bg-gray-800 p-4 rounded shadow-lg">
              <Link
                href={`/${item.media_type === "movie" ? "movies" : "tv"}/${
                  item.id
                }`}
              >
                <img
                  src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                  alt={item.title || item.name}
                  className="rounded mb-2 w-full h-[20rem] object-cover"
                />
                <h3 className="text-lg font-semibold">
                  {item.title || item.name}
                </h3>
                <p className="text-gray-400">
                  ⭐ { item.vote_average === 0 ? "N/A" : item.vote_average?.toFixed(1)}
                </p>
              </Link>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}
