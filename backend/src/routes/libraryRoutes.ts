import express from 'express';
import { fetchUserLibrary } from '../services/steamServices';

const router = express.Router();

router.get('/', async (req, res) => {
  const steamID = req.query.steamID as string;

  try {
    const library = await fetchUserLibrary(steamID);
    res.json(library);
  } catch (err: any) {
    console.error(err.message);
    res.status(500).json({ error: err.message });
  }
});

export default router;
