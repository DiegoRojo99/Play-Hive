import React, { useEffect, useState } from 'react';
import { useUser } from '../../../contexts/UserContext';
import LibraryItem from './LibraryItem';
import './Library.css';
import SteamLoginButton from '../../buttons/SteamLoginButton';
import Loader from '../../extras/Loader';

const Library = () => {
  const { user } = useUser();
  const [userSteamProfile, setUserSteamProfile] = useState(null);
  const [library, setLibrary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showSteamLoginButton, setShowSteamLoginButton] = useState(false);
  
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
        const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/user/steamProfile/${user.id}`);
        if (!response.ok) {
          console.log("Response Status: ", response.status);
          if (response.status === 404) {
            setShowSteamLoginButton(true);
            setLoading(false);
            return;
          }
          else{
            throw new Error(`Error: ${response.statusText}`);
          }
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

  if ((loading || !library) && !showSteamLoginButton) {
    return <Loader />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div id="library">
      {userSteamProfile && <>
        <h1>{`${userSteamProfile?.username}'s Library`}</h1>
        <div className="library-grid">
          {library.length === 0 ? ( <p>No games in library</p> ) : 
            library.map((game) => 
              <LibraryItem key={game.appid} game={game} /> 
            )}        
        </div>
      </>}
      {showSteamLoginButton && (
        <div className="steam-link-container">
          <div className="steam-link-card">
            <h2 className="steam-link-heading">No Steam Account Linked</h2>
            <p className="steam-link-description">
              It looks like your account isn’t linked to Steam yet. To enjoy personalized Steam-based features, please log in with your Steam account.
            </p>
            <div className="steam-link-action">
              <SteamLoginButton />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Library;