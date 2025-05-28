// components/Faq.js
import { useState } from "react";

const faqs = [
  {
    question: "¿Cómo puedo registrarme?",
    answer: "Puedes registrarte haciendo clic en el botón de iniciar sesión y posteriormente haciendo clic en el enlace de abajo, ese mismo enlcae te redirigirá a la pantalla de registro.",
  },
  {
    question: "Puedo hacer una reseña sin haber inciado sesión?",
    answer: "No, necesitarás iniciar sesión o crear una cuenta si todavía no la tienes para poder compartir tú opinión en una reseña.",
  },
  {
    question: "¿Puedo editar una reseña?",
    answer: "No, pero puedes eliminar esa reseña, yendo al apartado de mis reseñas y haciendo clic en el icono de eliminar.",
  },
];

export default function Faq() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    if (openIndex === index) {
      setOpenIndex(null);
    } else {
      setOpenIndex(index);
    }
  };

  return (
    <section className="max-w-3xl mx-auto p-6 bg-white rounded-md shadow-md my-10">
      <h2 className="text-3xl font-bold mb-6 text-center text-amber-800">Preguntas Frecuentes</h2>
      <div>
        {faqs.map((faq, index) => (
          <div key={index} className="border-b border-gray-200">
            <button
              onClick={() => toggle(index)}
              className="w-full flex justify-between items-center py-4 text-left text-gray-700 hover:text-amber-600 focus:outline-none"
            >
              <span className="text-lg font-medium">{faq.question}</span>
              <span className="text-2xl">{openIndex === index ? "−" : "+"}</span>
            </button>
            {openIndex === index && (
              <p className="px-4 pb-4 text-gray-700">{faq.answer}</p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
