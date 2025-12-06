import Matter from 'matter-js';

/**
 * generateSlots
 * ---------------------------------------------------------
 * Creates a row of invisible collision sensors representing
 * the final scoring targets at the bottom of the Plinko board.
 *
 * Game Design Intent:
 * • Slot count expands as peg rows increase (more routes = more outcomes)
 * • Pigs remain visible upon slot hit (sensors placed slightly above floor)
 * • Sensors do not alter physics — only detect scoring events
 *
 * Sensor Placement Strategy:
 * • Divide board width evenly → each slot is fair + reachable
 * • Keep sensors narrow to avoid multi-slot overlaps
 *
 * Outputs:
 * • Array of sensor bodies to be added to the Matter.js world
 * • Slot count for multiplier assignment + score logic
 *
 * @param {number} width        - Game board width
 * @param {number} height       - Game board height
 * @param {number} topPegCount  - Pegs in first row → base for slot count
 * @param {number} rows         - Total peg rows → increases slot count
 * @returns {{
 *   slotBodies: Matter.Body[],
 *   slotCount: number
 * }}
 */

export function generateSlots(width, height, topPegCount, rows) {
  const { Bodies } = Matter;

  // Final slot count = expanded width of peg pyramid
  const slotCount = topPegCount + rows;
  const slotWidth = width / slotCount;

  /**
   * Place sensors slightly above screen bottom:
   * Prevents pigs from fully disappearing before score register.
   */
  const floorY = height * 0.92;

  const slotBodies = [];

  for (let i = 0; i < slotCount; i++) {
    const x = (i + 0.5) * slotWidth;

    const slot = Bodies.rectangle(x, floorY, slotWidth * 0.9, 6, {
      isStatic: true,
      isSensor: true, // collision events only → no visual bounce
      label: `slot-${i}`,
    });

    slotBodies.push(slot);
  }

  return { slotBodies, slotCount };
}
