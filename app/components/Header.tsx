"use client";

import React, { useState } from "react";
import { sections } from "../utils";
import Link from "next/link";
import { Menu, X } from "lucide-react";

const Header = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="relative md:px-20 lg:px-40 flex items-center bg-background justify-between h-16 text-white rounded-b-xl w-full px-6">
      {/* Left - Desktop Sections */}
      <div className="hidden md:flex w-1/4 gap-4">
        {sections.map((s) => (
          <Link
            key={s.name}
            href={`#${s.ref}`}
            className="px-4 py-2 text-primary hover:font-bold transition-colors"
          >
            {s.name}
          </Link>
        ))}
      </div>

      {/* Center Logo */}
      <h1 className="text-3xl md:text-4xl font-bold">El Frutito</h1>

      {/* Right Desktop */}
      <div className="hidden md:flex w-1/4 justify-end gap-4">
        <Link
          href="#contacto"
          className="px-4 py-2 text-primary hover:font-bold transition-colors"
        >
          Contacto
        </Link>
      </div>

      {/* Mobile Menu Button */}
      <button onClick={() => setOpen(!open)} className="md:hidden text-primary">
        {open ? <X size={28} /> : <Menu size={28} />}
      </button>

      {/* Mobile Dropdown */}
      {open && (
        <div className="absolute top-16 left-0 w-full bg-background flex flex-col items-center py-6 gap-4 md:hidden shadow-lg z-50">
          {sections.map((s) => (
            <Link
              key={s.name}
              href={`#${s.ref}`}
              onClick={() => setOpen(false)}
              className="text-primary text-lg hover:font-bold transition-colors"
            >
              {s.name}
            </Link>
          ))}

          <Link
            href="#contacto"
            onClick={() => setOpen(false)}
            className="text-primary text-lg hover:font-bold transition-colors"
          >
            Contacto
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Header;
