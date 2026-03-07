"use client";

import { useCart } from "@/contexts/CartContext";
import { createClientSupabase } from "@/lib/supabase/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

// Form validation schema
const checkoutSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  address: z.string().min(5, "Address must be at least 5 characters"),
  city: z.string().min(2, "City is required"),
  state: z.string().min(2, "Province is required"),
  zipCode: z.string().min(6, "Postal code must be at least 6 characters"),
  country: z.string().min(2, "Country is required"),
});

type CheckoutFormData = z.infer<typeof checkoutSchema>;

function CheckoutContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { cart, cartTotal, clearCart } = useCart();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
  });

  // Check if payment was canceled
  useEffect(() => {
    if (searchParams.get("canceled") === "true") {
      setError("Payment was canceled. You can try again when you're ready.");
    }
  }, [searchParams]);

  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">
            Your cart is empty
          </h2>
          <Link
            href="/shop"
            className="inline-block bg-amber-500 hover:bg-amber-400 text-black font-semibold py-3 px-6 rounded-xl transition-colors"
          >
            Go Shopping
          </Link>
        </div>
      </div>
    );
  }

  const onSubmit = async (data: CheckoutFormData) => {
    setIsSubmitting(true);
    setError(null);

    try {
      const supabase = createClientSupabase();

      // Get current user
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setError("Please log in to complete your order");
        setIsSubmitting(false);
        return;
      }

      // Generate order number
      const orderNumber = `ORD-${Date.now()}-${Math.random()
        .toString(36)
        .substring(2, 11)
        .toUpperCase()}`;

      // Create order
      const { data: order, error: orderError } = await supabase
        .from("orders")
        .insert({
          user_id: user.id,
          order_number: orderNumber,
          status: "pending",
          subtotal: cartTotal,
          shipping_cost: 0,
          tax: 0,
          total: cartTotal,
          shipping_address: {
            fullName: data.fullName,
            email: data.email,
            phone: data.phone,
            address: data.address,
            city: data.city,
            state: data.state,
            zipCode: data.zipCode,
            country: data.country,
          },
          payment_status: "pending",
        })
        .select()
        .single();

      if (orderError) {
        throw orderError;
      }

      //  Order items
      const orderItems = cart.map((item) => ({
        order_id: order.id,
        product_id: item.productId,
        product_name: item.name,
        size: item.size,
        quantity: item.quantity,
        price: item.price,
        customization_data: null,
      }));

      const { error: itemsError } = await supabase
        .from("order_items")
        .insert(orderItems);

      if (itemsError) {
        throw itemsError;
      }

      //  Stripe checklout session
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          orderId: order.id,
          amount: cartTotal,
          items: cart.map((item) => ({
            name: item.name,
            size: item.size,
            price: item.price,
            quantity: item.quantity,
          })),
          customerEmail: data.email,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to create payment session");
      }

      const { url } = await response.json();

      // Redirect to Stripe Checkout
      if (url) {
        window.location.href = url;
      } else {
        throw new Error("Failed to get checkout URL");
      }
    } catch (err: any) {
      setError(err.message || "Something went wrong. Please try again.");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link
            href="/cart"
            className="inline-flex items-center text-neutral-400 hover:text-amber-400 mb-4 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Cart
          </Link>
          <h1 className="text-4xl font-bold text-white">Checkout</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="bg-neutral-900 rounded-2xl border border-neutral-800 shadow-xl p-6 lg:p-8 space-y-6"
            >
              <h2 className="text-2xl font-bold text-white mb-6">
                Shipping Information
              </h2>

              {error && (
                <div className="bg-amber-500/10 border border-amber-500/30 text-amber-400 px-4 py-3 rounded-xl">
                  {error}
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Name */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-neutral-200 mb-2">
                    Full Name
                  </label>
                  <input
                    {...register("fullName")}
                    type="text"
                    className="w-full px-4 py-3 border border-neutral-700 rounded-xl bg-neutral-800 text-white placeholder-neutral-500 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition"
                    placeholder="Jean Tremblay"
                  />
                  {errors.fullName && (
                    <p className="mt-1 text-sm text-amber-400">
                      {errors.fullName.message}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-neutral-200 mb-2">
                    Email
                  </label>
                  <input
                    {...register("email")}
                    type="email"
                    className="w-full px-4 py-3 border border-neutral-700 rounded-xl bg-neutral-800 text-white placeholder-neutral-500 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition"
                    placeholder="jean.tremblay@example.com"
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-amber-400">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-semibold text-neutral-200 mb-2">
                    Phone
                  </label>
                  <input
                    {...register("phone")}
                    type="tel"
                    className="w-full px-4 py-3 border border-neutral-700 rounded-xl bg-neutral-800 text-white placeholder-neutral-500 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition"
                    placeholder="+1 234 567 8900"
                  />
                  {errors.phone && (
                    <p className="mt-1 text-sm text-amber-400">
                      {errors.phone.message}
                    </p>
                  )}
                </div>

                {/* Address */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-neutral-200 mb-2">
                    Address
                  </label>
                  <input
                    {...register("address")}
                    type="text"
                    className="w-full px-4 py-3 border border-neutral-700 rounded-xl bg-neutral-800 text-white placeholder-neutral-500 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition"
                    placeholder="1234 Rue Sainte-Catherine"
                  />
                  {errors.address && (
                    <p className="mt-1 text-sm text-amber-400">
                      {errors.address.message}
                    </p>
                  )}
                </div>

                {/* City */}
                <div>
                  <label className="block text-sm font-semibold text-neutral-200 mb-2">
                    City
                  </label>
                  <input
                    {...register("city")}
                    type="text"
                    className="w-full px-4 py-3 border border-neutral-700 rounded-xl bg-neutral-800 text-white placeholder-neutral-500 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition"
                    placeholder="Montreal"
                  />
                  {errors.city && (
                    <p className="mt-1 text-sm text-amber-400">
                      {errors.city.message}
                    </p>
                  )}
                </div>

                {/* State */}
                <div>
                  <label className="block text-sm font-semibold text-neutral-200 mb-2">
                    Province
                  </label>
                  <input
                    {...register("state")}
                    type="text"
                    className="w-full px-4 py-3 border border-neutral-700 rounded-xl bg-neutral-800 text-white placeholder-neutral-500 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition"
                    placeholder="QC"
                  />
                  {errors.state && (
                    <p className="mt-1 text-sm text-amber-400">
                      {errors.state.message}
                    </p>
                  )}
                </div>

                {/* Postal code */}
                <div>
                  <label className="block text-sm font-semibold text-neutral-200 mb-2">
                    Postal Code
                  </label>
                  <input
                    {...register("zipCode")}
                    type="text"
                    className="w-full px-4 py-3 border border-neutral-700 rounded-xl bg-neutral-800 text-white placeholder-neutral-500 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition"
                    placeholder="H2X 1Y4"
                  />
                  {errors.zipCode && (
                    <p className="mt-1 text-sm text-amber-400">
                      {errors.zipCode.message}
                    </p>
                  )}
                </div>

                {/* Country */}
                <div>
                  <label className="block text-sm font-semibold text-neutral-200 mb-2">
                    Country
                  </label>
                  <input
                    {...register("country")}
                    type="text"
                    className="w-full px-4 py-3 border border-neutral-700 rounded-xl bg-neutral-800 text-white placeholder-neutral-500 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition"
                    placeholder="Canada"
                  />
                  {errors.country && (
                    <p className="mt-1 text-sm text-amber-400">
                      {errors.country.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Submit button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-amber-500 hover:bg-amber-400 text-black font-semibold py-4 px-6 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Processing Order...
                  </>
                ) : (
                  "Place Order"
                )}
              </button>
            </form>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-neutral-900 rounded-2xl border border-neutral-800 shadow-xl p-6 sticky top-24">
              <h2 className="text-xl font-bold text-white mb-4">
                Order Summary
              </h2>
              <div className="space-y-3 mb-6">
                {cart.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="text-neutral-300">
                      {item.name} ({item.size}) × {item.quantity}
                    </span>
                    <span className="text-amber-400 font-semibold">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
              <div className="border-t border-neutral-700 pt-3 space-y-2">
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-amber-500" />
      </div>
    }>
      <CheckoutContent />
    </Suspense>
  );
}
