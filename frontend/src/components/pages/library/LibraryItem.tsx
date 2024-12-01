import React from 'react';
import './Library.css';
import { GameWithHeader } from '../../../types/Types';

interface LibraryItemProps {
  game: GameWithHeader;
}

const LibraryItem: React.FC<LibraryItemProps> = ({game}) => {
  return (
    <div className='library-item' key={game.appid}>
      <img 
        alt={game.name} 
        src={
          game.header_image ? game.header_image :
          `http://media.steampowered.com/steamcommunity/public/images/apps/${game.appid}/${game.img_icon_url}.jpg`
        } 
        sizes="(max-width: 768px) 184px, 360px" 
        loading="lazy"
      />
      <p className='library-item-text'>{game.name}</p>
      <p className='library-item-text'>{Math.round(game.playtime_forever / 60)} hours played</p>
    </div>
  );
};

export default LibraryItem;