"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";

import TableUsers from "./sections/TableUsers/TableUsers";
import Header from "./sections/Header/Header";

export default function Admin() {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true); 

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
        console.error("Token expirado");
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
        <TableUsers />
      </div>
    )
  );
}
