import { useQuery } from '@tanstack/react-query';
import { fetchMenuItems } from '../services/menuApi';

export const useMenuItems = (restaurantId: string) => {
  const menuQuery = useQuery({
    queryKey: ['menu-items', restaurantId],
    queryFn: () => fetchMenuItems(restaurantId),
  });

  return {
    menuItems: menuQuery.data,
    isLoading: menuQuery.isLoading,
    error: menuQuery.error,
    refetch: menuQuery.refetch,
  };
};
