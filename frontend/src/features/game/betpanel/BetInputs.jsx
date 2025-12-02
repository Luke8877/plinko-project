/**
 * Mode + betting inputs to size wagers.
 * Handles null-safe formatting + caps pigs at max of 5.
 * Allows empty (cleared) inputs while typing.
 */
export default function BetInputs({
  mode,
  onModeChange,
  totalBet,
  onTotalBetChange,
  pigCount,
  onPigCountChange,
  perPig,
  maxWin,
}) {
  const safePerPig =
    perPig !== null && !isNaN(perPig) ? perPig.toFixed(2) : '0.00';

  // Total Bet input change
  const handleTotalBetChange = (e) => {
    const val = e.target.value;
    if (val === '') return onTotalBetChange('');
    const num = Number(val);
    if (!isNaN(num) && num >= 0) onTotalBetChange(num);
  };

  // Pig count input
  const handlePigCountChange = (e) => {
    const val = e.target.value;
    if (val === '') return onPigCountChange('');
    const num = Number.parseInt(val);
    if (!isNaN(num)) onPigCountChange(Math.min(5, Math.max(1, num)));
  };

  return (
    <>
      {/* Section title */}
      <h2 className="text-lg font-semibold text-slate-200 mb-2">
        Bet Settings
      </h2>

      {/* Mode */}
      <label className="text-slate-300 mb-[-3px] mt-2 block">Mode</label>
      <select
        className="mb-3 bg-slate-900 border border-slate-600 text-slate-100 text-sm rounded-lg px-3 py-2 outline-none"
        value={mode}
        onChange={(e) => onModeChange(e.target.value)}
      >
        <option value="Ante Up">Ante Up</option>
        <option value="Weekend Gambler">Weekend Gambler</option>
        <option value="High Roller">High Roller</option>
      </select>

      {/* Total Bet */}
      <label className="text-slate-300 mb-[-3px] mt-2 block">Total Bet</label>
      <input
        type="number"
        min="0"
        inputMode="numeric"
        className="mb-1 bg-slate-900 border border-slate-600 text-slate-100 text-sm rounded-lg px-3 py-2 outline-none"
        value={totalBet === 0 || totalBet ? totalBet : ''}
        onChange={handleTotalBetChange}
        onWheel={(e) => e.target.blur()}
      />

      {/* Max Win */}
      {maxWin !== null && (
        <p className="text-xs text-amber-300 font-semibold mb-2 ml-[1px]">
          Max Win: ${Number(maxWin).toFixed(2)}
        </p>
      )}

      {/* Pig Count */}
      <label className="text-slate-300 mb-[-3px] mt-3 block">
        Number of Pigs
      </label>
      <input
        type="number"
        min="1"
        max="5"
        inputMode="numeric"
        className="mb-2 bg-slate-900 border border-slate-600 text-slate-100 text-sm rounded-lg px-3 py-2 outline-none"
        value={pigCount === 0 || pigCount ? pigCount : ''}
        onChange={handlePigCountChange}
        onWheel={(e) => e.target.blur()}
      />

      {/* Per-Pig Cost display */}
      <p className="text-[11px] text-slate-400 mt-1 ml-[1px]">
        Individual pig value:{' '}
        <span className="text-slate-200 font-semibold">${safePerPig}</span>
      </p>
    </>
  );
}
