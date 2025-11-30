/**
 * Barrel file for Plinko physics utilities.
 *
 * This enables clean, centralized imports such as:
 *   import { createEngine, generatePegGrid } from './index.js'
 *
 * Anything exported from these modules becomes available to consumers
 * through a single folder entry point. Keeps usePlinkoEngine and other
 * callers tidy and easier to maintain as the physics system grows.
 */

export * from './createEngine';
export * from './generatePegGrid';
export * from './generateSlots';
export * from './generateMultipliers';
export * from './ballController';
