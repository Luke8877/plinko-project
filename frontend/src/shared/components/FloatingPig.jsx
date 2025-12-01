/**
 * FloatingPig Component
 * -------------------------------------------------------
 * An animated pig mascot that follows the user's
 * cursor on screen. Designed to reinforce brand identity
 * and add personality to the login experience.
 *
 * Performance Notes:
 * - Uses framer-motion MotionValues to avoid unnecessary React re-renders
 * - Uses spring physics for smooth natural movement
 * - Rotation behavior reacts to cursor velocity and distance
 * - Pointer events disabled to ensure UI interactions remain unaffected
 */

import { useEffect } from 'react';
import { motion as Motion, useMotionValue, useSpring } from 'framer-motion';
import PigMascot from './PigMascot.jsx';

export default function FloatingPig() {
  const size = 90;
  const offset = size * 0.4; // Keeps pig slightly offset from cursor

  // MotionValues updated every frame | no React re-render needed
  const xMV = useMotionValue(100);
  const yMV = useMotionValue(100);

  // Spring smoothing → more natural movement and inertia
  const x = useSpring(xMV, { stiffness: 50, damping: 16, mass: 0.45 });
  const y = useSpring(yMV, { stiffness: 50, damping: 16, mass: 0.45 });

  // Rotation MotionValue (continues spinning while chasing)
  const rotMV = useMotionValue(0);

  /**
   * Spin logic:
   * The farther away the cursor is from the pig,
   * the faster it rotates.
   *
   * Once it reaches the cursor, rotation stops.
   */
  useEffect(() => {
    let currentRot = 0;

    const update = () => {
      const dx = xMV.get() - x.get();
      const dy = yMV.get() - y.get();
      const distance = Math.sqrt(dx * dx + dy * dy);

      const stopThreshold = 12;

      if (distance > stopThreshold) {
        const spinSpeed = Math.min(distance * 0.02, 8); // Cap for stability
        currentRot += spinSpeed;
        rotMV.set(currentRot);
      }

      requestAnimationFrame(update);
    };

    update();
  }, [x, y, xMV, yMV, rotMV]);

  /**
   * Track cursor position every frame.
   * Updates MotionValues directly.
   */
  useEffect(() => {
    const handleMove = (e) => {
      xMV.set(e.clientX - offset);
      yMV.set(e.clientY - offset);
    };

    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, [offset, xMV, yMV]);

  return (
    <Motion.div
      className="pointer-events-none fixed top-0 left-0"
      style={{
        x,
        y,
        rotate: rotMV,
        willChange: 'transform', // Hint for GPU acceleration
      }}
    >
      <PigMascot size={size} className="opacity-95" />
    </Motion.div>
  );
}
