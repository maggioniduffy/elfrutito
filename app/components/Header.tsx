"use client";

import { useEffect, useState } from "react";
import { sections } from "../utils";
import Link from "next/link";
import Image from "next/image";
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
    px-4 sm:px-8 md:px-16 lg:px-48
    flex items-center justify-between
    h-16 w-full gap-10
    transition-all duration-300 rounded-b-2xl
    ${
      scrolled ? "bg-background/70 backdrop-blur-md shadow-md" : "bg-primary/10"
    }
  `}
    >
      {/* Left - Desktop Sections */}

      {/* Center Logo */}
      <div className="flex items-center gap-2 shrink-0">
        <Link
          href={"/"}
          className={`text-2xl sm:text-3xl md:text-3xl lg:text-4xl font-bold ${
            scrolled ? "text-cream" : "text-card"
          }`}
        >
          El Frutito
        </Link>

        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden">
          <Image
            src="/elFrutito.png"
            alt="El Frutito Logo"
            width={120}
            height={120}
            className="object-cover scale-180"
          />
        </div>
      </div>

      <div className="hidden md:flex flex-1 gap-6">
        {sections.map((s) => (
          <Link
            key={s.name}
            href={`#${s.ref}`}
            className="text-primary hover:font-bold transition-colors whitespace-nowrap"
          >
            {s.name}
          </Link>
        ))}
        <Link
          href="#contacto"
          className="text-primary hover:font-bold transition-colors"
        >
          Contacto
        </Link>
      </div>

      {/* Mobile Button */}
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
      py-6 gap-6
      lg:hidden
      shadow-lg
      rounded-b-2xl
      animate-in fade-in slide-in-from-top-2
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
