import passport from 'passport';
import { Strategy as SteamStrategy } from 'passport-steam';
import dotenv from 'dotenv';
import { supabase } from '../db/supabase';

dotenv.config();

const steamApiKey = process.env.STEAM_API_KEY;
const backendURL = process.env.BACKEND_URL;

if (!steamApiKey) {
  throw new Error('STEAM_API_KEY is not defined in the .env file');
}
if(!backendURL){
  throw new Error('BACKEND_URL is not defined in the .env file');  
}

passport.use(
  new SteamStrategy(
    {
      returnURL: `${backendURL}/auth/steam/return`,
      realm: `${backendURL}/`,
      apiKey: steamApiKey,
    },
    async (identifier: string, profile: any, done: Function) => {

      const user = {
        steam_id: profile.id,
        username: profile.displayName,
        avatar_url: profile.photos[1]?.value,
      };

      return done(null, user);
    }
  )
);

// Serialize user to store in session
passport.serializeUser((user: any, done: Function) => {
  done(null, user);
});

// Deserialize user from session
passport.deserializeUser((steamID: string, done: Function) => {
  done(null, { steamID });
});
