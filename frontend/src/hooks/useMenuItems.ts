import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchMenuItems, createMenuItem } from '../services/menuApi';

export const useMenuItems = (restaurantId: string) => {
  const queryClient = useQueryClient();

  const menuQuery = useQuery({
    queryKey: ['menu-items', restaurantId],
    queryFn: () => fetchMenuItems(restaurantId),
  });

  const createMutation = useMutation({
    mutationFn: createMenuItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['menu-items', restaurantId] });
    },
  });

  return {
    menuItems: menuQuery.data,
    isLoading: menuQuery.isLoading,
    error: menuQuery.error,

    createMenuItem: createMutation.mutate,
    isCreating: createMutation.isPending,
  };
};
