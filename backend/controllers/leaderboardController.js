/**
 * Leaderboard Controller
 * ---------------------------------------------------------
 * Returns a list of top users ranked by balance.
 * Only publicly safe fields are included to protect
 * user privacy and keep payload small.
 */

import { User } from '../models/index.js';

/**
 * @route  GET /api/leaderboard
 * @desc   Fetch top 5 users by highest balance
 * @access Public (no sensitive data returned)
 */
export const getLeaderboard = async (req, res) => {
  try {
    // Query users sorted by balance descending
    // Project only username + balance (no private fields)
    const topUsers = await User.find({}, { username: 1, balance: 1, _id: 0 })
      .sort({ balance: -1 })
      .limit(5);

    res.json(topUsers);
  } catch (err) {
    console.error('Leaderboard error:', err);
    res.status(500).json({ msg: 'Server error fetching leaderboard' });
  }
};
