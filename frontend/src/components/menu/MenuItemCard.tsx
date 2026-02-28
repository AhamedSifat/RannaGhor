import { useState } from 'react';
import toast from 'react-hot-toast';
import {
  deleteMenuItem,
  toogleMenuItemAvailability,
} from '../../services/menuApi';
import { FcCheckmark, FcCancel } from 'react-icons/fc';
import { MdEdit } from 'react-icons/md';
import AddMenuModal from './AddMenuModal';
import { useParams } from 'react-router';
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
  index: number;
}

export default function MenuItemCard({ item, onUpdate, index }: Props) {
  const { id } = useParams<{ id: string }>();

  const [isAvailable, setIsAvailable] = useState(item.isAvailable);
  const [loading, setLoading] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleAvailability = async () => {
    setLoading(true);
    try {
      await toogleMenuItemAvailability(item._id);
      setIsAvailable(!isAvailable);
      toast.success(
        !isAvailable ? 'Item is now available' : 'Item marked unavailable',
      );
      onUpdate();
    } catch {
      toast.error('Failed to update status');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm('Delete this item?')) return;
    try {
      const res = await deleteMenuItem(item._id);
      if (!res.success) {
        toast.error(res.error || 'Failed to delete');
        return;
      }
      toast.success('Item deleted');
      onUpdate();
    } catch {
      toast.error('Failed to delete item');
    }
  };

  return (
    <>
      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`group relative bg-white rounded-3xl overflow-hidden transition-all duration-300 ${
          isAvailable
            ? 'shadow-sm hover:shadow-xl hover:shadow-rose-100/50 hover:-translate-y-1'
            : 'shadow-none opacity-60 grayscale'
        }`}
        style={{ animationDelay: `${index * 50}ms` }}
      >
        {/* Image Section */}
        <div className='relative aspect-[4/3] overflow-hidden'>
          <img
            src={item.image || 'https://via.placeholder.com/400'}
            alt={item.name}
            className='w-full h-full object-cover transition-transform duration-500 group-hover:scale-110'
          />

          {/* Gradient Overlay */}
          <div className='absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300' />

          {/* Price Tag */}
          <div className='absolute top-3 right-3 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-lg'>
            <span className='font-bold text-[#E23774]'>${item.price}</span>
          </div>

          {/* Availability Badge */}
          <div
            className={`absolute top-3 left-3 px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 ${
              isAvailable ? 'bg-green-500 text-white' : 'bg-gray-500 text-white'
            }`}
          >
            {isAvailable ? (
              <FcCheckmark size={12} className='text-white' />
            ) : (
              <FcCancel size={12} />
            )}
            {isAvailable ? 'Available' : 'Unavailable'}
          </div>

          {/* Hover Actions */}
          <div
            className={`absolute bottom-3 left-3 right-3 flex gap-2 transition-all duration-300 ${
              isHovered
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-4'
            }`}
          >
            <button
              onClick={toggleAvailability}
              disabled={loading}
              className={`flex-1 py-2.5 rounded-xl font-semibold text-sm transition-colors ${
                isAvailable
                  ? 'bg-white/90 text-gray-700 hover:bg-white'
                  : 'bg-green-500 text-white hover:bg-green-600'
              }`}
            >
              {loading
                ? '...'
                : isAvailable
                  ? 'Mark Unavailable'
                  : 'Mark Available'}
            </button>
          </div>
        </div>

        {/* Content Section */}
        <div className='p-5'>
          <h3 className='font-bold text-lg text-gray-900 mb-2 line-clamp-1 group-hover:text-[#E23774] transition-colors'>
            {item.name}
          </h3>
          <p className='text-sm text-gray-500 line-clamp-2 leading-relaxed'>
            {item.description}
          </p>

          {/* Bottom Actions */}
          <div className='flex items-center justify-between mt-4 pt-4 border-t border-gray-100'>
            <button
              onClick={toggleAvailability}
              disabled={loading}
              className={`text-xs font-semibold px-4 py-2 rounded-full transition-all ${
                isAvailable
                  ? 'bg-green-50 text-green-700 hover:bg-green-100'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {isAvailable ? 'Active' : 'Inactive'}
            </button>

            <div className='flex items-center gap-2'>
              {/* EDIT BUTTON */}
              <button
                onClick={() => {
                  setEditMode(true);
                  setIsModalOpen(true);
                }}
                className='p-2 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-full transition-all'
              >
                <MdEdit size={20} />
              </button>

              {/* DELETE BUTTON */}
              <button
                onClick={handleDelete}
                className='p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-all'
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

        {/* Edit Modal */}
      </div>

      <AddMenuModal
        isOpen={isModalOpen}
        key={`${item._id}-${isModalOpen}`}
        onClose={() => setIsModalOpen(false)}
        restaurantId={id || ''}
        editMode={editMode}
        menuItemId={item._id}
      />
    </>
  );
}
