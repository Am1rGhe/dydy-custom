import { createAdminSupabase } from "@/lib/supabase/admin";
import Link from "next/link";
import { Plus, Pencil, Trash2 } from "lucide-react";
import DeleteProductButton from "./DeleteProductButton";

export default async function AdminProductsPage() {
  const supabase = createAdminSupabase();
  const { data: products } = await supabase
    .from("products")
    .select("*, categories(name)")
    .order("created_at", { ascending: false });

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Products</h1>
        <Link
          href="/admin/products/new"
          className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Product
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-900 uppercase">
                Product
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-900 uppercase">
                Category
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-900 uppercase">
                Price
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-900 uppercase">
                Stock
              </th>
              <th className="px-4 py-3 text-right text-xs font-semibold text-gray-900 uppercase">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {products && products.length > 0 ? (
              products.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gray-200 rounded flex items-center justify-center flex-shrink-0 overflow-hidden">
                        {product.image_url ? (
                          <img
                            src={product.image_url}
                            alt=""
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <span className="text-gray-500 text-sm font-bold">
                            {product.name.charAt(0)}
                          </span>
                        )}
                      </div>
                      <span className="font-medium text-gray-900">
                        {product.name}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-gray-900">
                    {product.categories?.name || "—"}
                  </td>
                  <td className="px-4 py-3 text-gray-900">
                    ${product.base_price}
                  </td>
                  <td className="px-4 py-3">
                    {product.in_stock ? (
                      <span className="text-green-600 font-medium">In stock</span>
                    ) : (
                      <span className="text-red-600 font-medium">Out</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/admin/products/${product.id}/edit`}
                        className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                        title="Edit"
                      >
                        <Pencil className="w-4 h-4" />
                      </Link>
                      <DeleteProductButton productId={product.id} productName={product.name} />
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-gray-500">
                  No products yet.{" "}
                  <Link
                    href="/admin/products/new"
                    className="text-red-600 hover:text-red-700 font-semibold"
                  >
                    Add one
                  </Link>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
