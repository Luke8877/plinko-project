# Backlog – Plinko Project

### _(Updated for Milestone 3 Progress)_

---

## ✅ Completed

- Project proposal
- Git repository setup (local + GitHub)
- React + Vite environment initialized
- Authentication placeholder component (frontend)
- CRUD mock data setup
- `GamePlaceholder` component for Plinko game loop
- Full Project Design Document completed  
  _(wireframes, ER diagram, core MVP defined)_
- Full Project Plan Document completed  
  _(branching strategy & timeline)_

### Backend Development

- Backend folder structure implemented  
  _(controllers, models, routes, middleware, services, utils)_
- MongoDB Atlas cluster created and successfully connected
- Express server configured with dotenv, CORS, and Mongoose
- `User` model created (`User.js`)
  - Initial balance + unique username constraint
- Authentication routes implemented:
  - `/api/auth/register`
  - `/api/auth/login`
- Auth controller added with:
  - bcrypt password hashing
  - JWT issuance
- JWT middleware implemented for protected routes
- Game logic route added (`/api/game/play`)
  - random multiplier + bet validation
  - balance updates included
- Round model and persistence implemented (`PlinkoRound.js`)
- Report system integrated (`/api/report`)
  - Generates and retrieves recent gameplay performance data
- Leaderboard feature added (`/api/leaderboard`)
- Backend routes fully verified with Postman
- MongoDB storage confirmed for all data types

### ✔ Milestone 3 Frontend Progress

- Tailwind CSS configured with custom dark theme + brand accents
- Login / register pages fully functional with backend integration
- JWT token persisted to localStorage and auto-attached via Axios interceptors
- `ProtectedRoute` guards applied to Dashboard, Game, and Stats pages
- Dashboard MVP implemented:
  - Displays live balance + basic stats placeholders
  - Logout functionality
  - Navigation to Game screen
- Game route UI:
  - Bet entry form
  - Calls `/game/play` and displays multiplier + updated balance
  - Feedback for win/loss result

---

## Remaining (Next Development Steps)

### Plinko Gameplay UX

- Full animated Plinko board (peg grid + ball physics)
- Smooth real-time balance updates during session
- Enhanced win feedback and celebration animations

### Statistics Page

Pull from `/api/report/history` to display:

- Report history line/bar graph
- Biggest win
- Win/loss ratio
- Average bet
- Overall lifetime stats tracking

### Leaderboard (Frontend)

- Fetch and display rankings from `/api/leaderboard`
- Update automatically after a completed game round

### UI Polish

- Full PlinkOink mascot branding integration
  - Pig mascot ball asset
  - Neon glow accents
- Smooth transitions + satisfying animations
- Mobile-first responsive refinements

### Final Testing & Submission Prep

- End-to-end validation of:
  - Authentication
  - Gameplay
  - Stats + reporting
- Minor bug cleanup + QoL improvements
- Update milestone documentation with new screenshots

---

This backlog reflects a completed authentication-to-gameplay pipeline, with primary focus shifting to the full Plinko experience, visual polish, and analytics integrations.
