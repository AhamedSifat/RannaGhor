import { FcShop, FcEditImage, FcList } from 'react-icons/fc';
import { Link } from 'react-router-dom';

export default function RestaurantActions({ id }: { id: string }) {
  return (
    <div>
      <h3 className='font-bold text-gray-900 mb-3 flex items-center gap-2'>
        <FcShop size={18} />
        Management
      </h3>
      <div className='space-y-3'>
        <Link
          to={`/restaurant/edit/${id}`}
          className='w-full flex items-center justify-center gap-2 p-3 bg-[#E23774] text-white rounded-xl font-semibold hover:bg-[#c02667] transition-colors shadow-md shadow-rose-200'
        >
          <FcEditImage size={18} className='text-white' />
          Edit Restaurant
        </Link>
        <button className='w-full flex items-center justify-center gap-2 p-3 bg-white text-gray-700 border-2 border-gray-200 rounded-xl font-semibold hover:border-[#E23774] hover:text-[#E23774] transition-colors'>
          <FcList size={18} />
          Manage Menu
        </button>
      </div>
    </div>
  );
}
