/**
 * Auth + User Service
 * ------------------------------------
 * Centralized wrapper around backend API calls that
 * involve authentication or user-related data.
 * Keeps network logic out of UI components and
 * maintains a single source of truth for API usage.
 */

import api from './api.js';

const authService = {
  /**
   * Log a user into the application.
   * @param {{ username: string, password: string }} data
   * @returns {Promise<{ token: string, user: object }>}
   */
  login: (data) => api.post('/auth/login', data).then((res) => res.data),

  /**
   * Register a new user account.
   * @param {{ username: string, password: string }} data
   * @returns {Promise<{ token: string, user: object }>}
   */
  register: (data) => api.post('/auth/register', data).then((res) => res.data),

  /**
   * Fetch the currently logged-in user's profile.
   * Requires a valid JWT (automatically attached in api.js).
   * @returns {Promise<Object>} { username, balance, ... }
   */
  getProfile: () => api.get('/auth/profile').then((res) => res.data),

  /**
   * Fetch a dashboard stats snapshot (balance, wins, etc.)
   * @returns {Promise<Object>}
   */
  getReport: () => api.get('/report').then((res) => res.data),

  /**
   * Play a round of PlinkOink
   * @param {{ bet: number }} data
   * @returns {Promise<{ multiplier: number, newBalance: number }>}
   */
  playGame: (data) => api.post('/game/play', data).then((res) => res.data),
};

export default authService;
