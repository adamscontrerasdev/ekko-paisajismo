"use client";
import React, { createContext, useContext, useEffect, ReactNode } from "react";

// Creamos el contexto con el tipo correcto (null en lugar de any)
const PreventZoomContext = createContext<null>(null);

interface PreventZoomProviderProps {
  children: ReactNode; // Definimos el tipo para children
}

export const PreventZoomProvider: React.FC<PreventZoomProviderProps> = ({ children }) => {
  useEffect(() => {
    // Prevent zoom with Ctrl + Scroll
    const preventWheelZoom = (e: WheelEvent) => {
      if (e.ctrlKey) {
        e.preventDefault();
      }
    };

    // Prevent zoom with Ctrl + Plus/Minus
    const preventKeyZoom = (e: KeyboardEvent) => {
      if (e.ctrlKey && (e.key === "+" || e.key === "-" || e.key === "=")) {
        e.preventDefault();
      }
    };

    // Prevent zoom with pinch gesture
    const handleGesture = (e: Event) => e.preventDefault();

    // Prevent zoom with double tap
    const handleDoubleTap = (e: MouseEvent) => e.preventDefault();

    // Escuchar eventos
    document.addEventListener("gesturestart", handleGesture);
    document.addEventListener("gesturechange", handleGesture);
    document.addEventListener("gestureend", handleGesture);
    document.addEventListener("dblclick", handleDoubleTap);
    window.addEventListener("wheel", preventWheelZoom, { passive: false });
    window.addEventListener("keydown", preventKeyZoom);

    return () => {
      // Limpiar los eventos al desmontar
      document.removeEventListener("gesturestart", handleGesture);
      document.removeEventListener("gesturechange", handleGesture);
      document.removeEventListener("gestureend", handleGesture);
      document.removeEventListener("dblclick", handleDoubleTap);
      window.removeEventListener("wheel", preventWheelZoom);
      window.removeEventListener("keydown", preventKeyZoom);
    };
  }, []);

  return <PreventZoomContext.Provider value={null}>{children}</PreventZoomContext.Provider>;
};

export const usePreventZoom = () => {
  const context = useContext(PreventZoomContext);
  if (context === undefined) {
    throw new Error("usePreventZoom must be used within a PreventZoomProvider");
  }
  return context;
};
