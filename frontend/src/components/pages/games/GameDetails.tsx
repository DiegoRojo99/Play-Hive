import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import DOMPurify from 'dompurify';
import './Games.css';
import { GameWithDetails } from '../../../types/Types';

const GameDetails: React.FC = () => {
  const { appid } = useParams<{ appid: string }>();
  const [game, setGameDetails] = useState<GameWithDetails | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGameDetails = async () => {
      try {
        if (!appid) {
          throw new Error('Game Id is missing');
        }
        const response = await fetch(`http://localhost:5000/api/steam/game/${appid}`);
        if (!response.ok) {
          throw new Error('Failed to fetch game details');
        }
        const data = await response.json();
        setGameDetails(data[appid].data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchGameDetails();
  }, [appid]);

  if (loading) return <div>Loading game details...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!game) return <div>Missing Game Data</div>;

  const sanitizedDescription = DOMPurify.sanitize(game.short_description);

  return (
    <>
    <div className="game-header" style={{ backgroundImage: `url(${game.background_raw})` }} >
      <h1>{game.name}</h1>
      {game.metacritic && (
        <a href={game.metacritic.url} target="_blank" rel="noopener noreferrer" className="metacritic-score">
          Metacritic: {game.metacritic.score}
        </a>
      )}
    </div>
    <div className="game-details">
      <div className="game-content">
        <section className="game-description">
          <h2>About the Game</h2>
          <p dangerouslySetInnerHTML={{ __html: sanitizedDescription }}></p>
        </section>
          <section className="game-details-grid">
            <div>
              <h3>Release Date</h3>
              <p>{game.release_date.date}</p>
            </div>
            <div>
              <h3>Developers</h3>
              <p>{game.developers.join(", ")}</p>
            </div>
            <div>
              <h3>Publishers</h3>
              <p>{game.publishers.join(", ")}</p>
            </div>
            <div>
              <h3>Genres</h3>
              <p>{game.genres.map((g) => g.description).join(", ")}</p>
            </div>
          </section>
          <section className="platforms">
            <h2>Platforms</h2>
            <ul>
              {game.platforms.windows && <li>Windows</li>}
              {game.platforms.mac && <li>Mac</li>}
              {game.platforms.linux && <li>Linux</li>}
            </ul>
          </section>
          {/* <section className="requirements">
            <h2>System Requirements</h2>
            <div>
              <h3>PC</h3>
              <p>{game.pc_requirements.minimum}</p>
              {game.pc_requirements.recommended && (
                <p>Recommended: {game.pc_requirements.recommended}</p>
              )}
            </div>
            {game.mac_requirements && (
                <div>
                    <h3>Mac</h3>
                    <p>{game.mac_requirements.minimum}</p>
                    {game.mac_requirements.recommended && (
                        <p>Recommended: {game.mac_requirements.recommended}</p>
                    )}
                </div>
            )}
            {game.linux_requirements && (
                <div>
                    <h3>Linux</h3>
                    <p>{game.linux_requirements.minimum}</p>
                    {game.linux_requirements.recommended && (
                        <p>Recommended: {game.linux_requirements.recommended}</p>
                    )}
                </div>
            )}
          </section> */}
          {game.screenshots.length > 0 && (
            <section className="screenshots">
              <h2>Screenshots</h2>
              <div className="screenshot-gallery">
                {game.screenshots.map((screenshot) => (
                  <img
                    key={screenshot.id}
                    src={screenshot.path_thumbnail}
                    alt="Game screenshot"
                  />
                ))}
              </div>
            </section>
          )}
          {game.recommendations && (
            <section className="recommendations">
              <h2>Recommendations</h2>
              <p>Total recommendations: {game.recommendations.total}</p>
            </section>
          )}
          {game.achievements && (
            <section className="achievements">
              <h2>Achievements</h2>
              <p>Total achievements: {game.achievements.total}</p>
              <div className="highlighted-achievements">
                {game.achievements.highlighted.map((achievement) => (
                  <div className='highlighted-achievements-item' key={achievement.name}>
                    <img
                      src={achievement.path}
                      alt={achievement.name}
                    />
                    <p>{achievement.name}</p>
                  </div>
                ))}
              </div>
            </section>
          )}
          <section className="support-info">
            <h2>Support</h2>
            <p>
              <a href={game.support_info.url} target="_blank" rel="noopener noreferrer">Support Website</a>
            </p>
            {game.support_info.email && <p>Email: {game.support_info.email}</p>}
          </section>
        </div>
    </div>
    </>
);
};

export default GameDetails;
