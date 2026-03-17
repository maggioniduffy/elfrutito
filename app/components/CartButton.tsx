"use client";

import { useCart } from "../context/CartContext";

export default function CartButton({ onClick }: { onClick: () => void }) {
  const { totalItems } = useCart();

  return (
    <button
      onClick={onClick}
      className="fixed bottom-10 right-10 flex items-center gap-2 bg-primary text-cream font-semibold px-4 py-2 rounded-xl hover:scale-105 transition-transform shadow"
      aria-label="Ver carrito"
    >
      🛒
      <span className="hidden sm:inline">Carrito</span>
      {totalItems > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center shadow">
          {totalItems > 99 ? "99+" : totalItems}
        </span>
      )}
    </button>
  );
}
