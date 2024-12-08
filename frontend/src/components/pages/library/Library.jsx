import React, { useEffect, useState } from 'react';
import { useUser } from '../../../contexts/UserContext';
import LibraryItem from './LibraryItem';
import './Library.css';

const Library = () => {
  const { user } = useUser();
  const [userSteamProfile, setUserSteamProfile] = useState(null);
  const [library, setLibrary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const fetchLibrary = async (steamId) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/library?steamID=${steamId}`);
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      const data = await response.json();

      const gamesWithImages = await Promise.all(
        data.map(async (game) => {
          const gameResponse = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/steam/game/${game.appid}`);
          const gameData = await gameResponse.json();
          if (gameData[game.appid].success) {
            const headerImage = gameData[game.appid].data.header_image;
            return { ...game, header_image: headerImage };
          }
          return game;
        })
      );

      setLibrary(gamesWithImages);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchUserSteamProfile = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/user/steamProfile?userId=${user.userId}`);
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
        const steamProfile = await response.json();
        setUserSteamProfile(steamProfile);
        fetchLibrary(steamProfile.steamId);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };   
    
    if(user){
      fetchUserSteamProfile();
    }

  }, [user]);

  if (loading || !library) {
    return <div>Loading library...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div id="library">
      <h1>{`${userSteamProfile?.username}'s Library`}</h1>
      <div className="library-grid">
        {library.length === 0 ? ( <p>No games in library</p> ) : 
          library.map((game) => 
            <LibraryItem key={game.appid} game={game} /> 
          )}        
      </div>
    </div>
  );
};

export default Library;