import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import { SteamUser } from '../types/Types';

interface UserContextType {
  user: SteamUser | null;
  setUser: React.Dispatch<React.SetStateAction<SteamUser | null>>;
}

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
    fetch(`${process.env.REACT_APP_API_BASE_URL}/api/user`, {
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
