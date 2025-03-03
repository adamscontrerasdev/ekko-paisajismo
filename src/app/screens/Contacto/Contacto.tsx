"use client"; // Usar en cliente
import React, { useEffect, useState } from "react";
import { FaInstagram, FaWhatsapp } from "react-icons/fa";
import { IoIosMail } from "react-icons/io";
import Link from "next/link";
import Image from "next/image";
import { useIsMobile } from "@/app/Elements/Hooks/ScreenSizeContext";

export const Contacto = () => {
  const [focus, setFocus] = useState(false);
  const fatherRef = React.useRef<HTMLDivElement>(null);
  const { isMobile } = useIsMobile();

  const icons = [
    {
      component: FaInstagram,
      color: "#E1306C",
      root: "https://www.instagram.com/ekko.paisajismo/",
    },
    {
      component: IoIosMail,
      color: "#fff",
      root: isMobile
        ? "mailto:ekko.paisajismo@gmail.com"
        : "https://mail.google.com/mail/?view=cm&fs=1&to=ekko.paisajismo@gmail.com",
    },
    {
      component: FaWhatsapp,
      color: "#25D366",
      root: "https://wa.me/+5491165961777?text=Hola%20Loida...",
    },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const top = fatherRef.current?.getBoundingClientRect().top;
      if (top !== undefined && top <= 200) {
        setFocus(true);
        // Solo activa el rebote una vez
      } else {
        setFocus(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []); // Dependencia actualizada

  const renderIcon = (
    IconComponent: React.ElementType,
    color: string,
    index: number,
    root: string
  ) => {
    return (
      <Link
        href={root}
        className={`p-2 flex justify-center items-center rounded-2xl md:hover:scale-110 transition-all duration-300 ${
          focus ? "animate-uniqueBounce" : "animate-none"
        }`}
        key={index}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          background: "linear-gradient(45deg, rgba(0, 0, 0, 0.8), rgba(60, 60, 60, 0.9))",
        }}
      >
        <IconComponent
          className={`text-4xl transition-transform duration-300 ${focus ? "animate-uniqueBounceIcons" : "animate-none"}`}
          style={{
            color,
          }}
        />
      </Link>
    );
  };

  return (
    <div
      className="w-screen h-screen pt-28 flex flex-col justify-start relative items-center overflow-hidden"
      id="contacto"
      ref={fatherRef}
    >
      <h1 className="relative z-20">Contacto</h1>
      <div className="w-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center p-5">
        <h2
          className="text-center z-20 relative font-bold"
          style={{
            filter: focus ? "blur(0px)" : "blur(10px)",
            opacity: focus ? 1 : 0,
            transition: "all 1s ease-in-out",
          }}
        >
          ¿Quieres un espacio para conectar con la naturaleza?
        </h2>
      </div>
      <div
        className={`w-80 p-2 bg-[#1c1c1c] absolute flex justify-evenly items-center z-20 ${
          focus ? "animate-uniqueBounceContent" : "animate-none"
        }`}
        style={{
          borderRadius: "30px 30px 0px 0px",
          bottom: focus ? "0" : "-100%",
          transition: "all 0.5s ease-in-out",
        }}
      >
        {icons.map((icon, index) => renderIcon(icon.component, icon.color, index, icon.root))}
      </div>

      <div className="h-full w-full flex flex-col justify-center items-center absolute top-0 left-0 -z-10">
        <div
          className="absolute top-0 left-0 w-full h-full"
          style={{
            background: "linear-gradient(to bottom, #000, transparent )",
            backdropFilter: focus ? "blur(10px)" : "blur(0px)",
            transition: "all 0.2s ease-out",
          }}
        ></div>
        <Image
          src="/Img/finalPic.jpg"
          alt=""
          width="1920"
          height="1080"
          className="w-full h-full object-cover object-center"
        />
      </div>
    </div>
  );
};
