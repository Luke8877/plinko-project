/**
 * Manual and auto drop actions
 */
export default function BetActions({
  isAutoRunning,
  onManualDrop,
  onToggleAuto,
}) {
  return (
    <div className="mt-auto space-y-3">
      <button
        onClick={onManualDrop}
        className="w-full bg-brandPink text-black py-3 rounded-xl font-semibold text-sm hover:scale-[1.02] transition-transform disabled:opacity-40"
      >
        Manual Drop
      </button>

      <button
        onClick={onToggleAuto}
        className={`w-full py-3 rounded-xl font-semibold text-sm transition-transform hover:scale-[1.02] ${
          isAutoRunning
            ? 'bg-emerald-500 text-black'
            : 'bg-emerald-600 text-black'
        }`}
      >
        {isAutoRunning ? 'Stop Auto' : 'Auto'}
      </button>
    </div>
  );
}
