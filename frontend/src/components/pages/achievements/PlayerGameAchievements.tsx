import React, { useEffect, useState } from 'react';
import { useUser } from '../../../contexts/UserContext';
import { useParams } from 'react-router-dom';
import Loader from '../../extras/Loader';
import './Achievements.css';

const PlayerGameAchievements = () => {
  const [gameAchievements, setGameAchievements] = useState<any[]>([]);
  const [userAchievements, setUserAchievements] = useState<any[]>([]);
  const [gameName, setGameName] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const { user } = useUser();
  const { gameId } = useParams();

  useEffect(() => {
    const fetchAchievements = async () => {
      try {
        const steamProfileResponse = await fetch(
          `${process.env.REACT_APP_API_BASE_URL}/api/user/steamProfile/${user?.id}`
        );

        if (!steamProfileResponse.ok) {
          if (steamProfileResponse.status === 404) {
            throw new Error('You are not logged in');
          } else {
            throw new Error(`Error: ${steamProfileResponse.statusText}`);
          }
        }

        const steamProfile = await steamProfileResponse.json();
        const achievementsResponse = await fetch(
          `${process.env.REACT_APP_API_BASE_URL}/api/achievements/${gameId}?userId=${steamProfile.steamId}`
        );

        if (!achievementsResponse.ok) {
          throw new Error(`Error fetching achievements: ${achievementsResponse.statusText}`);
        }

        const { gameAchievements, userAchievements, gameName } = await achievementsResponse.json();
        setGameAchievements(gameAchievements);
        setUserAchievements(userAchievements);
        setGameName(gameName);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (user?.id && gameId) {
      fetchAchievements();
    }
  }, [gameId, user?.id]);

  if (loading) return <Loader />;
  if (error) return <div className="error-message">Error: {error}</div>;

  return (
    <div className="achievements-container">
      <h1>Achievements for {gameName}</h1>
      <div className="achievements-grid">
        {gameAchievements.map((achievement: any) => (
          <div className="achievement-card" key={achievement.name}>
            <img
              src={achievement.icon}
              alt={achievement.displayName}
              className="achievement-icon"
            />
            <h3>{achievement.displayName}</h3>
            <p>{achievement.description}</p>
            <p>Status: {userAchievements.find((ua: any) => ua.apiname === achievement.name)?.achieved ? "Unlocked" : "Locked"}</p>
            {userAchievements.find((ua: any) => ua.apiname === achievement.name)?.unlocktime !== 0 && (
              <p>
                Unlocked Date:{' '}
                {new Date(
                  userAchievements.find((ua: any) => ua.apiname === achievement.name)?.unlocktime *
                    1000
                ).toDateString()}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlayerGameAchievements;
