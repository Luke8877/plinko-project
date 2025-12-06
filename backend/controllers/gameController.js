/**
 * Game Controller
 * ---------------------------------------------------------
 * Backend-validated game operations for PlinkOink:
 * • Fetch authenticated user balance
 * • Apply secure betting and payout logic
 * • Persist updated balance and game history
 * Notes:
 * • Backend must always enforce payout rules
 * • Routes are defined separately in gameRoutes.js
 */

import { getRandomSlot, saveGame, updateBalance } from '../services/index.js';
import { User } from '../models/index.js';

/**
 * @route  GET /api/game/balance
 * @desc   Return authenticated user's balance
 * @access Private
 */
export const getBalance = async (req, res) => {
  try {
    const user = await User.findById(req.user).select('balance');
    if (!user) return res.status(404).json({ msg: 'User not found' });

    res.json({ balance: user.balance });
  } catch (err) {
    console.error('getBalance error:', err);
    res.status(500).json({ msg: 'Server error' });
  }
};

/**
 * @route  PUT /api/game/balance
 * @desc   Overwrite authenticated user's balance
 * @access Private
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

    if (!updated) return res.status(404).json({ msg: 'User not found' });

    res.json({ balance: updated.balance });
  } catch (err) {
    console.error('updateBalance error:', err);
    res.status(500).json({ msg: 'Server error' });
  }
};

/**
 * @route  POST /api/game/play
 * @desc   Execute backend RNG round and return results
 * @access Private
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

    const currentBalance = user.balance - bet;

    const multipliers = [0.5, 1, 2, 5];
    const multiplier = getRandomSlot(multipliers);

    const payout = Math.round(bet * multiplier);
    const newBalance = currentBalance + payout;

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
