"use client";
import React, { useEffect, useState } from "react";
import { useIsMobile } from "@/app/Elements/Hooks/ScreenSizeContext";
import { IoIosArrowDown } from "react-icons/io";
import Link from "next/link";
import { InicioComponent } from "@/app/components";

// Función de interpolación para suavizar el movimiento
const lerp = (start: number, end: number, factor: number) => {
  return start * (1 - factor) + end * factor;
};

export const Inicio = () => {
  const [scrollY, setScrollY] = useState(0);
  const [smoothScroll, setSmoothScroll] = useState(0);
  const { isMobile } = useIsMobile();

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    let animationFrame: number;

    const smoothMotion = () => {
      setSmoothScroll((prev) => (scrollY > prev ? lerp(prev, scrollY, 0.1) : scrollY));
      animationFrame = requestAnimationFrame(smoothMotion);
    };

    animationFrame = requestAnimationFrame(smoothMotion);
    return () => cancelAnimationFrame(animationFrame);
  }, [scrollY]);

  return (
    <div
      className="relative h-[170vh] md:h-[200vh] overflow-hidden"
      style={{
        background: "linear-gradient(to right, #C9C1B6, #E5E2DD, #C0BBB5)",
      }}
    >
      <div className="relative h-[100vh] z-10 overflow-hidden">
        {/* Fondo completo con efecto parallax */}
        <div
          className="absolute top-0 left-0 w-full h-[100vh] bg-cover bg-top z-10"
          style={{
            backgroundImage: "url('/Img/Composicion-inicio/composicion-inicio-fondo.png')",
            backgroundSize: "cover",
            backgroundPosition: "top",
            transform: `translateY(${smoothScroll * 0.5}px)`,
          }}
        />
        {/* Texto centrado */}

        {isMobile ? (
          <h1
            className="absolute top-1/2  left-0 z-20 w-[60%] pl-5 text-3xl font-bold text-white"
            style={{
              transform: `translate(0, calc(-50% + ${smoothScroll}px))`,
            }}
          >
            Diseñamos espacios para conectárte con la naturaleza
          </h1>
        ) : (
          <h1
            className={`z-20 absolute top-1/2 left-[35%] md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-bold text-white`}
            style={{
              transform: `translate(-50%, calc(-50% + ${smoothScroll}px))`,
            }}
          >
            Diseñamos espacios para conectárte con la naturaleza
          </h1>
        )}

        <div
          className="absolute top-0 left-0 w-full h-[100vh] bg-cover z-30"
          style={{
            backgroundImage: "url('/Img/Composicion-inicio/ellaPerfect.png')",
            backgroundSize: "cover", // Asegura que mantenga el tamaño original
            backgroundPosition: "right 33% bottom",
            backgroundRepeat: "no-repeat",
          }}
        />
        {/* Flecha de navegación */}
        <div className="absolute bottom-0 w-full h-20 animate-bounce z-30 flex justify-center items-center">
          <Link href="#inicio-texto">
            <IoIosArrowDown className="fill-white text-5xl cursor-pointer" />
          </Link>
        </div>
      </div>

      {/* Sección inferior (Roca) */}
      <div
        id="inicio-texto"
        className="absolute top-[100vh] left-0 w-full h-[100vh] bg-cover z-10 bg-black"
        style={{
          backgroundImage: "url('/Img/Composicion-inicio/rocaPerfect.png')",
          backgroundSize: "cover",
          backgroundPosition: "right 33% top",
          backgroundRepeat: "no-repeat",
        }}
      >
        <InicioComponent></InicioComponent>
      </div>
    </div>
  );
};
