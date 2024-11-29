import express from 'express';
import passport from 'passport';
import session from 'express-session';
import dotenv from 'dotenv';

import authRoutes from './routes/authRoutes';
import './passport/steamStrategy';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

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
    res.status(401).json({ message: 'Not authenticated' });
  }
});

app.use('/auth', authRoutes);

app.get('/', (req, res) => {
  if (req.isAuthenticated()) {
    const user = req.user as Express.User;
    res.send(`<h1>Welcome, ${user}</h1>`);
  } 
  else {
    res.send('<h1>Login with Steam</h1><a href="/auth/steam">Login with Steam</a>');
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});