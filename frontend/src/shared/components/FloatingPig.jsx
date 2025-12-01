/**
 * FloatingPig
 * --------------------------------------------------
 * A playful UI element that follows the user's cursor.
 * Used on the login screen to reinforce the PlinkOink brand
 * with a bit of character and motion.
 *
 * Notes:
 * - Motion is handled by Framer Motion for smooth spring physics
 * - Pointer events are disabled so the pig never interferes with clicks
 */

import { useEffect, useState } from "react";
import { motion as _motion } from "framer-motion";
import PigMascot from "./PigMascot.jsx";

export default function FloatingPig() {
  const size = 90;
  const [pos, setPos] = useState({ x: 100, y: 100 });

  /**
   * Tracks cursor position and offsets mascot slightly
   * so it doesn’t sit directly on the pointer.
   */
  useEffect(() => {
    const handleMove = (e) => {
      const offset = size * 0.4;
      setPos({
        x: e.clientX - offset,
        y: e.clientY - offset,
      });
    };

    window.addEventListener("mousemove", handleMove);

    // Cleanup to avoid stale listeners on unmount
    return () => window.removeEventListener("mousemove", handleMove);
  }, [size]);

  return (
    <_motion.div
      className="pointer-events-none fixed top-0 left-0"
      animate={{
        x: pos.x,
        y: pos.y,
        rotate: pos.x * 0.8, // small tilt for personality
      }}
      transition={{
        type: "spring",
        stiffness: 55,
        damping: 12,
      }}
    >
      <PigMascot
        size={size}
        className="drop-shadow-[0_0_20px_#ff2fb4] opacity-95"
      />
    </_motion.div>
  );
}
