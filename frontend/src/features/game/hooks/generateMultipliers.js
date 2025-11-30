// src/hooks/plinko/generateMultipliers.js

/**
 * Creates a multiplier profile for the current risk mode.
 *
 * Center slots have lower multipliers, edges reward bigger payouts.
 * Distribution varies based on selected mode risk appetite.
 *
 * @param {string} mode       - "Ante Up" | "Weekend Gambler" | "High Roller"
 * @param {number} slotCount  - Total scoring slots on the bottom row
 * @returns {number[]} Scaled multipliers from left→right
 */
export function generateMultipliers(mode, slotCount) {
  const center = Math.floor((slotCount - 1) / 2);
  return Array.from({ length: slotCount }, (_, i) => {
    const dist = Math.abs(center - i);

    if (mode === 'Ante Up') {
      return Number(([0.8, 1, 1.2, 1.5, 2][dist] ?? 3.5).toFixed(2));
    }
    if (mode === 'Weekend Gambler') {
      return Number(([0.5, 0.8, 1.1, 1.5, 3][dist] ?? 8).toFixed(2));
    }
    // High Roller
    return Number(([0.2, 0.5, 0.8, 1.2, 3][dist] ?? 20).toFixed(2));
  });
}
