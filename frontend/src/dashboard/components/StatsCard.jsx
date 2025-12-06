/**
 * StatsCard Component
 * ---------------------------------------------------------
 * Placeholder for future player performance statistics.
 * Maintains complete dashboard layout while hinting at
 * deeper analytics to come.
 *
 * Future Expansion Ideas:
 * • Total pigs dropped
 * • Highest multiplier achieved
 * • Win/loss trends over time
 * • Graphical breakdown of recent sessions
 */

import BaseCard from './BaseCard';
import PigMascot from '@shared/components/PigMascot';

/**
 * MVP: purely visual placeholder without data fetching.
 */
export default function StatsCard() {
  return (
    <BaseCard className="row-start-1 col-start-2 relative overflow-hidden">
      {/* Section heading */}
      <h2 className="text-xl font-semibold text-brandPink mb-2">Stats</h2>

      {/* Placeholder text */}
      <p className="opacity-70 mb-4">Coming soon!</p>

      {/* Decorative pig  */}
      <PigMascot
        size={45}
        className="absolute top-[-8px] left-1/2 -translate-x-1/2 opacity-80 rotate-[-180deg]"
      />
    </BaseCard>
  );
}
