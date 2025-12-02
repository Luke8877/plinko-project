/**
 * CornerPig
 * --------------------------------------------------
 * Configurable static PigMascot decoration.
 *
 * Usage:
 * <CornerPig topLeft />
 * <CornerPig bottomRight size={120} />
 *
 * Notes:
 * - Each corner has a preset rotation and offset
 * - You enable any combo of corners with boolean props
 * - pointer-events-none ensures mascots never block UI
 */

import PigMascot from './PigMascot.jsx';

export default function CornerPig({
  topLeft = false,
  topRight = false,
  bottomLeft = false,
  bottomRight = false,
  size = 100,
}) {
  return (
    <>
      {topLeft && (
        <PigMascot
          size={size}
          className="fixed top-[-20px] left-[-30px] rotate-[140deg] opacity-90
                     drop-shadow-[0_0_20px_#ff2fb4] pointer-events-none"
        />
      )}

      {topRight && (
        <PigMascot
          size={size}
          className="fixed top-[-20px] right-[-30px] rotate-[-149deg] opacity-90
                     drop-shadow-[0_0_20px_#ff2fb4] pointer-events-none"
        />
      )}

      {bottomLeft && (
        <PigMascot
          size={size}
          className="fixed bottom-[-20px] left-[-30px] rotate-[40deg] opacity-90
                     drop-shadow-[0_0_20px_#ff2fb4] pointer-events-none"
        />
      )}

      {bottomRight && (
        <PigMascot
          size={size}
          className="fixed bottom-[-20px] right-[-30px] rotate-[-40deg] opacity-90
                     drop-shadow-[0_0_20px_#ff2fb4] pointer-events-none"
        />
      )}
    </>
  );
}
