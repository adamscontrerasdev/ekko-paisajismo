"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";

interface SectionContextProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

const SectionContext = createContext<SectionContextProps | undefined>(undefined);

export const SectionProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [activeSection, setActiveSection] = useState<string>("");

  return (
    <SectionContext.Provider value={{ activeSection, setActiveSection }}>
      {children}
    </SectionContext.Provider>
  );
};

export const useSection = (): SectionContextProps => {
  const context = useContext(SectionContext);
  if (!context) {
    throw new Error("useSection must be used within a SectionProvider");
  }
  return context;
};
