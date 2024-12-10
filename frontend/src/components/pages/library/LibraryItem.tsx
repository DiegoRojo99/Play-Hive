import React from 'react';
import './Library.css';
import { GameDB, GameWithHeader } from '../../../types/Types';
import { Link } from 'react-router-dom';
import { faTrophy } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface LibraryItemProps {
  game: GameWithHeader | GameDB;
  library: boolean;
}

const LibraryItem: React.FC<LibraryItemProps> = ({game, library}) => {

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
        {playtime !== null && <p className='library-item-text'>{playtime} hours played</p>}
        {library && (
          <Link to={`/game/${game.appid}/achievements`} >
            <FontAwesomeIcon className='trophy-icon' icon={faTrophy} />
          </Link>
        )}
      </div>
    </Link>
  );
};

export default LibraryItem;