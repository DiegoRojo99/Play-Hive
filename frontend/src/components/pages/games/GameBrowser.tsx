import React, { useEffect, useState } from "react";
import GameCard from "./GameCard";
import { GameDB } from "../../../types/Types";
import SidebarFilter from "./SidebarFilter";
import Loader from "../../extras/Loader";

const GameBrowser: React.FC = () => {
  const [games, setGames] = useState<GameDB[]>([]);
  const [filters, setFilters] = useState<{ [key: string]: string[] }>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState<string>("");

  const fetchGames = async (
    selectedFilters: { [key: string]: string[] },
    search: string
  ) => {
    try {
      setLoading(true);
      const params = new URLSearchParams();

      Object.entries(selectedFilters).forEach(([key, values]) => {
        if (values.length > 0) {
          params.append(key.toLowerCase(), values.join(","));
        }
      });

      if (search) {
        params.append("name", search);
      }

      const response = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/api/games?${params.toString()}`
      );
      if (!response.ok) {
        throw new Error("Could not get data");
      }
      const data = await response.json();
      setGames(data);
    } catch (error) {
      console.error("Failed to fetch games:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 1000);

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm]);

  useEffect(() => {
    fetchGames(filters, debouncedSearchTerm);
  }, [filters, debouncedSearchTerm]);

  return (
    <div className="game-browser-container">
      <aside className="game-browser-sidebar">
        <h3>Filters</h3>
        <SidebarFilter onSearch={handleSearch} onFiltersChange={setFilters} />
      </aside>
      <section className="game-browser-main">
        {loading ? (
          <Loader />
        ) : (
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
