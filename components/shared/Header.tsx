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
    <header className="fixed top-0 left-0 right-0 z-50 bg-black border-b border-amber-500/20 backdrop-blur-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link
            href="/"
            className="text-xl font-semibold tracking-tight text-white hover:text-amber-400 transition-colors duration-200"
          >
            Dydy <span className="text-amber-400">Custom</span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <Link
              href="/shop"
              className="text-sm font-medium text-neutral-300 hover:text-amber-400 transition-colors duration-200 relative py-2 after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-amber-400 after:transition-all after:duration-200 hover:after:w-full"
            >
              Shop
            </Link>
            <Link
              href="/about"
              className="text-sm font-medium text-neutral-300 hover:text-amber-400 transition-colors duration-200 relative py-2 after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-amber-400 after:transition-all after:duration-200 hover:after:w-full"
            >
              About
            </Link>
            <Link
              href="/contact"
              className="text-sm font-medium text-neutral-300 hover:text-amber-400 transition-colors duration-200 relative py-2 after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-amber-400 after:transition-all after:duration-200 hover:after:w-full"
            >
              Contact
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
                    className="p-2.5 hover:bg-neutral-100 rounded-full transition-colors duration-200 group"
                  >
                    <User className="w-5 h-5 text-neutral-600 group-hover:text-neutral-900 transition-colors" />
                  </button>

                  {/* Dropdown Menu */}
                  {isDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-72 bg-neutral-900 rounded-2xl shadow-xl border border-amber-500/20 py-2 z-50">
                      <div className="px-5 py-3 border-b border-neutral-700">
                        <p className="text-sm font-medium text-neutral-200 truncate">
                          {user.email}
                        </p>
                      </div>
                      <Link
                        href="/account"
                        onClick={() => setIsDropdownOpen(false)}
                        className="flex items-center gap-3 px-5 py-2.5 text-sm text-neutral-300 hover:bg-white/5 hover:text-amber-400 transition-colors duration-200 rounded-lg mx-2"
                      >
                        <User className="w-4 h-4" />
                        Profile
                      </Link>
                      <Link
                        href="/account/orders"
                        onClick={() => setIsDropdownOpen(false)}
                        className="flex items-center gap-3 px-5 py-2.5 text-sm text-neutral-300 hover:bg-white/5 hover:text-amber-400 transition-colors duration-200 rounded-lg mx-2"
                      >
                        <Package className="w-4 h-4" />
                        Orders
                      </Link>
                      <Link
                        href="/account/settings"
                        onClick={() => setIsDropdownOpen(false)}
                        className="flex items-center gap-3 px-5 py-2.5 text-sm text-neutral-300 hover:bg-white/5 hover:text-amber-400 transition-colors duration-200 rounded-lg mx-2"
                      >
                        <Settings className="w-4 h-4" />
                        Settings
                      </Link>
                      {isAdmin && (
                        <Link
                          href="/admin"
                          onClick={() => setIsDropdownOpen(false)}
                          className="flex items-center gap-3 px-5 py-2.5 text-sm text-neutral-300 hover:bg-white/5 hover:text-amber-400 transition-colors duration-200 rounded-lg mx-2"
                        >
                          <Shield className="w-4 h-4" />
                          Admin
                        </Link>
                      )}
                      <div className="border-t border-neutral-700 my-2" />
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-5 py-2.5 text-sm text-red-400 hover:bg-red-500/10 transition-colors duration-200 text-left rounded-lg mx-2"
                      >
                        <LogOut className="w-4 h-4" />
                        Logout
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <Link
                  href="/auth/login"
                  className="p-2.5 hover:bg-white/10 rounded-full transition-colors duration-200 group"
                >
                  <User className="w-5 h-5 text-neutral-300 group-hover:text-amber-400 transition-colors" />
                </Link>
              )}
            </div>

          </div>
        </div>
      </div>
    </header>
  );
}
