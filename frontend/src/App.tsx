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

export default function App() {
  const fetchUser = useAuthStore((state) => state.fetchUser);

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        {/* PRIVATE ROUTES */}
        <Route element={<ProtectedLayout />}>
          <Route path='/' element={<Home />} />
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
