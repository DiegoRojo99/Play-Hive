import passport from 'passport';
import { Strategy as SteamStrategy } from 'passport-steam';
import dotenv from 'dotenv';

dotenv.config();

const steamApiKey = process.env.STEAM_API_KEY;
const baseURL = process.env.RAILWAY_PUBLIC_DOMAIN;
if (!steamApiKey) {
  throw new Error('STEAM_API_KEY is not defined in the .env file');
}
if(!baseURL){
  throw new Error('RAILWAY_PUBLIC_DOMAIN is not defined in the .env file');  
}

passport.use(
  new SteamStrategy(
    {
      returnURL: `${process.env.RAILWAY_PUBLIC_DOMAIN}/auth/steam/return`,
      realm: `${process.env.RAILWAY_PUBLIC_DOMAIN}/`,
      apiKey: steamApiKey,
    },
    (identifier: string, profile: any, done: Function) => {
      // TO DO save or check user with DB
      const user = {
        steamID: profile.id,
        username: profile.displayName,
        avatar: profile.photos[1]?.value,
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
