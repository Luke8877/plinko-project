import Matter from 'matter-js';

/**
 * Builds the triangular peg layout for the Plinko pyramid.
 *
 * Layout Rules:
 * - Starts with a small peg count near the top to narrow the entry path
 * - Expands number of pegs per row to create a pyramid shape
 * - Uses screen dimensions to scale peg spacing responsively
 *
 * @param {number} width  - Width of the visible Plinko board
 * @param {number} height - Height of the visible Plinko board
 * @returns {{
 *   pegs: { id: string, radius: number, body: Matter.Body }[],
 *   rows: number,
 *   topPegCount: number
 * }}
 */
export function generatePegGrid(width, height) {
  const { Bodies } = Matter;

  // Slight taper at the top keeps early game unpredictable
  const topPegCount = 7;

  // Pegs scale with screen size but never become microscopic
  const pegRadius = Math.max(width * 0.0055, 3);

  // Horizontal gap between pegs based on width rather than fixed pixel sizes
  const spacing = width * 0.04;

  /**
   * Determine how many rows fit visually:
   * - Uses the top ~70 percent of the board height
   * - Minimum 10 rows keeps gameplay interesting on smaller screens
   * - Maximum 18 rows prevents lag & keeps view uncluttered
   */
  const maxRows = Math.floor((height * 0.7) / (spacing * 1.15));
  const rows = Math.max(10, Math.min(maxRows, 18));

  // Vertical spacing evenly distributes rows across the upper play field
  const rowGap = (height * 0.7) / rows;

  const pegs = [];
  let pegIndex = 0;

  for (let row = 0; row < rows; row++) {
    // Each row gains one peg creating the Plinko triangle
    const pegCount = topPegCount + row;
    const rowY = height * 0.15 + row * rowGap;

    // Centered horizontally: left-most peg starts offset to align the row
    const offset = -((pegCount - 1) * spacing) / 2;

    for (let i = 0; i < pegCount; i++) {
      const x = width / 2 + offset + i * spacing;

      const peg = Bodies.circle(x, rowY, pegRadius, {
        isStatic: true,
        restitution: 0.3, // adds a satisfying bounce reaction
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
