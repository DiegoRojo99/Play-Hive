import express, { Request, Response } from 'express';
import NodeCache from 'node-cache';

const router = express.Router();
const gameCache = new NodeCache({ stdTTL: 86400, checkperiod: 3600 });

router.get('/game/:appid', async (req: Request, res: Response) : Promise<any> => {
  const { appid } = req.params;

  const cacheKey = `details_${appid}`;
  const cachedData: any | undefined = gameCache.get(cacheKey);
  
  if (cachedData) {
    return res.json(cachedData);
  }

  try {
    const response = await fetch(`https://store.steampowered.com/api/appdetails?appids=${appid}`);
    if (!response.ok) {
      throw new Error('Failed to fetch data from Steam');
    }
    const data = await response.json();
    gameCache.set(cacheKey, data);
    res.json(data);
  } 
  catch (error) {
    res.status(500).send('Error fetching data from Steam');
  }
});

export default router;
