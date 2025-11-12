/**
 * Random Service
 * -------------------------
 * Provides helper functions for randomness and probability-based logic.
 * Currently used to determine the random payout multiplier in the Plinko game.
 */

/**
 * Selects a random multiplier value from a given array.
 *
 * @param {number[]} multipliers - Array of possible multiplier values.
 * @returns {number} A randomly selected multiplier from the array.
 *
 * @example
 * const slots = [0.5, 1, 2, 5];
 * const multiplier = getRandomSlot(slots);
 * console.log(multiplier); // → e.g., 2
 */
export const getRandomSlot = (multipliers) => {
  const index = Math.floor(Math.random() * multipliers.length);
  return multipliers[index];
};
