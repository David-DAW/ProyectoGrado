"use client";

import { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";
import { usePathname } from "next/navigation";


const FormReview = ({ media }) => {
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [movieReviews, setMovieReviews] = useState([]);
  const [submittedReview, setSubmittedReview] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const pathname = usePathname();

  const etiquetas = [
    "Horrible", "Muy mala", "Mala", "Regular", "Aceptable",
    "Pasable", "Buena", "Muy buena", "Excelente", "Una locura"
  ];

  const handleReviewChange = (e) => setReviewText(e.target.value);
  const handleRatingChange = (e) => setRating(parseInt(e.target.value));

  const handleSubmit = async (event) => {
    event.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) return alert("Usuario no autenticado.");

    const reviewData = {
      texto: reviewText,
      valoracion: rating,
      id_pelicula: media.id,
      imagen_url: media.poster_path,
      descripcion_pelicula: media.overview,
      titulo: media.title || media.name,
    };

    try {
      const res = await fetch("http://172.22.229.1:8080/reviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(reviewData),
      });

      if (res.ok) {
        setSubmittedReview({ texto: reviewText, valoracion: rating });
        setSubmitted(true);
        setReviewText("");
        setRating(0);
        fetchMovieReviews();
      } else {
        alert("Error al publicar la reseña.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Hubo un error al enviar la reseña.");
    }
  };

  const fetchMovieReviews = async () => {
    try {
      const res = await fetch(`http://172.22.229.1:8080/reviews/movie/${media.id}`);
      if (!res.ok) throw new Error("No se pudieron cargar las reseñas");
      const data = await res.json();
      setMovieReviews(data);
    } catch (error) {
      console.error("Error al obtener reseñas de la película:", error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
    if (media?.id) fetchMovieReviews();
  }, [media?.id]);

  return (
    <div className="w-full mt-6 lg:pl-9">
      <div className="p-6 bg-gray-900 rounded-2xl shadow-xl space-y-6">
        <div className="flex items-center space-x-4">
          <img
            src={`https://image.tmdb.org/t/p/w200${media.poster_path}`}
            alt={media.title || media.name}
            className="w-24 h-auto rounded-lg shadow-md"
          />
          <h2 className="text-2xl font-semibold text-white">{media.title}</h2>
        </div>

        {isAuthenticated ? (
          !submitted ? (
            <form onSubmit={handleSubmit} className="space-y-6">
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
              <p className="text-sm text-gray-300 whitespace-pre-line">
                {submittedReview?.texto}
              </p>
              <div className="flex items-center gap-1">
                {[...Array(submittedReview?.valoracion || 0)].map((_, i) => (
                  <FaStar key={i} className="text-amber-400" />
                ))}
                <span className="ml-2 text-sm text-gray-400">{submittedReview?.valoracion} / 10</span>
              </div>
            </div>
          )
        ) : (
          <div className="text-center space-y-4 text-white">
            <p className="text-lg font-medium text-gray-300">
              ¿Quieres dejar tu opinión? Inicia sesión para publicar una reseña.
            </p>
            <a
              href={`/login?redirect=${encodeURIComponent(pathname)}`}
              className="inline-block px-6 py-3 bg-amber-500 hover:bg-amber-600 text-white font-semibold rounded-xl transition"
            >
              Iniciar sesión
            </a>
          </div>
        )}
      </div>

      <div className="mt-8 space-y-4">
        <h3 className="text-xl font-bold text-white">Reseñas de otros usuarios</h3>
        {movieReviews.length > 0 ? (
          movieReviews.map((review, index) => (
            <div key={index} className="bg-gray-800 p-4 rounded-xl shadow-md text-white space-y-2">
              <p className="text-sm text-amber-400 font-semibold">{review.usuarioNombre}</p>
              <p className="text-sm">{review.texto}</p>
              <div className="flex items-center gap-1">
                {[...Array(review.valoracion)].map((_, i) => (
                  <FaStar key={i} className="text-amber-400" />
                ))}
                <span className="ml-2 text-sm text-gray-400">{review.valoracion} / 10</span>
              </div>
              <p className="text-xs text-gray-400">Fecha: {review.fecha.split("T")[0]}</p>
            </div>
          ))
        ) : (
          <p className="text-xl text-center text-gray-200 pt-7">Aún no hay reseñas sobre esta película. ¡Sé el primero en comentarla!</p>
        )}
      </div>
    </div>
  );
};

export default FormReview;
