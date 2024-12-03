import React, { useEffect, useState } from 'react';
import GameCard from './GameCard';
import { GameDB } from '../../../types/Types';

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
    <div className="game-browser">
      <div className="game-grid">
        <h2 style={{textAlign: 'left', marginBottom: '4px'}}>Games</h2>
        <hr></hr>
        <div className="game-cards">
          {games.map((game) => (
            <GameCard key={game.appid} game={game} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default GameBrowser;
