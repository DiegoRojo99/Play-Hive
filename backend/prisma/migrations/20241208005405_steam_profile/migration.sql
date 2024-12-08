/*
  Warnings:

  - You are about to drop the `Profile` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Profile";

-- CreateTable
CREATE TABLE "SteamProfile" (
    "userId" TEXT NOT NULL,
    "steamId" TEXT,
    "avatarUrl" TEXT,
    "username" TEXT,

    CONSTRAINT "SteamProfile_pkey" PRIMARY KEY ("userId")
);
