import React from 'react';
import { useUser } from '../../contexts/UserContext';

const SteamLoginButton: React.FC = () => {
  const { user } = useUser();
  if(!user){
    return <></>;
  }
  return (
    <div>
      <a href={`${process.env.REACT_APP_API_BASE_URL}/auth/steam?supabaseUserId=${user.id}`}>
        <img 
          src="https://community.fastly.steamstatic.com/public/images/signinthroughsteam/sits_01.png" 
          alt="Login with Steam"
          className='steam-login-button' 
        />
      </a>
    </div>
  );
};

export default SteamLoginButton;
