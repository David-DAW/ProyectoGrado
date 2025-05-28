"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

const FormSearch = () => {
  const [search, setSearch] = useState("");
  const router = useRouter();

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim() === "") return;
    router.push(`/search?query=${encodeURIComponent(search.trim())}`);
  };

  return (
    <form
      onSubmit={handleSearch}
      className="flex items-center w-full md:w-auto space-x-3 md:ml-4"
    >
      <div className="relative w-full md:w-200">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Busca una película..."
          className="bg-white text-amber-800 rounded-lg w-full py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 transition duration-300"
          aria-label="Buscar película"
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-amber-500"
          viewBox="0 0 20 20"
          fill="none"
        >
          <path
            d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </form>
  );
};

export default FormSearch;
