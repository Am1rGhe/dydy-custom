import Link from "next/link";
import { ShoppingBag, LogIn, ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-red-50/30">
      <div className="min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto">
          <p className="inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-red-600 shadow-sm mb-6 border border-red-100">
            <span className="h-1.5 w-1.5 rounded-full bg-red-600 animate-pulse" />
            Custom clothing
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 mb-6">
            Welcome to{" "}
            <span className="bg-gradient-to-r from-red-600 to-red-500 bg-clip-text text-transparent">
              DydyShop
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 mb-12 max-w-xl mx-auto leading-relaxed">
            Your one-stop shop for custom-designed clothing. Create unique styles
            that express your personality.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/shop"
              className="group inline-flex items-center justify-center gap-2 bg-gray-900 hover:bg-gray-800 text-white font-semibold py-4 px-8 rounded-xl transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
            >
              <ShoppingBag className="w-5 h-5" />
              Shop
              <ArrowRight className="w-4 h-4 opacity-70 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/auth/login"
              className="inline-flex items-center justify-center gap-2 border-2 border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white font-semibold py-4 px-8 rounded-xl transition-all"
            >
              <LogIn className="w-5 h-5" />
              Log in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
