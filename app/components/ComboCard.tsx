"use client";

import { useEffect, useState } from "react";
import { Product } from "../models";
import { useCart } from "../context/CartContext";

const DescriptionIcon = ({ className }: { className?: string }) => (
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

const ComboCard = ({
  id,
  name,
  prices,
  image,
  sale,
  description,
  type,
}: Product) => {
  const { addItem } = useCart();

  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(false);

  const [pickerOpen, setPickerOpen] = useState(false);
  const [pickerVisible, setPickerVisible] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const [added, setAdded] = useState(false);

  // Description modal animation
  useEffect(() => {
    if (open) {
      setTimeout(() => setVisible(true), 10);
      document.body.style.overflow = "hidden";
    } else {
      setVisible(false);
      document.body.style.overflow = "auto";
    }
  }, [open]);

  // Picker animation
  useEffect(() => {
    if (pickerOpen) {
      setTimeout(() => setPickerVisible(true), 10);
    } else {
      setPickerVisible(false);
    }
  }, [pickerOpen]);

  // ESC close
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        setPickerOpen(false);
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  const handleAdd = () => {
    setQuantity(1);
    setPickerOpen(true);
  };

  const confirmAdd = () => {
    addItem(
      {
        id,
        name,
        prices,
        image,
        stock: 0,
        sale,
        description,
        type,
      },
      `${quantity} unidad${quantity > 1 ? "es" : ""}`,
      prices[2][1] * quantity,
    );
    setPickerOpen(false);
    triggerAddedFeedback();
  };

  const triggerAddedFeedback = () => {
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <>
      {/* CARD */}
      <div className="w-56 md:w-72 bg-cream min-h-56 relative rounded-xl shadow-xl hover:shadow-2xl transition-all hover:bg-foreground flex flex-col">
        {sale && (
          <div className="absolute font-semibold shadow shadow-red-500 top-2 right-0 bg-red-500 text-white px-2 py-1 rounded z-10">
            Oferta!
          </div>
        )}

        <img
          src={image || "/elFrutito.png"}
          alt={name}
          className="w-full h-48 object-cover rounded-t-xl bg-card"
        />

        <div className="p-4 flex flex-col flex-1">
          <h3 className="text-lg font-semibold">{name}</h3>

          <div className="my-2 flex flex-wrap gap-2 bg-cream p-2 rounded">
            <p className="text-sm bg-ring px-2 py-1 rounded">
              <b className="text-cream font-semibold">${prices[2][1]}</b>
            </p>
          </div>

          <div className="flex justify-end items-center mb-3">
            {description && (
              <button
                onClick={() => setOpen(true)}
                className="bg-card/80 text-cream rounded-full bg-opacity-80 hover:opacity-60 hover:cursor-pointer transition-all duration-300"
              >
                <DescriptionIcon className="w-10 h-10 mx-auto" />
              </button>
            )}
          </div>

          {/* Add to cart button */}
          <button
            onClick={handleAdd}
            className={`mt-auto w-full py-2 rounded-lg font-semibold text-sm transition-all duration-300 ${
              added
                ? "bg-green-500 text-white scale-95"
                : "bg-primary text-cream hover:opacity-80 hover:scale-[1.02]"
            }`}
          >
            {added ? "✓ Agregado!" : "Agregar al carrito"}
          </button>
        </div>
      </div>

      {/* DESCRIPTION MODAL */}
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

      {/* QUANTITY PICKER MODAL */}
      {pickerOpen && (
        <div
          className={`fixed inset-0 z-50 flex items-center justify-center px-4 transition-all duration-300 ${
            pickerVisible ? "bg-black/50 backdrop-blur-sm" : "bg-black/0"
          }`}
          onClick={() => setPickerOpen(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className={`bg-cream max-w-xs w-full rounded-2xl p-6 shadow-2xl transform transition-all duration-300 ${
              pickerVisible
                ? "opacity-100 scale-100 translate-y-0"
                : "opacity-0 scale-95 translate-y-4"
            }`}
          >
            <h2 className="text-lg font-bold mb-1">{name}</h2>
            <p className="text-sm text-card/60 mb-4">¿Cuántas unidades?</p>

            {/* Quantity selector */}
            <div className="flex items-center justify-center gap-6 mb-5">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="w-10 h-10 rounded-full border-2 border-card/20 text-card text-xl font-bold hover:border-primary transition-all"
              >
                −
              </button>
              <span className="text-2xl font-bold w-8 text-center">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity((q) => q + 1)}
                className="w-10 h-10 rounded-full border-2 border-card/20 text-card text-xl font-bold hover:border-primary transition-all"
              >
                +
              </button>
            </div>

            <p className="text-center text-sm text-card/60 mb-5">
              Total:{" "}
              <b className="text-card font-semibold">
                ${prices[2][1] * quantity}
              </b>
            </p>

            <button
              onClick={confirmAdd}
              className="w-full bg-primary text-cream font-semibold py-3 rounded-xl hover:opacity-80 transition-all"
            >
              Agregar al carrito
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ComboCard;
