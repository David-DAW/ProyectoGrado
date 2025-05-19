"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import logo from "../../../public/images/prueba4.png";
import Dropdown from "../../components/Dropdown/DropdownComponent";
import { Menu, X } from "lucide-react";
import FormSearch from "../../components/FormSearch/FormSearch";

const Header = () => {
  const [token, setToken] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    setToken(localStorage.getItem("token"));
  }, []);


  return (
    <div className="flex w-screen flex-col">
      <header className="relative w-full px-4 py-4 text-white md:mx-auto md:w-3/4 flex items-center justify-between">
        <div className="flex items-center justify-between w-full md:w-auto">
          <a
            href="/"
            className="flex items-center whitespace-nowrap text-2xl font-black"
          >
            <Image
              src={logo}
              alt="Logo de la aplicación"
              width={100}
              height={100}
              className="mt-3"
            />
          </a>

          <button
            className="md:hidden text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        <nav
          className={`${
            isMenuOpen ? "flex" : "hidden"
          } flex-col gap-4 mt-4 md:mt-0 md:flex md:flex-row md:flex-wrap md:items-center md:ml-auto md:gap-6`}
        >
          <FormSearch />

          <ul className="flex flex-col md:flex-row md:items-center gap-4 md:gap-0">
            <Link
              href="/catalogueMovies"
              className="hover:font-bold md:mr-12"
            >
              Explorar Peliculas
            </Link>
            <li className="hover:font-bold md:mr-12">
              <a href="#">Últimas reseñas</a>
            </li>
            {token ? (
              <Dropdown
                onLogout={() => {
                  localStorage.removeItem("token");
                  setToken(null);
                }}
              />
            ) : (
              <li className="md:mr-12">
                <Link
                  href="/login"
                  className="text-sm whitespace-nowrap rounded-full border-2 border-white px-4 py-1 text-white hover:bg-amber-400 hover:text-white transition-colors"
                >
                  Iniciar Sesión
                </Link>
              </li>
            )}
          </ul>
        </nav>
      </header>
    </div>
  );
};

export default Header;
