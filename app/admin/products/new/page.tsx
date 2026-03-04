import { createAdminSupabase } from "@/lib/supabase/admin";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import ProductForm from "../ProductForm";

export default async function NewProductPage() {
  const supabase = createAdminSupabase();
  const { data: categories } = await supabase
    .from("categories")
    .select("id, name, slug")
    .order("name");

  return (
    <div>
      <Link
        href="/admin/products"
        className="inline-flex items-center text-gray-600 hover:text-red-600 mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Products
      </Link>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Add Product</h1>
      <ProductForm categories={categories || []} />
    </div>
  );
}
