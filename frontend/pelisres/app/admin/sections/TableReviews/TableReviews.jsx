"use client";
import { useEffect, useState } from "react";

const TableReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/reviews`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (!response.ok) {
          throw new Error("Error al obtener reseñas");
        }

        const data = await response.json();
        setReviews(data);
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  const handleDelete = async (reviewId) => {
    if (!confirm("¿Estás seguro de que deseas eliminar esta reseña?")) return;

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/reviews/${reviewId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (!response.ok) throw new Error("No se pudo eliminar la reseña");

      setReviews(reviews.filter((review) => review.id !== reviewId));
    } catch (error) {
      console.error("Error al eliminar reseña:", error);
    }
  };

  if (loading)
    return <p className="text-white text-center mt-8">Cargando reseñas...</p>;

  return (
    <div className="p-6 w-3/4 mx-auto">
      <h2 className="text-2xl font-bold text-white mb-4">Reseñas publicadas</h2>
      <div className="overflow-x-auto rounded shadow">
        <table className="min-w-full bg-white">
          <thead className="bg-amber-600 text-white">
            <tr>
              <th className="px-4 py-2">Usuario</th>
              <th className="px-4 py-2">Película</th>
              <th className="px-4 py-2">Reseña</th>
              <th className="px-4 py-2">Valoración</th>
              <th className="px-4 py-2">Fecha</th>
              <th className="px-4 py-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {reviews.map((review, index) => (
              <tr key={index} className="border-b hover:bg-amber-100">
                <td className="px-4 py-2">{review.usuarioNombre}</td>
                <td className="px-4 py-2">{review.tituloPelicula}</td>
                <td className="px-4 py-2">{review.texto}</td>
                <td className="px-4 py-2 text-center">{review.valoracion}</td>
                <td className="px-4 py-2">
                  {new Date(review.fecha).toLocaleDateString()}
                </td>
                <td className="px-4 py-2 text-center">
                  <button
                    onClick={() => handleDelete(review.id)}
                    className="bg-red-600 hover:bg-red-700 text-white text-sm px-4 py-2 rounded"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableReviews;
