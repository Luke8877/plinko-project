/**
 * GamePage
 * -------------------------------------------------------------
 * Top-level gameplay container responsible for:
 * - Managing game economy (balance, bets)
 * - Triggering pig drops (manual + auto waves)
 * - Calculating payouts when pigs land in slots
 * - Passing scoring events + multipliers to UI
 * - Rendering board + betting UI layout
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

  // Betting / UI state
  const [mode, setMode] = useState('Ante Up');
  const [totalBet, setTotalBet] = useState(100);
  const [pigCount, setPigCount] = useState(1);
  const [isAutoMode, setIsAutoMode] = useState(false);
  const [isAutoRunning, setIsAutoRunning] = useState(false);
  const [lastImpact, setLastImpact] = useState(null);
  const [multipliers, setMultipliers] = useState([]);

  // Balance state
  const [balance, setBalance] = useState(null);
  const balanceRef = useRef(null);
  const [initialized, setInitialized] = useState(false);

  // Add Funds Modal visibility
  const [showAddFunds, setShowAddFunds] = useState(false);

  /**
   * Add funds to player balance
   */
  const handleAddFunds = (amount) => {
    setBalance((prev) => prev + amount);
    setShowAddFunds(false);
  };

  /**
   * First load: fetch backend balance
   */
  useEffect(() => {
    fetchBalance()
      .then((res) => {
        const value = res.data.balance ?? 0;
        setBalance(value);
        balanceRef.current = value;
        setInitialized(true);
      })
      .catch(() => setInitialized(true));
  }, []);

  /**
   * Keep reference synced to state
   */
  useEffect(() => {
    balanceRef.current = balance;
  }, [balance]);

  /**
   * Sync updated balance back to backend
   */
  useEffect(() => {
    if (!initialized || balance === null) return;
    updateBalance(balance).catch((e) =>
      console.error('Balance update failed:', e)
    );
  }, [balance, initialized]);

  /**
   * Manual / Single Drop
   */
  const handleManualDrop = () => {
    if (!boardRef.current || balanceRef.current < totalBet) return;
    setBalance((prev) => prev - totalBet);
    boardRef.current.dropBatch?.(pigCount);
  };

  /**
   * Auto play toggle
   */
  const handlePlaceBet = () => {
    if (isAutoMode) {
      setIsAutoRunning((prev) => !prev);
    } else {
      handleManualDrop();
    }
  };

  /**
   * Score resolution callback from physics engine
   */
  const handleSlotResolved = (slotIndex, multiplier) => {
    if (totalBet <= 0 || pigCount <= 0) return;
    const perPig = totalBet / pigCount;
    const payout = perPig * multiplier;
    setBalance((prev) => Number((prev + payout).toFixed(2)));
    setLastImpact({ slotIndex, multiplier, id: Date.now() });
  };

  // Auto drop loop
  useEffect(() => {
    if (!isAutoRunning || !isAutoMode || !boardRef.current) return;
    let cancelled = false;

    const run = () => {
      if (cancelled || balanceRef.current < totalBet) {
        setIsAutoRunning(false);
        return;
      }

      setBalance((prev) => prev - totalBet);
      boardRef.current.dropBatch?.(pigCount);

      setTimeout(run, 900);
    };

    run();
    return () => (cancelled = true);
  }, [isAutoRunning, isAutoMode, totalBet, pigCount]);

  return (
    <div className="w-screen h-screen bg-surfaceDark text-slate-100 p-6 flex flex-col relative overflow-hidden">
      {/* Decorative Pig Mascots */}
      <CornerPig topLeft bottomRight />

      {/* Title */}
      <div className="flex items-center justify-center gap-3 mb-4 select-none">
        <PigMascot size={48} className="drop-shadow-[0_0_6px_#ff2fb4]" />
        <h1 className="text-4xl font-bold text-brandPink tracking-wide">
          PlinkOink
        </h1>
        <PigMascot size={48} className="drop-shadow-[0_0_6px_#ff2fb4]" />
      </div>

      {/* Main Layout */}
      <div className="flex flex-1 gap-6 overflow-hidden">
        {/* Left Sidebar */}
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
            onAddFunds={() => setShowAddFunds(true)} // 🔥 Add Funds button support
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

      {/* Back navigation */}
      <div className="text-center mt-4">
        <button
          className="text-brandPink text-sm underline"
          onClick={() => navigate('/dashboard')}
        >
          Back to Dashboard
        </button>
      </div>

      {/* Modal Portal (Always Last) */}
      <AddFundsModal
        visible={showAddFunds}
        onClose={() => setShowAddFunds(false)}
        onSubmit={handleAddFunds}
      />
    </div>
  );
}
