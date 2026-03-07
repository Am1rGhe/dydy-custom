import { createAdminSupabase } from "@/lib/supabase/admin";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";
import ProductForm from "../../ProductForm";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EditProductPage({ params }: PageProps) {
  const { id } = await params;
  const supabase = createAdminSupabase();

  const { data: product, error } = await supabase
    .from("products")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !product) notFound();

  const { data: categories } = await supabase
    .from("categories")
    .select("id, name, slug")
    .order("name");

  return (
    <div>
      <Link
        href="/admin/products"
        className="inline-flex items-center text-neutral-600 hover:text-amber-600 mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Products
      </Link>
      <h1 className="text-3xl font-bold text-black mb-8">Edit Product</h1>
      <ProductForm
        categories={categories || []}
        product={{
          id: product.id,
          name: product.name,
          description: product.description,
          base_price: product.base_price,
          in_stock: product.in_stock,
          featured: product.featured ?? false,
          category_id: product.category_id,
          image_url: product.image_url,
          sizes: product.sizes,
        }}
      />
    </div>
  );
}
