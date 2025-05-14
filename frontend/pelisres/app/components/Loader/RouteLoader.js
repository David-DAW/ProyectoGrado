// app/components/RouteLoader.js
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function RouteLoader() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleStart = () => setLoading(true);
    const handleStop = () => setLoading(false);

    router.events?.on("routeChangeStart", handleStart);
    router.events?.on("routeChangeComplete", handleStop);
    router.events?.on("routeChangeError", handleStop);

    return () => {
      router.events?.off("routeChangeStart", handleStart);
      router.events?.off("routeChangeComplete", handleStop);
      router.events?.off("routeChangeError", handleStop);
    };
  }, [router]);

  return (
    loading && (
      <div className="fixed inset-0 z-50 bg-black bg-opacity-80 flex items-center justify-center text-white text-xl">
        Cargando...
      </div>
    )
  );
}
