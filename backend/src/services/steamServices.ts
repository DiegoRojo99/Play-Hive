import dotenv from 'dotenv';
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

  const url = `https://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=${STEAM_API_KEY}&steamid=${steamID}&format=json&include_appinfo=1&include_played_free_games=1`
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error('Failed to fetch library from Steam API');
  }

  const data = await response.json();
  return data.response?.games || [];
}
