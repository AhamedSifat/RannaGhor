import { FcShop, FcPhoneAndroid, FcGlobe } from 'react-icons/fc';

interface Props {
  name: string;
  setName: (value: string) => void;
  description: string;
  setDescription: (value: string) => void;
  phone: string;
  setPhone: (value: string) => void;
  location: { formattedAddress: string } | null;
}

export default function RestaurantForm({
  name,
  setName,
  description,
  setDescription,
  phone,
  setPhone,
  location,
}: Props) {
  return (
    <div className='space-y-5'>
      <div>
        <label className='block text-sm font-semibold text-gray-700 mb-2'>
          Restaurant Name *
        </label>
        <div className='relative'>
          <FcShop
            className='absolute left-4 top-1/2 -translate-y-1/2 text-gray-400'
            size={20}
          />
          <input
            type='text'
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder='Enter restaurant name'
            className='w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#E23774] focus:ring-2 focus:ring-rose-100 transition-all'
          />
        </div>
      </div>

      <div>
        <label className='block text-sm font-semibold text-gray-700 mb-2'>
          Description
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder='Tell customers about your restaurant'
          rows={3}
          className='w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#E23774] focus:ring-2 focus:ring-rose-100 transition-all resize-none'
        />
      </div>

      <div>
        <label className='block text-sm font-semibold text-gray-700 mb-2'>
          Phone Number
        </label>
        <div className='relative'>
          <FcPhoneAndroid
            className='absolute left-4 top-1/2 -translate-y-1/2 text-gray-400'
            size={20}
          />
          <input
            type='tel'
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder='Enter phone number'
            className='w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#E23774] focus:ring-2 focus:ring-rose-100 transition-all'
          />
        </div>
      </div>

      <div>
        <label className='block text-sm font-semibold text-gray-700 mb-2'>
          Location
        </label>
        <div className='relative'>
          <FcGlobe
            className='absolute left-4 top-1/2 -translate-y-1/2 text-gray-400'
            size={20}
          />
          <input
            type='text'
            value={location?.formattedAddress || 'Detecting location...'}
            disabled
            className='w-full pl-12 pr-4 py-3 bg-gray-100 border border-gray-200 rounded-xl text-gray-600'
          />
        </div>
        {!location && (
          <p className='text-xs text-red-500 mt-1'>
            Please enable location access
          </p>
        )}
      </div>
    </div>
  );
}
