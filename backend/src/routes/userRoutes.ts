import express, { Request, Response } from 'express';
import { fetchSteamProfile } from '../db/user';

const router = express.Router();

router.get('/steamProfile', async (req: Request, res: Response) : Promise<any> => {
  const { userId } = req.params;
  try {
    const data = await fetchSteamProfile(userId);
    if (!data) {
      throw new Error('Failed to fetch user data');
    }
    res.json(data);
  } 
  catch (error) {
    res.status(500).send('Error fetching user data');
  }
});

export default router;
