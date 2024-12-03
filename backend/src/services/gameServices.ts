import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/**
 * Fetch games from the database with the given filters and limit.
 * @param filters - Prisma filter object
 * @param limit - Maximum number of games to fetch
 * @returns Filtered games
 */
export const getFilteredGames = async (filters: any, limit: number) => {
  return prisma.game.findMany({
    where: filters,
    include: {
      genres: true,
    },
    take: limit,
    orderBy: {
      appid: 'asc'
    }
  });
};
