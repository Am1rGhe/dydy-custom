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
        <h1 className="text-3xl font-bold text-white">Products</h1>
        <Link
          href="/admin/products/new"
          className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-black font-semibold py-2 px-4 rounded-xl transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Product
        </Link>
      </div>

      <div className="bg-neutral-900 rounded-2xl border border-neutral-800 shadow-xl overflow-hidden">
        <table className="min-w-full divide-y divide-neutral-800">
          <thead className="bg-neutral-800">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-semibold text-neutral-200 uppercase">
                Product
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-neutral-200 uppercase">
                Category
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-neutral-200 uppercase">
                Price
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-neutral-200 uppercase">
                Stock
              </th>
              <th className="px-4 py-3 text-right text-xs font-semibold text-neutral-200 uppercase">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-800 bg-neutral-900">
            {products && products.length > 0 ? (
              products.map((product) => (
                <tr key={product.id} className="hover:bg-neutral-800">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-neutral-800 rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden">
                        {product.image_url ? (
                          <img
                            src={product.image_url}
                            alt=""
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <span className="text-neutral-500 text-sm font-bold">
                            {product.name.charAt(0)}
                          </span>
                        )}
                      </div>
                      <span className="font-medium text-white">
                        {product.name}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-neutral-200">
                    {product.categories?.name || "—"}
                  </td>
                  <td className="px-4 py-3 text-neutral-200">
                    ${product.base_price}
                  </td>
                  <td className="px-4 py-3">
                    {product.in_stock ? (
                      <span className="text-emerald-600 font-medium">In stock</span>
                    ) : (
                      <span className="text-amber-700 font-medium">Out</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/admin/products/${product.id}/edit`}
                        className="p-2 text-neutral-600 hover:text-amber-600 hover:bg-amber-500/10 rounded-lg transition-colors"
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
                <td colSpan={5} className="px-4 py-8 text-center text-neutral-400">
                  No products yet.{" "}
                  <Link
                    href="/admin/products/new"
                    className="text-amber-700 hover:text-amber-600 font-semibold"
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
