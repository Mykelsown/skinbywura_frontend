import { createContext, useContext, useEffect, useMemo, useState, useCallback } from "react";
import { useAuth } from "./AuthContext.jsx";
import * as api from "../lib/api.js";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const { user } = useAuth();
  const [items, setItems] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [isCartOpen, setCartOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!user) {
      setItems([]);
      setWishlist([]);
      setLoaded(false);
      return;
    }

    let cancelled = false;
    setLoaded(false);

    Promise.all([api.getCart(), api.getWishlist()])
      .then(([cart, wish]) => {
        if (cancelled) return;
        setItems(Array.isArray(cart) ? cart : []);
        setWishlist(Array.isArray(wish) ? wish : []);
        setLoaded(true);
      })
      .catch(() => {
        if (!cancelled) {
          setItems([]);
          setWishlist([]);
          setLoaded(true);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [user]);

  useEffect(() => {
    if (!user || !loaded) return;

    api.saveCart(items).catch(() => {
      /* no-op: cart remains optimistic in local state until reload */
    });
  }, [items, user, loaded]);

  useEffect(() => {
    if (!user || !loaded) return;

    api.saveWishlist(wishlist).catch(() => {
      /* no-op: wishlist remains optimistic in local state until reload */
    });
  }, [wishlist, user, loaded]);

  const addItem = useCallback((product, qty = 1) => {
    if (!user) {
      window.alert("Please sign in to save your cart.");
      return;
    }

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
          product_id: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          qty,
        },
      ];
    });
    setCartOpen(true);
  }, [user]);

  const removeItem = useCallback((id) => {
    if (!user) return;
    setItems((prev) => prev.filter((i) => i.id !== id));
  }, [user]);

  const updateQty = useCallback((id, qty) => {
    if (!user) return;
    setItems((prev) =>
      qty <= 0
        ? prev.filter((i) => i.id !== id)
        : prev.map((i) => (i.id === id ? { ...i, qty } : i))
    );
  }, [user]);

  const clearCart = useCallback(() => {
    if (!user) return;
    setItems([]);
  }, [user]);

  const toggleWishlist = useCallback((product) => {
    if (!user) {
      window.alert("Please sign in to save your wishlist.");
      return;
    }

    setWishlist((prev) => {
      const exists = prev.some((i) => i.id === product.id);
      if (exists) return prev.filter((i) => i.id !== product.id);
      return [
        ...prev,
        {
          id: product.id,
          product_id: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
        },
      ];
    });
  }, [user]);

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
