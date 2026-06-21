import axios from 'axios';

const API = axios.create({
  baseURL: 'https://edu2job-backend-production-5dea.up.railway.app/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor: Attach JWT Token if available
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('edu2job_token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor: Handle auth errors (e.g. 401 Unauthorized or 403 Forbidden)
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && (error.response.status === 401 || error.response.status === 403)) {
      // Clear token and user info from storage
      localStorage.removeItem('edu2job_token');
      localStorage.removeItem('edu2job_user');
      
      // If we are not already on the login or register page, redirect to login
      const path = window.location.pathname;
      if (path !== '/login' && path !== '/register') {
        window.location.href = '/login?expired=true';
      }
    }
    return Promise.reject(error);
  }
);

export default API;
