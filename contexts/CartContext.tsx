"use client";

import { CartItem, getCartItems } from "@/lib/utils/cart";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: Omit<CartItem, "id">) => void;
  updateQuantity: (id: string, change: number) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  cartCount: number;
  cartTotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load cart from localStorage on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedCart = getCartItems();
      setCart(savedCart);
      setIsLoaded(true);
    }
  }, []);

  // Save to localStorage when cart changes
  useEffect(() => {
    if (isLoaded && typeof window !== "undefined") {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart, isLoaded]);

  // Add item to cart
  const addToCart = (item: Omit<CartItem, "id">) => {
    setCart((prevCart) => {
      const existingItemIndex = prevCart.findIndex(
        (cartItem) =>
          cartItem.productId === item.productId && cartItem.size === item.size
      );

      if (existingItemIndex >= 0) {
        // if exists : increase quantity
        const newCart = [...prevCart];
        newCart[existingItemIndex].quantity += item.quantity;
        return newCart;
      } else {
        // else generate a new id
        const newItem: CartItem = {
          ...item,
          id: `${item.productId}-${item.size}-${Date.now()}`,
        };
        return [...prevCart, newItem];
      }
    });
  };

  // Update quantity
  const updateQuantity = (id: string, change: number) => {
    setCart((prevCart) =>
      prevCart.map((item) => {
        if (item.id === id) {
          const newQuantity = item.quantity + change;
          return { ...item, quantity: newQuantity > 0 ? newQuantity : 1 };
        }
        return item;
      })
    );
  };

  // Remove item
  const removeItem = (id: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  // Clear cart
  const clearCart = () => {
    setCart([]);
  };

  // Calculate cart count
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  // Calculate cart total
  const cartTotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        updateQuantity,
        removeItem,
        clearCart,
        cartCount,
        cartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use cart
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }
  return context;
};
