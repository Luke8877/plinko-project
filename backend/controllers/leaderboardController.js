import { User } from '../models/index.js';

export const getLeaderboard = async (req, res) => {
  try {
    // Sort by balance only return needed fields
    const topUsers = await User.find({}, { username: 1, balance: 1, _id: 0 })
      .sort({ balance: -1 })
      .limit(5);

    res.json(topUsers);
  } catch (err) {
    console.error('Leaderboard error:', err);
    res.status(500).json({ msg: 'Server error fetching leaderboard' });
  }
};
