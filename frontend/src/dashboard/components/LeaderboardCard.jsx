/**
 * LeaderboardCard Component
 * ---------------------------------------------------------
 * Placeholder UI for future leaderboard integration.
 * Keeps dashboard layout complete while signaling
 * upcoming competitive and social features.
 *
 * Future Expansion:
 * • Fetch top players from /api/leaderboard
 * • Display usernames, balances, ranking visuals, etc.
 */

import BaseCard from './BaseCard';
import PigMascot from '@shared/components/PigMascot';

/**
 * Presentational-only for MVP — no backend connection yet.
 */
export default function LeaderboardCard() {
  return (
    <BaseCard className="row-start-2 col-start-3 relative overflow-hidden">
      {/* Section heading */}
      <h2 className="text-xl font-semibold text-brandPink mb-2">Leaderboard</h2>

      {/* Coming soon placeholder */}
      <p className="opacity-70 mb-4">Coming Soon!</p>

      {/* Decorative pig mascot for brand theme consistency */}
      <PigMascot
        size={50}
        className="absolute bottom-[-10px] left-1/2 -translate-x-1/2 opacity-80"
      />
    </BaseCard>
  );
}
