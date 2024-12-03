import React, { useEffect, useState } from 'react';
import GameCard from './GameCard';
import { GameDB } from '../../../types/Types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter } from '@fortawesome/free-solid-svg-icons';

const GameBrowser: React.FC = () => {
  const [games, setGames] = useState<GameDB[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchGames() {
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/games`);
      const data = await response.json();
      setGames(data);
      setLoading(false);
    }

    fetchGames();
  }, []);

  if(loading){
    return <h1>Loading...</h1>
  }

  return (
    <div className="game-browser-container">
      <aside className="game-browser-sidebar">
        <h3>Filters</h3>
        <ul>
          <li>Action</li>
          <li>Adventure</li>
          <li>RPG</li>
        </ul>
      </aside>
      <section className="game-browser-main">
        <div className="game-browser-options">
          <h2>Games</h2>
        </div>
        <div className="game-browser-grid">
          {games.map((game) => (
            <GameCard key={game.appid} game={game} />
          ))}
        </div>
      </section>
    </div>

  );
};

export default GameBrowser;
