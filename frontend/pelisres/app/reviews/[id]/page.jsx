"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Header from "@/app/sections/Header/HeaderComponent";
import Footer from "@/app/sections/Footer/FooterComponent";
import { FaStar } from "react-icons/fa";

const ReviewDetail = () => {
  const params = useParams();
  const { id } = params;
  const [review, setReview] = useState(null);

  useEffect(() => {
    const fetchReview = async () => {
      try {
        const res = await fetch(`http://172.22.229.1:8080/reviews/${id}`);
        if (res.ok) {
          const data = await res.json();
          setReview(data);
        } else {
          console.error("Error al cargar reseña");
        }
      } catch (error) {
        console.error("Error de conexión:", error);
      }
    };
    fetchReview();
  }, [id]);

  if (!review) return <p>Cargando reseña...</p>;

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-r from-amber-600 to-amber-950">
      <Header />

      <main className="flex-1 mb-8">
        <section className="w-3/4 mx-auto mt-10 p-6 bg-gray-900 rounded-2xl shadow-md">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <img
              src={`https://image.tmdb.org/t/p/w500${review.imagenUrlPelicula}`}
              alt={review.tituloPelicula}
              className="w-30 h-50 object-cover rounded-lg shadow"
            />
            <div className="flex-1">
              <h1 className="text-4xl font-bold text-gray-100 mb-2">
                {review.tituloPelicula}
              </h1>
              <p className="text-sm text-gray-200 mb-4">
                Reseña hecha por{" "}
                <span className="font-medium">@{review.usuarioNombre}</span>
              </p>
              <p className="text-gray-100 leading-relaxed mb-4">{review.texto}</p>
              <div className="flex items-center">
                {[...Array(review.valoracion)].map((_, i) => (
                  <FaStar key={i} className="text-amber-400" />
                ))}
                <span className="ml-3 text-sm text-gray-100">
                  {review.valoracion} / 10
                </span>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ReviewDetail;
