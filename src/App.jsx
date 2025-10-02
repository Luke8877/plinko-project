import LoginPlaceholder from './components/LoginPlaceholder';
import GamePlaceholder from './components/GamePlaceholder';
import { useState } from "react";
import { mockUsers } from './mockData';

function App() {
  // Initialize state from mockData.js
  const [users, setUsers] = useState(mockUsers);

  const addUser = () => {
    setUsers([...users, { id: users.length + 1, username: `newUser${users.length + 1}`, balance: 50 }]);
  };

  return (
    <>
      <h1>Plinko Project</h1>

      <button onClick={addUser}>Add User</button>
      <ul>
        {users.map(u => (
          <li key={u.id}>
            {u.username} – Balance: {u.balance}
          </li>
        ))}
      </ul>

      <LoginPlaceholder />
      <GamePlaceholder />
    </>
  );
}

export default App;
