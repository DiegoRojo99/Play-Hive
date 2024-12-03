import express, { Request, Response } from 'express';
import { getFilteredGames } from '../services/gameServices';
import { buildFilters } from '../utils/filterUtils';

const router = express.Router();

router.get("/", async (req: Request, res: Response): Promise<any> => {
  try {
    const filters = buildFilters(req.query);
    const games = await getFilteredGames(filters, 120);
    res.json(games);
  } catch (error) {
    console.error("Error fetching games:", error);
    res.status(500).send("Internal Server Error");
  }
});

export default router;
