# Plinko Project

A full-stack web application inspired by the classic Plinko game.  
Players can register, log in, and play rounds that simulate a Plinko board with randomized multipliers.  
User progress, balances, and performance reports are stored and tracked in a MongoDB Atlas database.

---

## Overview

The goal of this project is to build a fun, data-driven web app that demonstrates the use of modern web technologies, backend logic, and persistent storage.  
It was developed as part of the **CPRO 2501 - Software Design & Development** course.

---

## Tech Stack

**Frontend**

- React (Vite)
- Tailwind CSS (planned)

**Backend**

- Node.js / Express
- MongoDB Atlas (via Mongoose ODM)
- JWT authentication
- bcrypt for password hashing
- dotenv, CORS

---

## Project Structure

backend/
├── controllers/
├── middleware/
├── models/
├── routes/
├── services/
├── utils/
├── node_modules/
├── package.json
├── package-lock.json
└── server.js

frontend/
├── public/
├── src/
│ ├── components/
│ ├── context/
│ ├── pages/
│ ├── services/
│ ├── App.css
│ ├── App.jsx
│ ├── index.css
│ └── main.jsx
├── package.json
├── package-lock.json
├── vite.config.js
└── index.html

docs/
├── backlog.md
├── milestone1.md
├── milestone2.md
└── timelog.md

.gitignore  
README.md

---

## Core Features

- **User Authentication** — Secure registration and login with JWT tokens.
- **Plinko Game Logic** — Simulates randomized multiplier results and updates user balance.
- **Reporting System** — Tracks user stats such as total games, win/loss ratio, and biggest win.
- **Leaderboard** — Displays top users ranked by balance.
- **Persistent Storage** — MongoDB Atlas database storing users, rounds, and reports.

---

## Future Plans

- Connect frontend UI to backend routes.
- Add animations and an interactive Plinko board.
- Build a statistics dashboard for user performance.
- Improve overall UI/UX and responsive design.

---

## Learning Goals

This project focuses on understanding:

- The MVC architecture pattern in Node.js and Express.
- REST API development and testing with Postman.
- Authentication, authorization, and secure route handling.
- Database modeling and aggregation with MongoDB/Mongoose.
- Frontend-backend integration in a full-stack app.

---

## Author

**Luke Thompson**  
Red Deer Polytechnic – Computer Programming Diploma
