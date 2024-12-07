import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import { supabase } from '../services/supabaseClient';
import { SupabaseUser } from '../types/Types';

interface UserContextType {
  user: SupabaseUser | null;
  setUser: React.Dispatch<React.SetStateAction<SupabaseUser | null>>;
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
  const [user, setUser] = useState<SupabaseUser | null>(null);

  useEffect(() => {
    const fetchSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        setUser(session.user as SupabaseUser);
      }
    };

    fetchSession();

    const { data } = supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        setUser(session.user as SupabaseUser);
      } else {
        setUser(null);
      }
    });

    return () => {
      data.subscription?.unsubscribe();
    };

  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
