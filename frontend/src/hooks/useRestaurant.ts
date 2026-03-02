import { useQuery } from '@tanstack/react-query';
import { getMyRestaurant, fetchRestaurants } from '../services/restaurant.api';

interface UseRestaurantOptions {
  location?: { latitude: number; longitude: number } | null;
  search?: string;
  enabled?: boolean;
}

export const useRestaurantData = ({
  location,
  search,
  enabled = true,
}: UseRestaurantOptions) => {
  const myRestaurantQuery = useQuery({
    queryKey: ['my-restaurant'],
    queryFn: getMyRestaurant,
    retry: false,
    enabled: !!localStorage.getItem('token'),
  });

  const restaurantsQuery = useQuery({
    queryKey: ['restaurant', search, location?.latitude, location?.longitude],
    queryFn: () => {
      if (!location?.latitude || !location?.longitude) {
        return Promise.reject('Location is required');
      }
      return fetchRestaurants(
        location.latitude,
        location.longitude,
        search || '',
      );
    },
    enabled: enabled && !!location,
    staleTime: 5 * 60 * 1000,
  });

  return {
    myRestaurant: myRestaurantQuery.data,
    isLoadingMyRestaurant: myRestaurantQuery.isLoading,
    refetchMyRestaurant: myRestaurantQuery.refetch,
    errorMyRestaurant: myRestaurantQuery.error,
    restaurants: restaurantsQuery.data,
    isLoadingRestaurants: restaurantsQuery.isLoading,
    errorRestaurants: restaurantsQuery.error,
    isLoading: myRestaurantQuery.isLoading || restaurantsQuery.isLoading,
  };
};
