/**
 * Authentication Controller
 * -------------------------
 * Handles user registration and login requests.
 * Delegates business logic to AuthService methods.
 */

import { registerUserService, loginUserService } from '../services/index.js';

/**
 * @route   POST /api/auth/register
 * @desc    Register a new user
 * @access  Public
 */
export const registerUser = async (req, res) => {
  try {
    // Extract credentials from the request body
    const { username, password } = req.body;

    // Call the AuthService to handle registration logic
    const user = await registerUserService(username, password);

    // Send success response with created user info
    res.status(201).json({ msg: 'User registered successfully', user });
  } catch (err) {
    // Send user-friendly error message
    res.status(400).json({ msg: err.message });
  }
};

/**
 * @route   POST /api/auth/login
 * @desc    Authenticate user and return JWT token
 * @access  Public
 */
export const loginUser = async (req, res) => {
  try {
    // Extract credentials from the request body
    const { username, password } = req.body;

    // Delegate login logic to AuthService
    const { user, token } = await loginUserService(username, password);

    // Respond with token and user info
    res.json({ msg: 'Login successful', token, user });
  } catch (err) {
    // Invalid credentials or server error
    res.status(400).json({ msg: err.message });
  }
};
