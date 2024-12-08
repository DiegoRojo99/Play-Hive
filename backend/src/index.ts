import express from 'express';
import passport from 'passport';
import session from 'express-session';
import dotenv from 'dotenv';
import cors from 'cors';

import authRoutes from './routes/authRoutes';
import libraryRoutes from './routes/libraryRoutes';
import steamRoutes from './routes/steamRoutes';
import gameRoutes from './routes/gameRoutes';
import userRoutes from './routes/userRoutes';
import './passport/steamStrategy';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const sessionSecret = process.env.SESSION_SECRET;
if (!sessionSecret) {
  throw new Error('SESSION_SECRET is not defined in .env');
}

app.use(
  session({
    secret: sessionSecret,
    resave: false,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.get('/api/user', (req, res) => {
  if (req.isAuthenticated()) {
    res.json(req.user);
  } 
  else {
    res.status(401);
  }
});

app.use('/auth', authRoutes);
app.use('/api/library', libraryRoutes);
app.use('/api/steam', steamRoutes);
app.use('/api/games', gameRoutes);
app.use('/api/user', userRoutes);

app.listen(PORT, () => {
  console.log(`Server running on ${process.env.BACKEND_URL}`);
});