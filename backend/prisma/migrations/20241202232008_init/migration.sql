-- CreateTable
CREATE TABLE "Game" (
    "id" SERIAL NOT NULL,
    "appid" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "genres" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "Game_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Game_appid_key" ON "Game"("appid");
