/**
 * Routes Barrel File
 * -------------------------
 * Bundles and re-exports individual route modules for mounting in server.js
 */

import authRoutes from './authRoutes.js';
import gameRoutes from './gameRoutes.js';
import reportRoutes from './reportRoutes.js';
import leaderboardRoutes from './leaderboardRoutes.js';

export default {
  authRoutes,
  gameRoutes,
  reportRoutes,
  leaderboardRoutes,
};
