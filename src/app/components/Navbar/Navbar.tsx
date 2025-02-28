"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useSection } from "@/app/Elements"; // Importa el contexto global
import Image from "next/image";
import { useIsMobile } from "@/app/Elements/Hooks/ScreenSizeContext";

export const Navbar = () => {
  const { activeSection } = useSection();
  const { isMobile } = useIsMobile();
  const [currentHash, setCurrentHash] = useState("");

  const sections = [
    { id: "inicio", label: "Inicio" },
    { id: "nosotros", label: "Nosotros" },
    { id: "servicios", label: "Servicios" },
    { id: "contacto", label: "Contacto" },
  ];

  useEffect(() => {
    const handleHashChange = () => {
      setCurrentHash(window.location.hash.replace("#", ""));
    };

    // Escuchar cambios en el hash y el historial de navegación
    window.addEventListener("hashchange", handleHashChange);
    window.addEventListener("popstate", handleHashChange);

    // Establecer el hash actual al montar el componente
    handleHashChange();

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
      window.removeEventListener("popstate", handleHashChange);
    };
  }, []);

  // Sincronizar currentHash con activeSection
  useEffect(() => {
    if (activeSection) {
      setCurrentHash(activeSection);
    }
  }, [activeSection]);

  useEffect(() => {
    const id: number | null = null;

    return () => {
      if (id !== null) {
        clearTimeout(id);
      }
    };
  }, [activeSection, isMobile]);

  return (
    <div
      className={`w-screen fixed top-0 left-0 z-[99999] flex flex-col md:flex-row justify-center md:justify-between items-center lg:px-5 md:pr-10 backdrop-blur-3xl `}
      style={{
        height: activeSection === "inicio" && !isMobile ? "15rem" : "5rem",
        width: "100vw",
        transition:
          "height 1000ms ease-in-out, width 1000ms ease-in-out, background-color 300ms ease, backdrop-filter 300ms ease",
      }}
    >
      {/* Logo */}
      <div className="relative h-10 md:h-full aspect-[2/1] min-w-40 transition-all duration-1000 backdrop-blur-3xl p-2 rounded-xl">
        <Image src="/Img/logo/ekko-blanco.png" alt="Logo" layout="fill" objectFit="contain" />
      </div>

      {/* Navbar */}
      <ul
        className={`flex w-full justify-center items-center md:items-start md:w-auto md:flex-row gap-5 text-sm md:text-xl font-bold 
        ${isMobile ? "flex-row mt-0 gap-5" : ""} transition-all duration-700 md:h-full md:mt-20 `}
      >
        {sections.map(({ id, label }) => (
          <li
            key={id}
            className={`text-center backdrop-blur-3xl p-0 rounded-xl transition-all duration-300  ${
              currentHash === id ? "text-black" : ""
            }`}
          >
            <Link
              href={`/#${id}`}
              onClick={() => setCurrentHash(id)}
              className={`cursor-pointer transition-all duration-300 ${
                activeSection === id || currentHash === id
                  ? "text-green-600 scale-110"
                  : "text-white hover:text-[#f2f2f2]"
              }`}
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
