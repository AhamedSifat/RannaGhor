export default function LoadingSpinner() {
  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-50'>
      <div className='flex flex-col items-center gap-3'>
        <div className='w-10 h-10 border-4 border-rose-200 border-t-[#E23774] rounded-full animate-spin' />
        <span className='text-sm text-gray-500'>Loading...</span>
      </div>
    </div>
  );
}
