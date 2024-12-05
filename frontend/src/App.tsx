import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/nav/NavBar';
import './App.css'
import Library from './components/pages/library/Library';
import GameDetails from './components/pages/games/GameDetails';
import GameBrowser from './components/pages/games/GameBrowser';
import Login from './components/pages/login/Login';

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
              <Route path="/login" element={<Login />} />
            </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
