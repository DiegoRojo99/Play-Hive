import { PrismaClient, SteamProfile } from '@prisma/client';
const prisma = new PrismaClient();

const insertSteamProfile = async (profile: SteamProfile): Promise<any> => {
  try {
    await prisma.steamProfile.upsert({
      where: {
        userId: profile.userId
      },
      create: profile,
      update: profile
    });
  } catch (error) {
    console.error('Error saving Steam profile to database:', error);
    return error;
  } finally {
    await prisma.$disconnect();
    return profile.userId;
  }
};

export {
  insertSteamProfile
}
