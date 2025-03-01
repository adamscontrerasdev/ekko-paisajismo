import { useIsMobile } from "@/app/Elements/Hooks/ScreenSizeContext";
import Link from "next/link";
import React from "react";
import { FaInstagram, FaWhatsapp } from "react-icons/fa";
import { IoIosMail } from "react-icons/io";

export const Contacto = () => {
  // Detect if the user is on mobile
  const { isMobile } = useIsMobile();

  // Create a mapping of icon names to their components
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
      root: "https://wa.me/+5491165961777?text=Hola%20Loida%20me%20comunico%20desde%20tu%20p%C3%A1gina%20web%20porque%20me%20interesa%20tus%20servicios%20y%20quisiera%20saber%20cuales%20son%20los%20pasos%20que%20debo%20seguir%20para%20pautar%20una%20cita",
    },
  ];

  // Pass the actual component instead of a string
  const renderIcon = (
    IconComponent: React.ElementType,
    color: string,
    index: number,
    root: string
  ) => {
    return (
      <Link
        href={root}
        className="p-2 flex justify-center items-center rounded-2xl"
        key={index}
        target="_blank" // Open in new tab for desktop and WhatsApp
        rel="noopener noreferrer"
        style={{
          background: "linear-gradient(45deg, rgba(0, 0, 0, 0.8), rgba(60, 60, 60, 0.9))",
        }}
      >
        <IconComponent className="text-4xl" style={{ color }} />
      </Link>
    );
  };

  return (
    <div
      className="w-screen h-screen bg-black pt-28 flex flex-col justify-start relative items-center"
      id="contacto"
    >
      <h1>Contacto</h1>
      <div
        className="w-80 p-2 bg-[#1c1c1c] bottom-0 absolute flex justify-evenly items-center"
        style={{
          borderRadius: "30px 30px 0px 0px",
        }}
      >
        {icons.map((icon, index) => renderIcon(icon.component, icon.color, index, icon.root))}
      </div>
    </div>
  );
};
