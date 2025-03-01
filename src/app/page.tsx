import React from "react";
import { Inicio, Nosotros, Servicios, Contacto } from "./screens";

const page = () => {
  return (
    <div className="">
      <Inicio />
      <Nosotros />
      <Servicios />
      <Contacto />
    </div>
  );
};

export default page;
