"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import logo from "../../../../public/images/prueba4.png";
import Dropdown from "../../../sections/components/Dropdown/DropdownComponent";
import { jwtDecode } from "jwt-decode";

const Header = () => {
  const [token, setToken] = useState(null);
  const [username, setUsername] = useState(null);

  useEffect(() => {
    const savedToken = localStorage.getItem("token");

    setToken(savedToken); 


    if (savedToken) {
      
      try {
        const decodedToken = jwtDecode(savedToken);
        setUsername(decodedToken.name); 
        console.log("Este es el rol:" + decodedToken.role)

      } catch (error) {
        console.error("Error decodificando el token:", error);
      }
    }
  }, []); 

  

  return (
    <div className="flex w-screen flex-col">
      <header className="relative flex w-3/4 max-w-screen flex-col overflow-visible px-4 py-4 text-white md:mx-auto md:flex-row md:items-center">
        <a
          href="#"
          className="flex cursor-pointer items-center whitespace-nowrap text-2xl font-black"
        >
          <span className=" text-4xl text-amber-400">
            <Image
              src={logo}
              alt="Logo de la aplicación"
              width={150}
              height={150}
            />
          </span>
        </a>

        <nav
          aria-label="Header Navigation"
          className="flex w-full flex-col items-center justify-between md:ml-24 md:flex-row md:items-start"
        >
          <ul className="flex flex-col items-center space-y-2 space-x-8 md:ml-auto md:flex-row md:space-y-0">
            <li>
              <p>Bienvenido de nuevo {username ? username : "Invitado"}</p>
            </li>

            <Dropdown
              onLogout={() => {
                localStorage.removeItem("token");
                setToken(null);
                setUsername(null); 
              }}
            />
          </ul>
        </nav>
      </header>
    </div>
  );
};

export default Header;
