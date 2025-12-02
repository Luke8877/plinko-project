import BaseCard from './BaseCard';
import PigMascot from '@shared/components/PigMascot';

export default function StatsCard() {
  return (
    <BaseCard className="row-start-1 col-start-2 relative overflow-hidden">
      <h2 className="text-xl font-semibold text-brandPink mb-2">Stats</h2>

      <p className="opacity-70 mb-4">Coming soon!</p>

      <PigMascot
        size={45}
        className="absolute top-[-8px] center-2 opacity-80 rotate-[-180deg]"
      />
    </BaseCard>
  );
}
