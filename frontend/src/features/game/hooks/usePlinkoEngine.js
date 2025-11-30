import { useEffect, useRef, useState, useCallback } from 'react';
import Matter from 'matter-js';
import {
  createEngine,
  generateMultipliers,
  generatePegGrid,
  generateSlots,
  dropBatch as dropBatchFn,
} from './index.js';

/**
 * Physics engine + rendering orchestration hook for the PlinkOink game.
 *
 * Responsibilities:
 * - Initialize and manage the Matter.js engine lifecycle
 * - Generate world geometry (pegs + slots + static boundaries)
 * - Track real-time pig physics and notify GamePage on scoring events
 * - Expose a high-level `dropBatch` API (delegated to dropBatch utility)
 *
 * Architecture Notes:
 * - Physics setup is centralized here for clarity
 * - Risk mode changes only update multipliers (cheap UI-side reaction)
 * - Spawn logic, geometry generation, and multiplier math follow SOLID and
 *   are extracted into dedicated modules under /hooks
 */

export default function usePlinkoEngine(boardRef, mode, onBallLanded) {
  const engineRef = useRef(null);
  const runnerRef = useRef(null);
  const boardSizeRef = useRef({ width: 0, height: 0 });

  // Active pig bodies in Matter → tracked by ID to sync positions visually
  const pigBodiesRef = useRef({});
  const nextPigIdRef = useRef(1);

  // Render state visible to React components
  const [balls, setBalls] = useState([]);
  const [pegs, setPegs] = useState([]);
  const [slots, setSlots] = useState([]);
  const [multipliers, setMultipliers] = useState([]);
  const multipliersRef = useRef([]);

  /**
   * One-time world initialization:
   * - Only triggers when boardRef changes / mounts
   */
  useEffect(() => {
    if (!boardRef.current) return;

    const width = boardRef.current.clientWidth;
    const height = boardRef.current.clientHeight;
    boardSizeRef.current = { width, height };

    // Initialize engine + world
    const engine = createEngine(width, height);
    engineRef.current = engine;
    const world = engine.world;
    const { World, Runner, Events } = Matter;

    // Generate peg field
    const { pegs: pegData, rows, topPegCount } = generatePegGrid(width, height);
    pegData.forEach((p) => World.add(world, p.body));
    setPegs(pegData);

    // Generate scoring slots
    const { slotBodies, slotCount } = generateSlots(
      width,
      height,
      topPegCount,
      rows
    );
    slotBodies.forEach((s) => World.add(world, s));
    setSlots(slotBodies);

    // Initialize multipliers for selected mode
    const baseMultipliers = generateMultipliers(mode, slotCount);
    multipliersRef.current = baseMultipliers;
    setMultipliers(baseMultipliers);

    // Start physics ticker
    const runner = Runner.create();
    runnerRef.current = runner;

    /**
     * Handle pig landing + score callback
     */
    Events.on(engine, 'collisionStart', (event) => {
      event.pairs.forEach((pair) => {
        const pigBody = [pair.bodyA, pair.bodyB].find((b) =>
          b.label?.startsWith('pig-')
        );
        const slotBody = [pair.bodyA, pair.bodyB].find((b) =>
          b.label?.startsWith('slot-')
        );
        if (!pigBody || !slotBody) return;

        // Prevent double-scoring
        if (pigBody.plugin?.scored) return;
        pigBody.plugin.scored = true;

        const slotIndex = Number(slotBody.label.split('-')[1]);
        const multiplier = multipliersRef.current[slotIndex] ?? 1;

        // Small rebound to show impact
        Matter.Body.setVelocity(pigBody, { x: 0, y: -2 });

        // Remove from simulation soon after hit resolution
        setTimeout(() => {
          const id = pigBody.plugin?.pigId;
          if (id != null && pigBodiesRef.current[id]) {
            Matter.World.remove(world, pigBody);
            delete pigBodiesRef.current[id];

            // Trigger UI event for game economy
            onBallLanded?.(slotIndex, multiplier);

            // Refresh render list
            setBalls(
              Object.values(pigBodiesRef.current).map((b) => ({
                id: b.plugin.pigId,
                x: b.position.x,
                y: b.position.y,
                radius: b.circleRadius,
                angle: b.angle,
              }))
            );
          }
        }, 120);
      });
    });

    /**
     * Sync physics → React state after each tick
     */
    Events.on(engine, 'afterUpdate', () => {
      const bodies = Object.values(pigBodiesRef.current);
      if (bodies.length === 0) return setBalls([]);

      setBalls(
        bodies.map((body) => ({
          id: body.plugin.pigId,
          x: body.position.x,
          y: body.position.y,
          radius: body.circleRadius,
          angle: body.angle,
        }))
      );
    });

    Runner.run(runner, engine);

    /**
     * Cleanup world resources on unmount or board resize
     */
    return () => {
      runnerRef.current && Runner.stop(runnerRef.current);
      pigBodiesRef.current = {};
      setBalls([]);
      World.clear(world, false);
      Matter.Engine.clear(engine);
      runnerRef.current = null;
      engineRef.current = null;
    };
  }, [boardRef]);

  /**
   * Recompute multipliers whenever mode changes (cheap + isolated)
   */
  useEffect(() => {
    multipliersRef.current = generateMultipliers(mode, slots.length);
    setMultipliers([...multipliersRef.current]);
  }, [mode, slots.length]);

  /**
   * Programmatically drops a cluster of pigs into the world.
   * Width-aware: cluster never spawns outside playable triangle.
   */
  const dropBatch = useCallback(
    (count) => {
      if (!engineRef.current || !boardRef.current) return;

      const { width, height } = boardSizeRef.current;

      dropBatchFn({
        engine: engineRef.current,
        width,
        height,
        count,
        pigBodiesRef,
        nextPigIdRef,
      });
    },
    [boardRef]
  );

  return { balls, pegs, slots, multipliers, dropBatch };
}
