/**
 * CornerPigs
 * --------------------------------------------------
 * Four static PigMascot decorations positioned around the screen.
 *
 * Notes:
 * - Each pig is rotated slightly inward to create a cohesive frame
 * - Positioned partially offscreen so they feel like they are “peeking in”
 * - pointer-events-none ensures they never interact with input
 */

import PigMascot from "./PigMascot.jsx";

export default function CornerPigs() {
  return (
    <>
      {/* Top Left */}
      <PigMascot
        size={100}
        className="fixed top-[-20px] left-[-30px] rotate-[140deg] opacity-90 drop-shadow-[0_0_20px_#ff2fb4] pointer-events-none"
      />

      {/* Top Right */}
      <PigMascot
        size={100}
        className="fixed top-[-20px] right-[-30px] rotate-[-149deg] opacity-90 drop-shadow-[0_0_20px_#ff2fb4] pointer-events-none"
      />

      {/* Bottom Left */}
      <PigMascot
        size={100}
        className="fixed bottom-[-20px] left-[-30px] rotate-[40deg] opacity-90 drop-shadow-[0_0_20px_#ff2fb4] pointer-events-none"
      />

      {/* Bottom Right */}
      <PigMascot
        size={100}
        className="fixed bottom-[-20px] right-[-30px] rotate-[-40deg] opacity-90 drop-shadow-[0_0_20px_#ff2fb4] pointer-events-none"
      />
    </>
  );
}
