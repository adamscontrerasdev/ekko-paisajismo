"use client";
import React, { useRef } from "react";
import Data from "../../../../public/Data/Nosotros.json";
import { CornerDecoration } from "@/app/components";

export const Nosotros = () => {
  const sections = Data.nosotros;
  const fatherRef = useRef<HTMLDivElement>(null);

  return (
    <div
      className="w-full h-screen bg-black text-white relative overflow-hidden md:px-10 py-20 lg:px-20 xl:px-40 2xl:px-60"
      id="nosotros"
      ref={fatherRef}
    >
      {sections.map(({ title, text, image }, index) => (
        <div
          key={title}
          className={`flex h-1/2 w-full jusstify-center items-center gap-4 rounded-2xl p-4 relative z-10   ${
            index === 1 ? "flex-row-reverse" : ""
          }`}
        >
          <div className="w-[70%]">
            <h1 className="text-3xl font-bold md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-6xl">{title}</h1>
            <p className="text-xs md:text-sm lg:text-base 2xl:text-lg">{text}</p>
          </div>
          <img
            src={image}
            alt={title}
            className="h-1/2 md:h-3/4 lg:h-full rounded-xl brightness-80"
          />
        </div>
      ))}
      <CornerDecoration fatherRef={fatherRef} />{" "}
    </div>
  );
};
