-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT,
    "avatarUrl" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "isAdmin" BOOLEAN NOT NULL
);

-- CreateTable
CREATE TABLE "Tables" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT,
    "fileUrl" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    CONSTRAINT "Tables_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
