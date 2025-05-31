"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const Reviews = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch("http://172.22.229.1:8080/reviews");
        if (response.ok) {
          const data = await response.json();
          setReviews(
            data
              .sort((a, b) => new Date(b.fecha) - new Date(a.fecha))
              .slice(0, 9)
          );
        } else {
          console.error("Error al cargar reseñas");
        }
      } catch (error) {
        console.error("Error de conexión:", error);
      }
    };

    fetchReviews();
  }, []);

  return (
    <section
      id="reviews"
      className="w-full py-10 px-4 sm:px-6 flex flex-col items-center"
    >
      <h2 className="text-2xl sm:text-4xl font-bold text-gray-200 mb-8 text-center">
        Últimas reseñas
      </h2>

      <div className="grid gap-6 sm:gap-8 w-full max-w-6xl grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {reviews.map((review) => (
          <div
            key={review.id}
            className="rounded-xl bg-white shadow-md overflow-hidden transition-transform hover:scale-[1.01]"
          >
            <Link
              href={`/reviews/${review.id}`}
              className="block p-4 sm:p-6 space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between sm:gap-4">
                <div className="flex-shrink-0 mx-auto sm:mx-0 mb-4 sm:mb-0">
                  <img
                    alt={review.authorName}
                    src={`https://image.tmdb.org/t/p/w500${review.imagenUrlPelicula}`}
                    className="h-[140px] w-[100px] object-cover rounded-md"
                  />
                </div>

                <div className="flex-1 text-center sm:text-left">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {review.tituloPelicula}
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">
                    @{review.usuarioNombre}
                  </p>
                  <p className="mt-2 text-sm text-gray-700 line-clamp-3">
                    {review.texto}
                  </p>
                </div>
              </div>

              <div className="pt-2 border-t border-gray-200 text-gray-700 text-center sm:text-left">
                ⭐ {review.valoracion || "0"}
              </div>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Reviews;
