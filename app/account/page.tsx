"use client";

import { createClientSupabase } from "@/lib/supabase/client";
import { User, Package, Loader2 } from "lucide-react";
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

        // Get orders count
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
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-red-600 mx-auto mb-4" />
          <p className="text-gray-900">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
              <div className="mb-6">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <User className="w-8 h-8 text-red-600" />
                </div>
                <h2 className="text-lg font-bold text-gray-900 text-center">
                  {user.email?.split("@")[0] || "User"}
                </h2>
                <p className="text-sm text-gray-600 text-center mt-1">
                  {user.email}
                </p>
              </div>

              <nav className="space-y-2">
                <Link
                  href="/account"
                  className="flex items-center gap-3 px-4 py-3 bg-red-50 text-red-600 rounded-lg font-medium"
                >
                  <User className="w-5 h-5" />
                  Profile
                </Link>
                <Link
                  href="/account/orders"
                  className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 hover:text-red-600 rounded-lg transition-colors"
                >
                  <Package className="w-5 h-5" />
                  Orders
                </Link>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-md p-6 lg:p-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-6">
                Account Overview
              </h1>

              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-lg p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Total Orders</p>
                      <p className="text-3xl font-bold text-gray-900">
                        {ordersCount}
                      </p>
                    </div>
                    <Package className="w-12 h-12 text-red-600" />
                  </div>
                </div>

                <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Account Status</p>
                      <p className="text-3xl font-bold text-gray-900">Active</p>
                    </div>
                    <User className="w-12 h-12 text-gray-600" />
                  </div>
                </div>
              </div>

              {/* Profile Information */}
              <div className="border-t pt-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">
                  Profile Information
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                      Email
                    </label>
                    <p className="text-gray-900">{user.email}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                      User ID
                    </label>
                    <p className="text-gray-900 text-sm font-mono">
                      {user.id}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                      Member Since
                    </label>
                    <p className="text-gray-900">
                      {new Date(user.created_at).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="border-t pt-6 mt-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">
                  Quick Actions
                </h2>
                <div className="flex flex-wrap gap-4">
                  <Link
                    href="/account/orders"
                    className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors"
                  >
                    View Orders
                  </Link>
                  <Link
                    href="/shop"
                    className="bg-gray-200 hover:bg-gray-300 text-gray-900 font-semibold py-2 px-6 rounded-lg transition-colors"
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
