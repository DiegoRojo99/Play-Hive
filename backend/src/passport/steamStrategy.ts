import passport from 'passport';
import { Strategy as SteamStrategy } from 'passport-steam';
import dotenv from 'dotenv';

dotenv.config();

const steamApiKey = process.env.STEAM_API_KEY;
const baseURL = process.env.BASE_URL;
if (!steamApiKey) {
  throw new Error('STEAM_API_KEY is not defined in the .env file');
}
if(!baseURL){
  throw new Error('STEAM_RETURN_URL is not defined in the .env file');  
}

passport.use(
  new SteamStrategy(
    {
      returnURL: `${process.env.BASE_URL}/auth/steam/return`,
      realm: `${process.env.BASE_URL}/`,
      apiKey: steamApiKey,
    },
    (identifier: string, profile: any, done: Function) => {
      // TO DO save or check user with DB
      // TO DO add avatar
      const user = {
        steamID: profile.id,
        username: profile.displayName,
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
