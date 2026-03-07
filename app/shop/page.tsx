import { createServerSupabase } from "@/lib/supabase/server";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shop",
  description: "Discover our collection of custom-designed clothing and accessories.",
  openGraph: {
    title: "Shop | Dydy Custom",
    description: "Discover our collection of custom-designed clothing and accessories.",
  },
};

export default async function ShopPage() {
  const supabase = await createServerSupabase();

  // Fetch products from database
  const { data: products, error } = await supabase
    .from("products")
    .select("*, categories(name, slug)")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching products:", error);
  }

  return (
    <div className="min-h-screen py-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <h1 className="text-3xl font-bold tracking-tight text-white mb-1">Shop</h1>
          <p className="text-neutral-400 text-sm">Discover our collection</p>
        </div>

        {products && products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <Link
                key={product.id}
                href={`/shop/${product.id}`}
                className="group bg-neutral-900 rounded-2xl overflow-hidden border border-neutral-800 shadow-lg hover:shadow-xl hover:border-amber-500/40 transition-all duration-300"
              >
                <div className="aspect-[4/5] bg-neutral-800 flex items-center justify-center relative overflow-hidden">
                  {product.image_url ? (
                    <img
                      src={product.image_url}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500"
                    />
                  ) : (
                    <span className="text-neutral-500 text-4xl font-semibold">
                      {product.name.charAt(0)}
                    </span>
                  )}
                  {product.featured && (
                    <span className="absolute top-3 right-3 bg-amber-500 text-black text-xs font-medium px-2.5 py-1 rounded-full">
                      Featured
                    </span>
                  )}
                </div>
                <div className="p-5">
                  <p className="text-xs font-medium text-neutral-500 uppercase tracking-wider mb-1.5">
                    {product.categories?.name || "Uncategorized"}
                  </p>
                  <h3 className="font-semibold text-white mb-2 group-hover:text-amber-400 transition-colors duration-200 line-clamp-2">
                    {product.name}
                  </h3>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-semibold text-amber-400">
                      ${product.base_price}
                    </span>
                    {product.in_stock ? (
                      <span className="text-xs text-emerald-400 font-medium">In stock</span>
                    ) : (
                      <span className="text-xs text-amber-600 font-medium">Out of stock</span>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 rounded-2xl border border-neutral-800 bg-neutral-900">
            <p className="text-neutral-400">No products yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}
