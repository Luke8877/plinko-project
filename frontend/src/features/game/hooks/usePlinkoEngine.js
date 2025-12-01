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
 * - Expose dropBatch() API for upstream controls
 *
 * NOTE:
 * Scoring callback (onBallLanded) must update when bets change.
 * We therefore move collision listener registration into its own
 * effect that re-runs whenever callback updates.
 */

export default function usePlinkoEngine(boardRef, mode, onBallLanded) {
  const engineRef = useRef(null);
  const runnerRef = useRef(null);
  const boardSizeRef = useRef({ width: 0, height: 0 });

  // Active pig bodies tracked in dictionary for render sync
  const pigBodiesRef = useRef({});
  const nextPigIdRef = useRef(1);

  // Visual state derived from physics engine
  const [balls, setBalls] = useState([]);
  const [pegs, setPegs] = useState([]);
  const [slots, setSlots] = useState([]);
  const [multipliers, setMultipliers] = useState([]);
  const multipliersRef = useRef([]);

  /**
   * One-time physics world initialization
   */
  useEffect(() => {
    if (!boardRef.current) return;

    const width = boardRef.current.clientWidth;
    const height = boardRef.current.clientHeight;
    boardSizeRef.current = { width, height };

    const engine = createEngine(width, height);
    engineRef.current = engine;
    const world = engine.world;
    const { World, Runner, Events } = Matter;

    // Build pegs & slots
    const { pegs: pegData, rows, topPegCount } = generatePegGrid(width, height);
    pegData.forEach((p) => World.add(world, p.body));
    setPegs(pegData);

    const { slotBodies, slotCount } = generateSlots(
      width,
      height,
      topPegCount,
      rows
    );
    slotBodies.forEach((s) => World.add(world, s));
    setSlots(slotBodies);

    // Initial multipliers
    const baseMultipliers = generateMultipliers(mode, slotCount);
    multipliersRef.current = baseMultipliers;
    setMultipliers(baseMultipliers);

    // Start Matter loop
    const runner = Runner.create();
    runnerRef.current = runner;
    Runner.run(runner, engine);

    // Update ball render state on each tick
    Events.on(engine, 'afterUpdate', () => {
      const bodies = Object.values(pigBodiesRef.current);
      if (bodies.length === 0) {
        setBalls([]);
        return;
      }

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

    /**
     * Cleanup physics on unmount or resize
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
   * 🔁 Keep multipliers fresh when risk mode changes
   */
  useEffect(() => {
    multipliersRef.current = generateMultipliers(mode, slots.length);
    setMultipliers([...multipliersRef.current]);
  }, [mode, slots.length]);

  /**
   * 🧠 MOST IMPORTANT FIX:
   * Subscribe to scoring events using latest callback.
   * Prevents stale closure problem with bets always = 100.
   */
  useEffect(() => {
    if (!engineRef.current) return;
    const engine = engineRef.current;
    const world = engine.world;
    const { Events } = Matter;

    const handleCollision = (event) => {
      event.pairs.forEach((pair) => {
        const pigBody = [pair.bodyA, pair.bodyB].find((b) =>
          b.label?.startsWith('pig-')
        );
        const slotBody = [pair.bodyA, pair.bodyB].find((b) =>
          b.label?.startsWith('slot-')
        );
        if (!pigBody || !slotBody) return;

        // Prevent double processing same pig
        if (pigBody.plugin?.scored) return;
        pigBody.plugin.scored = true;

        const slotIndex = Number(slotBody.label.split('-')[1]);
        const multiplier = multipliersRef.current[slotIndex] ?? 1;

        // Nice bounce feedback
        Matter.Body.setVelocity(pigBody, { x: 0, y: -2 });

        // Remove pig + notify UI after hit resolves
        setTimeout(() => {
          const id = pigBody.plugin?.pigId;
          if (id != null && pigBodiesRef.current[id]) {
            Matter.World.remove(world, pigBody);
            delete pigBodiesRef.current[id];

            // 🔥 send scoring result to GamePage economy
            onBallLanded?.(slotIndex, multiplier);

            // Update visible balls
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
    };

    Events.on(engine, 'collisionStart', handleCollision);

    // Cleanup old listener before replacing with fresh one
    return () => Events.off(engine, 'collisionStart', handleCollision);
  }, [onBallLanded]); // <-- 🔒 Always sync latest callback

  /**
   * API to spawn pigs (used by GamePage)
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
