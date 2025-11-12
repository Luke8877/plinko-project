import express from 'express';
import { getLeaderboard } from '../controllers/leaderboardController.js';

const router = express.Router();

/**
 * @route   GET /api/leaderboard
 * @desc    Returns top users by balance
 * @access  Public
 */
router.get('/', getLeaderboard);

export default router;
