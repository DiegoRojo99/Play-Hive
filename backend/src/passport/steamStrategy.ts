import passport from 'passport';
import { Strategy as SteamStrategy } from 'passport-steam';
import dotenv from 'dotenv';
import { supabase } from '../db/supabase';

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
    async (identifier: string, profile: any, done: Function) => {
      const steamID = profile.id;
      const token = profile.state;
      if (!token) return done(new Error('No Supabase token found'), null);

      const { data, error } = await supabase.auth.getUser(token);
      if (error || !data?.user) throw error;
      const userId = data.user.id;

      // const { error: updateError } = await supabase
      //   .from('Profile')
      //   .update({ steamid: steamID })
      //   .eq('id', userId);

      // if (updateError) return done(updateError, null);

      const enrichedUser = {
        id: userId,
        email: data.user.email,
        steam_id: steamID,
        username: profile.displayName,
        avatar_url: profile.photos[1]?.value,
      };

      return done(null, enrichedUser);
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
