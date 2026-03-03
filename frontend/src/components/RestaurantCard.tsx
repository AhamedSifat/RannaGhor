import { useNavigate } from 'react-router-dom';
import { calculateDistance } from '../utils/calculateDistance';
import type { IRestaurant } from '../type';

interface Props {
  restaurant: IRestaurant;
  userLocation: {
    lat: number;
    lng: number;
  };
}

export default function RestaurantCard({ restaurant, userLocation }: Props) {
  const navigate = useNavigate();

  const getDistance = (): number | null => {
    if (!userLocation) return null;
    return calculateDistance(userLocation, {
      lat: restaurant.autoLocation.coordinates[1],
      lng: restaurant.autoLocation.coordinates[0],
    });
  };

  const distance = getDistance();

  const formatDistance = (km: number) =>
    km < 1 ? `${Math.round(km * 1000)} m` : `${km.toFixed(1)} km`;

  const getShortAddress = (fullAddress: string) =>
    fullAddress.split(',').slice(0, 2).join(',');

  return (
    <div
      onClick={() => navigate(`/restaurant/${restaurant._id}`)}
      className='group cursor-pointer'
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      <div className='bg-white rounded-2xl overflow-hidden transition-all duration-200 hover:shadow-lg'>
        {/* ── Image ── */}
        <div className='relative w-full' style={{ aspectRatio: '16/9' }}>
          <img
            src={restaurant.image}
            alt={restaurant.name}
            className='w-full h-full object-cover transition-transform duration-500 group-hover:scale-105'
          />
          <div className='absolute inset-0 bg-gradient-to-t from-black/40 to-transparent' />

          {/* Closed overlay */}
          {!restaurant.isOpen && (
            <div className='absolute inset-0 bg-black/50 flex items-center justify-center'>
              <span className='bg-white text-gray-800 font-bold text-sm px-4 py-1.5 rounded-full tracking-wide'>
                Currently Closed
              </span>
            </div>
          )}
        </div>

        {/* ── Info ── */}
        <div className='px-4 py-3'>
          {/* Row 1: Name + Rating */}
          <div className='flex items-center justify-between'>
            <h3 className='font-bold text-gray-900 text-base leading-tight truncate pr-2'>
              {restaurant.name}
            </h3>
            <div className='flex items-center gap-1 bg-green-600 text-white text-xs font-bold px-2 py-0.5 rounded-md flex-shrink-0'>
              <svg
                className='w-2.5 h-2.5'
                fill='currentColor'
                viewBox='0 0 20 20'
              >
                <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
              </svg>
              4.5
            </div>
          </div>

          {/* Row 2: Description */}
          <p className='text-gray-500 text-xs mt-1 line-clamp-1'>
            {restaurant.description ?? 'Restaurant'}
          </p>

          {/* Divider */}
          <div className='border-t border-dashed border-gray-100 my-2.5' />

          {/* Row 3: Distance + Address */}
          <div className='flex items-center gap-3 text-xs text-gray-500'>
            {distance !== null && (
              <>
                <div className='flex items-center gap-1'>
                  <svg
                    className='w-3 h-3 text-gray-400'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z'
                    />
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M15 11a3 3 0 11-6 0 3 3 0 016 0z'
                    />
                  </svg>
                  <span className='font-medium text-gray-700'>
                    {formatDistance(distance)}
                  </span>
                </div>
                <span className='text-gray-300'>·</span>
              </>
            )}
            <span className='truncate flex-1'>
              {getShortAddress(restaurant.autoLocation.formattedAddress)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
