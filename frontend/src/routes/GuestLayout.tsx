import { Navigate, Outlet } from 'react-router';
import { useAuthStore } from '../stores/authStore';

export default function GuestLayout() {
  const { isAuth, isLoading } = useAuthStore();

  if (isLoading) return null;

  if (isAuth) return <Navigate to='/' replace />;

  return <Outlet />;
}
