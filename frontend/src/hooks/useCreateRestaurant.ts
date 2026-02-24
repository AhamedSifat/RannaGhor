import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { createRestaurant } from '../services/restaurant.api';

export const useCreateRestaurant = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createRestaurant,

    onSuccess: () => {
      toast.success('Restaurant created successfully!');

      // Auto refetch restaurant
      queryClient.invalidateQueries({ queryKey: ['my-restaurant'] });
    },

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      toast.error(error.response?.data?.error || 'Failed to create restaurant');
    },
  });
};
