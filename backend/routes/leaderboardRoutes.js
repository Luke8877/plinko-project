/**
 * Leaderboard Routes
 * ---------------------------------------------------------
 * Exposes public endpoints for retrieving top players
 * ranked by in-game balance. No authentication required.
 */

import express from 'express';
import { getLeaderboard } from '../controllers/leaderboardController.js';

const router = express.Router();

/**
 * @route   GET /api/leaderboard
 * @desc    Fetch top 5 users sorted by highest balance
 * @access  Public
 */
router.get('/', getLeaderboard);

export default router;
