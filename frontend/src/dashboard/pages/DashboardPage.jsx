/**
 * Dashboard Page
 * --------------------------------------------------
 * Main authenticated landing screen.
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
  const [report, setReport] = useState(null);

  useEffect(() => {
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
      {/* Background */}
      <CornerPig topRight bottomLeft />
      <FloatingPig size={90} />

      {/* Dashboard Grid */}
      <div className="grid grid-cols-3 grid-rows-[180px_380px] gap-6 max-w-7xl w-full z-10">
        <WelcomeCard />
        <StatsCard report={report} />
        <BalanceCard balance={report?.balance} />
        <GamePreview />
        <LeaderboardCard />
      </div>
    </div>
  );
}
