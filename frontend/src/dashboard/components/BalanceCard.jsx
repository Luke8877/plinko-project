import { useEffect } from 'react';
import authService from '@services/authService';
import { useBalance } from '@context/BalanceContext';

import WelcomeCard from '../components/WelcomeCard';
import StatsCard from '../components/StatsCard';
import BalanceCard from '../components/BalanceCard';
import GamePreview from '../components/GamePreview';
import LeaderboardCard from '../components/LeaderboardCard';
import CornerPig from '@shared/components/CornerPig.jsx';
import FloatingPig from '@/shared/components/FloatingPig';

export default function DashboardPage() {
  const { setBalance } = useBalance();

  useEffect(() => {
    async function loadReport() {
      try {
        const data = await authService.getReport();
        setBalance(data.balance); // ⬅ Update global balance
        // StatsCard will later read additional stats
      } catch (err) {
        console.error('Failed to load dashboard data:', err);
      }
    }
    loadReport();
  }, [setBalance]);

  return (
    <div className="min-h-screen bg-surfaceDark text-white flex items-center justify-center px-6">
      {/* corner pigs */}
      <CornerPig topRight bottomLeft />

      {/* floating pigs */}
      <FloatingPig size={90} />

      <div className="grid grid-cols-3 grid-rows-[180px_380px] gap-6 max-w-7xl w-full">
        <WelcomeCard />
        <StatsCard />
        <BalanceCard />
        <GamePreview />
        <LeaderboardCard />
      </div>
    </div>
  );
}
