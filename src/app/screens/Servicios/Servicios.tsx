"use client";
import React, { useState, useRef, useEffect } from "react";
import Data from "../../../../public/Data/Servicios.json";
import TiltedCard from "./TitledCard";
import { useIsMobile } from "@/app/Elements/Hooks/ScreenSizeContext";

export const Servicios = () => {
  const { screenSize } = useIsMobile();
  const servicios = Data.servicios;
  const [focused, setFocused] = useState<string | null>(null);
  const [offsets, setOffsets] = useState<{
    [key: string]: { x: number; y: number };
  }>({});
  const [zIndexState, setZIndexState] = useState<{ [key: string]: boolean }>({});
  const [movPicksToSeeDescrption, setMovPicksToSeeDescrption] = useState<{
    x: number;
    y: number;
  }>({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null); // 🛑 Guardamos el ID del setTimeout

  const handleClick = (title: string, index: number) => {
    if (focused === title) {
      setFocused(null);
      return;
    }

    if (containerRef.current && cardRefs.current[index]) {
      const parentRect = containerRef.current.getBoundingClientRect();
      const cardRect = cardRefs.current[index]!.getBoundingClientRect();

      const parentCenterX = parentRect.left + parentRect.width / 2;
      const parentCenterY = parentRect.top + parentRect.height / 2;
      const cardCenterX = cardRect.left + cardRect.width / 2;
      const cardCenterY = cardRect.top + cardRect.height / 2;

      const offsetX = parentCenterX - cardCenterX;
      const offsetY = parentCenterY - cardCenterY;

      setOffsets({ [title]: { x: offsetX, y: offsetY } });
      setFocused(title);

      // Activar el zIndex inmediatamente al enfocar
      setZIndexState((prev) => ({ ...prev, [title]: true }));

      // 🛑 Si hay un timeout activo, lo limpiamos antes de crear uno nuevo
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    }
  };

  useEffect(() => {
    if (focused === null) {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        setZIndexState({});
      }, 1000);
    }

    if (focused) {
      // Limpiar el timeout existente antes de establecer uno nuevo
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      let percentLeft = 0;
      if (screenSize === "sm") {
        percentLeft = 0.3;
      } else if (screenSize === "md") {
        percentLeft = 0.5;
      } else {
        percentLeft = 0.3;
      }

      timeoutRef.current = setTimeout(() => {
        if (containerRef.current) {
          const containerWidth = containerRef.current.offsetWidth;
          const moveAmount = Math.min(containerWidth * percentLeft, 250); // Mover 30% del ancho del contenedor, con un límite de 250px

          setMovPicksToSeeDescrption({
            x: moveAmount,
            y: moveAmount,
          });
        }
      }, 500);
    } else {
      // Limpiar el timeout cuando se cancela el enfoque
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      setMovPicksToSeeDescrption({
        x: 0,
        y: 0,
      });
    }

    return () => {
      // Limpiar el timeout al desmontar
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [focused]);

  useEffect(() => {
    let lastHash = window.location.hash;

    const checkHash = setInterval(() => {
      if (window.location.hash !== lastHash) {
        lastHash = window.location.hash;
        setFocused("");
      }
    }, 500);

    return () => clearInterval(checkHash);
  }, []);

  return (
    <div
      className="w-screen min-h-screen bg-black flex flex-col justify-start items-center 
      p-0 gap-5 overflow-hidden pt-[5rem]"
      id="servicios"
    >
      <h1 className="text-white font-bold text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl">
        Servicios
      </h1>

      <div
        ref={containerRef}
        className={`2xl:w-[60%] lg:w-[70%] md:w-[65%] h-3/4 flex flex-wrap gap-5 md:gap-5  justify-center items-center relative `}
      >
        {servicios.map((servicio, index) => {
          const isFocused = focused === servicio.title;
          const offset = offsets[servicio.title] || { x: 0, y: 0 };
          const isZIndexActive = zIndexState[servicio.title] ?? false;

          return (
            <div
              key={index}
              ref={(el) => {
                cardRefs.current[index] = el;
              }}
              onClick={() => handleClick(servicio.title, index)}
              style={{
                transform: isFocused
                  ? `translate(${
                      screenSize !== "sm" ? offset.x - movPicksToSeeDescrption.x : offset.x
                    }px, ${
                      screenSize !== "sm" ? offset.y : offset.y - movPicksToSeeDescrption.y
                    }px) scale(1.2)`
                  : "translate(0, 0) scale(1)",
                transition:
                  "transform 0.4s ease-in-out, opacity 0.2s ease-in-out, filter 0.5s ease-in-out, width .3s ease-in-out",
                cursor: "pointer",
                position: "relative",
                zIndex: isZIndexActive ? 99 : 1,
                opacity: focused ? (focused === servicio.title ? 1 : 0) : 1,
                pointerEvents: focused ? (focused === servicio.title ? "auto" : "none") : "auto",
                userSelect: "none",
                WebkitUserSelect: "none",
                filter: focused
                  ? focused === servicio.title
                    ? "blur(0px)"
                    : "blur(10px)"
                  : "blur(0px)",
              }}
            >
              <TiltedCard
                imageSrc={servicio.image}
                altText={servicio.title}
                captionText={focused ? "Cerra detalles" : "Ver detalles"}
                containerHeight={
                  screenSize === "sm"
                    ? "150px"
                    : screenSize === "md"
                      ? "250px"
                      : screenSize === "lg"
                        ? "200px"
                        : screenSize === "xl"
                          ? "250px"
                          : "300px"
                }
                containerWidth={
                  screenSize === "sm"
                    ? "150px"
                    : screenSize === "md"
                      ? "250px"
                      : screenSize === "lg"
                        ? "200px"
                        : screenSize === "xl"
                          ? "250px"
                          : "300px"
                }
                imageHeight={
                  screenSize === "sm"
                    ? "150px"
                    : screenSize === "md"
                      ? "250px"
                      : screenSize === "lg"
                        ? "200px"
                        : screenSize === "xl"
                          ? "250px"
                          : "300px"
                }
                imageWidth={
                  screenSize === "sm"
                    ? "150px"
                    : screenSize === "md"
                      ? "250px"
                      : screenSize === "lg"
                        ? "200px"
                        : screenSize === "xl"
                          ? "250px"
                          : "300px"
                }
                rotateAmplitude={12}
                scaleOnHover={screenSize !== "sm" ? 1.1 : 1}
                showMobileWarning={false}
                showTooltip={true}
                displayOverlayContent={true}
                overlayContent={
                  <p className="font-bold text-[.4rem] md:text-xs 2xl:text-sm">{servicio.title}</p>
                }
              />
              <p
                id={`description-${index}`} // Asignamos un ID único al <p>
                className="absolute text-white xl:font-bold text-[.5rem] md:text-sm 2xl:text-lg pointer-events-none transition-all duration-500 md:pl-5 transform -z-10 w-[50vw] xl:w-[30vw] text-center md:text-left"
                style={{
                  filter: movPicksToSeeDescrption.x
                    ? "blur(0px) grayscale(1)"
                    : "blur(10px) grayscale(1)",
                  opacity: movPicksToSeeDescrption.x ? 1 : 0,
                  top: screenSize === "sm" ? (movPicksToSeeDescrption.x ? "110%" : "50%") : "50%",
                  left: screenSize === "sm" ? "50%" : movPicksToSeeDescrption.x ? "100%" : "50%",
                  transform: screenSize === "sm" ? "translate(-50%, 0%)" : "translateY(-50%)",
                  overflow: "hidden",
                }}
              >
                {servicio.description}
              </p>
            </div>
          );
        })}
      </div>
      <div
        className="w-screen h-[calc(100vh-5rem)]  z-[9999999] fixed bottom-0 left-0"
        style={{
          pointerEvents: focused ? "auto" : "none",
          zIndex: focused ? 99 : 1,
        }}
        onClick={() => setFocused(null)}
      ></div>
    </div>
  );
};
