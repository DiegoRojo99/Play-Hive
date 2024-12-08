import React, { useEffect, useState } from 'react';
import { useUser } from '../../../contexts/UserContext';
import './Library.css';
import SteamLoginButton from '../../buttons/SteamLoginButton';
import Loader from '../../extras/Loader';
import LibraryCollection from './LibraryCollection';

const Library = () => {
  const { user } = useUser();
  const [userSteamProfile, setUserSteamProfile] = useState(null);
  const [library, setLibrary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showSteamLoginButton, setShowSteamLoginButton] = useState(false);
  const [userLists, setUserLists] = useState([]);
  const [newListName, setNewListName] = useState("");
  
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

  const fetchUserLists = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/lists/user/${user.id}`);
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      const data = await response.json();
      setUserLists(data);
    } catch (err) {
      setError(err.message);
    }
  };

  const createList = async () => {
    if (!newListName.trim()) return;
    try {
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/lists`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newListName, userId: user.id }),
      });
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      setNewListName("");
      fetchUserLists();
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    const fetchUserSteamProfile = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/user/steamProfile/${user.id}`);
        if (!response.ok) {
          if (response.status === 404) {
            setShowSteamLoginButton(true);
            setLoading(false);
            return;
          }
          else {
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

    if (user) {
      fetchUserSteamProfile();
      fetchUserLists();
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
      <div className="create-list">
        <input
          type="text"
          value={newListName}
          placeholder="Enter list name"
          onChange={(e) => setNewListName(e.target.value)}
        />
        <button onClick={createList}>Create List</button>
      </div>
      {userSteamProfile && <LibraryCollection games={library} name="Library" />}
      {userLists.map((list) => (
        <LibraryCollection key={list.id} games={list.games} name={list.name} />
      ))}
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