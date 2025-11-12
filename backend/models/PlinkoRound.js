/**
 * PlinkoRound Model
 * -------------------------
 * Represents a single round of Plinko played by a user.
 * Each document stores the bet amount, payout, multiplier,
 * and timestamp. Used for reporting, analytics, and balance tracking.
 */

import mongoose from 'mongoose';

// Define schema for a Plinko game round
const plinkoRoundSchema = new mongoose.Schema({
  // Reference to the user who played the round
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },

  // Amount the user bet for this round
  bet: { type: Number, required: true },

  // Total payout the user received (bet * multiplier)
  payout: { type: Number, required: true },

  // Random multiplier applied to the bet
  multiplier: { type: Number, required: true },

  // Timestamp of when the round occurred
  createdAt: { type: Date, default: Date.now },
});

// Create and export Mongoose model
const PlinkoRound = mongoose.model('PlinkoRound', plinkoRoundSchema);
export default PlinkoRound;
