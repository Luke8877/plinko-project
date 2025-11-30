/**
 * BetPanel (Container)
 *
 * Delegates UI to: BetHeader, BetInputs, BetActions
 * Holds absolutely no rendering logic specific to fields or buttons.
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
  maxProfit,
  isAutoRunning,
  onManualDrop,
  onToggleAuto,
}) {
  const perPig = pigCount > 0 ? Number((totalBet / pigCount).toFixed(2)) : 0;

  return (
    <div className="bg-cardDark rounded-xl border border-brandPink/30 h-full flex flex-col p-6">
      <BetHeader balance={balance} maxProfit={maxProfit} />

      <BetInputs
        mode={mode}
        onModeChange={onModeChange}
        totalBet={totalBet}
        onTotalBetChange={onTotalBetChange}
        pigCount={pigCount}
        onPigCountChange={onPigCountChange}
        perPig={perPig}
      />

      <BetActions
        isAutoRunning={isAutoRunning}
        onManualDrop={onManualDrop}
        onToggleAuto={onToggleAuto}
      />
    </div>
  );
}
