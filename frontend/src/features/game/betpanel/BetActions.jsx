/**
 * BetActions Component
 * ---------------------------------------------------------
 * Handles PlinkOink gameplay controls:
 * • Mode switching (Manual vs Auto)
 * • Primary betting action button
 *
 * UX Logic:
 * • Disable bet button when bet is invalid (insufficient balance,
 *   zero pigs, zero bet value, etc.)
 * • In Auto mode, the button becomes a Start/Stop toggle
 * • Even if balance is low, users must ALWAYS be able to stop Auto
 *
 * Parent: GamePage → manages state + backend sync
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
  /**
   * Determine if betting action should be blocked:
   * - Manual mode: require valid bet + pigs + >= balance
   * - Auto mode: require valid bet to start, but NOT required to stop
   */
  const isInvalid =
    totalBet <= 0 ||
    pigCount <= 0 ||
    balance < totalBet ||
    (!isAutoRunning && isAutoMode && balance < totalBet);

  return (
    <div className="mt-auto space-y-5">
      {/* Betting Mode Toggle */}
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

      {/* Primary Action:
         - Manual: Place Bet
         - Auto Mode: Start/Stop automated sessions */}
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
