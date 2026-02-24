import { FcRating } from 'react-icons/fc';

interface Props {
  name: string;
  address?: string;
  description?: string;
}

export default function RestaurantInfo({ name, address, description }: Props) {
  return (
    <div>
      <div className='flex items-center gap-2 mb-2'>
        <span className='px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full'>
          OPEN
        </span>
        <div className='flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded-full'>
          <FcRating size={14} />
          <span className='text-yellow-700 text-xs font-bold'>4.5</span>
        </div>
      </div>

      <h1 className='text-3xl font-bold text-gray-900 mb-2'>{name}</h1>
      <p className='text-gray-500 mb-4'>{address}</p>
      <p className='text-gray-600 leading-relaxed'>
        {description || 'No description available.'}
      </p>
    </div>
  );
}
