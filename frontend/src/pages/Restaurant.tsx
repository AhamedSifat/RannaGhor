import { useEffect, useState } from 'react';
import type { IRestaurant } from '../type';
import axios from 'axios';
import { RESTAURANT_API_URL } from '../App';
import AddRestuarant from '../components/AddRestuarant';
import {
  FcRating,
  FcPhone,
  FcClock,
  FcShop,
  FcEditImage,
  FcList,
} from 'react-icons/fc';

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
      {/* Compact Hero Section */}
      <div className='relative h-64 md:h-80'>
        <img
          src={restaurant.image || 'https://via.placeholder.com/1200x400'}
          alt={restaurant.name}
          className='w-full h-full object-cover'
        />
        <div className='absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent' />

        {/* Floating Content */}
        <div className='absolute bottom-0 left-0 right-0 p-4 md:p-6'>
          <div className='max-w-4xl mx-auto flex items-end gap-4'>
            {/* Avatar - Overlapping */}
            <div className='w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-white p-1 shadow-2xl -mb-8'>
              <img
                src={restaurant.image || 'https://via.placeholder.com/96'}
                alt={restaurant.name}
                className='w-full h-full rounded-xl object-cover'
              />
            </div>

            <div className='flex-1 pb-2'>
              <div className='flex items-center gap-2 mb-1'>
                <span className='px-2 py-0.5 bg-green-500 text-white text-xs font-bold rounded-full'>
                  OPEN
                </span>
                <div className='flex items-center gap-1 bg-white/20 backdrop-blur-sm px-2 py-0.5 rounded-full'>
                  <FcRating size={14} />
                  <span className='text-white text-xs font-bold'>4.5</span>
                </div>
              </div>
              <h1 className='text-2xl md:text-3xl font-bold text-white'>
                {restaurant.name}
              </h1>
            </div>
          </div>
        </div>
      </div>

      <div className='max-w-4xl mx-auto px-4 pt-12'>
        {/* Info Cards Row */}
        <div className='grid grid-cols-2 md:grid-cols-4 gap-3 mb-6'>
          <div className='bg-white p-4 rounded-2xl shadow-sm border border-gray-100'>
            <div className='w-10 h-10 rounded-xl bg-rose-50 flex items-center justify-center mb-2'>
              <FcList size={20} />
            </div>
            <p className='text-2xl font-bold text-gray-900'>128</p>
            <p className='text-xs text-gray-500'>Orders</p>
          </div>

          <div className='bg-white p-4 rounded-2xl shadow-sm border border-gray-100'>
            <div className='w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center mb-2'>
              <span className='text-green-600 font-bold'>₹</span>
            </div>
            <p className='text-2xl font-bold text-gray-900'>45K</p>
            <p className='text-xs text-gray-500'>Revenue</p>
          </div>

          <div className='bg-white p-4 rounded-2xl shadow-sm border border-gray-100'>
            <div className='w-10 h-10 rounded-xl bg-yellow-50 flex items-center justify-center mb-2'>
              <FcRating size={20} />
            </div>
            <p className='text-2xl font-bold text-gray-900'>4.8</p>
            <p className='text-xs text-gray-500'>Rating</p>
          </div>

          <div className='bg-white p-4 rounded-2xl shadow-sm border border-gray-100'>
            <div className='w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center mb-2'>
              <FcClock size={20} />
            </div>
            <p className='text-2xl font-bold text-gray-900'>24h</p>
            <p className='text-xs text-gray-500'>Delivery</p>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className='grid md:grid-cols-3 gap-6'>
          {/* Left Column - Info */}
          <div className='md:col-span-2 space-y-4'>
            {/* About Card */}
            <div className='bg-white rounded-2xl shadow-sm border border-gray-100 p-6'>
              <h3 className='font-bold text-gray-900 mb-3 flex items-center gap-2'>
                <FcShop size={20} />
                About
              </h3>
              <p className='text-gray-600 leading-relaxed'>
                {restaurant.description || 'No description available.'}
              </p>
            </div>

            {/* Contact Card */}
            <div className='bg-white rounded-2xl shadow-sm border border-gray-100 p-6'>
              <h3 className='font-bold text-gray-900 mb-4 flex items-center gap-2'>
                <FcPhone size={20} />
                Contact Info
              </h3>
              <div className='space-y-3'>
                <div className='flex items-center gap-3 p-3 bg-gray-50 rounded-xl'>
                  <div className='w-10 h-10 rounded-lg bg-white flex items-center justify-center shadow-sm'>
                    <FcPhone size={18} />
                  </div>
                  <div>
                    <p className='text-xs text-gray-500'>Phone</p>
                    <p className='font-semibold text-gray-900'>
                      {restaurant.phone || 'N/A'}
                    </p>
                  </div>
                </div>
                <div className='flex items-center gap-3 p-3 bg-gray-50 rounded-xl'>
                  <div className='w-10 h-10 rounded-lg bg-white flex items-center justify-center shadow-sm'>
                    <span className='text-lg'>📍</span>
                  </div>
                  <div>
                    <p className='text-xs text-gray-500'>Address</p>
                    <p className='font-semibold text-gray-900 text-sm'>
                      {restaurant.autoLocation?.formattedAddress || 'N/A'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Actions */}
          <div className='space-y-4'>
            <div className='bg-white rounded-2xl shadow-sm border border-gray-100 p-6'>
              <h3 className='font-bold text-gray-900 mb-4'>Quick Actions</h3>
              <div className='space-y-3'>
                <button className='w-full flex items-center gap-3 p-4 bg-gradient-to-r from-[#E23774] to-rose-500 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-rose-200 transition-all'>
                  <FcEditImage size={20} className='text-white' />
                  Edit Restaurant
                </button>
                <button className='w-full flex items-center gap-3 p-4 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-all'>
                  <FcList size={20} />
                  Manage Menu
                </button>
              </div>
            </div>

            {/* Status Card */}
            <div className='bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl shadow-lg p-6 text-white'>
              <div className='flex items-center gap-2 mb-2'>
                <div className='w-2 h-2 bg-white rounded-full animate-pulse' />
                <span className='text-sm font-medium opacity-90'>
                  Live Status
                </span>
              </div>
              <p className='text-2xl font-bold'>Open for orders</p>
              <p className='text-sm opacity-80 mt-1'>Receiving new orders</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
