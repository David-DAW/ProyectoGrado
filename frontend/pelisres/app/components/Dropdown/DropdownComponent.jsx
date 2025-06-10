"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { FiLogOut, FiUser, FiStar } from "react-icons/fi";

const Dropdown = ({ onLogout }) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
  console.log("Toggle dropdown", !open);
  setOpen(!open);
};

  useEffect(() => {
    const handleClickOut = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOut);
    return () => document.removeEventListener("mousedown", handleClickOut);
  }, []);

  return (
     <div className="relative md:mr-6" ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        aria-haspopup="true"
        aria-expanded={open}
        aria-label="Abrir menú de usuario"
        className="focus:outline-none cursor-pointer"
      >
        <FiUser size={25} />
      </button>

      {open && (
        <ul className="absolute right-0 mt-2 w-52 bg-black bg-opacity-70 rounded-xl shadow-lg ring-1 ring-black/10 z-50 animate-fade-in">
          <li>
            <Link
              href="/#"
              className="flex items-center gap-2 px-4 py-2 text-sm text-gray-100 hover:bg-amber-700 rounded-t-xl transition-colors duration-150"
            >
              <FiUser /> Mi Perfil
            </Link>
          </li>
          <li>
            <Link
              href="/myReviews"
              className="flex items-center gap-2 px-4 py-2 text-sm text-gray-100 hover:bg-amber-700 transition-colors duration-150"
            >
              <FiStar /> Mis Reseñas
            </Link>
          </li>
          <li>
            <button
              onClick={onLogout}
              className="flex items-center gap-2 w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-amber-800 rounded-b-xl transition-colors duration-150 cursor-pointer"
            >
              <FiLogOut /> Cerrar sesión
            </button>
          </li>
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
