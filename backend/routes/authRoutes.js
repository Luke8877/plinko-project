/**
 * Authentication Routes
 * -------------------------
 * Defines API endpoints for user registration and login.
 * Delegates route logic to corresponding controller functions.
 */

import express from 'express';
import { registerUser, loginUser } from '../controllers/index.js';

const router = express.Router();

/**
 * @route   POST /api/auth/register
 * @desc    Register a new user account
 * @access  Public
 */
router.post('/register', registerUser);

/**
 * @route   POST /api/auth/login
 * @desc    Authenticate existing user and return JWT
 * @access  Public
 */
router.post('/login', loginUser);

export default router;
