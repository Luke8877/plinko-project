# Backlog – Plinko Project

## Completed

- Project proposal
- Git repo setup (local + GitHub)
- React + Vite environment setup
- Authentication placeholder component (frontend)
- CRUD mock data setup
- GamePlaceholder component for Plinko game loop
- **Full project design document completed** (wireframes, finalized ER diagram, core MVP defined)
- **Full project plan document completed** (components to be implemented, branches strategy, timeline)
- Backend folder structure (controllers, models, routes, middleware)
- MongoDB Atlas cluster created and connected
- Express server configured with dotenv, CORS, and Mongoose
- User model created (`User.js`) with default balance
- Auth routes created (`/api/auth/register`, `/api/auth/login`)
- Auth controller added with password hashing (bcrypt) and JWT issuance
- JWT middleware added for protected routes
- Postman tests done for register, login, and protected route

## Remaining

- Frontend authentication UI wired to backend (login, register, store token)
- Plinko game loop implementation (generate outcome, slot multipliers)
- Balance updates per game (deduct bet, apply payout, save to user)
- Database integration for round history (`PlinkoRound`)
- Reporting/statistics feature (total games, win/loss ratio, biggest win, average bet)
- Save/load system for user sessions and reports
- Dashboard/stats page to display balance, last rounds, and report data
- UI polish and final testing before submission
