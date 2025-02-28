"use client";
import React, { createContext, useContext, useEffect, useState } from "react";

interface IsMobileContextProps {
  isMobile: boolean;
  screenSize: string;
}

const IsMobileContext = createContext<IsMobileContextProps | undefined>(undefined);

interface IsMobileProviderProps {
  children: React.ReactNode;
}

export const IsMobileProvider: React.FC<IsMobileProviderProps> = ({ children }) => {
  // Función para determinar el tamaño de la pantalla
  const getScreenSize = (width: number): string => {
    if (width >= 1536) return "2xl";
    if (width >= 1280) return "xl";
    if (width >= 1024) return "lg";
    if (width >= 768) return "md";
    return "sm";
  };

  // Inicializa con valores por defecto y se actualiza en useEffect
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [screenSize, setScreenSize] = useState<string>("sm");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsMobile(window.innerWidth <= 768);
      setScreenSize(getScreenSize(window.innerWidth));

      const handleResize = () => {
        setIsMobile(window.innerWidth <= 768);
        setScreenSize(getScreenSize(window.innerWidth));
      };

      window.addEventListener("resize", handleResize);
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  }, []);

  return (
    <IsMobileContext.Provider value={{ isMobile, screenSize }}>{children}</IsMobileContext.Provider>
  );
};

export const useIsMobile = (): IsMobileContextProps => {
  const context = useContext(IsMobileContext);
  if (!context) {
    throw new Error("useIsMobile must be used within an IsMobileProvider");
  }
  return context;
};
