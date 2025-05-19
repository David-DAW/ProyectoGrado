"use client";

import { useEffect, useState } from "react";

const Reviews = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch("http://172.22.229.1:8080/reviews");
        if (response.ok) {
          const data = await response.json();
          setReviews(data.slice(0, 9));
        } else {
          console.error("Error al cargar reseñas");
        }
      } catch (error) {
        console.error("Error de conexión:", error);
      }
    };


    fetchReviews();
  }, []);
  // console.log(reviews);

  return (
    <section className="w-full py-12 px-4 flex flex-col items-center">
      <h2 className="text-3xl sm:text-4xl font-bold text-gray-200 mb-10 text-center">
        Últimas reseñas
      </h2>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 w-full max-w-7xl">
        {reviews.map((review) => (
          <div key={review.id} className="rounded bg-white shadow-lg flex flex-col">
            <a
              href="#"
              className="block rounded-md border border-gray-300 p-4 shadow-sm sm:p-6 flex-1">
              <div className="sm:flex sm:justify-between sm:gap-4 lg:gap-6">
                <div className="sm:order-last sm:shrink-0">
                  <img
                    alt={review.authorName}
                    src={`https://image.tmdb.org/t/p/w500${review.imagenUrlPelicula}`}
                     className="h-[100px] w-[75px] object-cover rounded-md"
                  />
                </div>

                <div className="mt-4 sm:mt-0">
                  <h3 className="text-lg font-medium text-pretty text-gray-900">
                    {review.tituloPelicula}
                  </h3>
                  <p className="mt-1 text-sm text-gray-700">@{review.usuarioNombre}</p>
                  <p className="mt-4 line-clamp-2 text-sm text-pretty text-gray-700">
                    {review.texto}
                  </p>
                </div>
              </div>

              <dl className="mt-6 flex gap-4 lg:gap-6">
                <div className="flex items-center gap-2 text-gray-700 text-xl">
                  ⭐ {review.valoracion || "0"}
                </div>
              </dl>
            </a>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Reviews;
