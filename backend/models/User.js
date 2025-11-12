/**
 * User Model
 * -------------------------
 * Represents an authenticated player in the PlinkOink system.
 * Stores login credentials (securely hashed), account balance,
 * and serves as the parent reference for all gameplay and reports.
 */

import mongoose from 'mongoose';

// Define schema for user accounts
const userSchema = new mongoose.Schema({
  // Unique username chosen by the user
  username: { type: String, required: true, unique: true },

  // Hashed password for authentication (bcrypt hashed)
  passwordHash: { type: String, required: true },

  // Current balance available for Plinko gameplay
  balance: { type: Number, default: 1000 },
});

// Create and export Mongoose model
const User = mongoose.model('User', userSchema);
export default User;
