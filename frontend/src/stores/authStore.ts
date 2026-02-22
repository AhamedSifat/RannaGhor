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
  location: LocationData | null;
  getLocation: () => Promise<void>;
  city: string | null;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuth: false,
  isLoading: true,
  location: null,
  city: null,

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

  getLocation: async () => {
    if (!navigator.geolocation) {
      alert('Please Allow Location Access to use this app');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`,
          );

          const data = await res.json();

          const detectedCity =
            data.address?.city ||
            data.address?.town ||
            data.address?.village ||
            data.address?.state ||
            'Unknown City';

          set({
            location: {
              latitude,
              longitude,
              formattedAddress: data.display_name || 'Unknown Location',
            },
            city: detectedCity,
          });
        } catch (err) {
          console.error('Reverse geocoding failed:', err);
        }
      },
      (error) => {
        console.error('Location error:', error);
      },
    );
  },
}));
