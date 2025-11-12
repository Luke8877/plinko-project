/**
 * ReportService.js
 * -------------------------
 * Handles all logic for generating and persisting
 * user performance reports for the Plinko game.
 */
import { Report, PlinkoRound } from '../models/index.js';

/**
 * Generates a new report snapshot for a given user.
 * Computes stats from PlinkoRound history and saves
 * the result to the reports collection.
 */
export const fetchReport = async (userId) => {
  const rounds = await PlinkoRound.find({ userId });

  if (rounds.length === 0) {
    return {
      totalGames: 0,
      winLossRatio: 0,
      biggestWin: 0,
      averageBet: 0,
      rounds: [],
    };
  }

  const totalGames = rounds.length;
  const totalPayout = rounds.reduce((sum, r) => sum + r.payout, 0);
  const totalBet = rounds.reduce((sum, r) => sum + r.bet, 0);
  const biggestWin = Math.max(...rounds.map((r) => r.payout));
  const averageBet = totalBet / totalGames;
  const winLossRatio = totalPayout / totalBet;

  // Save snapshot
  const snapshot = await Report.create({
    userId,
    totalGames,
    winLossRatio,
    biggestWin,
    averageBet,
    updatedAt: new Date(),
  });

  // Return both the latest stats and snapshot ref
  return {
    totalGames,
    winLossRatio,
    biggestWin,
    averageBet,
    rounds: rounds.slice(-5).reverse(),
    snapshotId: snapshot._id,
  };
};

/**
 * Retrieves all historical report snapshots for a user.
 * Used for graphing progress over time on the frontend.
 */
export const getReportHistory = async (userId) => {
  return await Report.find({ userId }).sort({ updatedAt: 1 });
};
