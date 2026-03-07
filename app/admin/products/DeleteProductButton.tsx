"use client";

import { Trash2 } from "lucide-react";
import { useState } from "react";
import { deleteProduct } from "../actions";

interface Props {
  productId: string;
  productName: string;
}

export default function DeleteProductButton({ productId, productName }: Props) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!confirm(`Delete "${productName}"? This cannot be undone.`)) return;
    setIsDeleting(true);
    try {
      await deleteProduct(productId);
      window.location.reload();
    } catch (err) {
      alert("Failed to delete product.");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={isDeleting}
      className="p-2 text-neutral-600 hover:text-amber-700 hover:bg-amber-500/10 rounded-lg transition-colors disabled:opacity-50"
      title="Delete"
    >
      <Trash2 className="w-4 h-4" />
    </button>
  );
}
