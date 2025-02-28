"use client";
import React, { useState, useEffect, useRef, RefObject } from "react";
import Image from "next/image";

interface CornerDecorationProps {
  fatherRef?: RefObject<HTMLDivElement | null>;
}

export const CornerDecoration: React.FC<CornerDecorationProps> = ({ fatherRef }) => {
  const [isVisible, setIsVisible] = useState(false);
  const defaultRef = useRef<HTMLDivElement>(null);
  const ref = fatherRef || defaultRef;

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;

      const elementTop = ref.current.getBoundingClientRect().top;
      if (elementTop <= 200) {
        setIsVisible(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [ref]);

  return (
    <div
      ref={ref}
      className="absolute bottom-0 left-0 w-[60vw] max-w-sm md:max-w-md lg:max-w-lg "
      style={{
        transform: isVisible ? "translateY(0)" : "translateY(100%)",
        filter: isVisible ? "blur(0)" : "blur(10px)",
        opacity: isVisible ? 1 : 0,
        transition: "transform 1s, filter 1s, opacity 1s",
      }}
    >
      <div
        className="w-full h-full absolute z-10"
        style={{
          background: "linear-gradient(to bottom, transparent 30%, black 100%)",
        }}
      ></div>
      <Image
        src="/Img/matas-ekko.png"
        alt="nosotros"
        width={760}
        height={636}
        className="opacity-80 -z-10"
      />
    </div>
  );
};
