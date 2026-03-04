"use client";

import { Mail, MapPin, Phone } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* hero section */}
      <div className="bg-gradient-to-b from-red-50/60 via-white to-white border-b border-gray-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="max-w-4xl mx-auto">
            <p className="inline-flex items-center gap-2 rounded-full bg-white/70 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-red-600 shadow-sm mb-4">
              <span className="h-1.5 w-1.5 rounded-full bg-red-600" />
              Get in touch
            </p>
            <h1 className="text-4xl lg:text-5xl font-bold tracking-tight text-gray-900 mb-4">
              Contact Dydy Custom
            </h1>
            <p className="text-lg lg:text-xl text-gray-600 max-w-2xl">
              Questions about an order, sizing, or a custom design? Reach out
              by email or phone and we&apos;ll get back to you as soon as possible.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="max-w-xl mx-auto space-y-6">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-100 shadow-sm p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">
              Contact details
            </h3>
            <div className="space-y-4 text-sm text-gray-900">
              <div className="flex items-start gap-3">
                <div className="mt-0.5 rounded-lg bg-red-100 p-2">
                  <Mail className="w-4 h-4 text-red-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Email</p>
                  <p className="text-gray-700">support@dydycustom.com</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="mt-0.5 rounded-lg bg-red-100 p-2">
                  <Phone className="w-4 h-4 text-red-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Phone</p>
                  <p className="text-gray-700">514 448 6312</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="mt-0.5 rounded-lg bg-red-100 p-2">
                  <MapPin className="w-4 h-4 text-red-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Location</p>
                  <p className="text-gray-700">
                    Online store, available worldwide.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-900 rounded-2xl p-6 text-sm text-gray-300">
            <h3 className="text-lg font-bold text-white mb-3">
              Response time
            </h3>
            <p className="mb-2">
              We typically reply within{" "}
              <span className="font-semibold text-white">24–48 hours</span>{" "}
              on business days.
            </p>
            <p>
              For urgent order issues, include your order number so we can help
              you faster.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

