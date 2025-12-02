import BaseCard from './BaseCard';
import PigMascot from '@shared/components/PigMascot';

export default function LeaderboardCard() {
  return (
    <BaseCard className="row-start-2 col-start-3 relative overflow-hidden">
      <h2 className="text-xl font-semibold text-brandPink mb-2">Leaderboard</h2>

      <p className="opacity-70 mb-4">Coming Soon!</p>

      <PigMascot
        size={50}
        className="absolute bottom-[-10px] center opacity-80 "
      />
    </BaseCard>
  );
}
