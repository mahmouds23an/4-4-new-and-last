"use client";

// CartContext.js
// What this is: global cart state shared across the entire site.
// Persists to localStorage so the cart survives page refreshes.
// Once the backend is live, sync with POST /cart on every change.
//
// Usage anywhere:
//   const { items, addItem, removeItem, updateQty, total, count } = useCart();

import { createContext, useContext, useEffect, useMemo, useReducer } from "react";

const CartContext = createContext(null);

function reducer(state, action) {
  switch (action.type) {
    case "ADD": {
      const exists = state.find((i) => i.id === action.item.id);
      if (exists) {
        return state.map((i) =>
          i.id === action.item.id ? { ...i, qty: i.qty + (action.item.qty ?? 1) } : i
        );
      }
      return [...state, { ...action.item, qty: action.item.qty ?? 1 }];
    }
    case "REMOVE":
      return state.filter((i) => i.id !== action.id);
    case "UPDATE_QTY":
      return state
        .map((i) => (i.id === action.id ? { ...i, qty: action.qty } : i))
        .filter((i) => i.qty > 0);
    case "CLEAR":
      return [];
    case "HYDRATE":
      return action.items;
    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [items, dispatch] = useReducer(reducer, []);

  // Hydrate from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem("4x4-cart");
      if (saved) dispatch({ type: "HYDRATE", items: JSON.parse(saved) });
    } catch {}
  }, []);

  // Persist on every change
  useEffect(() => {
    try { localStorage.setItem("4x4-cart", JSON.stringify(items)); } catch {}
  }, [items]);

  const value = useMemo(() => ({
    items,
    count: items.reduce((s, i) => s + i.qty, 0),
    total: items.reduce((s, i) => s + i.price * i.qty, 0),
    addItem:    (item) => dispatch({ type: "ADD",        item }),
    removeItem: (id)   => dispatch({ type: "REMOVE",     id }),
    updateQty:  (id, qty) => dispatch({ type: "UPDATE_QTY", id, qty }),
    clearCart:  ()     => dispatch({ type: "CLEAR" }),
  }), [items]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
