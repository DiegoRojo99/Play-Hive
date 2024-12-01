import express from 'express';
const router = express.Router();

router.get('/game/:appid', async (req, res) => {
  const { appid } = req.params;

  try {
    const response = await fetch(`https://store.steampowered.com/api/appdetails?appids=${appid}`);
    if (!response.ok) {
      throw new Error('Failed to fetch data from Steam');
    }
    const data = await response.json();
    res.json(data);
  } 
  catch (error) {
    res.status(500).send('Error fetching data from Steam');
  }
});

export default router;
