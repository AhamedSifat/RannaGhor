import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { RESTAURANT_API_URL } from '../App';

export function useUpdateRestaurant() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      formData,
    }: {
      id: string;
      formData: FormData;
    }) => {
      const { data } = await axios.put(
        `${RESTAURANT_API_URL}/api/restaurant/${id}/edit`,
        formData,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        },
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['restaurant'] });
    },
  });
}
