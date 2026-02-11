"use client";

import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import { useCart } from "@/contexts/CartContext";

export default function CartIcon() {
  const { cartCount } = useCart();

  return (
    <Link
      href="/cart"
      className="relative p-2 hover:bg-red-50 rounded-full transition-colors group"
    >
      <ShoppingCart className="w-6 h-6 text-gray-700 group-hover:text-red-600 transition-colors" />
      {cartCount > 0 && (
        <span className="absolute top-0 right-0 bg-red-600 text-white text-xs font-semibold rounded-full w-5 h-5 flex items-center justify-center border-2 border-white">
          {cartCount > 9 ? "9+" : cartCount}
        </span>
      )}
    </Link>
  );
}
