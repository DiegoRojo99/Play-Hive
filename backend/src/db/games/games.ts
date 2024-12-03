import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getGamesWithGenres = async (limit: number, offset: number) => {
  try {
    const games = await prisma.game.findMany({
      skip: offset,
      take: limit,
      include: {
        genres: true,
      },
      orderBy: {
        name: 'asc',
      },
    });

    return games;
  } catch (error) {
    console.error("Error fetching games with genres:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
};

export const getGamesByGenres = async (genres: string[], limit: number, offset: number) => {
  try {
    const games = await prisma.game.findMany({
      where: {
        genres: {
          some: {
            description: {
              in: genres,
            },
          },
        },
      },
      take: limit,
      skip: offset,
      include: {
        genres: true,
      },
      orderBy: {
        name: 'asc',
      },
    });

    return games;
  } 
  catch (error) {
    console.error("Error fetching games by genres:", error);
    throw error;
  } 
  finally {
    await prisma.$disconnect();
  }
};
