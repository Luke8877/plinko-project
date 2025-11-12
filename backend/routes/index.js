/**
 * Routes Barrel File
 * -------------------------
 * Bundles and re-exports all route definitions.
 */

import authRoutes from './authRoutes.js'; // Authentication routes (/api/auth)
import gameRoutes from './gameRoutes.js'; // Game routes (/api/game)
import reportRoutes from './reportRoutes.js'; // Report routes (/api/report)
import leaderboardRoutes from './leaderboardRoutes.js'; // Leaderboard routes (/api/leaderboard)

export { authRoutes, gameRoutes, reportRoutes, leaderboardRoutes };
