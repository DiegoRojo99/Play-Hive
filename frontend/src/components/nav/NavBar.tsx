import React, { useState } from 'react';
import UserProfile from './UserProfile';
import { useUser } from '../../contexts/UserContext';
import { Link } from 'react-router-dom';
import { supabase } from '../../services/supabaseClient';
import { useNavigate } from 'react-router-dom';
import './Nav.css';

const NavBar: React.FC = () => {
  const { user } = useUser();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/" className="navbar-title">
          Play Hive
        </Link>
      </div>
      <div className={`navbar-links ${isMenuOpen ? 'open' : ''}`}>
        <Link to="/browser" className="navbar-link">Browser</Link>
        {user && <Link to="/library" className="navbar-link">Library</Link>}
        {user && !isMenuOpen ? (
          <UserProfile user={user} />
        ) : user ? (
          <p onClick={handleLogout} className="navbar-link">Logout</p>
        ) : (
          <Link to="/login" className="navbar-link">Login</Link>
        )}
      </div>
      <div className="hamburger" onClick={toggleMenu}>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </nav>
  );
};

export default NavBar;
