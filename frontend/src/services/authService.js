/**
 * Auth Service
 * ------------------------------------
 * Centralized wrapper around auth-related API calls.
 * This keeps network logic out of UI components
 * and makes authentication flows easier to maintain.
 */

import api from './api.js';

/**
 * Exposes login and register helpers
 * (returns only useful response data to components)
 */
const authService = {
  /**
   * Log a user into the application.
   * @param {{ username: string, password: string }} data
   * @returns {Promise<{ token: string }>}
   */
  login: (data) => api.post('/auth/login', data).then((res) => res.data),

  /**
   * Register a new user account.
   * @param {{ username: string, password: string }} data
   * @returns {Promise<{ token: string }>}
   */
  register: (data) => api.post('/auth/register', data).then((res) => res.data),
};

export default authService;
