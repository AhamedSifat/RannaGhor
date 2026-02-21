import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { useAuthStore } from '../stores/authStore';
import {
  FcBusinessman,
  FcShipped,
  FcShop,
  FcAddressBook,
  FcList,
  FcImport,
} from 'react-icons/fc';
import toast from 'react-hot-toast';

const roleConfig = {
  customer: {
    icon: FcBusinessman,
    label: 'Customer',
    color: 'bg-blue-50 text-blue-700 border-blue-200',
  },
  rider: {
    icon: FcShipped,
    label: 'Delivery Partner',
    color: 'bg-orange-50 text-orange-700 border-orange-200',
  },
  seller: {
    icon: FcShop,
    label: 'Restaurant Owner',
    color: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  },
};

const menuItems = [
  {
    id: 'orders',
    label: 'My Orders',
    icon: FcList,
    path: '/orders',
    description: 'View your order history',
  },
  {
    id: 'address',
    label: 'Addresses',
    icon: FcAddressBook,
    path: '/address',
    description: 'Manage delivery addresses',
  },
];

export default function Profile() {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await logout();
      toast.success('Logged out successfully');
      navigate('/login');
    } catch {
      toast.error('Failed to logout');
    } finally {
      setIsLoggingOut(false);
    }
  };

  const currentRole =
    roleConfig[user?.role as keyof typeof roleConfig] || roleConfig.customer;
  const RoleIcon = currentRole.icon;

  return (
    <div className='min-h-screen bg-gray-50 pb-20'>
      {/* Header Background - Clean gradient */}
      <div className='h-40 bg-gradient-to-r from-[#E23774] to-rose-500' />

      <div className='max-w-2xl mx-auto px-4 -mt-20'>
        {/* Profile Card */}
        <div className='bg-white rounded-3xl shadow-lg p-8 mb-4'>
          <div className='flex flex-col items-center text-center'>
            {/* Avatar */}
            <div className='relative mb-4'>
              <div className='w-28 h-28 rounded-full p-1.5 bg-white shadow-xl'>
                <img
                  src={user?.image || 'https://via.placeholder.com/112'}
                  alt={user?.name}
                  className='w-full h-full rounded-full object-cover'
                />
              </div>
              <div
                className={`absolute -bottom-1 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-xs font-semibold border-2 border-white shadow-sm ${currentRole.color}`}
              >
                {currentRole.label}
              </div>
            </div>

            {/* User Info */}
            <h1 className='text-2xl font-bold text-gray-900 mb-1'>
              {user?.name}
            </h1>
            <p className='text-gray-500 text-sm mb-6'>{user?.email}</p>

            {/* Role Badge */}
            <div
              className={`flex items-center gap-2 px-4 py-2 rounded-full ${currentRole.color} bg-opacity-30`}
            >
              <RoleIcon size={18} />
              <span className='font-semibold text-sm'>{currentRole.label}</span>
            </div>
          </div>
        </div>

        {/* Menu Items */}
        <div className='space-y-3 mb-4'>
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.id}
                to={item.path}
                className='flex items-center gap-4 p-4 bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-200 group'
              >
                <div className='w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center group-hover:bg-rose-50 transition-colors'>
                  <Icon size={24} />
                </div>
                <div className='flex-1'>
                  <h3 className='font-semibold text-gray-900 group-hover:text-[#E23774] transition-colors'>
                    {item.label}
                  </h3>
                  <p className='text-sm text-gray-500'>{item.description}</p>
                </div>
                <svg
                  className='w-5 h-5 text-gray-400'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M9 5l7 7-7 7'
                  />
                </svg>
              </Link>
            );
          })}
        </div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          disabled={isLoggingOut}
          className='w-full flex items-center justify-center gap-2 p-4 bg-white rounded-2xl shadow-sm text-red-500 font-semibold hover:bg-red-50 hover:shadow-md transition-all duration-200 disabled:opacity-50'
        >
          {isLoggingOut ? (
            <svg
              className='animate-spin h-5 w-5'
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
            >
              <circle
                className='opacity-25'
                cx='12'
                cy='12'
                r='10'
                stroke='currentColor'
                strokeWidth='4'
              ></circle>
              <path
                className='opacity-75'
                fill='currentColor'
                d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
              ></path>
            </svg>
          ) : (
            <FcImport size={22} className='text-red-500 rotate-90' />
          )}
          {isLoggingOut ? 'Logging out...' : 'Logout'}
        </button>
      </div>
    </div>
  );
}
