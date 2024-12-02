import React from 'react';

interface User {
  steamID: string;
  username: string;
  avatar: string;
}

const UserProfile: React.FC<{user: User | null}> = ({ user }) => {
  if(user){
    return (
      <a style={{textDecoration: 'none', color: 'inherit'}} href='http://localhost:3000/library'>
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
      </a>
    );
  };  
  return <></>;
};

export default UserProfile;
