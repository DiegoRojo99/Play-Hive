import express, {Request, Response} from "express";
import { getGamesByGenres, getGamesWithGenres } from "../db/games/games";
import { parseGenresParam } from "../utils/games";

const router = express.Router();

router.get("/", async (req: Request, res: Response): Promise<any> => {
  const limit = parseInt(req.query.limit as string) || 100;
  const offset = parseInt(req.query.offset as string) || 0;
  const genre: string[] = parseGenresParam(req.query.genre)
  
  if (genre.length){
    try {
      const games = await getGamesByGenres(genre, limit, offset);
      return res.status(200).json(games);
    } 
    catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }
  try {
    const games = await getGamesWithGenres(limit, offset);
    res.status(200).json(games);
  } 
  catch (error: any) {
    res.status(500).json({ message: "Failed to fetch games.", error: error.message });
  }
});

export default router;
