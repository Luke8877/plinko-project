/**
 * Auth Routes
 * ---------------------------------------------------------
 * Handles authentication-related HTTP endpoints:
 * • Register a new user
 * • Login and receive JWT token
 * • Fetch authenticated profile details
 *
 * Route-level validation:
 * • JWT middleware protects private profile route
 */

import express from 'express';
import { registerUser, loginUser } from '../controllers/authController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';
import User from '../models/User.js';

const router = express.Router();

/**
 * @route  POST /api/auth/register
 * @desc   Create a new user account
 * @access Public
 */
router.post('/register', registerUser);

/**
 * @route  POST /api/auth/login
 * @desc   Authenticate user and return JWT token
 * @access Public
 */
router.post('/login', loginUser);

/**
 * @route  GET /api/auth/profile
 * @desc   Get authenticated user's public profile data
 * @access Private
 */
router.get('/profile', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user).select('-passwordHash'); // Exclude sensitive fields
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

export default router;
