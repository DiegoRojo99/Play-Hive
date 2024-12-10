import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/nav/NavBar';
import './App.css'
import Library from './components/pages/library/Library';
import GameDetails from './components/pages/games/GameDetails';
import GameBrowser from './components/pages/games/GameBrowser';
import AuthPage from './components/pages/login/AuthPage';
import Settings from './components/pages/Settings';
import Home from './components/pages/Home';
import PlayerGameAchievements from './components/pages/achievements/PlayerGameAchievements';

const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <NavBar />
        </header>
        <main>
            <Routes>
              <Route path="/library" Component={Library} />
              <Route path="/game/:appid" element={<GameDetails />} />
              <Route path="/browser" element={<GameBrowser />} />
              <Route path="/login" element={<AuthPage />} />
              <Route path="/" element={<Home />} />
              <Route path="/settings" element={<Settings />} />

              <Route path="/game/:gameId/achievements" element={<PlayerGameAchievements />} />
        
            </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
