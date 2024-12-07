-- CreateTable
CREATE TABLE "Profile" (
    "userId" TEXT NOT NULL,
    "steamId" TEXT,
    "avatarUrl" TEXT,

    CONSTRAINT "Profile_pkey" PRIMARY KEY ("userId")
);
