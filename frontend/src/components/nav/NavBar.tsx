import React from 'react';
import UserProfile from './UserProfile';
import SteamLoginButton from '../buttons/SteamLoginButton';
import { useUser } from '../../contexts/UserContext';

const NavBar: React.FC = () => {
  const { user } = useUser();

  return (
    <nav style={{ display: 'flex', width: '100%', justifyContent: 'space-between', padding: '10px 20px' }}>
      <div style={{ display: 'flex', alignItems: 'center', marginLeft: '16px' }}>Play Hive</div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        {user ? <UserProfile user={user} /> : <SteamLoginButton />}
      </div>
    </nav>
  );
};

export default NavBar;
