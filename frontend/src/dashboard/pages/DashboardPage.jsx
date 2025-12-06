/**
 * Dashboard Page
 * ---------------------------------------------------------
 * Main authenticated landing screen for PlinkOink players.
 * Presents a personalized overview with:
 * • Welcome message and username
 * • Current balance
 * • Teaser animations for game entry
 * • Placeholder cards for future stats + leaderboard
 *
 * Data Source:
 * • Dashboard report fetched from backend via authService
 *   (username + balance + placeholder progress fields)
 *
 * Layout Strategy:
 * • Responsive CSS grid with fixed-height rows ensures a
 *   structured and visually balanced card arrangement.
 * • Brand-themed floating pigs enhance playful user experience.
 */

import { useEffect, useState } from 'react';
import authService from '@services/authService';

import WelcomeCard from '../components/WelcomeCard';
import StatsCard from '../components/StatsCard';
import BalanceCard from '../components/BalanceCard';
import GamePreview from '../components/GamePreview';
import LeaderboardCard from '../components/LeaderboardCard';
import CornerPig from '@shared/components/CornerPig';
import FloatingPig from '@shared/components/FloatingPig';

export default function DashboardPage() {
  const [report, setReport] = useState(null); // Holds user report from backend

  useEffect(() => {
    // Load user-specific dashboard data when page loads
    async function fetchData() {
      try {
        const data = await authService.getReport();
        setReport(data);
      } catch (err) {
        console.error('Failed to load dashboard data', err);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-surfaceDark text-white flex items-center justify-center px-6 relative">
      {/* Ambient themed visuals */}
      <CornerPig topRight bottomLeft />
      <FloatingPig size={90} />

      {/* Dashboard Grid Layout */}
      <div className="grid grid-cols-3 grid-rows-[180px_380px] gap-6 max-w-7xl w-full z-10">
        {/* Personalized welcome */}
        <WelcomeCard />

        {/* Placeholder stats (future feature) */}
        <StatsCard report={report} />

        {/* Live currency card from backend report */}
        <BalanceCard balance={report?.balance} />

        {/* Game entry teaser */}
        <GamePreview />

        {/* Leaderboard preview (future feature) */}
        <LeaderboardCard />
      </div>
    </div>
  );
}
