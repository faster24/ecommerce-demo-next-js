import axios from 'axios';

// Create an Axios instance with default configurations
const axiosInstance = axios.create({
  baseURL: 'http://127.0.0.1:8000/api', // Replace with your Laravel backend URL
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  withCredentials: true, // Send cookies with requests (if needed)
});

// Optional: Add request interceptors
axiosInstance.interceptors.request.use(
  (config) => {
    // You can modify the request config here (e.g., add authentication tokens)
    const token = localStorage.getItem('token'); // Example: Get token from localStorage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Optional: Add response interceptors
axiosInstance.interceptors.response.use(
  (response) => {
    // Handle successful responses
    return response;
  },
  (error) => {
    // Handle errors (e.g., redirect to login page if unauthorized)
    if (error.response && error.response.status === 401) {
      console.error('Unauthorized! Redirecting to login...');
      // Example: Redirect to login page
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
