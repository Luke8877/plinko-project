/**
 * BetPanel Component
 * -------------------------------------------------------------
 * High-level orchestrator for all betting UI controls:
 * • Displays player's balance + Add Funds CTA
 * • Configures wager inputs (mode, total bet, pig count)
 * • Executes primary bet action (manual or auto)
 *
 * Data + Logic Handling:
 * • Computes per-pig wager (sanitized numeric value)
 * • Computes potential maximum win based on highest multiplier
 * • Delegates state updates + backend sync to GamePage parent
 *
 * Layout:
 * • Full-height card aligned beside physics board in GamePage
 */

import BetHeader from './BetHeader.jsx';
import BetInputs from './BetInputs.jsx';
import BetActions from './BetActions.jsx';

export default function BetPanel({
  mode,
  onModeChange,
  totalBet,
  onTotalBetChange,
  pigCount,
  onPigCountChange,
  balance,
  isAutoMode,
  onToggleMode,
  isAutoRunning,
  onPlaceBet,
  onAddFunds,
  multipliers = [],
}) {
  /**
   * Per-Pig Calculation
   * • Prevent division by zero while typing pig input
   */
  const perPig = pigCount > 0 ? Number((totalBet / pigCount).toFixed(2)) : 0;

  /**
   * Highest multiplier for game mode
   * • Used to compute projected max payout
   */
  const highestMultiplier =
    multipliers.length > 0 ? Math.max(...multipliers) : 0;

  /**
   * Estimated Maximum Win
   * • Helps users understand wagering impact
   */
  const maxWin =
    pigCount > 0
      ? Number((perPig * highestMultiplier * pigCount).toFixed(2))
      : 0;

  return (
    <div className="bg-cardDark rounded-xl border border-brandPink/30 h-full flex flex-col p-5 gap-4">
      {/* Top section: balance + add funds */}
      <BetHeader balance={balance} onAddFunds={onAddFunds} />

      {/* Middle: mode + bet configuration */}
      <BetInputs
        mode={mode}
        onModeChange={onModeChange}
        totalBet={totalBet}
        onTotalBetChange={onTotalBetChange}
        pigCount={pigCount}
        onPigCountChange={onPigCountChange}
        perPig={perPig}
        maxWin={maxWin}
      />

      {/* Bottom: primary betting action */}
      <BetActions
        isAutoMode={isAutoMode}
        onToggleMode={onToggleMode}
        isAutoRunning={isAutoRunning}
        onPlaceBet={onPlaceBet}
        balance={balance}
        totalBet={totalBet}
        pigCount={pigCount}
      />
    </div>
  );
}
