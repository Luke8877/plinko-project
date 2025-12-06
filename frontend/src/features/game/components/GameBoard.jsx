import React, {
  useRef,
  useState,
  useEffect,
  useCallback,
  useImperativeHandle,
  forwardRef,
} from 'react';
import usePlinkoEngine from '../hooks/usePlinkoEngine';
import PigMascot from '../../../shared/components/PigMascot';

/**
 * GameBoard Component
 * ---------------------------------------------------------
 * Owns rendering + UI reactions to the Plinko physics engine.
 *
 * Responsibilities:
 * • Render pegs, falling pigs, and slot payoff labels
 * • Highlight winning slot upon pig landing
 * • Display payout popups for scored events
 * • Expose engine triggers (dropBatch) to GamePage through ref
 *
 * Important Architecture Note:
 * • Betting + balance logic stays in GamePage to enforce backend derivation
 * • GameBoard only visualizes results — prevents client-side cheating
 */

const GameBoard = forwardRef(function GameBoard(
  {
    mode,
    onSlotResolved, // Callback for GamePage to update payout + balance
    lastImpact, // Drives payout popup animation
    onMultipliersChange, // Pushes slot multipliers upward for UI calculations
  },
  ref
) {
  const boardRef = useRef(null);

  // Visual-only state managed in GameBoard
  const [highlightSlot, setHighlightSlot] = useState(null);
  const [popups, setPopups] = useState([]);

  /**
   * Handle scored event from Plinko Engine
   * • Receives slot + multiplier from physics
   * • Notifies GamePage to trigger payout changes
   * • Temporarily highlights slot for visual feedback
   */
  const handleScoreFromEngine = useCallback(
    (slotIndex, multiplier) => {
      setHighlightSlot(slotIndex);
      onSlotResolved?.(slotIndex, multiplier);

      setTimeout(() => setHighlightSlot(null), 400);
    },
    [onSlotResolved]
  );

  /**
   * Connect to custom Plinko engine hook
   * Returns current physics objects + dropBatch() input trigger
   */
  const { balls, pegs, slots, multipliers, dropBatch } = usePlinkoEngine(
    boardRef,
    mode,
    handleScoreFromEngine
  );

  /**
   * Emit updated multipliers to GamePage
   * Enables "Max Win" calculations to be fully backend-safe
   */
  useEffect(() => {
    if (!multipliers?.length) return;
    onMultipliersChange?.(multipliers);
  }, [multipliers, onMultipliersChange]);

  /**
   * Create animated score popups when a pig lands in a slot
   */
  useEffect(() => {
    if (!lastImpact || !boardRef.current || !slots.length) return;

    const { id, slotIndex, payout, multiplier } = lastImpact;

    const width = boardRef.current.clientWidth;
    const height = boardRef.current.clientHeight;
    const slotWidth = width / slots.length;

    const x = slotWidth * slotIndex + slotWidth / 2;
    const y = height - 60; // Slightly above slots

    // Add popup to UI state
    setPopups((prev) => [...prev, { id, x, y, payout, multiplier }]);

    // Auto-remove popup after fade animation
    const cleanup = setTimeout(() => {
      setPopups((prev) => prev.filter((p) => p.id !== id));
    }, 900);

    return () => clearTimeout(cleanup);
  }, [lastImpact, slots.length]);

  /**
   * Bridge imperative actions to parent
   * → GamePage can call:
   * boardRef.current.dropBatch(count)
   */
  useImperativeHandle(ref, () => ({
    dropBatch,
    slotMultipliers: multipliers, // Optional debugging / UI
  }));

  return (
    <div
      ref={boardRef}
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        borderRadius: '16px',
      }}
    >
      {/* Peg Render */}
      {pegs.map(({ id, body, radius }) => (
        <div
          key={id}
          style={{
            position: 'absolute',
            width: radius * 2,
            height: radius * 2,
            borderRadius: '50%',
            left: body.position.x - radius,
            top: body.position.y - radius,
            backgroundColor: '#2f3240',
          }}
        />
      ))}

      {/* Falling Pig Bodies */}
      {balls.map((ball) => (
        <PigMascot
          key={ball.id}
          size={ball.radius * 2}
          style={{
            position: 'absolute',
            left: ball.x - ball.radius,
            top: ball.y - ball.radius,
            transform: `rotate(${ball.angle}rad)`,
            pointerEvents: 'none',
          }}
        />
      ))}

      {/* Score Popups */}
      {popups.map(({ id, x, y, payout, multiplier }) => (
        <div
          key={id}
          className="popup fade"
          style={{
            left: `${x}px`,
            top: `${y}px`,
            fontWeight: '900',
            fontSize: multiplier >= 3 ? '26px' : '18px',
            color: multiplier >= 3 ? '#ffd700' : '#4ade80',
            filter: multiplier >= 3 ? 'drop-shadow(0 0 8px gold)' : 'none',
            transform: 'translate(-50%, -100%)',
          }}
        >
          ${Math.round(payout)}
        </div>
      ))}

      {/* Slot Labels */}
      {slots.map((_, i) => {
        const slotWidth = boardRef.current?.clientWidth / slots.length || 0;
        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              width: slotWidth,
              left: i * slotWidth,
              bottom: 10,
              textAlign: 'center',
              fontSize: '13px',
              fontWeight: 'bold',
              color: 'white',
              opacity: highlightSlot === i ? 1 : 0.6,
              backgroundColor:
                highlightSlot === i
                  ? 'rgba(68,255,120,0.75)'
                  : 'rgba(255,255,255,0.08)',
              transition: 'all 0.25s ease',
              borderRadius: '6px',
            }}
          >
            x{multipliers[i]}
          </div>
        );
      })}
    </div>
  );
});

export default GameBoard;
