"use client";

import { useCart } from "@/contexts/CartContext";
import { createClientSupabase } from "@/lib/supabase/client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { ShoppingCart, Plus, Minus, Trash2, ArrowLeft } from "lucide-react";

export default function CartPage() {
  const router = useRouter();
  const { cart, updateQuantity, removeItem, cartTotal } = useCart();
  const [isChecking, setIsChecking] = useState(false);

  const handleCheckout = async () => {
    setIsChecking(true);
    
    try {
      const supabase = createClientSupabase();
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        // Redirect to login with return URL
        router.push("/auth/login?redirect=/checkout");
      } else {
        // User is logged in, proceed to checkout
        router.push("/checkout");
      }
    } catch (error) {
      console.error("Error checking authentication:", error);
      router.push("/auth/login?redirect=/checkout");
    } finally {
      setIsChecking(false);
    }
  };

  return (
      <div className="min-h-screen py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <Link
              href="/shop"
              className="inline-flex items-center text-neutral-400 hover:text-amber-400 mb-4 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Continue Shopping
            </Link>
            <h1 className="text-4xl font-bold text-white">Shopping Cart</h1>
          </div>

          {cart.length === 0 ? (
            <div className="bg-neutral-900 rounded-2xl border border-neutral-800 shadow-xl p-12 text-center">
              <ShoppingCart className="w-16 h-16 text-neutral-500 mx-auto mb-4" />
              <h2 className="text-2xl font-semibold text-white mb-2">
                Your cart is empty
              </h2>
              <p className="text-neutral-400 mb-6">
                Start adding items to your cart!
              </p>
              <Link
                href="/shop"
                className="inline-block bg-amber-500 hover:bg-amber-400 text-black font-semibold py-3 px-6 rounded-xl transition-colors"
              >
                Go Shopping
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-4">
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="bg-neutral-900 rounded-2xl border border-neutral-800 shadow-lg p-6 flex flex-col sm:flex-row gap-4"
                  >
                    <div className="w-full sm:w-24 h-24 bg-neutral-800 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-neutral-400 text-2xl font-bold">
                        {item.name.charAt(0)}
                      </span>
                    </div>

                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-white mb-1">
                        {item.name}
                      </h3>
                      <p className="text-sm text-neutral-400 mb-2">
                        Size: {item.size}
                      </p>
                      <p className="text-xl font-bold text-amber-400">
                        ${item.price}
                      </p>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="flex items-center border-2 border-neutral-700 rounded-lg">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="p-2 hover:bg-neutral-800 transition-colors text-neutral-300"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="px-4 py-2 font-semibold min-w-[3rem] text-center text-white">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="p-2 hover:bg-neutral-800 transition-colors text-neutral-300"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>

                      <button
                        onClick={() => removeItem(item.id)}
                        className="p-2 text-amber-400 hover:bg-amber-500/10 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="lg:col-span-1">
                <div className="bg-neutral-900 rounded-2xl border border-neutral-800 shadow-lg p-6 sticky top-24">
                  <h2 className="text-xl font-bold text-white mb-4">
                    Order Summary
                  </h2>
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between text-neutral-300">
                      <span>Subtotal</span>
                      <span>${cartTotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-neutral-300">
                      <span>Shipping</span>
                      <span>Free</span>
                    </div>
                    <div className="border-t border-neutral-700 pt-3 flex justify-between text-lg font-bold text-white">
                      <span>Total</span>
                      <span>${cartTotal.toFixed(2)}</span>
                    </div>
                  </div>
                  <button
                    onClick={handleCheckout}
                    disabled={isChecking}
                    className="w-full bg-amber-500 hover:bg-amber-400 text-black font-semibold py-3 px-6 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer"
                  >
                    {isChecking ? "Checking..." : "Proceed to Checkout"}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
}
