# Project Development Milestone 2 – Plinko

**Course:** CPRO 2501  
**Student:** Luke Thompson

---

## Technical Progress

- **Backend setup complete:** Express + Node backend created with MVC-style folders (`controllers/`, `models/`, `routes/`, `middleware/`, `services/`).
- **MongoDB Atlas connected:** Remote cluster created, Compass connection verified, `.env` added, and Mongoose connected on server start.
- **Authentication implemented:** Register and login routes added, passwords hashed with `bcrypt`, JWT issued on login.
- **Security configured:** `.env` not committed, JWT secret stored in environment, CORS enabled, protected routes use middleware.
- **API tested:** All auth routes (`/api/auth/register`, `/api/auth/login`, protected test route) tested in Postman.

---

## Features

### Authentication (User Registration/Login)

- `/api/auth/register` creates a new user with hashed password and starting balance.
- `/api/auth/login` validates credentials and returns a signed JWT.
- `authMiddleware.js` checks the `Authorization: Bearer <token>` header and blocks unauthorized users.
- Tested in Postman with real token flow.

### Plinko Game Logic

- Controller and route placeholders added (`gameController.js`, `gameRoutes.js`).
- Class diagram already designed for `PlinkoRound` → this milestone prepared the backend so game logic can call real users from MongoDB.
- Next step: random slot generation and payout calculation.

### Balance Tracking

- `User` model has `balance: { type: Number, default: 1000 }`.
- Backend can now read the logged in user from the token and update their balance in a later step.
- Will be tied to the game endpoint in the next milestone.

### Reporting/Statistics

- `Report.js` model scaffolded.
- Plan: track total games, win/loss ratio, biggest win, and average bet.
- To be completed after core game loop is working.

### Save/Load System

- Atlas connection gives persistent cloud storage.
- Users, rounds, and reports can be saved per user once endpoints are added.

---

## Backlog

### Completed

- Git repo and project structure
- Express server with CORS and JSON parsing
- MongoDB Atlas setup and connection
- User model (`User.js`)
- Auth controller (`authController.js`)
- Auth routes (`authRoutes.js`)
- JWT middleware and Postman tests

### Remaining

- Implement `/api/game/play` to:
  - accept bet
  - generate outcome
  - update user balance
  - save round
- Implement reporting endpoints
- Hook frontend login/register to these backend routes
- UI to show balance, stats, history
- Final polish and testing

---

## Documentation

- **Milestone 2:** records authentication and backend progress.
- **`docs/timelog.md`:** updated with Atlas setup, backend setup, and Postman testing time.
- **`docs/backlog.md`:** reflects remaining gameplay and reporting features.
- **Code comments:** added to controllers and models for future group members.
