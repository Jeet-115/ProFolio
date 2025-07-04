import axiosInstance from '../utils/axiosInstance';

export const loginUser = async (userData) => {
  const response = await axiosInstance.post('/login', userData);
  return response.data;
};

export const signupUser = async (userData) => {
  const response = await axiosInstance.post('/signup', userData);
  return response.data;
};

export const getProfile = async () => {
  const res = await axiosInstance.get('/profile');
  return res.data;
};