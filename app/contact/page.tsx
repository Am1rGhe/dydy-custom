"use client";

import { Mail, MapPin, Phone } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="min-h-screen">
      <div className="bg-neutral-900 border-b border-neutral-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="max-w-4xl mx-auto">
            <p className="inline-flex items-center gap-2 rounded-full bg-neutral-800 text-amber-400 px-3 py-1.5 text-xs font-semibold uppercase tracking-wide mb-4 border border-amber-500/30">
              Get in touch
            </p>
            <h1 className="text-4xl lg:text-5xl font-bold tracking-tight text-white mb-4">
              Contact Dydy Custom
            </h1>
            <p className="text-lg lg:text-xl text-neutral-400 max-w-2xl">
              Questions about an order, sizing, or a custom design? Reach out
              by email or phone and we&apos;ll get back to you as soon as possible.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="max-w-xl mx-auto space-y-6">
          <div className="bg-neutral-900 rounded-2xl border border-neutral-800 shadow-sm p-6">
            <h3 className="text-lg font-bold text-white mb-4">
              Contact details
            </h3>
            <div className="space-y-4 text-sm text-neutral-300">
              <div className="flex items-start gap-3">
                <div className="mt-0.5 rounded-lg bg-amber-500/20 p-2">
                  <Mail className="w-4 h-4 text-amber-400" />
                </div>
                <div>
                  <p className="font-semibold text-white">Email</p>
                  <p className="text-neutral-400">support@dydycustom.com</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="mt-0.5 rounded-lg bg-amber-500/20 p-2">
                  <Phone className="w-4 h-4 text-amber-400" />
                </div>
                <div>
                  <p className="font-semibold text-white">Phone</p>
                  <p className="text-neutral-400">514 448 6312</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="mt-0.5 rounded-lg bg-amber-500/20 p-2">
                  <MapPin className="w-4 h-4 text-amber-400" />
                </div>
                <div>
                  <p className="font-semibold text-white">Location</p>
                  <p className="text-neutral-400">
                      Online store, available worldwide.
                    </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-neutral-900 rounded-2xl p-6 text-sm text-neutral-400 border border-amber-500/20">
            <h3 className="text-lg font-semibold text-white mb-3">
              Response time
            </h3>
            <p className="mb-2">
              We typically reply within{" "}
              <span className="font-medium text-white">24–48 hours</span>{" "}
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

