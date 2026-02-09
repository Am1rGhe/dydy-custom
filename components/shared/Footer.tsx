"use client";
import Link from "next/link";
import { Facebook, Instagram, Twitter, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-auto">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Top Section - 3 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Column 1: Company Info */}
          <div>
            <Link
              href="/"
              className="text-2xl font-bold text-red-600 mb-4 inline-block"
            >
              DydyShop
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed">
              Your one-stop shop for custom-designed clothing. Create unique
              styles that express your personality.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/shop"
                  className="text-gray-400 hover:text-red-500 transition-colors text-sm"
                >
                  Shop
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-gray-400 hover:text-red-500 transition-colors text-sm"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-gray-400 hover:text-red-500 transition-colors text-sm"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Social Media */}
          <div>
            <h3 className="text-white font-semibold mb-4">Follow Us</h3>
            <div className="flex gap-4">
              <a 
                href="#" 
                className="w-10 h-10 bg-gray-800 hover:bg-red-600 rounded-full flex items-center justify-center transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 bg-gray-800 hover:bg-red-600 rounded-full flex items-center justify-center transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 bg-gray-800 hover:bg-red-600 rounded-full flex items-center justify-center transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 bg-gray-800 hover:bg-red-600 rounded-full flex items-center justify-center transition-colors"
                aria-label="Email"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Section - Copyright */}
        <div className="border-t border-gray-800 pt-8 text-center">
          <p className="text-gray-500 text-sm">
            © 2026 DydyShop. Designed by{" "}
            <a 
              href="https://www.amirghouari.dev" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-red-500 hover:text-red-400 hover:underline transition-colors"
            >
              Amir
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
