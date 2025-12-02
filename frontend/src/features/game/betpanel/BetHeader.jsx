/**
 * Displays current bankroll + Add Funds button.
 */
export default function BetHeader({ balance, onAddFunds }) {
  const safeBalance =
    balance !== null && balance !== undefined ? balance.toFixed(2) : '...';

  return (
    <div className="text-xs text-slate-300 mb-4">
      {/* Balance */}
      <span>
        Balance:{' '}
        <span className="text-emerald-300 font-semibold">${safeBalance}</span>
      </span>

      {/* Add Funds Button under Balance */}
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
