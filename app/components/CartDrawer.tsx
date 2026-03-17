"use client";

import { useEffect, useRef } from "react";
import { useCart } from "@/app/context/CartContext";

const PHONE = "5492995509968";

function buildWhatsAppURL(items: ReturnType<typeof useCart>["items"]): string {
  if (items.length === 0) return "#";

  const lines = items
    .map(
      (i) =>
        `• ${i.name} (${i.selectedWeight}) x${i.quantity} → $${(
          i.price * i.quantity
        ).toLocaleString("es-AR")}`,
    )
    .join("\n");

  const total = items.reduce((s, i) => s + i.price * i.quantity, 0);
  const msg = `Hola El Frutito, quiero hacer un pedido! 🛒\n\n${lines}\n\n*Total estimado: $${total.toLocaleString(
    "es-AR",
  )}*`;

  return `https://wa.me/${PHONE}?text=${encodeURIComponent(msg)}`;
}

export default function CartDrawer({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const { items, removeItem, updateQty, clearCart } = useCart();
  const drawerRef = useRef<HTMLDivElement>(null);

  // Close on ESC
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  // Lock scroll
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const total = items.reduce((s, i) => s + i.price * i.quantity, 0);
  const whatsappURL = buildWhatsAppURL(items);

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        className={`fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-opacity duration-300 ${
          open
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      />

      {/* Drawer */}
      <div
        ref={drawerRef}
        className={`fixed top-0 right-0 z-70 h-full w-full max-w-sm bg-cream shadow-2xl flex flex-col transition-transform duration-300 ease-in-out ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex z-70 items-center justify-between px-5 py-4 border-b border-card/20">
          <h2 className="text-xl font-bold text-card">🛒 Tu pedido</h2>
          <button
            onClick={onClose}
            className="text-card/60 hover:text-card transition-colors text-2xl leading-none"
            aria-label="Cerrar carrito"
          >
            ✕
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-3 text-card/50">
              <span className="text-5xl">🍎</span>
              <p className="text-sm">Tu carrito está vacío</p>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={`${item.id}__${item.selectedWeight}`}
                className="flex gap-3 bg-white/60 rounded-xl p-3 shadow-sm"
              >
                <img
                  src={item.image || "/elFrutito.png"}
                  alt={item.name}
                  width={64}
                  height={64}
                  className="w-16 h-16 object-cover rounded-lg flex-shrink-0 bg-card/10"
                />
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm truncate">{item.name}</p>
                  <p className="text-xs text-card/60 mb-2">
                    {item.selectedWeight} · $
                    {item.price.toLocaleString("es-AR")} c/u
                  </p>
                  {/* Qty controls */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() =>
                        updateQty(
                          item.id,
                          item.selectedWeight,
                          item.quantity - 1,
                        )
                      }
                      className="w-7 h-7 rounded-full bg-card/10 hover:bg-card/20 text-card font-bold transition-colors flex items-center justify-center"
                    >
                      −
                    </button>
                    <span className="text-sm font-semibold w-4 text-center">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() =>
                        updateQty(
                          item.id,
                          item.selectedWeight,
                          item.quantity + 1,
                        )
                      }
                      className="w-7 h-7 rounded-full bg-card/10 hover:bg-card/20 text-card font-bold transition-colors flex items-center justify-center"
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="flex flex-col items-end justify-between flex-shrink-0">
                  <button
                    onClick={() => removeItem(item.id, item.selectedWeight)}
                    className="text-red-400 hover:text-red-600 text-xs transition-colors"
                  >
                    Quitar
                  </button>
                  <p className="text-sm font-bold text-card">
                    ${(item.price * item.quantity).toLocaleString("es-AR")}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-card/20 px-5 py-4 space-y-3">
            <div className="flex justify-between text-base font-semibold">
              <span>Total estimado</span>
              <span className="text-card">
                ${total.toLocaleString("es-AR")}
              </span>
            </div>
            <a
              href={whatsappURL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full bg-primary text-cream font-semibold py-3 rounded-xl hover:scale-[1.02] transition-transform shadow-md text-base"
            >
              <WhatsAppIcon className="w-5 h-5" />
              Pedir por WhatsApp
            </a>
            <button
              onClick={clearCart}
              className="w-full text-sm text-card/50 hover:text-red-500 transition-colors"
            >
              Vaciar carrito
            </button>
          </div>
        )}
      </div>
    </>
  );
}

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.118.554 4.107 1.523 5.83L.057 23.57a.5.5 0 0 0 .61.61l5.78-1.48A11.945 11.945 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 0 1-5.006-1.374l-.36-.214-3.713.951.978-3.622-.234-.373A9.818 9.818 0 0 1 2.182 12C2.182 6.57 6.57 2.182 12 2.182S21.818 6.57 21.818 12 17.43 21.818 12 21.818z" />
    </svg>
  );
}
