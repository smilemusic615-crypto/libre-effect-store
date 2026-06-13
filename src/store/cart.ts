'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartItem {
  productId: string;
  productName: string;
  productLatin: string;
  price: number;
  material: string;
  size: string;
  qty: number;
}

interface CartState {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  updateQty: (productId: string, material: string, size: string, qty: number) => void;
  removeItem: (productId: string, material: string, size: string) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      addItem: (newItem) =>
        set((state) => {
          const existing = state.items.find(
            (i) => i.productId === newItem.productId && i.material === newItem.material && i.size === newItem.size
          );
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.productId === newItem.productId && i.material === newItem.material && i.size === newItem.size
                  ? { ...i, qty: i.qty + newItem.qty }
                  : i
              ),
            };
          }
          return { items: [...state.items, newItem] };
        }),
      updateQty: (productId, material, size, qty) =>
        set((state) => ({
          items: state.items.map((i) =>
            i.productId === productId && i.material === material && i.size === size
              ? { ...i, qty: Math.max(1, qty) }
              : i
          ),
        })),
      removeItem: (productId, material, size) =>
        set((state) => ({
          items: state.items.filter(
            (i) => !(i.productId === productId && i.material === material && i.size === size)
          ),
        })),
      clearCart: () => set({ items: [] }),
    }),
    { name: 'libre-cart' }
  )
);

export function calcTotals(items: CartItem[]) {
  const subtotal = items.reduce((sum, i) => sum + i.price * i.qty, 0);
  const shipping = subtotal >= 11000 ? 0 : 880;
  const tax = Math.round(subtotal - subtotal / 1.1);
  const total = subtotal + shipping;
  const shipProgress = Math.min(100, Math.round((subtotal / 11000) * 100));
  return { subtotal, shipping, tax, total, shipProgress };
}
