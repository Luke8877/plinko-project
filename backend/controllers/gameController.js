/**
 * Game Controller
 * ---------------------------------------------------------
 * Business logic for PlinkOink:
 * - Fetch user balance
 * - Update user balance
 * - Simulate backend-driven Plinko round
 * ---------------------------------------------------------
 * Note: REST route definitions live in gameRoutes.js,
 * this file only contains logic used by those endpoints.
 */

import { getRandomSlot, saveGame, updateBalance } from '../services/index.js';
import { User } from '../models/index.js';

/**
 * Controller: Return the authenticated user's current balance.
 */
export const getBalance = async (req, res) => {
  try {
    const user = await User.findById(req.user).select('balance');

    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    res.json({ balance: user.balance });
  } catch (err) {
    console.error('getBalance error:', err);
    res.status(500).json({ msg: 'Server error' });
  }
};

/**
 * Controller: Overwrite balance for authenticated user.
 * Used by frontend to sync state after bets + payouts.
 */
export const updateBalanceController = async (req, res) => {
  try {
    const { balance } = req.body;

    if (balance == null || balance < 0) {
      return res.status(400).json({ msg: 'Invalid balance value' });
    }

    const updated = await User.findByIdAndUpdate(
      req.user,
      { balance },
      { new: true }
    ).select('balance');

    if (!updated) {
      return res.status(404).json({ msg: 'User not found' });
    }

    res.json({ balance: updated.balance });
  } catch (err) {
    console.error('updateBalance error:', err);
    res.status(500).json({ msg: 'Server error' });
  }
};

/**
 * Controller: Play one round of Plinko on backend RNG.
 * Deducts bet, applies multiplier, updates DB, records history.
 */
export const playRound = async (req, res) => {
  try {
    const userId = req.user;
    const { bet } = req.body;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ msg: 'User not found' });

    if (bet <= 0 || bet > user.balance) {
      return res.status(400).json({ msg: 'Invalid bet amount' });
    }

    // Deduct bet
    const currentBalance = user.balance - bet;

    // Backend-safe RNG (replace later with physics multiplier)
    const multipliers = [0.5, 1, 2, 5];
    const multiplier = getRandomSlot(multipliers);

    // Calculate payout
    const payout = Math.round(bet * multiplier);
    const newBalance = currentBalance + payout;

    // Persist updates
    await updateBalance(userId, newBalance);
    await saveGame(userId, bet, payout, multiplier);

    res.json({
      msg: 'Round complete',
      multiplier,
      payout,
      newBalance,
    });
  } catch (err) {
    console.error('playRound error:', err);
    res.status(500).json({ msg: 'Server error' });
  }
};
