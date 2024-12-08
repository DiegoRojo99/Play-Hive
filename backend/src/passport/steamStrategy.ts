import passport from 'passport';
import { Strategy as SteamStrategy } from 'passport-steam';
import dotenv from 'dotenv';
import { insertSteamProfile } from '../db/user';

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
      returnURL: `${process.env.BACKEND_URL}/auth/steam/return`,
      realm: `${process.env.BACKEND_URL}/`,
      apiKey: process.env.STEAM_API_KEY!,
      passReqToCallback: true,
    },
    async (req: any, identifier: string, profile: any, done: Function) => {
      try {

        const supabaseUserId = req.session.supabaseUserId;
        if (!supabaseUserId) {
          return done(new Error('Supabase user ID is missing from the session'));
        }

        const steamProfile = {
          userId: supabaseUserId,
          steamId: profile.id,
          username: profile.displayName,
          avatarUrl: profile.photos[1]?.value,
        };

        let insertResult = await insertSteamProfile(steamProfile);

        if(insertResult.error){
          throw new Error(insertResult.error.message);
        }
        if(insertResult.message){
          throw new Error(insertResult.message);
        }
        return done(null, steamProfile);
      } catch (error) {
        return done(error);
      }
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
