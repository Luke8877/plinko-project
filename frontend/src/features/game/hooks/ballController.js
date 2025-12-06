import Matter from 'matter-js';

/**
 * dropBatch()
 * ---------------------------------------------------------
 * Spawns a batch of falling pigs into the physics world.
 * This function is intentionally isolated to:
 * • Keep GameBoard and engine hook clean
 * • Allow tuning spawn behavior without touching core logic
 *
 * Placement Strategy:
 * • Center pigs horizontally
 * • Evenly spread based on total count
 * • Clamp spawn positions to avoid spawning out of bounds
 *
 * Physics Rules:
 * • Slight initial X velocity variation to avoid stacking
 * • Very low air friction for smooth plinko-style motion
 * • No scoring allowed until first collision with slot
 */

export function dropBatch({
  engine,
  width,
  height,
  count,
  pigBodiesRef,
  nextPigIdRef,
}) {
  const { World, Bodies, Body } = Matter;
  const world = engine.world;

  if (count <= 0) return;

  // Pig size scales with board width, enforce minimum radius
  const radius = Math.max(width * 0.01, 3);

  // Horizontal spawn bounds to avoid edge clipping
  const margin = width * 0.15;
  const minX = margin + radius;
  const maxX = width - margin - radius;

  // Spread pigs horizontally depending on count
  const baseSpread = radius * 2.4;
  const spread =
    count > 1 ? Math.min(baseSpread, (maxX - minX) / (count - 1)) : 0;

  for (let i = 0; i < count; i++) {
    const id = nextPigIdRef.current++;
    const offsetIndex = i - (count - 1) / 2;

    // Even horizontal distribution centered on board
    let x = width / 2 + offsetIndex * spread;
    x = Math.max(minX, Math.min(maxX, x)); // safely clamp

    // Create pig body
    const body = Bodies.circle(x, height * 0.05, radius, {
      restitution: 0.45, // controls bounce
      friction: 0,
      frictionAir: 0.002, // slight drift realism
      label: `pig-${id}`,
    });

    // Track unique ID + scoring behavior
    body.plugin = { pigId: id, scored: false };

    // Small random nudge creates varied fall patterns
    Body.setVelocity(body, { x: (Math.random() - 0.5) * 1.2, y: 0 });
    Body.setAngularVelocity(body, (Math.random() - 0.5) * 0.25);

    // Register in lookup map + physics world
    pigBodiesRef.current[id] = body;
    World.add(world, body);
  }
}
