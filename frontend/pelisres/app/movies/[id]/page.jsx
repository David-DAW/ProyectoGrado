import Header from "@/app/sections/Header/HeaderComponent";
import Footer from "@/app/sections/Footer/FooterComponent";
import { getMovieDetails, getSimilarMovies } from "../../services/api";
import Link from "next/link";
import FormReview from "@/app/components/FormReview/FormReview";
import MovieReviews from "@/app/components/MovieReview/MovieReview";

export default async function MoviePage({ params }) {
  const { id } = params;
  const movie = await getMovieDetails(id);
  const similarMovies = await getSimilarMovies(id);

  const reviewsResponse = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/reviews?movieId=${id}`
  );
  const reviews = await reviewsResponse.json();

  const averageRatingResponse = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/reviews/movie/${id}/average-rating`
  );

  let averageRatingData = null;
  if (averageRatingResponse.ok) {
    const text = await averageRatingResponse.text();
    try {
      averageRatingData = text ? JSON.parse(text) : null;
    } catch (error) {
      console.warn(
        "No se pudo parsear la respuesta JSON de average-rating:",
        error
      );
      averageRatingData = null;
    }
  } else {
    console.warn(
      "Error al obtener average-rating:",
      averageRatingResponse.status
    );
  }

  const averageRating =
    averageRatingData !== null ? Number(averageRatingData).toFixed(1) : "N/A";

  // console.log("similarMovies:", similarMovies);

  const year = new Date(movie.release_date).getFullYear();
  const country = movie.production_countries?.[0]?.name || "Desconocido";
  const voteAverage = movie.vote_average.toFixed(1);

  return (
    <div className="bg-gradient-to-l from-amber-950 to-amber-600 min-h-screen">
      <Header />
      <div className="flex justify-center">
        <div className="flex flex-col w-3/4 my-12">
          <div className="flex">
            <div className="hidden md:block w-[20em] h-[23em] mr-6 rounded">
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="w-full h-full object-contain rounded"
              />
            </div>

            <div className="w-full md:w-3/4 rounded-lg overflow-hidden flex flex-col bg-gray-900 shadow-lg sm:h-[23em]">
              <div className="p-6 flex-1 flex flex-col justify-start overflow-auto text-gray-200">
                <h2 className="text-2xl font-bold mb-4">
                  {movie.title} ({year})
                </h2>

                <p className="text-sm text-gray-400 mb-3">
                  <span className="font-semibold">Género:</span>{" "}
                  {movie.genres.map((g) => g.name).join(", ")}
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
                  {movie.overview}
                </p>

                <p className="text-2xl text-gray-400 mb-3 mt-6 flex gap-1">
                  <span className="font-semibold">⭐ </span > {voteAverage}
                  <span className="font-semibold ml-5">⭐ Usuarios de PelisRes:</span>{" "}
                  {averageRating}
                </p>
              </div>
            </div>
          </div>

          <FormReview media={movie} />

        </div>
      </div>

      <div className="w-3/4 mx-auto mt-8 mb-8">
        <h3 className="text-xl font-semibold text-white mb-4 text-center">
          Películas Similares
        </h3>
        <div className="flex gap-4 overflow-x-auto pb-4 justify-center">
          {similarMovies.slice(0, 6).map((similar) => (
            <div
              key={similar.id}
              className="bg-gray-800 p-2 rounded shadow-lg w-40 flex-shrink-0"
            >
              <Link href={`/movies/${similar.id}`} key={similar.id}>
                <img
                  src={`https://image.tmdb.org/t/p/w300${similar.poster_path}`}
                  alt={similar.title}
                  className="rounded mb-2 h-48 w-full object-cover"
                />
                <h4 className="text-sm text-white font-semibold truncate">
                  {similar.title}
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
