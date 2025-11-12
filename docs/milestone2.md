# Project Development Milestone 2 – Plinko

**Course:** CPRO 2501  
**Student:** Luke Thompson
**GitHub Repository:** [Plinko Project Repository](https://github.com/Luke8877/plinko-project)

---

## Technical Progress

- **Full backend prototype completed:** Express + Node backend structured using MVC architecture with dedicated folders for `controllers/`, `models/`, `routes/`, `middleware/`, `services/`, and `utils/`.
- **MongoDB Atlas connected:** Remote cloud database configured and verified via Compass; connection handled through `.env` variables using Mongoose.
- **Authentication implemented:** Secure registration and login endpoints added using bcrypt for hashing and JWT for session authentication.
- **Game system functional:** Core Plinko logic built into `/api/game/play`, including bet validation, random multiplier generation, payout calculation, and balance updates.
- **Database integration:** Persistent collections for users, plinkorounds, and reports created and verified to store accurate, linked user data.
- **Reporting system completed:** Backend now aggregates and stores user performance metrics — total games, win/loss ratio, biggest win, and average bet.
- **Leaderboard feature implemented:** `/api/leaderboard` returns the top 5 users ranked by balance for a global competitive view.
- **Security measures in place:** `.env` secrets protected, CORS enabled, all sensitive routes protected by JWT middleware.
- **Postman verification:** All routes tested successfully (`/auth`, `/game`, `/report`, `/report/history`, `/leaderboard`).

---

## Features Implemented

### Authentication (Registration + Login)

- `/api/auth/register` creates a new user with hashed password and a default balance of 1000.
- `/api/auth/login` validates credentials and issues a signed JWT token.
- `authMiddleware.js` enforces token validation on protected routes using the `Authorization: Bearer <token>` header.
- Verified end-to-end in Postman with full token flow (register → login → access protected route).

### Plinko Game Logic

- `/api/game/play` endpoint simulates a Plinko round:
  - Validates bet amount and current balance.
  - Generates a random multiplier using `RandomService`.
  - Calculates payout and updates balance accordingly.
  - Saves the round record in `PlinkoRound` collection.
  - Response includes multiplier, payout, and new balance.

### Balance Tracking

- `User` model maintains a persistent balance field with default value `1000`.
- On each game round:
  - Bet is deducted.
  - Payout is added.
  - New balance is persisted in the database.
- Changes verified in MongoDB Atlas after each round.

### Reporting / Statistics

- `Report` model and `ReportService` implemented to analyze user performance.
- `/api/report`:
  - Calculates totals from the user’s round data.
  - Saves snapshot to the `reports` collection.
- `/api/report/history`:
  - Returns all historical snapshots for graphing long-term progress.
  - Data includes: `totalGames`, `winLossRatio`, `biggestWin`, `averageBet`.

### Leaderboard Feature

- `/api/leaderboard` endpoint returns the top 5 users ranked by current balance.
- Data includes `username` and `balance` fields only.
- Useful for leaderboard UI integration and competition visualization.

### Persistent Storage

- MongoDB Atlas provides cloud storage for all data.
- Collections include: `users`, `plinkorounds`, and `reports`.
- Automatic timestamps ensure accurate tracking of each round and report.

---

## Backlog Progress

### Completed

- Git repository and project structure
- Express server with CORS and JSON middleware
- MongoDB Atlas setup and connection
- Models: `User`, `PlinkoRound`, `Report`
- Controllers: `auth`, `game`, `report`, `leaderboard`
- Routes for all major API endpoints
- JWT middleware and security layer
- Services layer (`AuthService`, `ReportService`, `DatabaseManager`, `RandomService`)
- Full Postman testing for all endpoints
- Verified database writes and reads in Compass

### Remaining / Next Phase (Frontend Integration)

- Connect frontend authentication forms to backend routes with JWT storage.
- Build fully interactive Plinko board (game logic + animation).
- Create dashboard displaying balance, quick stats, and recent rounds.
- Implement report history graph (visualize win/loss ratio over time).
- Build leaderboard page and live update rankings.
- Apply UI theme and final polish for responsive design.

---

## Documentation and Organization

- `docs/timelog.md`: updated with all backend implementation hours and testing sessions.
- `docs/backlog.md`: revised to show frontend integration and UI goals for Milestone 3.
- **Code comments:** added throughout controllers, models, and services for clarity and maintainability.
- **Postman Collection:** includes all tested endpoints with example payloads and responses.
- **Database verified:** live Atlas collections (`users`, `plinkorounds`, `reports`) reflect accurate state after tests.

---

## Version Control Summary

This project was managed using Git and GitHub for version control.  
I did most of the backend work directly on the `main` branch while I was building and testing everything.  
Before submitting, I created a `backend-integration` branch and merged it into `main` to show that I understand how branching and merging work.

Looking back, I realized that using proper feature branches would’ve made my life a lot easier.  
I ran into a few errors that could’ve been isolated and fixed faster if I had been working in separate branches for each feature — like authentication, reporting, or the leaderboard.  
Going forward, I want to keep my version control more organized by branching off for each major piece of work and committing changes in smaller chunks instead of one big update at the end and for milestone 3 you will see proper feature branching for thr frontend integration.

---

## Milestone 2 Summary

The backend prototype is fully functional and stable.
All core systems (authentication, game logic, reporting, leaderboard, and data persistence) have been implemented and verified through Postman.
Future iterations during frontend integration will focus on refining endpoints and ensuring smooth communication between client and server.
