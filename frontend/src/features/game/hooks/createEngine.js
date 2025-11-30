import Matter from 'matter-js';

/**
 * Creates and configures a Matter.js physics engine for the Plinko board.
 *
 * Responsibilities:
 * - Set gravity for downward ball movement
 * - Add static world boundaries (floor + side walls)
 * - Return engine instance for further world composition (pegs, slots, pigs)
 *
 * @param {number} width  - Visible game board width in pixels
 * @param {number} height - Visible game board height in pixels
 * @returns {Matter.Engine} Initialized Matter.js engine
 */
export function createEngine(width, height) {
  const engine = Matter.Engine.create();
  const world = engine.world;

  // Moderate gravity gives satisfying acceleration for pigs
  engine.gravity.y = 1.0;

  const { Bodies, World } = Matter;

  // Extra width beyond screen keeps physics stable against edge clipping
  const wallThickness = 50;

  // Slightly below the visible bottom → balls appear to settle naturally onscreen
  const floor = Bodies.rectangle(
    width / 2,
    height + wallThickness / 2,
    width,
    wallThickness,
    { isStatic: true }
  );

  // Left / right boundaries prevent balls from escaping lateral edges
  const leftWall = Bodies.rectangle(
    -wallThickness / 2,
    height / 2,
    wallThickness,
    height,
    { isStatic: true }
  );

  const rightWall = Bodies.rectangle(
    width + wallThickness / 2,
    height / 2,
    wallThickness,
    height,
    { isStatic: true }
  );

  // Single batch add is more performant than multiple adds
  World.add(world, [floor, leftWall, rightWall]);

  return engine;
}
