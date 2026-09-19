import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

// New, user-directed addition — service-design pass: the cart icon/page
// existed but nothing on the site ever added to it. Only the Personal
// tier has a real fixed price (kr 190) on the real site; Commercial and
// above are "Price on request", so they stay request-form-only — a cart
// only makes product sense for the fixed-price tier. No price was
// invented: kr 190 is the real Personal price already shown on every
// plate.
export interface CartItem {
  plateId: string;
  title: string;
}

const CartContext = createContext<{
  items: CartItem[];
  add: (item: CartItem) => void;
  remove: (plateId: string) => void;
}>({ items: [], add: () => {}, remove: () => {} });

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const stored = localStorage.getItem("beta-art-cart");
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("beta-art-cart", JSON.stringify(items));
    } catch {
      /* ignore */
    }
  }, [items]);

  const add = (item: CartItem) => {
    setItems((prev) => (prev.some((i) => i.plateId === item.plateId) ? prev : [...prev, item]));
  };
  const remove = (plateId: string) => {
    setItems((prev) => prev.filter((i) => i.plateId !== plateId));
  };

  return <CartContext.Provider value={{ items, add, remove }}>{children}</CartContext.Provider>;
}

export function useCart() {
  return useContext(CartContext);
}
