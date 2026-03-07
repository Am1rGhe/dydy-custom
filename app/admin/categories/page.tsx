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
      <h1 className="text-3xl font-bold text-white mb-8">Categories</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <CategoriesForm />
        <div className="bg-neutral-900 rounded-2xl border border-neutral-800 shadow-xl p-6">
          <h2 className="text-lg font-bold text-white mb-4">
            Existing categories
          </h2>
          {categories && categories.length > 0 ? (
            <ul className="space-y-2">
              {categories.map((c) => (
                <li
                  key={c.id}
                  className="flex items-center justify-between py-2 border-b border-neutral-800 last:border-0"
                >
                  <span className="font-medium text-white">{c.name}</span>
                  <span className="text-sm text-neutral-400">{c.slug}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-neutral-400">No categories yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}
