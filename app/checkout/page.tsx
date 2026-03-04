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
  state: z.string().min(2, "State is required"),
  zipCode: z.string().min(5, "Zip code must be at least 5 characters"),
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

  // Redirect if cart is empty
  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Your cart is empty
          </h2>
          <Link
            href="/shop"
            className="inline-block bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
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
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/cart"
            className="inline-flex items-center text-gray-900 hover:text-red-600 mb-4 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Cart
          </Link>
          <h1 className="text-4xl font-bold text-gray-900">Checkout</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form*/}
          <div className="lg:col-span-2">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="bg-white rounded-lg shadow-md p-6 lg:p-8 space-y-6"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Shipping Information
              </h2>

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
                  {error}
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Name */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Full Name
                  </label>
                  <input
                    {...register("fullName")}
                    type="text"
                    className="w-full px-4 py-3 border border-gray-900 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition text-gray-900 placeholder:text-gray-700"
                    placeholder="John Doe"
                  />
                  {errors.fullName && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.fullName.message}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    {...register("email")}
                    type="email"
                    className="w-full px-4 py-3 border border-gray-900 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition text-gray-900 placeholder:text-gray-700"
                    placeholder="john@example.com"
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Phone
                  </label>
                  <input
                    {...register("phone")}
                    type="tel"
                    className="w-full px-4 py-3 border border-gray-900 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition text-gray-900 placeholder:text-gray-700"
                    placeholder="+1 234 567 8900"
                  />
                  {errors.phone && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.phone.message}
                    </p>
                  )}
                </div>

                {/* Address */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Address
                  </label>
                  <input
                    {...register("address")}
                    type="text"
                    className="w-full px-4 py-3 border border-gray-900 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition text-gray-900 placeholder:text-gray-700"
                    placeholder="123 Main St"
                  />
                  {errors.address && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.address.message}
                    </p>
                  )}
                </div>

                {/* City */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    City
                  </label>
                  <input
                    {...register("city")}
                    type="text"
                    className="w-full px-4 py-3 border border-gray-900 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition text-gray-900 placeholder:text-gray-700"
                    placeholder="New York"
                  />
                  {errors.city && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.city.message}
                    </p>
                  )}
                </div>

                {/* State */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    State
                  </label>
                  <input
                    {...register("state")}
                    type="text"
                    className="w-full px-4 py-3 border border-gray-900 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition text-gray-900 placeholder:text-gray-700"
                    placeholder="NY"
                  />
                  {errors.state && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.state.message}
                    </p>
                  )}
                </div>

                {/* Zip cde */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Zip Code
                  </label>
                  <input
                    {...register("zipCode")}
                    type="text"
                    className="w-full px-4 py-3 border border-gray-900 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition text-gray-900 placeholder:text-gray-700"
                    placeholder="10001"
                  />
                  {errors.zipCode && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.zipCode.message}
                    </p>
                  )}
                </div>

                {/* Country */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Country
                  </label>
                  <input
                    {...register("country")}
                    type="text"
                    className="w-full px-4 py-3 border border-gray-900 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition text-gray-900 placeholder:text-gray-700"
                    placeholder="United States"
                  />
                  {errors.country && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.country.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Submit button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-4 px-6 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
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

          {/* Order summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Order Summary
              </h2>
              <div className="space-y-3 mb-6">
                {cart.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="text-gray-900">
                      {item.name} ({item.size}) × {item.quantity}
                    </span>
                    <span className="text-gray-900 font-semibold">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
              <div className="border-t pt-3 space-y-2">
                <div className="flex justify-between text-gray-900">
                  <span>Subtotal</span>
                  <span>${cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-900">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>
                <div className="border-t pt-3 flex justify-between text-lg font-bold text-gray-900">
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
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader2 className="w-8 h-8 animate-spin text-red-600" />
      </div>
    }>
      <CheckoutContent />
    </Suspense>
  );
}
