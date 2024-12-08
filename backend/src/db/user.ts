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
    return profile;
  } catch (error) {
    console.error('Error saving Steam profile to database:', error);
    return error;
  }
};

const fetchSteamProfile = async (userId: string): Promise<SteamProfile | null> => {
  try {
    if(!userId){
      throw new Error("User id is missing");
    }
    let result = await prisma.steamProfile.findFirst({
      where: {
        userId: userId
      }
    });
    return result;
  } catch (error) {
    console.error('Error fetching Steam profile to database:', error);
    throw error;
  }
};

export {
  insertSteamProfile,
  fetchSteamProfile
}
