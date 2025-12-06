# Project Development Milestone 3 – Plinko _(In Progress)_

**Course:** CPRO 2501  
**Student:** Luke Thompson  
**GitHub Repository:** [Plinko Project Repository](https://github.com/Luke8877/plinko-project)

---

## Technical Progress _(Frontend Integration Phase)_

- Tailwind CSS successfully integrated into React frontend, including:
  - Custom theme configuration (brandPink, dark UI palette)
  - Global utility usage
- Authentication UI implemented:
  - Login and registration forms wired to backend (`authService`)
- JWT persistence + secure routing:
  - Custom `<ProtectedRoute />` enforcing access control
- Dashboard MVP completed:
  - Live balance fetched from backend `/report` endpoint
  - Quick stats structure in place for future data
  - Logout functionality clearing token and redirecting to login
- Game route and UI established:
  - Bet entry form and backend trigger via `/game/play`
- Initial app flow supported:
  - **Login → Dashboard → Game → Dashboard**
- Axios interceptors handle auth headers automatically

---

## Features Implemented

### Authentication UI

- Modern responsive form styled with Tailwind
- Auto-login post-registration
- Error feedback for failed authentication

### Protected Routing

- Secure access to `/dashboard`, `/game`, `/stats`
- Automatic redirect to `/login` on missing/expired token

### Dashboard _(Functional MVP)_

Shows:

- Current user balance from backend
- Button to start a Plinko game
- Logout link
- Placeholder panels for future report visualization

### Game Page _(Initial Integration)_

- Bet submission calling backend gameplay logic
- Basic result feedback and balance update
- Placeholder UI for Plinko physics & peg board rendering

---

## Version Control Summary (Outdated)

- Adopted feature-branch workflow for frontend development
- Completed & merged:
  - `feature/auth-ui`
  - `feature/dashboard-ui`
- Active branch:
  - `feature/game-ui`

---

## Remaining Work _(Next Objectives)_

- Build full interactive Plinko board
  - Falling physics + peg collisions
- Real-time score display & result animations
- Statistics page with historical chart (`/report/history`)
- Final leaderboard integration (dashboard or standalone view)
- UI polish:
  - PlinkOink mascot animations
  - Branding enhancements
- Final responsive tuning & full gameplay testing

---

## Remaining Work _(Post-MVP Enhancements)_

The core gameplay loop and interface are now complete for the MVP version of PlinkOink. Remaining work is primarily focused on polish, architecture/code refactoring, data visualization, and additional features that expand replay value:

- Statistics page with win/loss history and visual charts
- Leaderboard integration (either as a dashboard card or standalone view)
- UX polish and responsiveness improvements for smaller devices
- Continued refinement of physics accuracy and performance
- Codebase cleanup (consolidating state management and removing unused context)

These enhancements are planned as part of the next development cycle to turn the MVP into a fully portfolio-ready release.

### Milestone 3 continued

## Technical Progress

Since the last update, the project has transformed from a basic authenticated app into a fully interactive game experience with real player progression and balance tracking.

A large portion of time was spent learning how to translate a visual design into a real, working UI. Tailwind CSS was integrated early to support a dark, modern arcade theme with branded accents. Authentication is now complete, including login, registration, token persistence, and protected routing that prevents gameplay without a valid session.

The dashboard was built next, and this was the first view that really started to feel like a game live balance, a playful pig mascot, and a animated play game card that completes the core navigation loop:

> **Login → Dashboard → Game → Dashboard**  
> _(with real balance updates in between)_

The game screen has also improved significantly. The betting system works end-to-end, including modes, pigs per round, and payout calculation from backend-validated results.

At this point, the Plinko board is no longer a placeholder, pigs drop, bounce on pegs, and land into multipliers that affect the player's credit balance.

---

## Features Implemented

### Authentication & Security

- Fully styled login and register screens using Tailwind
- JWT persistence and auto-redirect on expired sessions
- Components protected with `<ProtectedRoute />`

### Dashboard Experience

- Live balance display sourced from backend
- Reusable card components for clean UI patterns
- Interactive pig mascot elements to reinforce branding

### Gameplay & Betting Mechanics

- Three wagering modes:
  - **Ante Up** (low stakes)
  - **Weekend Gambler** (medium stakes)
  - **High Roller** (high stakes)
- Total bet divided across **1–5 pigs**
- Manual or Auto play control
- Backend payout logic managing real winnings

### Physics & Game Rendering

- Peg grid generation + collision behavior
- Randomized pig drop physics
- Multiplier slots matched to selected mode rules

> The game now feels surprisingly good to interact with.

---

## Version Control Reflection

This project marks my first real attempt at a disciplined feature-branch workflow.

Branches such as:

- feature/game-ui
- feature/frontend-auth-mvp
- feature/dashboard-ui
- feature/payout-popup-values
- feature/backend-balance-sync
- feature/pegs-and-multipliers
- feature/pig-mascot-enhancements

helped keep work organized, but as I went down rabbit holes version control became more sloppy and I ended up having to stash,
revert and go through the changes 1 by 1 to save work that was solid, in order to fix a bug and not lose all my work.

My commit messages and pull requests were volatile at best as well.

**What I learned**

- Commit **before** experiments, not after
- Smaller branches = easier integration
- Pull requests should explain reasoning, not just code changes

---

## Codebase & Structure Notes

The project evolved into a modular structure that supports scalability:

```
└── 📁frontend
    └── 📁public
    └── 📁src
        └── 📁app
        └── 📁auth
            └── 📁components
            └── 📁pages
        └── 📁context
        └── 📁dashboard
            └── 📁components
            └── 📁pages
        └── 📁features
            └── 📁game
                └── 📁betpanel
                └── 📁components
                └── 📁hooks
                └── 📁pages
        └── 📁services
        └── 📁shared
            └── 📁components
        └── 📁stats
        └── 📁styles
```

Some planned abstractions, especially React, contexts were not fully implemented for game state due to schedule pressure. This created areas where state and calls became slightly tangled.

---

## Remaining Work

- Statistics page with historical charts
- Leaderboard implementation
- Physics refinement
- Responsive tuning for small displays
- Better validation for text fields
- Overall refactoring for better modularity and simplicity (especially pages, hooks and context files for cleaner front to back)

---

## Completion Outlook

With the core gameplay loop and authenticated flow complete, the next milestone will focus on polish and presentation. The game is playable, visually branded, and connected to persistent player data.

This milestone reflects not only feature growth, but also a shift in mindset:

> From racing to make something “work”  
> to building a foundation I’m proud to expand.

---

### Closing Reflection

Milestone 3 has been where alot has clicked such as UI design, gameplay logic, version control, and secure routing all working together. Every mistake so far has made this a better project and made me a better developer. I am taking on a job building a website that sells seasoning and I am very glad I get to start it after
this semesters final projects as I am night and day in terms of qualified to take that on.

---
