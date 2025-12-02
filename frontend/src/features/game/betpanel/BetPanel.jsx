/**
 * BetPanel (Container)
 * -------------------------------------------------------------
 * Holds and coordinates betting UI pieces:
 * - Displays balance + Add Funds button
 * - Bet entry inputs (amount + pig count)
 * - Primary "Place Bet" button
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
  const perPig = pigCount > 0 ? Number((totalBet / pigCount).toFixed(2)) : 0;

  const highestMultiplier =
    multipliers.length > 0 ? Math.max(...multipliers) : 0;

  const maxWin =
    pigCount > 0
      ? Number((perPig * highestMultiplier * pigCount).toFixed(2))
      : 0;

  return (
    <div className="bg-cardDark rounded-xl border border-brandPink/30 h-full flex flex-col p-5 gap-4">
      <BetHeader balance={balance} onAddFunds={onAddFunds} />

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
