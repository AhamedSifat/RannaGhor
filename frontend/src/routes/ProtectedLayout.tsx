import { Navigate, Outlet, useLocation } from 'react-router';
import { useAuthStore } from '../stores/authStore';

export default function ProtectedLayout() {
  const { isAuth, user, isLoading } = useAuthStore();
  const location = useLocation();
  if (isLoading) {
    return (
      <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-rose-50 via-white to-pink-50'>
        <div className='flex flex-col items-center gap-4'>
          <div className='relative'>
            <div className='w-12 h-12 border-4 border-rose-200 border-t-[#E23774] rounded-full animate-spin' />
            <div
              className='absolute inset-0 w-12 h-12 border-4 border-transparent border-t-rose-300 rounded-full animate-spin'
              style={{
                animationDuration: '1.5s',
                animationDirection: 'reverse',
              }}
            />
          </div>
          <span className='text-sm font-medium text-gray-500 animate-pulse'>
            Loading...
          </span>
        </div>
      </div>
    );
  }
  if (!isAuth) return <Navigate to='/login' replace />;

  if (user?.role === null && location.pathname !== '/select-role') {
    return <Navigate to='/select-role' replace />;
  }

  if (user?.role !== null && location.pathname === '/select-role') {
    return <Navigate to='/' replace />;
  }

  return <Outlet />;
}
