// Cart item interface
export interface CartItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  size: string;
  quantity: number;
  image?: string;
}

// Get all cart items from localStorage

export const getCartItems = (): CartItem[] => {
  // Check if we're in browser
  if (typeof window === "undefined") return [];

  return JSON.parse(localStorage.getItem("cart") || "[]");
};
