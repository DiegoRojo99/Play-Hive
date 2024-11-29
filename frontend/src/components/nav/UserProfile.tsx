import React from 'react';

interface User {
  steamID: string;
  username: string;
  avatar: string;
}

interface UserProfileProps {
  user: User | null;
}

const UserProfile: React.FC<UserProfileProps> = ({ user }) => {
  if(user){
    console.log("user: ", user);
    return (
      <div style={{ display: 'flex', alignItems: 'center', width: 'fit-content', marginRight: '16px' }}>
        {/* <img
          src={`https://steamcommunity.com/profiles/${user.steamID}/avatar`}
          alt="User Avatar"
          className="avatar"
        /> */}
        <span>{user.username}</span>
      </div>
    );
  };  
  return <></>;
};

export default UserProfile;
