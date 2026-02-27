import { useState } from 'react';

import toast from 'react-hot-toast';
import {
  deleteMenuItem,
  toogleMenuItemAvailability,
} from '../../services/menuApi';

interface Props {
  item: {
    _id: string;
    name: string;
    description: string;
    price: number;
    image: string;
    isAvailable: boolean;
  };
  onUpdate: () => void;
}

export default function MenuItemCard({ item, onUpdate }: Props) {
  const [isAvailable, setIsAvailable] = useState(item.isAvailable);
  const [loading, setLoading] = useState(false);

  const toggleAvailability = async () => {
    setLoading(true);
    try {
      await toogleMenuItemAvailability(item._id);
      setIsAvailable(!isAvailable);
      toast.success(`Item ${!isAvailable ? 'available' : 'unavailable'}`);
      onUpdate();
    } catch {
      toast.error('Failed to update status');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this item?')) return;

    try {
      const res = await deleteMenuItem(item._id);
      if (!res.success) {
        toast.error(res.error || 'Failed to delete item');
        return;
      }

      toast.success('Item deleted');
      onUpdate();
    } catch {
      toast.error('Failed to delete item');
    }
  };

  return (
    <div
      className={`bg-white rounded-2xl shadow-sm border overflow-hidden transition-all ${isAvailable ? 'border-gray-100' : 'border-gray-200 opacity-75'}`}
    >
      <div className='flex'>
        <div className='w-32 h-32 flex-shrink-0'>
          <img
            src={item.image || 'https://via.placeholder.com/128'}
            alt={item.name}
            className='w-full h-full object-cover'
          />
        </div>

        <div className='flex-1 p-4 flex flex-col justify-between'>
          <div>
            <div className='flex items-start justify-between'>
              <h3 className='font-bold text-gray-900 line-clamp-1'>
                {item.name}
              </h3>
              <span className='font-bold text-[#E23774]'>₹{item.price}</span>
            </div>
            <p className='text-sm text-gray-500 mt-1 line-clamp-2'>
              {item.description}
            </p>
          </div>

          <div className='flex items-center justify-between mt-3'>
            <button
              onClick={toggleAvailability}
              disabled={loading}
              className={`text-xs font-semibold px-3 py-1.5 rounded-full transition-colors ${
                isAvailable
                  ? 'bg-green-100 text-green-700'
                  : 'bg-gray-100 text-gray-600'
              }`}
            >
              {loading ? '...' : isAvailable ? 'Available' : 'Unavailable'}
            </button>

            <button
              onClick={handleDelete}
              className='text-red-500 hover:bg-red-50 p-2 rounded-full transition-colors'
            >
              <svg
                className='w-5 h-5'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16'
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
