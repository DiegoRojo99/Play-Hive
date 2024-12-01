import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import { SteamUser, UserContextType } from '../types/Types';

const UserContext = createContext<UserContextType | undefined>(undefined);
export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<SteamUser | null>(null);

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
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
