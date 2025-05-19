"use client";

import { useEffect, useState } from "react";
import Header from "../sections/Header/HeaderComponent";
import Footer from "../sections/Footer/FooterComponent";
import { FaStar } from "react-icons/fa";
import { FaRegTrashCan } from "react-icons/fa6";


export default function MisResenas() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

  useEffect(() => {
    if (!token) {
      setError("No autenticado");
      setLoading(false);
      return;
    }

    fetch("http://172.22.229.1:8080/reviews/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(async (res) => {
        if (!res.ok) {
          const errorMsg = await res.text();
          throw new Error(errorMsg || "Error al obtener reseñas");
        }
        return res.json();
      })
      .then((data) => {
        setReviews(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [token]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="w-12 h-12 border-4 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }


  return (
    <div className="bg-gradient-to-l from-amber-950 to-amber-600 min-h-screen flex flex-col">
      <Header />
      <div className="flex-grow container mx-auto px-4 w-3/4">
        <h1 className="text-3xl font-bold my-8 text-gray-50">Mis Reseñas</h1>
        <ul className="list-none p-0">
          {reviews.map((review) => (
            <li
              key={review.id}
              className="flex items-start justify-between border border-gray-400 rounded-lg p-6 mb-6 bg-gray-900 shadow-sm"
            >

              <div className="flex-1 pr-6 text-gray-200">
                <h2 className="text-xl font-semibold mb-2">{review.tituloPelicula}</h2>
                <div className="flex items-center gap-1">
                  {[...Array(review.valoracion)].map((_, i) => (
                    <FaStar key={i} className="text-amber-400" />
                  ))}
                  <span className="ml-2 text-sm text-gray-400">{review.valoracion} / 10</span>
                </div>
                <p className="mb-16 mt-3">{review.texto}</p>
                <div className="flex flex-col items-start mt-2 space-y-2">
                  <small className="ml-1">
                    Fecha de publicación: {new Date(review.fecha).toLocaleDateString()}
                  </small>

                  <button
                    // onClick={() => handleDelete(review.id)}
                    className="bg-red-600 hover:bg-red-700 text-white text-sm font-bold py-1 px-4 rounded-full"
                  >
                  <FaRegTrashCan size={20}/>
                  </button>
                </div>

              </div>


              {review.imagenUrlPelicula && (
                <img
                  src={`https://image.tmdb.org/t/p/w200${review.imagenUrlPelicula}`}
                  alt={review.tituloPelicula}
                  className="w-28 h-auto object-cover rounded-md shadow-md"
                />
              )}
            </li>
          ))}
        </ul>
      </div>
      <Footer />
    </div>
  );
}
