# Backlog – PlinkOink Project

### _(Continued for Milestone 3 Completion)_

---

## ✅ Completed (MVP Feature Set)

- Project proposal + planning documentation
- GitHub repository + feature branching workflow
- React + Vite frontend environment initialized
- Full authentication system with JWT and secure routing
- Dashboard MVP with live balance + navigation
- Game screen established with full wager configuration:
  - Modes: Ante Up / Weekend Gambler / High Roller
  - 1–5 pigs per round, dynamic stake calculation
  - Max Win estimation updating live
- Fully functional Plinko physics board:
  - Peg collisions
  - Pig bouncing + slot detection
  - Randomized but fair gameplay
- Payout calculation connected to backend
  - Updated balance returned + displayed
- Manual / Auto play flow
- UI polish and arcade-themed branding
  - Pig mascots + animated gameplay visuals
- Version control with multiple feature branches successfully merged

> **Core gameplay experience is complete and playable** — milestone goal achieved

---

## Remaining Work _(Next Development Cycle)_

These features are supplemental enhancements planned for portfolio-ready release:

### Statistics Page

- Historical chart for wins/losses over time
- Average bet, hit rates, and lifetime performance

### Leaderboard (Frontend UI)

- Display top ranked users from backend `/api/leaderboard`
- Optional: show recent winners or jackpot highlights

### UX / Visual Enhancements

- Additional motion + impact effects on big wins
- Mobile-responsive scaling improvements
- Background audio toggle, more environment polish

### Architecture / Maintainability

- Final cleanup of unused context files
- Consolidation of state and hooks for clarity
- Increased unit testing coverage for payout logic

---

## Notes on Scope Changes

A few planned concepts shifted during development:

- **Context-based state** was partially implemented  
  → replaced by direct backend-sync + lifted state for simplicity
- **Stats + Leaderboard** postponed to focus on gameplay quality
- Plinko physics required **significantly** more tuning than anticipated  
  → resulted in better-than-expected final MVP experience

These choices helped ensure the milestone delivered **a complete working game**, not just another prototype.

---

### Summary

This backlog now reflects a **MVP**.  
The remaining tasks are refactoring with a new found understanding and adding exciting upgrades.

> The game works, it looks fun, and it feels like an actual project and I plan to have it in my portfolio after some refactoring, not just a school submission.

---
