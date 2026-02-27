import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import type { IMenuItem } from '../type';

interface MenuStore {
  menuItems: IMenuItem[] | null;
  setMenuItems: (menuItems: IMenuItem[]) => void;
  getMenuItemById: (id: string) => IMenuItem | undefined;
}

export const useMenuStore = create<MenuStore>()(
  persist(
    (set, get) => ({
      menuItems: null,
      setMenuItems: (menuItems) => set({ menuItems }),
      getMenuItemById: (id) => {
        const { menuItems } = get();
        return menuItems?.find((item) => item._id === id);
      },
    }),
    {
      name: 'menu-storage',
    },
  ),
);
