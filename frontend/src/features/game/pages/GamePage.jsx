/**
 * GamePage
 * -------------------------------------------------------------
 * Top-level gameplay container responsible for:
 * - Managing game economy (balance, bets)
 * - Triggering pig drops (manual + auto waves)
 * - Calculating payouts when pigs land in slots
 * - Passing scoring events to GameBoard for popup display
 * - Rendering board + betting UI layout
 */

import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import GameBoard from '../components/GameBoard';
import BetPanel from '../betpanel/BetPanel';

export default function GamePage() {
  const navigate = useNavigate();
  const boardRef = useRef(null); // Expose dropBatch() from GameBoard

  // Betting configuration
  const [mode, setMode] = useState('Ante Up');
  const [totalBet, setTotalBet] = useState(100); // Total for the wave
  const [pigCount, setPigCount] = useState(1); // Number of pigs in batch

  // Last pig landing info (drives popup animation in GameBoard)
  const [lastImpact, setLastImpact] = useState(null);

  // Player account balance
  const [balance, setBalance] = useState(1000);

  // Auto runs waves repeatedly until user stops OR balance too low
  const [isAutoRunning, setIsAutoRunning] = useState(false);

  /**
   * Stores the freshest balance value so auto mode does not use stale closures.
   */
  const balanceRef = useRef(balance);
  useEffect(() => {
    balanceRef.current = balance;
  }, [balance]);

  /**
   * Called when physics engine reports a pig has landed in a scoring slot.
   *
   * Money flow rules:
   * - We already charged totalBet once at wave start
   * - Each pig "returns" payout = perPig * multiplier
   * - perPig = totalBet / pigCount (locked in at wave start)
   *
   * Example (1 pig):
   *   balance = 898, totalBet = 100
   *   at drop: balance -> 798
   *   hit 1x: payout = 100 * 1 = 100 → balance -> 898 (break even)
   *   hit 3.5x: payout = 100 * 3.5 = 350 → balance -> 1,148 (+250 profit)
   */
  const handleSlotResolved = (slotIndex, multiplier) => {
    // Guard against invalid config
    if (pigCount <= 0 || totalBet <= 0) return;

    // Lock in per-pig stake based on current wave settings
    const perPig = totalBet / pigCount;

    // Amount returned to wallet for this pig
    const payout = perPig * multiplier;

    // Net result vs. stake (for popup display only)
    const net = payout - perPig;

    // 💰 Update balance: we already removed totalBet up front,
    // so here we return the full payout for this pig.
    setBalance((prev) => Number((prev + payout).toFixed(2)));

    // 🎇 Drive popup animation in GameBoard via lastImpact
    setLastImpact({
      slotIndex,
      multiplier,
      perPig: Number(perPig.toFixed(2)),
      payout: Number(payout.toFixed(2)),
      net: Number(net.toFixed(2)),
      id: Date.now(), // ensures unique popup instance
    });
  };

  /**
   * Manual single-wave drop
   */
  const handleManualDrop = () => {
    if (!boardRef.current) return;
    if (totalBet <= 0 || pigCount <= 0) return;
    if (totalBet > balanceRef.current) return; // insufficient funds

    // Charge bet
    setBalance((prev) => prev - totalBet);

    // Trigger physics engine pig drops
    boardRef.current.dropBatch?.(pigCount);
  };

  /**
   * Auto play loop:
   * - Pays bet for each wave
   * - Drops pigs
   * - Stops if broke or invalid config
   */
  useEffect(() => {
    if (!isAutoRunning || !boardRef.current) return;

    let cancelled = false;

    const runWave = () => {
      if (cancelled) return;

      // Stop if invalid config
      if (pigCount <= 0 || totalBet <= 0) {
        setIsAutoRunning(false);
        return;
      }

      // Stop if insufficient funds
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

      // Drop pigs
      boardRef.current.dropBatch?.(pigCount);

      // Schedule next wave
      setTimeout(runWave, 900);
    };

    runWave();

    // Cleanup if auto mode cancelled mid-wave
    return () => (cancelled = true);
  }, [isAutoRunning, pigCount, totalBet]);

  return (
    <div className="w-screen h-screen bg-surfaceDark text-slate-100 p-6 flex flex-col">
      {/* Page Title */}
      <div className="text-center mb-4">
        <h1 className="text-4xl font-bold text-brandPink">PlinkOink Game</h1>
      </div>

      {/* Main Layout: Bet Panel + Game Board */}
      <div className="flex flex-1 gap-6 overflow-hidden">
        {/* Betting Controls */}
        <div className="w-[28%] min-w-[300px]">
          <BetPanel
            mode={mode}
            onModeChange={setMode}
            totalBet={totalBet}
            onTotalBetChange={setTotalBet}
            pigCount={pigCount}
            onPigCountChange={setPigCount}
            balance={balance}
            isAutoRunning={isAutoRunning}
            onManualDrop={handleManualDrop}
            onToggleAuto={() => setIsAutoRunning((prev) => !prev)}
          />
        </div>

        {/* Physics Game Board */}
        <div className="flex-1 bg-cardDark rounded-xl border border-brandPink/30 p-4 flex justify-center items-center">
          <div className="relative w-full max-w-[1000px] aspect-[5/4]">
            <GameBoard
              ref={boardRef}
              mode={mode}
              lastImpact={lastImpact}
              onSlotResolved={handleSlotResolved}
            />
          </div>
        </div>
      </div>

      {/* Return Navigation */}
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
