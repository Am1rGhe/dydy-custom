import { createAdminSupabase } from "@/lib/supabase/admin";
import { Package, FolderTree, ShoppingBag } from "lucide-react";
import Link from "next/link";

export default async function AdminDashboardPage() {
  const supabase = createAdminSupabase();

  const [
    { count: productsCount },
    { count: categoriesCount },
    { count: ordersCount },
  ] = await Promise.all([
    supabase.from("products").select("*", { count: "exact", head: true }),
    supabase.from("categories").select("*", { count: "exact", head: true }),
    supabase.from("orders").select("*", { count: "exact", head: true }),
  ]);

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link
          href="/admin/products"
          className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Products</p>
              <p className="text-3xl font-bold text-gray-900">
                {productsCount ?? 0}
              </p>
            </div>
            <Package className="w-12 h-12 text-red-600" />
          </div>
        </Link>

        <Link
          href="/admin/categories"
          className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Categories</p>
              <p className="text-3xl font-bold text-gray-900">
                {categoriesCount ?? 0}
              </p>
            </div>
            <FolderTree className="w-12 h-12 text-red-600" />
          </div>
        </Link>

        <Link
          href="/admin/orders"
          className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Orders</p>
              <p className="text-3xl font-bold text-gray-900">
                {ordersCount ?? 0}
              </p>
            </div>
            <ShoppingBag className="w-12 h-12 text-red-600" />
          </div>
        </Link>
      </div>
    </div>
  );
}
