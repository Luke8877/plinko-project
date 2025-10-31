# PlinkOink 🎯

A browser-based Plinko-style game built for **CPRO 2501 – Software Design and Development**.  
The goal is to create a full-stack app with:

- secure user accounts
- balance tracking
- game rounds stored in a database
- reporting/statistics

This repo now has both:

- a **React + Vite** frontend, and
- a **Node.js + Express + MongoDB (Mongoose)** backend.

---

## Features (Current)

- React + Vite frontend scaffolded
- Backend server with Express, CORS, dotenv
- MongoDB Atlas connected
- User model with starting balance
- Register endpoint (`POST /api/auth/register`)
- Login endpoint (`POST /api/auth/login`)
- JWT issued on login
- Protected route tested in Postman using `Authorization: Bearer <token>`

---

## Features (Planned / In Progress)

- Plinko game endpoint (`POST /api/game/play`)
- Balance updates per round (bet → outcome → update user)
- Round history (`PlinkoRound` collection)
- Reporting (total games, biggest win, win/loss ratio)
- Frontend auth pages (login/register) wired to backend
- UI for showing current balance and last result

---

## Tech Stack

**Frontend**

- React
- Vite
- (future) Context or Zustand for auth state

**Backend**

- Node.js
- Express
- Mongoose
- JWT (`jsonwebtoken`)
- Bcrypt for password hashing

**Database**

- MongoDB Atlas (cloud)

---

## Project Structure (current)

plinko-project/
├── backend/
│ ├── server.js
│ ├── config/
│ │ └── db.js
│ ├── controllers/
│ │ └── authController.js
│ ├── models/
│ │ └── User.js
│ ├── routes/
│ │ └── authRoutes.js
│ ├── middleware/
│ │ └── authMiddleware.js
│ └── .env (not committed)
├── frontend/ (or root Vite folder if not moved yet)
│ ├── src/
│ └── vite.config.js
└── README.md

```

```
