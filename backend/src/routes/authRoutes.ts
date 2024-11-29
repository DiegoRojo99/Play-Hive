import { Router } from 'express';
import passport from 'passport';

const router = Router();

// Route for Steam authentication with fallback
router.get('/steam', passport.authenticate('steam'));
router.get('/steam/return', passport.authenticate('steam', { failureRedirect: '/' }),
  (req, res) => {
    res.redirect('/');
  }
);

export default router;
