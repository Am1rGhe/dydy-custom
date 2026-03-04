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
      className="bg-white rounded-lg shadow-md p-6 space-y-4"
    >
      <h2 className="text-lg font-bold text-gray-900 mb-4">Add category</h2>
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded text-sm">
          {error}
        </div>
      )}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Name
        </label>
        <input
          type="text"
          value={name}
          onChange={handleNameChange}
          required
          className="w-full px-4 py-3 border border-gray-900 rounded-lg text-gray-900 focus:ring-2 focus:ring-red-500 outline-none transition"
          placeholder="T-Shirts"
        />
      </div>
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Slug
        </label>
        <input
          type="text"
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          required
          className="w-full px-4 py-3 border border-gray-900 rounded-lg text-gray-900 focus:ring-2 focus:ring-red-500 outline-none transition"
          placeholder="t-shirts"
        />
      </div>
      <button
        type="submit"
        disabled={isSubmitting}
        className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors disabled:opacity-50"
      >
        {isSubmitting ? "Adding..." : "Add"}
      </button>
    </form>
  );
}
