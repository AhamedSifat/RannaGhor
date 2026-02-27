import axios from 'axios';
import { RESTAURANT_API_URL } from '../App';

export const fetchMenuItems = async (restaurantId: string) => {
  const token = localStorage.getItem('token');

  const { data } = await axios.get(
    `${RESTAURANT_API_URL}/api/item/all/${restaurantId}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    },
  );
  return data;
};

export const toogleMenuItemAvailability = async (menuItemId: string) => {
  const token = localStorage.getItem('token');

  const { data } = await axios.put(
    `${RESTAURANT_API_URL}/api/item/toggle/${menuItemId}`,
    null,
    {
      headers: { Authorization: `Bearer ${token}` },
    },
  );
  return data;
};

export const deleteMenuItem = async (menuItemId: string) => {
  const token = localStorage.getItem('token');
  const { data } = await axios.delete(
    `${RESTAURANT_API_URL}/api/item/delete/${menuItemId}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    },
  );
  return data;
};

export const createMenuItem = async (formData: FormData) => {
  const token = localStorage.getItem('token');
  const { data } = await axios.post(
    `${RESTAURANT_API_URL}/api/item/new`,
    formData,
    {
      headers: { Authorization: `Bearer ${token}` },
    },
  );
  return data;
};

export const fetchMenuById = async (menuItemId: string) => {
  const token = localStorage.getItem('token');
  const { data } = await axios.get(
    `${RESTAURANT_API_URL}/api/item/${menuItemId}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    },
  );
  return data;
};

export const updateMenuItem = async (
  menuItemId: string,
  formData: FormData,
) => {
  const token = localStorage.getItem('token');
  const { data } = await axios.put(
    `${RESTAURANT_API_URL}/api/item/update/${menuItemId}`,
    formData,
    {
      headers: { Authorization: `Bearer ${token}` },
    },
  );
  return data;
};
