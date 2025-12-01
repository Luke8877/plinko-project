import Matter from 'matter-js';

/**
 * Creates the invisible sensor bars that detect when pigs reach the bottom.
 *
 * Slot Rules:
 * - One slot for each lowest row "gap" created by the pegs
 * - Each slot is a thin horizontal sensor instead of a solid platform
 * - Positioned near the bottom with slight offset to keep pigs visible on impact
 *
 * @param {number} width         - Board width in pixels
 * @param {number} height        - Board height in pixels
 * @param {number} topPegCount   - Pegs in the top-most row (drives slot count)
 * @param {number} rows          - Total peg rows in the pyramid
 * @returns {{
 *   slotBodies: Matter.Body[],
 *   slotCount: number
 * }}
 */
export function generateSlots(width, height, topPegCount, rows) {
  const { Bodies } = Matter;

  const slotCount = topPegCount + rows;
  const slotWidth = width / slotCount;

  /**
   * Slot bar is placed ~8 percent above the actual bottom
   * so impacts and popup text remain visibly above the screen edge.
   */
  const floorY = height * 0.92;

  const slotBodies = [];

  for (let i = 0; i < slotCount; i++) {
    const x = (i + 0.5) * slotWidth;

    const slot = Bodies.rectangle(x, floorY, slotWidth * 0.9, 6, {
      isStatic: true,
      isSensor: true, // detects pigs without affecting physics
      label: `slot-${i}`,
    });

    slotBodies.push(slot);
  }

  return { slotBodies, slotCount };
}
