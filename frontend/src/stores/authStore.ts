import { create } from 'zustand';
import axios from 'axios';

type User = {
  _id: string;
  name: string;
  email: string;
  image: string;
  role: string;
};

export interface LocationData {
  latitude: number;
  longitude: number;
  formattedAddress: string;
}

type AuthState = {
  user: User | null;
  isAuth: boolean;
  isLoading: boolean;
  logout: () => void;
  fetchUser: () => Promise<void>;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuth: false,
  isLoading: true,

  logout: () => {
    localStorage.removeItem('token');
    set({
      user: null,
      isAuth: false,
      isLoading: false,
    });
  },

  // called on app start
  fetchUser: async () => {
    try {
      const token = localStorage.getItem('token');

      if (!token) {
        set({ isAuth: false, isLoading: false });
        return;
      }

      const res = await axios.get('http://localhost:5000/api/auth/me', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      set({
        user: res.data.user,
        isAuth: true,
        isLoading: false,
      });
    } catch {
      // token invalid or expired
      localStorage.removeItem('token');

      set({
        user: null,
        isAuth: false,
        isLoading: false,
      });
    }
  },
}));
