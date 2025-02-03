import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://bookrecommendationbackend-production.up.railway.app/api',
});

// Attach the token to every request if it exists
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
