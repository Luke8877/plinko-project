/**
 * Report Controller
 * ---------------------------------------------------------
 * Provides lightweight dashboard data for authenticated users.
 * Currently returns placeholder statistics for future expansion:
 * • Total games played
 * • Win/loss ratio
 * • Biggest win
 */

import User from '../models/User.js';

/**
 * @route  GET /api/report
 * @desc   Fetch basic user stats for dashboard display
 * @access Private
 */
export const getUserReport = async (req, res) => {
  try {
    const user = await User.findById(req.user).select('balance username');

    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    return res.json({
      username: user.username,
      balance: user.balance,
      totalGames: 0, // Placeholder until full history stats implemented
      winLossRatio: 0, // Placeholder
      biggestWin: 0, // Placeholder
    });
  } catch (err) {
    console.error('Report Error:', err);
    res.status(500).json({ msg: 'Server error' });
  }
};

/**
 * @route  GET /api/report/history
 * @desc   Reserved for fetching detailed gameplay history
 * @access Private
 */
export const getUserReportHistory = async (req, res) => {
  // TODO: Return stored gameplay events when history system is built
  return res.json([]);
};
