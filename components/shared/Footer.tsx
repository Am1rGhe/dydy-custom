"use client";
import Link from "next/link";
import { Facebook, Instagram, Twitter, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#0a0a0a] text-neutral-400 mt-auto border-t border-amber-500/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
          <div>
            <Link
              href="/"
              className="text-lg font-semibold tracking-tight text-amber-400 hover:text-amber-300 transition-colors duration-200 mb-4 inline-block"
            >
              Dydy Custom
            </Link>
            <p className="text-neutral-500 text-sm leading-relaxed max-w-xs">
              Your one-stop shop for custom-designed clothing. Create unique
              styles that express your personality.
            </p>
          </div>
          <div>
            <h3 className="text-amber-400/90 font-medium text-sm mb-4 uppercase tracking-wider">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/shop" className="text-neutral-500 hover:text-amber-400 transition-colors duration-200 text-sm">
                  Shop
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-neutral-500 hover:text-amber-400 transition-colors duration-200 text-sm">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-neutral-500 hover:text-amber-400 transition-colors duration-200 text-sm">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-amber-400/90 font-medium text-sm mb-4 uppercase tracking-wider">Follow Us</h3>
            <div className="flex gap-3">
              <a href="#" className="w-10 h-10 rounded-full bg-neutral-800 hover:bg-amber-500/20 flex items-center justify-center text-neutral-400 hover:text-amber-400 transition-colors duration-200" aria-label="Facebook">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-neutral-800 hover:bg-amber-500/20 flex items-center justify-center text-neutral-400 hover:text-amber-400 transition-colors duration-200" aria-label="Instagram">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-neutral-800 hover:bg-amber-500/20 flex items-center justify-center text-neutral-400 hover:text-amber-400 transition-colors duration-200" aria-label="Twitter">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-neutral-800 hover:bg-amber-500/20 flex items-center justify-center text-neutral-400 hover:text-amber-400 transition-colors duration-200" aria-label="Email">
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-neutral-800 pt-8 text-center">
          <p className="text-neutral-500 text-xs">
            © 2026 Dydy Custom. Designed by{" "}
            <a href="https://www.amirghouari.dev" target="_blank" rel="noopener noreferrer" className="text-neutral-500 hover:text-amber-400 transition-colors duration-200 underline underline-offset-2">
              Amir
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
