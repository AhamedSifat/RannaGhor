import { Navigate, Outlet, useLocation } from 'react-router';
import { useAuthStore } from '../stores/authStore';

export default function ProtectedLayout() {
  const { isAuth, user } = useAuthStore();
  const location = useLocation();

  const isEditing = location.pathname.includes('/edit');
  const isManagingMenu = location.pathname.includes('/menu');
  const isSellerDashboard = location.pathname === '/restaurant';

  if (
    user?.role !== 'seller' &&
    (isEditing || isManagingMenu || isSellerDashboard)
  ) {
    return <Navigate to='/' replace />;
  }

  if (user?.role === 'seller' && location.pathname === '/') {
    return <Navigate to='/restaurant' replace />;
  }

  if (!isAuth) return <Navigate to='/login' replace />;

  //  If role not selected
  if (user?.role === null && location.pathname !== '/select-role') {
    return <Navigate to='/select-role' replace />;
  }

  //  If role already selected, block select-role page
  if (user?.role !== null && location.pathname === '/select-role') {
    return <Navigate to='/' replace />;
  }

  return <Outlet />;
}
