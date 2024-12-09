import React from 'react';
import './Library.css';
import { GameDB, GameWithHeader } from '../../../types/Types';
import { Link } from 'react-router-dom';

interface LibraryItemProps {
  game: GameWithHeader | GameDB;
}

const LibraryItem: React.FC<LibraryItemProps> = ({game}) => {

  const imageSrc = 'playtime_forever' in game ? game.header_image : game.headerImage;
  const playtime = 'playtime_forever' in game ? Math.round(game.playtime_forever / 60) : null;

  return (
    <Link to={`/game/${game.appid}`} className="library-item-link">
      <div className='library-item' key={game.appid}>
        <img 
          alt={game.name} 
          src={imageSrc ?? ""} 
          sizes="(max-width: 768px) 184px, 360px" 
          loading="lazy"
        />
        <p className='library-item-text'>{game.name}</p>
        {playtime && <p className='library-item-text'>{playtime} hours played</p>}
      </div>
    </Link>
  );
};

export default LibraryItem;