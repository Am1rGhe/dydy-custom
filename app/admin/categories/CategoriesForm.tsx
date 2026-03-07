"use client";

import { useState } from "react";
import { createCategory } from "../actions";

export default function CategoriesForm() {
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value;
    setName(v);
    if (!slug || slug === name.toLowerCase().replace(/\s+/g, "-")) {
      setSlug(v.toLowerCase().replace(/\s+/g, "-"));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);
    try {
      await createCategory({ name, slug });
      setName("");
      setSlug("");
      window.location.reload();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to create");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-neutral-900 rounded-2xl border border-neutral-800 shadow-xl p-6 space-y-4"
    >
      <h2 className="text-lg font-bold text-white mb-4">Add category</h2>
      {error && (
        <div className="bg-amber-500/10 border border-amber-500/30 text-amber-800 px-4 py-3 rounded-xl text-sm">
          {error}
        </div>
      )}
      <div>
        <label className="block text-sm font-semibold text-black mb-2">
          Name
        </label>
        <input
          type="text"
          value={name}
          onChange={handleNameChange}
          required
          className="w-full px-4 py-3 border border-neutral-700 rounded-xl bg-neutral-800 text-white placeholder-neutral-500 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition"
          placeholder="T-Shirts"
        />
      </div>
      <div>
        <label className="block text-sm font-semibold text-black mb-2">
          Slug
        </label>
        <input
          type="text"
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          required
          className="w-full px-4 py-3 border border-neutral-700 rounded-xl bg-neutral-800 text-white placeholder-neutral-500 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition"
          placeholder="t-shirts"
        />
      </div>
      <button
        type="submit"
        disabled={isSubmitting}
        className="bg-amber-500 hover:bg-amber-400 text-black font-semibold py-2 px-6 rounded-xl transition-colors disabled:opacity-50"
      >
        {isSubmitting ? "Adding..." : "Add"}
      </button>
    </form>
  );
}
