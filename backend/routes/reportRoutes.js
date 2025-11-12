/**
 * Report Routes
 * -------------------------
 * Defines API endpoints for retrieving user-specific
 * gameplay statistics and performance reports.
 * Access is protected using JWT authentication middleware.
 */

import express from 'express';
import { authMiddleware } from '../middleware/index.js';
import { getUserReport, getUserReportHistory } from '../controllers/index.js';

const router = express.Router();

/**
 * @route   GET /api/report
 * @desc    Retrieve latest gameplay performance summary
 */
router.get('/', authMiddleware, getUserReport);

/**
 * @route   GET /api/report/history
 * @desc    Retrieve historical snapshots for the authenticated user
 */
router.get('/history', authMiddleware, getUserReportHistory);

export default router;
