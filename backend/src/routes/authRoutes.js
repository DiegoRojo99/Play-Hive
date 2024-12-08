import  Router, {Request, Response } from 'express';
import passport from 'passport';

const router = Router();

// Route for Steam authentication with fallback
router.get('/steam', (req, res, next) => {
  const { supabaseUserId } = req.query;
  console.log("Query")
  if (!supabaseUserId) {
    return res.status(400).json({ error: 'Supabase user ID is required' });
  }
  req.session.supabaseUserId = supabaseUserId;
  next();
}, passport.authenticate('steam'));

router.get('/steam/return', passport.authenticate('steam', { failureRedirect: '/' }),
  (req, res) => {
    res.redirect(`${process.env.FRONTEND_URL}/library`);
  }
);

export default router;
