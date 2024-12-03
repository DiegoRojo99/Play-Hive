import React from 'react';
import UserProfile from './UserProfile';
import SteamLoginButton from '../buttons/SteamLoginButton';
import { useUser } from '../../contexts/UserContext';
import { Link } from 'react-router-dom';
import './Nav.css';

const NavBar: React.FC = () => {
  const { user } = useUser();

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <span className="navbar-title">Play Hive</span>
      </div>
      <div className="navbar-links">
        <Link to="/browser">Browser</Link>
        {user ? <Link to="/library">Library</Link> : <></>}
      </div>
      <div className="navbar-right">
        {user ? <UserProfile user={user} /> : <SteamLoginButton />}
      </div>
    </nav>
  );
};

export default NavBar;
