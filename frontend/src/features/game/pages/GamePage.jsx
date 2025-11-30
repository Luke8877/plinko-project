import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import GameBoard from '../components/GameBoard';
import BetPanel from '../betpanel/BetPanel';

/**
 * Top-level gameplay container.
 *
 * Responsibilities:
 * - Manage game economy (balance, total bet, pig count)
 * - Handle scoring updates via callback from GameBoard
 * - Control manual + automated betting loops
 * - Render betting UI beside interactive physics board
 */
export default function GamePage() {
  const navigate = useNavigate();
  const boardRef = useRef(null); // access GameBoard's dropBatch API

  // Betting configuration
  const [mode, setMode] = useState('Ante Up');
  const [totalBet, setTotalBet] = useState(100);
  const [pigCount, setPigCount] = useState(1);

  // Last scored pig (drives popup animation in GameBoard)
  const [lastImpact, setLastImpact] = useState(null);

  // Game economy
  const [balance, setBalance] = useState(1000);
  const [maxProfit, setMaxProfit] = useState(0);

  // Automated “waves” of bets
  const [isAutoRunning, setIsAutoRunning] = useState(false);

  // Prevent stale closure inside auto betting loop
  const balanceRef = useRef(balance);
  useEffect(() => {
    balanceRef.current = balance;
  }, [balance]);

  const perPig = pigCount > 0 ? totalBet / pigCount : 0;

  /**
   * Called when a pig lands & scoring is resolved by the physics engine.
   */
  const handleSlotResolved = (slotIndex, multiplier) => {
    if (perPig <= 0) return;

    const payout = perPig * multiplier;
    const profit = payout - perPig;

    setBalance((prev) => prev + profit);
    setMaxProfit((prev) => Math.max(prev, profit));

    setLastImpact({
      slotIndex,
      profit,
      id: Date.now(), // used to animate unique popup events
    });
  };

  /**
   * Single manual drop = one batch of pigs
   */
  const handleManualDrop = () => {
    if (!boardRef.current) return;
    if (pigCount <= 0 || totalBet <= 0) return;
    if (totalBet > balanceRef.current) return; // insufficient funds

    setBalance((prev) => prev - totalBet);
    boardRef.current.dropBatch?.(pigCount);
  };

  /**
   * Auto: sequential waves of pigs
   * Stops automatically when out of balance or invalid bet
   */
  useEffect(() => {
    if (!isAutoRunning || !boardRef.current) return;

    let cancelled = false;

    const runWave = () => {
      if (cancelled) return;

      if (pigCount <= 0 || totalBet <= 0) {
        setIsAutoRunning(false);
        return;
      }

      // Stop if player is broke
      if (balanceRef.current < totalBet) {
        setIsAutoRunning(false);
        return;
      }

      // Charge bet
      setBalance((prev) => {
        const next = prev - totalBet;
        balanceRef.current = next;
        return next;
      });

      // Drop pigs into physics world
      boardRef.current.dropBatch?.(pigCount);

      // Schedule next wave (tweak drop speed here)
      setTimeout(runWave, 900);
    };

    runWave();
    return () => (cancelled = true);
  }, [isAutoRunning, pigCount, totalBet]);

  const handleToggleAuto = () => {
    setIsAutoRunning((prev) => !prev);
  };

  return (
    <div className="w-screen h-screen bg-surfaceDark text-slate-100 p-6 flex flex-col">
      {/* Header */}
      <div className="text-center mb-4">
        <h1 className="text-4xl font-bold text-brandPink flex gap-2 items-center justify-center">
          PlinkOink Game
        </h1>
      </div>

      {/* Main layout */}
      <div className="flex flex-1 gap-6 overflow-hidden">
        {/* LEFT: Betting controls */}
        <div className="w-[28%] min-w-[300px]">
          <BetPanel
            mode={mode}
            onModeChange={setMode}
            totalBet={totalBet}
            onTotalBetChange={setTotalBet}
            pigCount={pigCount}
            onPigCountChange={setPigCount}
            balance={balance}
            maxProfit={maxProfit}
            isAutoRunning={isAutoRunning}
            onManualDrop={handleManualDrop}
            onToggleAuto={handleToggleAuto}
          />
        </div>

        {/* RIGHT: Physics game board */}
        <div className="flex-1 bg-cardDark rounded-xl border border-brandPink/30 p-4 flex justify-center items-center">
          <div className="relative w-full max-w-[1000px] aspect-[5/4]">
            <GameBoard
              ref={boardRef}
              mode={mode}
              onSlotResolved={handleSlotResolved}
              lastImpact={lastImpact}
            />
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="text-center mt-4">
        <button
          className="text-brandPink text-sm underline"
          onClick={() => navigate('/dashboard')}
        >
          Back to Dashboard
        </button>
      </div>
    </div>
  );
}
