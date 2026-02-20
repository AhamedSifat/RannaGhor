import axios from 'axios';

export const loginWithGoogle = async (code: string) => {
  const res = await axios.post('http://localhost:5000/api/auth/login', {
    code,
  });

  return res.data;
};
