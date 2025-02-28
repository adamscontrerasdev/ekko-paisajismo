"use client";

import React from "react";
import { useSection } from "@/app/Elements";

export const Indicador = () => {
  const { activeSection } = useSection(); // Usa el contexto global
  const sections = ["Inicio", "Nosotros", "Servicios", "Contacto"];
  const sectionIds = ["inicio", "nosotros", "servicios", "contacto"];

  return (
    <div className="h-screen opacity-100 fixed top-0 right-0 z-[99] flex justify-end">
      <div className="h-screen md:w-32 flex flex-col justify-center md:items-center items-end ">
        <div
          className="w-[2px] h-3/4 flex flex-col gap-10 justify-center items-center"
          style={{
            background: "linear-gradient(to bottom, transparent, white, transparent)",
          }}
        >
          {sections.map((sec, index) => (
            <a
              key={sec}
              href={`#${sectionIds[index]}`}
              className={`w-5 h-5 rotate-45 transition-all duration-500 ${
                activeSection === sectionIds[index] ? "bg-[#EBC65B] scale-150" : "bg-white"
              }`}
            ></a>
          ))}
        </div>
      </div>
    </div>
  );
};
