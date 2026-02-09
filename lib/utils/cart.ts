// cart item interface :
export interface CartItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  size: string;
  quantity: number;
  image?: string;
}
// Function add items to the cart
export const addToCart = (item: Omit<CartItem, "id">) => {
  // Get the existing cart from localStorage
  const cart: CartItem[] = JSON.parse(localStorage.getItem("cart") || "[]");

  // Check if item with the same productId and size exists
  const existingItemIndex = cart.findIndex(
    (cartItem) => cartItem.productId === item.productId && cartItem.size === item.size
  );

  if (existingItemIndex >= 0) {
    // If item exists, increase quantity
    cart[existingItemIndex].quantity += item.quantity;
  } else {
    // If new item, add it with unique ID
    const newItem: CartItem = {
      ...item,
      id: `${item.productId}-${item.size}-${Date.now()}`,
    };
    cart.push(newItem);
  }

  // Save updated cart back to localStorage
  localStorage.setItem("cart", JSON.stringify(cart));
  return cart;
};

// Get total number of items in cart
export const getCartCount = (): number => {
  // Check if we're in browser (not server)
  if (typeof window === "undefined") return 0;

  const cart: CartItem[] = JSON.parse(localStorage.getItem("cart") || "[]");
  // Sum up all quantities
  return cart.reduce((total, item) => total + item.quantity, 0);
};

// Get all cart items
export const getCartItems = (): CartItem[] => {
  // Check if we're in browser
  if (typeof window === "undefined") return [];

  return JSON.parse(localStorage.getItem("cart") || "[]");
};
