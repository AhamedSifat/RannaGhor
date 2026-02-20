import { useState } from 'react';
import { useNavigate } from 'react-router';
import axios from 'axios';
import toast from 'react-hot-toast';
import { FcGoogle, FcBusinessman, FcShipped, FcShop } from 'react-icons/fc';
import { useAuthStore } from '../stores/authStore';

const roles = [
  {
    id: 'customer',
    label: 'Customer',
    description: 'Order food from your favorite restaurants',
    icon: FcBusinessman,
    color: 'from-blue-500 to-cyan-400',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200',
    hoverBorder: 'hover:border-blue-400',
  },
  {
    id: 'rider',
    label: 'Delivery Partner',
    description: 'Deliver orders and earn money',
    icon: FcShipped,
    color: 'from-orange-500 to-amber-400',
    bgColor: 'bg-orange-50',
    borderColor: 'border-orange-200',
    hoverBorder: 'hover:border-orange-400',
  },
  {
    id: 'seller',
    label: 'Restaurant Owner',
    description: 'Manage your restaurant and orders',
    icon: FcShop,
    color: 'from-emerald-500 to-teal-400',
    bgColor: 'bg-emerald-50',
    borderColor: 'border-emerald-200',
    hoverBorder: 'hover:border-emerald-400',
  },
];

const SelectRole = () => {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!selectedRole) {
      toast.error('Please select a role to continue');
      return;
    }

    setIsSubmitting(true);

    try {
      const token = localStorage.getItem('token');
      const { data } = await axios.put(
        'http://localhost:5000/api/auth/add/role',
        { role: selectedRole },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      localStorage.setItem('token', data.token);
      toast.success('Role selected successfully!');
      useAuthStore.setState({
        user: data.user,
        isAuth: true,
        isLoading: false,
      });

      navigate('/');
    } catch (error) {
      toast.error(
        axios.isAxiosError(error)
          ? error.response?.data?.message || 'Failed to save role'
          : 'Something went wrong',
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-rose-50 via-white to-pink-50 px-6 py-12'>
      <div className='w-full max-w-2xl'>
        <div className='bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl shadow-rose-100/50 p-8 md:p-12 border border-white/50'>
          {/* Header */}
          <div className='text-center space-y-3 mb-10'>
            <div className='flex justify-center mb-4'>
              <div className='w-14 h-14 bg-gradient-to-tr from-[#E23774] to-rose-400 rounded-2xl flex items-center justify-center shadow-lg shadow-rose-200'>
                <FcGoogle size={28} />
              </div>
            </div>
            <h1 className='text-2xl md:text-3xl font-bold text-gray-900'>
              Choose your role
            </h1>
            <p className='text-gray-500 max-w-md mx-auto'>
              Select how you want to use RannaKhor. You can change this later in
              settings.
            </p>
          </div>

          {/* Role Cards */}
          <div className='grid gap-4 mb-10'>
            {roles.map((role) => {
              const Icon = role.icon;
              const isSelected = selectedRole === role.id;

              return (
                <button
                  key={role.id}
                  onClick={() => setSelectedRole(role.id)}
                  className={`relative flex items-center gap-4 p-5 rounded-2xl border-2 text-left transition-all duration-200 group
                    ${
                      isSelected
                        ? `${role.bgColor} ${role.borderColor} shadow-md`
                        : 'bg-white border-gray-100 hover:border-gray-200 hover:shadow-sm'
                    }
                    ${role.hoverBorder}
                  `}
                >
                  {/* Selection Indicator */}
                  <div
                    className={`absolute right-5 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-200
                    ${
                      isSelected
                        ? `bg-gradient-to-r ${role.color} border-transparent`
                        : 'border-gray-300 bg-white'
                    }
                  `}
                  >
                    {isSelected && (
                      <svg
                        className='w-3.5 h-3.5 text-white'
                        fill='none'
                        viewBox='0 0 24 24'
                        stroke='currentColor'
                        strokeWidth={3}
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          d='M5 13l4 4L19 7'
                        />
                      </svg>
                    )}
                  </div>

                  {/* Icon */}
                  <div
                    className={`flex-shrink-0 w-14 h-14 rounded-xl bg-gradient-to-br ${role.color} flex items-center justify-center shadow-lg`}
                  >
                    <Icon size={32} className='text-white' />
                  </div>

                  {/* Content */}
                  <div className='flex-1 pr-8'>
                    <h3
                      className={`font-bold text-lg mb-1 transition-colors duration-200
                      ${isSelected ? 'text-gray-900' : 'text-gray-700 group-hover:text-gray-900'}
                    `}
                    >
                      {role.label}
                    </h3>
                    <p className='text-sm text-gray-500 leading-relaxed'>
                      {role.description}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            disabled={isSubmitting || !selectedRole}
            className='w-full py-4 rounded-xl bg-gradient-to-r from-[#E23774] to-rose-500 text-white font-semibold text-lg shadow-lg shadow-rose-200 hover:shadow-xl hover:shadow-rose-300 hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-lg disabled:hover:translate-y-0 transition-all duration-200 flex items-center justify-center gap-2'
          >
            {isSubmitting ? (
              <>
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
                Saving...
              </>
            ) : (
              'Continue'
            )}
          </button>

          {/* Skip Option */}
          <button
            onClick={() => navigate('/')}
            className='w-full mt-4 py-3 text-sm font-medium text-gray-400 hover:text-gray-600 transition-colors duration-200'
          >
            Skip for now
          </button>
        </div>
      </div>
    </div>
  );
};

export default SelectRole;
