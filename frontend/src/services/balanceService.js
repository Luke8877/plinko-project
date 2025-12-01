/**
 * Balance Service
 * --------------------------------------------------
 * Handles all wallet-related API calls:
 * - Fetch balance
 * - Sync updated balance (bets, payouts)
 * - Add funds to wallet
 */

import api from './api';

// Get current balance from backend (refresh safe)
export const fetchBalance = () => api.get('/game/balance');

// Sync updated balance after each state change
export const updateBalance = (balance) =>
  api.put('/game/balance', { balance });

// Add funds via user action (modal)
export const addFunds = (amount) =>
  api.post('/game/balance/add', { amount });
