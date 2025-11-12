/**
 * Game Controller
 * -------------------------
 * Handles Plinko game logic, including bet validation,
 * random outcome generation, and balance updates.
 * Relies on service-layer helpers for randomness and database operations.
 */

import { getRandomSlot, saveGame, updateBalance } from '../services/index.js';
import { User } from '../models/index.js';

/**
 * @route   POST /api/game/play
 * @desc    Executes a single Plinko round for the logged-in user.
 *          Deducts bet, calculates payout, updates balance,
 *          and saves the round to the database.
 * @access  Private (requires valid JWT)
 */
export const playRound = async (req, res) => {
  try {
    const userId = req.user;

    // Extract bet amount
    const { bet } = req.body;

    // Validate user
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ msg: 'User not found' });

    // Ensure the bet is positive and does not exceed user balance
    if (bet <= 0 || bet > user.balance)
      return res.status(400).json({ msg: 'Invalid bet amount' });

    // Deduct bet from current balance
    const currentBalance = user.balance - bet;

    // Generate random multiplier using the RandomService
    const slots = [0.5, 1, 2, 5]; // Example payout multipliers
    const multiplier = getRandomSlot(slots);

    // Calculate payout and resulting balance
    const payout = Math.round(bet * multiplier);
    const newBalance = currentBalance + payout;

    // Update user balance and save round details
    await updateBalance(userId, newBalance);
    await saveGame(userId, bet, payout, multiplier);

    res.json({
      msg: 'Round complete',
      multiplier,
      payout,
      newBalance,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};
