/**
 * Auth + User Service
 * ------------------------------------
 * Centralized wrapper around backend API calls that
 * involve authentication or user-related data.
 * Keeps network logic out of UI components and
 * maintains a single source of truth for API usage.
 */

import api from './api.js';

/**
 * Helper methods for authenticating users and
 * retrieving/updating protected user data.
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

  /**
   * Play a round of PlinkOink.
   * Sends a bet amount and receives game results:
   * multiplier, updated balance, etc.
   * @param {{ bet: number }} data
   * @returns {Promise<{ multiplier: number, newBalance: number }>}
   */
  playGame: (data) => api.post('/game/play', data).then((res) => res.data),

  /**
   * Fetch the user's latest gameplay statistics.
   * This includes:
   * - Current balance
   * - Total games played
   * - Win/loss ratio
   * - Biggest win
   *
   * Used to show the "Quick Stats" panel on dashboard.
   * @returns {Promise<Object>} Report snapshot for user dashboard
   */
  getReport: () => api.get('/report').then((res) => res.data),
};

export default authService;
