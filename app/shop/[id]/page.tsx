import { createServerSupabase } from "@/lib/supabase/server";
import { ArrowLeft, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import SizeSelector from "@/components/shop/SizeSelector";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ProductDetailPage({ params }: PageProps) {
  // add params 
  const { id } = await params;
  
  // Create server supabase
  const supabase = await createServerSupabase();

  // Fetch the product by its id
  const { data: product, error } = await supabase
    .from("products")
    .select("*, categories(name, slug)")
    .eq("id", id)
    .single();
  // Handle not found error :
  if (error || !product) notFound();

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* GO back button  */}
        {/* redirect to /shop */}
        <Link
          href="/shop"
          className="inline-flex items-center text-gray-600 hover:text-red-600 mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Shop
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 bg-white rounded-lg shadow-md p-6 lg:p-8">
          {/* Product's image */}
          <div className="w-full">
            {/*  Leaving a character for now, gonna be fixed later */}
            <div className="w-full h-96 bg-gray-200 rounded-lg flex items-center justify-center relative overflow-hidden">
              <div className="text-gray-400 text-6xl font-bold">
                {product.name.charAt(0)}
              </div>
              {product.featured && (
                <span className="absolute top-4 right-4 bg-red-600 text-white text-xs font-semibold px-3 py-1 rounded">
                  Featured
                </span>
              )}
            </div>
          </div>

          {/* Product info */}
          <div className="flex flex-col">
            <div className="mb-4">
              <span className="text-sm text-red-600 font-semibold">
                {product.categories?.name || "Uncategorized"}
              </span>
            </div>

            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              {product.name}
            </h1>

            <p className="text-gray-600 mb-6 leading-relaxed">
              {product.description || "No description available."}
            </p>

            {/* Price */}
            <div className="mb-6">
              <span className="text-3xl font-bold text-gray-900">
                ${product.base_price}
              </span>
            </div>

            {/* Stock status */}
            <div className="mb-6">
              {product.in_stock ? (
                <span className="inline-block bg-green-100 text-green-800 text-sm font-semibold px-3 py-1 rounded">
                  In Stock
                </span>
              ) : (
                <span className="inline-block bg-red-100 text-red-800 text-sm font-semibold px-3 py-1 rounded">
                  Out of Stock
                </span>
              )}
            </div>

            {/* Size sleector */}
            {product.sizes &&
              Array.isArray(product.sizes) &&
              product.sizes.length > 0 && (
                <SizeSelector sizes={product.sizes} />
              )}

            {/* Add to cart button */}
            <button
              disabled={!product.in_stock}
              className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-4 px-6 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-auto cursor-pointer"
            >
              <ShoppingCart className="w-5 h-5" />
              {product.in_stock ? "Add to Cart" : "Out of Stock"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
