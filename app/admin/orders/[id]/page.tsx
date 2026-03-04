import { createAdminSupabase } from "@/lib/supabase/admin";
import { format } from "date-fns";
import Link from "next/link";
import { ArrowLeft, Package } from "lucide-react";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function AdminOrderDetailPage({ params }: PageProps) {
  const { id } = await params;
  const supabase = createAdminSupabase();

  const { data: order, error } = await supabase
    .from("orders")
    .select("*, order_items(*)")
    .eq("id", id)
    .single();

  if (error || !order) notFound();

  return (
    <div>
      <Link
        href="/admin/orders"
        className="inline-flex items-center text-gray-600 hover:text-red-600 mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Orders
      </Link>

      <h1 className="text-3xl font-bold text-gray-900 mb-8">
        Order {order.order_number}
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Shipping Address
          </h2>
          {order.shipping_address ? (
            <div className="text-gray-900 space-y-1">
              <p className="font-semibold">{order.shipping_address.fullName}</p>
              <p>{order.shipping_address.address}</p>
              <p>
                {order.shipping_address.city}, {order.shipping_address.state}{" "}
                {order.shipping_address.zipCode}
              </p>
              <p>{order.shipping_address.country}</p>
              <p className="mt-2 text-sm text-gray-600">
                Email: {order.shipping_address.email}
              </p>
              <p className="text-sm text-gray-600">
                Phone: {order.shipping_address.phone}
              </p>
            </div>
          ) : (
            <p className="text-gray-500">No address</p>
          )}
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Summary</h2>
          <div className="space-y-2">
            <div className="flex justify-between text-gray-900">
              <span>Status</span>
              <span className="font-semibold">{order.status}</span>
            </div>
            <div className="flex justify-between text-gray-900">
              <span>Payment</span>
              <span className="font-semibold">{order.payment_status}</span>
            </div>
            <div className="flex justify-between text-gray-900">
              <span>Date</span>
              <span>
                {format(new Date(order.created_at), "MMM d, yyyy 'at' h:mm a")}
              </span>
            </div>
            <div className="border-t pt-3 flex justify-between text-lg font-bold text-gray-900">
              <span>Total</span>
              <span>${order.total?.toFixed(2) ?? "—"}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Items</h2>
        <div className="space-y-4">
          {order.order_items && order.order_items.length > 0 ? (
            order.order_items.map((item: any) => (
              <div
                key={item.id}
                className="flex items-center gap-4 pb-4 border-b border-gray-200 last:border-0"
              >
                <div className="w-12 h-12 bg-gray-200 rounded flex items-center justify-center">
                  <Package className="w-6 h-6 text-gray-500" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-900">
                    {item.product_name}
                  </p>
                  <p className="text-sm text-gray-600">
                    Size: {item.size} × {item.quantity}
                  </p>
                </div>
                <p className="font-semibold text-gray-900">
                  ${((item.price || 0) * (item.quantity || 0)).toFixed(2)}
                </p>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No items</p>
          )}
        </div>
      </div>
    </div>
  );
}
