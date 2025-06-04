"use client";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import logo from "../../public/images/prueba4.png";
import Footer from "../sections/Footer/FooterComponent";
import { useState } from "react";

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [serverError, setServerError] = useState("");
  const router = useRouter();

  const onSubmit = async (data) => {
  console.log("Formulario enviado", data);
  setServerError(""); 

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const text = await response.text();
    console.log("Respuesta cruda del servidor:", text);

    let responseData;
    try {
      responseData = JSON.parse(text);
    } catch (e) {
      responseData = { message: "Respuesta del servidor no es JSON válido" };
    }

    console.log("Respuesta parseada:", responseData);

    if (response.ok) {
      localStorage.setItem("token", responseData.access_token);
      localStorage.setItem(
        "registerSuccessMessage",
        "¡Registro exitoso! 👋🏻 Bienvenido, " + data.name + "."
      );
      router.push("/");
    } else {
      setServerError(responseData.message || "Error inesperado del servidor");
    }
  } catch (error) {
    console.error("Error durante el registro:", error);
    setServerError("No se pudo conectar con el servidor");
  }
};


  return (
    <div className="bg-gradient-to-r from-amber-600 to-amber-950 h-screen">
      <div className="flex justify-start ml-9 pt-5">
        <Link href="/">
          <Image
            src={logo}
            alt="Logo de la aplicación"
            width={100}
            height={100}
          />
        </Link>
      </div>

      <div className="flex items-center justify-center mt-35 mb-50">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-3 sm:w-[35em] w-[20em] bg-white p-6 rounded-2xl relative shadow-md"
        >
          <p className="text-2xl font-semibold text-amber-600 tracking-tight relative flex items-center pl-8">
            Registrar
            <span className="absolute left-0 w-4 h-4 rounded-full bg-amber-600 animate-pulse"></span>
            <span className="absolute left-0 w-4 h-4 rounded-full bg-amber-600"></span>
          </p>

          <label htmlFor="name" className="text-md font-medium text-gray-700">
            Nombre de usuario (mínimo 3 caracteres) *
          </label>
          <input
            id="name"
            placeholder="usuario1234"
            type="text"
            {...register("name", {
              required: "Este campo es obligatorio",
              minLength: {
                value: 3,
                message: "Debe tener al menos 3 caracteres",
              },
            })}
            className="w-full p-2 border rounded-md outline-none focus:border-amber-500"
          />
          {errors.name && (
            <p className="text-red-600 text-sm mt-1">{errors.name.message}</p>
          )}

          <label htmlFor="email" className="text-md font-medium text-gray-700">
            Correo electrónico válido (ej. example@example.com) *
          </label>
          <input
            id="email"
            placeholder="example@example.com"
            type="email"
            {...register("email", {
              required: "Este campo es obligatorio",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Correo electrónico inválido",
              },
            })}
            className="w-full p-2 border rounded-md outline-none focus:border-amber-500"
          />
          {errors.email && (
            <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>
          )}

          <label
            htmlFor="password"
            className="text-md font-medium text-gray-700"
          >
            Contraseña (mínimo 7 caracteres) *
          </label>
          <input
            id="password"
            placeholder="Contraseña"
            type="password"
            {...register("password", {
              required: "Este campo es obligatorio",
              minLength: {
                value: 7,
                message: "Este campo debe tener al menos 7 caracteres",
              },
            })}
            className="w-full p-2 border rounded-md outline-none focus:border-amber-500"
          />
          {errors.password && (
            <p className="text-red-600 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
          {serverError && (
            <p className="text-red-600 text-sm mt-1 text-center">
              {serverError}
            </p>
          )}

          <button
            type="submit"
            className="w-full py-2 mt-3 bg-amber-600 text-white rounded-md hover:bg-amber-700 transition"
          >
            Registrar
          </button>
        </form>
      </div>

      <Footer />
    </div>
  );
}
