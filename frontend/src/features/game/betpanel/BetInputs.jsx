/**
 * Mode + betting inputs to size wagers.
 */
export default function BetInputs({
  mode,
  onModeChange,
  totalBet,
  onTotalBetChange,
  pigCount,
  onPigCountChange,
  perPig,
}) {
  return (
    <>
      <h2 className="text-lg font-semibold text-slate-200 mb-4">
        Bet Settings
      </h2>

      {/* Mode */}
      <label className="text-xs text-slate-300 mb-1">Mode</label>
      <select
        className="mb-4 bg-slate-900 border border-slate-600 text-slate-100 text-sm rounded-lg px-3 py-2 outline-none"
        value={mode}
        onChange={(e) => onModeChange(e.target.value)}
      >
        <option value="Ante Up">Ante Up</option>
        <option value="Weekend Gambler">Weekend Gambler</option>
        <option value="High Roller">High Roller</option>
      </select>

      {/* Total Bet */}
      <label className="text-xs text-slate-300 mb-1">Total Bet</label>
      <input
        type="number"
        min="0"
        className="mb-4 bg-slate-900 border border-slate-600 text-slate-100 text-sm rounded-lg px-3 py-2 outline-none"
        value={totalBet}
        onChange={(e) => onTotalBetChange(Number(e.target.value) || 0)}
      />

      {/* Pigs */}
      <label className="text-xs text-slate-300 mb-1"># of Pigs</label>
      <input
        type="number"
        min="1"
        className="mb-2 bg-slate-900 border border-slate-600 text-slate-100 text-sm rounded-lg px-3 py-2 outline-none"
        value={pigCount}
        onChange={(e) =>
          onPigCountChange(
            Math.max(1, Number.parseInt(e.target.value || '1', 10))
          )
        }
      />

      {/* Per-pig cost hint */}
      <p className="text-[11px] text-slate-400 mb-6">
        Each pig costs{' '}
        <span className="text-slate-200 font-semibold">
          {perPig.toFixed(2)}
        </span>
        .
      </p>
    </>
  );
}
