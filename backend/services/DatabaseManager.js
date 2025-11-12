/**
 * Database Manager Service
 * -------------------------
 * Handles all direct interactions with the database layer.
 * Contains reusable helper functions for saving game data
 * and updating user balances.
 */

import { User, PlinkoRound } from '../models/index.js';

/**
 * Saves a completed Plinko game round to the database.
 *
 * @param {string} userId - The ID of the user who played the round.
 * @param {number} bet - The bet amount placed by the user.
 * @param {number} payout - The total payout after applying the multiplier.
 * @param {number} multiplier - The random multiplier for this round.
 * @returns {Promise<Object>} The saved PlinkoRound document.
 */
export const saveGame = async (userId, bet, payout, multiplier) => {
  return await PlinkoRound.create({ userId, bet, payout, multiplier });
};

/**
 * Updates a user's account balance in the database.
 *
 * @param {string} userId - The ID of the user whose balance should be updated.
 * @param {number} newBalance - The updated account balance.
 * @returns {Promise<Object>} The updated User document.
 */
export const updateBalance = async (userId, newBalance) => {
  return await User.findByIdAndUpdate(userId, { balance: newBalance });
};
