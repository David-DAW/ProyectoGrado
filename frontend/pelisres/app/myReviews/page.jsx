"use client";

import { useEffect, useState } from "react";
import Header from "../sections/Header/HeaderComponent";
import Footer from "../sections/Footer/FooterComponent";
import { FaStar } from "react-icons/fa";
import { FaRegTrashCan } from "react-icons/fa6";
import { FaRegEdit } from "react-icons/fa";

export default function MisResenas() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [token, setToken] = useState(null);
  

  const [editModal, setEditModal] = useState(false);
  const [editReview, setEditReview] = useState(null);
  const [editTexto, setEditTexto] = useState("");
  const [editValoracion, setEditValoracion] = useState(1);

  const openEditModal = (review) => {
    setEditReview(review);
    setEditTexto(review.texto);
    setEditValoracion(review.valoracion);
    setEditModal(true);
  };

  const [showModal, setShowModal] = useState(false);
  const [selectedReviewId, setSelectedReviewId] = useState(null);

  const openDeleteModal = (id) => {
    setSelectedReviewId(id);
    setShowModal(true);
  };

  const confirmDelete = async () => {
    try {
      const res = await fetch(
        `http://172.22.229.1:8080/reviews/${selectedReviewId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) {
        const errorMsg = await res.text();
        throw new Error(errorMsg || "Error al eliminar reseña");
      }

      setReviews((prev) =>
        prev.filter((review) => review.id !== selectedReviewId)
      );
      setShowModal(false);
      setSelectedReviewId(null);
    } catch (err) {
      alert("Error al eliminar la reseña: " + err.message);
    }
  };

  const handleEditSubmit = async () => {
    try {
      const res = await fetch(
        `http://172.22.229.1:8080/reviews/${editReview.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            texto: editTexto,
            valoracion: editValoracion,
          }),
        }
      );

      if (!res.ok) {
        const errorMsg = await res.text();
        throw new Error(errorMsg || "Error al editar reseña");
      }

      setReviews((prev) =>
        prev.map((review) =>
          review.id === editReview.id
            ? { ...review, texto: editTexto, valoracion: editValoracion }
            : review
        )
      );

      setEditModal(false);
      setEditReview(null);
    } catch (err) {
      alert("Error al editar la reseña: " + err.message);
    }
  };

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    } else {
      setError("No autenticado");
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!token) return;

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
                <h2 className="text-xl font-semibold mb-2">
                  {review.tituloPelicula}
                </h2>
                <div className="flex items-center gap-1 whitespace-nowrap">
                  {[...Array(review.valoracion)].map((_, i) => (
                    <FaStar key={i} className="text-amber-400" />
                  ))}
                  <span className="ml-2 text-sm text-gray-400">
                    {review.valoracion} / 10
                  </span>
                </div>
                <p className="mb-16 mt-3">{review.texto}</p>
                <div className="flex flex-col mt-2 space-y-2">
                  <small className="text-gray-400">
                    Fecha de publicación:{" "}
                    {new Date(review.fecha).toLocaleDateString()}
                  </small>

                  <button
                    onClick={() => openDeleteModal(review.id)}
                    className="bg-red-600 hover:bg-red-700 text-white text-sm font-bold py-1 w-32 rounded-full flex items-center justify-center gap-2"
                  >
                    <FaRegTrashCan size={16} />
                    Eliminar
                  </button>

                  <button
                    onClick={() => openEditModal(review)}
                    className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold py-1 w-32 rounded-full flex items-center justify-center gap-2"
                  >
                    <FaRegEdit size={16} />
                    Editar
                  </button>
                </div>
              </div>

              {review.imagenUrlPelicula && (
                <img
                  src={`https://image.tmdb.org/t/p/w200${review.imagenUrlPelicula}`}
                  alt={review.tituloPelicula}
                  className="w-28 h-auto object-cover rounded-md shadow-md hidden md:block"
                />
              )}
            </li>
          ))}
        </ul>
      </div>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
          <div className="relative bg-white p-6 rounded-xl shadow-lg max-w-md w-full pointer-events-auto border border-gray-300">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">
              ¿Eliminar reseña?
            </h2>
            <p className="text-gray-600 mb-6">
              Esta acción no se puede deshacer.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 rounded-md bg-gray-300 hover:bg-gray-400 text-gray-800"
              >
                Cancelar
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 rounded-md bg-red-600 hover:bg-red-700 text-white font-semibold"
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}

      {editModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
          <div className="relative bg-white p-6 rounded-xl shadow-lg max-w-md w-full pointer-events-auto border border-gray-300">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">
              Editar reseña
            </h2>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Texto</label>
              <textarea
                className="w-full border rounded px-3 py-2"
                rows={4}
                value={editTexto}
                onChange={(e) => setEditTexto(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">
                Valoración (1-10)
              </label>
              <input
                type="number"
                className="w-full border rounded px-3 py-2"
                min={1}
                max={10}
                value={editValoracion}
                onChange={(e) => setEditValoracion(Number(e.target.value))}
              />
            </div>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setEditModal(false)}
                className="px-4 py-2 rounded-md bg-gray-300 hover:bg-gray-400 text-gray-800"
              >
                Cancelar
              </button>
              <button
                onClick={handleEditSubmit}
                className="px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white font-semibold"
              >
                Guardar
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
