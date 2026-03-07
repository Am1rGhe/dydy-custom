import { createServerSupabase } from "@/lib/supabase/server";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import AddToCartButton from "@/components/shop/AddToCartButton";
import type { Metadata } from "next";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

async function getProduct(id: string) {
  const supabase = await createServerSupabase();
  const { data, error } = await supabase
    .from("products")
    .select("*, categories(name, slug)")
    .eq("id", id)
    .single();
  if (error || !data) return null;
  return data;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const product = await getProduct(id);
  if (!product) {
    return { title: "Product not found" };
  }
  const title = product.name;
  const description =
    product.description ||
    `${product.name} – $${product.base_price}. ${product.categories?.name ?? "Shop"} at Dydy Custom.`;
  const image = product.image_url ?? undefined;
  return {
    title,
    description,
    openGraph: {
      title: `${title} | Dydy Custom`,
      description,
      images: image ? [{ url: image, alt: product.name }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | Dydy Custom`,
      description,
      images: image ? [image] : undefined,
    },
  };
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { id } = await params;
  const product = await getProduct(id);
  if (!product) notFound();

  return (
    <div className="min-h-screen py-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          href="/shop"
          className="inline-flex items-center text-sm font-medium text-neutral-400 hover:text-amber-400 mb-8 transition-colors duration-200"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Shop
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 bg-neutral-900 rounded-2xl border border-neutral-800 shadow-xl p-6 lg:p-10">
          <div className="w-full">
            <div className="w-full aspect-square max-h-[28rem] bg-neutral-800 rounded-2xl flex items-center justify-center relative overflow-hidden">
              {product.image_url ? (
                <img
                  src={product.image_url}
                  alt={product.name}
                  className="w-full h-full object-cover rounded-lg"
                />
              ) : (
                <div className="text-neutral-500 text-6xl font-semibold">
                  {product.name.charAt(0)}
                </div>
              )}
              {product.featured && (
                <span className="absolute top-4 right-4 bg-amber-500 text-black text-xs font-medium px-3 py-1.5 rounded-full">
                  Featured
                </span>
              )}
            </div>
          </div>

          <div className="flex flex-col">
            <div className="mb-4">
              <span className="text-sm text-amber-400 font-semibold">
                {product.categories?.name || "Uncategorized"}
              </span>
            </div>

            <h1 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              {product.name}
            </h1>

            <p className="text-neutral-400 mb-6 leading-relaxed">
              {product.description || "No description available."}
            </p>

            <div className="mb-6">
              <span className="text-3xl font-bold text-amber-400">
                ${product.base_price}
              </span>
            </div>

            <div className="mb-6">
              {product.in_stock ? (
                <span className="inline-block bg-emerald-500/20 text-emerald-400 text-sm font-semibold px-3 py-1 rounded-lg">
                  In Stock
                </span>
              ) : (
                <span className="inline-block bg-amber-500/20 text-amber-400 text-sm font-semibold px-3 py-1 rounded-lg">
                  Out of Stock
                </span>
              )}
            </div>

            {/* Add to cart button with size selector */}
            <AddToCartButton
              productId={product.id}
              productName={product.name}
              price={product.base_price}
              inStock={product.in_stock}
              sizes={product.sizes || []}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
