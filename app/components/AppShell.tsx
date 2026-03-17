"use client";

import { useState } from "react";
import CartButton from "./CartButton";
import CartDrawer from "./CartDrawer";

export default function AppShell({ children }: { children: React.ReactNode }) {
  const [cartOpen, setCartOpen] = useState(false);

  return (
    <>
      {/* Floating cart button — fixed bottom-right on mobile, or inject into header */}
      <div className="fixed bottom-6 right-6 z-30 md:hidden">
        <CartButton onClick={() => setCartOpen(true)} />
      </div>

      {/* Desktop cart button rendered in header via slot — pass down as prop or use portal */}
      {/* For simplicity: also show fixed top-right on desktop */}
      <div className="hidden md:block fixed top-4 right-6 z-30">
        <CartButton onClick={() => setCartOpen(true)} />
      </div>

      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />

      {children}
    </>
  );
}
