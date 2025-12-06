/**
 * generateMultipliers
 * ---------------------------------------------------------
 * Produces edge-weighted payout multipliers for PlinkOink slots.
 *
 * Plinko Design Rule:
 * • Center slots are easier to land in → lower multipliers
 * • Outer slots are riskier → higher rewards
 *
 * Risk Modes:
 * • "Ante Up"         → Low volatility (casual play)
 * • "Weekend Gambler" → Medium volatility (balanced risk)
 * • "High Roller"     → High volatility (jackpot edge hits)
 *
 * Synergy with Game UI:
 * • GameBoard displays mulitpliers visually under each slot
 * • BetPanel uses them to estimate Max Win dynamically
 *
 * @param {string} mode       - Risk mode selected by user
 * @param {number} slotCount  - Number of active scoring slots
 * @returns {number[]} Ordered multipliers from left → right
 */

export function generateMultipliers(mode, slotCount) {
  const center = Math.floor((slotCount - 1) / 2);

  return Array.from({ length: slotCount }, (_, i) => {
    const dist = Math.abs(center - i); // Distance from center slot

    // Risk-curve profiles
    if (mode === 'Ante Up') {
      return Number(([0.8, 1, 1.2, 1.5, 2][dist] ?? 3.5).toFixed(2));
    }

    if (mode === 'Weekend Gambler') {
      return Number(([0.5, 0.8, 1.1, 1.5, 3][dist] ?? 8).toFixed(2));
    }

    // High Roller default:
    return Number(([0.2, 0.5, 0.8, 1.2, 3][dist] ?? 20).toFixed(2));
  });
}
