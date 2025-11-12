/**
 * Controllers Barrel File
 * -------------------------
 * Central export point for all controller modules.
 *
 * Example:
 *   import { registerUser, loginUser, playRound } from '../controllers';
 */

export * from './authController.js'; // Handles user registration and login
export * from './gameController.js'; // Handles Plinko gameplay logic
export * from './reportController.js'; // Handles report generation and stats
export * from './leaderboardController.js';
