import { Genre, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const updateGameDataFromSteamAPI = async (minAppId: number, maxAppId: number) => {
  const games = await prisma.game.findMany({
    where: {
      appid: {
        gte: minAppId,
        lte: maxAppId,
      },
    },
  });

  for (const game of games) {
    const appid = game.appid;
    const response = await fetch(`https://store.steampowered.com/api/appdetails?appids=${appid}`);
    const data = await response.json();

    if (data?.[appid]?.success) {
      const gameData = data[appid].data;
      console.log(appid, ": ", gameData.type);

      if (gameData.type !== "game") {
        await prisma.game.delete({
          where: { appid },
        });
      }
      else{
        await prisma.game.update({
          where: { appid },
          data: {
            name: gameData.name,
            description: gameData.detailed_description ?? null,
            shortDescription: gameData.short_description ?? null,
            languages: gameData.supported_languages ?? null,
            headerImage: gameData.header_image ?? null,
            capsuleImage: gameData.capsule_image ?? null,
            releaseDate: gameData.release_date?.date ? new Date(gameData.release_date.date) : null,
            backgroundImage: gameData.background ?? null,
          },
        });
  
        if (gameData.genres) {
          await prisma.game.update({
            where: {
              appid: appid,
            },
            data: {
              genres: {
                connectOrCreate: await Promise.all(
                  gameData.genres.map(async (genre: {id: string, description: string}) => ({
                    where: {
                      id: parseInt(genre.id),
                    },
                    create: {
                      id: parseInt(genre.id),
                      description: genre.description,
                    },
                  }))
                ),
              },
            },
          });
        }
      }
    } 
    else {
      await prisma.game.delete({
        where: { appid },
      });
    }
  }
};

updateGameDataFromSteamAPI(100000, 100000);
