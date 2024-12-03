import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const updateGamesWithNullDescriptions = async (limit: number) => {
  try {
    const games = await prisma.game.findMany({
      where: { description: null },
      take: limit,
      orderBy: { appid: 'asc' },
    });

    console.log(`Found ${games.length} games with null descriptions to process.`);
    let index = 0;
    for (const game of games) {
      const { appid } = game;
      index++;

      try {
        const response = await fetch(`https://store.steampowered.com/api/appdetails?appids=${appid}`);
        const data = await response.json();

        if (data?.[appid]?.success) {
          const gameData = data[appid].data;
          console.log(`${index}/${games.length}: Updating ${gameData.name} (${appid})`);

          if (gameData.type !== 'game') {
            await prisma.game.delete({ where: { appid } });
            console.log(`Deleted non-game entry: ${appid}`);
          } else {
            const releaseDate = gameData.release_date?.date
              ? new Date(gameData.release_date.date)
              : new Date(gameData.release_date);
            const validReleaseDate = isNaN(releaseDate.getTime()) ? null : releaseDate;

            await prisma.game.update({
              where: { appid },
              data: {
                name: gameData.name,
                description: gameData.detailed_description ?? null,
                shortDescription: gameData.short_description ?? null,
                languages: gameData.supported_languages ?? null,
                headerImage: gameData.header_image ?? null,
                capsuleImage: gameData.capsule_image ?? null,
                releaseDate: validReleaseDate,
                backgroundImage: gameData.background ?? null,
              },
            });

            if (gameData.genres) {
              await prisma.game.update({
                where: { appid },
                data: {
                  genres: {
                    connectOrCreate: gameData.genres.map((genre: { id: string; description: string }) => ({
                      where: { id: parseInt(genre.id) },
                      create: { id: parseInt(genre.id), description: genre.description },
                    })),
                  },
                },
              });
            }
          }
        } else {
          await prisma.game.delete({ where: { appid } });
          console.log(`Deleted failed API entry: ${appid}`);
        }
      } catch (error) {
        console.error(`Error processing game ${appid}:`, error);
      }
    }

    console.log('Game updates completed.');
  } catch (error) {
    console.error('Error fetching games:', error);
  }
};

updateGamesWithNullDescriptions(500);