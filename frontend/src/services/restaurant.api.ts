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
