export default function RestaurantCardSkeleton() {
  return (
    <div
      className='bg-white rounded-2xl overflow-hidden'
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      {/* Image placeholder */}
      <div
        className='w-full bg-gray-200 animate-pulse'
        style={{ aspectRatio: '16/9' }}
      />

      {/* Info */}
      <div className='px-4 py-3'>
        {/* Row 1: Name + Rating */}
        <div className='flex items-center justify-between'>
          <div className='h-4 w-2/3 bg-gray-200 rounded-full animate-pulse' />
          <div className='h-5 w-10 bg-gray-200 rounded-md animate-pulse' />
        </div>

        {/* Row 2: Description */}
        <div className='h-3 w-1/2 bg-gray-100 rounded-full animate-pulse mt-2' />

        {/* Divider */}
        <div className='border-t border-dashed border-gray-100 my-2.5' />

        {/* Row 3: Distance + Address */}
        <div className='flex items-center gap-3'>
          <div className='h-3 w-10 bg-gray-100 rounded-full animate-pulse' />
          <div className='h-3 w-3/5 bg-gray-100 rounded-full animate-pulse' />
        </div>
      </div>
    </div>
  );
}
