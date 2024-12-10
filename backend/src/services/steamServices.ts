import dotenv from 'dotenv';
import NodeCache from 'node-cache';

const gameCache = new NodeCache({ stdTTL: 86400, checkperiod: 3600 });
dotenv.config();

const STEAM_API_KEY = process.env.STEAM_API_KEY;

/**
 * Fetch the user's Steam library from the Steam API.
 * @param steamID - The Steam ID of the user.
 * @returns An array of games in the user's library.
 */
export async function fetchUserLibrary(steamID: string) {
  if (!steamID) {
    throw new Error('SteamID is required');
  }
  if (!STEAM_API_KEY) {
    throw new Error('STEAM_API_KEY is missing');
  }

  const cacheKey = `library_${steamID}`;
  const cachedData: any | undefined = gameCache.get(cacheKey);
  
  if (cachedData) {
    return cachedData;
  }


  const url = `https://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=${STEAM_API_KEY}&steamid=${steamID}&format=json&include_appinfo=1&include_played_free_games=1`
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error('Failed to fetch library from Steam API');
  }

  const data = await response.json();
  let library = data.response?.games || [];
  gameCache.set(cacheKey, library);
  return library;
}


/**
 * Fetch all games from steam.
 * @returns An array of games..
 */
export async function fetchSteamGames() {
  const url = 'https://api.steampowered.com/ISteamApps/GetAppList/v2/';
  const response = await fetch(url);
  const data = await response.json();
  return data.applist.apps;
};