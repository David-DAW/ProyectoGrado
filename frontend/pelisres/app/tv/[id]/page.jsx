import Header from "@/app/sections/Header/HeaderComponent";
import Footer from "@/app/sections/Footer/FooterComponent";
import { getTVShowDetails, getSimilarTVShows } from "@/app/services/api";
import Link from "next/link";
import FormReview from "@/app/components/FormReview/FormReview";
import MovieReviews from "@/app/components/MovieReview/MovieReview";

export default async function TVShowPage({ params }) {
  const { id } = params;
  const tvShow = await getTVShowDetails(id);
  const similarShows = await getSimilarTVShows(id);

  const reviewsResponse = await fetch(
    `http://172.22.229.1:8080/reviews?movieId=${id}`
  );
  const reviews = await reviewsResponse.json();

  const year = new Date(tvShow.first_air_date).getFullYear();
  const country = tvShow.origin_country?.[0] || "Desconocido";
  const voteAverage = tvShow.vote_average.toFixed(1);

  return (
    <div className="bg-gradient-to-l from-amber-950 to-amber-600 min-h-screen">
      <Header />
      <div className="flex justify-center">
        <div className="flex flex-col w-3/4 my-12">
          <div className="flex">
            <div className="hidden md:block w-[20em] h-[23em] mr-6 rounded">
              <img
                src={`https://image.tmdb.org/t/p/w500${tvShow.poster_path}`}
                alt={tvShow.name}
                className="w-full h-full object-contain rounded"
              />
            </div>

            <div className="w-full md:w-3/4 rounded-lg overflow-hidden flex flex-col bg-gray-900 shadow-lg sm:h-[23em]">
              <div className="p-6 flex-1 flex flex-col justify-start overflow-auto text-gray-200">
                <h2 className="text-2xl font-bold mb-4">
                  {tvShow.name} ({year})
                </h2>

                <p className="text-sm text-gray-400 mb-3">
                  <span className="font-semibold">Género:</span>{" "}
                  {tvShow.genres.map((g) => g.name).join(", ")}
                </p>

                <p className="text-sm text-gray-400 mb-3">
                  <span className="font-semibold">País:</span> {country}
                </p>

                <p className="text-sm text-gray-400 mb-3">
                  <span className="font-semibold">Año:</span> {year}
                </p>

                <p className="text-sm text-gray-400 mb-1">
                  <span className="font-semibold">Sinopsis:</span>
                </p>

                <p className="leading-relaxed text-justify text-md">
                  {tvShow.overview?.trim()
                    ? tvShow.overview
                    : "No hay sinopsis disponible para esta serie."}
                </p>

                <p className="text-2xl text-gray-400 mb-3 mt-6">
                  <span className="font-semibold">⭐</span> {voteAverage}
                </p>
              </div>
            </div>
          </div>

          <FormReview media={tvShow} />
        </div>
      </div>

      <div className="w-3/4 mx-auto mt-8 mb-8">
        <h3 className="text-xl font-semibold text-white mb-4 text-center">
          Series Similares
        </h3>
        <div className="flex gap-4 overflow-x-auto pb-4 justify-center">
          {similarShows.slice(0, 6).map((similar) => (
            <div
              key={similar.id}
              className="bg-gray-800 p-2 rounded shadow-lg w-40 flex-shrink-0"
            >
              <Link href={`/tv/${similar.id}`}>
                <img
                  src={`https://image.tmdb.org/t/p/w300${similar.poster_path}`}
                  alt={similar.name}
                  className="rounded mb-2 h-48 w-full object-cover"
                />
                <h4 className="text-sm text-white font-semibold truncate">
                  {similar.name}
                </h4>
                <p className="text-xs text-gray-400">
                  ⭐ {similar.vote_average.toFixed(1)}
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
