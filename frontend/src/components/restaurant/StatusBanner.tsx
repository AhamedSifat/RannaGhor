import { FcClock } from 'react-icons/fc';

export default function StatusBanner() {
  return (
    <div className='mt-6 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl shadow-lg p-4 flex items-center justify-between text-white'>
      <div className='flex items-center gap-3'>
        <div className='w-3 h-3 bg-white rounded-full animate-pulse' />
        <div>
          <p className='font-bold'>Restaurant is Live</p>
          <p className='text-sm opacity-90'>Receiving orders now</p>
        </div>
      </div>
      <FcClock size={32} className='opacity-50' />
    </div>
  );
}
