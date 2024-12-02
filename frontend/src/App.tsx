import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/nav/NavBar';
import './App.css'
import Library from './components/pages/library/Library';
import GameDetails from './components/pages/games/GameDetails';

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <NavBar />
      </header>
      <main>
        <Router>
          <Routes>
            <Route path="/library" Component={Library} />
            <Route path="/game/:appid" element={<GameDetails />} />
          </Routes>
        </Router>
      </main>
    </div>
  );
};

export default App;
