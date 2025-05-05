"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";

const Dropdown = ({ onLogout }) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => setOpen(!open);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <li className="relative md:mr-12" ref={dropdownRef}>
      <button onClick={toggleDropdown}>
        <img
          src="/images/iconos/perfil.png"
          className="h-8 w-8 rounded-full object-cover cursor-pointer"
          alt="Perfil"
        />
      </button>

      {open && (
        <ul className="absolute right-0 mt-2 w-48 rounded-md bg-white py-2 text-sm text-black shadow-lg z-50">
          <li>
            <Link href="/perfil" className="block px-4 py-2 hover:bg-gray-100">
              Mi Perfil
            </Link>
          </li>
          <li>
            <Link href="/mis-resenas" className="block px-4 py-2 hover:bg-gray-100">
              Mis Reseñas
            </Link>
          </li>
          <li>
            <button
              onClick={onLogout}
              className="block w-full text-left px-4 py-2 hover:bg-gray-100"
            >
              Cerrar sesión
            </button>
          </li>
        </ul>
      )}
    </li>
  );
};

export default Dropdown;