import React, { useEffect, useState } from 'react';
import { useUser } from '../../../contexts/UserContext';
import { useParams } from 'react-router-dom';
import Loader from '../../extras/Loader';
import './Achievements.css';
import CircularProgress from '../../extras/CircularProgress';
import { GameAchievement, UserAchievement } from '../../../types/Types';

const PlayerGameAchievements = () => {
  const [gameAchievements, setGameAchievements] = useState<GameAchievement[]>([]);
  const [userAchievements, setUserAchievements] = useState<UserAchievement[]>([]);
  const [gameName, setGameName] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [userCompletionPct, setUserCompletionPct] = useState<number>(0);

  const { user } = useUser();
  const { gameId } = useParams();

  const calculateAchievementPct = (achievements: UserAchievement[]) => {
    const totalAchievements = achievements.length;
    const unlockedAchievements = achievements.filter((achievement) => achievement.achieved).length;
    if (totalAchievements === 0) return 0;
    return (unlockedAchievements / totalAchievements) * 100;
  };

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
        setUserCompletionPct(calculateAchievementPct(userAchievements));
        
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
      <div className='achievements-user-info'>
        <h1 className='achievements-game-name'>{gameName}</h1>
        <CircularProgress percentage={userCompletionPct} />
      </div>
      <div className="achievements-grid">
        {gameAchievements.map((achievement: any) => {
          const userAchievement = userAchievements.find((ua: any) => ua.apiname === achievement.name);
          return (
            <div className="achievement-card" key={achievement.name}>
              <img
                src={achievement.icon}
                alt={achievement.displayName}
                className={`achievement-icon ${userAchievement?.achieved ? '' : 'locked-icon'}`}
              />
              <div className="achievement-details">
                <h3>{achievement.displayName}</h3>
                <p>{achievement.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PlayerGameAchievements;
