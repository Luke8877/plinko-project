/**
 * Game Routes
 * -------------------------
 * Handles gameplay actions like placing a bet and simulating a Plinko round.
 * Protected via JWT middleware to ensure only authenticated users can play.
 */

import express from 'express';
import { authMiddleware } from '../middleware/authMiddleware.js';
import { playRound } from '../controllers/gameController.js';

const router = express.Router();

/**
 * @route   POST /api/game/play
 * @desc    Plays one round of Plinko — calculates multiplier, payout, and updates balance.
 * @access  Private (requires JWT)
 */
router.post('/play', authMiddleware, playRound);

/**
 * @route   GET /api/game/protected
 * @desc    Simple test route to confirm JWT authentication is working
 * @access  Private (requires JWT)
 */
router.get('/protected', authMiddleware, (req, res) => {
  res.json({ msg: 'Access granted', userId: req.user });
});

export default router;
