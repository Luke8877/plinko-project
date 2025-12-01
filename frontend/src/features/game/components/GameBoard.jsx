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
  const boardRef = useRef(null);
  const [highlightSlot, setHighlightSlot] = useState(null);
  const [popups, setPopups] = useState([]);

  const handleScoreFromEngine = useCallback(
    (slotIndex, multiplier) => {
      setHighlightSlot(slotIndex);
      onSlotResolved?.(slotIndex, multiplier);
      setTimeout(() => setHighlightSlot(null), 400);
    },
    [onSlotResolved]
  );

  const { balls, pegs, slots, multipliers, dropBatch } = usePlinkoEngine(
    boardRef,
    mode,
    handleScoreFromEngine
  );

  // Animate popups on win
  useEffect(() => {
    if (!lastImpact || !boardRef.current || !slots.length) return;

    const { id, slotIndex, payout, multiplier } = lastImpact;

    const width = boardRef.current.clientWidth;
    const height = boardRef.current.clientHeight;
    const slotWidth = width / slots.length;

    const x = slotWidth * slotIndex + slotWidth / 2;
    const y = height - 60;

    setPopups((prev) => [...prev, { id, x, y, payout, multiplier }]);

    const cleanup = setTimeout(() => {
      setPopups((prev) => prev.filter((p) => p.id !== id));
    }, 900);

    return () => clearTimeout(cleanup);
  }, [lastImpact, slots.length]);

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
            borderRadius: '50%',
            left: body.position.x - radius,
            top: body.position.y - radius,
            backgroundColor: '#2f3240',
          }}
        />
      ))}

      {/* Pigs */}
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

      {/* Multipliers */}
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
