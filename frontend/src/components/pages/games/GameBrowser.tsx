import React, { useEffect, useState } from 'react';
import GameCard from './GameCard';
import { GameDB } from '../../../types/Types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter } from '@fortawesome/free-solid-svg-icons';
import SidebarFilter from './SidebarFilter';

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

  if(loading){
    return (
      <div className="game-browser-container">
        <aside className="game-browser-sidebar">
          <h3>Filters</h3>
          <SidebarFilter onFiltersChange={setFilters} />
        </aside>
        <section className="game-browser-main">
          <h1>Loading...</h1>
        </section>
    </div>
    )
  }
  return (
    <div className="game-browser-container">
      <aside className="game-browser-sidebar">
        <h3>Filters</h3>
        <SidebarFilter onFiltersChange={setFilters} />
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
