"use client";

import { Mail, MapPin, MessageCircle } from "lucide-react";

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
              Questions about an order, sizing, or a custom design? Send us a
              message and we&apos;ll get back to you as soon as possible.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] gap-10 lg:gap-12">
          {/* Contact form (to implement later ) */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-100 shadow-sm p-6 lg:p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Send us a message
            </h2>
            <p className="text-sm text-gray-600 mb-6">
              Fill out the form below and we&apos;ll reply via email. This form
              is for demo purposes only and doesn&apos;t send real emails yet.
            </p>

            <form
              onSubmit={(e) => {
                e.preventDefault();
              }}
              className="space-y-5"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    Full name
                  </label>
                  <input
                    id="name"
                    type="text"
                    className="w-full px-4 py-3 border border-gray-900 rounded-lg text-gray-900 focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition placeholder:text-gray-700"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    Email address
                  </label>
                  <input
                    id="email"
                    type="email"
                    className="w-full px-4 py-3 border border-gray-900 rounded-lg text-gray-900 focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition placeholder:text-gray-700"
                    placeholder="you@example.com"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="subject"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Subject
                </label>
                <input
                  id="subject"
                  type="text"
                  className="w-full px-4 py-3 border border-gray-900 rounded-lg text-gray-900 focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition placeholder:text-gray-700"
                  placeholder="How can we help?"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-900 rounded-lg text-gray-900 focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition placeholder:text-gray-700 resize-none"
                  placeholder="Tell us a bit more about what you need..."
                />
              </div>

              <button
                type="submit"
                className="inline-flex items-center justify-center rounded-lg bg-red-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-red-700"
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                Send message
              </button>
            </form>
          </div>

          {/* Contact info */}
          <div className="space-y-6">
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
                For urgent order issues, include your order number in the
                subject line so we can help you faster.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

