/**
 * API Client
 * --------------------------------------------------
 * Configures a reusable Axios instance for all network
 * requests, including automatic JWT header injection
 * for authenticated routes.
 */

import axios from 'axios';

/**
 * Base Axios setup
 * - Points to backend API root
 * - Keeps network config centralized
 */
const api = axios.create({
  baseURL: 'http://localhost:5000/api', // update if backend port changes
});

/**
 * Request Interceptor
 * --------------------------------------------------
 * Runs before every outgoing request.
 * If a user is authenticated (token in storage),
 * attach Authorization header automatically.
 */
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;
