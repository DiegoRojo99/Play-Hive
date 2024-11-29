import { useState, useEffect } from 'react';

interface User {
  steamID: string;
  username: string;
  avatar: string;
}

const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await fetch('/api/user'); // Adjust this to match your API route
        if (response.ok) {
          const userData = await response.json();
          setUser(userData);
        }
      } catch (error) {
        console.error('Failed to fetch user data:', error);
      }
    };

    fetchUserProfile();
  }, []);

  return user;
};

export default useAuth;
