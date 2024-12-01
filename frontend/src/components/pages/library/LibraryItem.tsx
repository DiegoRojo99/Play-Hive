import React from 'react';
import './Library.css';
import { Game } from '../../../types/Types';

interface LibraryItemProps {
  game: Game;
}

const LibraryItem: React.FC<LibraryItemProps> = ({game}) => {
  return (
    <div className='library-item' key={game.appid}>
      <img alt={game.name} src={`http://media.steampowered.com/steamcommunity/public/images/apps/${game.appid}/${game.img_icon_url}.jpg`} />
      <p className='library-item-text'>{game.name}</p>
      <p className='library-item-text'>{Math.round(game.playtime_forever / 60)} hours played</p>
    </div>
  );
};

export default LibraryItem;