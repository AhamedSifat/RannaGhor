import axios from 'axios';
import { RESTAURANT_API_URL } from '../App';

export const getMyRestaurant = async () => {
  const { data } = await axios.get(`${RESTAURANT_API_URL}/api/restaurant/my`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
  return data;
};

export const createRestaurant = async (formData: FormData) => {
  const { data } = await axios.post(
    `${RESTAURANT_API_URL}/api/restaurant/new`,
    formData,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    },
  );
  return data;
};

export const fetchRestaurants = async (
  latitude: number,
  longitude: number,
  search?: string,
) => {
  if (!latitude || !longitude) {
    throw new Error('Latitude and longitude are required');
  }
  const { data } = await axios.get(`${RESTAURANT_API_URL}/api/restaurant/all`, {
    params: { latitude, longitude, search },
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
  return data;
};
