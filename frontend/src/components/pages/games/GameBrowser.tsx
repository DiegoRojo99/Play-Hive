import React, { useEffect, useState } from 'react';
import GameCard from './GameCard';
import { GameDB } from '../../../types/Types';
import SidebarFilter from './SidebarFilter';
import Loader from '../../extras/Loader';

const GameBrowser: React.FC = () => {
  const [games, setGames] = useState<GameDB[]>([]);
  const [filters, setFilters] = useState<{ [key: string]: string[] }>({});
  const [loading, setLoading] = useState<boolean>(true);

  const fetchGames = async (selectedFilters: { [key: string]: string[] }) => {
    try {
      const params = new URLSearchParams();
      Object.entries(selectedFilters).forEach(([key, values]) => {
        if (values.length > 0) {
          params.append(key.toLowerCase(), values.join(","));
        }
      });

      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/games?${params.toString()}`);
      if(!response.ok){
        throw new Error("Could not get data");
      }
      const data = await response.json();
      setGames(data);
      setLoading(false);
    } 
    catch (error) {
      console.error("Failed to fetch games:", error);
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchGames(filters);
  }, [filters]);

  return (
    <div className="game-browser-container">
      <aside className="game-browser-sidebar">
        <h3>Filters</h3>
        <SidebarFilter onFiltersChange={setFilters} />
      </aside>
      <section className="game-browser-main">
        {loading ? ( <Loader /> ) : (
          <>
            <div className="game-browser-options">
              <h2>Games</h2>
            </div>
            <div className="game-cards">
              {games.map((game) => (
                <GameCard key={game.appid} game={game} />
              ))}
            </div>
          </>
        )}
      </section>
    </div>
  );  
};

export default GameBrowser;
