"use client";

import { useState } from "react";
import { FaStar } from "react-icons/fa";

const FormReview = ({ movie }) => {
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  const etiquetas = [
    "Horrible", "Muy mala", "Mala", "Regular", "Aceptable",
    "Pasable", "Buena", "Muy buena", "Excelente", "Una locura"
  ];

  const handleReviewChange = (e) => setReviewText(e.target.value);
  const handleRatingChange = (e) => setRating(parseInt(e.target.value));

  const handleSubmit = async (event) => {
    event.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) return alert("Usuario no autenticado.");

    const reviewData = {
      texto: reviewText,
      valoracion: rating,
      id_pelicula: movie.id,
      imagen_url: movie.poster_path,
      descripcion_pelicula: movie.overview,
      titulo: movie.title
    };

    try {
      const res = await fetch("http://172.22.229.1:8080/reviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(reviewData),
      });

      if (res.ok) {
        setSubmitted(true);
      } else {
        alert("Error al publicar la reseña.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Hubo un error al enviar la reseña.");
    }
  };

  return (
    <div className="w-full mt-6 lg:pl-9">
      <div className="p-6 bg-gray-900 rounded-2xl shadow-xl space-y-6">
        {/* Título y Póster */}
        <div className="flex items-center space-x-4">
          <img
            src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
            alt={movie.title}
            className="w-24 h-auto rounded-lg shadow-md"
          />
          <h2 className="text-2xl font-semibold text-white">{movie.title}</h2>
        </div>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Reseña */}
            <div>
              <label htmlFor="review" className="block mb-2 text-sm font-semibold text-gray-300">
                Tu Reseña:
              </label>
              <textarea
                id="review"
                rows="5"
                value={reviewText}
                onChange={handleReviewChange}
                className="w-full p-4 text-sm text-white bg-gray-800 placeholder-gray-400 rounded-xl border border-gray-700 focus:outline-none focus:ring-2 focus:ring-amber-500 resize-none"
                placeholder="Escribe tu reseña..."
                required
              ></textarea>
            </div>

            {/* Valoración */}
            <div>
              <label htmlFor="rating" className="block mb-2 text-sm font-semibold text-gray-300">
                Valoración:
              </label>
              <select
                id="rating"
                value={rating}
                onChange={handleRatingChange}
                className="w-full p-3 text-sm text-white bg-gray-800 rounded-xl border border-gray-700 focus:outline-none focus:ring-2 focus:ring-amber-500"
                required
              >
                <option value={0} disabled>Selecciona una opción</option>
                {etiquetas.map((etiqueta, i) => (
                  <option key={i + 1} value={i + 1}>
                    {i + 1} - {etiqueta}
                  </option>
                ))}
              </select>
            </div>

            {/* Botón */}
            <button
              type="submit"
              className="py-3 px-6 text-white bg-amber-500 rounded-xl text-sm font-semibold hover:bg-amber-600 transition duration-200"
            >
              Publicar Reseña
            </button>
          </form>
        ) : (
          <div className="text-white space-y-4">
            <h3 className="text-xl font-bold text-amber-400">¡Gracias por tu reseña!</h3>
            <p className="text-sm text-gray-300 whitespace-pre-line">{reviewText}</p>
            <div className="flex items-center gap-1">
              {[...Array(rating)].map((_, i) => (
                <FaStar key={i} className="text-amber-400" />
              ))}
              <span className="ml-2 text-sm text-gray-400">{rating} / 10</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FormReview;
