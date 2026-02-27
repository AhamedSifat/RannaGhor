interface Props {
  onAddClick: () => void;
}

export default function EmptyMenuState({ onAddClick }: Props) {
  return (
    <div className='bg-white rounded-3xl shadow-sm border border-gray-100 p-12 text-center'>
      <div className='w-20 h-20 bg-rose-50 rounded-full flex items-center justify-center mx-auto mb-4'>
        <svg
          className='w-10 h-10 text-[#E23774]'
          fill='none'
          viewBox='0 0 24 24'
          stroke='currentColor'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M12 6v6m0 0v6m0-6h6m-6 0H6'
          />
        </svg>
      </div>
      <h3 className='text-lg font-bold text-gray-900 mb-2'>
        Your menu is empty
      </h3>
      <p className='text-gray-500 mb-6'>
        Start adding delicious items to your menu
      </p>
      <button
        onClick={onAddClick}
        className='bg-[#E23774] text-white px-6 py-3 rounded-full font-semibold hover:bg-[#c02667] transition-colors'
      >
        Add First Item
      </button>
    </div>
  );
}
