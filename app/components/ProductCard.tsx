"use client";

import { useEffect, useState } from "react";
import { Product } from "../models";
import Image from "next/image";

const DescriptionIcon = ({ className }: { className?: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="16" x2="12" y2="12" />
      <circle cx="12" cy="8" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
};

// export default DescriptionIcon;

const ProductCard = ({
  name,
  prices,
  image,
  stock,
  sale,
  description,
}: Product) => {
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(false);

  // Handle animation mount/unmount
  useEffect(() => {
    if (open) {
      setTimeout(() => setVisible(true), 10);
      document.body.style.overflow = "hidden";
    } else {
      setVisible(false);
      document.body.style.overflow = "auto";
    }
  }, [open]);

  // ESC close
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  console.log(description);
  return (
    <>
      {/* CARD */}
      <div className="w-56 md:w-72 bg-cream min-h-56 relative rounded-xl shadow-xl hover:shadow-2xl transition-all hover:bg-foreground">
        {sale && (
          <div className="absolute font-semibold shadow shadow-red-500 top-2 right-0 bg-red-500 text-white px-2 py-1 rounded">
            Oferta!
          </div>
        )}

        <Image
          src={image || "/elFrutito.png"}
          alt={name}
          width={300}
          height={300}
          className="w-full h-48 object-cover rounded-t-xl bg-card"
        />

        <div className="p-4">
          <h3 className="text-lg font-semibold">{name}</h3>

          <div className="my-2 flex flex-wrap gap-2 bg-cream p-2 rounded">
            {prices.map(([weight, price]: any) => (
              <p key={weight} className="text-sm bg-ring px-2 py-1 rounded">
                {weight}: <b className="text-cream font-semibold">${price}</b>
              </p>
            ))}
          </div>

          <div className="flex justify-between items-center">
            <p className="text-sm w-1/2">
              En stock <b className="text-card font-semibold">{stock} kg</b>
            </p>

            {description && (
              <button
                onClick={() => setOpen(true)}
                className="bg-card/80 text-cream rounded-full bg-opacity-80 hover:opacity-60 hover:cursor-pointer transition-all duration-300"
              >
                <DescriptionIcon className="w-10 h-10 mx-auto" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* MODAL */}
      {open && (
        <div
          className={`fixed inset-0 z-50 flex items-center justify-center px-4 transition-all duration-300 ${
            visible ? "bg-black/50 backdrop-blur-sm" : "bg-black/0"
          }`}
          onClick={() => setOpen(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className={`bg-cream max-w-md w-full rounded-2xl p-6 shadow-2xl transform transition-all duration-300 ${
              visible
                ? "opacity-100 scale-100 translate-y-0"
                : "opacity-0 scale-95 translate-y-4"
            }`}
          >
            <button
              onClick={() => setOpen(false)}
              className="absolute top-3 right-4 text-card font-bold text-lg"
            >
              ✕
            </button>

            <h2 className="text-xl font-bold mb-4">{name}</h2>

            <p className="text-sm text-card leading-relaxed">{description}</p>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductCard;
