"use client";

import { createClientSupabase } from "@/lib/supabase/client";
import { useCart } from "@/contexts/CartContext";
import { CheckCircle, Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function OrderSuccessPage({ params }: PageProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [orderId, setOrderId] = useState<string | null>(null);
  const [order, setOrder] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { clearCart } = useCart();

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const { id } = await params;
        setOrderId(id);

        const supabase = createClientSupabase();

        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (!user) {
          router.push("/auth/login");
          return;
        }

        // fetch the order
        const { data: orderData, error: orderError } = await supabase
          .from("orders")
          .select("*")
          .eq("id", id)
          .eq("user_id", user.id)
          .single();

        if (orderError || !orderData) {
          setError("Order not found");
          setIsLoading(false);
          return;
        }

        // update order status
        if (sessionId && orderData.payment_status === "pending") {
          
          const { error: updateError } = await supabase
            .from("orders")
            .update({
              payment_status: "paid",
              status: "processing",
            })
            .eq("id", id);

          if (!updateError) {
            // Clear cart after successful payment
            clearCart();
            setOrder({ ...orderData, payment_status: "paid", status: "processing" });
          } else {
            setOrder(orderData);
          }
        } else {
          setOrder(orderData);
          // clera the cart if order is already paid
          if (orderData.payment_status === "paid") {
            clearCart();
          }
        }

        setIsLoading(false);
      } catch (err: any) {
        setError(err.message || "Something went wrong");
        setIsLoading(false);
      }
    };

    fetchOrder();
  }, [params, sessionId, router, clearCart]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-red-600 mx-auto mb-4" />
          <p className="text-gray-900">Processing your order...</p>
        </div>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            {error || "Order not found"}
          </h2>
          <Link
            href="/shop"
            className="inline-block bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          {/* Success message */}
          <div className="bg-white rounded-lg shadow-md p-8 text-center mb-6">
            <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Order Confirmed!
            </h1>
            <p className="text-gray-600 mb-4">
              Thank you for your purchase. Your order has been received and is
              being processed.
            </p>
            <div className="bg-gray-50 rounded-lg p-4 mt-6">
              <p className="text-sm text-gray-600 mb-1">Order Number</p>
              <p className="text-xl font-bold text-gray-900">
                {order.order_number}
              </p>
            </div>
          </div>

          {/* Order details*/}
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Order Details
            </h2>
            <div className="space-y-3">
              <div className="flex justify-between text-gray-900">
                <span>Status</span>
                <span className="font-semibold capitalize">{order.status}</span>
              </div>
              <div className="flex justify-between text-gray-900">
                <span>Payment Status</span>
                <span className="font-semibold capitalize">
                  {order.payment_status}
                </span>
              </div>
              <div className="flex justify-between text-gray-900">
                <span>Total</span>
                <span className="font-semibold">${order.total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Shipping address */}
          {order.shipping_address && (
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Shipping Address
              </h2>
              <div className="text-gray-900 space-y-1">
                <p>{order.shipping_address.fullName}</p>
                <p>{order.shipping_address.address}</p>
                <p>
                  {order.shipping_address.city}, {order.shipping_address.state}{" "}
                  {order.shipping_address.zipCode}
                </p>
                <p>{order.shipping_address.country}</p>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/account/orders"
              className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-900 font-semibold py-3 px-6 rounded-lg transition-colors text-center"
            >
              View All Orders
            </Link>
            <Link
              href="/shop"
              className="flex-1 bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors text-center"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function OrderSuccessPage({ params }: PageProps) {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader2 className="w-8 h-8 animate-spin text-red-600" />
      </div>
    }>
      <OrderSuccessContent params={params} />
    </Suspense>
  );
}
