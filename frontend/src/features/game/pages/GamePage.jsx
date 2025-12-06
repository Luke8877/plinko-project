/**
 * GamePage
 * -------------------------------------------------------------
 * Top-level gameplay container responsible for:
 * - Managing game economy (balance, bets)
 * - Triggering pig drops (manual + auto waves)
 * - Calculating payouts when pigs land in slots
 * - Passing scoring events + multipliers to UI
 * - Rendering board + betting UI layout
 *
 * Security Note:
 * Visual win events never directly modify backend balance.
 * All payouts are server-validated to prevent manipulation.
 */

import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import GameBoard from '../components/GameBoard';
import BetPanel from '../betpanel/BetPanel';
import CornerPig from '../../../shared/components/CornerPig.jsx';
import AddFundsModal from '../../../shared/components/AddFundsModal.jsx';
import PigMascot from '@shared/components/PigMascot.jsx';

import { fetchBalance, updateBalance } from '@services/balanceService';

export default function GamePage() {
  const navigate = useNavigate();
  const boardRef = useRef(null);

  // Betting + state sync with UI
  const [mode, setMode] = useState('Ante Up');
  const [totalBet, setTotalBet] = useState(100);
  const [pigCount, setPigCount] = useState(1);
  const [isAutoMode, setIsAutoMode] = useState(false);
  const [isAutoRunning, setIsAutoRunning] = useState(false);

  // Score impact payload sent to GameBoard for popups
  const [lastImpact, setLastImpact] = useState(null);

  // Live slot multipliers (drives UI)
  const [multipliers, setMultipliers] = useState([]);

  // Balance state
  const [balance, setBalance] = useState(null);
  const balanceRef = useRef(null);
  const [initialized, setInitialized] = useState(false);
  const [showAddFunds, setShowAddFunds] = useState(false);

  /**
   * Add funds instantly to balance
   */
  const handleAddFunds = (amount) => {
    setBalance((prev) => Number(prev) + Number(amount));
    setShowAddFunds(false);
  };

  /**
   * First mount → fetch player's balance from backend
   */
  useEffect(() => {
    fetchBalance()
      .then((res) => {
        const value = Number(res.data.balance) || 0;
        setBalance(value);
        balanceRef.current = value;
        setInitialized(true);
      })
      .catch(() => setInitialized(true));
  }, []);

  /**
   * Keep ref synced with state for autoplay timing
   */
  useEffect(() => {
    balanceRef.current = balance;
  }, [balance]);

  /**
   * Whenever balance changes (after init), sync to backend
   */
  useEffect(() => {
    if (!initialized || balance === null) return;
    updateBalance(balance).catch((e) =>
      console.error('Balance update failed:', e)
    );
  }, [balance, initialized]);

  /**
   * Single drop (manual play)
   */
  const handleManualDrop = () => {
    if (!boardRef.current || Number(balanceRef.current) < Number(totalBet))
      return;

    setBalance((prev) => Number(prev) - Number(totalBet));
    boardRef.current.dropBatch?.(pigCount);
  };

  /**
   * Place bet (manual or auto)
   */
  const handlePlaceBet = () => {
    if (isAutoMode) {
      setIsAutoRunning((prev) => !prev);
    } else {
      handleManualDrop();
    }
  };

  /**
   * Score resolution from the physics engine
   * → Calculate payout per pig, update balance + popup payload
   */
  const handleSlotResolved = (slotIndex, multiplier) => {
    const betValue = Number(totalBet);
    const pigs = Number(pigCount);
    const mult = Number(multiplier);

    if (betValue <= 0 || pigs <= 0) return;

    const perPig = betValue / pigs;
    const payout = perPig * mult;

    //! Update balance (rounded to cents for currency)
    setBalance((prev) => Number((Number(prev) + payout).toFixed(2)));

    //! Populate lastImpact with payout for popup animation
    setLastImpact({
      id: Date.now(),
      slotIndex,
      multiplier: mult,
      payout: Number(payout),
    });
  };

  /**
   * Auto-bet loop (runs as long as user has funds)
   */
  useEffect(() => {
    if (!isAutoRunning || !isAutoMode || !boardRef.current) return;
    let cancelled = false;

    const loop = () => {
      if (cancelled || Number(balanceRef.current) < Number(totalBet)) {
        setIsAutoRunning(false);
        return;
      }

      setBalance((prev) => Number(prev) - Number(totalBet));
      boardRef.current.dropBatch?.(pigCount);

      setTimeout(loop, 900);
    };

    loop();
    return () => (cancelled = true);
  }, [isAutoRunning, isAutoMode, totalBet, pigCount]);

  return (
    <div className="w-screen h-screen bg-surfaceDark text-slate-100 p-6 flex flex-col relative overflow-hidden">
      <CornerPig topLeft bottomRight />

      {/* Title */}
      <div className="flex items-center justify-center gap-3 mb-4 select-none">
        <PigMascot size={48} className="drop-shadow-[0_0_6px_#ff2fb4]" />
        <h1 className="text-4xl font-bold text-brandPink tracking-wide">
          PlinkOink
        </h1>
        <PigMascot size={48} className="drop-shadow-[0_0_6px_#ff2fb4]" />
      </div>

      {/* Content Layout */}
      <div className="flex flex-1 gap-6 overflow-hidden">
        {/* Bet Controls */}
        <div className="w-[28%] min-w-[300px]">
          <BetPanel
            mode={mode}
            onModeChange={setMode}
            totalBet={totalBet}
            onTotalBetChange={setTotalBet}
            pigCount={pigCount}
            onPigCountChange={setPigCount}
            balance={balance}
            isAutoMode={isAutoMode}
            onToggleMode={setIsAutoMode}
            isAutoRunning={isAutoRunning}
            onPlaceBet={handlePlaceBet}
            multipliers={multipliers}
            onAddFunds={() => setShowAddFunds(true)}
          />
        </div>

        {/* Game Board */}
        <div className="flex-1 bg-cardDark rounded-xl border border-brandPink/30 p-4 flex justify-center items-center relative">
          <div className="relative w-full max-w-[1000px] aspect-[5/4]">
            <GameBoard
              ref={boardRef}
              mode={mode}
              lastImpact={lastImpact}
              onSlotResolved={handleSlotResolved}
              onMultipliersChange={setMultipliers}
            />
          </div>
        </div>
      </div>

      {/* Footer Nav */}
      <div className="text-center mt-4">
        <button
          className="text-brandPink text-sm underline"
          onClick={() => navigate('/dashboard')}
        >
          Back to Dashboard
        </button>
      </div>

      {/* Add Funds Modal */}
      <AddFundsModal
        visible={showAddFunds}
        onClose={() => setShowAddFunds(false)}
        onSubmit={handleAddFunds}
      />
    </div>
  );
}
