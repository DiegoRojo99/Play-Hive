import React from 'react';
import { SupabaseUser } from '../../types/Types';
import './UserProfile.css';

const UserProfile: React.FC<{user: SupabaseUser | null}> = ({ user }) => {
  return (
    <div className="user-profile">
      <span className="user-name">{user?.user_metadata?.name}</span>
      {user?.user_metadata?.avatar_url && 
        <img
          src={user?.user_metadata?.avatar_url}
          alt="User Avatar"
          className="avatar"
        /> 
      }
    </div>
  );
};

export default UserProfile;
