# PlinkOink

A fun, arcade-style Plinko web game

PlinkOink is a browser-based game inspired by the classic Plinko board.  
Players register, place bets, and watch animated pigs bounce down a physics board into different multiplier zones that determine their winnings.

This project was developed as part of **CPRO 2501 – Software Design & Development** at Red Deer Polytechnic.

---

## What You Can Do

- Create an account and log in securely
- Add credits to your balance
- Choose your bet settings:
  - Gameplay Mode: **Ante Up / Weekend Gambler / High Roller**
  - Number of pigs (1–5)
  - Manual or Auto play
- Watch pigs drop through the board with real physics
- Win (or lose!) credits based on where they land
- Return to the dashboard to see your updated balance

Core gameplay and user flow are fully complete in this MVP version.

---

## How It Works (High-Level)

PlinkOink combines:

- A real-time animated Plinko board built in React
- A secure backend that validates every result
- Persistent account balances and authentication
- Dark neon arcade-style UI and mascot animations

No highly technical setup needed to understand — you play, the backend keeps everything fair.

---

## Technologies Used

### Frontend

- **React (Vite)** – component-based UI and reactivity
- **Tailwind CSS** – fast styling with custom dark arcade theme
- **Framer Motion** – UI animations and smooth motion effects
- **React + custom hooks physics engine using Matter.js** - used for pig bounce simulation and collision handling

### Backend

- **Node.js + Express** – API and game rules validation
- **MongoDB Atlas** – persistent user balances and game history
- **JWT Authentication** – secure login and session control

These tools were used to learn and practice full-stack app development.

---

## Setup (Simple)

> Requires Node.js installed on your computer

```bash
# Install dependencies
cd backend && npm install
cd ../frontend && npm install

# Run backend
cd backend
npm start

# Run frontend in a new terminal
cd frontend
npm run dev
```
