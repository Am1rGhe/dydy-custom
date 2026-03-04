import { createAdminSupabase } from "@/lib/supabase/admin";
import Link from "next/link";
import CategoriesForm from "./CategoriesForm";

export default async function AdminCategoriesPage() {
  const supabase = createAdminSupabase();
  const { data: categories } = await supabase
    .from("categories")
    .select("*")
    .order("name");

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Categories</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <CategoriesForm />
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">
            Existing categories
          </h2>
          {categories && categories.length > 0 ? (
            <ul className="space-y-2">
              {categories.map((c) => (
                <li
                  key={c.id}
                  className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0"
                >
                  <span className="font-medium text-gray-900">{c.name}</span>
                  <span className="text-sm text-gray-500">{c.slug}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No categories yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}
