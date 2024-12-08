import express, { Request, Response } from 'express';
import { fetchSteamProfile } from '../db/user';

const router = express.Router();

router.get('/steamProfile/:userId', async (req: Request, res: Response) : Promise<any> => {
  const { userId } = req.params;
  try {
    if(!userId){
      throw new Error("User id is missing");
    }
    const data = await fetchSteamProfile(userId);
    if (!data) {
      return res.status(404).json({ message: "No Steam profile found" });
    }
    res.json(data);
  } 
  catch (error) {
    res.status(500).send('Error fetching user data');
  }
});

export default router;
