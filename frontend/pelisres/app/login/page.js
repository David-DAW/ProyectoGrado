"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import logo from "../../public/images/prueba4.png";
import Footer from "../sections/Footer/FooterComponent";
import { jwtDecode } from "jwt-decode";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Formulario enviado");

    try {
      const response = await fetch("http://localhost:8080/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      console.log("Respuesta del servidor", response);

      const data = await response.json();
      console.log("Respuesta en JSON", data);

      if (response.ok) {
        console.log("Login exitoso", data);
        localStorage.setItem("token", data.access_token);
        const token = localStorage.getItem("token");
        const decoded = jwtDecode(token);
        console.log(decoded.role);
        router.push("/");
      } else {
        alert(
          `Credenciales incorrectas: ${data.message || "Error desconocido"}`
        );
      }
    } catch (error) {
      console.error("Error durante el login:", error);
      alert("Error de conexión con el servidor");
    }
  };

  return (
    <div className=" bg-gradient-to-r from-amber-600 to-amber-950 h-screen">
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
          onSubmit={handleSubmit}
          className="flex flex-col gap-3 sm:w-[35em] w-[20em] bg-white p-6 rounded-2xl relative shadow-md"
        >
          <p className="text-2xl font-semibold text-amber-600 tracking-tight relative flex items-center pl-8">
            Inicia Sesión
            <span className="absolute left-0 w-4 h-4 rounded-full bg-amber-600 animate-pulse"></span>
            <span className="absolute left-0 w-4 h-4 rounded-full bg-amber-600"></span>
          </p>

          <label className="relative">
            <input
              required
              placeholder="Correo electrónico"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border rounded-md outline-none focus:border-amber-500"
            />
          </label>

          <label className="relative">
            <input
              required
              placeholder="Contraseña"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border rounded-md outline-none focus:border-amber-500"
            />
          </label>

          <button
            type="submit"
            className="w-full py-2 mt-3 bg-amber-600 text-white rounded-md hover:bg-amber-700 transition"
          >
            Iniciar Sesión
          </button>

          <Link href="/register">
            <p className="text-sm hover:underline cursor-pointer">
              ¿No tienes una cuenta todavía? Registrarse
            </p>
          </Link>
        </form>
      </div>
      <Footer />
    </div>
  );
}
