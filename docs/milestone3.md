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

## Version Control Summary

- Adopted feature-branch workflow for frontend development
- Completed & merged:
  - `feature/auth-ui`
  - `feature/dashboard-ui`
- Active branch:
  - `feature/game-ui`

All PRs include meaningful commit history and detailed descriptions.

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

This milestone marks the point where gameplay mechanics become the primary focus, with a stable authenticated frontend and backend connectivity now in place.
