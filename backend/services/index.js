/**
 * Services Barrel File
 * -------------------------
 * Consolidates all service-layer exports.
 *
 * Example:
 *   import { getRandomSlot, updateBalance, fetchReport } from '../services';
 */

export * from './RandomService.js'; // Random number / slot generator
export * from './DatabaseManager.js'; // Centralized DB helper functions
export * from './AuthServices.js'; // Handles registration & login logic
export * from './ReportService.js'; //Handles Reports for showcasing user data
