import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/**
 * Adds a game to a custom list
 * @param listId - Id of the list
 * @param gameId - Appid of the game being added
 * @returns A boolean indicating success
 */
export const addGameToList = async (listId: string, gameId: number): Promise<boolean> => {
  try {
    await prisma.list.update({
      where: { id: listId },
      data: {
        games: {
          connect: { appid: gameId },
        },
      },
    });
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

/**
 * Removes a game from a custom list
 * @param listId - Id of the list
 * @param gameId - Appid of the game being removed
 * @returns A boolean indicating success
 */
export const removeGameFromList = async (listId: string, gameId: number): Promise<boolean> => {
  try {
    await prisma.list.update({
      where: { id: listId },
      data: {
        games: {
          disconnect: { appid: gameId },
        },
      },
    });
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

/**
 * Fetches a single list with all its games
 * @param listId - The ID of the list
 * @returns The list with its games or null if not found
 */
export const getListWithGames = async (listId: string) => {
  const list = await prisma.list.findUnique({
    where: { id: listId },
    include: { games: true },
  });

  return list;
};

/**
 * Fetches all lists with their games for a specific user
 * @param userId - The ID of the user
 * @returns An array of lists with their games
 */
export const getAllListsForUser = async (userId: string) => {
  const lists = await prisma.list.findMany({
    where: { userId },
    include: { games: true },
  });

  return lists;
};

/**
 * Creates a new list
 * @param name - The name of the list
 * @param userId - The identifier for the user (e.g., could be a string or UUID)
 * @returns The created list
 */
export const createList = async (name: string, userId: string) => {
  const newList = await prisma.list.create({
    data: {
      name,
      userId,
    },
  });

  return newList;
};