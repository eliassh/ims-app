import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_ENDPOINT,
  headers: {
    'Content-Type': 'application/json; charset=UTF-8',
  },
  // baseURL: import.meta.env.VITE_API_ENDPOINT /* use this for your own endpoints */
});
