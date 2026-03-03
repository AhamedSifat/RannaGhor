import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';
import { useRestaurantData } from '../hooks/useRestaurant';
import RestaurantCard from '../components/RestaurantCard';
import type { IRestaurant } from '../type';
import RestaurantCardSkeleton from '../components/Restaurantcardskeleton';

const Home = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { location, logout } = useAuthStore();
  const search = searchParams.get('search') || '';

  const { restaurants, isLoadingRestaurants } = useRestaurantData({
    location,
    search,
    enabled: true,
  });

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const userLocation = location
    ? {
        lat: location.latitude,
        lng: location.longitude,
      }
    : null;

  return (
    <div className='min-h-screen bg-gray-50 pb-20'>
      {/* Header */}
      <div className='bg-white border-b border-gray-100 sticky top-0 z-30'>
        <div className='max-w-6xl mx-auto px-4 py-4 flex items-center justify-between'>
          <h1 className='text-xl font-bold text-gray-900'>
            Discover Restaurants
          </h1>
          <button
            onClick={handleLogout}
            className='text-sm text-red-500 hover:bg-red-50 px-4 py-2 rounded-full transition-colors font-medium'
          >
            Logout
          </button>
        </div>
      </div>

      {/* Content */}
      <div className='max-w-6xl mx-auto px-4 py-6'>
        {restaurants?.restaurants.length === 0 ? (
          <div className='text-center py-20'>
            <p className='text-gray-500'>No restaurants found nearby</p>
          </div>
        ) : (
          <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {isLoadingRestaurants
              ? Array.from({ length: 6 }).map((_, i) => (
                  <RestaurantCardSkeleton key={i} />
                ))
              : restaurants?.restaurants.map((restaurant: IRestaurant) => (
                  <RestaurantCard
                    key={restaurant._id}
                    restaurant={restaurant}
                    userLocation={userLocation as { lat: number; lng: number }}
                  />
                ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
