"use client";

import { useState } from "react"; 
const FormReview = () => {
  const [reviewText, setReviewText] = useState("");  
  const [rating, setRating] = useState(0);  

  const handleReviewChange = (event) => {
    setReviewText(event.target.value);  
  };

  const handleRatingChange = (event) => {
    setRating(event.target.value);  
  };

  const handleSubmit = async (event) => {
    event.preventDefault();  

    const token = localStorage.getItem('token'); 

    if (!token) {
      console.error('No token found. User not authenticated');
      return;
    }

    // console.log(token);

    const reviewData = {
      texto: reviewText,
      valoracion: rating, 
      id_pelicula: "123", 
    };

    try {
      const response = await fetch("http://172.22.229.1:8080/reviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(reviewData),  
      });

      if (response.ok) {
        alert("Reseña publicada con éxito!");
      } else {
        alert("Error al publicar la reseña.");
      }
    } catch (error) {
      console.error("Error al enviar la reseña:", error);
      alert("Hubo un error al enviar la reseña.");
    }
  };

  return (
    <form className="w-full mt-6 lg:pl-9" onSubmit={handleSubmit}>
      <label className="text-gray-200">Reseña:</label>
      <div className="mb-4 rounded-lg bg-gray-800">
        <div className="px-4 py-2 bg-gray-800 rounded-lg">
          <textarea
            id="review"
            rows="4"
            value={reviewText}
            onChange={handleReviewChange} 
            className="w-full px-0 text-sm text-gray-200 bg-gray-800 focus:outline-none focus:ring-0 resize-none"
            placeholder="Escribe tú reseña..."
            required
          ></textarea>
        </div>
      </div>

      <div className="mb-4">
        <label className="text-gray-200">Valoración:</label>
        <select
          value={rating}
          onChange={handleRatingChange} 
          className="w-full px-4 py-2 mt-2 text-sm text-gray-200 bg-gray-800 focus:outline-none focus:ring-0"
        >
          <option value="0">Selecciona una valoración</option>
          <option value="1">1 - Muy mala</option>
          <option value="2">2 - Mala</option>
          <option value="3">3 - Regular</option>
          <option value="4">4 - Buena</option>
          <option value="5">5 - Excelente</option>
        </select>
      </div>

      <button
        type="submit"
        className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-amber-500 rounded-lg cursor-pointer"
      >
        Publicar Reseña
      </button>
    </form>
  );
};

export default FormReview;
