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
          <label className="block text-sm font-semibold text-neutral-200 mb-2">
            Size
          </label>
          <div className="flex flex-wrap gap-2">
            {sizes.map((size: string) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`px-4 py-2 border-2 rounded-lg font-medium transition-colors cursor-pointer ${
                  selectedSize === size
                    ? "border-amber-500 bg-amber-500/20 text-amber-400"
                    : "border-neutral-600 text-neutral-300 hover:border-amber-500 hover:text-amber-400"
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
      )}

      <button
        onClick={handleAddToCart}
        disabled={!inStock || !selectedSize}
        className="w-full bg-amber-500 hover:bg-amber-400 text-black font-semibold py-4 px-6 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-auto cursor-pointer"
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
