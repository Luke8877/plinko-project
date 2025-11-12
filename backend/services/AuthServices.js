/**
 * Auth Service
 * -------------------------
 * Handles core authentication logic, including
 * user registration, password hashing, credential validation,
 * and JWT token generation. Called by the AuthController.
 */

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

/**
 * Registers a new user in the system.
 *
 * @param {string} username - Desired username for the new account.
 * @param {string} password - Plain-text password to be hashed before saving.
 * @returns {Promise<Object>} The newly created user document.
 * @throws {Error} If the username is already taken.
 */
export const registerUserService = async (username, password) => {
  // Check if the username is already registered
  const existingUser = await User.findOne({ username });
  if (existingUser) throw new Error('Username already exists');

  // Hash the password using bcrypt
  const passwordHash = await bcrypt.hash(password, 10);

  // Create and return the new user
  const user = await User.create({ username, passwordHash });
  return user;
};

/**
 * Authenticates an existing user and generates a JWT token.
 *
 * @param {string} username - Username provided by the client.
 * @param {string} password - Plain-text password for verification.
 * @returns {Promise<{ user: Object, token: string }>} Authenticated user data and JWT token.
 * @throws {Error} If credentials are invalid.
 */
export const loginUserService = async (username, password) => {
  // Attempt to find user by username
  const user = await User.findOne({ username });
  if (!user) throw new Error('Invalid credentials');

  // Compare entered password with stored hash
  const valid = await bcrypt.compare(password, user.passwordHash);
  if (!valid) throw new Error('Invalid credentials');

  // Generate a JWT token valid for 7 days
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: '7d',
  });

  // Return both the user data and token
  return { user, token };
};
