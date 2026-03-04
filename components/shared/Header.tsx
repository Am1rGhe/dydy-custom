"use client";
import { User, LogOut, Package, Settings, Shield } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { createClientSupabase } from "@/lib/supabase/client";
import CartIcon from "./CartIcon";

export default function Header() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkUser = async () => {
      const supabase = createClientSupabase();
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
      if (user) {
        const res = await fetch("/api/admin/check");
        const { isAdmin } = await res.json();
        setIsAdmin(isAdmin);
      } else {
        setIsAdmin(false);
      }
    };

    checkUser();

    // Listen for auth changes
    const supabase = createClientSupabase();
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        const res = await fetch("/api/admin/check");
        const { isAdmin } = await res.json();
        setIsAdmin(isAdmin);
      } else {
        setIsAdmin(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    const supabase = createClientSupabase();
    await supabase.auth.signOut();
    setUser(null);
    setIsDropdownOpen(false);
    router.push("/");
    router.refresh();
  };

  return (
    <header className="bg-white border-b border-gray-100 fixed top-0 left-0 right-0 z-50 shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            href="/"
            className="text-2xl font-bold text-red-600 hover:text-red-700 transition-colors"
          >
            Dydy Custom
          </Link>

          {/* Navigation links in the middle */}
          <nav className="hidden md:flex items-center gap-8">
            <Link
              href="/shop"
              className="text-gray-700 hover:text-red-600 font-medium transition-colors relative group"
            >
              Shop
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-600 group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link
              href="/about"
              className="text-gray-700 hover:text-red-600 font-medium transition-colors relative group"
            >
              About
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-600 group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link
              href="/contact"
              className="text-gray-700 hover:text-red-600 font-medium transition-colors relative group"
            >
              Contact
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-600 group-hover:w-full transition-all duration-300"></span>
            </Link>
          </nav>

          {/* Right side cart and user */}
          <div className="flex items-center gap-4">
            {/* Cart icon */}
            <CartIcon />

            {/* User icon with dropdown */}
            <div className="relative" ref={dropdownRef}>
              {user ? (
                <>
                  <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="p-2 hover:bg-red-50 rounded-full transition-colors group"
                  >
                    <User className="w-6 h-6 text-gray-700 group-hover:text-red-600 transition-colors" />
                  </button>

                  {/* Dropdown Menu */}
                  {isDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-72 bg-white rounded-lg shadow-lg border border-gray-200 py-3 z-50">
                      <div className="px-6 py-3 border-b border-gray-200">
                        <p className="text-base font-semibold text-gray-900">
                          {user.email}
                        </p>
                      </div>
                      <Link
                        href="/account"
                        onClick={() => setIsDropdownOpen(false)}
                        className="flex items-center gap-4 px-6 py-3 text-base text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors"
                      >
                        <User className="w-5 h-5" />
                        Profile
                      </Link>
                      <Link
                        href="/account/orders"
                        onClick={() => setIsDropdownOpen(false)}
                        className="flex items-center gap-4 px-6 py-3 text-base text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors"
                      >
                        <Package className="w-5 h-5" />
                        Orders
                      </Link>
                      <Link
                        href="/account/settings"
                        onClick={() => setIsDropdownOpen(false)}
                        className="flex items-center gap-4 px-6 py-3 text-base text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors"
                      >
                        <Settings className="w-5 h-5" />
                        Settings
                      </Link>
                      {isAdmin && (
                        <Link
                          href="/admin"
                          onClick={() => setIsDropdownOpen(false)}
                          className="flex items-center gap-4 px-6 py-3 text-base text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors"
                        >
                          <Shield className="w-5 h-5" />
                          Admin
                        </Link>
                      )}
                      <div className="border-t border-gray-200 my-2"></div>
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-4 px-6 py-3 text-base text-red-600 hover:bg-red-50 transition-colors text-left"
                      >
                        <LogOut className="w-5 h-5" />
                        Logout
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <Link
                  href="/auth/login"
                  className="p-2 hover:bg-red-50 rounded-full transition-colors group"
                >
                  <User className="w-6 h-6 text-gray-700 group-hover:text-red-600 transition-colors" />
                </Link>
              )}
            </div>

          </div>
        </div>
      </div>
    </header>
  );
}
