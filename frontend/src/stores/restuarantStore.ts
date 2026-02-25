import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import type { IRestaurant } from '../type';

interface RestaurantStore {
  restaurant: IRestaurant | null;
  setRestaurant: (restaurant: IRestaurant) => void;
}

export const useRestaurantStore = create<RestaurantStore>()(
  persist(
    (set) => ({
      restaurant: null,
      setRestaurant: (restaurant) => set({ restaurant }),
    }),
    {
      name: 'restaurant-storage',
    },
  ),
);
