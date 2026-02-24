import { FcPhone, FcClock } from 'react-icons/fc';

interface Props {
  phone?: string;
}

export default function RestaurantContact({ phone }: Props) {
  return (
    <div className='space-y-3'>
      <h3 className='font-bold text-gray-900 mb-3 flex items-center gap-2'>
        <FcPhone size={18} />
        Contact Information
      </h3>

      <div className='flex items-center gap-3 p-3 bg-white rounded-xl shadow-sm'>
        <div className='w-10 h-10 rounded-lg bg-rose-50 flex items-center justify-center'>
          <FcPhone size={18} />
        </div>
        <div>
          <p className='text-xs text-gray-500'>Phone</p>
          <p className='font-semibold text-gray-900'>{phone || 'N/A'}</p>
        </div>
      </div>

      <div className='flex items-center gap-3 p-3 bg-white rounded-xl shadow-sm'>
        <div className='w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center'>
          <FcClock size={18} />
        </div>
        <div>
          <p className='text-xs text-gray-500'>Hours</p>
          <p className='font-semibold text-gray-900'>24/7 Delivery</p>
        </div>
      </div>
    </div>
  );
}
