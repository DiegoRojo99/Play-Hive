/*
  Warnings:

  - You are about to drop the column `name` on the `Genre` table. All the data in the column will be lost.
  - Added the required column `description` to the `Genre` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Game" ADD COLUMN     "backgroundImage" TEXT,
ADD COLUMN     "capsuleImage" TEXT,
ADD COLUMN     "description" TEXT,
ADD COLUMN     "headerImage" TEXT,
ADD COLUMN     "languages" TEXT,
ADD COLUMN     "releaseDate" TIMESTAMP(3),
ADD COLUMN     "shortDescription" TEXT;

-- AlterTable
ALTER TABLE "Genre" DROP COLUMN "name",
ADD COLUMN     "description" TEXT NOT NULL;
