"use client";

import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import { useCart } from "@/contexts/CartContext";

export default function CartIcon() {
  const { cartCount } = useCart();

  return (
    <Link
      href="/cart"
      className="relative p-2.5 hover:bg-white/10 rounded-full transition-colors duration-200 group"
    >
      <ShoppingCart className="w-5 h-5 text-neutral-300 group-hover:text-amber-400 transition-colors" />
      {cartCount > 0 && (
        <span className="absolute top-0 right-0 bg-red-500 text-white text-xs font-semibold rounded-full w-5 h-5 flex items-center justify-center border-2 border-black">
          {cartCount > 9 ? "9+" : cartCount}
        </span>
      )}
    </Link>
  );
}
