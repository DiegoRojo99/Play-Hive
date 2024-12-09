import React, { useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { GameDB, List } from "../../../types/Types";
import "./GameSearchModal.css";

type GameSearchModalProps = {
  isOpen: boolean;
  onClose: () => void;
  refresh: () => void;
  list: List;
};

const GameSearchModal: React.FC<GameSearchModalProps> = ({ isOpen, onClose, refresh, list }) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [searchResults, setSearchResults] = useState<GameDB[]>([]);
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);

  const handleSearchChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const term = event.target.value;
    setSearchTerm(term);

    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    if (term.length > 2) {
      debounceTimeout.current = setTimeout(async () => {
        try {
          const response = await fetch(
            `${process.env.REACT_APP_API_BASE_URL}/api/games?name=${term}`
          );
          if (response.ok) {
            const data = await response.json();
            setSearchResults(data);
          }
        } catch (error) {
          console.error("Error fetching search results:", error);
        }
      }, 400);
    } 
    else {
      setSearchResults([]);
    }
  };

  const onAddGame = async (game: GameDB) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/api/lists/${list.id}/games/${game.appid}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      if (!response.ok || response.status !== 201) {
        throw new Error();
      }
    } 
    catch (error) {
      console.error("Error fetching search results:", error);
    }
    finally {
      refresh();
      onClose();
    }
  }

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-modal" onClick={onClose}>
          <FontAwesomeIcon icon={faTimes} />
        </button>
        <h2>Search and Add a Game</h2>
        <input
          type="text"
          placeholder="Search for a game..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="search-input"
        />
        <div className="search-results">
          {searchResults.map((result) => (
            <div
              key={result.appid}
              className="search-result-item"
              onClick={() => onAddGame(result)}
            >
              {result.name}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GameSearchModal;
