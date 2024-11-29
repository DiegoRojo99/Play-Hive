import React, { useEffect, useState } from 'react';
import axios from 'axios';
import UserProfile from './UserProfile';
import SteamLoginButton from '../buttons/SteamLoginButton';

const NavBar: React.FC = () => {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    fetch('http://localhost:5000/api/user', {
      method: 'GET',
      credentials: 'include',
    })
      .then((response) => response.json())
      .then((data) => setUser(data.steamID))
      .catch((err) => setUser(null));
  }, []);

  return (
    <nav style={{ display: 'flex', width: '100%', justifyContent: 'space-between', padding: '10px 20px' }}>
      <div style={{ display: 'flex', alignItems: 'center', marginLeft: '16px' }}>Play Hive</div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        {user ? ( <UserProfile user={user} /> ) : ( <SteamLoginButton /> )}
      </div>
    </nav>
  );
};

export default NavBar;
