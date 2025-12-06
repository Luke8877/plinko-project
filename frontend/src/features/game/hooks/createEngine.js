import Matter from 'matter-js';

/**
 * createEngine
 * ---------------------------------------------------------
 * Initializes a Matter.js physics engine configured
 * specifically for PlinkOink gameplay:
 *
 * Physics Intent:
 * • Simulates satisfying downward acceleration (gravity)
 * • Prevents pigs from escaping the visible board
 * • Ensures pigs visually settle on-screen at the bottom
 *
 * Edge Handling:
 * • Invisible left + right walls sit slightly offscreen
 *   to avoid awkward clipping against visible boundaries
 *
 * Composition Strategy:
 * • Core engine exported cleanly so pegs, pigs, and slots
 *   can be added modularly in custom hooks
 *
 * @param {number} width  - Game board width in pixels
 * @param {number} height - Game board height in pixels
 * @returns {Matter.Engine} Configured physics engine instance
 */

export function createEngine(width, height) {
  const engine = Matter.Engine.create();
  const world = engine.world;

  // Gravity tuned for smooth bounces and believable acceleration
  engine.gravity.y = 1.0;

  const { Bodies, World } = Matter;

  // Walls extend beyond viewport → avoids visible clipping
  const wallThickness = 50;

  // Floor slightly below view → pigs settle naturally at slot level
  const floor = Bodies.rectangle(
    width / 2,
    height + wallThickness / 2,
    width,
    wallThickness,
    { isStatic: true }
  );

  // Side boundaries ensure lateral containment
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

  // Batch world add = cleaner + more performant
  World.add(world, [floor, leftWall, rightWall]);

  return engine;
}
