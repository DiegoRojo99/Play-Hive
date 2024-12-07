import React, { useEffect, useRef, useState } from 'react';
import { SupabaseUser } from '../../types/Types';
import { useNavigate } from 'react-router-dom';
import './UserProfile.css';
import { supabase } from '../../services/supabaseClient';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

const UserProfile: React.FC<{user: SupabaseUser | null}> = ({ user }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null); 
  const navigate = useNavigate();

  const toggleDropdown = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsDropdownOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };

  // const handleSettings = () => {
  //   navigate('/settings');
  // };

  return (
    <div className="user-profile" onClick={toggleDropdown}>
      <span className="user-name">{user?.user_metadata?.name}</span>
      {user?.user_metadata?.avatar_url ? 
        <img
          src={user?.user_metadata?.avatar_url}
          alt="User Avatar"
          className="avatar"
        /> 
        :
        <FontAwesomeIcon icon={faUser} />
      }
      {isDropdownOpen && (
        <div className="dropdown-menu" ref={dropdownRef}>
          {/* <button className="dropdown-item" onClick={handleSettings}>Settings</button> */}
          <button className="dropdown-item" onClick={handleLogout}>Log Out</button>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
