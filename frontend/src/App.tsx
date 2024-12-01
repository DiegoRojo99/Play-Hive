import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/nav/NavBar';
import './App.css'
import Library from './components/pages/library/Library';

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
          </Routes>
        </Router>
      </main>
    </div>
  );
};

export default App;
