import express, { Request, Response } from 'express';
import {
  addGameToList,
  removeGameFromList,
  getListWithGames,
  getAllListsForUser,
  createList,
} from '../services/listServices';

import NodeCache from 'node-cache';

const gameCache = new NodeCache({ stdTTL: 86400, checkperiod: 3600 });
const router = express.Router();

router.post('/:listId/games/:gameId', async (req: Request, res: Response): Promise<any> => {
  try {
    const { listId, gameId } = req.params;
    if(Number.isNaN(Number(gameId))){
      res.status(400).send("Game id should be a number");
    }
    else{
      const updatedList = await addGameToList(listId, Number(gameId));
      if(updatedList){
        res.status(201).send();
      }
      else{
        res.status(500).send();
      }
    }
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

router.delete('/:listId/games/:gameId', async (req: Request, res: Response): Promise<any> => {
  try {
    const { listId, gameId } = req.params;
    if(Number.isNaN(Number(gameId))){
      res.status(400).send("Game id should be a number");
    }
    else{
      const updatedList = await removeGameFromList(listId, Number(gameId));
      res.json(updatedList);
    }
  } catch (error) {
    console.error("Error removing game from list:", error);
    res.status(500).send("Internal Server Error");
  }
});

router.get('/:listId', async (req: Request, res: Response): Promise<any> => {
  try {
    const { listId } = req.params;
    const list = await getListWithGames(listId);
    res.json(list);
  } catch (error) {
    console.error("Error fetching list:", error);
    res.status(500).send("Internal Server Error");
  }
});

router.get('/user/:userId', async (req: Request, res: Response): Promise<any> => {
  try {
    const { userId } = req.params;
    
    const cacheKey = `lists_${userId}`;
    const cachedData: any | undefined = gameCache.get(cacheKey);
    
    if (cachedData) {
      res.json(cachedData);
    }
    else{
      const lists = await getAllListsForUser(userId);
      gameCache.set(cacheKey, lists);
      res.json(lists);
    }
  } catch (error) {
    console.error("Error fetching user lists:", error);
    res.status(500).send("Internal Server Error");
  }
});

router.post('/', async (req: Request, res: Response): Promise<any> => {
  try {
    const { name, userId } = req.body;
    const newList = await createList(name, userId);
    res.json(newList);
  } catch (error) {
    console.error("Error creating list:", error);
    res.status(500).send("Internal Server Error");
  }
});

export default router;
