import React from 'react';

interface User {
  steamID: string;
  username: string;
  avatar: string;
}

const UserProfile: React.FC<{user: User | null}> = ({ user }) => {
  if(user){
    return (
      <div style={{ display: 'flex', alignItems: 'center', width: 'fit-content', marginRight: '16px' }}>
        <span>{user.username}</span>
        {user.avatar ? 
          <img
            src={user.avatar}
            alt="User Avatar"
            className="avatar"
            style={{marginLeft: '8px', height: '40px', borderRadius: '8px'}}
          /> 
        : <></> }
      </div>
    );
  };  
  return <></>;
};

export default UserProfile;
