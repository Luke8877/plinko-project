/**
 * Balance Service
 * --------------------------------------------------
 * Wallet-related API handlers:
 * - Fetch balance
 * - Persist updated balance after bets/payouts
 * - Add funds (manual user action)
 */

import api from './api';

/**
 * GET /game/balance
 * Fetch current user balance
 */
export const fetchBalance = () => api.get('/game/balance');

/**
 * PATCH /game/balance
 * Update balance after gameplay changes
 */
export const updateBalance = (balance) =>
  api.patch('/game/balance', { balance });

/**
 * POST /game/balance/add
 * Add funds to player's wallet
 */
export const addFunds = (amount) => api.post('/game/balance/add', { amount });
