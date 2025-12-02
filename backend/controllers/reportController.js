/**
 * Report Controller
 * Returns user balance + placeholder stats
 */

import User from '../models/User.js';

export const getUserReport = async (req, res) => {
  try {
    const user = await User.findById(req.user).select('balance username');

    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    return res.json({
      username: user.username,
      balance: user.balance,
      totalGames: 0,
      winLossRatio: 0,
      biggestWin: 0,
    });
  } catch (err) {
    console.error('Report Error:', err);
    res.status(500).json({ msg: 'Server error' });
  }
};

export const getUserReportHistory = async (req, res) => {
  return res.json([]);
};
