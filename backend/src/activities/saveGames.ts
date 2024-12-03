import { PrismaClient } from '@prisma/client';
import { fetchSteamGames } from '../services/steamServices';
import { Game } from '@prisma/client'

const prisma = new PrismaClient();

const saveGamesToDB = async () => {
  try {

    const games = await fetchSteamGames();
    const gameData = games.map((game: Game) => ({
      appid: game.appid,
      name: game.name,
    }));

    await prisma.game.createMany({
      data: gameData,
      skipDuplicates: true,
    });

    console.log(`${gameData.length} games have been saved to the database.`);
  } catch (error) {
    console.error('Error saving games to database:', error);
  } finally {
    await prisma.$disconnect();
  }
};

saveGamesToDB();
