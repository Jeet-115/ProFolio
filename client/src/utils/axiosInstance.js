import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, // e.g. http://localhost:3000
  withCredentials: true, // required for sending cookies
});

export default axiosInstance;