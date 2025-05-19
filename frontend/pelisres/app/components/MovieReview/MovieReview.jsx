const MovieReviews = ({ reviews }) => {
  return (
    <div className="mt-8">
      <h3 className="text-xl font-semibold text-white mb-4 text-center">Reseñas</h3>
      {reviews.length > 0 ? (
        <div className="space-y-4">
          {reviews.map((review) => (
            <div key={review.id} className="bg-gray-800 p-4 rounded-lg">
              <p className="text-gray-400">{review.texto}</p>
              <p className="text-yellow-400">⭐ {review.valoracion}</p>
              <p className="text-sm text-gray-500">Por: {review.username}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-white text-center">No hay reseñas aún.</p>
      )}
    </div>
  );
};

export default MovieReviews;
