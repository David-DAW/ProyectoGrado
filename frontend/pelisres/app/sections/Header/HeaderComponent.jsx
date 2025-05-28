"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import logo from "../../../public/images/prueba4.png";
import Dropdown from "../../components/Dropdown/DropdownComponent";
import { Menu, X } from "lucide-react";
import FormSearch from "../../components/FormSearch/FormSearch";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";

const Header = () => {
  const [token, setToken] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const savedToken = localStorage.getItem("token");

    if (savedToken) {
      try {
        const decodedToken = jwtDecode(savedToken);
        const timeNow = Date.now() / 1000;

        if (decodedToken.exp && decodedToken.exp < timeNow) {
          localStorage.removeItem("token");
          setToken(null);
        } else {
          setToken(savedToken);
        }
      } catch (error) {
        console.error("Error decoding token:", error);
        localStorage.removeItem("token");
        setToken(null);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setIsMenuOpen(false);
    router.push("/");
  };

  const handleLinkClick = () => {
    if (isMenuOpen) setIsMenuOpen(false);
  };

  // ✅ Nuevo: Controla el click en el logo en mobile
  const handleLogoClick = (e) => {
    if (typeof window !== "undefined" && window.innerWidth < 768) {
      e.preventDefault();
      setIsMenuOpen(!isMenuOpen);
    }
  };

  return (
    <div className="flex w-screen flex-col">
      <header className="relative w-full px-4 py-4 text-white md:mx-auto md:w-3/4 flex items-center justify-between z-50">
        <div className="flex items-center justify-between w-full md:w-auto">
          <Link
            href="/"
            className="flex items-center whitespace-nowrap text-2xl font-black"
            onClick={handleLogoClick} 
          >
            <Image
              src={logo}
              alt="Logo de la aplicación"
              width={100}
              height={100}
              className="mt-3"
            />
          </Link>

          <button
            className="md:hidden text-white z-40 relative -top-6"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
          </button>

          <FormSearch />
        </div>

        <nav
          className={`
            fixed top-[68px] left-0 right-0 bg-black/90 backdrop-blur-md overflow-visible
            transition-all duration-300 ease-in-out
            md:static md:bg-transparent md:backdrop-blur-0 md:overflow-visible
            ${
              isMenuOpen
                ? "max-h-screen px-6 py-6 flex flex-col gap-6"
                : "max-h-0 px-0 py-0 hidden md:flex md:flex-row"
            }
          `}
        >
          <ul className="flex flex-col md:flex-row md:items-center gap-4 md:gap-6 md:ml-4">
            <li>
              <Link
                href="/catalogueMovies"
                className="hover:font-bold"
                onClick={handleLinkClick}
              >
                Explorar Peliculas
              </Link>
            </li>
            <li className="hover:font-bold">
              <Link
                href="#"
                className="hover:font-bold"
                onClick={handleLinkClick}
              >
                Últimas Reseñas
              </Link>
            </li>

            {token && (
              <>
                <li className="md:hidden">
                  <Link
                    href="/myReviews"
                    className="hover:font-bold"
                    onClick={handleLinkClick}
                  >
                    Mis reseñas
                  </Link>
                </li>
                <li className="md:hidden">
                  <button
                    onClick={handleLogout}
                    className="hover:font-bold text-left"
                  >
                    Cerrar sesión
                  </button>
                </li>
              </>
            )}

            {token ? (
              <li className="hidden md:block">
                <Dropdown onLogout={handleLogout} />
              </li>
            ) : (
              <li>
                <Link
                  href="/login"
                  className="text-sm whitespace-nowrap rounded-full border-2 border-white px-4 py-1 text-white hover:bg-amber-400 hover:text-white transition-colors"
                  onClick={handleLinkClick}
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
