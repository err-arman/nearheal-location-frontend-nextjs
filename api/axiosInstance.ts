import { getAuthToken, removeAuthToken } from '@/lib/auth';
import axios from 'axios';
// Create an axios instance with default configuration
const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 15000, // 15 seconds timeout
});

// Request interceptor for adding auth token, etc.
axiosInstance.interceptors.request.use(
  (config) => {
    // Get token from localStorage if it exists
    // const token = localStorage.getItem(localStorageKey.token);
    const token = getAuthToken();

    // If token exists, add it to the headers
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for handling common errors
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle 401 Unauthorized errors (token expired, etc.)
    if (error.response && error.response.status === 401) {
      // Clear localStorage
      // localStorage.removeItem(localStorageKey.token);
      removeAuthToken()
      // Redirect to login page or handle as needed
      // window.location.href = '/login';
    }
    
    // Handle other errors or just pass them through
    return Promise.reject(error);
  }
);

export default axiosInstance;
