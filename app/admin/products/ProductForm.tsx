"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface Category {
  id: string;
  name: string;
  slug: string;
}

interface Props {
  categories: Category[];
  product?: {
    id: string;
    name: string;
    description: string | null;
    base_price: number;
    in_stock: boolean;
    featured: boolean;
    category_id: string | null;
    image_url: string | null;
    sizes: string[] | null;
  };
}

const CLOTHING_SIZES = ["XS", "S", "M", "L", "XL", "XXL"];
const SHOE_SIZES = ["6", "7", "8", "9", "10", "11", "12", "13"];

export default function ProductForm({
  categories,
  product,
}: Props) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>(
    product?.category_id || ""
  );

  const selectedCategory = categories.find((c) => c.id === selectedCategoryId);
  const isShoes = selectedCategory?.slug?.toLowerCase() === "shoes";
  const sizeOptions = isShoes ? SHOE_SIZES : CLOTHING_SIZES;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    const form = e.currentTarget;
    const formData = new FormData(form);

    const url = product
      ? `/api/admin/products/${product.id}`
      : "/api/admin/products";
    const method = product ? "PATCH" : "POST";

    const res = await fetch(url, {
      method,
      body: formData,
      credentials: "include",
    });

    const data = await res.json();

    setIsSubmitting(false);

    if (data.success) {
      router.push("/admin/products");
      router.refresh();
    } else {
      setError(data.error || "Something went wrong");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      encType="multipart/form-data"
      className="bg-neutral-900 rounded-2xl border border-neutral-800 shadow-xl p-6 lg:p-8 space-y-6 max-w-2xl"
    >
      {error && (
        <div className="bg-amber-500/10 border border-amber-500/30 text-amber-800 px-4 py-3 rounded-xl">
          {error}
        </div>
      )}

      <div>
        <label className="block text-sm font-semibold text-white mb-2">
          Name *
        </label>
        <input
          name="name"
          type="text"
          required
          defaultValue={product?.name}
          className="w-full px-4 py-3 border border-neutral-700 rounded-xl bg-neutral-800 text-white placeholder-neutral-500 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition"
          placeholder="Product name"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-white mb-2">
          Description
        </label>
        <textarea
          name="description"
          rows={3}
          defaultValue={product?.description || ""}
          className="w-full px-4 py-3 border border-neutral-700 rounded-xl bg-neutral-800 text-white placeholder-neutral-500 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition resize-none"
          placeholder="Product description"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-white mb-2">
          Price *
        </label>
        <input
          name="base_price"
          type="number"
          step="0.01"
          min="0"
          required
          defaultValue={product?.base_price}
          className="w-full px-4 py-3 border border-neutral-700 rounded-xl bg-neutral-800 text-white placeholder-neutral-500 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition"
          placeholder="0.00"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-white mb-2">
          Product Image
        </label>
        <input
          name="image"
          type="file"
          accept="image/*"
          className="w-full px-4 py-3 border border-neutral-700 rounded-xl bg-neutral-800 text-white placeholder-neutral-500 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-amber-500/10 file:text-amber-700 file:font-semibold"
        />
        {product?.image_url && (
          <p className="mt-2 text-sm text-neutral-600">
            Current image:{" "}
            <a
              href={product.image_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-amber-700 hover:text-amber-600"
            >
              View
            </a>
            . Upload a new file to replace it.
          </p>
        )}
      </div>

      <div>
        <label className="block text-sm font-semibold text-white mb-2">
          Category *
        </label>
        <select
          name="category_id"
          required
          value={selectedCategoryId}
          onChange={(e) => setSelectedCategoryId(e.target.value)}
          className="w-full px-4 py-3 border border-neutral-700 rounded-xl bg-neutral-800 text-white placeholder-neutral-500 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition"
        >
          <option value="">Select category</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-semibold text-white mb-2">
          Sizes {isShoes ? "(Canadian)" : ""}
        </label>
        <div className="flex flex-wrap gap-2">
          {sizeOptions.map((size) => (
            <label
              key={size}
              className="flex items-center gap-2 px-4 py-2 border-2 rounded-lg cursor-pointer transition-colors has-[:checked]:border-amber-500 has-[:checked]:bg-amber-500/20 has-[:checked]:text-amber-400 border-neutral-600 hover:border-amber-500"
            >
              <input
                name="sizes"
                type="checkbox"
                value={size}
                defaultChecked={product?.sizes?.includes(size)}
                className="sr-only"
              />
              <span className="font-medium">{size}</span>
            </label>
          ))}
        </div>
        {!selectedCategoryId && (
          <p className="mt-2 text-sm text-neutral-500">
            Select a category to see available sizes
          </p>
        )}
      </div>

      <div className="flex gap-6">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            name="in_stock"
            type="checkbox"
            defaultChecked={product?.in_stock ?? true}
            value="true"
            className="rounded border-neutral-400"
          />
          <span className="text-white">In stock</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            name="featured"
            type="checkbox"
            defaultChecked={product?.featured ?? false}
            value="true"
            className="rounded border-neutral-400"
          />
          <span className="text-white">Featured</span>
        </label>
      </div>

      <div className="flex gap-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-black hover:bg-neutral-800 text-amber-400 font-semibold py-2 px-6 rounded-xl transition-colors disabled:opacity-50"
        >
          {isSubmitting ? "Saving..." : product ? "Update" : "Create"}
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          className="bg-neutral-200 hover:bg-neutral-300 text-white font-semibold py-2 px-6 rounded-xl transition-colors"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
