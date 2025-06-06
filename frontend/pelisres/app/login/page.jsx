"use client";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useRouter} from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import logo from "../../public/images/prueba4.png";
import Footer from "../sections/Footer/FooterComponent";
import { jwtDecode } from "jwt-decode";
import Loading from "../components/Loader/RouteLoader";

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [loginError, setLoginError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
 

  const onSubmit = async (data) => {
    setLoading(true);
    setLoginError("");

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const text = await response.text();
      const result = text ? JSON.parse(text) : {};

      if (response.ok) {
        localStorage.setItem("token", result.access_token);
        const decoded = jwtDecode(result.access_token);
        const username = decoded.name;

        // console.log(decoded);

        localStorage.setItem("loginSuccessMessage", `👋🏻 Bienvenido de vuelta, ${username}!`);
        
        if (decoded.role === "ADMIN") {
          router.push("/admin")
        } else {
          router.push("/");
        }

      } else {
        setLoginError(result.message || "El correo o la contraseña son incorrectos");
      }
    } catch (error) {
      console.error("Error en login:", error);
      setLoginError("Error de conexión con el servidor");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {loading && <Loading />}
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
              Inicia Sesión
              <span className="absolute left-0 w-4 h-4 rounded-full bg-amber-600 animate-pulse"></span>
              <span className="absolute left-0 w-4 h-4 rounded-full bg-amber-600"></span>
            </p>

            {loginError && (
              <p className="text-red-600 text-sm font-medium text-center">{loginError}</p>
            )}

            <label className="relative">
              <input
                placeholder="Correo electrónico"
                type="email"
                {...register("email", {
                  required: "El correo es obligatorio",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Correo inválido",
                  },
                })}
                className="w-full p-2 border rounded-md outline-none focus:border-amber-500"
              />
              {errors.email && (
                <span className="text-red-500 text-xs">{errors.email.message}</span>
              )}
            </label>

            <label className="relative">
              <input
                placeholder="Contraseña"
                type="password"
                {...register("password", {
                  required: "La contraseña es obligatoria",
                  minLength: {
                    value: 7,
                    message: "La contraseña debe tener al menos 7 caracteres",
                  },
                })}
                className="w-full p-2 border rounded-md outline-none focus:border-amber-500"
              />
              {errors.password && (
                <span className="text-red-500 text-xs">{errors.password.message}</span>
              )}
            </label>

            <button
              type="submit"
              className="w-full py-2 mt-3 bg-amber-600 text-white rounded-md hover:bg-amber-700 transition"
            >
              Iniciar Sesión
            </button>

            <Link href="/register" className="text-sm hover:underline cursor-pointer text-start">
                ¿No tienes una cuenta todavía? Registrarse
            </Link>
          </form>
        </div>
        <Footer />
      </div>
    </div>
  );
}
