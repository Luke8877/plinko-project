/**
 * Report Controller
 * -------------------------
 * Handles report generation and retrieval for Plinko users.
 */

import { fetchReport, getReportHistory } from '../services/index.js';

/**
 * @route   GET /api/report
 * @desc    Retrieve latest gameplay report for the authenticated user.
 */
export const getUserReport = async (req, res) => {
  try {
    const userId = req.user;
    const report = await fetchReport(userId);
    res.json(report);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};

/**
 * @route   GET /api/report/history
 * @desc    Retrieve all historical report snapshots for the authenticated user.
 */
export const getUserReportHistory = async (req, res) => {
  try {
    const userId = req.user;
    const history = await getReportHistory(userId);
    res.json(history);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};
