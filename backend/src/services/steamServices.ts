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

  const url = `http://api.steampowered.com/IPlayerService/GetOwnedGames/v1/
    ?key=${STEAM_API_KEY}
    &steamid=${steamID}
    &include_appinfo=1
    &include_played_free_games=1
  `;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error('Failed to fetch library from Steam API');
  }

  const data = await response.json();
  return data.response?.games || [];
}
