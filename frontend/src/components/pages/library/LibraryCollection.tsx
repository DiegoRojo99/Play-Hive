import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { GameWithHeader, List } from '../../../types/Types';
import LibraryItem from './LibraryItem';
import { useState } from 'react';
import { faAnglesDown, faAnglesUp } from '@fortawesome/free-solid-svg-icons';
import { faSquarePlus } from '@fortawesome/free-regular-svg-icons';
import GameSearchModal from './GameSearchModal';
import './Library.css';

interface LibraryItemProps {
  games: GameWithHeader[];
  name: string;
  refresh: () => void;
  list: List | undefined;
}

const LibraryCollection: React.FC<LibraryItemProps> = ({games, name, refresh, list}) => {
  const [collectionOpen, setCollectionOpen] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen((prev) => !prev);
  };  

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
          {list &&
            <div className="library-item empty-game" key="empty-game" onClick={toggleModal} >
              <div className="empty-game-content">
                <div className="empty-game-message">
                  <FontAwesomeIcon icon={faSquarePlus}/>              
                </div>
              </div>
            </div>
          }
        </div>
      }
      {isModalOpen && list && 
        <GameSearchModal 
          isOpen={isModalOpen}
          onClose={toggleModal}
          refresh={refresh}
          list={list}
        />}
    </div>
  )
};

export default LibraryCollection;