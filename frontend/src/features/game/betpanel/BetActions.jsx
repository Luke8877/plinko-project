/**
 * Betting interaction controls
 * --------------------------------------------
 * - Mode toggle: Manual vs Auto
 * - Primary action: Place Bet (drop pigs or toggle auto)
 */
export default function BetActions({
  isAutoMode,
  onToggleMode,
  isAutoRunning,
  onPlaceBet,
  balance,
  totalBet,
  pigCount,
}) {
  const isInvalid =
    totalBet <= 0 ||
    pigCount <= 0 ||
    balance < totalBet ||
    (!isAutoRunning && isAutoMode && balance < totalBet);
  // 📝 Auto running? Always allow stop button!

  return (
    <div className="mt-auto space-y-5">
      {/* Mode Toggle */}
      <div className="flex bg-slate-900 border border-brandPink/30 rounded-full p-1">
        <button
          onClick={() => onToggleMode(false)}
          className={`flex-1 py-2.5 rounded-full text-sm font-semibold transition-all
            ${
              !isAutoMode
                ? 'bg-brandPink text-black shadow-lg'
                : 'text-slate-300 hover:text-white'
            }
          `}
        >
          Manual
        </button>

        <button
          onClick={() => onToggleMode(true)}
          className={`flex-1 py-2.5 rounded-full text-sm font-semibold transition-all
            ${
              isAutoMode
                ? 'bg-emerald-500 text-black shadow-lg'
                : 'text-slate-300 hover:text-white'
            }
          `}
        >
          Auto
        </button>
      </div>

      {/* Primary Action */}
      <button
        onClick={onPlaceBet}
        disabled={isInvalid}
        className={`w-full py-3 rounded-xl font-bold text-base transition-transform shadow-glow
          ${
            isInvalid
              ? 'bg-gray-600 cursor-not-allowed opacity-40'
              : 'bg-brandPink hover:bg-brandPink/90 text-black hover:scale-[1.03]'
          }
        `}
      >
        {isAutoMode
          ? isAutoRunning
            ? 'Stop Auto'
            : 'Start Auto'
          : 'Place Bet'}
      </button>
    </div>
  );
}
