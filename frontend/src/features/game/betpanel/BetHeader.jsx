/**
 * Displays current bankroll + largest recent win.
 */
export default function BetHeader({ balance, maxProfit }) {
  return (
    <div className="flex justify-between text-xs text-slate-300 mb-4">
      <span>
        Balance:{' '}
        <span className="text-emerald-300 font-semibold">
          {balance.toFixed(2)}
        </span>
      </span>

      <span>
        Max Win:{' '}
        <span className="text-amber-300 font-semibold">
          ${Number(maxProfit ?? 0).toFixed(2)}
        </span>
      </span>
    </div>
  );
}
