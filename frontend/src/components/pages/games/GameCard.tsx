import React from 'react';
import './GameBrowser.css';
import { GameDB } from '../../../types/Types';

interface GameCardProps {
  game: GameDB
}

const GameCard: React.FC<GameCardProps> = ({ game }) => {
  return (
    <a href={`/game/${game.appid}`}>
      <div className="game-card">
        <div className="game-card-image-container">
          <img
            src={game.headerImage ?? ""}
            alt={game.name}
            className="game-card-image"
          />
          <div className="game-card-title">{game.name}</div>
        </div>
      </div>
    </a>
  );
};

export default GameCard;
