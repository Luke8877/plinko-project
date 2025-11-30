import React, {
  useRef,
  useState,
  useEffect,
  useCallback,
  useImperativeHandle,
  forwardRef,
} from 'react';
import usePlinkoEngine from '../hooks/usePlinkoEngine';
import PigMascot from './PigMascot';

/**
 * Visual layer for PlinkOink gameplay.
 *
 * Responsibilities:
 * - Owns the rendering surface for Matter.js physics (boardRef)
 * - Renders pegs, falling pigs, multipliers, and win popups
 * - Handles per-slot highlighting when a scoring event occurs
 * - Exposes dropBatch() upstream via ref → called from GamePage
 *
 * Notes:
 * - Physics state comes from usePlinkoEngine (render-only here)
 * - All payout logic lives in GamePage → this component is purely visual
 */
const GameBoard = forwardRef(function GameBoard(
  { mode, onSlotResolved, lastImpact },
  ref
) {
  /** Board DOM element drives dynamic layout/responsive physics */
  const boardRef = useRef(null);

  /** UI state: score highlight and animated profit labels */
  const [highlightSlot, setHighlightSlot] = useState(null);
  const [popups, setPopups] = useState([]);

  /**
   * Receive pig landing events from physics engine.
   * Highlights the hit slot and forwards event to GamePage.
   */
  const handleBallLanded = useCallback(
    (slotIndex, multiplier) => {
      setHighlightSlot(slotIndex);
      onSlotResolved?.(slotIndex, multiplier);

      // fade highlight after brief flash
      setTimeout(() => setHighlightSlot(null), 400);
    },
    [onSlotResolved]
  );

  /**
   * Hook that:
   * - Builds physics world tied to boardRef
   * - Returns current peg/pig state + dropBatch method
   */
  const { balls, pegs, slots, multipliers, dropBatch } = usePlinkoEngine(
    boardRef,
    mode,
    handleBallLanded
  );

  /**
   * Animate UI popup labels when GamePage reports a new scoring event.
   * Each popup fades & drifts upward before removal.
   */
  useEffect(() => {
    if (!lastImpact || !boardRef.current || !slots.length) return;

    const { slotIndex, profit, id } = lastImpact;
    if (slotIndex < 0 || slotIndex >= slots.length) return;

    const width = boardRef.current.clientWidth;
    const height = boardRef.current.clientHeight;
    const slotWidth = width / slots.length;

    // Position popup above the slot center
    const x = slotWidth * slotIndex + slotWidth / 2;
    const y = height - 50;

    const popupId = id ?? Date.now();
    setPopups((prev) => [...prev, { id: popupId, x, y, profit }]);

    const timeout = setTimeout(() => {
      setPopups((prev) => prev.filter((p) => p.id !== popupId));
    }, 900);

    return () => clearTimeout(timeout);
  }, [lastImpact, slots.length]);

  /**
   * Expose imperative method so parent can trigger pig drops.
   * (Used from GamePage for manual & auto waves)
   */
  useImperativeHandle(ref, () => ({
    dropBatch,
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
            left: body.position.x - radius,
            top: body.position.y - radius,
            borderRadius: '50%',
            backgroundColor: '#2f3240',
          }}
        />
      ))}

      {/* Pigs (rendered directly above Matter.js position) */}
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

      {/* Profit popups */}
      {popups.map((p) => (
        <div
          key={p.id}
          style={{
            position: 'absolute',
            left: p.x,
            top: p.y,
            transform: 'translate(-50%, -100%)',
            fontSize: 14,
            fontWeight: 'bold',
            color: p.profit >= 0 ? '#4ade80' : '#f87171',
            textShadow: '0 0 6px rgba(0,0,0,0.8)',
            pointerEvents: 'none',
            opacity: 1,
            transition: 'opacity 0.5s ease, top 0.5s ease',
          }}
        >
          {p.profit >= 0 ? `+${p.profit.toFixed(2)}` : p.profit.toFixed(2)}
        </div>
      ))}

      {/* Slot multipliers */}
      {slots.map((_, i) => {
        const slotWidth = boardRef.current?.clientWidth / slots.length || 0;
        const multiplier = multipliers[i];

        return (
          <div
            key={`slot-${i}`}
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
              transform: highlightSlot === i ? 'scale(1.25)' : 'scale(1)',
              transition: 'all 0.25s ease',
              backgroundColor:
                highlightSlot === i
                  ? 'rgba(68, 255, 120, 0.75)'
                  : 'rgba(255,255,255,0.08)',
              padding: '4px 2px',
              borderRadius: '6px',
              pointerEvents: 'none',
            }}
          >
            x{multiplier}
          </div>
        );
      })}
    </div>
  );
});

export default GameBoard;
