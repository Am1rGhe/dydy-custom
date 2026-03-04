import { createAdminSupabase } from "@/lib/supabase/admin";
import { format } from "date-fns";
import Link from "next/link";
import UpdateOrderStatus from "./UpdateOrderStatus";

export default async function AdminOrdersPage() {
  const supabase = createAdminSupabase();
  const { data: orders } = await supabase
    .from("orders")
    .select("*")
    .order("created_at", { ascending: false });

  const getStatusColor = (s: string) => {
    switch (s.toLowerCase()) {
      case "processing":
        return "bg-blue-100 text-blue-800";
      case "shipped":
        return "bg-purple-100 text-purple-800";
      case "delivered":
        return "bg-green-100 text-green-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getPaymentColor = (s: string) => {
    switch (s.toLowerCase()) {
      case "paid":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "failed":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Orders</h1>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-900 uppercase">
                Order
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-900 uppercase">
                Customer
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-900 uppercase">
                Total
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-900 uppercase">
                Status
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-900 uppercase">
                Payment
              </th>
              <th className="px-4 py-3 text-right text-xs font-semibold text-gray-900 uppercase">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {orders && orders.length > 0 ? (
              orders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <Link
                      href={`/admin/orders/${order.id}`}
                      className="font-medium text-red-600 hover:text-red-700"
                    >
                      {order.order_number}
                    </Link>
                    <p className="text-xs text-gray-500 mt-0.5">
                      {format(new Date(order.created_at), "MMM d, yyyy")}
                    </p>
                  </td>
                  <td className="px-4 py-3 text-gray-900">
                    {order.shipping_address?.fullName || "—"}
                  </td>
                  <td className="px-4 py-3 font-semibold text-gray-900">
                    ${order.total?.toFixed(2) ?? "—"}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`text-xs font-semibold px-2 py-1 rounded ${getStatusColor(
                        order.status
                      )}`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`text-xs font-semibold px-2 py-1 rounded ${getPaymentColor(
                        order.payment_status
                      )}`}
                    >
                      {order.payment_status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <UpdateOrderStatus
                      orderId={order.id}
                      currentStatus={order.status}
                    />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-gray-500">
                  No orders yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
