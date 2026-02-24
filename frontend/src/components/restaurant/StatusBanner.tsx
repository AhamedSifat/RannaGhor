import { useState } from 'react';
import axios from 'axios';
import { RESTAURANT_API_URL } from '../../App';
import toast from 'react-hot-toast';

interface Props {
  isOpen?: boolean;
  onStatusChange?: () => void;
}

export default function StatusBanner({ isOpen = true, onStatusChange }: Props) {
  const [showMenu, setShowMenu] = useState(false);
  const [loading, setLoading] = useState(false);
  const [optimisticStatus, setOptimisticStatus] = useState<boolean | null>(
    null,
  );

  // Use optimistic status while loading, otherwise use prop
  const currentStatus = optimisticStatus !== null ? optimisticStatus : isOpen;

  const handleToggleStatus = async () => {
    const newStatus = !currentStatus;
    setOptimisticStatus(newStatus);
    setLoading(true);

    try {
      const { data } = await axios.put(
        `${RESTAURANT_API_URL}/api/restaurant/update`,
        { status: newStatus },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        },
      );

      if (data.success) {
        toast.success(`Restaurant is now ${newStatus ? 'Open' : 'Closed'}`);
        onStatusChange?.(); // Call refetch or callback
      } else {
        // Revert on failure
        setOptimisticStatus(null);
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setOptimisticStatus(null);
      toast.error(error.response?.data?.error || 'Failed to update status');
    } finally {
      setLoading(false);
      setShowMenu(false);
    }
  };

  return (
    <div
      className={`mt-6 rounded-2xl shadow-lg p-4 flex items-center justify-between text-white relative ${
        currentStatus
          ? 'bg-gradient-to-r from-green-500 to-emerald-600'
          : 'bg-gradient-to-r from-red-500 to-rose-600'
      }`}
    >
      <div className='flex items-center gap-3'>
        <div
          className={`w-3 h-3 bg-white rounded-full ${currentStatus ? 'animate-pulse' : ''}`}
        />
        <div>
          <p className='font-bold'>
            {currentStatus ? 'Restaurant is Live' : 'Restaurant is Closed'}
          </p>
          <p className='text-sm opacity-90'>
            {currentStatus ? 'Receiving orders now' : 'Not accepting orders'}
          </p>
        </div>
      </div>

      <div className='flex items-center gap-2'>
        {/* 3 Dot Menu */}
        <div className='relative'>
          <button
            onClick={() => setShowMenu(!showMenu)}
            disabled={loading}
            className='p-2 hover:bg-white/20 rounded-full transition-colors'
          >
            <svg
              className='w-6 h-6 text-white'
              fill='currentColor'
              viewBox='0 0 24 24'
            >
              <path d='M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z' />
            </svg>
          </button>

          {showMenu && (
            <>
              <div
                className='fixed inset-0 z-10'
                onClick={() => setShowMenu(false)}
              />
              <div className='absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-20'>
                <button
                  onClick={handleToggleStatus}
                  disabled={loading}
                  className='w-full px-4 py-3 text-left text-sm font-medium text-gray-700 hover:bg-gray-50 flex items-center gap-2 transition-colors'
                >
                  {loading ? (
                    <svg
                      className='animate-spin h-4 w-4 text-[#E23774]'
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                    >
                      <circle
                        className='opacity-25'
                        cx='12'
                        cy='12'
                        r='10'
                        stroke='currentColor'
                        strokeWidth='4'
                      ></circle>
                      <path
                        className='opacity-75'
                        fill='currentColor'
                        d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
                      ></path>
                    </svg>
                  ) : currentStatus ? (
                    <svg
                      className='w-4 h-4 text-red-500'
                      fill='none'
                      viewBox='0 0 24 24'
                      stroke='currentColor'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z'
                      />
                    </svg>
                  ) : (
                    <svg
                      className='w-4 h-4 text-green-500'
                      fill='none'
                      viewBox='0 0 24 24'
                      stroke='currentColor'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
                      />
                    </svg>
                  )}
                  {currentStatus ? 'Close Restaurant' : 'Open Restaurant'}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
