"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";

import TableUsers from "./sections/TableUsers/TableUsers";
import TableReviews from "./sections/TableReviews/TableReviews";
import Header from "./sections/Header/Header";

export default function Admin() {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [view, setView] = useState("users"); 

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/login");
      return;
    }

    try {
      const decoded = jwtDecode(token);
      const currentTime = Date.now() / 1000;

      if (decoded.exp < currentTime) {
        router.push("/login");
        return;
      }

      if (decoded.role !== "ADMIN") {
        router.push("/");
        return;
      }

      setIsAuthorized(true);
    } catch (err) {
      console.error("Token inválido", err);
      router.push("/login");
    } finally {
      setCheckingAuth(false);
    }
  }, []);

  if (checkingAuth) return null;

  return (
    isAuthorized && (
      <div className="bg-gradient-to-l from-amber-950 to-amber-600 min-h-screen">
        <Header />

        <div className="flex justify-center space-x-4 my-4">
          <button
            onClick={() => setView("users")}
            className={`px-4 py-2 rounded cursor-pointer ${view === "users" ? "bg-amber-500 text-white" : "bg-white text-black"}`}
          >
            Administrar Usuarios
          </button>
          <button
            onClick={() => setView("reviews")}
            className={`px-4 py-2 rounded cursor-pointer ${view === "reviews" ? "bg-amber-500 text-white" : "bg-white text-black"}`}
          >
            Administrar Reseñas
          </button>
        </div>

        {view === "users" ? <TableUsers /> : <TableReviews />}
      </div>
    )
  );
}
