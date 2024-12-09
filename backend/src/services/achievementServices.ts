/**
 * Fetches schema achievements for a specific game.
 * @param gameId - App ID of the game.
 * @returns An array of game achievements or throws an error.
 */
export const fetchGameAchievements = async (gameId: number): Promise<any> => {
  try {
    const response = await fetch(
      `http://api.steampowered.com/ISteamUserStats/GetSchemaForGame/v2/?key=${process.env.STEAM_API_KEY}&appid=${gameId}`
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(`Failed to fetch game achievements: ${error?.message || response.statusText}`);
    }

    const schema = await response.json();
    const gameAchievements = schema?.game?.availableGameStats?.achievements;

    if (!gameAchievements) {
      throw new Error('Game schema does not contain achievements.');
    }

    return gameAchievements;
  } catch (error: any) {
    console.error(`Error fetching game achievements: ${error.message}`);
    throw new Error(error.message || 'Unable to fetch game achievements');
  }
};

/**
 * Fetches achievements for a specific user and game.
 * @param gameId - App ID of the game.
 * @param userId - Steam ID of the user.
 * @returns An object with user achievements and game name or throws an error.
 */
export const fetchUserAchievements = async (
  gameId: number,
  userId: string
): Promise<{ userAchievements: any[]; gameName: string }> => {
  try {
    const response = await fetch(
      `https://api.steampowered.com/ISteamUserStats/GetPlayerAchievements/v0001/?appid=${gameId}&steamid=${userId}&key=${process.env.STEAM_API_KEY}`
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(`Failed to fetch user achievements: ${error?.message || response.statusText}`);
    }

    const achievementsData = await response.json();
    const playerStats = achievementsData?.playerstats;

    if (!playerStats?.success) {
      throw new Error(playerStats?.error || 'Failed to fetch player stats.');
    }

    if (!playerStats?.achievements) {
      throw new Error('No achievements found for the user.');
    }

    return {
      userAchievements: playerStats.achievements,
      gameName: playerStats.gameName,
    };
  } catch (error: any) {
    console.error(`Error fetching user achievements: ${error.message}`);
    throw new Error(error.message || 'Unable to fetch user achievements');
  }
};


