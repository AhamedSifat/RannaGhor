import AddRestuarant from '../components/AddRestuarant';
import LoadingSpinner from '../components/restaurant/LoadingSpinner';
import RestaurantActions from '../components/restaurant/RestaurantActions';
import RestaurantContact from '../components/restaurant/RestaurantContact';
import RestaurantHeader from '../components/restaurant/RestaurantHeader';
import RestaurantImage from '../components/restaurant/RestaurantImage';
import RestaurantInfo from '../components/restaurant/RestaurantInfo';
import RestaurantStats from '../components/restaurant/RestaurantStats';
import StatusBanner from '../components/restaurant/StatusBanner';
import { useRestaurant } from '../hooks/useRestaurant';

export default function RestaurantPage() {
  const { data, isLoading, refetch } = useRestaurant();

  if (isLoading) return <LoadingSpinner />;

  if (!data?.restaurant) return <AddRestuarant />;

  const { restaurant } = data;

  return (
    <div className='min-h-screen bg-gray-50 pb-20'>
      <RestaurantHeader />

      <div className='max-w-4xl mx-auto px-4 -mt-16'>
        <div className='bg-white rounded-3xl shadow-xl overflow-hidden'>
          <div className='p-6 md:p-8'>
            <div className='flex flex-col md:flex-row gap-6'>
              <RestaurantImage
                image={restaurant.image}
                name={restaurant.name}
              />

              <div className='flex-1 flex flex-col justify-between'>
                <RestaurantInfo
                  name={restaurant.name}
                  address={restaurant.autoLocation?.formattedAddress}
                  description={restaurant.description}
                />
                <RestaurantStats />
              </div>
            </div>
          </div>

          <div className='bg-gray-50 p-6 md:p-8 border-t border-gray-100'>
            <div className='grid md:grid-cols-2 gap-6'>
              <RestaurantContact phone={restaurant.phone} />
              <RestaurantActions />
            </div>
          </div>
        </div>

        <StatusBanner
          isOpen={restaurant.isOpen}
          onStatusChange={() => refetch()} // Refetch to get updated status
        />
      </div>
    </div>
  );
}
