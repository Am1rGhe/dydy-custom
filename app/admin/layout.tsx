import { createServerSupabase } from "@/lib/supabase/server";
import { isAdminUser } from "@/lib/admin";
import { redirect } from "next/navigation";
import Link from "next/link";
import { LayoutDashboard, Package, FolderTree, ShoppingBag } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin",
  description: "Dydy Custom admin dashboard.",
  robots: { index: false, follow: false },
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createServerSupabase();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/login?redirect=/admin");
  }

  if (!(await isAdminUser(user.email ?? undefined))) {
    redirect("/");
  }

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <div className="bg-neutral-900 rounded-2xl border border-neutral-800 shadow-xl p-6 sticky top-24">
              <h2 className="text-lg font-bold text-white mb-6">
                Admin
              </h2>
              <nav className="space-y-2">
                <Link
                  href="/admin"
                  className="flex items-center gap-3 px-4 py-3 text-neutral-200 hover:bg-amber-500/10 hover:text-amber-400 rounded-xl transition-colors"
                >
                  <LayoutDashboard className="w-5 h-5" />
                  Dashboard
                </Link>
                <Link
                  href="/admin/products"
                  className="flex items-center gap-3 px-4 py-3 text-neutral-200 hover:bg-amber-500/10 hover:text-amber-400 rounded-xl transition-colors"
                >
                  <Package className="w-5 h-5" />
                  Products
                </Link>
                <Link
                  href="/admin/categories"
                  className="flex items-center gap-3 px-4 py-3 text-neutral-200 hover:bg-amber-500/10 hover:text-amber-400 rounded-xl transition-colors"
                >
                  <FolderTree className="w-5 h-5" />
                  Categories
                </Link>
                <Link
                  href="/admin/orders"
                  className="flex items-center gap-3 px-4 py-3 text-neutral-200 hover:bg-amber-500/10 hover:text-amber-400 rounded-xl transition-colors"
                >
                  <ShoppingBag className="w-5 h-5" />
                  Orders
                </Link>
              </nav>
            </div>
          </div>
          <div className="lg:col-span-3">{children}</div>
        </div>
      </div>
    </div>
  );
}
