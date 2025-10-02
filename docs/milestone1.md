# Project Development Milestone 1 – Plinko  
**Course:** CPRO 2501  
**Student:** Luke Thompson  

---

## Technical Progress  
- **Setup done:** A React + Vite environment was created and runs locally.  
- **GitHub done:** Repository initialized, branches created and merged, and project pushed to GitHub.  
- **Basic CRUD/Data Storage started:** A mock data file (`mockData.js`) was created with sample users and balances. This demonstrates initial data storage functionality.  
- **User interface drafted:** An authentication placeholder component (`LoginPlaceholder.jsx`) was added to the UI. This represents the registration and login system that will be implemented.  

---

## Features  

### Authentication (User Registration/Login)  
- Placeholder React component created and rendered in the UI.  
- Schema for `Users` table already drafted in the project proposal.  
- Future steps: add form inputs, password hashing, and database integration.  

### Plinko Game Loop  
- Game loop and randomization logic designed in the proposal.  
- A `GamePlaceholder` React component was added to represent where the Plinko board and random outcomes will be displayed.  
- This demonstrates progress and sets up the UI for further development.    
- Future steps: connect randomization to balance tracking and reports/statistics.  

### Balance Tracking  
- Database schema drafted for storing credits/tokens.  
- Placeholder values included in mock data (`balance: 100`).  
- Future steps: implement real updates when bets/wins occur.  

### Reporting/Statistics  
- Reports Table drafted in database schema (win/loss ratio, biggest win).  
- Implementation planned for later milestones.  

### Save/Load System  
- Schema for saving users and game sessions designed in proposal.  
- Implementation pending.  

---

## Backlog  
See `docs/backlog.md` for details.  

**Completed:**  
- Project proposal 
- Git repo setup  
- React + Vite environment setup  
- Authentication placeholder component  
- CRUD mock data setup 

**Remaining:**  
- Implement full authentication logic (forms, hashing, DB validation)  
- Build Plinko game loop with randomization and outcomes  
- Integrate game loop with database for balance tracking  
- Create reports/statistics feature   
- Add save/load system  
- Finalize UI polish and testing  

---

## Documentation  
- **Proposal** completed with objectives, requirements, and schema.  
- **Milestone 1 Report (this document)** summarizes technical and feature progress.  
- **Timelog** (`docs/timelog.md`) tracks time spent on proposal, setup, and coding tasks.  
- **Backlog** (`docs/backlog.md`) lists completed and remaining work items.  
