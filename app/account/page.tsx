"use client";

import { createClientSupabase } from "@/lib/supabase/client";
import { User, Package, Settings, Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function AccountPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [ordersCount, setOrdersCount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const supabase = createClientSupabase();

        // Get current user
        const {
          data: { user: currentUser },
        } = await supabase.auth.getUser();

        if (!currentUser) {
          router.push("/auth/login?redirect=/account");
          return;
        }

        setUser(currentUser);

        // get orders count
        const { count } = await supabase
          .from("orders")
          .select("*", { count: "exact", head: true })
          .eq("user_id", currentUser.id);

        setOrdersCount(count || 0);
        setIsLoading(false);
      } catch (err: any) {
        console.error("Error fetching account data:", err);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-amber-500 mx-auto mb-4" />
          <p className="text-neutral-400">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <div className="bg-neutral-900 rounded-2xl border border-neutral-800 shadow-xl p-6 sticky top-24">
              <div className="mb-6">
                <div className="w-16 h-16 bg-amber-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <User className="w-8 h-8 text-amber-400" />
                </div>
                <h2 className="text-lg font-bold text-white text-center">
                  {user.email?.split("@")[0] || "User"}
                </h2>
                <p className="text-sm text-neutral-400 text-center mt-1">
                  {user.email}
                </p>
              </div>

              <nav className="space-y-2">
                <Link
                  href="/account"
                  className="flex items-center gap-3 px-4 py-3 bg-amber-500/10 text-amber-400 rounded-xl font-medium"
                >
                  <User className="w-5 h-5" />
                  Profile
                </Link>
                <Link
                  href="/account/orders"
                  className="flex items-center gap-3 px-4 py-3 text-neutral-300 hover:bg-neutral-800 hover:text-amber-400 rounded-xl transition-colors"
                >
                  <Package className="w-5 h-5" />
                  Orders
                </Link>
                <Link
                  href="/account/settings"
                  className="flex items-center gap-3 px-4 py-3 text-neutral-300 hover:bg-neutral-800 hover:text-amber-400 rounded-xl transition-colors"
                >
                  <Settings className="w-5 h-5" />
                  Settings
                </Link>
              </nav>
            </div>
          </div>

          <div className="lg:col-span-3">
            <div className="bg-neutral-900 rounded-2xl border border-neutral-800 shadow-xl p-6 lg:p-8">
              <h1 className="text-3xl font-bold text-white mb-6">
                Account Overview
              </h1>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-neutral-800 rounded-2xl border border-neutral-700 p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-neutral-400 mb-1">Total Orders</p>
                      <p className="text-3xl font-bold text-white">
                        {ordersCount}
                      </p>
                    </div>
                    <Package className="w-12 h-12 text-amber-400" />
                  </div>
                </div>

                <div className="bg-neutral-800 rounded-2xl border border-neutral-700 p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-neutral-400 mb-1">Account Status</p>
                      <p className="text-3xl font-bold text-white">Active</p>
                    </div>
                    <User className="w-12 h-12 text-amber-400" />
                  </div>
                </div>
              </div>

              <div className="border-t border-neutral-700 pt-6">
                <h2 className="text-xl font-bold text-white mb-4">
                  Profile Information
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-neutral-400 mb-1">
                      Email
                    </label>
                    <p className="text-neutral-200">{user.email}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-neutral-400 mb-1">
                      User ID
                    </label>
                    <p className="text-neutral-400 text-sm font-mono">
                      {user.id}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-neutral-400 mb-1">
                      Member Since
                    </label>
                    <p className="text-neutral-200">
                      {new Date(user.created_at).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                </div>
              </div>

              <div className="border-t border-neutral-700 pt-6 mt-6">
                <h2 className="text-xl font-bold text-white mb-4">
                  Quick Actions
                </h2>
                <div className="flex flex-wrap gap-4">
                  <Link
                    href="/account/orders"
                    className="bg-amber-500 hover:bg-amber-400 text-black font-semibold py-2 px-6 rounded-xl transition-colors"
                  >
                    View Orders
                  </Link>
                  <Link
                    href="/shop"
                    className="bg-neutral-800 hover:bg-neutral-700 text-white font-semibold py-2 px-6 rounded-xl transition-colors border border-neutral-700"
                  >
                    Continue Shopping
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
