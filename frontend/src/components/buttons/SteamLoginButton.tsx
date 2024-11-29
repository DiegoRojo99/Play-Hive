import React from 'react';

const SteamLoginButton: React.FC = () => {
  return (
    <div>
      <h1>Login with Steam</h1>
      <a href="http://localhost:5000/auth/steam">
        <img 
          src="https://community.fastly.steamstatic.com/public/images/signinthroughsteam/sits_01.png" 
          alt="Login with Steam" 
        />
      </a>
    </div>
  );
};

export default SteamLoginButton;
