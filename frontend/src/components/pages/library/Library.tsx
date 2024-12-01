import React, { useEffect, useState } from 'react';
import { useUser } from '../../../contexts/UserContext';
import './Library.css';
import LibraryItem from './LibraryItem';
import { Game } from '../../../types/Types';

const Library: React.FC = () => {
  const { user } = useUser();
  const [library, setLibrary] = useState<Game[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user) {
      console.log("Waiting for user to be set...");
      return;
    }

    if (!user.steamID) {
      setError("Steam ID missing");
      setLoading(false);
      return;
    }
    const fetchLibrary = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/library?steamID=${user.steamID}`);
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
        const data = await response.json();
        setLibrary(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchLibrary();
  }, [user]);

  if (loading) {
    return <div>Loading library...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div id="library">
      <h1>{`${user?.username}'s Library`}</h1>
      <div className="library-grid">
        {library.length === 0 ? ( <p>No games in library</p> ) : 
          library.map((game: Game) => 
            <LibraryItem key={game.appid} game={game} /> 
          )}        
      </div>
    </div>
  );
};

export default Library;