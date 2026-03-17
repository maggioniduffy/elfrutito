"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { Product } from "@/app/models";

export interface CartItem {
  id: string;
  name: string;
  image?: string;
  selectedWeight: string;
  price: number;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addItem: (product: Product, weight: string, price: number) => void;
  removeItem: (id: string, weight: string) => void;
  updateQty: (id: string, weight: string, qty: number) => void;
  clearCart: () => void;
  totalItems: number;
}

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  const key = (id: string, weight: string) => `${id}__${weight}`;

  const addItem = (product: Product, weight: string, price: number) => {
    setItems((prev) => {
      const k = key(product.id!, weight);
      const existing = prev.find((i) => key(i.id, i.selectedWeight) === k);
      if (existing) {
        return prev.map((i) =>
          key(i.id, i.selectedWeight) === k
            ? { ...i, quantity: i.quantity + 1 }
            : i,
        );
      }
      return [
        ...prev,
        {
          id: product.id!,
          name: product.name,
          image: product.image,
          selectedWeight: weight,
          price,
          quantity: 1,
        },
      ];
    });
  };

  const removeItem = (id: string, weight: string) => {
    setItems((prev) =>
      prev.filter((i) => !(i.id === id && i.selectedWeight === weight)),
    );
  };

  const updateQty = (id: string, weight: string, qty: number) => {
    if (qty <= 0) return removeItem(id, weight);
    setItems((prev) =>
      prev.map((i) =>
        i.id === id && i.selectedWeight === weight
          ? { ...i, quantity: qty }
          : i,
      ),
    );
  };

  const clearCart = () => setItems([]);

  const totalItems = items.reduce((s, i) => s + i.quantity, 0);

  return (
    <CartContext.Provider
      value={{ items, addItem, removeItem, updateQty, clearCart, totalItems }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
