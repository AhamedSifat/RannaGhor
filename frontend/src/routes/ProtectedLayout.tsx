import { Navigate, Outlet } from 'react-router';
import { useAuthStore } from '../stores/authStore';

export default function ProtectedLayout() {
  const { isAuth, isLoading } = useAuthStore();

  if (isLoading) return <div>Loading...</div>;

  if (!isAuth) return <Navigate to='/login' replace />;

  return <Outlet />;
}
