import Link from "next/link";
import { Shirt, Heart, Sparkles } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* hero section */}
      <div className="bg-gradient-to-b from-red-50/60 via-white to-white border-b border-gray-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="max-w-5xl mx-auto flex flex-col gap-8 lg:flex-row lg:items-center">
            <div className="flex-1">
              <p className="inline-flex items-center gap-2 rounded-full bg-white/70 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-red-600 shadow-sm mb-4">
                <span className="h-1.5 w-1.5 rounded-full bg-red-600" />
                Crafted for creators
              </p>
              <h1 className="text-4xl lg:text-5xl font-bold tracking-tight text-gray-900 mb-4">
                About DydyShop
              </h1>
              <p className="text-lg lg:text-xl text-gray-600 max-w-2xl">
                Your one-stop shop for custom-designed clothing. Create unique
                styles that express your personality.
              </p>
            </div>
            <div className="flex-1 grid grid-cols-2 gap-4 max-w-sm lg:max-w-xs lg:ml-8">
              <div className="rounded-2xl border border-red-100 bg-white/80 px-4 py-3 shadow-sm">
                <p className="text-xs font-semibold text-gray-600">Focus</p>
                <p className="mt-1 text-lg font-bold text-gray-900">
                  Custom pieces
                </p>
              </div>
              <div className="rounded-2xl border border-gray-100 bg-white/80 px-4 py-3 shadow-sm">
                <p className="text-xs font-semibold text-gray-600">Style</p>
                <p className="mt-1 text-lg font-bold text-gray-900">
                  Minimal &amp; bold
                </p>
              </div>
              <div className="col-span-2 rounded-2xl border border-gray-100 bg-gray-900 px-4 py-3 shadow-md">
                <p className="text-xs font-semibold text-gray-300">
                  Designed for you
                </p>
                <p className="mt-1 text-lg font-bold text-white">
                  Wear your story.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-12 lg:py-16 space-y-16">
        {/* our story */}
        <section>
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-100 shadow-sm p-6 lg:p-8">
            <p className="text-gray-900 leading-relaxed mb-4">
              DydyShop was born from a simple idea: everyone deserves to wear
              clothing that reflects who they are. We believe that fashion
              should be personal, accessible, and fun.
            </p>
            <p className="text-gray-900 leading-relaxed">
              From custom t-shirts and hoodies to unique footwear, we offer a
              curated selection of quality pieces that you can make your own.
              Whether you&apos;re looking for everyday comfort or something
              special for an occasion, we&apos;re here to help you stand out.
            </p>
          </div>
        </section>

        {/* what we offer */}
        <section>
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            What We Offer
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            <div className="group bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-100 shadow-sm p-6 lg:p-7 transition-all hover:-translate-y-1 hover:shadow-xl">
              <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-red-600 group-hover:text-white transition-colors">
                <Shirt className="w-6 h-6 text-red-600 group-hover:text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Custom Clothing
              </h3>
              <p className="text-gray-900">
                T-shirts, hoodies, and more—all designed with quality materials
                and attention to detail.
              </p>
            </div>
            <div className="group bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-100 shadow-sm p-6 lg:p-7 transition-all hover:-translate-y-1 hover:shadow-xl">
              <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-red-600 group-hover:text-white transition-colors">
                <Heart className="w-6 h-6 text-red-600 group-hover:text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Quality First
              </h3>
              <p className="text-gray-900">
                We source the best materials to ensure your clothes look great
                and last long.
              </p>
            </div>
            <div className="group bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-100 shadow-sm p-6 lg:p-7 transition-all hover:-translate-y-1 hover:shadow-xl">
              <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-red-600 group-hover:text-white transition-colors">
                <Sparkles className="w-6 h-6 text-red-600 group-hover:text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Express Yourself
              </h3>
              <p className="text-gray-900">
                Stand out from the crowd with pieces that tell your story and
                match your style.
              </p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section>
          <div className="relative overflow-hidden rounded-3xl bg-gray-900 px-6 py-8 lg:px-10 lg:py-12">
            <div className="pointer-events-none absolute inset-y-0 right-0 w-1/2 bg-gradient-to-l from-red-600/40 to-transparent" />
            <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-xl">
                <h2 className="text-2xl lg:text-3xl font-bold text-white mb-3">
                  Ready to Find Your Style?
                </h2>
                <p className="text-sm lg:text-base text-gray-300">
                  Explore our collection and discover pieces that are made for you.
                  From everyday essentials to statement designs, DydyShop has you covered.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/shop"
                  className="inline-flex items-center justify-center rounded-full bg-red-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-red-500"
                >
                  Shop Now
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/5 px-6 py-2.5 text-sm font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/10"
                >
                  Talk to us
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
