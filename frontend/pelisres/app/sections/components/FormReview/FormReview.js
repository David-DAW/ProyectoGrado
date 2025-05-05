"use client";

const FormReview = () => {
  return (
    <form className="w-full mt-6 lg:pl-9">
      <div className="mb-4 rounded-lg bg-gray-800">
        <div className="px-4 py-2 bg-gray-800 rounded-lg">
          <textarea
            id="review"
            rows="4"
            className="w-full px-0 text-sm text-gray-200 bg-gray-800 focus:outline-none focus:ring-0 resize-none"
            placeholder="Escribe tú reseña..."
            required
          ></textarea>
        </div>
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
