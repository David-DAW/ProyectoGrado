"use client";
import { useEffect, useState } from "react";
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
      className="flex items-center w-full md:w-auto"
    >
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Batman Begins"
        className="bg-gray-50 border text-amber-900 text-sm font-bold rounded-lg w-full ps-3 p-2.5 md:w-40"
      />

      <button
        type="submit"
        className="ml-2 p-2.5 text-sm font-medium text-white bg-amber-700 rounded-lg border border-amber-700 hover:bg-amber-800"
      >
        <svg className="w-4 h-4" viewBox="0 0 20 20" fill="none">
          <path
            d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </form>
  );
};
export default FormSearch;
