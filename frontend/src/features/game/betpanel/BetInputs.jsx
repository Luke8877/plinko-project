/**
 * BetInputs Component
 * ---------------------------------------------------------
 * Configures wager values for gameplay:
 * • Select betting mode (theme-based UI choices)
 * • Set total wager amount
 * • Set number of pigs (1 to 5)
 * • Display per-pig breakdown for clarity
 *
 * UX + Validation Rules:
 * • Inputs allow clearing to avoid “jumping cursor” issues
 * • Pigs are clamped between 1–5 for stable game visuals
 * • Prevents negative values + safely formats numbers
 * • Max win is shown if calculated by parent GamePage
 *
 * All state management is delegated to the parent component,
 * keeping this component purely presentational + controlled.
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
  // Format numeric value or fallback placeholder
  const safePerPig =
    perPig !== null && !isNaN(perPig) ? perPig.toFixed(2) : '0.00';

  /**
   * Total Bet input handler
   * • Allows user to temporarily clear input while typing
   * • Accepts only non-negative valid numbers
   */
  const handleTotalBetChange = (e) => {
    const val = e.target.value;
    if (val === '') return onTotalBetChange('');
    const num = Number(val);
    if (!isNaN(num) && num >= 0) onTotalBetChange(num);
  };

  /**
   * Pig Count input handler
   * • Sanitizes user input to always stay within 1–5
   * • Prevents invalid gameplay states
   */
  const handlePigCountChange = (e) => {
    const val = e.target.value;
    if (val === '') return onPigCountChange('');
    const num = Number.parseInt(val);
    if (!isNaN(num)) onPigCountChange(Math.min(5, Math.max(1, num)));
  };

  return (
    <>
      {/* Section Title */}
      <h2 className="text-lg font-semibold text-slate-200 mb-2">
        Bet Settings
      </h2>

      {/* Betting mode selection */}
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

      {/* Total Bet Input */}
      <label className="text-slate-300 mb-[-3px] mt-2 block">Total Bet</label>
      <input
        type="number"
        min="0"
        inputMode="numeric"
        className="mb-1 bg-slate-900 border border-slate-600 text-slate-100 text-sm rounded-lg px-3 py-2 outline-none"
        value={totalBet === 0 || totalBet ? totalBet : ''}
        onChange={handleTotalBetChange}
        onWheel={(e) => e.target.blur()} // Prevent accidental scroll changes
      />

      {/* Max win preview (if provided by parent) */}
      {maxWin !== null && (
        <p className="text-xs text-amber-300 font-semibold mb-2 ml-[1px]">
          Max Win: ${Number(maxWin).toFixed(2)}
        </p>
      )}

      {/* Pig Count Input */}
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

      {/* Per-pig breakdown for clarity */}
      <p className="text-[11px] text-slate-400 mt-1 ml-[1px]">
        Individual pig value:{' '}
        <span className="text-slate-200 font-semibold">${safePerPig}</span>
      </p>
    </>
  );
}
