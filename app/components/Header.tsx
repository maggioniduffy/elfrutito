"use client";

import { useEffect, useState } from "react";
import { sections } from "../utils";
import Link from "next/link";
import { Menu, X } from "lucide-react";

const Header = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`
        sticky top-0 z-50
        md:px-20 lg:px-40 px-6
        flex items-center justify-between
        h-16 w-full
        transition-all duration-300 rounded-b-2xl
        ${
          scrolled
            ? "bg-background/70 backdrop-blur-md shadow-md"
            : "bg-primary/10"
        }
      `}
    >
      {/* Left - Desktop Sections */}
      <div className="hidden md:flex w-1/4 gap-4">
        {sections.map((s) => (
          <Link
            key={s.name}
            href={`#${s.ref}`}
            className="py-2 text-primary hover:font-bold transition-colors"
          >
            {s.name}
          </Link>
        ))}
      </div>

      {/* Center Logo */}
      <h1
        className={`text-3xl md:text-4xl font-bold ${scrolled ? "text-cream" : "text-card"}`}
      >
        El Frutito
      </h1>

      {/* Right Desktop */}
      <div className="hidden md:flex w-1/4 justify-end gap-4">
        <Link
          href="#contacto"
          className="py-2 text-primary hover:font-bold transition-colors"
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
        <div
          className="
            absolute top-16 left-0 w-full
            bg-background/90 backdrop-blur-md
            flex flex-col items-center
            py-6 gap-4
            md:hidden
            shadow-lg
          "
        >
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
