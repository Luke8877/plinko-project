/**
 * BalanceContext
 * ---------------------------------------------------------
 * Placeholder for shared balance state across the application.
 * Backend remains the source of truth for user currency, but
 * a global context could improve UX responsiveness by reducing
 * redundant balance fetches between dashboard and gameplay.
 *
 * Currently unused in MVP — balance sync handled directly via
 * API calls. File retained to support future real-time updates
 * such as socket-driven or in-memory cached balance changes.
 */
