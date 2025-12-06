/**
 * BalanceCard Component
 * ---------------------------------------------------------
 * Displays the authenticated user's current balance
 * in a highly visible, card-based UI block on the dashboard.
 *
 * Behaviour:
 * • Shows formatted balance from props when available
 * • Fails gracefully with placeholder text while loading
 *
 * Data Source:
 * • Balance retrieved from backend API (DashboardPage logic)
 */

import BaseCard from './BaseCard';

/**
 * A lightweight presentational component — relies on the
 * parent (DashboardPage) for fetching and state management.
 */
export default function BalanceCard({ balance }) {
  // Prettify currency or show placeholder if not yet loaded
  const formattedBalance =
    balance !== undefined ? `$${balance.toLocaleString()}` : '$----';

  return (
    <BaseCard className="row-start-1 col-start-3 relative overflow-hidden">
      {/* Section label */}
      <h2 className="text-xl font-semibold text-brandPink mb-2">Balance</h2>

      {/* Formatted user currency */}
      <p className="text-4xl font-bold text-brandPink mb-1">
        {formattedBalance}
      </p>
    </BaseCard>
  );
}
