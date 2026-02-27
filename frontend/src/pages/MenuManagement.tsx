import { useEffect, useState } from 'react';
import { useMenuItems } from '../hooks/useMenuItems';
import LoadingSpinner from '../components/restaurant/LoadingSpinner';
import MenuItemCard from '../components/menu/MenuItemCard';
import AddMenuModal from '../components/menu/AddMenuModal';
import EmptyMenuState from '../components/menu/EmptyMenuState';
import type { IMenuItem } from '../type';
import { useParams } from 'react-router-dom';
import { FcPlus } from 'react-icons/fc';
import { useMenuStore } from '../stores/menuStore';

export default function MenuManagement() {
  const { id } = useParams<{ id: string }>();
  const { setMenuItems } = useMenuStore();
  const { menuItems: data, isLoading, refetch } = useMenuItems(id || '');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const menuItems = data?.menuItems || [];

  useEffect(() => {
    if (data && data.menuItems) {
      setMenuItems(data.menuItems);
    }
  }, [data, setMenuItems]);

  const availableCount = menuItems.filter(
    (i: IMenuItem) => i.isAvailable,
  ).length;
  if (isLoading) return <LoadingSpinner />;

  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-50 via-white to-rose-50/30 pb-20'>
      {/* Modern Header */}
      <div className='bg-white border-b border-gray-100 sticky top-0 z-30'>
        <div className='max-w-6xl mx-auto px-4 py-4'>
          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-4'>
              <div className='w-12 h-12 bg-gradient-to-tr from-[#E23774] to-rose-400 rounded-2xl flex items-center justify-center shadow-lg shadow-rose-200'>
                <svg
                  className='w-6 h-6 text-white'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2'
                  />
                </svg>
              </div>
              <div>
                <h1 className='text-xl font-bold text-gray-900'>Menu</h1>
                <p className='text-sm text-gray-500'>
                  {availableCount} of {menuItems.length} items available
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsModalOpen(true)}
              className='group flex items-center gap-2 bg-[#E23774] text-white px-5 py-2.5 rounded-full font-semibold text-sm hover:bg-[#c02667] transition-all hover:shadow-lg hover:shadow-rose-200 hover:-translate-y-0.5'
            >
              <FcPlus size={18} className='text-white' />
              <span>Add Item</span>
              <svg
                className='w-4 h-4 group-hover:rotate-90 transition-transform'
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
            </button>
          </div>
        </div>
      </div>

      {/* Stats Bar */}
      {menuItems.length > 0 && (
        <div className='max-w-6xl mx-auto px-4 py-6'>
          <div className='flex gap-4 overflow-x-auto pb-2'>
            <div className='bg-white px-6 py-3 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-3 min-w-fit'>
              <div className='w-10 h-10 rounded-xl bg-rose-50 flex items-center justify-center'>
                <span className='text-[#E23774] font-bold'>
                  {menuItems.length}
                </span>
              </div>
              <div>
                <p className='text-xs text-gray-500 font-medium uppercase tracking-wide'>
                  Total Items
                </p>
                <p className='text-sm font-semibold text-gray-900'>
                  In your menu
                </p>
              </div>
            </div>

            <div className='bg-white px-6 py-3 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-3 min-w-fit'>
              <div className='w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center'>
                <span className='text-green-600 font-bold'>
                  {availableCount}
                </span>
              </div>
              <div>
                <p className='text-xs text-gray-500 font-medium uppercase tracking-wide'>
                  Available
                </p>
                <p className='text-sm font-semibold text-gray-900'>
                  Ready to order
                </p>
              </div>
            </div>

            <div className='bg-white px-6 py-3 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-3 min-w-fit'>
              <div className='w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center'>
                <span className='text-gray-600 p-5 font-bold'>
                  $
                  {Math.round(
                    menuItems.reduce(
                      (acc: number, i: IMenuItem) => acc + i.price,
                      0,
                    ) / menuItems.length,
                  )}
                </span>
              </div>
              <div>
                <p className='text-xs text-gray-500 font-medium uppercase tracking-wide'>
                  Avg Price
                </p>
                <p className='text-sm font-semibold text-gray-900'>Per item</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Content */}
      <div className='max-w-6xl mx-auto px-4'>
        {menuItems.length === 0 ? (
          <EmptyMenuState onAddClick={() => setIsModalOpen(true)} />
        ) : (
          <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-4'>
            {menuItems.map((item: IMenuItem, index: number) => (
              <MenuItemCard
                key={item._id}
                item={item}
                onUpdate={refetch}
                index={index}
              />
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
