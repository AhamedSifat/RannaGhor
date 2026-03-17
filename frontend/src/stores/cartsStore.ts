import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import axios from 'axios';
import type { ICart } from '../type';
import { useAuthStore } from './authStore';

type CartState = {
  carts: ICart[] | null;
  isCartLoading: boolean;
  cartLength: number;
  subTotal: number;
  fetchCarts: () => Promise<void>;
  clearCarts: () => void;
};

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      carts: null,
      isCartLoading: false,
      cartLength: 0,
      subTotal: 0,

      fetchCarts: async () => {
        const user = useAuthStore.getState().user;

        if (!user) return;

        if (user.role !== 'customer') {
          set({
            carts: null,
            isCartLoading: false,
            cartLength: 0,
            subTotal: 0,
          });
          return;
        }

        try {
          set({ isCartLoading: true });
          const token = localStorage.getItem('token');

          if (!token) {
            set({ carts: null, isCartLoading: false });
            return;
          }

          const res = await axios.get('http://localhost:5001/api/cart/all', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          set({
            carts: res.data.carts,
            subTotal: res.data.subTotal,
            cartLength: res.data.cartLength,
            isCartLoading: false,
          });
        } catch (error) {
          console.error('Failed to fetch carts:', error);
          set({
            carts: null,
            cartLength: 0,
            subTotal: 0,
            isCartLoading: false,
          });
        }
      },

      clearCarts: () => {
        set({
          carts: null,
          cartLength: 0,
          subTotal: 0,
        });
      },
    }),
    {
      name: 'cart-storage',
    },
  ),
);
