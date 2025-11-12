/**
 * Middleware Barrel File
 * -------------------------
 * Central export point for all Express middleware functions.
 *
 * Example usage:
 *   import { authMiddleware } from '../middleware';
 */

export * from './authMiddleware.js'; // Protects routes with JWT authentication
