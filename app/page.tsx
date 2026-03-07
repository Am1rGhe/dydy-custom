import Link from "next/link";
import { ShoppingBag, LogIn, ArrowRight } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home",
  description:
    "Your one-stop shop for custom-designed clothing. Create unique styles that express your personality.",
  openGraph: {
    title: "Dydy Custom – Custom Clothing",
    description:
      "Your one-stop shop for custom-designed clothing. Create unique styles that express your personality.",
  },
};

export default function Home() {
  return (
    <div className="min-h-screen">
      <div className="min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto">
          <p className="inline-flex items-center gap-2 rounded-full bg-neutral-800 text-amber-400 px-4 py-2 text-xs font-medium uppercase tracking-widest mb-8 border border-amber-500/30">
            Custom clothing
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-6">
            Welcome to{" "}
            <span className="bg-gradient-to-r from-amber-400 to-amber-500 bg-clip-text text-transparent">
              Dydy Custom
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-neutral-400 mb-12 max-w-xl mx-auto leading-relaxed">
            Your one-stop shop for custom-designed clothing. Create unique styles
            that express your personality.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/shop"
              className="group inline-flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-400 text-black font-medium py-3.5 px-8 rounded-2xl transition-all duration-200 shadow-lg shadow-amber-500/20 hover:shadow-amber-500/30 hover:-translate-y-0.5"
            >
              <ShoppingBag className="w-5 h-5" />
              Shop
              <ArrowRight className="w-4 h-4 opacity-80 group-hover:translate-x-0.5 transition-transform duration-200" />
            </Link>
            <Link
              href="/auth/login"
              className="inline-flex items-center justify-center gap-2 border-2 border-amber-500/60 text-white hover:bg-amber-500/10 font-medium py-3.5 px-8 rounded-2xl transition-all duration-200"
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
