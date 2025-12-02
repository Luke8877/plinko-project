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
 * GameBoard (Visual Layer)
 * -------------------------------------------------------------
 * Owns the rendering surface for the physics engine.
 * Handles visual-only state:
 *  - Peg rendering
 *  - Falling pig rendering
 *  - Slot highlighting
 *  - Payout popups
 *
 * Game logic (bets, payouts, balance) stays in GamePage.
 * Exposes dropBatch() to GamePage via forwarded ref.
 */
const GameBoard = forwardRef(function GameBoard(
  {
    mode,
    onSlotResolved, // callback for when a pig lands (score event)
    lastImpact, // drives popup animation
    onMultipliersChange, // NEW: Send multipliers up to UI
  },
  ref
) {
  const boardRef = useRef(null);

  // UI helpers (visual enhancements only)
  const [highlightSlot, setHighlightSlot] = useState(null);
  const [popups, setPopups] = useState([]);

  /**
   * Callback from Plinko Engine → pig landed
   * Pass multiplier upstream and highlight slot visually.
   */
  const handleScoreFromEngine = useCallback(
    (slotIndex, multiplier) => {
      setHighlightSlot(slotIndex);
      onSlotResolved?.(slotIndex, multiplier); // GamePage payout logic

      // Remove highlight after animation
      setTimeout(() => setHighlightSlot(null), 400);
    },
    [onSlotResolved]
  );

  /**
   * Pull live physics elements from the custom Plinko engine hook.
   * Includes pegs, balls, slots, multipliers, and dropBatch() control API.
   */
  const { balls, pegs, slots, multipliers, dropBatch } = usePlinkoEngine(
    boardRef,
    mode,
    handleScoreFromEngine
  );

  /**
   * Emit multipliers to GamePage whenever board layout changes.
   * This enables Max Win UI to update live.
   */
  useEffect(() => {
    if (!multipliers || !multipliers.length) return;
    onMultipliersChange?.(multipliers);
  }, [multipliers, onMultipliersChange]);

  /**
   * Show floating payout popups under GameBoard UI.
   */
  useEffect(() => {
    if (!lastImpact || !boardRef.current || !slots.length) return;

    const { id, slotIndex, payout, multiplier } = lastImpact;

    const width = boardRef.current.clientWidth;
    const height = boardRef.current.clientHeight;
    const slotWidth = width / slots.length;

    const x = slotWidth * slotIndex + slotWidth / 2;
    const y = height - 60;

    // Add popup to UI state
    setPopups((prev) => [...prev, { id, x, y, payout, multiplier }]);

    // Auto-remove after animation completes
    const cleanup = setTimeout(() => {
      setPopups((prev) => prev.filter((p) => p.id !== id));
    }, 900);

    return () => clearTimeout(cleanup);
  }, [lastImpact, slots.length]);

  /**
   * Expose imperative game engine actions to the parent component.
   * GamePage calls `boardRef.current.dropBatch(count)`
   */
  useImperativeHandle(ref, () => ({
    dropBatch,
    slotMultipliers: multipliers, // for debugging / UI if needed
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
      {/* Pegs */}
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

      {/* Falling Pig Mascots */}
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

      {/* Payout popups */}
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

      {/* Slot Multiplier Labels */}
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
