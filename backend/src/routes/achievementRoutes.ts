import express from 'express';
import { fetchGameAchievements, fetchUserAchievements } from '../services/achievementServices';

const router = express.Router();

router.get('/:gameId', async (req, res): Promise<any> => {
  const { gameId } = req.params;
  const { userId } = req.query;

  if (!gameId || !userId) {
    return res.status(400).send('Game ID and User ID are required.');
  }

  if (isNaN(Number(gameId))) {
    return res.status(400).send('Game ID should be a number.');
  }

  try {
    const gameAchievementsPromise = fetchGameAchievements(Number(gameId));
    const userAchievementsPromise = fetchUserAchievements(Number(gameId), String(userId));

    const [gameAchievements, { userAchievements, gameName }] = await Promise.all([
      gameAchievementsPromise,
      userAchievementsPromise,
    ]);

    res.status(200).json({
      gameAchievements,
      userAchievements,
      gameName,
    });
  } catch (error: any) {
    if (error.message.includes('Game schema does not contain achievements')) {
      return res.status(404).json({ error: error.message });
    }
    else{
      res.status(500).json({ error: error.message });
    }
  }
});

export default router;
