import { useState } from 'react';
import { useMenuItems } from '../hooks/useMenuItems';
import LoadingSpinner from '../components/restaurant/LoadingSpinner';
import MenuItemCard from '../components/menu/MenuItemCard';
import AddMenuModal from '../components/menu/AddMenuModal';
import EmptyMenuState from '../components/menu/EmptyMenuState';
import type { IMenuItem } from '../type';
import { useParams } from 'react-router-dom';

export default function MenuManagement() {
  const { id } = useParams<{ id: string }>();
  const {
    menuItems: data,
    isLoading,
    refetch,
  } = useMenuItems(id || '');
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (isLoading) return <LoadingSpinner />;

  const menuItems = data?.menuItems || [];

  return (
    <div className='min-h-screen bg-gray-50 pb-20'>
      {/* Header */}
      <div className='bg-gradient-to-r from-[#E23774] to-rose-500 pt-12 pb-24'>
        <div className='max-w-4xl mx-auto px-4'>
          <div className='flex items-center justify-between'>
            <div>
              <h1 className='text-2xl font-bold text-white'>Menu Management</h1>
              <p className='text-white/80 text-sm mt-1'>
                {menuItems.length} items in your menu
              </p>
            </div>
            <button
              onClick={() => setIsModalOpen(true)}
              className='bg-white text-[#E23774] px-4 py-2 rounded-full font-semibold text-sm hover:bg-rose-50 transition-colors flex items-center gap-2 shadow-lg'
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
                  d='M12 4v16m8-8H4'
                />
              </svg>
              Add Item
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className='max-w-4xl mx-auto px-4 -mt-12'>
        {menuItems.length === 0 ? (
          <EmptyMenuState onAddClick={() => setIsModalOpen(true)} />
        ) : (
          <div className='grid md:grid-cols-2 gap-4'>
            {menuItems.map((item: IMenuItem) => (
              <MenuItemCard key={item._id} item={item} onUpdate={refetch} />
            ))}
          </div>
        )}
      </div>

      <AddMenuModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        restaurantId={id || ''}
      />
    </div>
  );
}
