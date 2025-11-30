import Matter from 'matter-js';

/**
 * Adds `count` pigs into the physics world using a controlled spread.
 * Separated to respect Single Responsibility and simplify future tuning.
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

  const radius = Math.max(width * 0.01, 3);

  const margin = width * 0.15;
  const minX = margin + radius;
  const maxX = width - margin - radius;

  const baseSpread = radius * 2.4;
  const spread =
    count > 1 ? Math.min(baseSpread, (maxX - minX) / (count - 1)) : 0;

  for (let i = 0; i < count; i++) {
    const id = nextPigIdRef.current++;
    const offsetIndex = i - (count - 1) / 2;

    let x = width / 2 + offsetIndex * spread;
    x = Math.max(minX, Math.min(maxX, x));

    const body = Bodies.circle(x, height * 0.05, radius, {
      restitution: 0.45,
      friction: 0,
      frictionAir: 0.002,
      label: `pig-${id}`,
    });

    body.plugin = { pigId: id, scored: false };

    Body.setVelocity(body, { x: (Math.random() - 0.5) * 1.2, y: 0 });
    Body.setAngularVelocity(body, (Math.random() - 0.5) * 0.25);

    pigBodiesRef.current[id] = body;
    World.add(world, body);
  }
}
