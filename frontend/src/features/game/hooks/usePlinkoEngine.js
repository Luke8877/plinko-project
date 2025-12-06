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
 * usePlinkoEngine — Custom Physics & Rendering Hook
 * ---------------------------------------------------------
 * Centralized orchestration for PlinkOink's Plinko simulation:
 *
 * Engine Lifecycle:
 * • Initialize Matter.js world + runner on mount
 * • Generate pegs + slots responsively to board size
 * • Attach scoring collision listeners
 * • Cleanup gracefully on unmount or mode change
 *
 * Visual State Management:
 * • Tracks positions/angles of active pigs each frame
 * • Syncs peg + slot geometry to render layer
 *
 * Gameplay Integration:
 * • Emits scoring results to GamePage through callback
 * • Exposes `dropBatch()` for controlled pig spawning
 * • Keeps multipliers updated for risk-mode changes
 *
 * Security Note:
 * • Payouts remain backend-validated — GameBoard visuals
 *   never directly modify balance (prevents client-side cheats)
 */

export default function usePlinkoEngine(boardRef, mode, onBallLanded) {
  const engineRef = useRef(null);
  const runnerRef = useRef(null);
  const boardSizeRef = useRef({ width: 0, height: 0 });

  // Active physics bodies for rendering sync
  const pigBodiesRef = useRef({});
  const nextPigIdRef = useRef(1);

  // Render-layer state (mirrors physics)
  const [balls, setBalls] = useState([]);
  const [pegs, setPegs] = useState([]);
  const [slots, setSlots] = useState([]);
  const [multipliers, setMultipliers] = useState([]);
  const multipliersRef = useRef([]);

  /**
   * Initial engine + world geometry setup
   * Runs once when board first exists on screen.
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

    // --- Peg Field Layout ---
    const { pegs: pegData, rows, topPegCount } = generatePegGrid(width, height);
    pegData.forEach((p) => World.add(world, p.body));
    setPegs(pegData);

    // --- Slot Sensors ---
    const { slotBodies, slotCount } = generateSlots(
      width,
      height,
      topPegCount,
      rows
    );
    slotBodies.forEach((s) => World.add(world, s));
    setSlots(slotBodies);

    // Initial multipliers based on risk mode
    const baseMultipliers = generateMultipliers(mode, slotCount);
    multipliersRef.current = baseMultipliers;
    setMultipliers(baseMultipliers);

    // Start physics updates
    const runner = Runner.create();
    runnerRef.current = runner;
    Runner.run(runner, engine);

    /**
     * Each tick: sync all pig body transforms into ball render model
     */
    Events.on(engine, 'afterUpdate', () => {
      const bodies = Object.values(pigBodiesRef.current);
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
     * Full teardown on unmount
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
  }, [boardRef, mode]);

  /**
   * Update multipliers when risk mode changes
   */
  useEffect(() => {
    multipliersRef.current = generateMultipliers(mode, slots.length);
    setMultipliers([...multipliersRef.current]);
  }, [mode, slots.length]);

  /**
   * Collision Subscription
   * Uses latest callback via effect dependency
   * → ensures payout logic is always fresh
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

        // Prevent double score exploitation
        if (pigBody.plugin?.scored) return;
        pigBody.plugin.scored = true;

        const slotIndex = Number(slotBody.label.split('-')[1]);
        const multiplier = multipliersRef.current[slotIndex] ?? 1;

        // Minor bounce feedback for satisfying hit response
        Matter.Body.setVelocity(pigBody, { x: 0, y: -2 });

        // Delay removal slightly for visible slot landing
        setTimeout(() => {
          const id = pigBody.plugin?.pigId;
          if (id != null && pigBodiesRef.current[id]) {
            Matter.World.remove(world, pigBody);
            delete pigBodiesRef.current[id];

            // Notify GamePage → drives payout + popups
            onBallLanded?.(slotIndex, multiplier);

            // Update visible model
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
    return () => Events.off(engine, 'collisionStart', handleCollision);
  }, [onBallLanded]);

  /**
   * Public spawn API → GamePage calls this to drop pigs
   */
  const dropBatch = useCallback(
    (count) => {
      if (!engineRef.current) return;

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [boardRef]
  );

  return { balls, pegs, slots, multipliers, dropBatch };
}
