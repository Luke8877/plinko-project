/**
 * Report Model
 * -------------------------
 * Represents aggregated performance statistics for a user.
 * Stores historical and analytical data such as total games played,
 * win/loss ratio, biggest win, and average bet size.
 * Used for generating progress reports and dashboard insights.
 */

import mongoose from 'mongoose';

// Define schema for user performance report
const reportSchema = new mongoose.Schema({
  // Reference to the user the report belongs to
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },

  // Total number of Plinko rounds played by the user
  totalGames: { type: Number, default: 0 },

  // Ratio of wins to total rounds played (e.g., 0.45 = 45% win rate)
  winLossRatio: { type: Number, default: 0 },

  // Highest single-round payout achieved by the user
  biggestWin: { type: Number, default: 0 },

  // Average bet amount across all rounds
  averageBet: { type: Number, default: 0 },

  // Timestamp of the last time the report was updated
  updatedAt: { type: Date, default: Date.now },
});

// Create and export Mongoose model
const Report = mongoose.model('Report', reportSchema);
export default Report;
