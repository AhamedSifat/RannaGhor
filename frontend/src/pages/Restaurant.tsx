import { useEffect, useState } from 'react';
import type { IRestaurant } from '../type';
import axios from 'axios';
import { RESTAURANT_API_URL } from '../App';
import AddRestuarant from '../components/AddRestuarant';
import { FcRating, FcPhone, FcClock } from 'react-icons/fc';

export default function Restaurant() {
  const [restaurant, setRestaurant] = useState<IRestaurant | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchMyRestaurant = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `${RESTAURANT_API_URL}/api/restaurant/my`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        },
      );
      setRestaurant(data.restaurant);

      if (data.token) {
        localStorage.setItem('token', data.token);
      }
    } catch (error) {
      console.error('Error fetching restaurant:', error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyRestaurant();
  }, []);

  if (loading) {
    return (
      <div className='min-h-screen flex items-center justify-center bg-gray-50'>
        <div className='flex flex-col items-center gap-3'>
          <div className='w-10 h-10 border-4 border-rose-200 border-t-[#E23774] rounded-full animate-spin' />
          <span className='text-sm text-gray-500'>Loading...</span>
        </div>
      </div>
    );
  }

  if (!restaurant) {
    return <AddRestuarant />;
  }

  return (
    <div className='min-h-screen bg-gray-50 pb-20'>
      {/* Header Background */}
      <div className='h-48 bg-gradient-to-r from-[#E23774] to-rose-500' />

      <div className='max-w-4xl mx-auto px-4 -mt-24'>
        {/* Restaurant Card */}
        <div className='bg-white rounded-3xl shadow-lg overflow-hidden'>
          {/* Cover Image */}
          <div className='h-48 w-full bg-gray-200 relative'>
            <img
              src={restaurant.image || 'https://via.placeholder.com/800x300'}
              alt={restaurant.name}
              className='w-full h-full object-cover'
            />
            <div className='absolute inset-0 bg-gradient-to-t from-black/50 to-transparent' />
          </div>

          {/* Content */}
          <div className='p-6 -mt-12 relative'>
            {/* Logo/Avatar */}
            <div className='w-24 h-24 rounded-2xl bg-white p-1 shadow-lg mb-4'>
              <img
                src={restaurant.image || 'https://via.placeholder.com/96'}
                alt={restaurant.name}
                className='w-full h-full rounded-xl object-cover'
              />
            </div>

            <div className='flex items-start justify-between mb-4'>
              <div>
                <h1 className='text-2xl font-bold text-gray-900 mb-1'>
                  {restaurant.name}
                </h1>
                <p className='text-gray-500 text-sm'>
                  {restaurant.autoLocation.formattedAddress}
                </p>
              </div>
              <div className='flex items-center gap-1 bg-green-50 px-3 py-1 rounded-full'>
                <FcRating size={18} />
                <span className='font-semibold text-green-700 text-sm'>
                  4.5
                </span>
              </div>
            </div>

            <p className='text-gray-600 mb-6 leading-relaxed'>
              {restaurant.description}
            </p>

            {/* Info Grid */}
            <div className='grid grid-cols-2 gap-4 mb-6'>
              <div className='flex items-center gap-3 p-4 bg-gray-50 rounded-xl'>
                <div className='w-10 h-10 rounded-lg bg-white flex items-center justify-center shadow-sm'>
                  <FcPhone size={20} />
                </div>
                <div>
                  <p className='text-xs text-gray-500 uppercase font-medium'>
                    Phone
                  </p>
                  <p className='font-semibold text-gray-900'>
                    {restaurant.phone || 'N/A'}
                  </p>
                </div>
              </div>

              <div className='flex items-center gap-3 p-4 bg-gray-50 rounded-xl'>
                <div className='w-10 h-10 rounded-lg bg-white flex items-center justify-center shadow-sm'>
                  <FcClock size={20} />
                </div>
                <div>
                  <p className='text-xs text-gray-500 uppercase font-medium'>
                    Status
                  </p>
                  <p className='font-semibold text-green-600'>Open</p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className='flex gap-3'>
              <button className='flex-1 py-3 bg-[#E23774] text-white font-semibold rounded-xl hover:bg-[#c02667] transition-colors'>
                Edit Restaurant
              </button>
              <button className='flex-1 py-3 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 transition-colors'>
                View Menu
              </button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className='grid grid-cols-3 gap-4 mt-6'>
          <div className='bg-white p-4 rounded-2xl shadow-sm text-center'>
            <p className='text-2xl font-bold text-[#E23774]'>128</p>
            <p className='text-xs text-gray-500 mt-1'>Total Orders</p>
          </div>
          <div className='bg-white p-4 rounded-2xl shadow-sm text-center'>
            <p className='text-2xl font-bold text-[#E23774]'>₹45K</p>
            <p className='text-xs text-gray-500 mt-1'>Revenue</p>
          </div>
          <div className='bg-white p-4 rounded-2xl shadow-sm text-center'>
            <p className='text-2xl font-bold text-[#E23774]'>4.8</p>
            <p className='text-xs text-gray-500 mt-1'>Rating</p>
          </div>
        </div>
      </div>
    </div>
  );
}
