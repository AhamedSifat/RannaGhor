import { BrowserRouter, Routes, Route } from 'react-router';
import { useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import ProtectedLayout from './routes/ProtectedLayout';
import GuestLayout from './routes/GuestLayout';
import Home from './pages/Home';
import Login from './pages/Login';
import { useAuthStore } from './stores/authStore';
import SelectRole from './pages/SelectRole';
import Navbar from './components/Navbar';
import Profile from './pages/Profile';
import Restaurant from './pages/Restaurant';
import RestaurantEdit from './pages/RestaurentEdit';
import MenuManagement from './pages/MenuManagement';
import { useCartStore } from './stores/cartsStore';
export const RESTAURANT_API_URL = 'http://localhost:5001';

export default function App() {
  const fetchUser = useAuthStore((state) => state.fetchUser);
  const user = useAuthStore((state) => state.user);
  const getLocation = useAuthStore((state) => state.getLocation);
  const fetchCarts = useCartStore((state) => state.fetchCarts);

  useEffect(() => {
    fetchUser();
    getLocation();
  }, []);

  useEffect(() => {
    if (user && user.role == 'customer') {
      fetchCarts();
    }
  }, [fetchCarts, user]);

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        {/* PRIVATE ROUTES */}
        <Route element={<ProtectedLayout />}>
          <Route path='/' element={<Home />} />
          <Route path='/restaurant' element={<Restaurant />} />
          <Route path='/restaurant/edit/:id' element={<RestaurantEdit />} />
          <Route path='/restaurant/:id/menu' element={<MenuManagement />} />

          <Route path='/select-role' element={<SelectRole />} />
          <Route path='/profile' element={<Profile />} />
        </Route>

        {/* PUBLIC ROUTES */}
        <Route element={<GuestLayout />}>
          <Route path='/login' element={<Login />} />
        </Route>
      </Routes>
      <Toaster />
    </BrowserRouter>
  );
}
