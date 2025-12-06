/**
 * BetHeader Component
 * ---------------------------------------------------------
 * Displays the player's current balance above the betting panel.
 * Also includes an optional action to add funds, enabling quick
 * economy recovery during gameplay testing.
 *
 * Behavior:
 * • Shows currency formatted to 2 decimals when available
 * • Gracefully displays placeholder (...) while loading balance
 * • Conditionally renders "Add Funds" button only if callback is provided
 *
 * Parent: GamePage — controls actual balance update logic
 */

export default function BetHeader({ balance, onAddFunds }) {
  // Format balance safely when data is not yet loaded
  const safeBalance =
    balance !== null && balance !== undefined ? balance.toFixed(2) : '...';

  return (
    <div className="text-xs text-slate-300 mb-4">
      {/* Visible balance display */}
      <span>
        Balance:{' '}
        <span className="text-emerald-300 font-semibold">${safeBalance}</span>
      </span>

      {/* Optional "Add Funds" call-to-action */}
      {onAddFunds && (
        <div className="mt-1">
          <button
            onClick={onAddFunds}
            className="text-brandPink underline hover:text-pink-400 transition"
          >
            + Add Funds
          </button>
        </div>
      )}
    </div>
  );
}
