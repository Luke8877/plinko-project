import Matter from 'matter-js';

/**
 * generatePegGrid
 * ---------------------------------------------------------
 * Procedurally lays out a triangular Plinko peg field.
 *
 * Gameplay Design Intent:
 * • Narrow entry path creates initial unpredictability
 * • Rows expand downward → more interactions + spread variance
 * • Peg count adapts to screen size responsively
 *
 * Physics Intent:
 * • Pegs are static bodies with slight restitution
 * • Increasing peg count by row drives randomized final outcomes
 *
 * Performance Considerations:
 * • Row count capped to avoid overcrowding + physics lag
 * • Row spacing proportionate to board height preserves visual clarity
 *
 * Outputs:
 * • Peg objects ready to be added to Matter.js world
 * • Total rows + top row count for UI / debugging if needed
 *
 * @param {number} width  - Visible board width (px)
 * @param {number} height - Visible board height (px)
 * @returns {{
 *   pegs: { id: string, radius: number, body: Matter.Body }[],
 *   rows: number,
 *   topPegCount: number
 * }}
 */
export function generatePegGrid(width, height) {
  const { Bodies } = Matter;

  // Controlled taper ensures early directional randomness
  const topPegCount = 7;

  // Radius scales with board width → remains visible on all devices
  const pegRadius = Math.max(width * 0.0055, 3);

  // Row-based horizontal spacing — not fixed pixels → stays proportionate
  const spacing = width * 0.04;

  /**
   * Calculate optimal number of rows for the current board height:
   * – Only uses upper 70 percent of UI (lower space reserved for slots)
   * – Minimum rows ensures engaging physics
   * – Cap prevents excessive simulation bodies on large displays
   */
  const maxRows = Math.floor((height * 0.7) / (spacing * 1.15));
  const rows = Math.max(10, Math.min(maxRows, 18));

  // Even vertical distribution of rows
  const rowGap = (height * 0.7) / rows;

  const pegs = [];
  let pegIndex = 0;

  for (let row = 0; row < rows; row++) {
    // Triangle growth pattern: each row adds a peg
    const pegCount = topPegCount + row;
    const rowY = height * 0.15 + row * rowGap;

    // Center the row by offsetting leftmost peg
    const offset = -((pegCount - 1) * spacing) / 2;

    for (let i = 0; i < pegCount; i++) {
      const x = width / 2 + offset + i * spacing;

      const peg = Bodies.circle(x, rowY, pegRadius, {
        isStatic: true,
        restitution: 0.3, // Adds fun, light bounce effect
      });

      pegs.push({
        id: `peg-${pegIndex++}`,
        radius: pegRadius,
        body: peg,
      });
    }
  }

  return { pegs, rows, topPegCount };
}
