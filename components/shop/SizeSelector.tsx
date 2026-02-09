"use client";

import { useState } from "react";

interface SizeSelectorProps {
  sizes: string[];
}

export default function SizeSelector({ sizes }: SizeSelectorProps) {
  const [selectedSize, setSelectedSize] = useState<string | null>(null);

  return (
    <div className="mb-6">
      <label className="block text-sm font-semibold text-gray-700 mb-2">
        Size
      </label>
      <div className="flex flex-wrap gap-2">
        {sizes.map((size: string) => (
          <button
            key={size}
            onClick={() => setSelectedSize(size)}
            className={`px-4 py-2 border-2 rounded-lg font-medium transition-colors cursor-pointer text-black ${
              selectedSize === size
                ? "border-red-600 bg-red-50 text-red-600"
                : "border-gray-300 hover:border-red-600 hover:text-red-600"
            }`}
          >
            {size}
          </button>
        ))}
      </div>
    </div>
  );
}
