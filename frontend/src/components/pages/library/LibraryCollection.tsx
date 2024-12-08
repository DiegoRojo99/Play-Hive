import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { GameWithHeader } from '../../../types/Types';
import './Library.css';
import LibraryItem from './LibraryItem';
import { useState } from 'react';
import { faAnglesDown, faAnglesUp } from '@fortawesome/free-solid-svg-icons';

interface LibraryItemProps {
  games: GameWithHeader[];
  name: string;
}


const LibraryCollection: React.FC<LibraryItemProps> = ({games, name}) => {
  const [collectionOpen, setCollectionOpen] = useState(true);

  return (
    <div className="collection">
      <div className="collection-info">
        <h3>{name}</h3>
        <hr />
        <FontAwesomeIcon className='toggle-icon' icon={collectionOpen ? faAnglesUp : faAnglesDown} onClick={() => setCollectionOpen(!collectionOpen)} />
      </div>
      {collectionOpen && 
        <div className="library-grid">
        {games.map( game => <LibraryItem key={game.appid} game={game} />)}
        </div>
      }
    </div>
  )
};

export default LibraryCollection;