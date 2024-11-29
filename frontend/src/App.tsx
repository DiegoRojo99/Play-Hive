import './App.css';
import SteamLoginButton from './components/buttons/SteamLoginButton';
import useAuth from './hooks/useAuth';

function App() {
  const user = useAuth();

  return (
    <div className="App">
      <header className="App-header">
      </header>
      <body>
        <h1>Welcome to Play Hive</h1>
        {!user ? (
          <SteamLoginButton />
        ) : (
          <div>
            <h2>Welcome, {user.username}!</h2>
            <img src={user.avatar} alt="User Avatar" width={100} />
            <p>Steam ID: {user.steamID}</p>
          </div>
        )}
      </body>
    </div>
  );
}

export default App;
