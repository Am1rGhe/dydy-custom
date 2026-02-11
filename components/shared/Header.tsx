"use client";
import { User, Menu } from "lucide-react";
import Link from "next/link";
import CartIcon from "./CartIcon";

export default function Header() {
  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link 
            href="/" 
            className="text-2xl font-bold text-red-600 hover:text-red-700 transition-colors"
          >
            DydyShop
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

            {/* User icon */}
            <Link 
              href="/auth/login"
              className="p-2 hover:bg-red-50 rounded-full transition-colors group"
            >
              <User className="w-6 h-6 text-gray-700 group-hover:text-red-600 transition-colors" />
            </Link>

            {/* Mobile Menu Button */}
            <button className="md:hidden p-2 hover:bg-red-50 rounded-full transition-colors">
              <Menu className="w-6 h-6 text-gray-700" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
