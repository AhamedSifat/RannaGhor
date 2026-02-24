import { useQuery } from '@tanstack/react-query';
import { getMyRestaurant } from '../services/restaurant.api';

export const useRestaurant = () => {
  return useQuery({
    queryKey: ['my-restaurant'],
    queryFn: getMyRestaurant,
    retry: false,
  });
};
