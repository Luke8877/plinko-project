# Backlog – Plinko Project

## ✅ Completed

- Project proposal
- Git repository setup (local + GitHub)
- React + Vite environment initialized
- Authentication placeholder component (frontend)
- CRUD mock data setup
- GamePlaceholder component for Plinko game loop
- **Full Project Design Document completed** (wireframes, ER diagram, core MVP defined)
- **Full Project Plan Document completed** (component breakdown, branching strategy, and timeline)
- Backend folder structure implemented (controllers, models, routes, middleware, services, utils)
- MongoDB Atlas cluster created and successfully connected
- Express server configured with dotenv, CORS, and Mongoose
- User model created (`User.js`) with default balance and unique username constraint
- Authentication routes implemented (`/api/auth/register`, `/api/auth/login`)
- Auth controller added with bcrypt password hashing and JWT issuance
- JWT middleware implemented for protected routes
- Game logic route added (`/api/game/play`) with random multiplier, bet validation, and balance updates
- Round model and saving logic implemented (`PlinkoRound.js`)
- Report system integrated (`/api/report`)
  - Generates and persists reports
  - Fetches historical performance data
- Leaderboard feature added (`/api/leaderboard`)
  - Returns top users sorted by balance
- Postman testing completed for:
  - Register
  - Login
  - Protected route
  - Game round play
  - Report fetch
  - Report history
  - Leaderboard fetch
- MongoDB verified to store all data correctly (users, plinkorounds, reports)
- All backend endpoints tested and functioning as intended

---

## Remaining (Next Phase: Frontend Integration)

### Frontend Authentication UI

- Connect login/register forms to backend API
- Store and use JWT token in `localStorage`
- Redirect to dashboard upon successful login

### Plinko Game Implementation

- Frontend game loop with ball-drop animation
- Apply random multipliers based on backend results
- Display updated user balance dynamically

### Dashboard / Statistics Page

- Show current balance, recent rounds, and report metrics
- Display a line graph of win/loss trend using `/api/report/history` data
- Include a quick “fun facts” summary (biggest win, total games, average bet)

### Leaderboard Page

- Display top users by balance
- Auto-refresh after each game or at intervals

### UI Polish and Final Testing

- Styling consistency with PlinkOink theme
- Responsive design for all core views (login, dashboard, game, leaderboard)
- End-to-end testing across all routes and features
