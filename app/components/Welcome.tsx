"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const Welcome = () => {
  const [open, setOpen] = useState(true);

  return (
    <div className="w-full flex flex-col items-center my-2">
      {/* Toggle Header */}
      <button
        onClick={() => setOpen(!open)}
        className="
          flex items-center gap-2
          text-primary font-medium
          hover:opacity-80
          transition
        "
      >
        <ChevronDown
          size={20}
          className={`transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Dropdown Content */}
      <div
        className={`
          overflow-hidden
          transition-all duration-300 ease-in-out
          ${open ? "max-h-40 opacity-100 mt-3" : "max-h-0 opacity-0"}
          w-[90%] sm:w-96 mb-2
        `}
      >
        <div className="rounded-2xl px-6 py-4 bg-cream shadow-md">
          <p className="text-background text-center text-lg">
            Bienvenido a <b>El Frutito</b>, emprendimiento de frutos secos en
            Nueva Córdoba 🌰 Mirá nuestros productos y luego hacé tu pedido por
            WhatsApp, usando tu carrito de compras.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
