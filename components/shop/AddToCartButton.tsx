"use client";
import { useCart } from "@/contexts/CartContext";
import { Check, ShoppingCart } from "lucide-react";
import { useState } from "react";

interface AddToCartButtonProps {
  productId: string;
  productName: string;
  price: number;
  inStock: boolean;
  sizes: string[];
}

export default function AddToCartButton({
  productId,
  productName,
  price,
  inStock,
  sizes,
}: AddToCartButtonProps) {
  const { addToCart } = useCart();
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);

  // handle add to cart
  const handleAddToCart = () => {
    if (!selectedSize) {
      alert("please select a size");
      return;
    }

    // add items to the cart
    addToCart({
      productId,
      name: productName,
      price,
      size: selectedSize,
      quantity: 1,
    });

    // show the success emssage
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
    }, 2000);
  };
  return (
    <>
      {/* Size slector  */}
      {sizes && Array.isArray(sizes) && sizes.length > 0 && (
        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Size
          </label>
          <div className="flex flex-wrap gap-2">
            {sizes.map((size: string) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`px-4 py-2 border-2 rounded-lg font-medium transition-colors cursor-pointer ${
                  selectedSize === size
                    ? "border-red-600 bg-red-50 text-red-600"
                    : "border-gray-900 text-gray-900 hover:border-red-600 hover:text-red-600"
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Add to cart button */}
      <button
        onClick={handleAddToCart}
        disabled={!inStock || !selectedSize}
        className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-4 px-6 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-auto cursor-pointer"
      >
        {showSuccess ? (
          <>
            <Check className="w-5 h-5" />
            Added to Cart!
          </>
        ) : (
          <>
            <ShoppingCart className="w-5 h-5" />
            {inStock ? "Add to Cart" : "Out of Stock"}
          </>
        )}
      </button>
    </>
  );
}
