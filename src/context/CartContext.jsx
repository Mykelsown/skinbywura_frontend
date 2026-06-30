import { createContext, useContext, useEffect, useMemo, useState, useCallback } from "react";
import * as api from "../lib/api.js";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [isCartOpen, setCartOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    Promise.all([api.getCart(), api.getWishlist()]).then(([cart, wish]) => {
      setItems(cart);
      setWishlist(wish);
      setLoaded(true);
    });
  }, []);

  useEffect(() => {
    if (loaded) api.saveCart(items);
  }, [items, loaded]);

  useEffect(() => {
    if (loaded) api.saveWishlist(wishlist);
  }, [wishlist, loaded]);

  const addItem = useCallback((product, qty = 1) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.id === product.id);
      if (existing) {
        return prev.map((i) =>
          i.id === product.id ? { ...i, qty: i.qty + qty } : i
        );
      }
      return [
        ...prev,
        {
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          qty,
        },
      ];
    });
    setCartOpen(true);
  }, []);

  const removeItem = useCallback((id) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  }, []);

  const updateQty = useCallback((id, qty) => {
    setItems((prev) =>
      qty <= 0
        ? prev.filter((i) => i.id !== id)
        : prev.map((i) => (i.id === id ? { ...i, qty } : i))
    );
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const toggleWishlist = useCallback((product) => {
    setWishlist((prev) => {
      const exists = prev.some((i) => i.id === product.id);
      if (exists) return prev.filter((i) => i.id !== product.id);
      return [
        ...prev,
        { id: product.id, name: product.name, price: product.price, image: product.image },
      ];
    });
  }, []);

  const subtotal = useMemo(
    () => items.reduce((sum, i) => sum + i.price * i.qty, 0),
    [items]
  );

  const itemCount = useMemo(
    () => items.reduce((sum, i) => sum + i.qty, 0),
    [items]
  );

  const value = {
    items,
    wishlist,
    subtotal,
    itemCount,
    isCartOpen,
    addItem,
    removeItem,
    updateQty,
    clearCart,
    toggleWishlist,
    openCart: () => setCartOpen(true),
    closeCart: () => setCartOpen(false),
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within a CartProvider");
  return ctx;
}
