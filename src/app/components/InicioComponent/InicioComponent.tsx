import React from "react";

export const InicioComponent = () => {
  return (
    <div className="w-screen h-screen  2xl:p-20 pl-3 flex justify-start md:items-center pt-40">
      <div className="flex flex-col xl:w-1/2 md:p-20 gap-4 ">
        <h1 className="text-white text-3xl font-bold md:text-4xl lg:text-5xl xl:text-5xl 2xl:text-6xl">
          Bienvenido a Ekko{" "}
        </h1>
        <p className="text-white md:text-base 2xl:text-xl">
          Transformamos espacios en entornos verdes llenos de armonía, belleza y funcionalidad. En
          EKKO paisajismo, creemos que cada jardín, terraza o espacio exterior tiene el potencial de
          convertirse en un oasis único, adaptado a tu estilo y necesidades. Ya sea que busques un
          diseño innovador, mantenimiento experto o una renovación completa, nuestro equipo está
          listo para hacer realidad tu visión. Explora nuestros servicios y descubre cómo podemos
          ayudarte a conectar con la naturaleza de una manera especial. Déjanos crear un paisaje que
          inspire, relaje y enamore. 🌿✨
        </p>
      </div>
    </div>
  );
};
