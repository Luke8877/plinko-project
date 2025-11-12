/**
 * Models Barrel File
 * -------------------------
 * Centralized export point for all Mongoose models.
 * Allows other modules to import models cleanly:
 *
 * Example:
 *   import { User, Report, PlinkoRound } from '../models';
 */

export { default as User } from './User.js'; // User account and balance information
export { default as Report } from './Report.js'; // Aggregated user statistics and performance data
export { default as PlinkoRound } from './PlinkoRound.js'; // Individual game round details (bet, payout, multiplier)
