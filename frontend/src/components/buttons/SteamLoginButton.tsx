import React from 'react';

const SteamLoginButton: React.FC = () => {
  return (
    <div>
      <a href={`${process.env.REACT_APP_API_BASE_URL}/auth/steam`}>
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
