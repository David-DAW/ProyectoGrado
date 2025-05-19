"use client";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import logo from "../../public/images/prueba4.png";
import Footer from "../sections/Footer/FooterComponent";

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const router = useRouter();

  const onSubmit = async (data) => {
    console.log("Formulario enviado", data);

    try {
      const response = await fetch("http://172.22.229.1:8080/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const responseData = await response.json();
      console.log("Respuesta en JSON", responseData);

      if (response.ok) {
        localStorage.setItem("token", responseData.access_token);
        localStorage.setItem("registerSuccessMessage", "¡Registro exitoso! 👋🏻 Bienvenido, " + (data.name) + ".");
        router.push("/");
      } else {
        alert(`Credenciales incorrectas: ${responseData.message || "Error desconocido"}`);
      }
    } catch (error) {
      console.error("Error durante el login:", error);
      alert("Error de conexión con el servidor");
    }
  };

  return (
    <div className="bg-gradient-to-r from-amber-600 to-amber-950 h-screen">
      <div className="flex justify-start ml-9 pt-5">
        <Link href="/">
          <Image src={logo} alt="Logo de la aplicación" width={100} height={100} />
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

          <label className="relative">
            <input
              placeholder="Nombre de Usuario"
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
          </label>

          <label className="relative">
            <input
              placeholder="Correo electrónico"
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
          </label>

          <label className="relative">
            <input
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
              <p className="text-red-600 text-sm mt-1">{errors.password.message}</p>
            )}
          </label>

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
