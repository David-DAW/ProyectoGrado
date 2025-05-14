"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { FiLogOut, FiUser, FiStar } from "react-icons/fi";

const Dropdown = ({ onLogout }) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => setOpen(!open);

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
    <li className="relative md:mr-6" ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        aria-haspopup="true"
        aria-expanded={open}
        aria-label="Abrir menú de usuario"
        className="focus:outline-none"
      >
        <img
          src="/images/iconos/perfil.png"
          className="h-9 w-9 rounded-full object-cover cursor-pointer hover:scale-105 transition-transform duration-200"
          alt="Perfil"
        />
      </button>

      {/* Dropdown menu */}
      {open && (
        <ul className="absolute right-0 mt-2 w-52 bg-gray-900 rounded-xl shadow-lg ring-1 ring-black/10 z-50 animate-fade-in">
          <li>
            <Link
              href="/perfil"
              className="flex items-center gap-2 px-4 py-2 text-sm text-gray-100 hover:bg-gray-700 rounded-t-xl transition-colors duration-150"
            >
              <FiUser /> Mi Perfil
            </Link>
          </li>
          <li>
            <Link
              href="/mis-resenas"
              className="flex items-center gap-2 px-4 py-2 text-sm text-gray-100 hover:bg-gray-700 transition-colors duration-150"
            >
              <FiStar /> Mis Reseñas
            </Link>
          </li>
          <li>
            <button
              onClick={onLogout}
              className="flex items-center gap-2 w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-gray-700 rounded-b-xl transition-colors duration-150"
            >
              <FiLogOut /> Cerrar sesión
            </button>
          </li>
        </ul>
      )}
    </li>
  );
};

export default Dropdown;
